// // src/components/WorkshopCard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './WorkshopCard.css';

// const WorkshopCard = ({ workshop }) => {
//   return (
//     <div className="workshop-card">
//       <div className="workshop-header">
//         <h3>{workshop.subject}</h3>
//         <span className="workshop-id">#{workshop.workshop_Id}</span>
//       </div>
      
//       <div className="workshop-details">
//         <div>
//           <strong>Dates:</strong> {new Date(workshop.from_date).toLocaleDateString()} - {new Date(workshop.till_date).toLocaleDateString()}
//         </div>
//         <div>
//           <strong>Technology:</strong> {workshop.technology}
//         </div>
//         <div>
//           <strong>Mode:</strong> {workshop.mode} at {workshop.venue}
//         </div>
//         <div>
//           <strong>Speaker:</strong> {workshop.speaker}
//         </div>
//       </div>
      
//       <div className="workshop-actions">
//         <Link 
//           to={`/participants/${workshop.workShop_id}`} 
//           className="view-participants"
//         >
//           View Participants
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default WorkshopCard;
import React from 'react';
import { Link } from 'react-router-dom';
import './WorkshopCard.css';

const WorkshopCard = ({ workshop }) => {
  return (
    <div className="workshop-card">
      <div className="workshop-header">

        <span className="workshop-id"></span>
      </div>
      
      <div className="workshop-details">
        <div className="workshop-card stats-table-container">
          <table className="stats-table">
            <thead>
              <tr>
                <th className='WorkShop_ID'> 
                {workshop.WorkShop_ID}
                </th>
                <th className='w_subject'> 
                {workshop.Subject}
                </th>
                <th className='w_From_Date'> 
                {new Date(workshop.From_Date).toLocaleDateString()}
                </th>
                <th className='w_Till_Date'> 
                {new Date(workshop.Till_Date).toLocaleDateString()}
                </th>
                <th className='w_Technology'> 
                {workshop.Technology}
                </th>
                <th className='w_Mode'> 
                {workshop.Mode}
                </th>
                <th className='w_Venue'> 
                {workshop.venue}
                </th>
                <th className='w_speaker'> 
                {workshop.speaker}
                </th>
                <th className='w_total_participants'> 
                {workshop.total_participants || 0}
                </th>
                <th className='w_view'> 
                <Link 
                  to={`/${workshop.WorkShop_ID}`}
                   className="view-participants"
                 >
                  View Participants
                  </Link>
                </th>
              </tr>
            </thead>
          </table>
        </div>
        
      </div>
    </div>  
     
  );
};

export default WorkshopCard;