import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';

export default function TransactionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Financial Tracking</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TransactionList />
        </div>
        <div>
          <TransactionForm />
        </div>
      </div>
    </div>
  );
} 