// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { getWorkshopStats } from '../services/api';
import StatsCard from './StatsCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [selectedYear, setSelectedYear] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const year = selectedYear.getFullYear();

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

  const handleYearChange = (date) => {
    setSelectedYear(date);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="year-selector">
        <label htmlFor="year">Financial Year:</label>
        <DatePicker
          selected={selectedYear}
          onChange={handleYearChange}
          showYearPicker
          dateFormat="yyyy"
          className="year-picker"
        />
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
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
          <div className="financial-range">
            As on 1st April {year} to 31st March {year + 1}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
