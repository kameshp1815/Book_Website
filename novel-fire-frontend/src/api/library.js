import apiClient from './client';

export const libraryAPI = {
  // Get user's library
  getLibrary: async () => {
    const response = await apiClient.get('/library');
    return response.data;
  },

  // Add book to library
  addToLibrary: async (bookId) => {
    const response = await apiClient.post('/library', { bookId });
    return response.data;
  },

  // Remove book from library
  removeFromLibrary: async (bookId) => {
    const response = await apiClient.delete(`/library/${bookId}`);
    return response.data;
  }
};