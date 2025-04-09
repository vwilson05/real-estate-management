import { Suspense } from "react";
import { TodoClient } from "./components/TodoClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TodosPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">To Do</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Todo</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading form...</div>}>
              <TodoClient view="form" />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Todos</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading todos...</div>}>
              <TodoClient view="list" />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 