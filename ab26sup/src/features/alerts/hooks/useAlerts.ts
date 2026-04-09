import { useState, useCallback } from "react";
import apiClient from "@/shared/api/apiClient";

export interface AlertData {
  _id: string;
  userId: string;
  title: string;
  description: string;
  tag: string;
  category: 'Critical' | 'Reminder' | 'Healthy';
  icon: string;
  variant: 'critical' | 'reminder' | 'healthy';
  hasRead: boolean;
  createdAt: string;
}

export function useAlerts() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const fetchAlerts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<AlertData[]>("/alerts");
      setAlerts(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch alerts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await apiClient.put(`/alerts/${id}/read`);
      setAlerts(prev => prev.map(a => a._id === id ? { ...a, hasRead: true } : a));
    } catch (err: any) {
      console.error("Failed to mark alert as read:", err);
    }
  }, []);

  return {
    isLoading,
    error,
    alerts,
    fetchAlerts,
    markAsRead,
  };
}
