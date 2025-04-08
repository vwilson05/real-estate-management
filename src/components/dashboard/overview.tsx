"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface MonthlyIncome {
  month: string;
  income: number;
}

export function Overview() {
  const [monthlyData, setMonthlyData] = useState<MonthlyIncome[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyIncome = async () => {
      try {
        const response = await fetch('/api/dashboard/monthly-income');
        if (!response.ok) {
          throw new Error('Failed to fetch monthly income data');
        }
        const data = await response.json();
        setMonthlyData(data);
      } catch (error) {
        console.error('Error fetching monthly income data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyIncome();
  }, []);

  if (loading) {
    return <Skeleton className="h-[350px] w-full" />;
  }

  if (monthlyData.length === 0) {
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
          dataKey="income"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
} 