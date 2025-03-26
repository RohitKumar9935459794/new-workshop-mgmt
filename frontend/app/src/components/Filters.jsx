// src/components/Filters.jsx
import React, { useState } from 'react';
import './Filters.css';

const Filters = ({ options, currentFilters, onChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localFilters, setLocalFilters] = useState(currentFilters);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    onChange(localFilters);
  };

  const resetFilters = () => {
    const reset = {};
    setLocalFilters(reset);
    onChange(reset);
  };

  return (
    <div className="filters">
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className="filter-toggle"
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>
      
      {showFilters && (
        <div className="filter-controls">
          <div className="filter-row">
            <div className="filter-group">
              <label>Subject:</label>
              <select
                name="subject"
                value={localFilters.subject || ''}
                onChange={handleFilterChange}
              >
                <option value="">All Subjects</option>
                {options.subjects?.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Technology:</label>
              <select
                name="technology"
                value={localFilters.technology || ''}
                onChange={handleFilterChange}
              >
                <option value="">All Technologies</option>
                {options.technologies?.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Project:</label>
              <select
                name="project"
                value={localFilters.project || ''}
                onChange={handleFilterChange}
              >
                <option value="">All Projects</option>
                {options.projects?.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="filter-row">
            <div className="filter-group">
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={localFilters.date || ''}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label>Center:</label>
              <select
                name="centre"
                value={localFilters.centre || ''}
                onChange={handleFilterChange}
              >
                <option value="">All Centers</option>
                {options.centres?.map(centre => (
                  <option key={centre} value={centre}>{centre}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Mode:</label>
              <select
                name="mode"
                value={localFilters.mode || ''}
                onChange={handleFilterChange}
              >
                <option value="">All Modes</option>
                {options.modes?.map(mode => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="filter-row">
            <div className="filter-group">
              <label>Speaker:</label>
              <select
                name="speaker"
                value={localFilters.speaker || ''}
                onChange={handleFilterChange}
              >
                <option value="">All Speakers</option>
                {options.speakers?.map(speaker => (
                  <option key={speaker} value={speaker}>{speaker}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="filter-buttons">
            <button onClick={applyFilters} className="apply-btn">
              Apply Filters
            </button>
            <button onClick={resetFilters} className="reset-btn">
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;