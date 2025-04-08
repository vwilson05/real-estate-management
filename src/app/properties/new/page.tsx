"use client";

import { useProperties } from "@/app/hooks/useProperties";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PropertyForm from "../components/PropertyForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type PropertyFormData = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: string;
  marketValue: number;
  purchasePrice: number;
  purchaseDate: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
};

export default function NewPropertyPage() {
  const router = useRouter();
  const { createProperty, isCreating } = useProperties();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (data: PropertyFormData) => {
    try {
      await createProperty(data);
      router.push("/properties");
    } catch (error) {
      console.error("Failed to create property:", error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-foreground mb-3">Add New Property</h1>
        <p className="text-muted-foreground max-w-[42rem]">
          Enter the details of your new property. Fields marked with <span className="text-destructive font-medium">*</span> are required.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Property Information</CardTitle>
          <CardDescription>
            Fill out the form below to add a new property to your portfolio. You can add more details later.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyForm
            onSubmit={handleSubmit}
            isLoading={isCreating}
          />
        </CardContent>
      </Card>
    </main>
  );
} 