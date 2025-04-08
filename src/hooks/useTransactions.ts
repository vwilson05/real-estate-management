import { useQuery } from '@tanstack/react-query';
import { Transaction } from '../types/transaction';

export function useTransactions() {
  const { data: transactions = [], isLoading, error } = useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      const response = await fetch('/api/transactions');
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      return response.json();
    },
  });

  return { transactions, isLoading, error: error instanceof Error ? error.message : null };
} 