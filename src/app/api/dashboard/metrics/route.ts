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
    
    let monthlyTransactions = await db.transaction.findMany({
      where: {
        date: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
    });
    
    // Filter for income transactions (case-insensitive)
    monthlyTransactions = monthlyTransactions.filter(t => t.type.toUpperCase() === "INCOME");
    
    // If no transactions found for the current month, get the most recent month's transactions
    if (monthlyTransactions.length === 0) {
      // Get the most recent transaction
      const recentTransaction = await db.transaction.findFirst({
        orderBy: {
          date: 'desc'
        },
        where: {
          type: "INCOME"
        }
      });
      
      if (recentTransaction) {
        // Get the most recent transaction date
        const mostRecentDate = recentTransaction.date;
        const mostRecentMonth = new Date(mostRecentDate.getFullYear(), mostRecentDate.getMonth(), 1);
        const mostRecentMonthEnd = new Date(mostRecentDate.getFullYear(), mostRecentDate.getMonth() + 1, 0);
        
        // Get transactions for the most recent month
        const recentMonthTransactions = await db.transaction.findMany({
          where: {
            date: {
              gte: mostRecentMonth,
              lte: mostRecentMonthEnd,
            },
          },
        });
        
        // Filter for income transactions (case-insensitive)
        monthlyTransactions = recentMonthTransactions.filter(t => t.type.toUpperCase() === "INCOME");
      }
    }
    
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