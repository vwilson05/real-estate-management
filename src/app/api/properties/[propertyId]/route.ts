import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

// Define a partial schema for updates (all fields optional)
const propertyUpdateSchema = z.object({
  address: z.string().min(1, "Address is required").optional(),
  state: z.string().min(1, "State is required").optional(),
  type: z.string().min(1, "Property type is required").optional(),
  marketValue: z.number().min(0, "Market value must be positive").optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  purchasePrice: z.number().min(0, "Purchase price must be positive").optional(),
  purchaseDate: z.string().optional(),
  description: z.string().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: { propertyId: string } }
) {
  try {
    const { propertyId } = params;
    
    const property = await db.property.findUnique({
      where: { id: propertyId },
    });
    
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { propertyId: string } }
) {
  try {
    const { propertyId } = params;
    const body = await request.json();
    
    // Validate the update data
    const validatedData = propertyUpdateSchema.parse(body);
    
    // Check if the property exists
    const existingProperty = await db.property.findUnique({
      where: { id: propertyId },
    });
    
    if (!existingProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }
    
    // Convert purchaseDate string to Date object if it exists
    const updateData = {
      ...validatedData,
      ...(validatedData.purchaseDate && {
        purchaseDate: new Date(validatedData.purchaseDate),
      }),
    };
    
    // Update the property
    const updatedProperty = await db.property.update({
      where: { id: propertyId },
      data: updateData,
    });
    
    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { propertyId: string } }
) {
  try {
    const { propertyId } = params;
    
    // Check if the property exists
    const existingProperty = await db.property.findUnique({
      where: { id: propertyId },
    });
    
    if (!existingProperty) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }
    
    // Delete the property
    await db.property.delete({
      where: { id: propertyId },
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting property:", error);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
} 