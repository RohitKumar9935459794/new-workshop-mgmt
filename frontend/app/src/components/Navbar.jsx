// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Workshop Management</div>
      <ul className="navbar-nav">
        <li className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
          <Link to="/dashboard" onClick={() => setActiveTab('dashboard')}>
            Dashboard
          </Link>
        </li>
        <li className={`nav-item ${activeTab === 'workshops' ? 'active' : ''}`}>
          <Link to="/workshops" onClick={() => setActiveTab('workshops')}>
            Workshops
          </Link>
        </li>
        <li className={`nav-item ${activeTab === 'add-workshop' ? 'active' : ''}`}>
          <Link to="/add-workshop" onClick={() => setActiveTab('add-workshop')}>
            Add Workshop
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;