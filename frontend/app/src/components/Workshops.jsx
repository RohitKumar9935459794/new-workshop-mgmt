// // src/components/Workshops.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getWorkshops, getWorkshopFilters, downloadWorkshops , getWorkshopParticipantsCount } from '../services/api';
// import WorkshopCard from './WorkshopCard';
// import Filters from './Filters';
// import './Workshops.css';

// const Workshops = () => {
//   const [workshops, setWorkshops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [filters, setFilters] = useState({});
//   const [filterOptions, setFilterOptions] = useState({});

//   const limit = 5;

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const data = await getWorkshopFilters();
//         setFilterOptions(data);
//       } catch (error) {
//         console.error('Error fetching filters:', error);
//       }
//     };
    
//     fetchFilters();
//   }, []);

//   useEffect(() => {
//     const fetchWorkshops = async () => {
//       try {
//         setLoading(true);
//         const params = { ...filters, page };
//         const data = await getWorkshops(params);
//         setWorkshops(data.workshops);
//         setTotal(data.total);
//       } catch (error) {
//         console.error('Error fetching workshops:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchWorkshops();
//   }, [filters, page]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setPage(1);
//   };

//   const handleDownload = async () => {
//     try {
//       const blob = await downloadWorkshops();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'workshops.xlsx');
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading workshops:', error);
//       alert('Failed to download workshops');
//     }
//   };

//   return (
//     <div className="workshops">
//       <div className="workshops-header">
//         <h1>Workshops</h1>
//         <button onClick={handleDownload} className="download-btn">
//           Download Excel
//         </button>
//       </div>
      
//       <Filters 
//         options={filterOptions} 
//         currentFilters={filters} 
//         onChange={handleFilterChange} 
//       />
      
//       {loading ? (
//         <div className="loading">Loading workshops...</div>
//       ) : (
//         <>
//           <div className="workshops-list">
//             {workshops.length > 0 ? (
//               workshops.map(workshop => (
//                 <WorkshopCard 
//                   key={workshop.workshop_id} 
//                   workshop={workshop} 
//                 />
//               ))
//             ) : (
//               <div className="no-results">No workshops found</div>
//             )}
//           </div>
          
//           <div className="pagination">
//             <button 
//               disabled={page === 1} 
//               onClick={() => setPage(p => p - 1)}
//             >
//               Previous
//             </button>
//             <span>Page {page} of {Math.ceil(total / limit)}</span>
//             <button 
//               disabled={page >= Math.ceil(total / limit)} 
//               onClick={() => setPage(p => p + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Workshops;

// // src/components/Workshops.jsx
// import React, { useEffect, useState } from 'react';
// import { 
//   getWorkshops, 
//   getWorkshopFilters, 
//   downloadWorkshops,
//   getWorkshopStats 
// } from '../services/api';
// import WorkshopCard from './WorkshopCard';
// import Filters from './Filters';
// import StatsCard from './StatsCard';
// import './Workshops.css';

// const Workshops = () => {
//   const [workshops, setWorkshops] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [statsLoading, setStatsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [filters, setFilters] = useState({});
//   const [filterOptions, setFilterOptions] = useState({});
//   const [stats, setStats] = useState(null);

//   const limit = 5;

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const data = await getWorkshopFilters();
//         setFilterOptions(data);
//       } catch (error) {
//         console.error('Error fetching filters:', error);
//       }
//     };
    
//     fetchFilters();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch workshops with pagination
//         const params = { ...filters, page, limit };
//         const workshopData = await getWorkshops(params);
//         setWorkshops(workshopData.workshops);
//         setTotal(workshopData.total);
        
//         // Fetch statistics based on current filters
//         setStatsLoading(true);
//         const statsData = await getWorkshopStats(filters);
//         setStats(statsData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//         setStatsLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [filters, page]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setPage(1);
//   };

