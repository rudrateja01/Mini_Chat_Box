import React from 'react';

export default function IntroForm({ form, setForm, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="intro-form">
      <h4>Introduction yourself</h4>

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      <textarea
        placeholder="Message (optional)"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Thank You'}
      </button>
    </form>
  );
}
