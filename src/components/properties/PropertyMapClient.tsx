"use client";

import * as React from "react";
import { PropertyMap } from "./PropertyMap";
import { usePropertyMap } from "@/hooks/usePropertyMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PropertyMapClient() {
  const { data: properties, isLoading, error } = usePropertyMap();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Property Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full animate-pulse bg-muted rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Property Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full flex items-center justify-center text-destructive">
            Failed to load property map
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Map</CardTitle>
      </CardHeader>
      <CardContent>
        <PropertyMap properties={properties || []} />
      </CardContent>
    </Card>
  );
} 