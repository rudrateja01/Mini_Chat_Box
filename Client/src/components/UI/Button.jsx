import React from 'react';
import './ui.css';

export default function Button({ children, onClick, type='button', variant='primary', disabled=false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variant}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
