import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { libraryAPI } from '../api/library';

// Query keys
export const LIBRARY_QUERY_KEYS = {
  all: ['library'],
  lists: () => [...LIBRARY_QUERY_KEYS.all, 'list'],
};

// Get user's library
export const useLibrary = () => {
  return useQuery({
    queryKey: LIBRARY_QUERY_KEYS.lists(),
    queryFn: libraryAPI.getLibrary,
  });
};

// Add book to library mutation
export const useAddToLibrary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: libraryAPI.addToLibrary,
    onSuccess: () => {
      // Invalidate and refetch library
      queryClient.invalidateQueries({ queryKey: LIBRARY_QUERY_KEYS.lists() });
    },
  });
};

// Remove book from library mutation
export const useRemoveFromLibrary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: libraryAPI.removeFromLibrary,
    onSuccess: () => {
      // Invalidate and refetch library
      queryClient.invalidateQueries({ queryKey: LIBRARY_QUERY_KEYS.lists() });
    },
  });
};