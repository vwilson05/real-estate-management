export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  purchasePrice: number;
  purchaseDate: Date;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  yearBuilt: number;
  createdAt: Date;
  updatedAt: Date;
} 