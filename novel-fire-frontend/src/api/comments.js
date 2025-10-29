import apiClient from './client';

export const commentsAPI = {
  list: async ({ targetType, targetId }) => {
    const { data } = await apiClient.get('/comments', { params: { targetType, targetId } });
    return data;
  },
  create: async ({ targetType, targetId, content, parentId }) => {
    const { data } = await apiClient.post('/comments', { targetType, targetId, content, parentId });
    return data;
  },
  remove: async (id) => {
    const { data } = await apiClient.delete(`/comments/${id}`);
    return data;
  },
};
