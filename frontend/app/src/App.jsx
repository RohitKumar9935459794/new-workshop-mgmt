// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import Auth from './components/Auth';
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import Workshops from './components/Workshops';
// import AddWorkshop from './components/AddWorkshop';
// import Participants from './components/Participants';  // Keep this if you're using it
// import Navbar from './components/Navbar';
 import './App.css';

function Clickable(){
  return <button>click me</button>;

}
function Hello({name, color}){

  return  <p style = {{ backgroundColor : color }} >hello {name} </p>;
}
 function App() {
  return(
  <>
    <Hello name = "anshu" color = "black" />
    <Hello name = "vanshu" color = "red"  />

    <Hello name = "tanshu"  color = "blue" />

    <Clickable/>
  </>
  );
 }
export default App;
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