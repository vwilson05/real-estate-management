import { Card, Title, Text } from "@tremor/react";

export default function DashboardPage() {
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
          <Text className="text-2xl font-semibold">0</Text>
        </Card>
        <Card>
          <Title>Total Value</Title>
          <Text className="text-2xl font-semibold">$0</Text>
        </Card>
        <Card>
          <Title>Monthly Income</Title>
          <Text className="text-2xl font-semibold">$0</Text>
        </Card>
        <Card>
          <Title>Active Repairs</Title>
          <Text className="text-2xl font-semibold">0</Text>
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