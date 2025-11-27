import React, { useState, useEffect } from "react";
import { fetchTickets } from "../../api/tickets"; // Updated import

export default function TeamManagement() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch team members
  useEffect(() => {
    const loadTeam = async () => {
      setLoading(true);
      try {
        // Assuming your API returns a team array under "team"
        const data = await fetchTickets(); // adjust if you have a separate team API
        setTeam(data.team || []); 
      } catch (err) {
        console.error("Failed to fetch team:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, []);

  // Delete a member
  const deleteMember = (index) => {
    if (window.confirm("Delete this team member?")) {
      const copy = [...team];
      copy.splice(index, 1);
      setTeam(copy);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Team Members</h3>
      {loading ? (
        <p>Loading team...</p>
      ) : team.length === 0 ? (
        <p>No members</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {team.map((m, i) => (
              <tr key={i}>
                <td>{m.name || m.Username}</td>
                <td>{m.role || m.Designation}</td>
                <td>
                  {m.role !== "admin" && (
                    <button onClick={() => deleteMember(i)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
