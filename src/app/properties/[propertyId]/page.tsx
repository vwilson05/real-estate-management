import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import PropertyDetailClient from "./components/PropertyDetailClient";

interface PropertyDetailPageProps {
  params: {
    propertyId: string;
  };
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { propertyId } = params;
  
  // Fetch the property data on the server
  const property = await db.property.findUnique({
    where: { id: propertyId },
  });
  
  // If property not found, return 404
  if (!property) {
    notFound();
  }
  
  return <PropertyDetailClient property={property} />;
} 