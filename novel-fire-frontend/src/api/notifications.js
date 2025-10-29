import apiClient from './client';

export const notificationsAPI = {
  list: async (params = {}) => {
    const { data } = await apiClient.get('/notifications', { params });
    return data;
  },
  markRead: async (ids) => {
    const { data } = await apiClient.post('/notifications/mark-read', { ids });
    return data;
  },
  markAllRead: async () => {
    const { data } = await apiClient.post('/notifications/mark-all-read');
    return data;
  },
  getPrefs: async () => {
    const { data } = await apiClient.get('/notifications/prefs');
    return data;
  },
  updatePrefs: async ({ category, inApp }) => {
    const { data } = await apiClient.put('/notifications/prefs', { category, inApp });
    return data;
  },
};
