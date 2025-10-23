import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { booksAPI } from '../api/books';

// Query keys
export const BOOKS_QUERY_KEYS = {
  all: ['books'],
  lists: () => [...BOOKS_QUERY_KEYS.all, 'list'],
  list: (filters) => [...BOOKS_QUERY_KEYS.lists(), { filters }],
  details: () => [...BOOKS_QUERY_KEYS.all, 'detail'],
  detail: (id) => [...BOOKS_QUERY_KEYS.details(), id],
  chapters: (bookId) => [...BOOKS_QUERY_KEYS.detail(bookId), 'chapters'],
  reviews: (bookId) => [...BOOKS_QUERY_KEYS.detail(bookId), 'reviews'],
};

// Get all books
export const useBooks = (params = {}) => {
  return useQuery({
    queryKey: BOOKS_QUERY_KEYS.list(params),
    queryFn: () => booksAPI.getBooks(params),
  });
};

// Get single book
export const useBook = (id) => {
  return useQuery({
    queryKey: BOOKS_QUERY_KEYS.detail(id),
    queryFn: () => booksAPI.getBook(id),
    enabled: !!id,
  });
};

// Get book chapters
export const useBookChapters = (bookId) => {
  return useQuery({
    queryKey: BOOKS_QUERY_KEYS.chapters(bookId),
    queryFn: () => booksAPI.getChapters(bookId),
    enabled: !!bookId,
  });
};

// Get book reviews
export const useBookReviews = (bookId) => {
  return useQuery({
    queryKey: BOOKS_QUERY_KEYS.reviews(bookId),
    queryFn: () => booksAPI.getReviews(bookId),
    enabled: !!bookId,
  });
};

// Create book mutation
export const useCreateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: booksAPI.createBook,
    onSuccess: () => {
      // Invalidate and refetch books list
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEYS.lists() });
    },
  });
};

// Update book mutation
export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, ...bookData }) => booksAPI.updateBook(id, bookData),
    onSuccess: (data, variables) => {
      // Update the book in cache
      queryClient.setQueryData(BOOKS_QUERY_KEYS.detail(variables.id), data);
      // Invalidate books list
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEYS.lists() });
    },
  });
};

// Delete book mutation
export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: booksAPI.deleteBook,
    onSuccess: (data, bookId) => {
      // Remove the book from cache
      queryClient.removeQueries({ queryKey: BOOKS_QUERY_KEYS.detail(bookId) });
      // Invalidate books list
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEYS.lists() });
    },
  });
};

// Create review mutation
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: booksAPI.createReview,
    onSuccess: (data, variables) => {
      // Invalidate book reviews
      queryClient.invalidateQueries({
        queryKey: BOOKS_QUERY_KEYS.reviews(variables.book)
      });
    },
  });
};

// Create chapter mutation
export const useCreateChapter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookId, chapterData }) => booksAPI.createChapter(bookId, chapterData),
    onSuccess: (data, variables) => {
      // Invalidate book chapters
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEYS.chapters(variables.bookId) });
    },
  });
};

// Update chapter mutation
export const useUpdateChapter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chapterId, chapterData }) => booksAPI.updateChapter(chapterId, chapterData),
    onSuccess: (data, variables) => {
      // Invalidate book chapters
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEYS.chapters(variables.bookId) });
    },
  });
};

// Delete chapter mutation
export const useDeleteChapter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: booksAPI.deleteChapter,
    onSuccess: (data, chapterId) => {
      // Invalidate all book chapters (since we don't know the bookId from chapterId)
      queryClient.invalidateQueries({ queryKey: BOOKS_QUERY_KEYS.all });
    },
  });
};