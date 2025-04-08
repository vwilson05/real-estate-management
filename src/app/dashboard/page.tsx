"use client";

import { Card, Title, Text, AreaChart, DonutChart, Grid, Metric } from "@tremor/react";
import { useDashboardMetrics } from "../hooks/useDashboardMetrics";
import { HomeIcon, BanknotesIcon, WrenchIcon, ChartBarIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const { metrics, isLoading, error } = useDashboardMetrics();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your real estate portfolio
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/4"></div>
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
          <p className="text-sm text-destructive">Error loading dashboard: {error}</p>
        </div>
      </div>
    );
  }

  const chartdata = [
    {
      date: "Jan 22",
      "Portfolio Value": 2890000,
      "Monthly Income": 12000,
    },
    {
      date: "Feb 22",
      "Portfolio Value": 2910000,
      "Monthly Income": 12500,
    },
    {
      date: "Mar 22",
      "Portfolio Value": 2950000,
      "Monthly Income": 13000,
    },
    {
      date: "Apr 22",
      "Portfolio Value": 2980000,
      "Monthly Income": 13500,
    },
    {
      date: "May 22",
      "Portfolio Value": 3000000,
      "Monthly Income": 14000,
    },
  ];

  const propertyTypeData = [
    {
      name: "Single Family",
      value: 45,
    },
    {
      name: "Multi Family",
      value: 30,
    },
    {
      name: "Commercial",
      value: 25,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your real estate portfolio
        </p>
      </div>

      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <HomeIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Text>Total Properties</Text>
              <Metric className="text-2xl font-semibold">{metrics.totalProperties}</Metric>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BanknotesIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Text>Total Value</Text>
              <Metric className="text-2xl font-semibold">${metrics.totalValue.toLocaleString()}</Metric>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Text>Monthly Income</Text>
              <Metric className="text-2xl font-semibold">${metrics.monthlyIncome.toLocaleString()}</Metric>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <WrenchIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <Text>Active Repairs</Text>
              <Metric className="text-2xl font-semibold">{metrics.activeRepairs}</Metric>
            </div>
          </div>
        </Card>
      </Grid>

      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card className="p-6">
          <Title>Portfolio Performance</Title>
          <AreaChart
            className="h-72 mt-4"
            data={chartdata}
            index="date"
            categories={["Portfolio Value", "Monthly Income"]}
            colors={["blue", "green"]}
            valueFormatter={(number) => `$${number.toLocaleString()}`}
            showLegend
            showGridLines
          />
        </Card>
        <Card className="p-6">
          <Title>Property Types</Title>
          <DonutChart
            className="h-72 mt-4"
            data={propertyTypeData}
            category="value"
            index="name"
            valueFormatter={(number) => `${number}%`}
            colors={["blue", "cyan", "indigo"]}
            showLabel
            showAnimation
          />
        </Card>
      </Grid>

      <Grid numItems={1} numItemsLg={2} className="gap-6">
        <Card className="p-6">
          <Title>Recent Transactions</Title>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">No transactions yet</p>
          </div>
        </Card>
        <Card className="p-6">
          <Title>Upcoming Repairs</Title>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">No repairs scheduled</p>
          </div>
        </Card>
      </Grid>
    </div>
  );
} 