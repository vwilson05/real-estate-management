import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get the current date
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Create an array to store monthly income data
    const monthlyData = [];
    
    // Fetch income data for the last 6 months
    for (let i = 5; i >= 0; i--) {
      // Calculate the first and last day of the month
      const firstDayOfMonth = new Date(currentYear, now.getMonth() - i, 1);
      const lastDayOfMonth = new Date(currentYear, now.getMonth() - i + 1, 0);
      
      // Get transactions for this month
      const monthlyTransactions = await prisma.transaction.findMany({
        where: {
          date: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
          type: "INCOME",
        },
      });
      
      // Calculate total income for this month
      const monthlyIncome = monthlyTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
      
      // Add to the result array
      monthlyData.push({
        month: firstDayOfMonth.toLocaleDateString('en-US', { month: 'short' }),
        income: monthlyIncome,
      });
    }
    
    return NextResponse.json(monthlyData);
  } catch (error) {
    console.error("Error calculating monthly income data:", error);
    return NextResponse.json(
      { error: "Failed to calculate monthly income data" },
      { status: 500 }
    );
  }
} 