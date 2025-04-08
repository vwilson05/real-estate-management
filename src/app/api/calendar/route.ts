import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

// Create a new Prisma client instance
const prisma = new PrismaClient();

const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  start: z.string().min(1, "Start date is required"),
  end: z.string().optional(),
  allDay: z.boolean(),
  type: z.enum(["REPAIR", "MAINTENANCE", "INSPECTION", "TAX", "OTHER"]),
  propertyId: z.string().min(1, "Property is required"),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const propertyId = searchParams.get("propertyId");
    const type = searchParams.get("type");

    const where: any = {};

    if (start && end) {
      where.start = {
        gte: new Date(start),
        lte: new Date(end),
      };
    }

    if (propertyId) {
      where.propertyId = propertyId;
    }

    if (type) {
      where.type = type;
    }

    const events = await prisma.calendarEvent.findMany({
      where,
      include: {
        property: true,
      },
      orderBy: {
        start: "asc",
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createEventSchema.parse(body);

    const event = await prisma.calendarEvent.create({
      data: {
        ...validatedData,
        start: new Date(validatedData.start),
        end: validatedData.end ? new Date(validatedData.end) : null,
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

    console.error("Error creating calendar event:", error);
    return NextResponse.json(
      { error: "Failed to create calendar event" },
      { status: 500 }
    );
  }
} 