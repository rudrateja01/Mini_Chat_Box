import api from "./axiosConfig";

// Create ticket from public form (landing page / chat widget)
export const createPublicTicket = (payload) =>
  api.post("/tickets/public", payload).then((r) => r.data);

// Fetch all tickets (admin)
export const fetchTickets = (params) => api.get("/tickets", { params }).then(r => r.data);

// Fetch a single ticket
export const fetchTicket = (id) => api.get(`/tickets/${id}`).then(r => r.data);

// Assign ticket (admin)
export const assignTicket = (ticketId, body) => api.post(`/tickets/${ticketId}/assign`, body).then(r => r.data);

// Update ticket status
export const updateStatus = (ticketId, body) => api.post(`/tickets/${ticketId}/status`, body).then(r => r.data);
