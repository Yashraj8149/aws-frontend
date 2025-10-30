import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";

const Dashboard = () => {
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
    },
    {
      name: "version-control-clone",
      description: "Ultra-premium version control platform clone with stunning UI",
      language: "React",
      updated: "5 days ago"
    }
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(repositories);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase())
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

          {searchResults.length > 0 ? (
            <div className="repository-grid">
              {searchResults.map((repo) => (
                <div key={repo.name} className="repository-card">
                  <div className="repo-name">{repo.name}</div>
                  <div className="repo-description">{repo.description}</div>
                  <div className="repo-meta">
                    <span>{repo.language}</span>
                    <span>{repo.updated}</span>
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