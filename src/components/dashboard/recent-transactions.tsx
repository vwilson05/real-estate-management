"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: string;
  category: string;
  description: string;
  property: {
    address: string;
  };
}

export function RecentTransactions() {
  const { data: transactions, isLoading, error } = useQuery<Transaction[]>({
    queryKey: ["recentTransactions"],
    queryFn: async () => {
      const response = await fetch('/api/transactions?limit=5');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="ml-4 space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="ml-auto h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 text-red-500">
        Error loading transactions. Please try again later.
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No recent transactions found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Recent Transactions</h3>
        <Link href="/transactions">
          <Button variant="ghost" size="sm" className="h-8 px-2 lg:px-3">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="space-y-8">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                {transaction.type === 'INCOME' ? 'IN' : 'EX'}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {transaction.category}
              </p>
              <p className="text-sm text-muted-foreground">
                {transaction.property.address} • {formatDate(transaction.date)}
              </p>
              {transaction.description && (
                <p className="text-xs text-muted-foreground">
                  {transaction.description}
                </p>
              )}
            </div>
            <div className={`ml-auto font-medium ${transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.type === 'INCOME' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 