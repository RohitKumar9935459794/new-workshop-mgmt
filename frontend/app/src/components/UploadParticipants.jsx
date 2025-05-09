import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addParticipantToWorkshop } from '../services/api';
import './UploadParticipants.css';
// import './ParticipantsTable.css';

const UploadParticipants = ({ workshopId, onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [participants, setParticipants] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    items_per_page: 20,
    total_items: 0
  });
// need to update
  // // Fetch participants when component mounts or workshopId changes to fetch total count of participants
  // useEffect(() => {
  //   fetchParticipants();
  // }, [workshopId]);

  // const fetchParticipants = async (page = 1) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/${workshopId}?page=${page}&limit=${pagination.items_per_page}`
  //     );
  //     const data = await response.json();
      
  //     if (data.success) {
  //       setParticipants(data.data.participants);
  //       setPagination(data.data.pagination);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching participants:', err);
  //   }
  // };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
      setError('Only Excel files (.xlsx, .xls) are allowed');
      return;
    }
    
    setFile(selectedFile);
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      await addParticipantToWorkshop(workshopId, file);
      setSuccess(true);
      setFile(null);
      
      // Refresh participants list after successful upload
      setTimeout(() => {
        fetchParticipants();
        if (onUploadSuccess) onUploadSuccess();
      }, 1500);
      
    } catch (err) {
      setError(err.message || 'Failed to upload participants');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      fetchParticipants(newPage);
    }
  };

  return (
    <div className="participants-container">
      <div className="upload-section">
        <div className="upload-participants">
          <h3>Add Participants Excel</h3>
          
          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">
              Participants uploaded successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="file-input-container">
              <label className="file-input-label">
                Choose Excel File
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  disabled={loading}
                  className="file-input"
                />
              </label>
              {file && (
                <div className="file-info">
                  Selected: {file.name} ({Math.round(file.size / 1024)} KB)
                </div>
              )}
            </div>
            
            <div className="button-group">
              <button
                type="submit"
                disabled={!file || loading}
                className="upload-button"
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cancel-button"
                disabled={loading}
              >
                Close
              </button>


              
            </div>
          </form>
        </div>
      </div>
      <div>
        
      </div>
      
      </div>
      
 );
  };
{/* /* 
      <div className="participants-table-section">
        <h2>Participants for Workshop #{workshopId}</h2>
        
        {participants.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="participants-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Qualification</th>
                    <th>Mobile</th>
                    <th>Email</th>
                    <th>College</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((participant) => (
                    <tr key={participant.regid}>
                      <td>{participant.regid}</td>
                      <td>{participant.name}</td>
                      <td>{participant.fathers_name}</td>
                      <td>{participant.qualification}</td>
                      <td>{participant.mobile_number}</td>
                      <td>{participant.email}</td>
                      <td>{participant.college_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button
                onClick={() => handlePageChange(pagination.current_page - 1)}
                disabled={!pagination.has_prev_page}
              >
                Previous
              </button>
              
              <span>
                Page {pagination.current_page} of {pagination.total_pages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.current_page + 1)}
                disabled={!pagination.has_next_page}
              >
                Next
              </button>
            </div>

            <div className="pagination-info">
              Showing {participants.length} of {pagination.total_items} participants
            </div>
          </> }
        ) : (
          <div className="no-participants">
            No participants found. Upload an Excel file to add participants.
          </div>
        )}
      </div>
    </div> */ }


export default UploadParticipants;