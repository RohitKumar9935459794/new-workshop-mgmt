// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getWorkshopStats } from '../services/api';
import StatsCard from './StatsCard';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [year, setYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getWorkshopStats(year);
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="year-selector">
        <label htmlFor="year">Financial Year:</label>
        <select id="year" value={year} onChange={handleYearChange}>
          {Array.from({ length: 5 }, (_, i) => {
            const y = new Date().getFullYear() - 2 + i;
            return (
              <option key={y} value={y}>
                {y}-{y + 1}
              </option>
            );
          })}
        </select>
      </div>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="stats-grid">
          <StatsCard 
            title="Total Workshops" 
            value={stats.total_workshops} 
            icon="📊"
          />
          <StatsCard 
            title="Total Participants" 
            value={stats.total_participants} 
            icon="👥"
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;