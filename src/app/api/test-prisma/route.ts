import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Test both Issue and Property models
    const issueCount = await db.issue.count();
    const propertyCount = await db.property.count();

    return NextResponse.json({
      success: true,
      message: "Prisma client is working correctly",
      counts: {
        issues: issueCount,
        properties: propertyCount
      }
    });
  } catch (error) {
    console.error('Error testing Prisma client:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 