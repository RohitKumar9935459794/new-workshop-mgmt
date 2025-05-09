import React, { useEffect, useState } from 'react';
import { getWorkshops, getWorkshopFilters } from '../services/api';
import './Workshops.css';

const WorkshopTable = () => {
  const [workshops, setWorkshops] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getWorkshopFilters();
        setFilterOptions(data);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };
    fetchFilters();
  }, []);

  // Fetch workshops whenever filters change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const workshopData = await getWorkshops(filters);
        setWorkshops(workshopData.workshops);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  // Handle filter change
  const handleFilterChange = (e, field) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      [field]: value === 'All' ? undefined : value
    }));
  };

  return (
    <div className="workshop-table-container">
      <h2>All Workshops</h2>

      {loading ? (
        <div className="loading">Loading workshops...</div>
      ) : (
        <table className="workshop-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Subject
              </th>
              <th>
                From Date
              </th>
              <th>
                Till Date
              </th>
              <th>
                Technology
                <select
                  onChange={(e) => handleFilterChange(e, 'Technology')}
                  value={filters.Technology || 'All'}
                >
                  <option>All</option>
                  {filterOptions.Technology?.map((tech, i) => (
                    <option key={i} value={tech}>{tech}</option>
                  ))}
                </select>
              </th>
              <th>
                Mode
                <select
                  onChange={(e) => handleFilterChange(e, 'Mode')}
                  value={filters.Mode || 'All'}
                >
                  <option>All</option>
                  {filterOptions.Mode?.map((mode, i) => (
                    <option key={i} value={mode}>{mode}</option>
                  ))}
                </select>
              </th>
              <th>Venue</th>
              <th>Speaker</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
            {workshops.length > 0 ? (
              workshops.map(w => (
                <tr key={w.WorkShop_ID}>
                  <td>{w.WorkShop_ID}</td>
                  <td>{w.Subject}</td>
                  <td>{w.From_Date}</td>
                  <td>{w.Till_Date}</td>
                  <td>{w.Technology}</td>
                  <td>{w.Mode}</td>
                  <td>{w.Venue}</td>
                  <td>{w.Speaker}</td>
                  <td>{w.Total_Participants}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-results">No workshops found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WorkshopTable;
