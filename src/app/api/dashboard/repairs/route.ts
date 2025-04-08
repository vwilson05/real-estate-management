import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Repair, Property } from "@prisma/client";

interface RepairWithProperty extends Repair {
  property: Pick<Property, 'address'>;
}

export async function GET() {
  try {
    // Fetch active repairs (pending or in_progress)
    const activeRepairs = await db.repair.findMany({
      where: {
        status: {
          in: ['pending', 'in_progress']
        }
      },
      orderBy: {
        date: 'asc'
      },
      include: {
        property: {
          select: {
            address: true
          }
        }
      }
    });

    // Calculate total repair cost
    const totalRepairCost = activeRepairs.reduce((sum: number, repair: RepairWithProperty) => sum + repair.cost, 0);

    return NextResponse.json({
      activeRepairs: activeRepairs.map((repair: RepairWithProperty) => ({
        id: repair.id,
        item: repair.item,
        location: repair.property.address,
        status: repair.status,
        cost: repair.cost,
        estimatedCompletionDate: repair.date
      })),
      totalRepairCost
    });
  } catch (error) {
    console.error('Error fetching repairs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repairs data' },
      { status: 500 }
    );
  }
} 