import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const fetchRepositories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`13.60.68.42:3002/repo/user/${userId}`);
        const data = await response.json();
        const repoList = Array.isArray(data.repositories) ? data.repositories : [];
        setRepositories(repoList);
        setSearchResults(repoList);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
        setRepositories([]);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchRepositories();
    }
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults(repositories);
    } else {
      const q = searchQuery.toLowerCase();
      const filteredRepo = repositories.filter((repo) =>
        (repo.name || "").toLowerCase().includes(q) ||
        (repo.description || "").toLowerCase().includes(q)
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1 className="dashboard-title">Your Repositories</h1>

          <div className="search-container">
            <div className="search-box">
              <input
                className="search-input"
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="empty-state">
              <div className="empty-state-icon">⏳</div>
              <div className="empty-state-text">Loading repositories...</div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="repository-grid">
              {searchResults.map((repo) => (
                <div key={repo._id || repo.name} className="repository-card">
                  <div className="repo-name">{repo.name}</div>
                  <div className="repo-description">{repo.description || "No description"}</div>
                  <div className="repo-meta">
                    <span>{repo.language || "Unknown"}</span>
                    <span>{repo.updated || "Recently"}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <div className="empty-state-text">No repositories found</div>
              <p>Try adjusting your search terms</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
