"use client";

import { useState } from "react";
import { useTenants } from "@/hooks/useTenants";
import { TenantList } from "./TenantList";
import { TenantForm } from "./TenantForm";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function TenantsClient() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: tenants, isLoading, error } = useTenants();

  if (isLoading) {
    return <div>Loading tenants...</div>;
  }

  if (error) {
    return (
      <div className="text-destructive">
        Error loading tenants: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Tenant</DialogTitle>
            </DialogHeader>
            <TenantForm
              onSuccess={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <TenantList tenants={tenants || []} />
    </div>
  );
} 