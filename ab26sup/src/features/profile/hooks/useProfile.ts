import { useState, useCallback, useEffect } from 'react';
import apiClient from '@/shared/api/apiClient';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  current_odo: number;
  daily_avg_km: number;
  avatar_url?: string;
}

export function useProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<UserProfile>('/auth/me');
      setUser(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await apiClient.put<{ user: UserProfile, message: string }>('/auth/me', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUser(response.data.user);
      setError(null);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update profile';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return {
    user,
    isLoading,
    error,
    refresh: fetchProfile,
    updateProfile
  };
}
