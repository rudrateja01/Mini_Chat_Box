import api from './axiosConfig';

// Get all team members
export const fetchTeam = () => api.get('/team').then(r => r.data);

// Add a new team member
export const addMember = (member) => api.post('/team', member).then(r => r.data);

// Update a team member
export const updateMember = (id, data) => api.put(`/team/${id}`, data).then(r => r.data);

// Delete a team member
export const deleteMember = (id) => api.delete(`/team/${id}`).then(r => r.data);
