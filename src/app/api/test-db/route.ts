import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Check if we can connect to the database
    const propertyCount = await db.property.count();
    
    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      propertyCount
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to connect to database' },
      { status: 500 }
    );
  }
} 