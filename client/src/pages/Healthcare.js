import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Healthcare.css';

const Healthcare = () => {
  const [healthcareData, setHealthcareData] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    technology: '',
    status: ''
  });

  useEffect(() => {
    fetchData();
    fetchAnalytics();
  }, [filters]);

  const fetchData = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      
      const response = await axios.get(`/api/healthcare?${params}`);
      setHealthcareData(response.data.data || []);
    } catch (error) {
      console.error('Error fetching healthcare data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get('/api/healthcare/analytics/overview');
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return <div className="loading">Loading healthcare data...</div>;
  }

  return (
    <div className="healthcare-page">
      <div className="container">
        <div className="page-header">
          <h1>🏥 Healthcare AI Applications</h1>
          <p>Exploring how generative AI is transforming healthcare through improved diagnosis, treatment, and patient care.</p>
        </div>

        {/* Analytics Overview */}
        {analytics && (
          <div className="analytics-section">
            <h2>Healthcare AI Overview</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>{analytics.totalEntries}</h3>
                <p>Total Healthcare AI Cases</p>
              </div>
              <div className="analytics-card">
                <h3>{analytics.categoryCounts?.length || 0}</h3>
                <p>Application Categories</p>
              </div>
              <div className="analytics-card">
                <h3>{analytics.technologyCounts?.length || 0}</h3>
                <p>AI Technologies</p>
              </div>
              <div className="analytics-card">
                <h3>{analytics.statusCounts?.find(s => s._id === 'deployed')?.count || 0}</h3>
                <p>Deployed Solutions</p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="filters-section">
          <h3>Filter Applications</h3>
          <div className="filters-grid">
            <select 
              value={filters.category} 
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="diagnosis">Diagnosis</option>
              <option value="drug_discovery">Drug Discovery</option>
              <option value="medical_imaging">Medical Imaging</option>
              <option value="patient_care">Patient Care</option>
              <option value="research">Research</option>
            </select>

            <select 
              value={filters.technology} 
              onChange={(e) => handleFilterChange('technology', e.target.value)}
            >
              <option value="">All Technologies</option>
              <option value="GPT">GPT</option>
              <option value="CNN">CNN</option>
              <option value="RNN">RNN</option>
              <option value="Transformer">Transformer</option>
              <option value="GAN">GAN</option>
              <option value="Other">Other</option>
            </select>

            <select 
              value={filters.status} 
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="research">Research</option>
              <option value="pilot">Pilot</option>
              <option value="deployed">Deployed</option>
              <option value="widespread">Widespread</option>
            </select>
          </div>
        </div>

        {/* Healthcare Applications */}
        <div className="applications-section">
          <h2>Healthcare AI Applications</h2>
          {healthcareData.length > 0 ? (
            <div className="applications-grid">
              {healthcareData.map((item) => (
                <div key={item._id} className="application-card">
                  <div className="card-header">
                    <h3>{item.title}</h3>
                    <span className={`status-badge ${item.implementationStatus}`}>
                      {item.implementationStatus}
                    </span>
                  </div>
                  
                  <div className="card-content">
                    <p className="description">{item.description}</p>
                    
                    <div className="tech-info">
                      <span className="category">{item.category}</span>
                      <span className="technology">{item.aiTechnology}</span>
                    </div>

                    {item.caseStudy && (
                      <div className="case-study">
                        <h4>Case Study</h4>
                        <p><strong>Hospital:</strong> {item.caseStudy.hospitalName}</p>
                        <p><strong>Location:</strong> {item.caseStudy.location}</p>
                        {item.caseStudy.patientsImpacted && (
                          <p><strong>Patients Impacted:</strong> {item.caseStudy.patientsImpacted.toLocaleString()}</p>
                        )}
                      </div>
                    )}

                    {item.benefits && item.benefits.length > 0 && (
                      <div className="benefits">
                        <h4>Key Benefits</h4>
                        <ul>
                          {item.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-data">
              <p>No healthcare applications found with the current filters.</p>
            </div>
          )}
        </div>

        {/* Sample Applications */}
        <div className="sample-section">
          <h2>Featured Healthcare AI Applications</h2>
          <div className="sample-grid">
            <div className="sample-card">
              <h3>🔬 AI-Powered Diagnostic Imaging</h3>
              <p>Deep learning models that can detect early-stage cancer with 95% accuracy, helping radiologists make faster and more precise diagnoses.</p>
              <div className="sample-stats">
                <span>Accuracy: 95%</span>
                <span>Time Reduction: 40%</span>
              </div>
            </div>
            
            <div className="sample-card">
              <h3>💊 Drug Discovery Acceleration</h3>
              <p>AI algorithms that identify potential drug compounds and predict their effectiveness, reducing drug development time from years to months.</p>
              <div className="sample-stats">
                <span>Time Saved: 60%</span>
                <span>Cost Reduction: 50%</span>
              </div>
            </div>
            
            <div className="sample-card">
              <h3>🏥 Personalized Treatment Plans</h3>
              <p>AI systems that analyze patient data to create customized treatment protocols, improving patient outcomes and reducing side effects.</p>
              <div className="sample-stats">
                <span>Success Rate: 85%</span>
                <span>Patient Satisfaction: 92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Healthcare;
