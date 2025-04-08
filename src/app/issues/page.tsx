import { Suspense } from "react";
import { IssuesClient } from "./components/IssuesClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function IssuesPage() {
  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Issues</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Issue</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading form...</div>}>
              <IssuesClient view="form" />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading issues...</div>}>
              <IssuesClient view="list" />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 