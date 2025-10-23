import apiClient from './client';

export const booksAPI = {
  // Get all books
  getBooks: async (params = {}) => {
    const response = await apiClient.get('/books', { params });
    return response.data;
  },

  // Get single book
  getBook: async (id) => {
    const response = await apiClient.get(`/books/${id}`);
    return response.data;
  },

  // Create new book
  createBook: async (bookData) => {
    const response = await apiClient.post('/books', bookData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update book
  updateBook: async (id, bookData) => {
    const response = await apiClient.put(`/books/${id}`, bookData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete book
  deleteBook: async (id) => {
    const response = await apiClient.delete(`/books/${id}`);
    return response.data;
  },

  // Get book chapters
  getChapters: async (bookId) => {
    const response = await apiClient.get(`/chapters/book/${bookId}`);
    return response.data;
  },

  // Get book reviews
  getReviews: async (bookId) => {
    const response = await apiClient.get(`/reviews/book/${bookId}`);
    return response.data;
  },

  // Create review
  createReview: async (reviewData) => {
    const response = await apiClient.post('/reviews', reviewData);
    return response.data;
  },

  // Create chapter
  createChapter: async (bookId, chapterData) => {
    const response = await apiClient.post('/chapters', { ...chapterData, book: bookId });
    return response.data;
  },

  // Update chapter
  updateChapter: async (chapterId, chapterData) => {
    const response = await apiClient.put(`/chapters/${chapterId}`, chapterData);
    return response.data;
  },

  // Delete chapter
  deleteChapter: async (chapterId) => {
    const response = await apiClient.delete(`/chapters/${chapterId}`);
    return response.data;
  }
};