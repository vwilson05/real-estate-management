"use client"

import { useQuery } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Repair {
  id: string;
  item: string;
  location: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  cost: number;
  estimatedCompletionDate: string;
}

interface RepairsData {
  activeRepairs: Repair[];
  totalRepairCost: number;
}

export function ActiveRepairs() {
  const { data, isLoading, error } = useQuery<RepairsData>({
    queryKey: ["activeRepairs"],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/repairs');
      if (!response.ok) {
        throw new Error('Failed to fetch repairs data');
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
    return <Skeleton className="h-[400px] w-full" />;
  }

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-500">Error Loading Repairs</h3>
          <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!data || data.activeRepairs.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center text-muted-foreground">
        No active repairs
      </div>
    );
  }

  return (
    <>
      <div className="text-2xl font-bold">{data.activeRepairs.length}</div>
      <p className="text-xs text-muted-foreground mb-4">
        Total Cost: {formatCurrency(data.totalRepairCost)}
      </p>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {data.activeRepairs.map((repair) => (
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
    </>
  )
} 