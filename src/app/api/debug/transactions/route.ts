import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get all transactions
    const transactions = await db.transaction.findMany({
      orderBy: {
        date: 'desc'
      },
      take: 20, // Limit to 20 transactions
    });
    
    // Group transactions by type
    const transactionTypes = transactions.reduce((acc, transaction) => {
      const type = transaction.type;
      if (!acc[type]) {
        acc[type] = 0;
      }
      acc[type]++;
      return acc;
    }, {} as Record<string, number>);
    
    return NextResponse.json({
      transactions,
      transactionTypes,
      count: transactions.length
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
} 