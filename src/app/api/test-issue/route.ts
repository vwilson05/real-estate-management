import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Check if we can access the Issue model
    const issueCount = await db.issue.count();
    
    return NextResponse.json({
      success: true,
      message: "Issue model access successful",
      issueCount
    });
  } catch (error) {
    console.error('Issue model access error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to access Issue model' },
      { status: 500 }
    );
  }
} 