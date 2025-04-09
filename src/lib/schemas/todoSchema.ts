import { z } from "zod";

export const todoStatusEnum = z.enum(["OPEN", "IN_PROGRESS", "BLOCKED", "RESOLVED", "CLOSED"]);
export const todoPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
export const todoTypeEnum = z.enum(["MAINTENANCE", "REPAIR", "COMPLAINT", "INSPECTION", "OTHER"]);

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
    .transform((date) => date ? `${date}T00:00:00.000Z` : undefined)
    .optional(),
  status: todoStatusEnum.default("OPEN"),
  priority: todoPriorityEnum.default("MEDIUM"),
  type: todoTypeEnum,
  propertyId: z.string().min(1, "Property is required"),
  repairId: z.string().optional(),
  tenantId: z.string().optional(),
});

export const todoUpdateSchema = todoSchema.partial();

export type TodoFormData = z.infer<typeof todoSchema>;
export type TodoUpdateData = z.infer<typeof todoUpdateSchema>; 