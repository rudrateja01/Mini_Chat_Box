// src/api/tickets.jsx
import api from "./axiosConfig";

// ---------------------------
// Public ticket (for MiniChatBox / landing page)
// ---------------------------
export const createPublicTicket = (payload) =>
  api.post("/tickets/public", payload).then(res => res.data);

// ---------------------------
// Fetch all tickets (admin)
// ---------------------------
export const fetchTickets = (params) =>
  api.get("/tickets", { params }).then(res => res.data);

// ---------------------------
// Fetch single ticket (admin)
// ---------------------------
export const fetchTicket = (ticketId) =>
  api.get(`/tickets/${ticketId}`).then(res => res.data);

// ---------------------------
// Fetch messages of a ticket
// ---------------------------
export const fetchTicketMessages = (ticketId) =>
  api.get(`/tickets/${ticketId}/messages`).then(res => res.data);

// ---------------------------
// Assign ticket to teammate (admin)
// ---------------------------
export const assignTicket = (ticketId, assignedToId) =>
  api.put(`/tickets/${ticketId}/assign`, { assignedTo: assignedToId }).then(res => res.data);

// ---------------------------
// Update ticket status (admin)
// ---------------------------
export const updateStatus = (ticketId, status) =>
  api.put(`/tickets/${ticketId}/status`, { status }).then(res => res.data);

// ---------------------------
// Send a message to a ticket
// ---------------------------
export const sendMessageToTicket = (ticketId, text) =>
  api.post(`/tickets/${ticketId}/message`, { text }).then(res => res.data);
