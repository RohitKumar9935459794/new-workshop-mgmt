import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Workshops from './components/Workshops';
import AddWorkshop from './components/AddWorkshop';
import UploadParticipants from './components/UploadParticipants';  // Keep this if you're using it
import Navbar from './components/Navbar';
import WorkshopSuccess from './components/WorkshopSuccess';
import WorkshopParticipant from './components/WorkshopParticipant';
 import './App.css';
import ParticipantTable from './components/ParticipantTable';

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
          <Route path="/workshop-success" element={<WorkshopSuccess />} />
          <Route path="/upload-participants" element={<UploadParticipants />} />
          <Route path="/participant-reports" element={<ParticipantTable/>} />
          <Route path="/workshops/:workshop_id/participants" element={<WorkshopParticipant />} />

        </Route>
        
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;