import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import { Link } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await axios.post("13.60.68.42:3002/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      setLoading(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login Failed!");
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

          {error && (
            <div style={{
              color: "#FF6B9D",
              fontSize: "12px",
              padding: "8px 12px",
              background: "rgba(255, 107, 157, 0.1)",
              borderRadius: "8px",
              marginBottom: "8px",
              width: "100%",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}

          <label className="label">Email</label>
          <input
            className="input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label className="label">Password</label>
          <input
            className="input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
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
