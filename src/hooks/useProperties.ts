import { useQuery } from "@tanstack/react-query";

interface Property {
  id: string;
  address: string;
}

async function fetchProperties() {
  const response = await fetch("/api/properties");
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch properties");
  }
  return response.json() as Promise<Property[]>;
}

export function useProperties() {
  return useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });
} 