import { Property } from '@prisma/client';

export type CalendarEventType = 'REPAIR' | 'MAINTENANCE' | 'INSPECTION' | 'TAX' | 'OTHER';

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
}

export interface UpdateCalendarEventInput extends Partial<CreateCalendarEventInput> {
  id: string;
}

export interface CalendarView {
  type: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek';
  title: string;
} 