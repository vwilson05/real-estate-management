import { Property } from '@prisma/client';

export type CalendarEventType = "REPAIR" | "MAINTENANCE" | "INSPECTION" | "TAX" | "OTHER";
export type TodoPriority = "LOW" | "MEDIUM" | "HIGH";
export type TodoStatus = "OPEN" | "IN_PROGRESS" | "COMPLETED";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  type: CalendarEventType;
  propertyId: string;
  property?: Property;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCalendarEventInput {
  title: string;
  description?: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  type: CalendarEventType;
  propertyId: string;
  createTodo?: boolean;
  todoPriority?: TodoPriority;
  todoStatus?: TodoStatus;
}

export interface UpdateCalendarEventInput extends Partial<CreateCalendarEventInput> {
  id: string;
}

export interface CalendarView {
  type: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';
  title: string;
} 