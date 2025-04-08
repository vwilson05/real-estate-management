"use client";

import * as React from "react";
import { useForm, ControllerRenderProps, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const repairSchema = z.object({
  date: z.string(),
  cost: z.number().positive(),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  propertyId: z.string().uuid("Please select a property"),
  item: z.string().min(1, "Item is required"),
  estimatedCompletionDate: z.string(),
});

type RepairFormValues = z.infer<typeof repairSchema>;

interface RepairFormProps {
  properties: { id: string; address: string }[];
  onSubmit: (data: RepairFormValues) => Promise<void>;
  initialData?: Partial<RepairFormValues>;
}

interface ApiError {
  response?: {
    data?: {
      error?: string;
      details?: string;
    };
  };
}

export function RepairForm({ properties, onSubmit, initialData }: RepairFormProps) {
  const { toast } = useToast();
  const form = useForm<RepairFormValues>({
    resolver: zodResolver(repairSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      cost: 0,
      description: "",
      status: "PENDING",
      priority: "MEDIUM",
      propertyId: "",
      item: "",
      estimatedCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      ...initialData,
    },
  });

  const handleSubmit = async (data: RepairFormValues) => {
    try {
      await onSubmit(data);
      toast({
        title: "Success",
        description: "Repair saved successfully",
      });
      form.reset();
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage = apiError.response?.data?.error || "Failed to save repair";
      const errorDetails = apiError.response?.data?.details || "";
      
      toast({
        title: "Error",
        description: `${errorMessage}${errorDetails ? `: ${errorDetails}` : ""}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="propertyId"
          render={({ field }: { field: ControllerRenderProps<RepairFormValues, "propertyId"> }) => (
            <FormItem>
              <FormLabel>Property</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a property" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {properties.length === 0 ? (
                    <SelectItem value="" disabled>
                      No properties available
                    </SelectItem>
                  ) : (
                    properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.address}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }: { field: ControllerRenderProps<RepairFormValues, "date"> }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cost"
          render={({ field }: { field: ControllerRenderProps<RepairFormValues, "cost"> }) => (
            <FormItem>
              <FormLabel>Cost</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }: { field: ControllerRenderProps<RepairFormValues, "description"> }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }: { field: ControllerRenderProps<RepairFormValues, "status"> }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }: { field: ControllerRenderProps<RepairFormValues, "priority"> }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="item"
          render={({ field }: { field: ControllerRenderProps<RepairFormValues, "item"> }) => (
            <FormItem>
              <FormLabel>Item</FormLabel>
              <FormControl>
                <Input {...field} placeholder="What needs to be repaired" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estimatedCompletionDate"
          render={({ field }: { field: ControllerRenderProps<RepairFormValues, "estimatedCompletionDate"> }) => (
            <FormItem>
              <FormLabel>Estimated Completion Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={properties.length === 0}>
          Save Repair
        </Button>
      </form>
    </Form>
  );
} 