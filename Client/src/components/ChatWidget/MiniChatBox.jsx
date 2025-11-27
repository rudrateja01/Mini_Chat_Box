import React, { useState, useEffect } from "react";
import { createPublicTicket, fetchTicketMessages, sendMessageToTicket } from "../../api/tickets";
import "./miniChatBox.css";

export default function MiniChatBox() {
  const [ticket, setTicket] = useState(null);      // Current ticket
  const [messages, setMessages] = useState([]);    // Messages of the ticket
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");            // Message input
  const [userInfo, setUserInfo] = useState({ name:"", email:"" }); // User info

  // Load messages for current ticket
  const loadMessages = async (ticketId) => {
    setLoading(true);
    try {
      const data = await fetchTicketMessages(ticketId);
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Create a new public ticket
  const handleCreateTicket = async () => {
    if (!userInfo.name || !userInfo.email) {
      alert("Please enter name and email");
      return;
    }
    try {
      const newTicket = await createPublicTicket(userInfo);
      setTicket(newTicket);
      setMessages([]); // Empty chat initially
    } catch (err) {
      console.error("Failed to create ticket:", err);
      alert("Failed to create ticket");
    }
  };

  // Send a message
  const handleSendMessage = async () => {
    if (!text.trim() || !ticket) return;

    try {
      const newMsg = await sendMessageToTicket(ticket._id, text.trim());
      setMessages((prev) => [...prev, newMsg]);
      setText("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // Auto-load messages when ticket is set
  useEffect(() => {
    if (ticket) loadMessages(ticket._id);
  }, [ticket]);

  return (
    <div className="mini-chat-box">
      {!ticket && (
        <div className="mini-chat-form">
          <input
            type="text"
            placeholder="Your Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
          <button onClick={handleCreateTicket}>Start Chat</button>
        </div>
      )}

      {ticket && (
        <>
          <div className="mini-chat-messages">
            {loading ? (
              <p>Loading messages...</p>
            ) : messages.length === 0 ? (
              <p>No messages yet</p>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`chat-msg ${msg.senderId === "admin" ? "sent" : "received"}`}>
                  <b>{msg.senderId === "admin" ? "Admin" : "You"}:</b> {msg.text}
                  <div className="chat-date">{new Date(msg.timestamp || msg.createdAt).toLocaleTimeString()}</div>
                </div>
              ))
            )}
          </div>

          <div className="mini-chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
}
