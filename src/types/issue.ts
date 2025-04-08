import { z } from "zod";
import { issueStatusEnum, issuePriorityEnum, issueTypeEnum } from "@/lib/schemas/issueSchema";

export type IssueStatus = z.infer<typeof issueStatusEnum>;
export type IssuePriority = z.infer<typeof issuePriorityEnum>;
export type IssueType = z.infer<typeof issueTypeEnum>;

export interface Issue {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description?: string | null;
  dueDate?: Date | null;
  status: IssueStatus;
  priority: IssuePriority;
  type: IssueType;
  propertyId: string;
  repairId?: string | null;
  tenantId?: string | null;
  
  // Related data
  property?: {
    id: string;
    address: string;
  };
  repair?: {
    id: string;
    description: string;
  };
  tenant?: {
    id: string;
    name: string;
  };
}

export interface IssueFilters {
  propertyId?: string;
  status?: IssueStatus;
  priority?: IssuePriority;
  type?: IssueType;
  dueDateGte?: Date;
  dueDateLte?: Date;
}

export interface IssueSort {
  field: keyof Issue;
  order: "asc" | "desc";
} 