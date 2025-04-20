// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import UploadParticipants from './UploadParticipants';
// import './Participants.css';

// const Participants = () => {
//   const { workshopId } = useParams();
//   const [showUpload, setShowUpload] = useState(false);
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 20,
//     total: 0,
//     totalPages: 1
//   });

//   const fetchParticipants = async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `/${workshopId}?page=${page}&limit=${pagination.limit}`
//       );
//       const data = await response.json();
      
//       if (data.success) {
//         setParticipants(data.participants);
//         setPagination(data.pagination);
//       } else {
//         setError(data.error || 'Failed to fetch participants');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchParticipants();
//   }, [workshopId]);

//   const handleUploadSuccess = () => {
//     fetchParticipants(pagination.page); // Refresh current page
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       fetchParticipants(newPage);
//     }
//   };

//   return (
//     <div className="participants">
//       <div className="participants-header">
//         <h1>Participants for Workshop #{workshopId}</h1>
//         <button 
//           onClick={() => setShowUpload(!showUpload)}
//           className="upload-toggle"
//         >
//           {showUpload ? 'Hide Upload' : 'Upload Participants'}
//         </button>
//       </div>
      
//       {showUpload && (
//         <UploadParticipants 
//           workshopId={workshopId} 
//           onClose={() => setShowUpload(false)}
//           onSuccess={handleUploadSuccess}
//         />
//       )}
      
//       {error && <div className="error-message">{error}</div>}
      
//       <div className="participants-list">
//         {loading ? (
//           <div className="loading">Loading participants...</div>
//         ) : participants.length === 0 ? (
//           <div className="no-participants">
//             No participants found. Upload an Excel file to add participants.
//           </div>
//         ) : (
//           <>
//             <table className="participants-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Mobile</th>
//                   <th>Qualification</th>
//                   <th>College</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {participants.map(participant => (
//                   <tr key={participant.id}>
//                     <td>{participant.name}</td>
//                     <td>{participant.email}</td>
//                     <td>{participant.mobileNo}</td>
//                     <td>{participant.Highestqualifications}</td>
//                     <td>{participant.collegename}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
            
//             <div className="pagination">
//               <button
//                 onClick={() => handlePageChange(pagination.page - 1)}
//                 disabled={pagination.page === 1}
//               >
//                 Previous
//               </button>
              
//               <span>
//                 Page {pagination.page} of {pagination.totalPages}
//               </span>
              
//               <button
//                 onClick={() => handlePageChange(pagination.page + 1)}
//                 disabled={pagination.page === pagination.totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Participants;




// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getParticipants } from '../services/api';
// import './Participants.css';

// const Participants = () => {
//   const { workshopId } = useParams();
//   const [showUpload, setShowUpload] = useState(false);
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 20,
//     total: 0,
//     totalPages: 1
//   });

//   const fetchParticipants = async (page = 1) => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const data = await getParticipants(workshopId, page, pagination.limit);
      
//       setParticipants(data.participants);
//       setPagination({
//         page: data.pagination.current_page,
//         limit: data.pagination.items_per_page,
//         total: data.pagination.total_items,
//         totalPages: data.pagination.total_pages
//       });
      
//     } catch (err) {
//       setError(err.message);
//       console.error('Fetch error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchParticipants();
//   }, [workshopId]);

//   const handleUploadSuccess = () => {
//     fetchParticipants(pagination.page); // Refresh current page
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       fetchParticipants(newPage);
//     }
//   };

//   return (
//     <div className="participants">
//       <div className="participants-header">
//         <h1>Participants for Workshop #{workshopId}</h1>
//         <button 
//           onClick={() => setShowUpload(!showUpload)}
//           className="upload-toggle"
//         >
//           {showUpload ? 'Hide Upload' : 'Upload Participants'}
//         </button>
//       </div>
      
//       {showUpload && (
//         <UploadParticipants 
//           workshopId={workshopId} 
//           onClose={() => setShowUpload(false)}
//           onSuccess={handleUploadSuccess}
//         />
//       )}
      
//       {error && <div className="error-message">{error}</div>}
      
//       <div className="participants-list">
//         {loading ? (
//           <div className="loading">Loading participants...</div>
//         ) : participants.length === 0 ? (
//           <div className="no-participants">
//             No participants found. Upload an Excel file to add participants.
//           </div>
//         ) : (
//           <>
//             <table className="participants-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Mobile</th>
//                   <th>Qualification</th>
//                   <th>College</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {participants.map(participant => (
//                   <tr key={participant.id}>
//                     <td>{participant.name}</td>
//                     <td>{participant.email}</td>
//                     <td>{participant.mobileNo}</td>
//                     <td>{participant.Highestqualifications}</td>
//                     <td>{participant.collegename}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
            
