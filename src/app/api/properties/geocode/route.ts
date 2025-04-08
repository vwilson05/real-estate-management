import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { geocodeAddress } from "@/lib/server/geocoding";

export async function POST(request: Request) {
  try {
    console.log("Geocode API route called");
    const { propertyId } = await request.json();
    console.log("Property ID:", propertyId);

    if (!propertyId) {
      console.log("No property ID provided");
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    // Fetch the property
    const property = await db.property.findUnique({
      where: { id: propertyId },
    });
    console.log("Found property:", property);

    if (!property) {
      console.log("Property not found");
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Create full address string
    const fullAddress = `${property.address}, ${property.city}, ${property.state} ${property.zipCode}`;
    console.log("Full address for geocoding:", fullAddress);
    
    // Geocode the address
    const geocodingResult = await geocodeAddress(fullAddress);
    console.log("Geocoding result:", geocodingResult);

    // Update the property with new coordinates
    const updatedProperty = await db.property.update({
      where: { id: propertyId },
      data: {
        latitude: geocodingResult.latitude,
        longitude: geocodingResult.longitude,
      },
    });
    console.log("Updated property:", updatedProperty);

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Error geocoding property:", error);
    return NextResponse.json(
      { error: "Failed to geocode property" },
      { status: 500 }
    );
  }
} 