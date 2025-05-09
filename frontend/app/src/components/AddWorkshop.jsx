// src/components/AddWorkshop.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addWorkshop } from '../services/api';
import './AddWorkshop.css';

const AddWorkshop = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    from_date: '',
    till_date: '',
    duration: '',
    technology: '',
    project: '',
    centre: '',
    mode: '',
    speaker_name: '',
    other1: '',
    other2: '',
    other3: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await addWorkshop(formData);
      navigate('/new');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add workshop');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-workshop">
      <h1>Add New Workshop</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>From Date:</label>
            <input
              type="date"
              name="from_date"
              value={formData.from_date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Till Date:</label>
            <input
              type="date"
              name="till_date"
              value={formData.till_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Duration:</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Technology:</label>
            <input
              type="text"
              name="technology"
              value={formData.technology}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Project:</label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
            />
          </div>
          
         
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Center:</label>
            <select
              name="centre"
              value={formData.centre}
              onChange={handleChange}
              required
            >
              <option value="">Select Center</option>
              <option value="Janakpuri">Janakpuri</option>
              <option value="Karkardooma">Karkardooma</option>
              <option value="Inderlok">Inderlok</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Mode:</label>
            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              required
            >
              <option value="">Select Mode</option>
              <option value="Offline">Offline</option>
              <option value="Online">Online</option>
              <option value="Online">Hybrid</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Speaker Name:</label>
            <input
              type="text"
              name="speaker_name"
              value={formData.speaker_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Other Option 1:</label>
            <input
              type="text"
              name="other1"
              value={formData.other1}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Other Option 2:</label>
            <input
              type="text"
              name="other2"
              value={formData.other2}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Other Option 3:</label>
            <input
              type="text"
              name="other3"
              value={formData.other3}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Adding...' : 'Add Workshop'}
        </button>
      </form>
    </div>
  );
};

export default AddWorkshop;