import apiClient from './client';

export const usersAPI = {
  // Current user profile
  getProfile: async () => {
    const { data } = await apiClient.get('/users/profile');
    return data;
  },
  updateProfile: async (payload) => {
    const { data } = await apiClient.put('/users/profile', payload);
    return data;
  },

  // Followers / Following lists (public)
  getFollowers: async (userId) => {
    const { data } = await apiClient.get(`/users/${userId}/followers`);
    return data;
  },
  getFollowing: async (userId) => {
    const { data } = await apiClient.get(`/users/${userId}/following`);
    return data;
  },

  // Follow / Unfollow (auth)
  follow: async (userId) => {
    const { data } = await apiClient.post(`/users/${userId}/follow`);
    return data;
  },
  unfollow: async (userId) => {
    const { data } = await apiClient.delete(`/users/${userId}/follow`);
    return data;
  },

  // Dashboard stats (auth)
  getDashboard: async () => {
    const { data } = await apiClient.get('/users/dashboard');
    return data;
  },
};
