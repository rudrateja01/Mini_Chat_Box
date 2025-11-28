// src/pages/Admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("all"); // Track selected filter
  const limit = 8; // tickets per page



  // Fetch tickets from backend
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.token) return;

        const res = await axios.get("http://localhost:4000/api/tickets", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const ticketList = res.data.tickets || [];
        setTickets(ticketList);
        setFiltered(ticketList);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    };

    fetchTickets();
  }, []);

  // Search by ticket ID
  const handleSearch = () => {
    if (!search.trim()) {
      setFiltered(tickets);
      return;
    }

    const result = tickets.filter(
      (t) => t.ticketId.toLowerCase() === search.toLowerCase()
    );

    setFiltered(result);
    setPage(1);
  };

  // Filter tickets by status
  const applyFilter = (status) => {
    setActiveFilter(status);
    setPage(1);

    if (status === "all") {
      setFiltered(tickets);
    } else {
      setFiltered(tickets.filter((t) => t.status === status));
    }
  };

  // Pagination
  const startIndex = (page - 1) * limit;
  const paginatedTickets = filtered.slice(startIndex, startIndex + limit);

  // Generate user avatar initials
  const getAvatar = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };
  

  return (
    <div className="dashboard-root">
      <p id="page">Dashboard</p>
      {/* Search */}
      <div className="search-row">
        <input
          type="text"
          placeholder="Search for Ticket"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Quick Metrics */}
      <div className="metric-grid">
        <div
          className={`metric-card all ${
            activeFilter === "all" ? "active" : ""
          }`}
          onClick={() => applyFilter("all")}
        >
          <h3>All Tickets</h3>
        </div>
        <div
          className={`metric-card resolved ${
            activeFilter === "resolved" ? "active" : ""
          }`}
          onClick={() => applyFilter("resolved")}
        >
          <h3>Resolved</h3>
        </div>
        <div
          className={`metric-card unresolved ${
            activeFilter === "unresolved" ? "active" : ""
          }`}
          onClick={() => applyFilter("unresolved")}
        >
          <h3>Unresolved</h3>
        </div>
      </div>

      <hr />

      {/* Tickets List */}
      {filtered.length === 0 ? (
        <p className="empty">No tickets found</p>
      ) : (
        <div className="ticket-container">
          {paginatedTickets.map((t, idx) => (
            <div className="ticket-card" key={idx}>
              <div className="ticket-header">
                <h3 className="ticket-id">Ticket: {t.ticketId}</h3>
                <span className="ticket-time">
                  Posted at{" "}
                  {new Date(t.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>

              <p className="ticket-message">
                {t.messages[0]?.text || "No message yet"}
              </p>
              <hr />

              <div className="ticket-top">
                {/* LEFT SIDE – User Details */}
                <div className="ticket-user-wrapper">
                  {/* Avatar */}
                  <div className="ticket-avatar">{getAvatar(t.user?.name)}</div>

                  {/* User details */}
                  <div className="ticket-user">
                    <p id="username">{t.user?.name}</p>
                    <p>{t.user?.email}</p>
                    <p>+91{t.user?.phone}</p>
                  </div>
                </div>

                {/* RIGHT SIDE – Open Ticket */}
                <h2 className="open-ticket-text">Open Ticket</h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filtered.length > limit && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </button>
          <span>Page {page}</span>
          <button
            disabled={startIndex + limit >= filtered.length}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
