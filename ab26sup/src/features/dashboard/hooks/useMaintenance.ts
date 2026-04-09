import { useState, useCallback } from "react";
import apiClient from "@/shared/api/apiClient";

export interface MaintenanceLog {
  notes: string | undefined;
  location: string | undefined;
  _id: string;
  userId: string;
  part_name: string;
  odo_at_service: number;
  next_service_odo: number;
  cost?: number;
  receipt_image_url?: string;
  createdAt: string;
}

export function useMaintenance() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<MaintenanceLog[]>([]);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<MaintenanceLog[]>(
        "/maintenance/history",
      );
      setHistory(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchLogById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      const response = await apiClient.get<MaintenanceLog>(`/maintenance/${id}`);
      setError(null);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch log");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addLog = useCallback(async (formData: FormData) => {
    try {
      setIsLoading(true);
      const response = await apiClient.post("/maintenance/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setError(null);
      return response.data;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "Failed to add maintenance record";
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateLog = useCallback(async (id: string, formData: FormData) => {
    try {
      setIsLoading(true);
      const response = await apiClient.put(`/maintenance/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setError(null);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to update maintenance record";
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteLog = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      await apiClient.delete(`/maintenance/${id}`);
      setError(null);
      // Update local history
      setHistory(prev => prev.filter(log => log._id !== id));
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to delete maintenance record";
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    history,
    fetchHistory,
    fetchLogById,
    addLog,
    updateLog,
    deleteLog,
  };
}
