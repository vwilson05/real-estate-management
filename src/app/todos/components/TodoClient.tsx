"use client";

import { TodoList } from "@/components/todos/TodoList";
import { TodoForm } from "@/components/todos/TodoForm";
import { useTodos } from "@/hooks/useTodos";

interface TodoClientProps {
  view: "list" | "form";
}

export function TodoClient({ view }: TodoClientProps) {
  const { data: todos, isLoading } = useTodos();

  if (view === "form") {
    return <TodoForm />;
  }

  return <TodoList todos={todos || []} isLoading={isLoading} />;
} 