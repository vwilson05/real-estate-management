"use client";

import Link from "next/link";
import { useProperties, Property } from "../../hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyList() {
  const { properties, isLoading, error } = useProperties();

  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Property List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-10 w-28" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center text-destructive">
            <p>Error loading properties: {error}</p>
            <Button
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!properties.length) {
    return (
      <Card className="mt-6">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <p className="text-muted-foreground">No properties found</p>
          <Link href="/properties/new" className="mt-4">
            <Button>Add Your First Property</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Property List</CardTitle>
        <Link href="/properties/new">
          <Button>Add Property</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Market Value</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property: Property) => (
              <TableRow key={property.id}>
                <TableCell>{property.address}</TableCell>
                <TableCell>{property.city}</TableCell>
                <TableCell>{property.state}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>${property.marketValue.toLocaleString()}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/properties/${property.id}`}>
                      <Button size="sm">View</Button>
                    </Link>
                    <Link href={`/properties/${property.id}/edit`}>
                      <Button size="sm" variant="secondary">Edit</Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 