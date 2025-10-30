import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";
import "./auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Mock signup - replace with actual API call
      localStorage.setItem("token", "mock-token-456");
      localStorage.setItem("userId", "user-" + Date.now());
      setCurrentUser("user-" + Date.now());
      setLoading(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Signup Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box-wrapper">
        <div className="login-logo-container">
          <div className="logo-login">VC</div>
        </div>
        <form className="login-box" onSubmit={handleSignup}>
          <h2>Create Account</h2>
          <p>Join VersionControl today</p>

          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="submit-btn" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="login-link">
          Already have an account?{" "}
          <Link to="/auth">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;