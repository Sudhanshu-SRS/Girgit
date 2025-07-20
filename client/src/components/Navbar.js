import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo" onClick={closeMobileMenu}>
            🧠 Girgit AI Research
          </Link>

          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          <ul className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/healthcare" onClick={closeMobileMenu}>
                Healthcare AI
              </Link>
            </li>
            <li>
              <Link to="/education" onClick={closeMobileMenu}>
                Education AI
              </Link>
            </li>
            <li>
              <Link to="/research" onClick={closeMobileMenu}>
                Research
              </Link>
            </li>
            <li>
              <Link to="/analytics" onClick={closeMobileMenu}>
                Analytics
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">
                  Welcome, {user?.name || "User"}
                </span>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="btn-primary"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
