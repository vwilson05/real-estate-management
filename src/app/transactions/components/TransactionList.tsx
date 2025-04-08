'use client';

import { useTransactions } from '../../../hooks/useTransactions';
import { Transaction } from '../../../types/transaction';

export default function TransactionList() {
  const { data: transactions, isLoading, error } = useTransactions();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions?.map((transaction: Transaction) => (
          <div
            key={transaction.id}
            className="border-b pb-4 last:border-b-0"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{transaction.description}</h3>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <div className={`font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 