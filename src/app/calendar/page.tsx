"use client";

import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar } from "@/components/calendar/Calendar";
import { CalendarEventForm } from "@/components/calendar/CalendarEventForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarEvent } from "@/types/calendar";
import { Property } from "@prisma/client";
import { toast } from "sonner";

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const { data: events = [], isLoading: isLoadingEvents } = useQuery({
    queryKey: ["calendar-events"],
    queryFn: async () => {
      const response = await fetch("/api/calendar");
      if (!response.ok) {
        throw new Error("Failed to fetch calendar events");
      }
      return response.json();
    },
  });

  const { data: properties = [], isLoading: isLoadingProperties } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await fetch("/api/properties");
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      return response.json();
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: Omit<CalendarEvent, "id" | "createdAt" | "updatedAt">) => {
      const response = await fetch("/api/calendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create calendar event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
      setIsFormOpen(false);
      toast.success("Event created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create event: " + error.message);
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CalendarEvent>;
    }) => {
      const response = await fetch(`/api/calendar/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to update calendar event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
      setIsFormOpen(false);
      setSelectedEvent(null);
      toast.success("Event updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update event: " + error.message);
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/calendar/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete calendar event");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
      setSelectedEvent(null);
      toast.success("Event deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete event: " + error.message);
    },
  });

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedEvent(null);
    setIsFormOpen(true);
  };

  const handleEventDrop = (event: CalendarEvent) => {
    updateEventMutation.mutate({
      id: event.id,
      data: {
        start: event.start,
        end: event.end,
      },
    });
  };

  const handleEventResize = (event: CalendarEvent) => {
    updateEventMutation.mutate({
      id: event.id,
      data: {
        start: event.start,
        end: event.end,
      },
    });
  };

  const handleFormSubmit = (data: any) => {
    if (selectedEvent) {
      updateEventMutation.mutate({
        id: selectedEvent.id,
        data,
      });
    } else {
      createEventMutation.mutate(data);
    }
  };

  if (isLoadingEvents || isLoadingProperties) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>Add Event</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedEvent ? "Edit Event" : "Create Event"}
              </DialogTitle>
            </DialogHeader>
            <CalendarEventForm
              event={selectedEvent || undefined}
              properties={properties}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedEvent(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Calendar
        events={events}
        onEventClick={handleEventClick}
        onDateClick={handleDateClick}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
      />
    </div>
  );
} 