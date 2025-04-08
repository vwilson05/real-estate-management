import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

// Create a new Prisma client instance
const prisma = new PrismaClient();

const updateEventSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  start: z.string().min(1, "Start date is required").optional(),
  end: z.string().optional(),
  allDay: z.boolean().optional(),
  type: z.enum(["REPAIR", "MAINTENANCE", "INSPECTION", "TAX", "OTHER"]).optional(),
  propertyId: z.string().min(1, "Property is required").optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.calendarEvent.findUnique({
      where: {
        id: params.id,
      },
      include: {
        property: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Calendar event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching calendar event:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar event" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validatedData = updateEventSchema.parse(body);

    const event = await prisma.calendarEvent.update({
      where: {
        id: params.id,
      },
      data: {
        ...validatedData,
        start: validatedData.start ? new Date(validatedData.start) : undefined,
        end: validatedData.end ? new Date(validatedData.end) : undefined,
      },
      include: {
        property: true,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating calendar event:", error);
    return NextResponse.json(
      { error: "Failed to update calendar event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.calendarEvent.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting calendar event:", error);
    return NextResponse.json(
      { error: "Failed to delete calendar event" },
      { status: 500 }
    );
  }
} 