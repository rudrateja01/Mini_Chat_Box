import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TeamManagement.css";
import { Icon } from "@iconify/react";

export default function TeamPage() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const [addPopup, setAddPopup] = useState(false);
  const [newUser, setNewUser] = useState({
    Username: "",
    EmailID: "",
    role: "member",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/api/team", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeam(res.data.teams || []);
      } catch (err) {
        console.error("Failed to load team:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [token]);

  const handleAddMember = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/team", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTeam([res.data.team, ...team]); // Add to UI
      setAddPopup(false); // Close popup

      // Clear fields
      setNewUser({
        Username: "",
        EmailID: "",
        role: "member",
      });
    } catch (err) {
      console.error("Failed to add member:", err);
    }
  };

  const handleDelete = async () => {
    if (!selectedMember) return;
    try {
      await axios.delete(
        `http://localhost:4000/api/team/${selectedMember._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDeletePopup(false);
      setSelectedMember(null);
      setTeam(team.filter((m) => m._id !== selectedMember._id));
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  const admin = team.find((t) => t.role === "admin");
  const members = team.filter((t) => t.role !== "admin");

  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <div className="team-page">
      <h2 className="team-title">Team</h2>

      {/* TABLE */}
      <div className="team-table">
        {/* HEADER */}
        <div className="table-row header">
          <div className="row-left">
            <span className="col-avatar"></span>
            <span className="col-name">Name</span>
            <span className="col-phone">Phone</span>
            <span className="col-email">Email</span>
            <span className="col-role">Role</span>
          </div>
          <div className="row-right"></div>
        </div>

        {/* ADMIN ROW */}
        {admin && (
          <div className="table-row">
            <div className="row-left">
              <div className="avatar-initials admin-avatar">
                {getInitials(admin.Username)}
              </div>
              <span className="col-name">{admin.Username}</span>
              <span className="col-phone" id="phone">
                ---
              </span>
              <span className="col-email">{admin.EmailID}</span>
              <span className="col-role">{admin.role}</span>
            </div>
            <div className="row-right no-actions"></div>
          </div>
        )}

        {/* MEMBER ROWS */}
        {members.map((m) => (
          <div className="table-row" key={m._id}>
            <div className="row-left">
              <div className="avatar-initials member-avatar">
                {getInitials(m.Username)}
              </div>
              <span className="col-name">{m.Username}</span>
              <span className="col-phone" id="phone">
                ---
              </span>
              <span className="col-email">{m.EmailID}</span>
              <span className="col-role">{m.role}</span>
            </div>
            <div className="row-right action-buttons">
              <Icon icon="mdi:pencil" className="edit-btn" />
              <Icon
                icon="mdi:delete"
                className="delete-btn"
                onClick={() => {
                  setSelectedMember(m);
                  setDeletePopup(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ADD MEMBER BUTTON */}
      <button className="add-member-btn"
      onClick={() => setAddPopup(true)}>
        <Icon icon="mdi:plus-circle" className="plus-icon" />
        Add Team Member
      </button>

      {/* ADD MEMBER POPUP */}
      {addPopup && (
        <div className="add-popup">
          <h2>Add Team Member</h2>
          <p className="popup-desc">
            Talk with colleagues in a group chat. Messages in this group are
            only visible to its participants. New teammates may only be invited
            by the administrators.
          </p>

          <label>Username</label>
          <input
            type="text"
            value={newUser.Username}
            onChange={(e) =>
              setNewUser({ ...newUser, Username: e.target.value })
            }
            placeholder="Enter name"
          />

          <label>Email ID</label>
          <input
            type="email"
            value={newUser.EmailID}
            onChange={(e) =>
              setNewUser({ ...newUser, EmailID: e.target.value })
            }
            placeholder="Enter email"
          />

          <label>Designation</label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>

          <div className="popup-buttons bottom-right">
            <button className="cancel" onClick={() => setAddPopup(false)}>
              Cancel
            </button>
            <button className="confirm" onClick={handleAddMember}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* DELETE POPUP */}
      {deletePopup && selectedMember && (
        <div className="delete-popup">
          <p>
            This teammate <b>{selectedMember.Username}</b> will be deleted.
          </p>
          <div className="popup-buttons">
            <button className="cancel" onClick={() => setDeletePopup(false)}>
              Cancel
            </button>
            <button className="confirm" onClick={handleDelete}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
