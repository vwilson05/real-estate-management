import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { issueSchema } from "@/lib/schemas/issueSchema";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Build filter conditions
    const where: Prisma.IssueWhereInput = {};
    
    // Property filter
    const propertyId = searchParams.get("propertyId");
    if (propertyId) {
      where.propertyId = propertyId;
    }

    // Status filter
    const status = searchParams.get("status");
    if (status) {
      where.status = status;
    }

    // Priority filter
    const priority = searchParams.get("priority");
    if (priority) {
      where.priority = priority;
    }

    // Type filter
    const type = searchParams.get("type");
    if (type) {
      where.type = type;
    }

    // Due date range filter
    const dueDateGte = searchParams.get("dueDateGte");
    const dueDateLte = searchParams.get("dueDateLte");
    if (dueDateGte || dueDateLte) {
      where.dueDate = {
        ...(dueDateGte && { gte: new Date(dueDateGte) }),
        ...(dueDateLte && { lte: new Date(dueDateLte) }),
      };
    }

    // Build sort conditions
    const sortField = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const orderBy: Prisma.IssueOrderByWithRelationInput = {
      [sortField]: sortOrder,
    };

    // Fetch issues with filters and sorting
    const issues = await db.issue.findMany({
      where,
      orderBy,
      include: {
        property: {
          select: {
            id: true,
            address: true,
          },
        },
        repair: {
          select: {
            id: true,
            description: true,
          },
        },
        tenant: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(issues);
  } catch (error) {
    console.error("Error fetching issues:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = issueSchema.parse(body);

    // Check if property exists
    const property = await db.property.findUnique({
      where: { id: validatedData.propertyId },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Create the issue
    const issue = await db.issue.create({
      data: {
        ...validatedData,
        dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
      },
      include: {
        property: {
          select: {
            id: true,
            address: true,
          },
        },
        repair: {
          select: {
            id: true,
            description: true,
          },
        },
        tenant: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    console.error("Error creating issue:", error);
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 