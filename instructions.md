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


## Task 1: Update Documentation

**Goal:** Ensure all documentation files in the `docs/` directory are accurate, consistent, and reflect the current state of the project after the cleanup in Task 1.

**Specific Instructions:**

*   **For each file in `docs/`:**
    *   Read through the content carefully.
    *   Compare the information against the current codebase (files, structure, dependencies, features, UI components, APIs, database schema).
    *   Update any outdated information, inaccuracies, or inconsistencies.
*   **Key Files and Areas to Focus On:**
    *   **`architecture.md`:**
        *   Verify the Tech Stack list against `package.json`.
        *   Clarify UI component usage: Emphasize shadcn/ui as primary, Recharts for charts. Remove/downplay Tremor unless specific components remain in use beyond `PropertyList` (which should be refactored).
        *   Update the Directory Structure if any changes were made during cleanup.
        *   Review Architectural Decisions (ADs). Update AD-004 (Tremor). Ensure AD-002 reflects Prisma/SQLite, removing any implication of in-memory storage. Add new ADs for standardization choices made in Task 1.
    *   **`decisions.md`:**
        *   Remove or explicitly mark as outdated the decision regarding "In-Memory Storage for MVP".
        *   Update decisions related to UI components (Tremor vs shadcn/ui).
        *   Add entries for decisions made during cleanup (e.g., Prisma client consolidation, UI standardization).
    *   **`documentation.md`:**
        *   Update Tech Stack.
        *   Update Project Structure diagram if needed.
        *   Update API Endpoints section: Add details for `/api/repairs` and `/api/dashboard/repairs`, `/api/dashboard/monthly-income`. Ensure descriptions and parameters match the code.
        *   Update Database Schema overview to match `prisma/schema.prisma`.
        *   Update Component Documentation: Reflect the refactoring of `PropertyForm`. Add documentation for `RepairForm` and `RepairList`.
        *   Ensure API Response Handling section reflects best practices and any fixes made.
        *   Remove references to temporary file-based storage if applicable.
    *   **`features.md`:** (This will be more heavily updated in Task 3, but perform a quick consistency check here).
    *   **`issues.md`:**
        *   Remove the numerous duplicate "Transaction List UX Fixes" entries at the end of the file.
        *   Review the "Current Issues" section. Mark issues resolved by Task 1 (e.g., structure cleanup, API errors, potentially UI/UX issues if refactoring addressed them). Update the status of ongoing issues like Form Validation, API Implementation, Performance Optimization.
        *   Review "Resolved Bugs" to ensure accuracy.
    *   **`milestones.md`:** Update the status description for Phase 1 based on the current state after Task 1.
    *   **`ui_ux.md`:**
        *   Update component descriptions to prioritize shadcn/ui. Remove/clarify Tremor mentions.
        *   Update Form components section to reflect the use of shadcn `Form`, `Input`, `Label`, `Select`, etc., especially after refactoring `PropertyForm`.
        *   Ensure the description of theming (CSS variables, Tailwind) matches `globals.css` and `tailwind.config.ts`.
    *   **`agent.md`, `coding-guidelines.md`, `project-overview.md`:** Review for consistency but expect minor changes.

## Task 3: Enhance `features.md`

**Goal:** Update `docs/features.md` to accurately reflect completed work and add more detail to planned features.

**Specific Instructions:**

1.  **Review `docs/features.md`:** Read the current content.
2.  **Update Status and Implementation Details:**
    *   **Property Management:**
        *   Status: Keep "In Progress".
        *   Implementation: Update list to accurately reflect `Property` model fields, `/api/properties` GET/POST, `useProperties` hook, `PropertyList` (mention refactor to shadcn Table), `PropertyForm` (mention refactor to shadcn Form), `PropertiesClient`, `new` page.
        *   Next Steps: Keep Edit, Delete, Detail View, Filtering/Sorting.
    *   **Financial Tracking:**
        *   Status: Keep "In Progress".
        *   Implementation: Update list to reflect `Transaction` model, `/api/transactions` GET/POST (mention filtering), `useTransactions` hook, `TransactionList` (shadcn Table), `TransactionForm` (shadcn Form, Zod/RHF, React Query mutation), property relation display.
        *   Next Steps: Keep Edit/Delete, Advanced Filtering/Sorting, Pagination, Reports, Import/Export.
    *   **Repair Management:**
        *   Status: Change to "In Progress".
        *   Implementation: Add details - `Repair` model defined, API route `/api/repairs` (GET/POST), `RepairList` component (shadcn Table), `RepairForm` component (shadcn Form, Zod/RHF, property dropdown), `RepairsClient` component for state management with React Query.
        *   Next Steps: Keep Edit, Delete, Status Updates, History View, Schedules.
    *   **Tenant Management:**
        *   Status: Keep "Planned".
        *   Implementation: Keep schema reference.
        *   Next Steps: Keep existing items. Add detail if possible (e.g., specify fields like contact info, rent due date, payment status).
    *   **Dashboard & Analytics:**
        *   Status: Keep "In Progress".
        *   Implementation: Update list - Dashboard page layout (`dashboard/page.tsx`), `Card` components, API endpoint `/api/dashboard/metrics` (Prisma aggregation), `useDashboardMetrics` hook, Display of metrics (`totalProperties`, `totalValue`, `monthlyIncome`, `occupancyRate` - check if occupancy is actually displayed), Skeleton loading, Formatting utilities, Financial Overview chart (`overview.tsx`, Recharts, `/api/dashboard/monthly-income` - mention data structure/discrepancy fix), Recent Transactions list (`recent-transactions.tsx`, React Query), Active Repairs list (`active-repairs.tsx`, React Query, `/api/dashboard/repairs`), Theme awareness, Error handling.
        *   Next Steps: Keep More Charts, Filtering, Export, Property Comparison, More Metrics.
    *   **Technical Features (Data Validation, API Integration, Performance Optimization):** Update status based on work done in Task 1 and current state (e.g., Zod validation is well-implemented, API integration covers basic CRUD for several features, performance uses React Query caching but more could be done).
3.  **Flesh Out Future Features:**
    *   Review the "Future Features" and "Features to be fleshed out" sections.
    *   Integrate the "fleshed out" items into the main "Future Features" list.
    *   **Property Map Integration:** Add description: "Visual map display of property locations using a library like Leaflet or React Map GL. Allow filtering properties on the map."
    *   **Issue Tracking:** Add description: "Per-property issue tracker to manage maintenance requests or tenant issues. Fields: Issue Title, Description, Status (Open, In Progress, Resolved), Priority, Assigned To, Last Step Taken, Next Step, Contact Info, Due Date, Follow-up Reminders/Emails."
    *   **Calendar Integration:** Add description: "Calendar view displaying important dates like lease expirations, rent due dates, maintenance schedules, follow-up reminders. Include email alert functionality for upcoming events."
    *   Review other future features (Document Management, Tax Reporting, Market Analysis, Mobile App) and add a bit more detail if possible based on the project context.
4.  **Review and Finalize:** Ensure the entire `features.md` file is consistent, up-to-date, and clearly distinguishes between implemented, in-progress, and planned features.