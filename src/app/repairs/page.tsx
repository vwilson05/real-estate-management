import { Suspense } from "react";
import { db } from "@/lib/db";
import { RepairsClient } from "./components/RepairsClient";

interface Property {
  id: string;
  address: string;
}

interface Repair {
  id: string;
  date: string;
  cost: number;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";
  item: string;
  estimatedCompletionDate: string;
  property: {
    address: string;
  };
}

async function getProperties(): Promise<Property[]> {
  return await db.property.findMany({
    select: {
      id: true,
      address: true,
    },
  });
}

async function getRepairs(): Promise<Repair[]> {
  const repairs = await db.repair.findMany({
    include: {
      property: {
        select: {
          address: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  // Convert Date objects to ISO strings for client-side rendering
  return repairs.map(repair => ({
    ...repair,
    date: repair.date.toISOString(),
    estimatedCompletionDate: repair.estimatedCompletionDate.toISOString(),
    status: repair.status as Repair["status"],
    priority: repair.priority as Repair["priority"],
  }));
}

export default async function RepairsPage() {
  const [properties, repairs] = await Promise.all([
    getProperties(),
    getRepairs(),
  ]);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Repairs</h1>
      
      <Suspense fallback={<div>Loading...</div>}>
        <RepairsClient
          initialProperties={properties}
          initialRepairs={repairs}
        />
      </Suspense>
    </div>
  );
} 