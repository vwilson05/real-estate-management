"use client";

import { Card, Title, Text } from "@tremor/react";
import PropertyList from "./PropertyList";

export default function PropertiesClient() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Properties</Title>
      <Text>Manage your real estate portfolio properties</Text>
      <Card className="mt-6">
        <PropertyList />
      </Card>
    </main>
  );
} 