"use client";

import { Card, Title, Text } from "@tremor/react";
import PropertyList from "./PropertyList";
import { PropertyMapClient } from "@/components/properties/PropertyMapClient";
import { GeocodeButton } from "./GeocodeButton";

export default function PropertiesClient() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Properties</Title>
      <Text>Manage your real estate portfolio properties</Text>
      <div className="mt-6 space-y-6">
        <div className="flex justify-end">
          <GeocodeButton />
        </div>
        <PropertyMapClient />
        <Card>
          <PropertyList />
        </Card>
      </div>
    </main>
  );
} 