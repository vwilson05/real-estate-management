import { z } from "zod";

export const issueStatusEnum = z.enum(["OPEN", "IN_PROGRESS", "DONE", "BLOCKED"]);
export const issuePriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
export const issueTypeEnum = z.enum(["TAX", "REPAIR", "TENANT_ACTION", "MAINTENANCE", "REMINDER", "OTHER"]);

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
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