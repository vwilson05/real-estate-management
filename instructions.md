# Cursor Agent Instructions: Next Development Cycle

**Objective:** Evolve the Real Estate Portfolio Management application by replacing the current "Issues" system with a more comprehensive "To Do" system, fixing identified bugs, and ensuring all documentation reflects the current state and adheres to project principles.

---

## 1. Master `current_instructions` Section

This section serves as the central source of truth for the current development cycle.

### 1.1. Project Overview & Goals
*   **Objective:** Develop a personal web app for tracking and managing a real estate portfolio, including properties, financials (income/expenses), repairs, tenants, and tasks/reminders.
*   **Current Goal:** Transition from the basic "Issues" tracking to a full-featured "To Do" system integrated across the application (dashboard, calendar, dedicated page). Fix identified bugs and ensure documentation consistency.
*   **Tech Stack:** Next.js 14 (App Router), TypeScript, Prisma (SQLite), shadcn/ui, Tailwind CSS, React Query, React Hook Form, Zod, FullCalendar, Leaflet.

### 1.2. Key Architectural Decisions & Learnings
*   **Client/Server Components:** Use `"use client"` directive for interactive components leveraging hooks (React Query, React Hook Form, useState, useEffect). Employ client-side wrapper components where necessary.
*   **State Management:** React Query for server state (fetching, caching, mutations); React Hook Form + Zod for forms; `useState`/`useReducer` for local UI state; `next-themes` for theme.
*   **Data Flow:** UI -> React Query hooks -> Next.js API Routes -> Prisma -> SQLite.
*   **Validation:** Zod for both API input validation and frontend form validation. Schemas defined in `src/lib/schemas/`.
*   **UI:** Standardized on shadcn/ui components, styled with Tailwind CSS, using CSS variables for theming (requires `[hsl(var(--variable))]` syntax in Tailwind). Recharts for charts, FullCalendar for calendar, Leaflet for maps.
*   **Geocoding:** Implemented *server-side* geocoding via `src/lib/server/geocoding.ts` using OpenStreetMap Nominatim API (called from API routes like `/api/properties/geocode`) to avoid client-side API key exposure and manage rate limits. The client-side `src/lib/geocoding.ts` now acts as a wrapper calling these API routes.
*   **Database:** SQLite via Prisma. Enums defined in `prisma.prisma` must be strictly adhered to; Zod schemas mirror these enums for validation. Migrations are necessary for schema changes.
*   **Error Handling:** Needs improvement. Aim for consistent error handling across API routes (returning structured JSON errors) and frontend hooks/components (using `toast` notifications via `sonner`).
*   **Date Handling:** Standardize on ISO 8601 strings (specifically `YYYY-MM-DD` for date-only inputs where feasible, converting to full ISO strings or Date objects as needed for Prisma/API) to ensure consistency between frontend inputs and backend/database expectations.

### 1.3. Current Challenges & Known Issues
*   **Bug:** Potential fragility in batch geocoding (`GeocodeButton.tsx`) due to lack of delay between API calls to the server-side endpoint, risking rate limits on the *external* Nominatim service called by the server.
*   **Bug:** `TenantForm.tsx`'s `onSubmit` doesn't `await` the `mutateAsync` call, potentially causing `isSubmitting` state to reset prematurely.
*   **Bug:** Potential type inconsistency in `IssueList.tsx` color mapping (using string literals instead of imported Prisma enums).
*   **Inconsistency:** Date format handling across different forms and API routes needs standardization.
*   **Technical Debt:** Some components might need refactoring to fully align with latest shadcn/ui patterns or improve state management. Error handling needs to be more robust and consistent.
*   **Feature Gap:** Reporting and analytics are minimal.

### 1.4. Priorities for This Cycle
1.  **Bug Fixes:** Address the identified bugs (Geocoding delay, TenantForm await, IssueList enum types, Date handling).
2.  **Documentation:** Update all documentation to reflect the "To Do" feature and other changes. Ensure consistency across all `/docs/` files.


