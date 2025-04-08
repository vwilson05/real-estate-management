import { z } from "zod";

// Schema for creating a new tenant
export const tenantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  leaseStart: z.string(),
  leaseEnd: z.string(),
  rentAmount: z.number().positive("Rent amount must be positive"),
  propertyId: z.string().min(1, "Property is required"),
});

// Schema for updating an existing tenant (all fields optional)
export const tenantUpdateSchema = tenantSchema.partial();

// Type for tenant form data
export type TenantFormData = z.infer<typeof tenantSchema>;

// Type for tenant update data
export type TenantUpdateData = z.infer<typeof tenantUpdateSchema>; 