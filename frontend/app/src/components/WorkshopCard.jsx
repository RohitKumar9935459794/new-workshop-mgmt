import React from 'react';
import { Link } from 'react-router-dom';
import './WorkshopCard.css';

const WorkshopCard = ({ workshop }) => {
  return (
    <tr className="workshop-row">
      <td className="WorkShop_ID">{workshop.WorkShop_ID}</td>
      <td className="w_subject">{workshop.Subject}</td>
      <td className="w_From_Date">{new Date(workshop.From_Date).toLocaleDateString()}</td>
      <td className="w_Till_Date">{new Date(workshop.Till_Date).toLocaleDateString()}</td>
      <td className="w_Technology">{workshop.Technology}</td>
      <td className="w_Mode">{workshop.Mode}</td>
      <td className="w_Venue">{workshop.venue}</td>
      <td className="w_speaker">{workshop.speaker}</td>
      <td className="w_total_participants">{workshop.total_participants || 0}</td>
      <td className="w_view">
        <Link to={`/${workshop.WorkShop_ID}`} className="view-participants">
          View Participants
        </Link>
      </td>
    </tr>
  );
};

export default WorkshopCard;
