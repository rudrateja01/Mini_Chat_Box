// src/api/auth.js
import api from './axiosConfig'; // make sure axiosConfig has baseURL set

export const loginAPI = (payload) =>
  api.post('/auth/login', payload).then(res => res.data);

export const signupAPI = (payload) =>
  api.post('/auth/signup', payload).then(res => res.data);
