"use client";

import { useRouter } from "next/navigation";
import { Property } from "@/types/property";
import PropertyForm from "@/app/properties/components/PropertyForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProperty } from "@/app/hooks/useProperty";
import { toast } from "sonner";

interface PropertyEditClientProps {
  property: Property;
}

export default function PropertyEditClient({ property }: PropertyEditClientProps) {
  const router = useRouter();
  const { updateProperty, isUpdating } = useProperty(property.id);

  const handleSubmit = async (data: any) => {
    try {
      await updateProperty(data);
      toast.success("Property updated successfully");
      router.push(`/properties/${property.id}`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to update property");
      console.error("Error updating property:", error);
    }
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle>Edit Property</CardTitle>
        </CardHeader>
        <CardContent>
          <PropertyForm
            initialData={property}
            onSubmit={handleSubmit}
            isLoading={isUpdating}
          />
        </CardContent>
      </Card>
    </main>
  );
} 