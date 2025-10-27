import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersAPI } from '../api/users';

export const USERS_QUERY_KEYS = {
  root: ['users'],
  profile: () => [...USERS_QUERY_KEYS.root, 'profile'],
  dashboard: () => [...USERS_QUERY_KEYS.root, 'dashboard'],
  followers: (userId) => [...USERS_QUERY_KEYS.root, 'followers', userId],
  following: (userId) => [...USERS_QUERY_KEYS.root, 'following', userId],
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.profile(),
    queryFn: usersAPI.getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersAPI.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(USERS_QUERY_KEYS.profile(), data);
    },
  });
};

export const useFollowers = (userId) => {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.followers(userId),
    queryFn: () => usersAPI.getFollowers(userId),
    enabled: !!userId,
  });
};

export const useFollowing = (userId) => {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.following(userId),
    queryFn: () => usersAPI.getFollowing(userId),
    enabled: !!userId,
  });
};

export const useFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersAPI.follow,
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.followers(userId) });
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.following(userId) });
      // Also update my profile counts via dashboard
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.dashboard() });
    },
  });
};

export const useUnfollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: usersAPI.unfollow,
    onSuccess: (_data, userId) => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.followers(userId) });
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.following(userId) });
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEYS.dashboard() });
    },
  });
};

export const useDashboard = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEYS.dashboard(),
    queryFn: usersAPI.getDashboard,
  });
};
