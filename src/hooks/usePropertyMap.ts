import { useQuery } from "@tanstack/react-query";

interface Property {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  name: string;
}

async function fetchProperties(): Promise<Property[]> {
  const response = await fetch("/api/properties");
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return response.json();
}

export function usePropertyMap() {
  return useQuery({
    queryKey: ["properties", "map"],
    queryFn: fetchProperties,
  });
} 