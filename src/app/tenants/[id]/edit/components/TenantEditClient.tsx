"use client";

import { useRouter } from "next/navigation";
import { useTenant } from "@/hooks/useTenants";
import { TenantForm } from "@/app/tenants/components/TenantForm";
import { Card, CardContent } from "@/components/ui/card";

interface TenantEditClientProps {
  tenantId: string;
}

export function TenantEditClient({ tenantId }: TenantEditClientProps) {
  const router = useRouter();
  const { data: tenant, isLoading, error } = useTenant(tenantId);

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

  const initialData = {
    name: tenant.name,
    email: tenant.email || "",
    phone: tenant.phone || "",
    leaseStart: tenant.leaseStart.toString().split("T")[0],
    leaseEnd: tenant.leaseEnd.toString().split("T")[0],
    rentAmount: tenant.rentAmount,
    propertyId: tenant.propertyId,
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <TenantForm
          initialData={initialData}
          tenantId={tenantId}
          onSuccess={() => router.push(`/tenants/${tenantId}`)}
        />
      </CardContent>
    </Card>
  );
} 