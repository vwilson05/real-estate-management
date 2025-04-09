import { z } from "zod";
import { todoStatusEnum, todoPriorityEnum, todoTypeEnum } from "@/lib/schemas/todoSchema";

export type TodoStatus = z.infer<typeof todoStatusEnum>;
export type TodoPriority = z.infer<typeof todoPriorityEnum>;
export type TodoType = z.infer<typeof todoTypeEnum>;

export interface Todo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description?: string | null;
  dueDate?: Date | null;
  status: TodoStatus;
  priority: TodoPriority;
  type: TodoType;
  propertyId: string;
  repairId?: string | null;
  tenantId?: string | null;
  
  // Related data
  property: {
    id: string;
    address: string;
  };
  repair?: {
    id: string;
    description: string;
  } | null;
  tenant?: {
    id: string;
    name: string;
  } | null;
}

export interface TodoFilters {
  propertyId?: string;
  status?: TodoStatus;
  priority?: TodoPriority;
  type?: TodoType;
  dueDateGte?: Date;
  dueDateLte?: Date;
}

export interface TodoSort {
  field: keyof Todo;
  order: "asc" | "desc";
} 