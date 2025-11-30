import axios from 'axios';

// Configuración base para conectar con el Back-end Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // URL del servidor local
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para incluir el token de seguridad en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;