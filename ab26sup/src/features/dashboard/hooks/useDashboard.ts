import { useState, useCallback, useEffect } from 'react';
import apiClient from '@/shared/api/apiClient';

export interface MaintenanceItem {
  id: string;
  tag: string;
  title: string;
  status: 'safe' | 'warning' | 'normal' | 'danger';
  distanceLeft: number;
  nextDistance: number;
  progressCurrent: number;
  progressTotal: number;
}

export interface DashboardData {
  currentOdo: number;
  dailyAvgKm: number;
  maintenanceItems: MaintenanceItem[];
}

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<DashboardData>('/dashboard');
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateOdo = useCallback(async (odo: number) => {
    try {
      await apiClient.post('/dashboard/odo', { odo });
      // Refresh data after update
      await fetchDashboardData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update ODO');
      throw err;
    }
  }, [fetchDashboardData]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return {
    data,
    isLoading,
    error,
    refresh: fetchDashboardData,
    updateOdo
  };
}
