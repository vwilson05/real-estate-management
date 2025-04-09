import { Todo } from "@/types/todo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { TodoStatus, TodoPriority } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
  isLoading?: boolean;
}

const statusColors: Record<TodoStatus, string> = {
  OPEN: "bg-yellow-500",
  IN_PROGRESS: "bg-blue-500",
  BLOCKED: "bg-red-500",
  RESOLVED: "bg-green-500",
  CLOSED: "bg-gray-500",
} as const;

const priorityColors: Record<TodoPriority, string> = {
  LOW: "bg-gray-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-red-500",
  URGENT: "bg-red-700",
} as const;

export function TodoList({ todos, isLoading }: TodoListProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="font-medium">{todo.title}</TableCell>
            <TableCell>{todo.property?.address}</TableCell>
            <TableCell>
              {todo.dueDate
                ? format(new Date(todo.dueDate), "MMM d, yyyy")
                : "No due date"}
            </TableCell>
            <TableCell>
              <Badge className={statusColors[todo.status]}>
                {todo.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={priorityColors[todo.priority]}>
                {todo.priority}
              </Badge>
            </TableCell>
            <TableCell>{todo.type}</TableCell>
          </TableRow>
        ))}
        {todos.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No todos found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
} 