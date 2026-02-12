import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AdminOverview } from './components/Admin/AdminOverview';
import { AdminLeaves } from './components/Admin/AdminLeaves';
import { AdminEmployees } from './components/Admin/AdminEmployees';
import { AdminNotifications } from './components/Admin/AdminNotifications';
import { AdminSchedules } from './components/Admin/AdminSchedules';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />

        <Route path="/admin">
          <Route index element={<AdminOverview />} />
          <Route path="leaves" element={<AdminLeaves />} />
          <Route path="employees" element={<AdminEmployees />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="schedules" element={<AdminSchedules />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
