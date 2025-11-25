import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchTicketsAPI, fetchMessagesAPI, sendMessageAPI } from '../api/tickets';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await fetchTicketsAPI();
      setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectTicket = async (ticket) => {
    setSelectedTicket(ticket);
    setLoading(true);
    try {
      const msgs = await fetchMessagesAPI(ticket.ticketId);
      setMessages(msgs);
    } catch (err) {
      console.error(err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (text) => {
    if (!selectedTicket) return;
    const newMsg = await sendMessageAPI(selectedTicket.ticketId, text);
    setMessages((prev) => [...prev, newMsg]);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return (
    <ChatContext.Provider value={{
      tickets,
      selectedTicket,
      messages,
      loading,
      loadTickets,
      selectTicket,
      sendMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook
export const useChat = () => useContext(ChatContext);
