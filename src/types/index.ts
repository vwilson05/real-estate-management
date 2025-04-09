export interface Todo {
  id: string;
  title: string;
  description?: string | null;
  status: TodoStatus;
  priority: TodoPriority;
  type: TodoType;
  dueDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  propertyId: string;
  repairId?: string | null;
  tenantId?: string | null;
  property: {
    address: string;
    city: string;
    state: string;
  };
}

export type TodoStatus = "OPEN" | "IN_PROGRESS" | "BLOCKED" | "RESOLVED" | "CLOSED";
export type TodoPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type TodoType = "MAINTENANCE" | "REPAIR" | "COMPLAINT" | "INSPECTION" | "OTHER"; 