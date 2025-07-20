import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    profile: {
      institution: "",
      specialization: "",
      yearsOfExperience: 0,
      researchInterests: [],
    },
  });

  const { login, register, loading, error } = useAuth();
  const navigate = useNavigate(); // Add this

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("profile.")) {
      const profileField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          [profileField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleInterestsChange = (e) => {
    const interests = e.target.value.split(",").map((item) => item.trim());
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        researchInterests: interests,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData);
      }

      // Show success message
      const successMessage = isLogin
        ? `Welcome back, ${result.user.name}!`
        : `Account created successfully! Welcome, ${result.user.name}!`;

      // You can use a toast notification library here instead of alert
      alert(successMessage);

      // Redirect to home page after successful authentication
      navigate("/");
    } catch (error) {
      console.error("Authentication error:", error);

      // If user already exists, suggest switching to login
      if (error.message.includes("already exists")) {
        const switchToLogin = window.confirm(
          "This email is already registered. Would you like to switch to login instead?"
        );
        if (switchToLogin) {
          setIsLogin(true);
          setFormData((prev) => ({
            ...prev,
            password: "",
            confirmPassword: "",
          }));
        }
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
      profile: {
        institution: "",
        specialization: "",
        yearsOfExperience: 0,
        researchInterests: [],
      },
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>{isLogin ? "🔐 Login" : "📝 Register"}</h1>
          <p>
            {isLogin
              ? "Access your research dashboard and analytics"
              : "Join the Generative AI research community"}
          </p>
        </div>

        <div className="auth-form-container">
          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                minLength="6"
              />
            </div>

            {!isLogin && (
              <>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    minLength="6"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="student">Student</option>
                    <option value="educator">Educator</option>
                    <option value="healthcare_professional">
                      Healthcare Professional
                    </option>
                    <option value="researcher">Researcher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="institution">Institution</label>
                  <input
                    type="text"
                    id="institution"
                    name="profile.institution"
                    value={formData.profile.institution}
                    onChange={handleChange}
                    placeholder="Your institution or organization"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="specialization">Specialization</label>
                  <input
                    type="text"
                    id="specialization"
                    name="profile.specialization"
                    value={formData.profile.specialization}
                    onChange={handleChange}
                    placeholder="Your field of specialization"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Years of Experience</label>
                  <input
                    type="number"
                    id="experience"
                    name="profile.yearsOfExperience"
                    value={formData.profile.yearsOfExperience}
                    onChange={handleChange}
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="interests">Research Interests</label>
                  <input
                    type="text"
                    id="interests"
                    onChange={handleInterestsChange}
                    placeholder="AI, Machine Learning, Healthcare (comma-separated)"
                  />
                  <small>
                    Enter your research interests separated by commas
                  </small>
                </div>
              </>
            )}

            <button
              type="submit"
              className={`auth-submit-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="auth-toggle">
            <p>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button type="button" onClick={toggleMode} className="toggle-btn">
                {isLogin ? "Register here" : "Login here"}
              </button>
            </p>
          </div>

          {isLogin && (
            <div className="demo-credentials">
              <h3>Demo Credentials</h3>
              <p>
                <strong>Email:</strong> gargee.purwar@example.com
              </p>
              <p>
                <strong>Password:</strong> password123
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
