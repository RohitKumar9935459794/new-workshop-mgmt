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
        <h3>{workshop.Subject}</h3>
        <span className="workshop-id">#{workshop.WorkShop_ID}</span>
      </div>
      
      <div className="workshop-details">
        <div>
          <strong>Dates:</strong> {new Date(workshop.From_Date).toLocaleDateString()} - {new Date(workshop.Till_Date).toLocaleDateString()}
        </div>
        <div>
          <strong>Technology:</strong> {workshop.Technology}
        </div>
        <div>
          <strong>Mode:</strong> {workshop.Mode} at {workshop.venue}
        </div>
        <div>
          <strong>Speaker:</strong> {workshop.speaker}
        </div>
      </div>
      
      <div className="workshop-actions">
        <Link 
          to={`/${workshop.WorkShop_ID}`}
          className="view-participants"
        >
          View Participants
        </Link>
      </div>
    </div>
  );
};

export default WorkshopCard;