import { Suspense } from "react";
import { TenantEditClient } from "./components/TenantEditClient";

interface TenantEditPageProps {
  params: {
    id: string;
  };
}

export default function TenantEditPage({ params }: TenantEditPageProps) {
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Tenant</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TenantEditClient tenantId={params.id} />
      </Suspense>
    </div>
  );
} 