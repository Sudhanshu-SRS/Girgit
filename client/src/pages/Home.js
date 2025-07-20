import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState({
    healthcare: 0,
    education: 0,
    research: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [healthcareRes, educationRes, researchRes] = await Promise.all([
        axios.get('/api/healthcare/analytics/overview'),
        axios.get('/api/education/analytics/overview'),
        axios.get('/api/research/analytics/overview')
      ]);

      setStats({
        healthcare: healthcareRes.data.totalEntries || 0,
        education: educationRes.data.totalEntries || 0,
        research: researchRes.data.totalEntries || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Generative AI Applications in Healthcare and Education</h1>
          <p>
            Exploring how AI is transforming patient care, medical research, personalized learning, 
            and educational content creation through comprehensive research and case studies.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Explore Research</button>
            <button className="btn-secondary">View Case Studies</button>
          </div>
        </div>
      </section>

      {/* Research Abstract */}
      <section className="abstract-section">
        <div className="container">
          <h2>Research Abstract</h2>
          <div className="abstract-content">
            <p>
              Generative AI is transforming the way we approach healthcare and education, making processes 
              smarter, faster, and more personalized. In healthcare, AI is helping doctors diagnose diseases 
              more accurately, assist in medical research, and even create new drug formulations. In education, 
              AI-powered tools are personalizing learning experiences, automating content creation, and making 
              education more interactive.
            </p>
            <p>
              This study explores the growing role of generative AI in these fields, highlighting its benefits, 
              challenges, and ethical concerns. To better understand the impact of generative AI, this research 
              combines real-world case studies, expert opinions, and data analysis.
            </p>
            <div className="author-info">
              <strong>Author:</strong> Gargee Purwar<br />
              <strong>Program:</strong> MCA 1st Year, Sem-II<br />
              <strong>Keywords:</strong> Generative AI, AI in healthcare, AI in education, personalized learning, AI ethics
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats-section">
        <div className="container">
          <h2>Platform Statistics</h2>
          {loading ? (
            <div className="loading">Loading statistics...</div>
          ) : (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{stats.healthcare}</div>
                <div className="stat-label">Healthcare AI Cases</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.education}</div>
                <div className="stat-label">Education AI Applications</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.research}</div>
                <div className="stat-label">Research Papers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{stats.healthcare + stats.education}</div>
                <div className="stat-label">Total AI Applications</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <h2>Platform Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏥</div>
              <h3>Healthcare AI</h3>
              <p>
                Explore case studies on AI applications in medical diagnosis, drug discovery, 
                patient care, and medical imaging with real-world impact data.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Education AI</h3>
              <p>
                Discover how AI is personalizing learning experiences, creating educational content, 
                and making education more accessible and interactive.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Data Analytics</h3>
              <p>
                Comprehensive data analysis and visualization of AI adoption trends, 
                effectiveness metrics, and implementation challenges.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔬</div>
              <h3>Research Hub</h3>
              <p>
                Access detailed research findings, methodologies, expert opinions, 
                and future directions in AI applications.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚖️</div>
              <h3>Ethics & Privacy</h3>
              <p>
                Explore ethical considerations, data privacy measures, bias mitigation strategies, 
                and responsible AI implementation guidelines.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Future Prospects</h3>
              <p>
                Insights into emerging trends, technological advancements, and the future 
                landscape of AI in healthcare and education.
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
              <h3>✅ Benefits</h3>
              <ul>
                <li>Improved diagnostic accuracy in healthcare</li>
                <li>Personalized learning experiences in education</li>
                <li>Reduced workload for professionals</li>
                <li>Enhanced accessibility and reach</li>
                <li>Cost-effective solutions</li>
              </ul>
            </div>
            <div className="finding-card challenges">
              <h3>⚠️ Challenges</h3>
              <ul>
                <li>Data privacy and security concerns</li>
                <li>AI bias and fairness issues</li>
                <li>Over-reliance on automation</li>
                <li>Implementation complexity</li>
                <li>Training and adaptation requirements</li>
              </ul>
            </div>
            <div className="finding-card future">
              <h3>🔮 Future Directions</h3>
              <ul>
                <li>More ethical and transparent AI models</li>
                <li>Better human-AI collaboration</li>
                <li>Enhanced data protection measures</li>
                <li>Improved accessibility features</li>
                <li>Real-world adaptability focus</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
