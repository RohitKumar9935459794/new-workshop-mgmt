// src/components/WorkshopCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './WorkshopCard.css';

const WorkshopCard = ({ workshop }) => {
  return (
    <div className="workshop-card">
      <div className="workshop-header">
        <h3>{workshop.subject}</h3>
        <span className="workshop-id">#{workshop.workshop_id}</span>
      </div>
      
      <div className="workshop-details">
        <div>
          <strong>Dates:</strong> {new Date(workshop.from_date).toLocaleDateString()} - {new Date(workshop.till_date).toLocaleDateString()}
        </div>
        <div>
          <strong>Technology:</strong> {workshop.technology}
        </div>
        <div>
          <strong>Mode:</strong> {workshop.mode} at {workshop.venue}
        </div>
        <div>
          <strong>Speaker:</strong> {workshop.speaker}
        </div>
      </div>
      
      <div className="workshop-actions">
        <Link 
          to={`/participants/${workshop.workshop_id}`} 
          className="view-participants"
        >
          View Participants
        </Link>
      </div>
    </div>
  );
};

export default WorkshopCard;