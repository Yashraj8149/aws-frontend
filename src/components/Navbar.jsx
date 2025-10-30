import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="logo">
        VersionControl
      </Link>
      <div>
        <Link to="/">Create Repository</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;