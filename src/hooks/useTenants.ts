import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { TenantFormData, TenantUpdateData } from "@/lib/schemas/tenantSchema";

// Types
export type Tenant = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  leaseStart: Date;
  leaseEnd: Date;
  rentAmount: number;
  propertyId: string;
  createdAt: Date;
  updatedAt: Date;
  property: {
    id: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

// Fetch all tenants
export function useTenants(propertyId?: string) {
  return useQuery({
    queryKey: ["tenants", { propertyId }],
    queryFn: async () => {
      const url = propertyId 
        ? `/api/tenants?propertyId=${propertyId}`
        : "/api/tenants";
      const response = await fetch(url);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch tenants");
      }
      
      return response.json() as Promise<Tenant[]>;
    },
  });
}

// Fetch a single tenant
export function useTenant(tenantId: string) {
  return useQuery({
    queryKey: ["tenant", tenantId],
    queryFn: async () => {
      const response = await fetch(`/api/tenants/${tenantId}`);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch tenant");
      }
      
      return response.json() as Promise<Tenant>;
    },
    enabled: !!tenantId,
  });
}

// Create a new tenant
export function useCreateTenant() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: TenantFormData) => {
      const response = await fetch("/api/tenants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create tenant");
      }
      
      return response.json() as Promise<Tenant>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success("Tenant created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create tenant");
    },
  });
}

// Update an existing tenant
export function useUpdateTenant() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TenantUpdateData }) => {
      const response = await fetch(`/api/tenants/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update tenant");
      }
      
      return response.json() as Promise<Tenant>;
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      queryClient.invalidateQueries({ queryKey: ["tenant", id] });
      toast.success("Tenant updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update tenant");
    },
  });
}

// Delete a tenant
export function useDeleteTenant() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/tenants/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete tenant");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success("Tenant deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete tenant");
    },
  });
} 