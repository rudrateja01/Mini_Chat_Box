import React from 'react';
import Button from './Button';
import './ui.css';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {title && <h4 className="modal-title">{title}</h4>}
        <div className="modal-body">{children}</div>
        <Button variant="primary" onClick={onClose}>Close</Button>
      </div>
    </div>
  );
}
