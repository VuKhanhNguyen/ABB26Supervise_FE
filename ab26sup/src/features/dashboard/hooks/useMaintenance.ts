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

  return {
    isLoading,
    error,
    history,
    fetchHistory,
    addLog,
  };
}
