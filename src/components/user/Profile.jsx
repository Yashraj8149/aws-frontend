import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "Loading...",
    followers: 0,
    following: 0
  });
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/auth");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`13.60.68.42:3002/userProfile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserDetails({
          username: response.data.username || "User",
          followers: response.data.followers || 0,
          following: response.data.following || 0
        });

        // Fetch user's repositories
        const repoResponse = await fetch(`13.60.68.42:3002/repo/user/${userId}`);
        const repoData = await repoResponse.json();
        setRepositories(Array.isArray(repoData.repositories) ? repoData.repositories : []);
      } catch (err) {
        console.error("Cannot fetch user details: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/auth");
  };

  return (
    <>
      <Navbar />
      <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>

          <div className="user-name">{userDetails.username}</div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <div className="stat-item">
              <div className="stat-number">{userDetails.followers}</div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{userDetails.following}</div>
              <div className="stat-label">Following</div>
            </div>
          </div>

          <button id="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="user-repo-section">
          <h2 className="repo-section-title">Repositories</h2>

          {loading ? (
            <div style={{ textAlign: "center", color: "#a0aff0", padding: "40px" }}>
              Loading repositories...
            </div>
          ) : repositories.length > 0 ? (
            <div className="repo-card-wrapper">
              {repositories.map((repo) => (
                <div key={repo._id || repo.name} className="repo">
                  <div>
                    <div className="repo-name">{repo.name}</div>
                    <div className="description">{repo.description || "No description provided"}</div>
                  </div>
                  <div className="repo-meta">
                    <span>{repo.language || "Unknown"}</span>
                    <span>{repo.updated || "Recently"}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#a0aff0", padding: "40px" }}>
              No repositories yet
            </div>
          )}

          <div className="activity-section">
            <h2 className="activity-title">Contribution Activity</h2>
            <div className="heatmap-container">
              <HeatMapProfile />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
