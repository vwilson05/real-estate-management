import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

// Validation schema for repair creation
const repairSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  cost: z.number().positive(),
  description: z.string().min(1),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  propertyId: z.string().uuid(),
  item: z.string().min(1),
  estimatedCompletionDate: z.string().transform((str) => new Date(str)),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");
    const status = searchParams.get("status");

    const repairs = await db.repair.findMany({
      where: {
        ...(propertyId && { propertyId }),
        ...(status && { status }),
      },
      include: {
        property: {
          select: {
            address: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(repairs);
  } catch (error) {
    console.error("Error fetching repairs:", error);
    return NextResponse.json(
      { error: "Failed to fetch repairs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = repairSchema.parse(body);

    // Check if property exists
    const property = await db.property.findUnique({
      where: { id: validatedData.propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found", details: "The specified property does not exist" },
        { status: 404 }
      );
    }

    const repair = await db.repair.create({
      data: validatedData,
      include: {
        property: {
          select: {
            address: true,
          },
        },
      },
    });

    return NextResponse.json(repair, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid repair data", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating repair:", error);
    return NextResponse.json(
      { error: "Failed to create repair" },
      { status: 500 }
    );
  }
} 