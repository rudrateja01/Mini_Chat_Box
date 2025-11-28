// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import ContactCenter from "./pages/Admin/ContactCenter/ContactCenter";
import { ChatProvider } from "./context/ChatContext";

import Analytics from "./pages/Admin/Analytics/Analytics";
import ChatBot from "./pages/Admin/ChatBot";
import TeamManagement from "./pages/Admin/TeamManagement";
import Settings from "./pages/Admin/Settings";

import AdminLayout from "./components/Layouts/AdminLayout";
import { AuthProvider } from "./context/AuthContext";
import { useAuthContext } from "./Hooks/useAuthContext";

function RequireAdmin({ children }) {
  const { user } = useAuthContext();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

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

          {/* 🔐 PROTECTED ADMIN ROUTES */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route
              path="contact-center"
              element={
                <ChatProvider>
                  <ContactCenter />
                </ChatProvider>
              }
            />
            <Route path="analytics" element={<Analytics />} />
            <Route path="chat-bot" element={<ChatBot />} />
            <Route path="team" element={<TeamManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
