import { create } from 'zustand';
import apiClient from '@/shared/api/apiClient';

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

interface AlertState {
  alerts: AlertData[];
  isLoading: boolean;
  error: string | null;
  fetchAlerts: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
}

const useAlertStore = create<AlertState>((set, get) => ({
  alerts: [],
  isLoading: false,
  error: null,

  fetchAlerts: async () => {
    try {
      set({ isLoading: true });
      const response = await apiClient.get<AlertData[]>("/alerts");
      set({ alerts: response.data, error: null });
    } catch (err: any) {
      set({ error: err.response?.data?.message || "Failed to fetch alerts" });
    } finally {
      set({ isLoading: false });
    }
  },

  markAsRead: async (id: string) => {
    try {
      await apiClient.put(`/alerts/${id}/read`);
      set({ 
        alerts: get().alerts.map(a => a._id === id ? { ...a, hasRead: true } : a) 
      });
    } catch (err: any) {
      console.error("Failed to mark alert as read:", err);
    }
  },
}));

export default useAlertStore;
