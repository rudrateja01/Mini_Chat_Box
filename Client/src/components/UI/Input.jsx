import React from 'react';
import './ui.css';

export default function Input({ value, onChange, placeholder='', type='text', disabled=false }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="input-field"
    />
  );
}
