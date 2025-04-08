import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const tenantSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().min(1, "Phone number is required").optional(),
  leaseStart: z.string().transform((str) => new Date(str)),
  leaseEnd: z.string().transform((str) => new Date(str)),
  rentAmount: z.number().positive("Rent amount must be positive"),
  propertyId: z.string().min(1, "Property ID is required"),
});

// GET /api/tenants - Get all tenants
export async function GET() {
  try {
    const tenants = await prisma.tenant.findMany({
      include: {
        property: {
          select: {
            id: true,
            address: true,
            city: true,
            state: true,
            zipCode: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tenants);
  } catch (error: unknown) {
    console.error("Error fetching tenants:", error);
    return NextResponse.json(
      { error: "Failed to fetch tenants" },
      { status: 500 }
    );
  }
}

// POST /api/tenants - Create a new tenant
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = tenantSchema.parse(body);

    const tenant = await prisma.tenant.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        leaseStart: validatedData.leaseStart,
        leaseEnd: validatedData.leaseEnd,
        rentAmount: validatedData.rentAmount,
        propertyId: validatedData.propertyId,
      },
      include: {
        property: {
          select: {
            id: true,
            address: true,
            city: true,
            state: true,
            zipCode: true,
          },
        },
      },
    });

    return NextResponse.json(tenant, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating tenant:", error);
    return NextResponse.json(
      { error: "Failed to create tenant" },
      { status: 500 }
    );
  }
} 