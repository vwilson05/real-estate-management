"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";

interface Repair {
  id: string;
  date: string;
  cost: number;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  item: string;
  estimatedCompletionDate: string;
  property: {
    address: string;
  };
}

interface RepairListProps {
  repairs: Repair[];
}

const statusColors = {
  PENDING: "bg-yellow-500",
  IN_PROGRESS: "bg-blue-500",
  COMPLETED: "bg-green-500",
};

const priorityColors = {
  LOW: "bg-gray-500",
  MEDIUM: "bg-orange-500",
  HIGH: "bg-red-500",
};

export function RepairList({ repairs }: RepairListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Est. Completion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {repairs.map((repair) => (
            <TableRow key={repair.id}>
              <TableCell>
                {format(new Date(repair.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{repair.property.address}</TableCell>
              <TableCell>{repair.item}</TableCell>
              <TableCell>{repair.description}</TableCell>
              <TableCell>{formatCurrency(repair.cost)}</TableCell>
              <TableCell>
                <Badge className={statusColors[repair.status]}>
                  {repair.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={priorityColors[repair.priority]}>
                  {repair.priority}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(repair.estimatedCompletionDate), "MMM d, yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 