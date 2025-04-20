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
              </tr>
            </thead>
          </table>
        </div>
        
      </div>
    </div>  
     
  );
};

export default WorkshopCard;