# Agent Instructions

## Master Context (`current_instructions`)

**Project Goal:** Develop and maintain a personal Real Estate Portfolio Management web application using Next.js 14 (App Router). The application tracks properties, income, expenses, repairs, tenants, and associated financials across multiple properties.

**Tech Stack:**
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Database:** SQLite via Prisma ORM
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui (primary), Recharts (for charts)
*   **State Management:** TanStack Query (React Query) for server state
*   **Forms:** React Hook Form + Zod for validation
*   **Notifications:** Sonner
*   **Theming:** next-themes (dark mode default)

**Current State & Key Features:**
*   **Structure:** Standard Next.js App Router structure. API routes in `src/app/api/`, feature pages/components under `src/app/[feature]/`. Shared UI components in `src/components/ui/`. Custom hooks in `src/hooks/`. Types in `src/types/`. Utilities in `src/lib/`.
*   **Database:** Prisma schema defined (`schema.prisma`) for Property, Transaction, Repair, Tenant models. Uses SQLite (`dev.db`). Prisma client initialized likely via `src/lib/db.ts`.
*   **Dashboard (`/dashboard`):** Displays key metrics (Total Properties, Portfolio Value, Monthly Income, Occupancy Rate) fetched via `/api/dashboard/metrics`. Includes a financial overview chart (Recharts) using `/api/dashboard/monthly-income`, a list of recent transactions using `/api/transactions`, and a list of active repairs using `/api/dashboard/repairs`.
*   **Properties (`/properties`):**
    *   Lists properties using `useProperties` hook. (UI component in `PropertyList.tsx` currently uses Tremor Table - **needs refactor**).
    *   Form for adding new properties (`/properties/new`) using `PropertyForm.tsx`. (Uses custom CSS-in-JS - **needs refactor**). API (`/api/properties`) handles GET/POST with Prisma and Zod.
    *   Edit/Delete/Detail view not yet implemented.
*   **Transactions (`/transactions`):**
    *   Lists transactions using `useTransactions` hook and shadcn `Table`.
    *   Form (`TransactionForm.tsx`) for adding new transactions using shadcn UI, React Hook Form, Zod, React Query mutation.
    *   API (`/api/transactions`) handles GET/POST with Prisma and Zod.
    *   Edit/Delete not yet implemented.
*   **Repairs (`/repairs`):**
    *   Lists repairs using shadcn `Table`.
    *   Form (`RepairForm.tsx`) for adding repairs using shadcn UI, React Hook Form, Zod, React Query mutation. Fetches properties for dropdown.
    *   API (`/api/repairs`) handles GET/POST with Prisma and Zod.
    *   Edit/Delete not yet implemented.
*   **Tenant Management:** Planned, schema exists. No UI/API implemented.
*   **UI/UX:** Primarily uses shadcn/ui components built on Tailwind and Radix UI. Dark mode default via `next-themes`. `sonner` used for toast notifications.
*   **State:** TanStack Query manages server state and caching. Custom hooks (`useProperties`, `useTransactions`, `useDashboardMetrics`, etc.) abstract data fetching.
*   **Validation:** Zod used for form and API validation.

**Known Inconsistencies/Issues to Address:**
*   UI component library usage: `PropertyList.tsx` uses Tremor Table, while others use shadcn Table. Needs standardization to shadcn.
*   Styling: `PropertyForm.tsx` uses custom CSS-in-JS (`<style jsx>`), should use Tailwind/shadcn components.
*   Prisma Client Initialization: Two files (`src/lib/prisma.ts` and `src/lib/db.ts`) exist; need consolidation (prefer `db.ts`).
*   API/Schema Mismatches: Potential casing issues with Repair status enum (API vs Zod/Prisma), `estimatedCompletionDate` field naming in Repair API.
*   Dashboard Data Discrepancy: Data structure in `Overview` component seems richer than what `/api/dashboard/monthly-income` provides.
*   Duplicate Components: Two `ThemeToggle` components exist.
*   Outdated Documentation: Several docs (`decisions.md`, `features.md`, etc.) may contain outdated info (e.g., mentions of in-memory storage, Tremor component usage). `issues.md` needs cleanup of duplicates.

**Coding Conventions:**
*   Follow Next.js/React best practices.
*   Use TypeScript strictly.
*   Modular components and hooks.
*   Consistent naming (PascalCase for components/types, camelCase for variables/functions).
*   Utilize `cn()` for merging Tailwind classes.
*   Leverage shadcn/ui components for consistency.

## Task 1: Implement Property Detail View and Edit Functionality

**Goal:** Allow users to view the full details of a specific property and edit its information.

**Rationale:** This is a core requirement for managing portfolio data. Currently, users can only list and add properties. Viewing details and editing existing entries are fundamental next steps.

**Specific Instructions:**

