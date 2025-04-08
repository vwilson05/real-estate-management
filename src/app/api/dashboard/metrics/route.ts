import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get all properties
    const properties = await db.property.findMany();
    
    // Calculate total properties and total value
    const totalProperties = properties.length;
    const totalValue = properties.reduce((sum, property) => sum + property.marketValue, 0);
    
    // Get transactions for the current month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const monthlyTransactions = await db.transaction.findMany({
      where: {
        date: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
        type: "INCOME",
      },
    });
    
    // Calculate monthly income
    const monthlyIncome = monthlyTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    
    // Get active repairs
    const activeRepairs = await db.repair.count({
      where: {
        status: {
          in: ["PENDING", "IN_PROGRESS"],
        },
      },
    });
    
    return NextResponse.json({
      totalProperties,
      totalValue,
      monthlyIncome,
      activeRepairs,
    });
  } catch (error) {
    console.error("Error calculating dashboard metrics:", error);
    return NextResponse.json(
      { error: "Failed to calculate dashboard metrics" },
      { status: 500 }
    );
  }
} 