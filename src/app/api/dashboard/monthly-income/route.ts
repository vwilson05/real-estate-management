import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    // Get the URL and parse the query parameters
    const url = new URL(request.url);
    const yearParam = url.searchParams.get('year');
    
    // Get the target year (default to current year if not specified)
    const now = new Date();
    let targetYear = now.getFullYear();
    
    // If year parameter is provided, use it
    if (yearParam) {
      const parsedYear = parseInt(yearParam, 10);
      if (!isNaN(parsedYear)) {
        targetYear = parsedYear;
      }
    }
    
    // Get transactions for the entire target year
    const endDate = new Date(targetYear, 11, 31); // December 31st of target year
    const startDate = new Date(targetYear, 0, 1); // January 1st of target year
    
    const transactions = await db.transaction.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
    
    // Initialize monthly data
    const monthlyData = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      monthName: new Date(targetYear, i, 1).toLocaleDateString('en-US', { month: 'short' }),
      income: 0,
      expenses: 0,
      netIncome: 0,
      momIncomeChange: 0,
      momExpensesChange: 0,
      momNetIncomeChange: 0,
    }));
    
    // Calculate monthly income and expenses
    transactions.forEach(transaction => {
      const month = transaction.date.getMonth();
      if (transaction.type.toUpperCase() === "INCOME") {
        monthlyData[month].income += transaction.amount;
      } else if (transaction.type.toUpperCase() === "EXPENSE") {
        monthlyData[month].expenses += transaction.amount;
      }
    });
    
    // Calculate net income and month-over-month changes
    for (let i = 0; i < 12; i++) {
      // Make expenses negative for chart visualization
      monthlyData[i].expenses = -monthlyData[i].expenses;
      
      // Calculate net income
      monthlyData[i].netIncome = monthlyData[i].income + monthlyData[i].expenses; // Since expenses are now negative
      
      // Calculate month-over-month changes (if we have previous month data)
      if (i > 0) {
        const prevMonth = monthlyData[i - 1];
        
        // Calculate percentage changes (use absolute values for expenses since they're negative)
        monthlyData[i].momIncomeChange = prevMonth.income > 0 
          ? ((monthlyData[i].income - prevMonth.income) / prevMonth.income) * 100 
          : 0;
          
        monthlyData[i].momExpensesChange = prevMonth.expenses < 0 
          ? ((Math.abs(monthlyData[i].expenses) - Math.abs(prevMonth.expenses)) / Math.abs(prevMonth.expenses)) * 100 
          : 0;
          
        monthlyData[i].momNetIncomeChange = prevMonth.netIncome !== 0 
          ? ((monthlyData[i].netIncome - prevMonth.netIncome) / Math.abs(prevMonth.netIncome)) * 100 
          : 0;
      }
    }
    
    // Calculate year-to-date totals (use absolute values for expenses)
    const ytdIncome = monthlyData.reduce((sum, month) => sum + month.income, 0);
    const ytdExpenses = monthlyData.reduce((sum, month) => sum + Math.abs(month.expenses), 0);
    const ytdNetIncome = ytdIncome - ytdExpenses;
    
    // If no transactions found for the target year, get the most recent year's data
    if (transactions.length === 0) {
      // Get the most recent transaction
      const recentTransaction = await db.transaction.findFirst({
        orderBy: {
          date: 'desc'
        }
      });
      
      if (recentTransaction) {
        // Get the most recent transaction date
        const mostRecentDate = recentTransaction.date;
        const mostRecentYear = mostRecentDate.getFullYear();
        
        // Recursively call this function with the most recent year
        const response = await fetch(`${request.url.split('?')[0]}?year=${mostRecentYear}`);
        const data = await response.json();
        return NextResponse.json(data);
      }
    }
    
    return NextResponse.json({
      monthlyData,
      ytdIncome,
      ytdExpenses,
      ytdNetIncome,
      targetYear,
    });
  } catch (error) {
    console.error("Error calculating monthly income:", error);
    return NextResponse.json(
      { error: "Failed to calculate monthly income" },
      { status: 500 }
    );
  }
} 