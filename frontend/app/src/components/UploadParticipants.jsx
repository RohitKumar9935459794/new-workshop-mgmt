import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './UploadParticipants.css';


const expectedHeaders = [
  "Name",
  "Fathers_Name",
  "Qualifiaction",
  "Designation",
  "Colleger_Name",
  "Mobile_Number",
  "Email",
  "Working",
  "Department",
  "Degree"
];

const validateExcelHeaders = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = jsonData[0] || [];
      const missingHeaders = expectedHeaders.filter(header => !headers.includes(header));

      if (missingHeaders.length > 0) {
        reject(`Missing headers: ${missingHeaders.join(', ')}`);
      } else {
        resolve(true);
      }
    };
    reader.readAsBinaryString(file);
  });
};


const handleDownloadTemplate = () => {
  const ws = XLSX.utils.aoa_to_sheet([expectedHeaders]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "ParticipantsTemplate");
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(new Blob([wbout], { type: "application/octet-stream" }), "participants_template.xlsx");
};


const UploadParticipants = ({ workshopId, onClose, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      await validateExcelHeaders(file);
      await addParticipantToWorkshop(workshopId, file);
      setSuccess(true);
      setFile(null);

      // Refresh participants list after successful upload
      setTimeout(() => {
        if (onUploadSuccess) onUploadSuccess();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to upload participants. Make sure to follow all Instructions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="participants-container">
      <div className="upload-section">
        <div className="upload-participants">
          <h3>Add Participant List via Excel</h3>

          {/* Instructions Box */}
           
          <div className="instruction-box">
<div className="instructions">
  <strong>📌 Instructions:</strong>
            <ul>
              <li>Only <strong>Excel</strong> files with <i>.xlsx</i> or <i>.xls</i> extension are accepted.</li>
              <li>The data must be in the <strong>first sheet</strong> of the Excel file.</li>
              <li>Ensure that specific columns names matches below format. (case-sensitive):</li>
              <code><i>
                
                Name, Fathers_Name, Qualification, Designation, College_Name, Mobile_Number, Email, Working, Department, Degree
               </i></code>
              <li>Make sure the headers are in the first row of the sheet.</li>
            </ul>
</div>
            
            <button onClick={handleDownloadTemplate} className="template-button">
    Download Excel Template
  </button> 
          </div>
          
          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">
              ✅ Participants uploaded successfully!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="file-input-container">
              
              <label className="file-input-label">
                📁 Choose Excel File
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
    </div>
  );
};

export default UploadParticipants;
