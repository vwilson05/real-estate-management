"use client";

import * as React from "react";
import { CalendarEvent } from "@/types/calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarEventType } from "@/types/calendar";

interface CalendarProps extends React.HTMLAttributes<HTMLDivElement> {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
  onEventDrop?: (event: CalendarEvent) => void;
  onEventResize?: (event: CalendarEvent) => void;
}

const eventTypeColors: Record<CalendarEventType, string> = {
  REPAIR: "bg-blue-500",
  MAINTENANCE: "bg-green-500",
  INSPECTION: "bg-yellow-500",
  TAX: "bg-red-500",
  OTHER: "bg-gray-500",
};

export function Calendar({
  events,
  onEventClick,
  onDateClick,
  onEventDrop,
  onEventResize,
  className,
  ...props
}: CalendarProps) {
  const [view, setView] = React.useState<string>("dayGridMonth");
  const calendarRef = React.useRef<any>(null);

  const handleViewChange = (newView: string) => {
    if (calendarRef.current) {
      const calendar = calendarRef.current.getApi();
      calendar.changeView(newView);
      setView(newView);
    }
  };

  const handleEventClick = (info: any) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event && onEventClick) {
      onEventClick(event);
    }
  };

  const handleDateClick = (info: any) => {
    if (onDateClick) {
      onDateClick(info.date);
    }
  };

  const handleEventDrop = (info: any) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event && onEventDrop) {
      onEventDrop({
        ...event,
        start: info.event.start,
        end: info.event.end,
      });
    }
  };

  const handleEventResize = (info: any) => {
    const event = events.find((e) => e.id === info.event.id);
    if (event && onEventResize) {
      onEventResize({
        ...event,
        start: info.event.start,
        end: info.event.end,
      });
    }
  };

  return (
    <Card className={cn("p-4", className)} {...props}>
      <div className="mb-4 flex gap-2">
        <Button
          variant={view === "dayGridMonth" ? "default" : "outline"}
          onClick={() => handleViewChange("dayGridMonth")}
        >
          Month
        </Button>
        <Button
          variant={view === "timeGridWeek" ? "default" : "outline"}
          onClick={() => handleViewChange("timeGridWeek")}
        >
          Week
        </Button>
        <Button
          variant={view === "timeGridDay" ? "default" : "outline"}
          onClick={() => handleViewChange("timeGridDay")}
        >
          Day
        </Button>
        <Button
          variant={view === "listWeek" ? "default" : "outline"}
          onClick={() => handleViewChange("listWeek")}
        >
          List
        </Button>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        initialView={view}
        datesSet={({ view }) => setView(view.type)}
        headerToolbar={false}
        events={events.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          allDay: event.allDay,
          backgroundColor: eventTypeColors[event.type],
          borderColor: eventTypeColors[event.type],
        }))}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        editable={true}
        droppable={true}
        selectable={true}
        height="auto"
      />
    </Card>
  );
} 