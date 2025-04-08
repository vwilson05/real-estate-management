export interface Property {
  id: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: string;
  marketValue: number;
  purchasePrice: number;
  purchaseDate: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
} 