# Project Cleanup, Documentation Update, and Feature Detailing Instructions

## Phase 1: Project Structure and Code Cleanup

1.  **Review Project Structure:**
    *   Analyze the current file structure within `src/app/` and `src/components/`.
    *   Identify potential inconsistencies or areas for improvement. Specifically, investigate the presence of `src/app/transactions/components/TransactionForm.tsx` and `src/app/components/transactions/TransactionForm.tsx`. Determine if one is redundant or if they serve different purposes. If one is redundant or misplaced, consolidate/move the correct version to `src/app/transactions/components/TransactionForm.tsx` and update all relevant imports. Delete the incorrect/redundant file.
    *   Ensure components are located logically (shared UI components in `src/components/ui/`, feature-specific components within their respective feature folders in `src/app/`).
    *   Verify the placement of hooks in `src/hooks/`. Ensure they are appropriately named and scoped.

2.  **Standardize Configuration Files:**
    *   Review `tailwind.config.ts` and `tailwind.config.js`. Consolidate into `tailwind.config.ts` if appropriate, ensuring all necessary configurations (like `tailwindcss-animate`) are included. Delete the redundant file.
    *   Review `postcss.config.mjs` and `postcss.config.js`. Consolidate into one, preferring `.mjs` or `.js` based on project consistency (likely `.mjs` given `next.config.mjs` and `eslint.config.mjs`). Ensure the correct plugins (`tailwindcss`, `autoprefixer`) are listed. Delete the redundant file.
    *   Review `eslint.config.mjs`. Ensure it aligns with current ESLint best practices for Next.js/TypeScript projects.
    *   Review `tsconfig.json` for optimal settings for a Next.js 14 App Router project. Ensure paths alias (`@/*`) is correct.
    *   Review `.gitignore`. Ensure it includes necessary entries like `node_modules/`, `.next/`, `.env*`, and potentially `prisma/dev.db` (add `/prisma/dev.db` or `prisma/*.db` if not intended to be tracked). Consider adding `/data/` as seen in the example `.gitignore` if that's the intended pattern.

3.  **Code Quality and Consistency:**
    *   Scan all `.tsx` and `.ts` files for unused imports, variables, or functions and remove them.
    *   Ensure consistent use of UI components (e.g., prefer components from `src/components/ui/` like `Button`, `Card`, `Input`, `Select`, `Label` where applicable over potentially duplicated or native elements, unless a specific library like Tremor is intentionally used). For example, review `src/app/components/transactions/TransactionForm.tsx` and see if it should be using the shared UI components from `src/components/ui/` like the other `TransactionForm`.
    *   Check for consistent styling approaches (preferring Tailwind utility classes defined in `tailwind.config.ts`).
    *   Ensure proper TypeScript usage, avoiding `any` where possible and using defined types (`Property`, `Transaction`, etc.).
    *   Verify implementation of client components (`"use client";`) is correctly applied, especially in files using hooks (`useState`, `useEffect`) or event handlers.

## Phase 2: Documentation Enhancement

Review and update **all** files within the `docs/` directory based on the **current state of the codebase provided in the prompt**. Pay close attention to:

1.  **`docs/features.md`:** (Detailed update instructions in Phase 3 below).
2.  **`docs/architecture.md`:**
    *   Verify the "Tech Stack" section matches the versions and libraries in `package.json` (e.g., Prisma version, Tremor, React Query, Zod, `next-themes`). Update versions if necessary.
    *   Update the "Directory Structure" to reflect the actual structure, noting the placement of API routes, components, hooks, and lib.
    *   Review "Architectural Decisions" (AD entries). Ensure they accurately reflect the implemented patterns (e.g., AD-003 for React Query, AD-005 for Zod, AD-006 for CSS variables/Tailwind, AD-007 for `next-themes`).
    *   Update the "Data Flow" section if needed, especially regarding API layer implementation (Prisma/SQLite is used, not just file-based storage mentioned in some docs).
3.  **`docs/documentation.md`:**
    *   Update the "Project Structure" section.
    *   Update the "Tech Stack" section to match `package.json`.
    *   Review the "Features" checklist. Mark implemented features based on the codebase (e.g., Dashboard, Transactions basic form/list, Properties basic list/form).
    *   Update the "API Endpoints" table based on the implemented routes in `src/app/api/`. Ensure methods, descriptions, and example schemas are accurate (e.g., `/api/dashboard/metrics`, `/api/transactions`, `/api/properties`).
    *   Update "Component Documentation" for `TransactionForm` to reflect the implementation in `src/app/transactions/components/TransactionForm.tsx` (uses shared UI components, Zod, RHF).
    *   Update the "API Response Handling" section based on the actual error handling in `src/app/transactions/components/TransactionForm.tsx` and API routes.
4.  **`docs/issues.md`:**
    *   Review all listed issues, especially "Active Bugs" and resolved bugs related to CSS, React Query Client, and Transaction Form errors.
    *   Verify if the resolutions described match the actual code provided. For example, the "Transaction Creation Error" resolution *is* implemented in `src/app/transactions/components/TransactionForm.tsx`. Mark it as "Resolved" and potentially move it to the "Resolved Bugs" section, updating the description to match the fix.
    *   Update statuses (Resolved, In Progress) based on the current code. Remove duplicate "Transaction List UX Fixes" sections.
