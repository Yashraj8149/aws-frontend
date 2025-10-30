import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";
import Navbar from "../Navbar";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "YashrajThakur",
    followers: 10,
    following: 3
  });
  const { setCurrentUser } = useAuth();

  const [repositories, setRepositories] = useState([
    {
      name: "awesome-project",
      description: "A stunning web application built with React and modern technologies",
      language: "JavaScript",
      updated: "2 days ago"
    },
    {
      name: "portfolio",
      description: "Professional portfolio website showcasing projects and skills",
      language: "React",
      updated: "1 week ago"
    },
    {
      name: "learning-react",
      description: "Comprehensive learning journey through React and web development",
      language: "JavaScript",
      updated: "3 days ago"
    }
  ]);

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

          <div className="repo-card-wrapper">
            {repositories.map((repo) => (
              <div key={repo.name} className="repo">
                <div>
                  <div className="repo-name">{repo.name}</div>
                  <div className="description">{repo.description}</div>
                </div>
                <div className="repo-meta">
                  <span>{repo.language}</span>
                  <span>{repo.updated}</span>
                </div>
              </div>
            ))}
          </div>

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