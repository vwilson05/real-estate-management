"use client";

import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from "@tremor/react";
import Link from "next/link";
import { useProperties, Property } from "../../hooks/useProperties";

export default function PropertyList() {
  const { properties, isLoading, error } = useProperties();

  if (isLoading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return <div>Error loading properties: {error.message}</div>;
  }

  return (
    <div>
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
            <TableHeaderCell>State</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Market Value</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties?.map((property: Property) => (
            <TableRow key={property.id}>
              <TableCell>{property.address}</TableCell>
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
    </div>
  );
} 