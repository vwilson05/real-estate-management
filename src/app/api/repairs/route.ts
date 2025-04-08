import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Validation schema for repair creation
const repairSchema = z.object({
  date: z.string().transform((str) => new Date(str)),
  cost: z.number().positive(),
  description: z.string().min(1),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  propertyId: z.string().uuid(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");
    const status = searchParams.get("status");

    const repairs = await prisma.repair.findMany({
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

    const repair = await prisma.repair.create({
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