"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AlertCircle, CheckCircle2, Clock, HourglassIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/todo";
import { todoStatusEnum, todoPriorityEnum } from "@/lib/schemas/todoSchema";
import { z } from "zod";

type TodoStatus = z.infer<typeof todoStatusEnum>;
type TodoPriority = z.infer<typeof todoPriorityEnum>;

export function ActiveTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/dashboard/todos");
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const getPriorityColor = (priority: TodoPriority) => {
    switch (priority) {
      case "HIGH":
        return "bg-destructive text-destructive-foreground";
      case "MEDIUM":
        return "bg-warning text-warning-foreground";
      case "LOW":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getStatusIcon = (status: TodoStatus) => {
    switch (status) {
      case "CLOSED":
      case "RESOLVED":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "IN_PROGRESS":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "BLOCKED":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "OPEN":
      default:
        return <HourglassIcon className="h-4 w-4 text-yellow-500" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Todos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Todos</CardTitle>
      </CardHeader>
      <CardContent>
        {todos.length === 0 ? (
          <p className="text-muted-foreground text-sm">No active todos</p>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex flex-col gap-2 border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2">
                    {getStatusIcon(todo.status)}
                    <div>
                      <h4 className="font-medium leading-none">{todo.title}</h4>
                      {todo.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {todo.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge className={cn(getPriorityColor(todo.priority))}>
                    {todo.priority.toLowerCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{todo.property.address}</span>
                  {todo.dueDate && (
                    <span>Due: {format(new Date(todo.dueDate), "PP")}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 