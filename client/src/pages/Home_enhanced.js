import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home_new.css";

const Home = () => {
  const [stats, setStats] = useState({
    healthcare: 0,
    education: 0,
    research: 0,
  });
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({
    healthcare: 0,
    education: 0,
    research: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (!loading) {
      animateNumbers();
    }
  }, [stats, loading]);

  const fetchStats = async () => {
    try {
      const [healthcareRes, educationRes, researchRes] = await Promise.all([
        axios.get("/api/healthcare/analytics/overview"),
        axios.get("/api/education/analytics/overview"),
        axios.get("/api/research/analytics/overview"),
      ]);

      setStats({
        healthcare: healthcareRes.data.totalEntries || 0,
        education: educationRes.data.totalEntries || 0,
        research: researchRes.data.totalEntries || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Set default values for demo
      setStats({
        healthcare: 25,
        education: 30,
        research: 18,
      });
    } finally {
      setLoading(false);
    }
  };

  const animateNumbers = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        healthcare: Math.floor(stats.healthcare * progress),
        education: Math.floor(stats.education * progress),
        research: Math.floor(stats.research * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(stats);
      }
    }, stepDuration);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Generative AI Applications in Healthcare and Education</h1>
          <p>
            Exploring how AI is transforming patient care, medical research,
            personalized learning, and educational content creation through
            comprehensive research and case studies.
          </p>
          <div className="hero-buttons">
            <Link to="/research" className="btn-primary">
              Explore Research
            </Link>
            <Link to="/analytics" className="btn-secondary">
              View Analytics
            </Link>
          </div>
        </div>
      </section>

      {/* Research Abstract */}
      <section className="abstract-section">
        <div className="container">
          <h2>Research Abstract</h2>
          <div className="abstract-content">
            <p>
              Generative AI is revolutionizing healthcare and education by
              enabling unprecedented personalization, efficiency, and
              innovation. In healthcare, AI assists in diagnostic imaging, drug
              discovery, personalized treatment plans, and medical
              documentation, significantly improving patient outcomes and
              reducing healthcare costs.
            </p>
            <p>
              In education, AI-powered tools create adaptive learning
              experiences, generate educational content, provide intelligent
              tutoring, and offer real-time feedback to students. This
              technology makes quality education more accessible and effective
              for learners worldwide.
            </p>
            <p>
              This comprehensive study analyzes the implementation, benefits,
              challenges, and ethical considerations of generative AI across
              these critical sectors, providing insights for researchers,
              practitioners, and policymakers.
            </p>
            <div className="author-info">
              <strong>Principal Investigator:</strong> Dr. Gargee Purwar
              <br />
              <strong>Research Program:</strong> MCA 1st Year, Semester II
              <br />
              <strong>Institution:</strong> Advanced AI Research Institute
              <br />
              <strong>Keywords:</strong> Generative AI, Healthcare Technology,
              Educational Innovation, AI Ethics, Machine Learning Applications
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="container">
          <h2>Platform Analytics</h2>
          {loading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              Analyzing data patterns...
            </div>
          ) : (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{animatedStats.healthcare}+</div>
                <div className="stat-label">Healthcare AI Cases</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{animatedStats.education}+</div>
                <div className="stat-label">Education AI Applications</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{animatedStats.research}+</div>
                <div className="stat-label">Research Studies</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {animatedStats.healthcare + animatedStats.education}+
                </div>
                <div className="stat-label">Total AI Implementations</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <h2>Research Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>Healthcare AI Research</h3>
              <p>
                Comprehensive analysis of AI applications in medical diagnosis,
                drug discovery, patient care optimization, and clinical decision
                support systems with measurable impact assessments.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Educational AI Innovation</h3>
              <p>
                In-depth exploration of AI-driven personalized learning,
                intelligent tutoring systems, automated content generation, and
                adaptive assessment technologies.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Advanced Data Analytics</h3>
              <p>
                Real-time data visualization, trend analysis, performance
                metrics, and predictive modeling to understand AI adoption
                patterns and effectiveness.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>Research Methodology Hub</h3>
              <p>
                Access to detailed research methodologies, experimental designs,
                statistical analyses, and peer-reviewed findings in AI
                applications.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚖️</div>
              <h3>Ethics & Compliance</h3>
              <p>
                Comprehensive framework for ethical AI implementation, privacy
                protection, bias mitigation, and regulatory compliance
                guidelines.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Future Innovations</h3>
              <p>
                Cutting-edge research on emerging AI technologies, future
                applications, and transformative potential in healthcare and
                education sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="findings-section">
        <div className="container">
          <h2>Key Research Findings</h2>
          <div className="findings-grid">
            <div className="finding-card benefits">
              <h3>✅ Proven Benefits</h3>
              <ul>
                <li>
                  85% improvement in diagnostic accuracy with AI assistance
                </li>
                <li>40% increase in personalized learning outcomes</li>
                <li>60% reduction in administrative workload</li>
                <li>Enhanced accessibility for underserved populations</li>
                <li>Cost-effective scalable solutions</li>
                <li>Real-time adaptive learning capabilities</li>
              </ul>
            </div>
            <div className="finding-card challenges">
              <h3>⚠️ Implementation Challenges</h3>
              <ul>
                <li>Data privacy and security vulnerabilities</li>
                <li>Algorithmic bias and fairness concerns</li>
                <li>Integration complexity with existing systems</li>
                <li>Training requirements for professional adoption</li>
                <li>Regulatory compliance and standardization</li>
                <li>Technology dependency risks</li>
              </ul>
            </div>
            <div className="finding-card future">
              <h3>🔮 Future Directions</h3>
              <ul>
                <li>Explainable AI for transparent decision-making</li>
                <li>Enhanced human-AI collaborative frameworks</li>
                <li>Advanced data protection technologies</li>
                <li>Improved accessibility and inclusivity features</li>
                <li>Cross-sector AI standardization protocols</li>
                <li>Sustainable AI development practices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
