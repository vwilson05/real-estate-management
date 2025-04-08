"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Property } from "@/types/property";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useProperty } from "@/app/hooks/useProperty";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PropertyDetailClientProps {
  property: Property;
}

export default function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const router = useRouter();
  const { deleteProperty, isDeleting } = useProperty(property.id);

  const handleDelete = async () => {
    try {
      await deleteProperty();
      toast.success("Property deleted successfully");
      router.push("/properties");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete property");
      console.error("Error deleting property:", error);
    }
  };

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{property.address}</h1>
          <p className="text-muted-foreground">
            {property.city}, {property.state} {property.zipCode}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/properties">
            <Button variant="outline">Back to List</Button>
          </Link>
          <Link href={`/properties/${property.id}/edit`}>
            <Button>Edit Property</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-muted-foreground">Type</dt>
                <dd className="col-span-2">{property.type}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-muted-foreground">Market Value</dt>
                <dd className="col-span-2">{formatCurrency(property.marketValue)}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-muted-foreground">Purchase Price</dt>
                <dd className="col-span-2">{formatCurrency(property.purchasePrice)}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-muted-foreground">Purchase Date</dt>
                <dd className="col-span-2">{formatDate(property.purchaseDate)}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-muted-foreground">Description</dt>
                <dd className="col-span-2">{property.description || "No description provided"}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-muted-foreground">Address</dt>
                <dd className="col-span-2">{property.address}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-muted-foreground">City</dt>
                <dd className="col-span-2">{property.city}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-muted-foreground">State</dt>
                <dd className="col-span-2">{property.state}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-muted-foreground">ZIP Code</dt>
                <dd className="col-span-2">{property.zipCode}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <dt className="font-medium text-muted-foreground">Coordinates</dt>
                <dd className="col-span-2">
                  {property.latitude && property.longitude
                    ? `${property.latitude}, ${property.longitude}`
                    : "Not available"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete Property"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the property
                      and all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 