//   const handleDownload = async () => {
//     try {
//       const blob = await downloadWorkshops();
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'workshops.xlsx');
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } catch (error) {
//       console.error('Error downloading workshops:', error);
//       alert('Failed to download workshops');
//     }
//   };

//   return (
//     <div className="workshops">
//       <div className="workshops-header">
//         <h1>Workshops</h1>
//         <button onClick={handleDownload} className="download-btn">
//           Download Excel
//         </button>
//       </div>
      
//       <Filters 
//         options={filterOptions} 
//         currentFilters={filters} 
//         onChange={handleFilterChange} 
//       />
      
//       {/* Statistics Cards */}
//       <div className="stats-container">
//         <StatsCard 
//           title="Total Workshops" 
//           value={stats?.total_workshops || 0} 
//           loading={statsLoading}
//         />
//         <StatsCard 
//           title="Total Participants" 
//           value={stats?.total_participants || 0} 
//           loading={statsLoading}
//         />
//         {filters.year && (
//           <StatsCard 
//             title="Financial Year" 
//             value={stats?.filters?.financial_year || ''} 
//             loading={statsLoading}
//             isLabel={true}
//           />
//         )}
//       </div>
      
//       {loading ? (
//         <div className="loading">Loading workshops...</div>
//       ) : (
//         <>
//           <div className="workshops-list">
//             {workshops.length > 0 ? (
//               workshops.map(workshop => (
//                 <WorkshopCard 
//                   key={workshop.workshop_id} 
//                   workshop={workshop} 
//                 />
//               ))
//             ) : (
//               <div className="no-results">No workshops found</div>
//             )}
//           </div>
          
//           <div className="pagination">
//             <button 
//               disabled={page === 1} 
//               onClick={() => setPage(p => p - 1)}
//             >
//               Previous
//             </button>
//             <span>Page {page} of {Math.ceil(total / limit)}</span>
//             <button 
//               disabled={page >= Math.ceil(total / limit)} 
//               onClick={() => setPage(p => p + 1)}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Workshops;


// src/components/Workshops.jsx
import React, { useEffect, useState } from 'react';
import { 
  getWorkshops, 
  getWorkshopFilters, 
  downloadWorkshops,
  getWorkshopStats 
} from '../services/api';
import WorkshopCard from './WorkshopCard';
import Filters from './Filters';
import StatsCard from './StatsCard';
import './Workshops.css';

const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [stats, setStats] = useState(null);

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
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch workshops with pagination
        const params = { ...filters, page, limit };
        const workshopData = await getWorkshops(params);
        setWorkshops(workshopData.workshops);
        setTotal(workshopData.total);
        
        // Fetch statistics based on current filters
        setStatsLoading(true);
        const statsData = await getWorkshopStats(filters);
        setStats(statsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
        setStatsLoading(false);
      }
    };
    
    fetchData();
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
      
      {/* Statistics Cards */}
      <div className="stats-container">
        <StatsCard 
          title="Total Workshops" 
          value={stats?.total_workshops || 0} 
          loading={statsLoading}
        />
        <StatsCard 
          title="Total Participants" 
          value={stats?.total_participants || 0} 
          loading={statsLoading}
        />
        {filters.year && (
          <StatsCard 
            title="Financial Year" 
            value={stats?.filters?.financial_year || ''} 
            loading={statsLoading}
            isLabel={true}
          />
        )}
      </div>
      
      {loading ? (
        <div className="loading">Loading workshops...</div>
      ) : (
        <>

        <table className="excel-table">
        <thead>
          <tr>
            <th className='WorkShop_ID'>ID</th>
            <th className='w_subject'>Subject</th>
            <th className='w_From_Date'>From Date</th>
            <th className='w_Till_Date'>Till Date</th>
            <th className='w_Technology'>Technology</th>
            <th className='w_Mode'>Mode</th>
            <th className='w_Venue'>Venue</th>
            <th className='w_speaker'>Speaker</th>
            <th className='w_total_participants'>Participants</th>
            <th className='w_view'>Action</th>
          </tr>
    </thead>
        </table>
          <div >
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