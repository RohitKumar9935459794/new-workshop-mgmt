// src/components/Participants.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import UploadParticipants from './UploadParticipants';
import './Participants.css';

const Participants = () => {
  const { workshopId } = useParams();
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="participants">
      <div className="participants-header">
        <h1>Participants for Workshop #{workshopId}</h1>
        <button 
          onClick={() => setShowUpload(!showUpload)}
          className="upload-toggle"
        >
          {showUpload ? 'Hide Upload' : 'Upload Participants'}
        </button>
      </div>
      
      {showUpload && (
        <UploadParticipants 
          workshopId={workshopId} 
          onClose={() => setShowUpload(false)} 
        />
      )}
      
      {/* Participant list would go here */}
      <div className="participants-list">
        {/* You would map through participants here */}
        <div className="no-participants">
          No participants found. Upload an Excel file to add participants.
        </div>
      </div>
    </div>
  );
};

export default Participants;