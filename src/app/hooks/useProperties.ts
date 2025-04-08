"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const propertySchema = z.object({
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  type: z.string().min(1, "Property type is required"),
  marketValue: z.number().min(0, "Market value must be positive"),
});

export type Property = z.infer<typeof propertySchema> & {
  id: string;
};

async function fetchProperties(): Promise<Property[]> {
  const response = await fetch("/api/properties");
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }
  return response.json();
}

async function createProperty(data: Omit<Property, "id">): Promise<Property> {
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
    throw new Error("Failed to create property");
  }
  return response.json();
}

export function useProperties() {
  const queryClient = useQueryClient();

  const { data: properties, isLoading, error } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const createPropertyMutation = useMutation({
    mutationFn: createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });

  return {
    properties,
    isLoading,
    error,
    createProperty: createPropertyMutation.mutate,
    isCreating: createPropertyMutation.isPending,
  };
} 