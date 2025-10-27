import apiClient from './client';

export const libraryAPI = {
  // Get user's library
  getLibrary: async () => {
    const response = await apiClient.get('/library');
    return response.data;
  },

  // Add book to library
  addToLibrary: async (bookId) => {
    const response = await apiClient.post('/library', { book: bookId });
    return response.data;
  },

  // Remove book from library
  removeFromLibrary: async (bookId) => {
    const response = await apiClient.delete(`/library/${bookId}`);
    return response.data;
  },

  // Update reading progress
  updateProgress: async ({ bookId, currentChapter, progressPercent = 0 }) => {
    const response = await apiClient.put('/library/progress', {
      book: bookId,
      currentChapter,
      progressPercent,
    });
    return response.data;
  }
};