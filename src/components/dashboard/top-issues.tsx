"use client"

import { useQuery } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"

interface Issue {
  id: string;
  title: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'DONE' | 'BLOCKED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
  property: {
    address: string;
  };
}

interface IssuesData {
  topIssues: Issue[];
  totalOpenIssues: number;
}

export function TopIssues() {
  const { data, isLoading, error } = useQuery<IssuesData>({
    queryKey: ["topIssues"],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/issues');
      if (!response.ok) {
        throw new Error('Failed to fetch issues data');
      }
      return response.json();
    },
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'bg-red-500';
      case 'IN_PROGRESS':
        return 'bg-blue-500';
      case 'DONE':
        return 'bg-green-500';
      case 'BLOCKED':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'text-red-500';
      case 'MEDIUM':
        return 'text-yellow-500';
      case 'LOW':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-500">Error Loading Issues</h3>
          <p className="text-sm text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  if (!data || data.topIssues.length === 0) {
    return (
      <div className="flex h-[400px] items-center justify-center text-muted-foreground">
        No open issues
      </div>
    );
  }

  return (
    <>
      <div className="text-2xl font-bold">{data.totalOpenIssues}</div>
      <p className="text-xs text-muted-foreground mb-4">
        Open Issues
      </p>
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {data.topIssues.map((issue) => (
          <div key={issue.id} className="flex items-center justify-between border-b pb-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">{issue.title}</p>
              <p className="text-xs text-muted-foreground">{issue.property.address}</p>
              <p className="text-xs text-muted-foreground">Due: {formatDate(issue.dueDate)}</p>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <Badge className={getStatusColor(issue.status)}>
                {issue.status.replace('_', ' ')}
              </Badge>
              <p className={`text-sm font-medium ${getPriorityColor(issue.priority)}`}>
                {issue.priority}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
} 