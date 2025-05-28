import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './WorkshopSuccess.css';

const WorkshopSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, workshop_id, message } = location.state || {};

  const handleAddParticipants = () => {
    navigate('/upload-participants', { state: { workshopId: workshop_id } });
  };
  if (!formData || !workshop_id) {
    return <p>Error: Missing workshop data.</p>;
  }

  const formatFieldName = (field) =>
    field.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const handleAddLater = () => {
    alert("Workshop has been added successfully!");
    navigate('/workshops'); // get workshops raports
  };

  return (
    <div className="workshop-success">
      <h2>Workshop Added Successfully</h2>
         <p><strong>Workshop ID:</strong> {workshop_id}</p>
      <table className="workshop-table">
        <tbody>
          {Object.entries(formData).map(([key, value]) => (
            <tr key={key}>
              <td><strong>{formatFieldName(key)}</strong></td>
              <td>{value || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-group">
        <button className="submit-btn" onClick={handleAddParticipants}>Add Participants Now</button>
        <button className="submit-btn secondary" onClick={handleAddLater}>
          Add Later
        </button>
      </div>
    </div>
  );
};

export default WorkshopSuccess;
