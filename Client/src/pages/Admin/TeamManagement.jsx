import React, { useState, useEffect } from 'react';
import { fetchTickets } from '../../api/tickets';

export default function TeamManagement() {
  const [team, setTeam] = useState([
    { name:'Admin', role:'admin' },
    { name:'John', role:'member' }
  ]); // Replace with API call

  const deleteMember = (index) => {
    if(window.confirm('Delete this team member?')) {
      const copy = [...team];
      copy.splice(index,1);
      setTeam(copy);
    }
  };

  return (
    <div style={{padding:20}}>
      <h3>Team Members</h3>
      {team.length===0 ? <p>No members</p> :
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead><tr><th>Name</th><th>Role</th><th>Action</th></tr></thead>
        <tbody>
          {team.map((m,i)=>
            <tr key={i}>
              <td>{m.name}</td>
              <td>{m.role}</td>
              <td>{m.role!=='admin' && <button onClick={()=>deleteMember(i)}>Delete</button>}</td>
            </tr>
          )}
        </tbody>
      </table>}
    </div>
  );
}
