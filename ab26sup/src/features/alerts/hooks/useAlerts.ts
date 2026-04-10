import useAlertStore from "@/shared/store/useAlertStore";

export type { AlertData } from "@/shared/store/useAlertStore";

export function useAlerts() {
  const { alerts, isLoading, error, fetchAlerts, markAsRead } = useAlertStore();

  return {
    isLoading,
    error,
    alerts,
    fetchAlerts,
    markAsRead,
  };
}
