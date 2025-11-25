import api from './axiosConfig';

// Get messages for a ticket
export const fetchMessages = (ticketId) => api.get(`/messages/${ticketId}`).then(r => r.data);

// Send a new message
export const sendMessage = (ticketId, text) => api.post(`/messages/${ticketId}`, { text }).then(r => r.data);
