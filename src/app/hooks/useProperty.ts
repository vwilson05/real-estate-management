"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Property } from "@/types/property";
import { toast } from "sonner";

async function fetchPropertyById(propertyId: string): Promise<Property> {
  const response = await fetch(`/api/properties/${propertyId}`, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Property not found");
    }
    const error = await response.json();
    throw new Error(error.error || "Failed to fetch property");
  }
  
  return response.json();
}

async function updatePropertyById(propertyId: string, data: Partial<Property>): Promise<Property> {
  const response = await fetch(`/api/properties/${propertyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to update property");
  }
  
  return response.json();
}

async function deletePropertyById(propertyId: string): Promise<void> {
  const response = await fetch(`/api/properties/${propertyId}`, {
    method: "DELETE",
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to delete property");
  }
}

export function useProperty(propertyId: string) {
  const queryClient = useQueryClient();

  const { data: property, isLoading, error } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => fetchPropertyById(propertyId),
    staleTime: 0,
    retry: 1,
  });

  const updatePropertyMutation = useMutation({
    mutationFn: (data: Partial<Property>) => updatePropertyById(propertyId, data),
    onSuccess: (updatedProperty) => {
      // Update the cache with the updated property
      queryClient.setQueryData<Property>(["property", propertyId], updatedProperty);
      
      // Invalidate the properties list query
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (error) => {
      console.error("Error updating property:", error);
      toast.error("Failed to update property");
    },
  });

  const deletePropertyMutation = useMutation({
    mutationFn: () => deletePropertyById(propertyId),
    onSuccess: () => {
      // Remove the property from the cache
      queryClient.removeQueries({ queryKey: ["property", propertyId] });
      
      // Invalidate the properties list query
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      
      toast.success("Property deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property");
    },
  });

  return {
    property,
    isLoading,
    error: error instanceof Error ? error.message : null,
    updateProperty: updatePropertyMutation.mutate,
    isUpdating: updatePropertyMutation.isPending,
    deleteProperty: deletePropertyMutation.mutate,
    isDeleting: deletePropertyMutation.isPending,
  };
} 