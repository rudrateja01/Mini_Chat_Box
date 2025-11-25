import React from 'react';
import './layout.css';

export default function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <h2>Hubly CRM</h2>
        {children}
      </div>
    </div>
  );
}
