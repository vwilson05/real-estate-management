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
      
      console.log(`Month ${i}: Found ${monthlyTransactions.length} transactions`);
      
      // Calculate income and expenses for this month
      const monthlyIncome = monthlyTransactions
        .filter(t => t.type.toUpperCase() === "INCOME")
        .reduce((sum, transaction) => sum + transaction.amount, 0);
        
      const monthlyExpenses = monthlyTransactions
        .filter(t => t.type.toUpperCase() === "EXPENSE")
        .reduce((sum, transaction) => sum + transaction.amount, 0);
        
      console.log(`Month ${i}: Income: ${monthlyIncome}, Expenses: ${monthlyExpenses}`);
      
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
    
    // If we don't have any data for the current month, fetch the most recent month's data
    if (monthlyData.length > 0 && monthlyData[monthlyData.length - 1].income === 0) {
      // Get the most recent transactions
      const recentTransactions = await db.transaction.findMany({
        orderBy: {
          date: 'desc'
        },
        take: 10,
      });
      
      if (recentTransactions.length > 0) {
        // Get the most recent transaction date
        const mostRecentDate = recentTransactions[0].date;
        const mostRecentMonth = new Date(mostRecentDate.getFullYear(), mostRecentDate.getMonth(), 1);
        const mostRecentMonthEnd = new Date(mostRecentDate.getFullYear(), mostRecentDate.getMonth() + 1, 0);
        
        // Get transactions for the most recent month
        const mostRecentMonthTransactions = await db.transaction.findMany({
          where: {
            date: {
              gte: mostRecentMonth,
              lte: mostRecentMonthEnd,
            },
          },
        });
        
        // Calculate income and expenses for the most recent month
        const mostRecentIncome = mostRecentMonthTransactions
          .filter(t => t.type.toUpperCase() === "INCOME")
          .reduce((sum, transaction) => sum + transaction.amount, 0);
          
        const mostRecentExpenses = mostRecentMonthTransactions
          .filter(t => t.type.toUpperCase() === "EXPENSE")
          .reduce((sum, transaction) => sum + transaction.amount, 0);
          
        // Update the current month's data
        monthlyData[monthlyData.length - 1].income = mostRecentIncome;
        monthlyData[monthlyData.length - 1].expenses = mostRecentExpenses;
        monthlyData[monthlyData.length - 1].netIncome = mostRecentIncome - mostRecentExpenses;
        monthlyData[monthlyData.length - 1].month = mostRecentMonth.toLocaleDateString('en-US', { month: 'short' });
      }
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