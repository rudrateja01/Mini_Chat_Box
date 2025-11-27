import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchTickets, fetchTicketMessages, sendMessageToTicket } from "../api/tickets";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all tickets
  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await fetchTickets();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  // Select a ticket and load its messages
  const selectTicket = async (ticket) => {
    setSelectedTicket(ticket);
    setLoading(true);
    try {
      const msgs = await fetchTicketMessages(ticket._id);
      setMessages(Array.isArray(msgs) ? msgs : []);
    } catch (err) {
      console.error("Failed to load messages:", err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Send a message
  const sendMessage = async (text) => {
    if (!selectedTicket || !text) return;
    try {
      const newMsg = await sendMessageToTicket(selectedTicket._id, text);
      setMessages((prev) => [...prev, newMsg]);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        tickets,
        selectedTicket,
        messages,
        loading,
        loadTickets,
        selectTicket,
        sendMessage,
        setSelectedTicket,
        setMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook
export const useChat = () => useContext(ChatContext);
