import { Issue } from "@/types/issue";
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
import { IssueStatus, IssuePriority } from "@prisma/client";

interface IssueListProps {
  issues: Issue[];
  isLoading?: boolean;
}

const statusColors: Record<IssueStatus, string> = {
  OPEN: "bg-yellow-500",
  IN_PROGRESS: "bg-blue-500",
  DONE: "bg-green-500",
  BLOCKED: "bg-red-500",
} as const;

const priorityColors: Record<IssuePriority, string> = {
  LOW: "bg-gray-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-red-500",
} as const;

export function IssueList({ issues, isLoading }: IssueListProps) {
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
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell className="font-medium">{issue.title}</TableCell>
            <TableCell>{issue.property?.address}</TableCell>
            <TableCell>
              {issue.dueDate
                ? format(new Date(issue.dueDate), "MMM d, yyyy")
                : "No due date"}
            </TableCell>
            <TableCell>
              <Badge className={statusColors[issue.status]}>
                {issue.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={priorityColors[issue.priority]}>
                {issue.priority}
              </Badge>
            </TableCell>
            <TableCell>{issue.type}</TableCell>
          </TableRow>
        ))}
        {issues.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No issues found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
} 