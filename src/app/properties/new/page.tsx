"use client";

import { Card, Title, Text } from "@tremor/react";
import PropertyForm from "../components/PropertyForm";
import { useProperties, Property } from "../../hooks/useProperties";
import { useRouter } from "next/navigation";

export default function NewPropertyPage() {
  const router = useRouter();
  const { createProperty, isCreating } = useProperties();

  const handleSubmit = async (data: Omit<Property, "id">) => {
    try {
      await createProperty(data);
      router.push("/properties");
    } catch (error) {
      console.error("Failed to create property:", error);
    }
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Add New Property</Title>
      <Text>Enter the details of your new property</Text>
      <Card className="mt-6">
        <PropertyForm
          onSubmit={handleSubmit}
          isLoading={isCreating}
        />
      </Card>
    </main>
  );
} 