import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Todo, TodoFilters, TodoSort } from "@/types/todo";
import { TodoFormData } from "@/lib/schemas/todoSchema";

const TODOS_QUERY_KEY = "todos";

interface FetchTodosOptions {
  filters?: TodoFilters;
  sort?: TodoSort;
}

async function fetchTodos({ filters, sort }: FetchTodosOptions = {}) {
  const params = new URLSearchParams();

  // Add filters to query params
  if (filters) {
    if (filters.propertyId) params.set("propertyId", filters.propertyId);
    if (filters.status) params.set("status", filters.status);
    if (filters.priority) params.set("priority", filters.priority);
    if (filters.type) params.set("type", filters.type);
    if (filters.dueDateGte) params.set("dueDateGte", filters.dueDateGte.toISOString());
    if (filters.dueDateLte) params.set("dueDateLte", filters.dueDateLte.toISOString());
  }

  // Add sort to query params
  if (sort) {
    params.set("sortBy", sort.field);
    params.set("sortOrder", sort.order);
  }

  const response = await fetch(`/api/todos?${params.toString()}`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch todos");
  }
  return response.json() as Promise<Todo[]>;
}

async function createTodo(data: TodoFormData) {
  const response = await fetch("/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create todo");
  }

  return response.json() as Promise<Todo>;
}

async function updateTodo(id: string, data: Partial<TodoFormData>) {
  const response = await fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update todo");
  }

  return response.json() as Promise<Todo>;
}

async function deleteTodo(id: string) {
  const response = await fetch(`/api/todos/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete todo");
  }

  return response.json() as Promise<{ success: boolean }>;
}

export function useTodos(options: FetchTodosOptions = {}) {
  return useQuery({
    queryKey: [TODOS_QUERY_KEY, options],
    queryFn: () => fetchTodos(options),
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TodoFormData> }) => 
      updateTodo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODOS_QUERY_KEY] });
    },
  });
} 