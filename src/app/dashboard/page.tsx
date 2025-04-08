"use client";

import { Card, Title, Text } from "@tremor/react";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";

export default function DashboardPage() {
  const { metrics, isLoading, error } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-500">
            Overview of your real estate portfolio
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-red-500">Error loading dashboard: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Overview of your real estate portfolio
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Title>Total Properties</Title>
          <Text className="text-2xl font-semibold">{metrics.totalProperties}</Text>
        </Card>
        <Card>
          <Title>Total Value</Title>
          <Text className="text-2xl font-semibold">${metrics.totalValue.toLocaleString()}</Text>
        </Card>
        <Card>
          <Title>Monthly Income</Title>
          <Text className="text-2xl font-semibold">${metrics.monthlyIncome.toLocaleString()}</Text>
        </Card>
        <Card>
          <Title>Active Repairs</Title>
          <Text className="text-2xl font-semibold">{metrics.activeRepairs}</Text>
        </Card>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <Title>Recent Transactions</Title>
          <div className="mt-4">
            <p className="text-sm text-gray-500">No transactions yet</p>
          </div>
        </Card>
        <Card>
          <Title>Upcoming Repairs</Title>
          <div className="mt-4">
            <p className="text-sm text-gray-500">No repairs scheduled</p>
          </div>
        </Card>
      </div>
    </div>
  );
} 