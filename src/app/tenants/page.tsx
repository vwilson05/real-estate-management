import { Suspense } from "react";
import { TenantList } from "./components/TenantList";
import { TenantForm } from "./components/TenantForm";
import { TenantsClient } from "./components/TenantsClient";

export default function TenantsPage() {
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tenants</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TenantsClient />
      </Suspense>
    </div>
  );
} 