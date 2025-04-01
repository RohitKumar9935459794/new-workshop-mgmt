// // src/components/UploadParticipants.jsx
// import React, { useState } from 'react';
// import { uploadParticipants } from '../services/api';
// import './UploadParticipants.css';

// const UploadParticipants = ({ workshopId, onClose }) => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setSuccess(false);
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       setError('Please select a file');
//       return;
//     }
    
//     setLoading(true);
//     setError('');
    
//     try {
//       await uploadParticipants(workshopId, file);
//       setSuccess(true);
//       setFile(null);
//       // You might want to refresh the participants list here
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to upload participants');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="upload-participants">
//       <h3>Upload Participants Excel</h3>
      
//       {error && <div className="error-message">{error}</div>}
//       {success && (
//         <div className="success-message">
//           Participants uploaded successfully!
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <div className="file-input">
//           <input
//             type="file"
//             accept=".xlsx, .xls"
//             onChange={handleFileChange}
//             disabled={loading}
//           />
//           {file && <div className="file-name">{file.name}</div>}
//         </div>
        
//         <div className="buttons">
//           <button
//             type="submit"
//             disabled={!file || loading}
//             className="upload-btn"
//           >
//             {loading ? 'Uploading...' : 'Upload'}
//           </button>
//           <button
//             type="button"
//             onClick={onClose}
//             className="cancel-btn"
//           >
//             Close
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UploadParticipants;

// src/components/UploadParticipants.jsx
import React, { useState } from 'react';
import { uploadParticipants } from '../services/api';
import './UploadParticipants.css';

const UploadParticipants = ({ workshopId, onClose }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    // Validate file type
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
      await uploadParticipants(workshopId, file);
      setSuccess(true);
      setFile(null);
      setTimeout(() => {
        onClose(); // Close after successful upload
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to upload participants');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-participants">
      <h3>Upload Participants Excel</h3>
      
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
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadParticipants;