import api from './axiosConfig';

// Get chat bot settings
export const getSettings = () => api.get('/settings').then(r => r.data);

// Update chat bot settings
export const updateSettings = (settings) => api.put('/settings', settings).then(r => r.data);
