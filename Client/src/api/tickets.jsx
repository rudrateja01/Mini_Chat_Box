import api from './axiosConfig'; // your axios instance

// ==========================
// CREATE PUBLIC TICKET
// ==========================
export const createPublicTicket = async (ticketData) => {
  try {
    const response = await api.post('/tickets/public', ticketData);
    return response.data;
  } catch (error) {
    console.error('Error creating public ticket:', error);
    throw error;
  }
};

// ==========================
// FETCH ALL TICKETS
// ==========================
export const fetchTicketsAPI = async () => {
  try {
    const response = await api.get('/tickets');
    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

// ==========================
// FETCH MESSAGES FOR A TICKET
// ==========================
export const fetchMessagesAPI = async (ticketId) => {
  try {
    const response = await api.get(`/tickets/${ticketId}/messages`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching messages for ticket ${ticketId}:`, error);
    throw error;
  }
};

// ==========================
// SEND NEW MESSAGE FOR A TICKET
// ==========================
export const sendMessageAPI = async (ticketId, text) => {
  try {
    const response = await api.post(`/tickets/${ticketId}/messages`, { text });
    return response.data;
  } catch (error) {
    console.error(`Error sending message to ticket ${ticketId}:`, error);
    throw error;
  }
};
