import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../../api/tickets';
import ChatBox from './ChatBox';

export default function ContactCenter() {
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const res = await fetchTickets({ page:1, limit:50 });
      setTickets(res.tickets || []);
    } catch (err) {
      alert('Failed to fetch tickets');
    } finally { setLoading(false); }
  };

  useEffect(() => { loadTickets(); }, []);

  return (
    <div style={{ display:'flex', height:'80vh', gap:20, padding:20 }}>
      <div style={{ width:'30%', borderRight:'1px solid #ccc', overflowY:'auto' }}>
        <h3>Chats</h3>
        {loading ? <p>Loading...</p> : tickets.length===0 ? <p>No chats found</p> :
          tickets.map(t => (
            <div 
              key={t._id} 
              style={{ padding:10, cursor:'pointer', borderBottom:'1px solid #eee', background: selected?._id===t._id?'#f0f0f0':'white' }}
              onClick={()=>setSelected(t)}
            >
              <p><b>{t.user?.name}</b> ({t.ticketId})</p>
              <p>Status: {t.status}</p>
              <p>Assigned: {t.assignedTo?.name || 'Admin'}</p>
            </div>
          ))
        }
      </div>
      <div style={{ flex:1 }}>
        {selected ? <ChatBox ticket={selected} /> : <p>Select a chat to view messages</p>}
      </div>
    </div>
  );
}
