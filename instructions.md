# Agent Instructions

## Master Context (`current_instructions`)

**Project Goal:** Develop and maintain a personal Real Estate Portfolio Management web application using Next.js 14 (App Router). The application tracks properties, income, expenses, repairs, tenants, and associated financials across multiple properties.

**Tech Stack:**
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Database:** SQLite via Prisma ORM
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn/ui (primary), Recharts (for charts), Leaflet (for maps)
*   **State Management:** TanStack Query (React Query) for server state
*   **Forms:** React Hook Form + Zod for validation
*   **Notifications:** Sonner
*   **Theming:** next-themes (dark mode default)
*   **Geocoding:** node-geocoder (via custom server/client wrappers), OpenStreetMap Nominatim

**Current State & Key Features:**
*   **Structure:** Standard Next.js App Router structure. API routes in `src/app/api/`, feature pages/components under `src/app/[feature]/`. Shared UI components in `src/components/ui/`. Custom hooks in `src/hooks/`. Types in `src/types/`. Utilities in `src/lib/`.
*   **Database:** Prisma schema defined (`schema.prisma`) for Property, Transaction, Repair, Tenant models. Uses SQLite (`dev.db`). Prisma client initialized via `src/lib/db.ts`.
*   **Dashboard (`/dashboard`):** Displays key metrics (Total Properties, Portfolio Value, Monthly Income, Active Repairs) fetched via `/api/dashboard/metrics`. Includes a financial overview chart (Recharts) using `/api/dashboard/monthly-income`, a list of recent transactions using `/api/transactions`, and a list of active repairs using `/api/dashboard/repairs`.
*   **Properties (`/properties`):**
    *   Lists properties using `useProperties` hook and shadcn `Table` (`PropertyList.tsx`).
    *   Form for adding new properties (`/properties/new`) using `PropertyForm.tsx` (shadcn UI, RHF, Zod). Includes debounced geocoding on address input.
    *   **Detail View (`/properties/[propertyId]`):** Displays full property details (`PropertyDetailClient.tsx`). Includes "Edit" and "Delete" actions.
    *   **Edit View (`/properties/[propertyId]/edit`):** Allows editing property details using reused `PropertyForm.tsx` (`PropertyEditClient.tsx`).
    *   **Delete Functionality:** Implemented via `useProperty` hook and confirmation dialog (`PropertyDetailClient.tsx`).
    *   **Map View:** `PropertyMapClient.tsx` attempts to display properties on a Leaflet map using `usePropertyMap` hook. **Currently not displaying markers correctly.**
    *   **Geocoding:** Button (`GeocodeButton.tsx`) to trigger server-side geocoding for all properties without coordinates via `/api/properties/geocode`. Client/server geocoding utilities in `src/lib/`.
*   **Transactions (`/transactions`):**
    *   Lists transactions using `useTransactions` hook and custom list component (`TransactionList.tsx`).
    *   Form (`TransactionForm.tsx`) for adding new transactions using shadcn UI, React Hook Form, Zod, React Query mutation. Fetches properties for dropdown.
    *   API (`/api/transactions`) handles GET/POST with Prisma and Zod.
*   **Repairs (`/repairs`):**
    *   Lists repairs using shadcn `Table` (`RepairList.tsx`).
    *   Form (`RepairForm.tsx`) for adding repairs using shadcn UI, React Hook Form, Zod, React Query mutation. Fetches properties for dropdown.
    *   API (`/api/repairs`) handles GET/POST with Prisma and Zod.
*   **Tenant Management:** Planned, schema exists. No UI/API implemented.
*   **UI/UX:** Primarily uses shadcn/ui components built on Tailwind and Radix UI. Dark mode default via `next-themes`. `sonner` used for toast notifications.
*   **State:** TanStack Query manages server state and caching. Custom hooks (`useProperties`, `useTransactions`, `useDashboardMetrics`, `useProperty`, `usePropertyMap`, etc.) abstract data fetching.
*   **Validation:** Zod used for form and API validation.

