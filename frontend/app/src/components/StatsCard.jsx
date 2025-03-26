// src/components/StatsCard.jsx
import React from 'react';
import './StatsCard.css';

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="stats-card">
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <h3>{title}</h3>
        <p>{value || 0}</p>
      </div>
    </div>
  );
};

export default StatsCard;