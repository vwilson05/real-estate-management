"use client";

import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RepairList } from "./RepairList";
import { RepairForm } from "./RepairForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Property {
  id: string;
  address: string;
}

interface Repair {
  id: string;
  date: string;
  cost: number;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  property: {
    address: string;
  };
}

interface RepairFormData {
  date: string;
  cost: number;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  propertyId: string;
}

interface RepairsClientProps {
  initialProperties: Property[];
  initialRepairs: Repair[];
}

export function RepairsClient({
  initialProperties,
  initialRepairs,
}: RepairsClientProps) {
  const queryClient = useQueryClient();

  const { data: repairs = initialRepairs } = useQuery<Repair[]>({
    queryKey: ["repairs"],
    queryFn: async () => {
      const response = await fetch("/api/repairs");
      if (!response.ok) {
        throw new Error("Failed to fetch repairs");
      }
      return response.json();
    },
  });

  const { mutateAsync: createRepair } = useMutation({
    mutationFn: async (data: RepairFormData) => {
      const response = await fetch("/api/repairs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to create repair");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repairs"] });
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Repair</CardTitle>
        </CardHeader>
        <CardContent>
          <RepairForm
            properties={initialProperties}
            onSubmit={createRepair}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Repairs</CardTitle>
        </CardHeader>
        <CardContent>
          <RepairList repairs={repairs} />
        </CardContent>
      </Card>
    </div>
  );
} 