## 3. Identify and Repair Bugs

Review the codebase and address the following potential issues:

1.  **Bug:** Potential rate limiting issue in batch geocoding.
    *   **File:** `src/app/properties/components/GeocodeButton.tsx`
    *   **Issue:** The `handleGeocodeAll` function loops through properties and calls `geocodeProperty` (which calls the server API `/api/properties/geocode`) without any delay. The server API, in turn, calls the external Nominatim API via `src/lib/server/geocoding.ts`, which *does* have a 1-second delay. However, rapidly calling the *internal* API might still overwhelm the server or lead to unexpected behavior if many properties need geocoding simultaneously.
    *   **Fix:** Add a small delay (e.g., 100ms) *within* the loop in `GeocodeButton.tsx` before calling `geocodeProperty`. This spaces out the requests to your *own* backend.
    *   **Test:** Test with multiple properties needing geocoding. Monitor server logs and Nominatim usage (if possible) to ensure no rate limit errors occur. Check that coordinates are updated correctly.
    *   **Update `docs/issues.md`:** Mark as resolved or update status.

2.  **Bug:** Missing `await` in `TenantForm.tsx` onSubmit.
    *   **File:** `src/app/tenants/components/TenantForm.tsx`
    *   **Issue:** The `onSubmit` function calls `createTenant.mutateAsync(data)` or `updateTenant.mutateAsync(...)` but doesn't `await` the result before the `finally` block sets `setIsSubmitting(false)`. If the mutation takes time, the submitting state might reset visually before the operation completes or errors.
    *   **Fix:** Add `await` before the `mutateAsync` calls: `await createTenant.mutateAsync(data);` and `await updateTenant.mutateAsync({ id: tenantId, data });`.
    *   **Test:** Test tenant creation and update, especially with simulated network latency, to ensure the submit button remains disabled until the operation is fully complete (success or error).
    *   **Update `docs/issues.md`:** Mark as resolved or update status.

3.  **Bug/Inconsistency:** Potential type mismatch for enums in `IssueList.tsx` (soon to be `TodoList.tsx`).
    *   **File:** `src/components/issues/IssueList.tsx` (and its future renamed version `src/components/todos/TodoList.tsx`).
    *   **Issue:** The component uses hardcoded strings (`"OPEN"`, `"HIGH"`) as keys for color mappings (`statusColors`, `priorityColors`). While these match the current Prisma schema string values, it's less type-safe than using the actual enums imported from `@prisma/client`.
    *   **Fix:**
        *   In the (future) `TodoList.tsx`, import the relevant enums from `@prisma/client` (e.g., `import { TodoStatus, TodoPriority } from "@prisma/client";`).
        *   Update the color mapping objects to use the enum members as keys: `const statusColors: Record<TodoStatus, string> = { [TodoStatus.OPEN]: "...", ... };`.
        *   Ensure the `Todo` type used in the component props correctly uses these enums.
    *   **Test:** Verify that badges in the To Do list render with the correct colors based on status and priority. Check for any TypeScript errors.
    *   **Update `docs/issues.md`:** Mark as resolved or update status after implementing the To Do feature.