1.  **Create Property Detail Page:**
    *   Create a new dynamic route/page: `src/app/properties/[propertyId]/page.tsx`.
    *   This page should fetch data for a single property using its `propertyId` from the URL parameters.
    *   Implement a server component to fetch initial data or use a client component with React Query (`useQuery` with a unique key like `['property', propertyId]`).
    *   Display all fields of the `Property` model (defined in `prisma/schema.prisma` and `src/types/property.ts`) in a well-structured and readable format. Consider using shadcn `Card` components or a definition list (`dl`, `dt`, `dd`).
    *   Include loading and error states.
    *   Add an "Edit" button that links to the edit page (`/properties/[propertyId]/edit`).
    *   Add a "Delete" button (functionality to be implemented later, but place the button).
    *   Add a "Back to List" link/button (`<Link href="/properties">`).

2.  **Create Property Edit Page:**
    *   Create a new dynamic route/page: `src/app/properties/[propertyId]/edit/page.tsx`.
    *   This page should fetch the data for the specific property being edited, similar to the detail page.
    *   **Reuse `PropertyForm`:** Import and utilize the `src/app/properties/components/PropertyForm.tsx` component.
    *   Pass the fetched property data as `initialData` to the `PropertyForm`.
    *   The `onSubmit` handler for the form should trigger a mutation to update the property.
    *   Include loading and error states for the page fetch.
    *   Ensure the submit button in the reused form shows "Update Property" (or similar) and indicates loading state (`isLoading`).

3.  **Implement API Endpoints:**
    *   **GET Single Property:**
        *   Create/update an API route `src/app/api/properties/[propertyId]/route.ts`.
        *   Implement the `GET` handler to fetch a single property by ID using `db.property.findUnique({ where: { id: propertyId } })`.
        *   Handle cases where the property is not found (return 404).
        *   Return the property data as JSON.
    *   **Update Property (PUT/PATCH):**
        *   In `src/app/api/properties/[propertyId]/route.ts`, implement a `PUT` or `PATCH` handler.
        *   Accept the updated property data in the request body.
        *   Validate the incoming data using the `propertySchema` (or a partial version if using PATCH).
        *   Use `db.property.update({ where: { id: propertyId }, data: validatedData })` to update the property in the database.
        *   Handle potential errors (e.g., validation errors, property not found).
        *   Return the updated property data.
    *   **DELETE Property (Optional - Placeholder):**
        *   In `src/app/api/properties/[propertyId]/route.ts`, implement a `DELETE` handler.
        *   Use `db.property.delete({ where: { id: propertyId } })`.
        *   Handle cases where the property is not found.
        *   Return a success response (e.g., status 204 No Content or a confirmation message). *Actual delete button functionality on the frontend can be implemented in a subsequent task.*

4.  **Implement React Query Mutations:**
    *   Create a new hook (e.g., `useProperty`) or extend `useProperties` to include:
        *   A query function to fetch a single property by ID (`useQuery(['property', propertyId], fetchPropertyById)`).
        *   A mutation function for updating a property (`useMutation(updateProperty)`).
        *   A mutation function for deleting a property (`useMutation(deleteProperty)`).
    *   The `updateProperty` mutation function should call the `PUT`/`PATCH /api/properties/[propertyId]` endpoint.
    *   On successful update:
        *   Invalidate the specific property query (`queryClient.invalidateQueries({ queryKey: ['property', propertyId] })`).
        *   Invalidate the properties list query (`queryClient.invalidateQueries({ queryKey: ['properties'] })`).
        *   Optionally update the cache directly using `queryClient.setQueryData`.
        *   Show a success toast notification.
        *   Redirect the user back to the property detail page (`/properties/[propertyId]`) or the properties list (`/properties`).
    *   Handle errors appropriately, showing toast notifications.

5.  **Update UI Links:**
    *   Ensure the "View" button in `PropertyList.tsx` links correctly to `/properties/[propertyId]`.
    *   Ensure the "Edit" button in `PropertyList.tsx` links correctly to `/properties/[propertyId]/edit`.

6.  **Testing (Conceptual):**
    *   Verify the detail page displays all property data correctly.
    *   Test form validation on the edit page.
    *   Confirm successful property updates are reflected in the database and UI (detail page and list).
    *   Test error handling for fetching and updating.
    *   Check that navigation between list, detail, and edit pages works as expected.

7.  **Documentation Updates:**
    *   **`features.md`:** Update the "Property Management" section to reflect the implementation of Detail View and Edit functionality. Mark these as "In Progress" or "Complete" based on task execution.
    *   **`documentation.md`:** Add details for the new API endpoints (`GET /api/properties/[propertyId]`, `PUT/PATCH /api/properties/[propertyId]`, `DELETE /api/properties/[propertyId]`). Document the Detail and Edit pages/components.
    *   **`milestones.md`:** Update progress within Phase 2 Core Features.