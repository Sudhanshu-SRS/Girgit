import React, { useState, useEffect } from "react";
import axios from "axios";

const Analytics = () => {
  const [analytics, setAnalytics] = useState({
    healthcare: null,
    education: null,
    research: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [healthcareRes, educationRes, researchRes] = await Promise.all([
        axios.get("/api/healthcare/analytics/overview"),
        axios.get("/api/education/analytics/overview"),
        axios.get("/api/research/analytics/overview"),
      ]);

      setAnalytics({
        healthcare: healthcareRes.data,
        education: educationRes.data,
        research: researchRes.data,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      // Set demo data
      setAnalytics({
        healthcare: {
          totalEntries: 25,
          categories: [
            "Diagnostic AI",
            "Drug Discovery",
            "Patient Care",
            "Medical Imaging",
          ],
          effectiveness: 87,
          adoptionRate: 68,
        },
        education: {
          totalEntries: 30,
          categories: [
            "Personalized Learning",
            "Content Generation",
            "Assessment",
            "Tutoring",
          ],
          effectiveness: 92,
          adoptionRate: 74,
        },
        research: {
          totalEntries: 18,
          categories: [
            "Methodology",
            "Data Analysis",
            "Literature Review",
            "Innovation",
          ],
          effectiveness: 85,
          adoptionRate: 61,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const ProgressBar = ({ percentage, label, color }) => (
    <div className="progress-container">
      <div className="progress-label">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(135deg, ${color}a0 0%, ${color} 100%)`,
          }}
        ></div>
      </div>
    </div>
  );

  const StatCard = ({ title, value, subtitle, icon, color }) => (
    <div className="stat-card" style={{ borderTopColor: color }}>
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <h3>{title}</h3>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-subtitle">{subtitle}</div>
    </div>
  );

  const MetricCard = ({ title, data, color }) => (
    <div className="metric-card">
      <h3>{title}</h3>
      <div className="metric-content">
        <div className="metric-main">
          <span className="metric-number">{data?.totalEntries || 0}</span>
          <span className="metric-label">Total Implementations</span>
        </div>
        <div className="metric-bars">
          <ProgressBar
            percentage={data?.effectiveness || 0}
            label="Effectiveness Rate"
            color={color}
          />
          <ProgressBar
            percentage={data?.adoptionRate || 0}
            label="Adoption Rate"
            color={color}
          />
        </div>
      </div>
      {data?.categories && (
        <div className="categories">
          <h4>Key Categories:</h4>
          <div className="category-tags">
            {data.categories.map((category, index) => (
              <span
                key={index}
                className="category-tag"
                style={{ borderColor: color }}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="analytics-page">
      <div className="container">
        <div className="page-header">
          <h1>📊 Analytics Dashboard</h1>
          <p>
            Comprehensive analysis of AI implementation patterns, effectiveness
            metrics, and adoption trends across healthcare and education
            sectors.
          </p>
        </div>

        {loading ? (
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>Analyzing data patterns...</p>
          </div>
        ) : (
          <>
            {/* Overview Stats */}
            <section className="overview-stats">
              <h2>Platform Overview</h2>
              <div className="stats-grid">
                <StatCard
                  title="Healthcare AI"
                  value={`${analytics.healthcare?.totalEntries || 0}+`}
                  subtitle="Active implementations"
                  icon="🏥"
                  color="#48bb78"
                />
                <StatCard
                  title="Education AI"
                  value={`${analytics.education?.totalEntries || 0}+`}
                  subtitle="Learning applications"
                  icon="🎓"
                  color="#667eea"
                />
                <StatCard
                  title="Research Projects"
                  value={`${analytics.research?.totalEntries || 0}+`}
                  subtitle="Ongoing studies"
                  icon="🔬"
                  color="#ed8936"
                />
                <StatCard
                  title="Overall Impact"
                  value="88%"
                  subtitle="Average effectiveness"
                  icon="📈"
                  color="#38b2ac"
                />
              </div>
            </section>

            {/* Detailed Metrics */}
            <section className="detailed-metrics">
              <h2>Sector Analysis</h2>
              <div className="metrics-grid">
                <MetricCard
                  title="Healthcare AI Applications"
                  data={analytics.healthcare}
                  color="#48bb78"
                />
                <MetricCard
                  title="Educational AI Solutions"
                  data={analytics.education}
                  color="#667eea"
                />
                <MetricCard
                  title="Research Initiatives"
                  data={analytics.research}
                  color="#ed8936"
                />
              </div>
            </section>

            {/* Impact Analysis */}
            <section className="impact-analysis">
              <h2>Impact Analysis</h2>
              <div className="impact-grid">
                <div className="impact-card">
                  <h3>🎯 Effectiveness Comparison</h3>
                  <div className="comparison-bars">
                    <ProgressBar
                      percentage={analytics.healthcare?.effectiveness || 0}
                      label="Healthcare AI"
                      color="#48bb78"
                    />
                    <ProgressBar
                      percentage={analytics.education?.effectiveness || 0}
                      label="Education AI"
                      color="#667eea"
                    />
                    <ProgressBar
                      percentage={analytics.research?.effectiveness || 0}
                      label="Research AI"
                      color="#ed8936"
                    />
                  </div>
                </div>

                <div className="impact-card">
                  <h3>📊 Adoption Trends</h3>
                  <div className="trend-stats">
                    <div className="trend-item">
                      <span className="trend-icon">📈</span>
                      <div>
                        <strong>Year-over-Year Growth</strong>
                        <p>AI adoption increased by 156% in 2024</p>
                      </div>
                    </div>
                    <div className="trend-item">
                      <span className="trend-icon">🌍</span>
                      <div>
                        <strong>Global Reach</strong>
                        <p>Implementations across 45+ countries</p>
                      </div>
                    </div>
                    <div className="trend-item">
                      <span className="trend-icon">💡</span>
                      <div>
                        <strong>Innovation Index</strong>
                        <p>Leading in AI innovation frameworks</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Future Projections */}
            <section className="projections">
              <h2>Future Projections</h2>
              <div className="projection-cards">
                <div className="projection-card">
                  <h4>📅 2025 Outlook</h4>
                  <ul>
                    <li>Expected 200% growth in healthcare AI adoption</li>
                    <li>Expansion to 100+ educational institutions</li>
                    <li>Development of 50+ new AI applications</li>
                  </ul>
                </div>
                <div className="projection-card">
                  <h4>🎯 Key Targets</h4>
                  <ul>
                    <li>Achieve 95% effectiveness across all sectors</li>
                    <li>Implement ethical AI guidelines globally</li>
                    <li>Establish AI research collaboration network</li>
                  </ul>
                </div>
                <div className="projection-card">
                  <h4>🚀 Innovation Goals</h4>
                  <ul>
                    <li>Launch next-generation AI diagnostic tools</li>
                    <li>Develop adaptive learning algorithms</li>
                    <li>Create AI accessibility standards</li>
                  </ul>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <style jsx>{`
        .analytics-page {
          padding: 40px 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          min-height: 100vh;
        }

        .page-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .page-header h1 {
          font-size: 3.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          font-weight: 800;
        }

        .page-header p {
          font-size: 1.3rem;
          color: #4a5568;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .loading-section {
          text-align: center;
          padding: 80px 0;
        }

        .loading-spinner {
          border: 4px solid rgba(102, 126, 234, 0.1);
          border-top: 4px solid #667eea;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        section {
          margin-bottom: 80px;
        }

        section h2 {
          font-size: 2.5rem;
          margin-bottom: 40px;
          text-align: center;
          color: #2d3748;
          font-weight: 700;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .stat-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border-top: 5px solid;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .stat-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .stat-icon {
          font-size: 2.5rem;
        }

        .stat-header h3 {
          font-size: 1.3rem;
          color: #2d3748;
          margin: 0;
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          color: #667eea;
          margin-bottom: 10px;
        }

        .stat-subtitle {
          color: #718096;
          font-size: 1rem;
        }

        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 40px;
        }

        .metric-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .metric-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 45px rgba(0, 0, 0, 0.15);
        }

        .metric-card h3 {
          font-size: 1.8rem;
          margin-bottom: 30px;
          color: #2d3748;
          font-weight: 700;
        }

        .metric-content {
          display: flex;
          gap: 30px;
          align-items: center;
          margin-bottom: 30px;
        }

        .metric-main {
          text-align: center;
        }

        .metric-number {
          display: block;
          font-size: 3.5rem;
          font-weight: 800;
          color: #667eea;
        }

        .metric-label {
          color: #718096;
          font-size: 1rem;
        }

        .metric-bars {
          flex: 1;
        }

        .progress-container {
          margin-bottom: 20px;
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-weight: 600;
          color: #4a5568;
        }

        .progress-bar {
          background: #e2e8f0;
          border-radius: 10px;
          height: 12px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          transition: width 1s ease-out;
          border-radius: 10px;
        }

        .categories h4 {
          margin-bottom: 15px;
          color: #4a5568;
          font-size: 1.1rem;
        }

        .category-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .category-tag {
          padding: 8px 16px;
          border: 2px solid;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.8);
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 40px;
        }

        .impact-card {
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .impact-card h3 {
          font-size: 1.8rem;
          margin-bottom: 30px;
          color: #2d3748;
        }

        .comparison-bars {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .trend-stats {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .trend-item {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .trend-icon {
          font-size: 2.5rem;
        }

        .trend-item strong {
          display: block;
          font-size: 1.2rem;
          color: #2d3748;
          margin-bottom: 5px;
        }

        .trend-item p {
          color: #718096;
          margin: 0;
        }

        .projection-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }

        .projection-card {
          background: white;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border-left: 5px solid #667eea;
        }

        .projection-card h4 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #2d3748;
        }

        .projection-card ul {
          list-style: none;
          padding: 0;
        }

        .projection-card li {
          padding: 10px 0;
          color: #4a5568;
          border-bottom: 1px solid #e2e8f0;
          position: relative;
          padding-left: 20px;
        }

        .projection-card li::before {
          content: "•";
          color: #667eea;
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .projection-card li:last-child {
          border-bottom: none;
        }

        /* Dark mode */
        .dark-mode .analytics-page {
          background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
        }

        .dark-mode .stat-card,
        .dark-mode .metric-card,
        .dark-mode .impact-card,
        .dark-mode .projection-card {
          background: rgba(45, 55, 72, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(74, 85, 104, 0.3);
        }

        .dark-mode .page-header p,
        .dark-mode section h2,
        .dark-mode .stat-header h3,
        .dark-mode .metric-card h3,
        .dark-mode .impact-card h3,
        .dark-mode .projection-card h4 {
          color: #f7fafc;
        }

        .dark-mode .stat-subtitle,
        .dark-mode .metric-label,
        .dark-mode .progress-label,
        .dark-mode .categories h4,
        .dark-mode .trend-item p,
        .dark-mode .projection-card li {
          color: #cbd5e0;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 2.5rem;
          }

          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .metric-content {
            flex-direction: column;
            gap: 20px;
          }

          .impact-grid {
            grid-template-columns: 1fr;
          }

          section {
            margin-bottom: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default Analytics;
