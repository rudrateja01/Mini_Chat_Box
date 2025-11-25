import React, { useState } from 'react';
import IntroForm from './IntroForm';
import './widget.css';
import { createPublicTicket } from '../../api/tickets';

export default function MiniChatBox() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const toggle = () => setOpen((v) => !v);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPublicTicket({ ...form, initialMessage: form.message });
      setStep('thanks');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`}>
      <button className="widget-icon" onClick={toggle}>
        💬
      </button>

      {open && (
        <div className="mini-chat">
          {step === 'form' ? (
            <IntroForm form={form} setForm={setForm} onSubmit={submit} loading={loading} />
          ) : (
            <div className="thanks">
              <h4>Thank you, our team will get back to you soon</h4>
              <button
                onClick={() => {
                  setOpen(false);
                  setStep('form');
                  setForm({ name: '', email: '', phone: '', message: '' });
                }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
