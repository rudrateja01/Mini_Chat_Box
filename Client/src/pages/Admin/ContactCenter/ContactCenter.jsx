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
  const [assignedTeammate, setAssignedTeammate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [pendingTeammate, setPendingTeammate] = useState(null);

  // Load teammates
  useEffect(() => {
    const loadTeammates = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:4000/api/team", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        // Correctly get the teams array
        const teamArray = Array.isArray(data.teams) ? data.teams : [];
        setTeammates(teamArray);

        // Set first teammate as assigned by default
        if (teamArray.length > 0) {
          setAssignedTeammate(teamArray[0]);
        }
        // setTeammates([
        //   { _id: "1", Username: "Alice", Designation: "member" },
        //   { _id: "2", Username: "Bob", Designation: "member" },
        // ]);
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
        `http://localhost:4000/api/tickets/${selectedTicket.ticketId}/assign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ assignedId: id }),
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
                  const isAdmin = msg.sender === "admin"; // your messages
                  const nameParts = selectedTicket.user?.name?.split(" ") || [];
                  const avatarText = (
                    (nameParts[0]?.[0] || "") + (nameParts[1]?.[0] || "")
                  ).toUpperCase();

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

                  return (
                    <React.Fragment key={idx}>
                      {msgDate !== prevDate && (
                        <div className="chat-date-divider">{msgDate}</div>
                      )}

                      <div
                        className={`chat-msg-wrapper ${
                          isAdmin ? "chat-sent" : "chat-received"
                        }`}
                      >
                        {isAdmin ? (
                          <>
                            {/* Message content first */}
                            <div className="chat-msg-content">
                              <p className="chat-sender-name">Rudra Teja</p>
                              <p className={`chat-msg sent`}>{msg.text}</p>
                            </div>
                            {/* Avatar on right */}
                            <div className="chat-avatar">RT</div>
                          </>
                        ) : (
                          <>
                            {/* Avatar on left */}
                            <div className="chat-avatar">{avatarText}</div>
                            {/* Message content */}
                            <div className="chat-msg-content">
                              <p className="chat-index">Chat {idx + 1}</p>
                              <p className={`chat-msg received`}>{msg.text}</p>
                            </div>
                          </>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })
              )}
            </div>

            {/* INPUT BOX */}
            {/* INPUT BOX */}
            <div className="cc-chat-input">
              <textarea
                placeholder="Type here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={async (e) => {
                  // Enter without Shift sends the message
                  if (e.key === "Enter" && !e.shiftKey && replyText.trim()) {
                    e.preventDefault();

                    // 1. Optimistically add message to UI
                    const newMessage = {
                      text: replyText,
                      sender: "admin",
                      createdAt: new Date().toISOString(),
                    };

                    // Update selectedTicket messages immediately
                    selectTicket({
                      ...selectedTicket,
                      messages: [
                        ...(selectedTicket.messages || []),
                        newMessage,
                      ],
                    });

                    // 2. Clear textarea
                    setReplyText("");

                    // 3. Send to backend
                    try {
                      const token = localStorage.getItem("token");
                      const res = await fetch(
                        `http://localhost:4000/api/messages/${selectedTicket._id}`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({ text: newMessage.text }),
                        }
                      );
                      const data = await res.json();
                      console.log("Message saved:", data);
                    } catch (err) {
                      console.error("Failed to send message:", err);
                    }
                  }
                }}
              />
              <span
                className="send-icon"
                onClick={async () => {
                  if (!replyText.trim()) return;

                  // Optimistic UI update
                  const newMessage = {
                    text: replyText,
                    sender: "admin",
                    createdAt: new Date().toISOString(),
                  };

                  selectTicket({
                    ...selectedTicket,
                    messages: [...(selectedTicket.messages || []), newMessage],
                  });

                  setReplyText("");

                  // Send to backend
                  try {
                    const token = localStorage.getItem("token");
                    const res = await fetch(
                      `http://localhost:4000/api/messages/${selectedTicket._id}`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ text: newMessage.text }),
                      }
                    );
                    const data = await res.json();
                    console.log("Message saved:", data);
                  } catch (err) {
                    console.error("Failed to send message:", err);
                  }
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
      <div className="cc-right">
        <div className="cc-right-scroll">
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
            <div className="cc-teammate-left">
              <div className="cc-avatar-small">
                {assignedTeammate?.Username?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <p className="cc-teammate-name">
                {assignedTeammate?.Username || "Not Assigned"}
              </p>
            </div>

            <div
              className="cc-teammate-dropdown-btn"
              onClick={() => setDropdownOpen((p) => !p)}
            >
              <Icon icon="mdi:chevron-down" />
            </div>
          </div>

          {dropdownOpen && (
            <div className="dropdown-options">
              {teammates.map((tm) => (
                <div
                  key={tm._id}
                  className="dropdown-option"
                  onClick={() => {
                    handleAssign(tm._id);
                    setAssignedTeammate(tm);
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
      {showPopup && (
        <div className="assign-popup-overlay">
          <div className="assign-popup">
            <h3>Reassign Chat?</h3>
            <p>Chat will be assigned to a different team member.</p>

            <div className="popup-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>

              <button
                className="submit-btn"
                onClick={async () => {
                  setShowPopup(false); // close popup visually

                  // Call backend
                  await handleAssign(pendingTeammate._id);

                  setAssignedTeammate(pendingTeammate); // update UI
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
