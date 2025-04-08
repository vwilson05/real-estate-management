import { useQuery } from "@tanstack/react-query";
import { Property } from "./useProperties";

interface DashboardMetrics {
  totalProperties: number;
  totalValue: number;
  monthlyIncome: number;
  activeRepairs: number;
}

async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  const response = await fetch("/api/dashboard/metrics", {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch dashboard metrics");
  }
  return response.json();
}

export function useDashboardMetrics() {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ["dashboardMetrics"],
    queryFn: fetchDashboardMetrics,
    staleTime: 0, // Always fetch fresh data
    retry: 1, // Only retry once on failure
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  return {
    metrics: metrics || {
      totalProperties: 0,
      totalValue: 0,
      monthlyIncome: 0,
      activeRepairs: 0,
    },
    isLoading,
    error: error instanceof Error ? error.message : null,
  };
} 