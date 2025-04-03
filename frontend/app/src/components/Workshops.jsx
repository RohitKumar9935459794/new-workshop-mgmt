// src/components/Workshops.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWorkshops, getWorkshopFilters, downloadWorkshops , getWorkshopParticipantsCount } from '../services/api';
import WorkshopCard from './WorkshopCard';
import Filters from './Filters';
import './Workshops.css';

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});

  const limit = 5;

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getWorkshopFilters();
        setFilterOptions(data);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };
    
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const params = { ...filters, page };
        const data = await getWorkshops(params);
        setWorkshops(data.workshops);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkshops();
  }, [filters, page]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleDownload = async () => {
    try {
      const blob = await downloadWorkshops();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'workshops.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading workshops:', error);
      alert('Failed to download workshops');
    }
  };

  return (
    <div className="workshops">
      <div className="workshops-header">
        <h1>Workshops</h1>
        <button onClick={handleDownload} className="download-btn">
          Download Excel
        </button>
      </div>
      
      <Filters 
        options={filterOptions} 
        currentFilters={filters} 
        onChange={handleFilterChange} 
      />
      
      {loading ? (
        <div className="loading">Loading workshops...</div>
      ) : (
        <>
          <div className="workshops-list">
            {workshops.length > 0 ? (
              workshops.map(workshop => (
                <WorkshopCard 
                  key={workshop.workshop_id} 
                  workshop={workshop} 
                />
              ))
            ) : (
              <div className="no-results">No workshops found</div>
            )}
          </div>
          
          <div className="pagination">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(p => p - 1)}
            >
              Previous
            </button>
            <span>Page {page} of {Math.ceil(total / limit)}</span>
            <button 
              disabled={page >= Math.ceil(total / limit)} 
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Workshops;