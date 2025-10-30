import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Mock login - replace with actual API call
      localStorage.setItem("token", "mock-token-123");
      localStorage.setItem("userId", "user-" + Date.now());
      setCurrentUser("user-" + Date.now());
      setLoading(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login Failed!");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box-wrapper">
        <div className="login-logo-container">
          <div className="logo-login">VC</div>
        </div>
        <form className="login-box" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <p>Sign in to VersionControl</p>

          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="signup-link">
          New to VersionControl?{" "}
          <Link to="/signup">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;