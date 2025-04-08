"use client";

import { useProperties } from "@/app/hooks/useProperties";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PropertyForm from "../components/PropertyForm";

type PropertyFormData = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: string;
  marketValue: number;
  purchasePrice: number;
  purchaseDate: string;
  description: string | null;
};

export default function NewPropertyPage() {
  const router = useRouter();
  const { createProperty, isCreating } = useProperties();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (data: PropertyFormData) => {
    try {
      await createProperty(data);
      router.push("/properties");
    } catch (error) {
      console.error("Failed to create property:", error);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <main className="page-container">
      <style jsx>{`
        .page-container {
          padding: 1.5rem;
          max-width: 64rem;
          margin: 0 auto;
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .page-container {
            padding: 2rem;
          }
        }
        
        .page-header {
          margin-bottom: 2.5rem;
        }
        
        .page-title {
          font-size: 1.875rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }
        
        .page-description {
          font-size: 1rem;
          color: hsl(var(--muted-foreground));
          max-width: 42rem;
        }
        
        .required-note {
          color: hsl(0, 84%, 60%);
          font-weight: 500;
        }
        
        .form-container {
          background-color: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          padding: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .form-container {
            padding: 2rem;
          }
        }
        
        .form-header {
          margin-bottom: 2rem;
        }
        
        .form-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          margin-bottom: 0.5rem;
        }
        
        .form-description {
          font-size: 0.875rem;
          color: hsl(var(--muted-foreground));
          max-width: 36rem;
        }
      `}</style>
      
      <div className="page-header">
        <h1 className="page-title">Add New Property</h1>
        <p className="page-description">
          Enter the details of your new property. Fields marked with <span className="required-note">*</span> are required.
        </p>
      </div>
      
      <div className="form-container">
        <div className="form-header">
          <h2 className="form-title">Property Information</h2>
          <p className="form-description">
            Fill out the form below to add a new property to your portfolio. You can add more details later.
          </p>
        </div>
        
        <PropertyForm
          onSubmit={handleSubmit}
          isLoading={isCreating}
        />
      </div>
    </main>
  );
} 