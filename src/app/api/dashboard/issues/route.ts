import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get total number of open issues
    const totalOpenIssues = await db.issue.count({
      where: {
        status: {
          in: ['OPEN', 'IN_PROGRESS', 'BLOCKED']
        }
      }
    });

    // Get top 5 issues ordered by priority and due date
    const topIssues = await db.issue.findMany({
      where: {
        status: {
          in: ['OPEN', 'IN_PROGRESS', 'BLOCKED']
        }
      },
      orderBy: [
        {
          priority: 'desc'
        },
        {
          dueDate: 'asc'
        }
      ],
      take: 5,
      include: {
        property: {
          select: {
            address: true
          }
        }
      }
    });

    return NextResponse.json({
      topIssues: topIssues || [],
      totalOpenIssues: totalOpenIssues || 0
    });
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issues data', topIssues: [], totalOpenIssues: 0 },
      { status: 500 }
    );
  }
} 