**Known Inconsistencies/Issues to Address:**
*   **Property Map Bug:** Properties are not appearing as markers on the map on the `/properties` page. This is the highest priority issue.
*   **Inconsistent UI Library Usage:** `PropertyList.tsx` uses Tremor Table initially (though the provided code uses shadcn Table - verify consistency). `docs/features.md` might be outdated regarding Tremor usage.
*   **CSS-in-JS:** `PropertyForm.tsx` previously used custom CSS-in-JS (`<style jsx>`), but the current `NewPropertyPage.tsx` *also* uses `<style jsx>`. Standardize on Tailwind/shadcn components/utilities. Remove the `<style jsx>` from `NewPropertyPage.tsx`.
*   **API/Schema Mismatches:** Check `estimatedCompletionDate` field naming consistency between Prisma schema, API routes (`/api/repairs`, `/api/dashboard/repairs`), and components (`ActiveRepairs`). Ensure repair status enums are consistent.
*   **Dashboard Data Discrepancy:** `Overview` component seems to expect richer data (e.g., YTD, MoM changes) than the basic `/api/dashboard/monthly-income` might provide. Verify API returns expected data structure. *Update: Analysis shows the API route `/api/dashboard/monthly-income/route.ts` *does* calculate and return this richer data.*
*   **Duplicate Components:** Check for duplicate components like `ThemeToggle` if they still exist.
*   **Outdated Documentation:** Several docs (`features.md`, `decisions.md`, etc.) might contain outdated info. `issues.md` needs cleanup.
*   **PropertyForm Type:** Property type dropdown in `PropertyForm` lacks validation/default.

**Coding Conventions:**
*   Follow Next.js/React best practices.
*   Use TypeScript strictly.
*   Modular components and hooks.
*   Consistent naming (PascalCase for components/types, camelCase for variables/functions).
*   Utilize `cn()` for merging Tailwind classes.
*   Leverage shadcn/ui components for consistency.

---

## Task 1: Fix Property Map Display

**Goal:** Ensure the Leaflet map on the `/properties` page correctly displays markers for all properties that have valid latitude and longitude coordinates.

**Problem:** Currently, the map initializes, but no property markers are displayed, even for properties expected to have coordinates.

**Analysis & Hypothesis:**
The issue likely stems from one or more of the following:
1.  **Data Fetching:** The `usePropertyMap` hook or the underlying `/api/properties` endpoint might not be fetching or returning properties with coordinate data correctly.
2.  **Data Propagation:** The fetched properties might not be passed correctly from `PropertyMapClient` to the `PropertyMap` component.
3.  **Coordinate Validity:** The `latitude` and `longitude` values might be `null`, `undefined`, non-numeric, or otherwise invalid when passed to the marker creation function.
4.  **Map/Marker Initialization:** There could be an issue with how Leaflet is initialized or how markers are created/added to the map within the `PropertyMap` component's `useEffect` hooks. Client-side rendering logic (`isClient`) might be interfering.
5.  **Leaflet CSS/JS:** Potential issues with Leaflet's CSS or JS loading dynamically.

**Specific Instructions:**

1.  **Verify Data Fetching (`usePropertyMap` / `/api/properties`):**
    *   Ensure the `/api/properties` GET handler returns the `latitude` and `longitude` fields for properties.
    *   In `src/hooks/usePropertyMap.ts`, log the fetched `data` to confirm properties with coordinates are being received from the API.

2.  **Inspect `PropertyMapClient.tsx`:**
    *   Log the `properties` array *before* passing it to the `<PropertyMap />` component to ensure the data is correctly formatted and contains coordinate information.

3.  **Debug `PropertyMap.tsx`:**
    *   **Log Props:** Add `console.log('PropertyMap props:', properties);` at the beginning of the component to verify received data.
    *   **Log Filtered Properties:** Inside the second `useEffect` (the one that adds markers), log the `validProperties` array after filtering. Check if properties you expect to see are present.
    *   **Explicit Coordinate Check:** *Before* the line `const marker = L.marker(...)`, add detailed logging for each property in `validProperties`:
        ```typescript
        console.log(`Processing property ${property.id}: Lat=${property.latitude}, Lon=${property.longitude}, TypeLat=${typeof property.latitude}, TypeLon=${typeof property.longitude}`);
        if (typeof property.latitude !== 'number' || typeof property.longitude !== 'number' || isNaN(property.latitude) || isNaN(property.longitude)) {
            console.error(`Invalid coordinates for property ${property.id}. Skipping marker.`);
            continue; // Skip this property if coordinates are invalid
        }
        // ... rest of marker creation logic ...
        ```
    *   **Check Leaflet CSS:** Use browser developer tools to confirm that the Leaflet CSS file (`leaflet.css`) is being loaded correctly in the `<head>`.
    *   **Console Errors:** Carefully check the browser's developer console for *any* errors related to Leaflet, map initialization, or marker creation during page load and component rendering.

