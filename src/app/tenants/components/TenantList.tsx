"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Tenant } from "@/hooks/useTenants";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface TenantListProps {
  tenants: Tenant[];
}

export function TenantList({ tenants }: TenantListProps) {
  const router = useRouter();
  const deleteTenant = useDeleteTenant();

  const handleDelete = async (id: string) => {
    try {
      await deleteTenant.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  if (tenants.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No tenants found. Add a tenant to get started.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Property</TableHead>
            <TableHead>Lease Period</TableHead>
            <TableHead>Rent Amount</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow key={tenant.id}>
              <TableCell className="font-medium">{tenant.name}</TableCell>
              <TableCell>
                {tenant.property.address}, {tenant.property.city},{" "}
                {tenant.property.state} {tenant.property.zipCode}
              </TableCell>
              <TableCell>
                {format(new Date(tenant.leaseStart), "MMM d, yyyy")} -{" "}
                {format(new Date(tenant.leaseEnd), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{formatCurrency(tenant.rentAmount)}</TableCell>
              <TableCell>
                {tenant.email && <div>{tenant.email}</div>}
                {tenant.phone && <div>{tenant.phone}</div>}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/tenants/${tenant.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/tenants/${tenant.id}/edit`)}
                  >
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Tenant</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this tenant? This action
                          cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(tenant.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 