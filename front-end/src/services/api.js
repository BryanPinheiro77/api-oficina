import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5010' // porta da tua API Oficina
});

export default api;
