// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/Landing/LandingPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import AdminDashboard from './pages/Admin/Dashboard';
// import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthProvider } from './context/AuthContext';

import { useAuthContext } from "./Hooks/useAuthContext";

function RequireAuth({ children }) {
  // const { user } = useAuth();
   const { user } = useAuthContext();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Route */}
          <Route 
            path="/admin" 
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            } 
          />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
