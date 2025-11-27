import React, { useEffect, useState } from 'react';
import { fetchTicket, updateStatus } from '../../api/tickets';


export default function ChatBot({ ticket }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const loadMessages = async () => {
    setLoading(true);
    try {
      const res = await fetchTicket(ticket._id);
      setMessages(res.messages || []);
    } catch {
      alert('Failed to load messages');
    } finally { setLoading(false); }
  };

  useEffect(() => { loadMessages(); }, [ticket]);

  const sendMessage = () => {
    if (!text) return;
    // Fake message push (replace with API call)
    setMessages([...messages, { senderId:'admin', text, timestamp: new Date() }]);
    setText('');
  };

  const toggleStatus = async () => {
    try {
      const newStatus = ticket.status==='Resolved'?'Open':'Resolved';
      await updateStatus(ticket._id,{status:newStatus});
      alert('Status updated');
    } catch { alert('Failed to update status'); }
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div style={{ flex:1, overflowY:'auto', padding:10, border:'1px solid #ccc', borderRadius:8 }}>
        {loading ? <p>Loading messages...</p> :
          messages.length===0 ? <p>No messages yet</p> :
          messages.map((m,i)=><div key={i} style={{ marginBottom:6 }}>
            <b>{m.senderId==='admin'?'Admin':'User'}:</b> {m.text}
          </div>)
        }
      </div>
      <div style={{ marginTop:10, display:'flex', gap:10 }}>
        <input style={{ flex:1 }} value={text} onChange={e=>setText(e.target.value)} placeholder="Type message..." />
        <button onClick={sendMessage}>Send</button>
        <button onClick={toggleStatus}>{ticket.status==='Resolved'?'Mark Open':'Mark Resolved'}</button>
      </div>
    </div>
  );
}
