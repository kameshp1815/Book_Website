import apiClient from './client';

export const authAPI = {
  // Register new user (Step 1: Send OTP)
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // Verify OTP and complete registration
  verifyOTP: async (userId, otp) => {
    const response = await apiClient.post('/auth/verify-otp', { userId, otp });
    return response.data;
  },

  // Resend OTP
  resendOTP: async (userId) => {
    const response = await apiClient.post('/auth/resend-otp', { userId });
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await apiClient.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await apiClient.put('/users/profile', userData);
    return response.data;
  }
};