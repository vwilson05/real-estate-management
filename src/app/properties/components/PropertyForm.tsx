"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

const propertySchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  type: z.string().min(1, "Property type is required"),
  marketValue: z.number().min(0, "Market value must be positive"),
  purchasePrice: z.number().min(0, "Purchase price must be positive"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
  description: z.string().nullable(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  initialData?: Partial<PropertyFormData>;
  onSubmit: (data: PropertyFormData) => void;
  isLoading?: boolean;
}

export default function PropertyForm({ initialData, onSubmit, isLoading }: PropertyFormProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      type: "",
      marketValue: 0,
      purchasePrice: 0,
      purchaseDate: new Date().toISOString().split('T')[0],
      description: null,
      ...initialData,
    },
  });

  if (!mounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="property-form">
      <style jsx>{`
        .property-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .form-section {
          background-color: transparent;
          border: 1px solid hsl(var(--border));
          border-radius: 0.5rem;
          padding: 1.5rem;
        }
        
        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: hsl(var(--foreground));
          margin-bottom: 1rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: hsl(var(--foreground));
        }
        
        .required {
          color: hsl(0, 84%, 60%);
          margin-left: 0.25rem;
        }
        
        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid hsl(var(--border));
          border-radius: 0.375rem;
          background-color: hsl(var(--background));
          color: hsl(var(--foreground));
          font-size: 0.875rem;
        }
        
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 1px hsl(var(--primary));
        }
        
        .form-select {
          appearance: none;
          padding-right: 2.5rem;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='hsl(var(--foreground))' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
        }
        
        .form-textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        .helper-text {
          font-size: 0.75rem;
          color: hsl(var(--muted-foreground));
        }
        
        .error-message {
          font-size: 0.75rem;
          color: hsl(0, 84%, 60%);
          margin-top: 0.25rem;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 1.5rem;
          border-top: 1px solid hsl(var(--border));
          margin-top: 0.5rem;
        }
        
        .submit-button {
          min-width: 120px;
          padding: 0.75rem 1.5rem;
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          border: none;
          border-radius: 0.375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .submit-button:hover {
          background-color: hsl(var(--primary) / 0.9);
        }
        
        .submit-button:focus {
          outline: none;
          box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--primary));
        }
        
        .submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>

      {/* Location Information Section */}
      <div className="form-section">
        <h3 className="section-title">Location Information</h3>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="address" className="form-label">
              Street Address<span className="required">*</span>
            </label>
            <input
              id="address"
              type="text"
              placeholder="123 Main Street"
              className="form-input"
              {...register("address")}
            />
            {errors.address && (
              <div className="error-message">{errors.address.message}</div>
            )}
            <p className="helper-text">Enter the complete street address</p>
          </div>
          <div className="form-field">
            <label htmlFor="city" className="form-label">
              City<span className="required">*</span>
            </label>
            <input
              id="city"
              type="text"
              placeholder="San Francisco"
              className="form-input"
              {...register("city")}
            />
            {errors.city && (
              <div className="error-message">{errors.city.message}</div>
            )}
            <p className="helper-text">Enter the city name</p>
          </div>
          <div className="form-field">
            <label htmlFor="state" className="form-label">
              State<span className="required">*</span>
            </label>
            <input
              id="state"
              type="text"
              placeholder="CA"
              className="form-input"
              {...register("state")}
            />
            {errors.state && (
              <div className="error-message">{errors.state.message}</div>
            )}
            <p className="helper-text">Enter the two-letter state code</p>
          </div>
          <div className="form-field">
            <label htmlFor="zipCode" className="form-label">
              ZIP Code<span className="required">*</span>
            </label>
            <input
              id="zipCode"
              type="text"
              placeholder="94105"
              className="form-input"
              {...register("zipCode")}
            />
            {errors.zipCode && (
              <div className="error-message">{errors.zipCode.message}</div>
            )}
            <p className="helper-text">Enter the ZIP code</p>
          </div>
        </div>
      </div>

      {/* Property Details Section */}
      <div className="form-section">
        <h3 className="section-title">Property Details</h3>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="type" className="form-label">
              Property Type<span className="required">*</span>
            </label>
            <select
              id="type"
              className="form-select"
              {...register("type")}
            >
              <option value="">Select property type</option>
              <option value="Single Family">Single Family</option>
              <option value="Multi Family">Multi Family</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
            {errors.type && (
              <div className="error-message">{errors.type.message}</div>
            )}
            <p className="helper-text">Select the type of property</p>
          </div>
          <div className="form-field">
            <label htmlFor="marketValue" className="form-label">
              Market Value ($)<span className="required">*</span>
            </label>
            <input
              id="marketValue"
              type="number"
              placeholder="500000"
              className="form-input"
              {...register("marketValue", { valueAsNumber: true })}
            />
            {errors.marketValue && (
              <div className="error-message">{errors.marketValue.message}</div>
            )}
            <p className="helper-text">Enter the current market value in dollars</p>
          </div>
          <div className="form-field">
            <label htmlFor="purchasePrice" className="form-label">
              Purchase Price ($)<span className="required">*</span>
            </label>
            <input
              id="purchasePrice"
              type="number"
              placeholder="450000"
              className="form-input"
              {...register("purchasePrice", { valueAsNumber: true })}
            />
            {errors.purchasePrice && (
              <div className="error-message">{errors.purchasePrice.message}</div>
            )}
            <p className="helper-text">Enter the purchase price in dollars</p>
          </div>
          <div className="form-field">
            <label htmlFor="purchaseDate" className="form-label">
              Purchase Date<span className="required">*</span>
            </label>
            <input
              id="purchaseDate"
              type="date"
              className="form-input"
              {...register("purchaseDate")}
            />
            {errors.purchaseDate && (
              <div className="error-message">{errors.purchaseDate.message}</div>
            )}
            <p className="helper-text">Select the purchase date</p>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="form-section">
        <h3 className="section-title">Additional Information</h3>
        <div className="form-grid">
          <div className="form-field" style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter any additional details about the property"
              className="form-textarea"
              {...register("description")}
            />
            {errors.description && (
              <div className="error-message">{errors.description.message}</div>
            )}
            <p className="helper-text">Enter any additional details about the property</p>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : (initialData ? "Update Property" : "Create Property")}
        </button>
      </div>
    </form>
  );
} 