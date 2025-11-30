import React, { useState, useRef, useEffect } from 'react';
import "./MiniChatBox.css";
import robot from "../../assets/logos/robot.png";
import { FaPaperPlane } from "react-icons/fa";

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const chatBodyRef = useRef(null);

  // Scroll to bottom whenever messages or form submission changes
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, formSubmitted]);

  // Handle sending user messages
  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Bot sends only confirmation
    setMessages(prev => [
      ...prev,
      { sender: "bot", text: "Thanks for submitting your information! We'll reach out shortly." }
    ]);
  };

  return (
    <div className="chat-widget-container">
      {/* --- Header --- */}
      <div className="chat-header">
        <div className="agent-info">
          <div className="agent-avatar">
            <img src={robot} alt="Hubly Agent" />
            <span className="online-indicator"></span>
          </div>
          <span className="agent-name">Hubly</span>
        </div>
      </div>

      {/* --- Chat Body --- */}
      <div className="chat-body" ref={chatBodyRef}>
        {/* Bot Form Message */}
        {!formSubmitted && (
          <div className="message bot">
            <img src={robot} alt="robot avatar" className="bot-avatar" />
            <div className="form-card">
              <h3 className="form-title">Introduction Yourself</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="input-label" htmlFor="name">Your Name</label>
                  <input type="text" id="name" className="form-input" placeholder="Your name" required />
                </div>

                <div className="form-group">
                  <label className="input-label" htmlFor="phone">Your Phone</label>
                  <input type="tel" id="phone" className="form-input" placeholder="+1 (000) 000-0000" required />
                </div>

                <div className="form-group">
                  <label className="input-label" htmlFor="email">Your Email</label>
                  <input type="email" id="email" className="form-input" placeholder="example@gmail.com" required />
                </div>

                <button className="submit-button" type="submit">Thank You!</button>
              </form>
            </div>
          </div>
        )}

        {/* Display user messages and bot confirmation */}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.sender === "bot" && 
              <img src={robot} alt="robot avatar" className="bot-avatar" />
            }
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>

      {/* --- Footer Input --- */}
      <div className="chat-footer">
        <input
          type="text"
          className="message-input"
          placeholder="Write a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onClick={handleKeyPress}
        />
        <div className="send-icon" onClick={sendMessage}>
          <FaPaperPlane size={20} color="#fff" />
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