4.  **Inconsistency:** Date Handling.
    *   **Files:** Various Form components (`IssueForm`, `RepairForm`, `TransactionForm`, `TenantForm`, `CalendarEventForm`), related Zod schemas (`src/lib/schemas/`), and API routes (`src/app/api/...`).
    *   **Issue:** Date inputs (`type="date"`) typically provide `YYYY-MM-DD` strings. Prisma expects `DateTime` objects or ISO strings. Zod schemas and API routes might handle this conversion inconsistently. `issueSchema` transforms the date, others might not.
    *   **Fix:**
        *   **Standardize:** Decide on a standard approach. Recommendation: Use `YYYY-MM-DD` string from HTML date inputs.
        *   **Zod Schemas:** Ensure all Zod schemas that handle dates from forms either expect the `YYYY-MM-DD` string and transform it to a full ISO string or `Date` object *before* it reaches the API, OR expect a full ISO string/`Date` object if the component handles the conversion. Use `.transform((date) => date ? new Date(date) : undefined)` or similar in Zod schemas where appropriate if the API expects a Date object. If the API expects ISO string, ensure the transformation produces that.
        *   **API Routes:** Ensure API routes consistently expect either a `Date` object (if Zod transforms it) or a valid ISO string, and pass the correct type to Prisma. Prisma generally handles ISO strings well for `DateTime` fields.
        *   **Components:** Ensure date pickers/inputs provide the format expected by the Zod schema.
    *   **Test:** Test creating and updating items with dates in all relevant forms (Repairs, Transactions, Tenants, Todos, CalendarEvents). Verify dates are stored and displayed correctly. Check edge cases like optional dates.
    *   **Update `docs/issues.md`:** Add this as a bug/inconsistency and track its resolution.

---

## 4. Update and Enhance Documentation in `/docs/`

Review and update *all* files in the `/docs/` directory to reflect the changes made in this cycle, particularly the introduction of the "To Do" system and the bug fixes.

*   **`architecture.md`:**
    *   Replace all mentions of "Issues" with "To Dos".
    *   Update the Database Schema section, API Routes, React Query Hooks, UI Components, and Directory Structure sections for the "To Do" feature.
    *   Verify the Geocoding Architecture section accurately reflects the server-side implementation (`lib/server/geocoding.ts`) and its API endpoints.
    *   Update the Calendar Architecture section to mention integration with To Dos.
*   **`coding-guidelines.md`:**
    *   Add a point under "TypeScript Guidelines" or create a new section emphasizing consistent date handling (e.g., "Prefer ISO 8601 strings for API communication, use YYYY-MM-DD for date-only form inputs, and transform appropriately").
*   **`decisions.md`:**
    *   Add a new decision log entry for "Implement To Do System", explaining the rationale for replacing "Issues".
    *   Archive or update the "Issue Tracking Implementation" section.
    *   Ensure "Geocoding Implementation" reflects the final server-side approach.
*   **`documentation.md`:**
    *   Update Project Structure.
    *   Update Recent Updates list.
    *   Update Database Schema (replace Issue with Todo).
    *   Update API Endpoints table (replace `/api/issues` with `/api/todos`, update dashboard endpoints related to issues).
    *   Update Component Documentation if major changes occurred (e.g., `IssueList`/`IssueForm` replaced by `TodoList`/`TodoForm`).
*   **`features.md`:**
    *   Rename/Rewrite the "Issue Tracking" section to "To Do Management". Detail the new requirements, implementation details, and mark status as "In Progress".
    *   Update "Calendar Management" and "Dashboard & Analytics" sections to reflect integration with the new To Do system.
*   **`issues.md`:**
    *   Add the new bugs identified in Step 3.
    *   Update the status of resolved bugs from previous cycles.
    *   Ensure bug descriptions, root causes, and resolutions are clear.
*   **`milestones.md`:**
    *   Adjust Phase 1/2 goals: Replace "Issue Tracking" tasks with "To Do System Implementation". Ensure timelines reflect this priority.
*   **`ui_ux.md`:**
    *   Add details about the new UI elements for To Dos (e.g., dashboard checklist, calendar event appearance, list filtering/sorting controls) if significantly different from the old Issues UI.

---

## Additional Directives

*   **Iterative Development:** Implement the "To Do" feature incrementally. Start with the database and API, then hooks, then basic UI (list/form), then integrations (dashboard, calendar). Commit frequently.
*   **Code Review:** After significant chunks of work (e.g., backend API done, frontend components done), perform a self-review or request a peer review against `docs/rules.md` and `docs/coding-guidelines.md`.
*   **Communication:** Ensure commit messages are clear and describe the changes accurately. Update `docs/issues.md` and `docs/documentation.md` *as changes are made*, not just at the end.

---

**Final Output:** This markdown document contains the full set of instructions for the current development cycle. Execute these steps methodically.