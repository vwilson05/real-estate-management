# fix.md

## Goal
Resolve the issue where the dashboard page hangs or fails to load data correctly, likely caused by recent changes related to the Issues Tracker feature and a mismatch in the dashboard metrics hook.

## Diagnosis
1.  The `ActiveIssues` component (`src/components/dashboard/active-issues.tsx`) expects an array `Issue[]` from its `useQuery`, but the API endpoint `/api/dashboard/issues` returns an object `{ topIssues: Issue[], totalOpenIssues: number }`. This mismatch is likely causing the data fetching hook to fail or hang.
2.  The `useDashboardMetrics` hook (`src/app/hooks/useDashboardMetrics.ts`) defines `occupancyRate` and `averageRent` in its `DashboardMetrics` interface, but the `/api/dashboard/metrics` endpoint does not return these values, leading to potential runtime errors or incorrect display on the dashboard page.

## Specific Instructions

1.  **Update `src/components/dashboard/active-issues.tsx`:**
    *   Modify the `useQuery` hook to correctly handle the object structure returned by the API.
    *   Update the component's rendering logic to use the `topIssues` array and `totalOpenIssues` count from the fetched data.

    ```diff
    --- a/src/components/dashboard/active-issues.tsx
    +++ b/src/components/dashboard/active-issues.tsx
    @@ -17,13 +17,18 @@
     }
   }
 
    interface IssuesData {
      topIssues: Issue[];
      totalOpenIssues: number;
    }

 export function ActiveIssues() {
    const { data: issues, isLoading, error } = useQuery<Issue[]>({
   const { data, isLoading, error } = useQuery<IssuesData>({
     queryKey: ["dashboard", "issues"],
     queryFn: async () => {
       const response = await fetch("/api/dashboard/issues")
       if (!response.ok) {
-        throw new Error("Failed to fetch issues")
+        const errorData = await response.json().catch(() => ({}))
+        throw new Error(errorData.error || "Failed to fetch issues")
       }
-      return response.json()
+      return response.json(); // Returns { topIssues: [], totalOpenIssues: 0 }
     },
   })
 
    @@ -53,10 +58,10 @@
     )
   }
 
    if (!issues?.length) {
   // Use data.topIssues and data.totalOpenIssues
   const topIssues = data?.topIssues ?? [];
   const totalOpenIssues = data?.totalOpenIssues ?? 0;

   if (topIssues.length === 0) {
     return (
       <div className="text-center text-sm text-muted-foreground">
         No active issues
    @@ -84,6 +89,9 @@
 
   return (
     <div className="space-y-4">
       +      <div className="text-2xl font-bold">{totalOpenIssues}</div>
       +      <p className="text-xs text-muted-foreground mb-4">
       +        Open Issues
       +      </p>
       <div className="flex items-center justify-between">
         <h3 className="text-sm font-medium">Active Issues</h3>
         <Link href="/issues">
    @@ -93,7 +101,7 @@
         </Link>
       </div>
       <div className="space-y-4">
         {issues.map((issue) => (
         {topIssues.map((issue) => (
           <div key={issue.id} className="flex items-center justify-between">
             <div className="space-y-1">
               <p className="text-sm font-medium leading-none">{issue.title}</p>

    ```

2.  **Update `src/app/hooks/useDashboardMetrics.ts`:**
    *   Remove `occupancyRate` and `averageRent` from the `DashboardMetrics` interface as the API doesn't provide them.
    *   Adjust the default return value in the hook accordingly.

    ```diff
    --- a/src/app/hooks/useDashboardMetrics.ts
    +++ b/src/app/hooks/useDashboardMetrics.ts
    @@ -5,8 +5,8 @@
       totalProperties: number;
       totalValue: number;
       monthlyIncome: number;
       activeRepairs: number;
       occupancyRate: number;
       averageRent: number;
     }
 
     async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
    @@ -33,8 +33,6 @@
         totalValue: 0,
         monthlyIncome: 0,
         activeRepairs: 0,
         occupancyRate: 0,
         averageRent: 0,
       },
       isLoading,
       error: error instanceof Error ? error.message : null,

    ```

3.  **Update `src/app/dashboard/page.tsx`:**
    *   Remove the "Occupancy Rate" card (`<Card>`) entirely, as the data for it is no longer fetched or defined in the hook.

    ```diff
    --- a/src/app/dashboard/page.tsx
    +++ b/src/app/dashboard/page.tsx
    @@ -83,20 +83,6 @@
             )}
           </CardContent>
         </Card>
         <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
             <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
           </CardHeader>
           <CardContent>
             {isLoading ? (
               <Skeleton className="h-8 w-24" />
             ) : (
               <>
                 <div className="text-2xl font-bold">{formatPercentage(metrics?.occupancyRate || 0)}</div>
                 <p className="text-xs text-muted-foreground">
                   Current occupancy
                 </p>
               </>
             )}
           </CardContent>
         </Card>
       </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
         <Card className="col-span-7">

    ```

## Verification
1.  Run `npm run dev`.
2.  Navigate to the `/dashboard` page.
3.  Verify that the dashboard loads completely without hanging.
4.  Verify that the "Total Properties", "Portfolio Value", and "Monthly Income" cards display correct data (or 0 if no data exists) without errors.
5.  Verify that the "Financial Overview", "Recent Transactions", "Active Repairs", and "Active Issues" sections load data correctly (or display their empty/error states appropriately).
6.  Verify that the "Occupancy Rate" card is no longer present.
7.  Check the browser's developer console for any errors.