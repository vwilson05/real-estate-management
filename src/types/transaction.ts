export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  propertyId: string;
  property?: {
    id: string;
    address: string;
  };
} 