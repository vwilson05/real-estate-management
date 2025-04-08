"use client"

import { Bar, Line, ComposedChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface MonthlyData {
  month: number;
  monthName: string;
  income: number;
  expenses: number;
  netIncome: number;
  momIncomeChange: number;
  momExpensesChange: number;
  momNetIncomeChange: number;
}

interface MonthlyIncomeResponse {
  monthlyData: MonthlyData[];
  ytdIncome: number;
  ytdExpenses: number;
  ytdNetIncome: number;
  targetYear: number;
}

export function Overview() {
  const { data, isLoading, error } = useQuery<MonthlyIncomeResponse>({
    queryKey: ["monthlyIncome"],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/monthly-income?year=2025');
      if (!response.ok) {
        throw new Error('Failed to fetch monthly income data');
      }
      return response.json();
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  if (isLoading) {
    return <Skeleton className="h-[350px] w-full" />;
  }

  if (error) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-500">Error Loading Data</h3>
          <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!data || !data.monthlyData || data.monthlyData.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center text-muted-foreground">
        No income data available
      </div>
    );
  }

  // Get April's data (month index 3)
  const currentMonth = data.monthlyData[3]; // April is index 3 (0-based)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <div className={`flex items-center ${currentMonth.momIncomeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {currentMonth.momIncomeChange >= 0 ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
              <span className="text-xs ml-1">{formatPercentage(Math.abs(currentMonth.momIncomeChange))}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(currentMonth.income)}</div>
            <p className="text-xs text-muted-foreground">
              YTD: {formatCurrency(data.ytdIncome)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <div className={`flex items-center ${currentMonth.momExpensesChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {currentMonth.momExpensesChange <= 0 ? <ArrowDownIcon className="h-4 w-4" /> : <ArrowUpIcon className="h-4 w-4" />}
              <span className="text-xs ml-1">{formatPercentage(Math.abs(currentMonth.momExpensesChange))}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(currentMonth.expenses)}</div>
            <p className="text-xs text-muted-foreground">
              YTD: {formatCurrency(data.ytdExpenses)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly NOI</CardTitle>
            <div className={`flex items-center ${currentMonth.momNetIncomeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {currentMonth.momNetIncomeChange >= 0 ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
              <span className="text-xs ml-1">{formatPercentage(Math.abs(currentMonth.momNetIncomeChange))}</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(currentMonth.netIncome)}</div>
            <p className="text-xs text-muted-foreground">
              YTD: {formatCurrency(data.ytdNetIncome)}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data.monthlyData}>
            <XAxis
              dataKey="monthName"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value: number, name: string) => {
                const formattedValue = formatCurrency(Math.abs(value));
                if (name === 'income') return [formattedValue, 'Income'];
                if (name === 'expenses') return [formattedValue, 'Expenses'];
                return [formattedValue, 'NOI'];
              }}
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            />
            <Legend />
            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[4, 4, 0, 0]}
              stackId="stack"
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              stackId="stack"
            />
            <Line
              type="monotone"
              dataKey="netIncome"
              name="NOI"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 