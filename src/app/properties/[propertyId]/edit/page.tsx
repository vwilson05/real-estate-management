import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import PropertyEditClient from "./components/PropertyEditClient";

interface PropertyEditPageProps {
  params: {
    propertyId: string;
  };
}

export default async function PropertyEditPage({ params }: PropertyEditPageProps) {
  const { propertyId } = params;
  
  // Fetch the property data on the server
  const property = await db.property.findUnique({
    where: { id: propertyId },
  });
  
  // If property not found, return 404
  if (!property) {
    notFound();
  }
  
  return <PropertyEditClient property={property} />;
} 