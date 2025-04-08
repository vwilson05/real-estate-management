'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  Title,
  Text,
  TextInput,
  Select,
  SelectItem,
  Button,
} from '@tremor/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: string;
  marketValue: number;
  purchasePrice: number;
  purchaseDate: string;
  description?: string;
}

const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['INCOME', 'EXPENSE']),
  category: z.string().min(1),
  date: z.string().datetime(),
  propertyId: z.string().min(1),
  description: z.string().min(1),
});

type TransactionFormData = z.infer<typeof transactionSchema>;

export default function TransactionForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date().toISOString(),
    },
  });

  const { data: properties } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await fetch('/api/properties');
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TransactionFormData) => {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create transaction');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      reset();
    },
  });

  const onSubmit = (data: TransactionFormData) => {
    mutate(data);
  };

  return (
    <Card className="mt-6">
      <Title>Add Transaction</Title>
      <Text>Record a new income or expense</Text>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div>
          <TextInput
            {...register('amount', { valueAsNumber: true })}
            placeholder="Amount"
            type="number"
            step="0.01"
          />
          {errors.amount && (
            <Text className="text-red-500">{errors.amount.message}</Text>
          )}
        </div>

        <div>
          <Select {...register('type')}>
            <SelectItem value="INCOME">Income</SelectItem>
            <SelectItem value="EXPENSE">Expense</SelectItem>
          </Select>
          {errors.type && (
            <Text className="text-red-500">{errors.type.message}</Text>
          )}
        </div>

        <div>
          <TextInput
            {...register('category')}
            placeholder="Category"
          />
          {errors.category && (
            <Text className="text-red-500">{errors.category.message}</Text>
          )}
        </div>

        <div>
          <TextInput
            {...register('date')}
            type="text"
            placeholder="YYYY-MM-DDTHH:mm"
          />
          {errors.date && (
            <Text className="text-red-500">{errors.date.message}</Text>
          )}
        </div>

        <div>
          <Select {...register('propertyId')}>
            {properties?.map((property) => (
              <SelectItem key={property.id} value={property.id}>
                {property.address}
              </SelectItem>
            ))}
          </Select>
          {errors.propertyId && (
            <Text className="text-red-500">{errors.propertyId.message}</Text>
          )}
        </div>

        <div>
          <TextInput
            {...register('description')}
            placeholder="Description"
          />
          {errors.description && (
            <Text className="text-red-500">{errors.description.message}</Text>
          )}
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Transaction'}
        </Button>
      </form>
    </Card>
  );
} 