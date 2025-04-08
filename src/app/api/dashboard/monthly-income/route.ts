import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Get the current date
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Create an array to store monthly income data
    const monthlyData = [];
    
    // Track YTD totals
    let ytdIncome = 0;
    let ytdExpenses = 0;
    
    // Fetch income data for the last 6 months
    for (let i = 5; i >= 0; i--) {
      // Calculate the first and last day of the month
      const firstDayOfMonth = new Date(currentYear, now.getMonth() - i, 1);
      const lastDayOfMonth = new Date(currentYear, now.getMonth() - i + 1, 0);
      
      // Get transactions for this month
      const monthlyTransactions = await db.transaction.findMany({
        where: {
          date: {
            gte: firstDayOfMonth,
            lte: lastDayOfMonth,
          },
        },
      });
      
      // Calculate income and expenses for this month
      const monthlyIncome = monthlyTransactions
        .filter(t => t.type === "INCOME")
        .reduce((sum, transaction) => sum + transaction.amount, 0);
        
      const monthlyExpenses = monthlyTransactions
        .filter(t => t.type === "EXPENSE")
        .reduce((sum, transaction) => sum + transaction.amount, 0);
        
      // Calculate net income
      const netIncome = monthlyIncome - monthlyExpenses;
      
      // Update YTD totals
      ytdIncome += monthlyIncome;
      ytdExpenses += monthlyExpenses;
      
      // Calculate month-over-month changes (if we have previous month data)
      let momIncomeChange = 0;
      let momExpensesChange = 0;
      let momNetIncomeChange = 0;
      
      if (monthlyData.length > 0) {
        const prevMonth = monthlyData[monthlyData.length - 1];
        
        // Calculate percentage changes
        momIncomeChange = prevMonth.income > 0 
          ? ((monthlyIncome - prevMonth.income) / prevMonth.income) * 100 
          : 0;
          
        momExpensesChange = prevMonth.expenses > 0 
          ? ((monthlyExpenses - prevMonth.expenses) / prevMonth.expenses) * 100 
          : 0;
          
        momNetIncomeChange = prevMonth.netIncome !== 0 
          ? ((netIncome - prevMonth.netIncome) / Math.abs(prevMonth.netIncome)) * 100 
          : 0;
      }
      
      // Add to the result array
      monthlyData.push({
        month: firstDayOfMonth.toLocaleDateString('en-US', { month: 'short' }),
        income: monthlyIncome,
        expenses: monthlyExpenses,
        netIncome: netIncome,
        ytdIncome: ytdIncome,
        ytdExpenses: ytdExpenses,
        ytdNetIncome: ytdIncome - ytdExpenses,
        momIncomeChange: momIncomeChange,
        momExpensesChange: momExpensesChange,
        momNetIncomeChange: momNetIncomeChange
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