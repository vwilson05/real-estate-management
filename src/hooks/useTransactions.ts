import { useState, useEffect } from 'react';
import { Transaction } from '../types/transaction';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // TODO: Replace with actual API call
        const mockTransactions: Transaction[] = [
          {
            id: '1',
            description: 'Salary',
            amount: 5000,
            date: '2024-03-15',
            type: 'income',
            category: 'Salary'
          },
          {
            id: '2',
            description: 'Rent',
            amount: -1500,
            date: '2024-03-10',
            type: 'expense',
            category: 'Housing'
          }
        ];
        
        setTransactions(mockTransactions);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return { transactions, isLoading, error };
} 