//             <div className="pagination">
//               <button
//                 onClick={() => handlePageChange(pagination.page - 1)}
//                 disabled={pagination.page === 1}
//               >
//                 Previous
//               </button>
              
//               <span>
//                 Page {pagination.page} of {pagination.totalPages}
//               </span>
              
//               <button
//                 onClick={() => handlePageChange(pagination.page + 1)}
//                 disabled={pagination.page === pagination.totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Participants;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { getParticipants } from '../services/api';
// import UploadParticipants from './UploadParticipants';
// import './Participants.css';

// const Participants = () => {
//   const { workshopId } = useParams();
//   const [showUpload, setShowUpload] = useState(false);
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 20,
//     total: 0,
//     totalPages: 1
//   });

//   const fetchParticipants = async (page = 1) => {
//     try {
//       setLoading(true);
//       setError('');
      
//       // Mock API call - replace with actual API call
//       const response = await fetch(
//         `http://localhost:5000/api/${workshopId}?page=${page}&limit=${pagination.items_per_page}`
//       );
//       const data = await response.json();
      
      
//       if (data.success) {
//         setParticipants(data.data.participants); // Updated to match your API structure
//         setPagination({
//           page: data.data.pagination.current_page,
//           limit: data.data.pagination.items_per_page,
//           total: data.data.pagination.total_items,
//           totalPages: data.data.pagination.total_pages
//         });
//       } else {
//         setError(data.error || 'Failed to fetch participants');
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error('Fetch error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchParticipants();
//   }, [workshopId]);

//   const handleUploadSuccess = () => {
//     fetchParticipants(pagination.page); // Refresh current page
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       fetchParticipants(newPage);
//     }
//   };

//   return (
//     <div className="participants">
//       <div className="participants-header">
//         <h1>Participants for Workshop #{workshopId}</h1>
//         <button 
//           onClick={() => setShowUpload(!showUpload)}
//           className="upload-toggle"
//         >
//           {showUpload ? 'Hide Upload' : 'Upload Participants'}
//         </button>
//       </div>
      
//       {showUpload && (
//         <UploadParticipants 
//           workshopId={workshopId} 
//           onClose={() => setShowUpload(false)}
//           onSuccess={handleUploadSuccess}
//         />
//       )}
      
//       {error && <div className="error-message">{error}</div>}
      
//       <div className="participants-list">
//         {loading ? (
//           <div className="loading">Loading participants...</div>
//         ) : participants.length === 0 ? (
//           <div className="no-participants">
//             No participants found. Upload an Excel file to add participants.
//           </div>
//         ) : (
//           <>
//             <table className="participants-table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Father's Name</th>
//                   <th>Email</th>
//                   <th>Mobile</th>
//                   <th>Qualification</th>
//                   <th>College</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {participants.map(participant => (
//                   <tr key={participant.regid}>
//                     <td>{participant.name}</td>
//                     <td>{participant.fathers_name}</td>
//                     <td>{participant.email}</td>
//                     <td>{participant.mobile_number}</td>
//                     <td>{participant.qualification}</td>
//                     <td>{participant.college_name || 'N/A'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
            
//             <div className="pagination">
//               <button
//                 onClick={() => handlePageChange(pagination.page - 1)}
//                 disabled={pagination.page === 1}
//               >
//                 Previous
//               </button>
              
//               <span>
//                 Page {pagination.page} of {pagination.totalPages}
//               </span>
              
//               <button
//                 onClick={() => handlePageChange(pagination.page + 1)}
//                 disabled={pagination.page === pagination.totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Participants;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import UploadParticipants from './UploadParticipants';
// import './Participants.css';

// const Participants = () => {
//   const { workshopId } = useParams();
//   const [showUpload, setShowUpload] = useState(false);
//   const [participants, setParticipants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 20,
//     total: 0,
//     totalPages: 1
//   });

//   const fetchParticipants = async (page = 1) => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const response = await fetch(
//         `http://localhost:5000/api/${workshopId}?page=${page}&limit=${pagination.items_per_page}`
//       );

//       // Check if response is successful (status 200-299)
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       // Check if response is JSON
//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         const text = await response.text();
//         throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
//       }

//       const data = await response.json();
      
//       if (data.success) {
//         setParticipants(data.data.participants);
//         setPagination({
//           page: data.data.pagination.current_page,
//           limit: data.data.pagination.items_per_page,
//           total: data.data.pagination.total_items,
//           totalPages: data.data.pagination.total_pages
//         });
//       } else {
//         setError(data.error || 'Failed to fetch participants');
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError('Failed to load participants. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchParticipants();
//   }, [workshopId]);

//   const handleUploadSuccess = () => {
//     fetchParticipants(pagination.page);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.totalPages) {
//       fetchParticipants(newPage);
//     }
//   };

//   return (
//     <div className="participants-container">
//       <div className="participants-header">
//         <h1>Participants for Workshop #{workshopId}</h1>
//         <button 
//           onClick={() => setShowUpload(!showUpload)}
//           className="upload-toggle-btn"
//         >
//           {showUpload ? 'Hide Upload' : 'Upload Participants'}
//         </button>
//       </div>
      
//       {showUpload && (
//         <UploadParticipants 
//           workshopId={workshopId} 
//           onClose={() => setShowUpload(false)}
//           onSuccess={handleUploadSuccess}
//         />
//       )}
//       <div >
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

      
      
//       {error && <div className="error-message">{error}</div>}

      
      
//       <div className="participants-content">
//         {loading ? (
//           <div className="loading-spinner">Loading participants...</div>
//         ) : participants.length === 0 ? (
//           <div className="no-participants-message">
//             No participants found. Upload an Excel file to add participants.
//           </div>
//         ) : (
//           <>
//             <div className="table-container">
//               <table className="participants-table">
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Father's Name</th>
//                     <th>Email</th>
//                     <th>Mobile</th>
//                     <th>Qualification</th>
//                     <th>College</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {participants.map(participant => (
//                     <tr key={participant.regid}>
//                       <td>{participant.name}</td>
//                       <td>{participant.fathers_name}</td>
//                       <td>{participant.email}</td>
//                       <td>{participant.mobile_number}</td>
//                       <td>{participant.qualification}</td>
//                       <td>{participant.college_name || 'N/A'}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
            
//             <div className="pagination-controls">
//               <button
//                 onClick={() => handlePageChange(pagination.page - 1)}
//                 disabled={pagination.page === 1}
//                 className="pagination-btn"
//               >
//                 Previous
//               </button>
              
//               <span className="page-info">
//                 Page {pagination.page} of {pagination.totalPages}
//               </span>
              
//               <button
//                 onClick={() => handlePageChange(pagination.page + 1)}
//                 disabled={pagination.page === pagination.totalPages}
//                 className="pagination-btn"
//               >
//                 Next
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Participants;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UploadParticipants from './UploadParticipants';
import WorkshopCard from './workshopCard_forCan'; // Make sure to import WorkshopCard
import './Participants.css';

const Participants = () => {
  const { workshopId } = useParams();
  const [showUpload, setShowUpload] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [workshopDetails, setWorkshopDetails] = useState(null); // Added for workshop details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1
  });

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      setError('');
      
      // Fetch workshop details
      const workshopResponse = await fetch(
        `http://localhost:5000/api/workshops/${workshopId}`
      );

      
      const workshopData = await workshopResponse.json();
      setWorkshopDetails(workshopData.workshopDetails);
      console.log(workshopData);
      // Fetch participants
      const participantsResponse = await fetch(
       `http://localhost:5000/api/${workshopId}`
      );
      const participantsData = await participantsResponse.json();
      
      if (participantsData.success) {
        setParticipants(participantsData.data.participants);
        setPagination({
          page: participantsData.data.pagination.current_page,
          limit: participantsData.data.pagination.items_per_page,
          total: participantsData.data.pagination.total_items,
          totalPages: participantsData.data.pagination.total_pages
        });
      } else {
        setError(participantsData.error || 'Failed to fetch participants');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [workshopId]);

  const handleUploadSuccess = () => {
    fetchData(pagination.page);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchData(newPage);
    }
  };

  return (
    <div className="participants-container">
      <div className="participants-header">
        <h1>Participants for Workshop #{workshopId}</h1>
        <button 
          onClick={() => setShowUpload(!showUpload)}
          className="upload-toggle-btn"
        >
          {showUpload ? 'Hide Upload' : 'Upload Participants'}
        </button>
      </div>
      
      {showUpload && (
        <UploadParticipants 
          workshopId={workshopId} 
          onClose={() => setShowUpload(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
      
      {/* Workshop Details Section */}
      <div className="workshop-details-section">
        <h2>Workshop Details</h2>
        {workshopDetails ? (
          <div className="workshop-card-container">
            <WorkshopCard 
              workshop={workshopDetails} 
              showDetails={true} // Add this prop to show full details
            />
          </div>
        ) : (
          <div className="loading-spinner">Loading workshop details...</div>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="participants-content">
        <h2>Participants List</h2>
        {loading ? (
          <div className="loading-spinner">Loading participants...</div>
        ) : participants.length === 0 ? (
          <div className="no-participants-message">
            No participants found. Upload an Excel file to add participants.
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="participants-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Father's Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Qualification</th>
                    <th>College</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map(participant => (
                    <tr key={participant.regid}>
                      <td>{participant.name}</td>
                      <td>{participant.fathers_name}</td>
                      <td>{participant.email}</td>
                      <td>{participant.mobile_number}</td>
                      <td>{participant.qualification}</td>
                      <td>{participant.college_name || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              <span className="page-info">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Participants;