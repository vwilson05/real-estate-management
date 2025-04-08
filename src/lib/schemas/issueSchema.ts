import { z } from "zod";

export const issueStatusEnum = z.enum(["OPEN", "IN_PROGRESS", "BLOCKED", "RESOLVED", "CLOSED"]);
export const issuePriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]);
export const issueTypeEnum = z.enum(["MAINTENANCE", "REPAIR", "COMPLAINT", "INSPECTION", "OTHER"]);

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format. Use YYYY-MM-DD")
    .transform((date) => date ? `${date}T00:00:00.000Z` : undefined)
    .optional(),
  status: issueStatusEnum.default("OPEN"),
  priority: issuePriorityEnum.default("MEDIUM"),
  type: issueTypeEnum,
  propertyId: z.string().min(1, "Property is required"),
  repairId: z.string().optional(),
  tenantId: z.string().optional(),
});

export const issueUpdateSchema = issueSchema.partial();

export type IssueFormData = z.infer<typeof issueSchema>;
export type IssueUpdateData = z.infer<typeof issueUpdateSchema>; 