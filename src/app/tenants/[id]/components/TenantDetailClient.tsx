"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useTenant } from "@/hooks/useTenants";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useDeleteTenant } from "@/hooks/useTenants";

interface TenantDetailClientProps {
  tenantId: string;
}

export function TenantDetailClient({ tenantId }: TenantDetailClientProps) {
  const router = useRouter();
  const { data: tenant, isLoading, error } = useTenant(tenantId);
  const deleteTenant = useDeleteTenant();

  const handleDelete = async () => {
    try {
      await deleteTenant.mutateAsync(tenantId);
      router.push("/tenants");
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  if (isLoading) {
    return <div>Loading tenant details...</div>;
  }

  if (error) {
    return (
      <div className="text-destructive">
        Error loading tenant: {error.message}
      </div>
    );
  }

  if (!tenant) {
    return <div>Tenant not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{tenant.name}</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/tenants/${tenant.id}/edit`)}
          >
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Tenant</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this tenant? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Address:</span>{" "}
              {tenant.property.address}
            </div>
            <div>
              <span className="font-medium">City:</span> {tenant.property.city}
            </div>
            <div>
              <span className="font-medium">State:</span> {tenant.property.state}
            </div>
            <div>
              <span className="font-medium">ZIP Code:</span>{" "}
              {tenant.property.zipCode}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lease Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="font-medium">Lease Start:</span>{" "}
              {format(new Date(tenant.leaseStart), "PPP")}
            </div>
            <div>
              <span className="font-medium">Lease End:</span>{" "}
              {format(new Date(tenant.leaseEnd), "PPP")}
            </div>
            <div>
              <span className="font-medium">Monthly Rent:</span>{" "}
              {formatCurrency(tenant.rentAmount)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tenant.email && (
              <div>
                <span className="font-medium">Email:</span> {tenant.email}
              </div>
            )}
            {tenant.phone && (
              <div>
                <span className="font-medium">Phone:</span> {tenant.phone}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 