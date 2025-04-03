// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, Button, Select, Input, Pagination } from "antd";

// const { Option } = Select;

// const Workshops = () => {
//   const [workshops, setWorkshops] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [filterOptions, setFilterOptions] = useState({
//     subjects: [],
//     technologies: [],
//     projects: [],
//     speakers: [],
//     centres: [],
//     modes: [],
//   });

//   useEffect(() => {
//     fetchWorkshops();
//     fetchFilters();
//   }, [page, filters]);

//   const fetchWorkshops = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/workshops", {
//         params: { page, ...filters },
//       });
//       setWorkshops(data.workshops);
//       setTotal(data.total);
//     } catch (error) {
//       console.error("Error fetching workshops:", error);
//     }
//   };

//   const fetchFilters = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/workshops/filters");
//       setFilterOptions(data);
//     } catch (error) {
//       console.error("Error fetching filter options:", error);
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//     setPage(1);
//   };

//   const columns = [
//     { title: "Subject", dataIndex: "subject", key: "subject" },
//     { title: "From Date", dataIndex: "from_date", key: "from_date" },
//     { title: "Till Date", dataIndex: "till_date", key: "till_date" },
//     { title: "Technology", dataIndex: "technology", key: "technology" },
//     { title: "Project", dataIndex: "project", key: "project" },
//     { title: "Venue", dataIndex: "venue", key: "venue" },
//     { title: "Mode", dataIndex: "mode", key: "mode" },
//     { title: "Speaker", dataIndex: "speaker", key: "speaker" },
//   ];

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Workshops</h2>
//       <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
//         <Select placeholder="Subject" onChange={(value) => handleFilterChange("subject", value)}>
//           {filterOptions.subjects.map((s) => (
//             <Option key={s} value={s}>{s}</Option>
//           ))}
//         </Select>
//         <Select placeholder="Technology" onChange={(value) => handleFilterChange("technology", value)}>
//           {filterOptions.technologies.map((t) => (
//             <Option key={t} value={t}>{t}</Option>
//           ))}
//         </Select>
//         <Input placeholder="Speaker" onChange={(e) => handleFilterChange("speaker", e.target.value)} />
//       </div>
//       <Table dataSource={workshops} columns={columns} rowKey="workshop_id" pagination={false} />
//       <Pagination current={page} total={total} pageSize={5} onChange={setPage} style={{ marginTop: 20 }} />
//     </div>
//   );
// };

// export default Workshops;



// src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Dashboard from './components/Dashboard';
// import Workshops from './components/Workshops';
// import AddWorkshop from './components/AddWorkshop';
// import Participants from './components/Participants';
// import './App.css';

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard');
  
//   return (
//     <Router>
//       <div className="app-container">
//         <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
//         <div className="content-container">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/workshops" element={<Workshops />} />
//             <Route path="/add-workshop" element={<AddWorkshop />} />
//             <Route path="/participants/:workshopId" element={<Participants />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import Auth from './components/Auth';
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import Workshops from './components/Workshops';
// import AddWorkshop from './components/AddWorkshop';
// import Participants from './components/Participants';
// import Navbar from './components/Navbar';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Auth />} />
        
//         <Route element={(
//           <div className="app-layout">
//             <Navbar />
//             <div className="main-content">
//               <ProtectedRoute>
//                 <Outlet />
//               </ProtectedRoute>
//             </div>
//           </div>
//         )}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/workshops" element={<Workshops />} />
//           <Route path="/add-workshop" element={<AddWorkshop />} />
//           <Route path="/participants/:workshopId" element={<Participants />} />
//           <Route path="/:workshopId" element={<Participants />} />
//         </Route>
        
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Workshops from './components/Workshops';
import AddWorkshop from './components/AddWorkshop';
import Participants from './components/Participants';  // Keep this if you're using it
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        
        <Route element={(
          <div className="app-layout">
            <Navbar />
            <div className="main-content">
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            </div>
          </div>
        )}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/add-workshop" element={<AddWorkshop />} />
          <Route path="/participants/:workshopId" element={<Participants />} />
          <Route path="/:workshopId" element={<Participants />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;