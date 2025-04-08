"use client"

import { useQuery } from "@tanstack/react-query"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface Issue {
  id: string
  title: string
  status: string
  priority: string
  dueDate: string
  property: {
    address: string
  }
}

export function ActiveIssues() {
  const { data: issues, isLoading, error } = useQuery<Issue[]>({
    queryKey: ["dashboard", "issues"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/issues")
      if (!response.ok) {
        throw new Error("Failed to fetch issues")
      }
      return response.json()
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-[80px]" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Failed to load issues
      </div>
    )
  }

  if (!issues?.length) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No active issues
      </div>
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
      case "in_progress":
        return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
      case "blocked":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Active Issues</h3>
        <Link href="/issues">
          <Button variant="ghost" size="sm" className="h-8 px-2 lg:px-3">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {issues.map((issue) => (
          <div key={issue.id} className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{issue.title}</p>
              <p className="text-sm text-muted-foreground">
                {issue.property.address}
              </p>
              <div className="flex gap-2">
                <Badge variant="secondary" className={getPriorityColor(issue.priority)}>
                  {issue.priority}
                </Badge>
                <Badge variant="secondary" className={getStatusColor(issue.status)}>
                  {issue.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Due: {new Date(issue.dueDate).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 