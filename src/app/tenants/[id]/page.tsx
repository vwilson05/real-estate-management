import { Suspense } from "react";
import { TenantDetailClient } from "./components/TenantDetailClient";

interface TenantDetailPageProps {
  params: {
    id: string;
  };
}

export default function TenantDetailPage({ params }: TenantDetailPageProps) {
  return (
    <div className="container py-6">
      <Suspense fallback={<div>Loading...</div>}>
        <TenantDetailClient tenantId={params.id} />
      </Suspense>
    </div>
  );
} 