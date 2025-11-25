import React from 'react';
import { NavLink } from 'react-router-dom';
import './layout.css';

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>Hubly CRM</h3>
        <nav>
          <NavLink to="/admin" end>Dashboard</NavLink>
          <NavLink to="/admin/contact-center">Contact Center</NavLink>
          <NavLink to="/admin/team">Team Management</NavLink>
          <NavLink to="/admin/settings">Chat Bot Settings</NavLink>
          <NavLink to="/admin/analytics">Analytics</NavLink>
        </nav>
      </aside>

      {/* Main area */}
      <div className="main-area">
        <header className="header">
          <div>Welcome, Admin</div>
          <button onClick={() => alert('Logout clicked')}>Logout</button>
        </header>

        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
}
