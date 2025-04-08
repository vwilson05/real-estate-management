"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"

interface MonthlyIncome {
  month: string;
  income: number;
  expenses: number;
  netIncome: number;
}

export function Overview() {
  const { data: monthlyData, isLoading, error } = useQuery<MonthlyIncome[]>({
    queryKey: ["monthlyIncome"],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/monthly-income');
      if (!response.ok) {
        throw new Error('Failed to fetch monthly income data');
      }
      return response.json();
    },
  });

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

  if (!monthlyData || monthlyData.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center text-muted-foreground">
        No income data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={monthlyData}>
        <XAxis
          dataKey="month"
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
          formatter={(value: number) => [`$${value}`, 'Income']}
          cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
        />
        <Bar
          dataKey="netIncome"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 