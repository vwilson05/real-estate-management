"use client";

import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button, Card } from "@tremor/react";
import Link from "next/link";
import { useProperties, Property } from "../../hooks/useProperties";

export default function PropertyList() {
  const { properties, isLoading, error } = useProperties();

  if (isLoading) {
    return (
      <Card className="mt-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading properties...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center text-destructive">
            <p>Error loading properties: {error}</p>
            <Button
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (!properties.length) {
    return (
      <Card className="mt-6">
        <div className="flex flex-col items-center justify-center p-8">
          <p className="text-muted-foreground">No properties found</p>
          <Link href="/properties/new" className="mt-4">
            <Button>Add Your First Property</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Property List</h2>
        <Link href="/properties/new">
          <Button>Add Property</Button>
        </Link>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Address</TableHeaderCell>
            <TableHeaderCell>City</TableHeaderCell>
            <TableHeaderCell>State</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Market Value</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
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
                    <Button size="xs">View</Button>
                  </Link>
                  <Link href={`/properties/${property.id}/edit`}>
                    <Button size="xs" variant="secondary">Edit</Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
} 