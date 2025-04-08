"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextInput, Select, SelectItem, Button } from "@tremor/react";

const propertySchema = z.object({
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  type: z.string().min(1, "Property type is required"),
  marketValue: z.number().min(0, "Market value must be positive"),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  initialData?: PropertyFormData;
  onSubmit: (data: PropertyFormData) => void;
  isLoading?: boolean;
}

export default function PropertyForm({ initialData, onSubmit, isLoading }: PropertyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <TextInput
          placeholder="Address"
          {...register("address")}
          error={!!errors.address}
          errorMessage={errors.address?.message}
        />
      </div>
      <div>
        <TextInput
          placeholder="State"
          {...register("state")}
          error={!!errors.state}
          errorMessage={errors.state?.message}
        />
      </div>
      <div>
        <Select
          placeholder="Property Type"
          {...register("type")}
          error={!!errors.type}
          errorMessage={errors.type?.message}
        >
          <SelectItem value="Single Family">Single Family</SelectItem>
          <SelectItem value="Multi Family">Multi Family</SelectItem>
          <SelectItem value="Commercial">Commercial</SelectItem>
          <SelectItem value="Land">Land</SelectItem>
        </Select>
      </div>
      <div>
        <TextInput
          type="number"
          placeholder="Market Value"
          {...register("marketValue", { valueAsNumber: true })}
          error={!!errors.marketValue}
          errorMessage={errors.marketValue?.message}
        />
      </div>
      <Button type="submit" loading={isLoading}>
        {initialData ? "Update Property" : "Create Property"}
      </Button>
    </form>
  );
} 