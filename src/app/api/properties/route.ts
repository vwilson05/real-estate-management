import { NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const propertySchema = z.object({
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  type: z.string().min(1, "Property type is required"),
  marketValue: z.number().min(0, "Market value must be positive"),
  // Add optional fields with defaults
  city: z.string().optional().default(""),
  zipCode: z.string().optional().default(""),
  purchasePrice: z.number().optional().default(0),
  purchaseDate: z.string().optional().default(new Date().toISOString()),
  description: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const properties = await prisma.property.findMany();
    return NextResponse.json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received property data:", body);
    
    const validatedData = propertySchema.parse(body);
    console.log("Validated property data:", validatedData);
    
    // Convert purchaseDate string to Date object if it exists
    const propertyData = {
      ...validatedData,
      purchaseDate: validatedData.purchaseDate ? new Date(validatedData.purchaseDate) : new Date(),
    };
    
    const newProperty = await prisma.property.create({
      data: propertyData,
    });
    
    console.log("Created new property:", newProperty);
    
    return NextResponse.json(newProperty, { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 