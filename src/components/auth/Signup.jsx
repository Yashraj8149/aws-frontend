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
  const [error, setError] = useState("");
  const { setCurrentUser } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {  
      setLoading(true);
      const res = await axios.post("13.60.68.42:3002/signup", {
        email,
        password,
        username,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      setLoading(false);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Signup Failed!");
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

          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
