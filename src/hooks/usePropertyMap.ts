import { useQuery } from "@tanstack/react-query";

interface Property {
  id: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
}

async function fetchProperties(): Promise<Property[]> {
  const response = await fetch("/api/properties", {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch properties");
  }
  
  const data = await response.json();
  console.log('Fetched properties for map:', data);
  return data;
}

export function usePropertyMap() {
  return useQuery({
    queryKey: ["properties", "map"],
    queryFn: fetchProperties,
    staleTime: 0, // Always fetch fresh data
    retry: 1, // Only retry once on failure
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });
} 