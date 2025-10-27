import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const apiClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only handle 401 errors for API requests that aren't auth-related
    if (error.response?.status === 401 && 
        !error.config.url.includes('/auth/') && 
        !error.config.url.includes('/users/profile')) {
      // Don't automatically redirect or remove tokens on page refresh
      console.error('Authentication error:', error.response?.data?.message || 'Unauthorized');
    }
    return Promise.reject(error);
  }
);

export default apiClient;