5.  **`docs/ui_ux.md`:**
    *   Review the "UI Components" section. Ensure it accurately reflects the components used (Tailwind CSS, shared `src/components/ui/` components like Card, Label, Select, Button, Avatar, DropdownMenu, Skeleton). Mention Tremor usage if applicable based on potential future plans or if components like `Overview` use it implicitly via libraries like `recharts`.
    *   Update the "User Feedback & Interaction" section to mention `sonner` for toast notifications, as seen in `src/app/providers.tsx` and `TransactionForm.tsx`.
    *   Update the "Implementation Considerations" regarding CSS variables, Tailwind usage, and component architecture to match the codebase. Update component paths if necessary.
    *   Review the specific documentation for `Label` and `Select` at the end – ensure it matches the code in `src/components/ui/`.
6.  **`docs/coding-guidelines.md`, `docs/decisions.md`, `docs/milestones.md`, `docs/project-overview.md`, `docs/agent.md`:** Review these for consistency with the overall project state, tech stack, and implemented features. Update timelines or statuses in `milestones.md` if possible based on the implemented code (e.g., Phase 1 seems largely complete based on dashboard/transactions/properties foundations).

## Phase 3: Flesh out `features.md`

Carefully review `docs/features.md` and update it based on the provided codebase:

1.  **Property Management:**
    *   **Status:** Change to "In Progress".
    *   **Implementation:** Update to reflect the existence of:
        *   `Property` model in `prisma/schema.prisma`.
        *   API routes (`src/app/api/properties/route.ts`) for GET/POST.
        *   `useProperties` hook (`src/app/hooks/useProperties.ts`) using React Query.
        *   Basic `PropertyList` component (`src/app/properties/components/PropertyList.tsx`).
        *   `PropertyForm` component (`src/app/properties/components/PropertyForm.tsx`) with Zod/RHF validation.
        *   Client wrapper (`src/app/properties/components/PropertiesClient.tsx`).
        *   New property page (`src/app/properties/new/page.tsx`).
    *   **Next Steps:** Refine based on current state. Add items like: "Implement property detail view", "Implement property edit functionality", "Implement property deletion", "Add filtering/sorting to property list", "Improve error handling".

2.  **Financial Tracking:**
    *   **Status:** Change to "In Progress".
    *   **Implementation:** Update to reflect the existence of:
        *   `Transaction` model in `prisma/schema.prisma`.
        *   API routes (`src/app/api/transactions/route.ts`) for GET/POST with basic filtering.
        *   `useTransactions` hook (`src/hooks/useTransactions.ts`) using React Query.
        *   `TransactionList` component (`src/app/transactions/components/TransactionList.tsx`) displaying data.
        *   `TransactionForm` component (`src/app/transactions/components/TransactionForm.tsx`) using shared UI components, Zod/RHF, and React Query mutation.
        *   Integration with `Property` model (fetching property address in `TransactionList`).
    *   **Next Steps:** Refine. Add items like: "Implement transaction editing/deletion", "Add advanced filtering/sorting", "Implement pagination", "Add financial reports/charts", "Add bulk import/export".

3.  **Repair Management:**
    *   **Status:** Keep as "Planned".
    *   **Implementation:** Update to mention: "Database schema defined with `Repair` model in `prisma/schema.prisma`".
    *   **Next Steps:** Keep as is or slightly refine.

4.  **Tenant Management:**
    *   **Status:** Keep as "Planned".
    *   **Implementation:** Update to mention: "Database schema defined with `Tenant` model in `prisma/schema.prisma`".
    *   **Next Steps:** Keep as is or slightly refine.

5.  **Dashboard & Analytics:**
    *   **Status:** Change to "In Progress".
    *   **Implementation:** Update to reflect the existence of:
        *   Dashboard page (`src/app/dashboard/page.tsx`) with responsive grid layout.
        *   Usage of `Card` components from `src/components/ui/card.tsx`.
        *   API endpoint (`src/app/api/dashboard/metrics/route.ts`) calculating metrics from Prisma.
        *   `useDashboardMetrics` hook (`src/app/hooks/useDashboardMetrics.ts`) fetching metrics.
        *   Display of `totalProperties`, `totalValue`, `monthlyIncome`, `activeRepairs`.
        *   Skeleton loading states (`src/components/ui/skeleton.tsx`) used on the dashboard.
        *   Currency formatting (`src/lib/utils.ts`).
        *   Monthly income overview chart (`src/components/dashboard/overview.tsx`) fetching data from `/api/dashboard/monthly-income/route.ts`.
        *   Recent transactions list (`src/components/dashboard/recent-transactions.tsx`) fetching data from `/api/transactions?limit=5`.
        *   Theme awareness via CSS variables and `next-themes`.
    *   **Next Steps:** Review and update. Keep relevant items like "Add more interactive charts", "Implement filtering", "Add export functionality", "Add property performance comparison". Remove "Add recent transactions list" and "Add upcoming repairs list" if they are now considered part of the implementation or planned features.

6.  **Technical Features:**
    *   **Data Validation:** Status: "In Progress". Implementation: Update to mention Zod schemas used in `PropertyForm`, `TransactionForm`, and API routes (`/api/properties`, `/api/transactions`). React Hook Form integration. Prisma schema types.
    *   **API Integration:** Status: "In Progress". Implementation: Update to mention Next.js API routes for Properties, Transactions, Dashboard Metrics, Monthly Income. Prisma client usage. Basic error handling implemented.
    *   **Performance Optimization:** Status: "Planned". Implementation: Update to mention `React Query` for data fetching/caching. Mention usage of Server Components where applicable (though many core pages are client components now).

7.  **Review "Features to be fleshed out":** Determine if any of these align with existing code or planned features and integrate them appropriately or leave as is.

## Final Step

Apply these changes carefully. Review the generated diffs before finalizing.