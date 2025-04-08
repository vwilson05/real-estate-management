"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownIcon, ArrowUpIcon, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Repair {
  id: string;
  item: string;
  location: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  cost: number;
  estimatedCompletionDate: string;
}

interface MonthlyIncome {
  month: string;
  income: number;
  expenses: number;
  netIncome: number;
  ytdIncome: number;
  ytdExpenses: number;
  ytdNetIncome: number;
  momIncomeChange: number;
  momExpensesChange: number;
  momNetIncomeChange: number;
  activeRepairs: Repair[];
  totalRepairCost: number;
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
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

  if (!monthlyData || monthlyData.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center text-muted-foreground">
        No income data available
      </div>
    );
  }

  // Get the most recent month's data for metrics
  const currentMonth = monthlyData[monthlyData.length - 1];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
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
              YTD: {formatCurrency(currentMonth.ytdIncome)}
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
              YTD: {formatCurrency(currentMonth.ytdExpenses)}
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
              YTD: {formatCurrency(currentMonth.ytdNetIncome)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Repairs</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMonth.activeRepairs.length}</div>
            <p className="text-xs text-muted-foreground">
              Total Cost: {formatCurrency(currentMonth.totalRepairCost)}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
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
              formatter={(value: number, name: string) => {
                const formattedValue = formatCurrency(value);
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
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="netIncome"
              name="NOI"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {currentMonth.activeRepairs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Repairs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentMonth.activeRepairs.map((repair) => (
                <div key={repair.id} className="flex items-center justify-between border-b pb-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{repair.item}</p>
                    <p className="text-xs text-muted-foreground">{repair.location}</p>
                    <p className="text-xs text-muted-foreground">Est. completion: {formatDate(repair.estimatedCompletionDate)}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={getStatusColor(repair.status)}>
                      {repair.status.replace('_', ' ')}
                    </Badge>
                    <p className="text-sm font-medium">{formatCurrency(repair.cost)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 