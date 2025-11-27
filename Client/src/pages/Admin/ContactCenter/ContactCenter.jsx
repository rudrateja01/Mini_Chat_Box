import React, { useEffect, useState } from "react";
import { useChat } from "../../../context/ChatContext";
import "./contactCenter.css";
import { Icon } from "@iconify/react";
import homeIcon from "@iconify/icons-mdi/home";
import sendIcon from "@iconify/icons-mdi/send";

export default function ContactCenter() {
  const {
    tickets,
    selectedTicket,
    messages,
    loading,
    selectTicket,
    sendMessage,
  } = useChat();
  const [replyText, setReplyText] = useState("");
  const [teammates, setTeammates] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  // Load teammates
  useEffect(() => {
    const loadTeammates = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/api/team", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTeammates(Array.isArray(data) ? data : data.team || []);
      } catch (err) {
        console.error("Failed to load teammates:", err);
        setTeammates([]);
      }
    };
    loadTeammates();
  }, []);

  // Assign teammate
  const handleAssign = async (id) => {
    if (!selectedTicket) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:4000/api/tickets/${selectedTicket._id}/assign`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ assignedTo: id }),
        }
      );
      const updatedTicket = await res.json();
      selectTicket(updatedTicket);
    } catch (err) {
      console.error("Failed to assign teammate:", err);
    }
  };

  // Update ticket status
  const handleStatusUpdate = async (status) => {
    if (!selectedTicket) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:4000/api/tickets/${selectedTicket._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await res.json();

      // FIX: backend often returns { updatedTicket: {...} }
      const updated = data.updatedTicket || data.ticket || data;

      // Update the selectedTicket in FE
      selectTicket(updated);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const latestMessage = (ticket) =>
    ticket.messages?.length
      ? ticket.messages[ticket.messages.length - 1].text.slice(0, 30) + "..."
      : "No messages yet";

  return (
    <div className="cc-root">
      {/* LEFT PANEL */}
      <div className="cc-left">
        <p id="page">Contact Center</p>
        <span>Chats</span>
        <hr />
        {loading && <p>Loading chats...</p>}
        {!loading && (!Array.isArray(tickets) || tickets.length === 0) && (
          <p>No chats found.</p>
        )}

        {Array.isArray(tickets) &&
          tickets.map((t, idx) => {
            const nameParts = t.user?.name?.split(" ") || [];
            const avatarText = (
              (nameParts[0]?.[0] || "") + (nameParts[1]?.[0] || "")
            ).toUpperCase();
            return (
              <div
                key={t._id}
                className={`cc-chat-item ${
                  selectedTicket?._id === t._id ? "active" : ""
                }`}
                onClick={() => selectTicket(t)}
              >
                <div className="cc-chat-avatar">{avatarText}</div>
                <div className="cc-chat-info">
                  <p className="cc-chat-title">Chat {idx + 1}</p>
                  <p className="cc-chat-preview">{latestMessage(t)}</p>
                </div>
              </div>
            );
          })}
      </div>

      {/* CENTER PANEL */}
      <div className="cc-center">
        {selectedTicket ? (
          <>
            {/* TOP BAR */}
            <div className="cc-center-header">
              <span className="ticket-id">
                Ticket: {selectedTicket.ticketId}
              </span>
              <Icon icon={homeIcon} className="home-icon" />
            </div>

            {/* CHAT MESSAGES */}
            <div className="cc-chat-messages">
              {(selectedTicket.messages || []).length === 0 ? (
                <p className="no-messages">No messages yet</p>
              ) : (
                (selectedTicket.messages || []).map((msg, idx) => {
                  const rawDate = msg.createdAt
                    ? new Date(msg.createdAt)
                    : new Date();
                  const msgDate = rawDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  const prevMsg = selectedTicket.messages[idx - 1];
                  const prevDate = prevMsg
                    ? new Date(prevMsg.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : null;

                  const nameParts = selectedTicket.user?.name?.split(" ") || [];
                  const avatarText = (
                    (nameParts[0]?.[0] || "") + (nameParts[1]?.[0] || "")
                  ).toUpperCase();

                  return (
                    <React.Fragment key={idx}>
                      {msgDate !== prevDate && (
                        <div className="chat-date-divider">{msgDate}</div>
                      )}
                      <div className="chat-msg-wrapper">
                        <div className="chat-avatar">{avatarText}</div>
                        <div className="chat-msg-content">
                          <p className="chat-index">Chat {idx + 1}</p>
                          <p
                            className={`chat-msg ${
                              msg.sender === "admin" ? "sent" : "received"
                            }`}
                          >
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              )}
            </div>

            {/* INPUT BOX */}
            <div className="cc-chat-input">
              <textarea
                placeholder="Type here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && replyText.trim()) {
                    console.log("Send:", replyText);
                    setReplyText("");
                  }
                }}
              />
              <span
                className="send-icon"
                onClick={() => {
                  if (!replyText.trim()) return;
                  console.log("Send:", replyText);
                  setReplyText("");
                }}
              >
                <Icon icon={sendIcon} width="20" height="20" />
              </span>
            </div>
          </>
        ) : (
          <p className="cc-empty">Select a chat to view messages</p>
        )}
      </div>

      {/* RIGHT PANEL */}
      {/* RIGHT PANEL */}
      <div className="cc-right">
        <div className="cc-header">
          <div className="cc-avatar-big">
            {selectedTicket?.user?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <h3 className="cc-chat-label">Chat</h3>
        </div>

        <h2 className="cc-title">Details</h2>
        <div className="cc-section-details">
          <div className="detail-box">
            <Icon icon="mdi:account" className="detail-icon" />
            <span>{selectedTicket?.user?.name || "N/A"}</span>
          </div>

          <div className="detail-box">
            <Icon icon="mdi:phone" className="detail-icon" />
            <span>+91{selectedTicket?.user?.phone || "N/A"}</span>
          </div>

          <div className="detail-box">
            <Icon icon="mdi:email" className="detail-icon" />
            <span>{selectedTicket?.user?.email || "N/A"}</span>
          </div>
        </div>

        <h2 className="cc-title">Teammates</h2>

        {/* NEW SINGLE-ROW TEAMMATE BOX */}
        <div className="cc-teammate-row">
          {/* Left Avatar & Name */}
          <div className="cc-teammate-left">
            <div className="cc-avatar-small">
              {selectedTicket?.assignedTo?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "A"}
            </div>
            <p className="cc-teammate-name">
              {selectedTicket?.assignedTo?.name || "Not Assigned"}
            </p>
          </div>

          {/* Right Dropdown Button */}
          <div
            className="cc-teammate-dropdown-btn"
            onClick={() => setDropdownOpen((p) => !p)}
          >
            <Icon icon="mdi:chevron-down" />
          </div>
        </div>

        {/* DROPDOWN LIST */}
        {dropdownOpen && (
          <div className="dropdown-options">
            {Array.isArray(teammates) &&
              teammates.map((tm) => (
                <div
                  key={tm._id}
                  className="dropdown-option"
                  onClick={() => {
                    handleAssign(tm._id);
                    setDropdownOpen(false);
                  }}
                >
                  <div className="cc-avatar-small">
                    {tm.Username?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <div className="dropdown-info">
                    <span className="dropdown-name">{tm.Username}</span>
                    <span className="dropdown-designation">
                      {tm.Designation}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}

        <h2 className="cc-title">Ticket Status</h2>
        {/* TICKET STATUS BOX */}
        <div
          className="cc-single-status-box"
          onClick={() => setStatusOpen(!statusOpen)}
        >
          <div className="cc-status-left">
            <Icon icon="mdi:ticket" className="cc-status-icon" />
            <span className="cc-status-text">
              {selectedTicket?.status === "resolved"
                ? "Resolved"
                : "Unresolved"}
            </span>
          </div>

          <Icon icon="mdi:chevron-down" className="cc-chevron" />
        </div>

        {/* DROPDOWN OPTIONS */}
        {statusOpen && (
          <div className="cc-status-dropdown">
            <div
              className="cc-status-option"
              onClick={() => {
                handleStatusUpdate("resolved");
                setStatusOpen(false);
              }}
            >
              Resolved
            </div>
            <hr />

            <div
              className="cc-status-option"
              onClick={() => {
                handleStatusUpdate("unresolved");
                setStatusOpen(false);
              }}
            >
              Unresolved
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
