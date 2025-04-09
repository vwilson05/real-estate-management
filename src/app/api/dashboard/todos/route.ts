import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        status: {
          not: "RESOLVED",
        },
      },
      include: {
        property: {
          select: {
            id: true,
            address: true,
          },
        },
      },
      orderBy: {
        dueDate: "asc",
      },
      take: 5,
    });

    return NextResponse.json(todos);
  } catch (error) {
    console.error("Error fetching dashboard todos:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard todos" },
      { status: 500 }
    );
  }
} 