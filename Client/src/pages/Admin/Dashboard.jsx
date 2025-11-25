import React, { useEffect, useState } from "react";
import { fetchTickets } from "../../api/tickets";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchTickets({ page: 1, limit: 20 }); // params optional
      setTickets(res.tickets || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  if (loading) return <p>Loading tickets...</p>;
  if (error) return <p style={{color: "red"}}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <h3>All Tickets</h3>
      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t._id}>
                <td>{t.ticketId}</td>
                <td>{t.user?.name}</td>
                <td>{t.user?.email}</td>
                <td>{t.status}</td>
                <td>{t.assignedTo?.name || "Admin"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
