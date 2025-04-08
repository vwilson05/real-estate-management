"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Property } from "@/types/property";

// Define the property schema to match the Prisma model
const propertySchema = z.object({
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  type: z.string().min(1, "Property type is required"),
  marketValue: z.number().min(0, "Market value must be positive"),
  city: z.string().optional().default(""),
  zipCode: z.string().optional().default(""),
  purchasePrice: z.number().optional().default(0),
  purchaseDate: z.string().optional().default(new Date().toISOString()),
  description: z.string().optional().nullable(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
});

async function fetchProperties(): Promise<Property[]> {
  const response = await fetch("/api/properties", {
    // Add cache control headers to prevent caching
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
  return response.json();
}

async function createProperty(data: Omit<Property, "id" | "createdAt" | "updatedAt">): Promise<Property> {
  // Validate the data before sending
  propertySchema.parse(data);
  
  const response = await fetch("/api/properties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create property");
  }
  
  return response.json();
}

export function useProperties() {
  const queryClient = useQueryClient();

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
    staleTime: 0, // Always fetch fresh data
    retry: 1, // Only retry once on failure
    refetchOnMount: true, // Refetch when component mounts
    refetchOnWindowFocus: true, // Refetch when window regains focus
  });

  const createPropertyMutation = useMutation({
    mutationFn: createProperty,
    onSuccess: (newProperty) => {
      // Update the cache with the new property
      queryClient.setQueryData<Property[]>(["properties"], (old) => {
        if (!old) return [newProperty];
        return [...old, newProperty];
      });
      
      // Force a refetch to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error) => {
      console.error("Error creating property:", error);
    },
  });

  return {
    properties: properties || [],
    isLoading,
    error: error instanceof Error ? error.message : null,
    createProperty: createPropertyMutation.mutate,
    isCreating: createPropertyMutation.isPending,
  };
} 