4.  **Review Coordinate Handling:**
    *   Examine the filtering logic for `validProperties` again. Ensure it correctly identifies properties with valid, non-null, numeric coordinates.
    *   Review the `L.marker([property.latitude!, property.longitude!], ...)` call. If the explicit check above reveals issues, remove the `!` non-null assertion operators and rely on the validated numbers.

5.  **Test Geocoding (If Necessary):**
    *   If properties consistently lack coordinates, manually trigger the `Geocode All Properties` button (`GeocodeButton.tsx`).
    *   Verify that the geocoding process completes and updates the `latitude` and `longitude` fields in the `prisma/dev.db` database for relevant properties. Check the server logs for any errors during the `/api/properties/geocode` call.

6.  **Implement Fix:** Based on the debugging steps, implement the necessary changes. This might involve:
    *   Fixing the API endpoint if it doesn't return coordinates.
    *   Adjusting the `usePropertyMap` query.
    *   Correcting data propagation in `PropertyMapClient`.
    *   Refining the coordinate validation and marker creation logic in `PropertyMap`.
    *   Ensuring Leaflet resources load correctly.

7.  **Test Thoroughly:**
    *   Verify that markers appear for properties with valid coordinates.
    *   Test with properties that *lack* coordinates – ensure no errors occur and the map still loads.
    *   Test with a mix of properties (some with, some without coords).
    *   Ensure the map zooms correctly to fit the markers (`fitBounds`).

**Documentation Updates:**
*   **`docs/issues.md`:** Update or add an entry for the map bug, detailing the root cause and the fix implemented. Mark it as resolved.
*   **`docs/features.md`:** Ensure the Property Management map feature status is accurate.

---

## Task 2: Standardize Styling

**Goal:** Remove custom CSS-in-JS (`<style jsx>`) and ensure all styling relies on Tailwind CSS and shadcn/ui conventions.

**Problem:** `src/app/properties/new/page.tsx` still uses `<style jsx>` for layout and styling, which is inconsistent with the project's standard (Tailwind/shadcn).

**Specific Instructions:**

1.  **Analyze `NewPropertyPage.tsx` Styles:** Identify all styles defined within the `<style jsx>` block.
2.  **Refactor Styles:**
    *   Replace the custom CSS classes (`page-container`, `page-header`, `page-title`, `form-container`, etc.) with equivalent Tailwind utility classes.
    *   Use shadcn `Card`, `CardHeader`, `CardTitle`, `CardDescription` components where appropriate instead of custom divs with styling (e.g., for the "Property Information" section header).
    *   Ensure padding, margins, font sizes, colors, and layout match the previous styling using Tailwind utilities. Leverage theme variables (e.g., `text-foreground`, `text-muted-foreground`, `bg-background`, `border-border`) via Tailwind's arbitrary value syntax if needed (e.g., `bg-[hsl(var(--background))]`), although standard utilities should suffice for most cases.
3.  **Remove `<style jsx>` Block:** Once all styles are refactored, delete the entire `<style jsx>{`...`}</style>` block from the component.
4.  **Test:** Verify the layout and styling of the `/properties/new` page remain visually correct and consistent with the rest of the application after the refactor. Check responsiveness.

**Documentation Updates:**
*   **`docs/decisions.md` / `docs/ui_ux.md`:** Update to reflect the removal of CSS-in-JS and standardization on Tailwind/shadcn.
*   **`docs/issues.md`:** Mark the CSS-in-JS inconsistency as resolved.