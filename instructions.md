1. Master "current_instructions" Section
1.1. Project Context & Goals

Objective: Develop a personal web application using Next.js 14, TypeScript, Prisma, and shadcn/ui to manage a real estate portfolio, tracking properties, income, expenses, repairs, issues, and eventually tenants across multiple properties. The goal is to centralize data, simplify management, and provide performance insights via a dashboard.

Current Phase: Foundation / Core Features (In Progress). Basic structure, dashboard metrics, property CRUD (basic), transaction CRUD (basic), repair CRUD (basic), and issue tracking (basic) are implemented. Geocoding is integrated. Property map display issues resolved.

Immediate Goals:

Stabilize existing features (Properties, Transactions, Repairs, Issues).

Begin implementation of the Tenant Management MVP.

Ensure all documentation accurately reflects the current state.

1.2. Key Learnings & Architectural Decisions

Learnings:

Strict Client/Server component separation is crucial in Next.js 14 App Router ("use client" directive needed for interactive components/hooks using client-side state or browser APIs). Client wrappers are effective (PropertiesClient.tsx).

Centralized QueryClientProvider (providers.tsx) is essential for React Query. staleTime: 0 and cache-control headers help ensure data freshness, especially during development. Refetching strategies (refetchOnMount, refetchOnWindowFocus) improve data consistency.

Robust error handling is needed at multiple layers (API validation, hook error states, UI feedback using sonner/toast). API error responses need consistent structure for client-side parsing (TransactionForm.tsx error handling fix).

Database schema requires careful enum management. Invalid enum values in the DB can break queries (fix_invalid_issue_types.sql migration needed). Foreign key constraints require validation before creation (RepairForm property existence check).

Direct CSS variable application in Tailwind requires arbitrary value syntax (e.g., bg-[hsl(var(--background))]).

Geocoding needs server-side execution (lib/server/geocoding.ts) to avoid client-side limitations, using native fetch instead of potentially incompatible libraries like node-geocoder's default adapter in server environments.

Leaflet map integration requires CSS loading in the root layout and careful handling of marker initialization, especially with potentially invalid coordinates.

API data structures must exactly match client-side expectations (e.g., active-issues.tsx expecting { topIssues, totalOpenIssues }).

Architecture:

Next.js 14 App Router (Server Components by default).

TypeScript throughout for type safety.

Prisma + SQLite for DB ORM and storage.

React Query for server state management.

React Hook Form + Zod for forms and validation.

shadcn/ui + Tailwind CSS for UI components and styling.

Recharts for charts. Leaflet for maps.

RESTful Next.js API Routes for backend logic.

Centralized types in src/types/.

Geocoding via server-side API calling OpenStreetMap.

Issue Tracking feature integrated with dedicated models, API, hooks, and UI.

1.3. Current Challenges & Known Issues

High Priority Bugs (from issues.md):

Project Structure Cleanup: Ongoing consolidation needed.

Form Validation: Needs comprehensive implementation across all forms.

API Implementation: CRUD operations for all entities not fully complete (Edit/Delete often missing).

Performance Optimization: Basic implementation needs proactive optimization strategies (caching, pagination).

Technical Debt/Risks: Type safety (any usage), performance bottlenecks as data grows, API security (rate limiting, validation), DB scalability (though low risk for personal app).

Limitations: Currently single-user, no authentication/authorization. Limited reporting capabilities.

1.4. Current Priorities

Documentation: Update all /docs/ files.

Next Feature: Begin Tenant Management MVP.

1. Documentation Update Task (/docs/)
2.1. General Instructions

Review ALL files within the /docs/ directory.

Update content to reflect the latest project state, including:

Implementation of Issue Tracking.

Implementation and refinement of Geocoding.

Resolution of recent bugs (Dashboard Active Repairs, Repair Creation, Foreign Key, SQLite Readonly, CSS errors, RQ Client error, Invalid IssueType, Transaction Date, Missing IssueForm, Property Save/Display, Dashboard Metrics, Transaction Creation Error, Geocoding, Property Map Display).

Current status of features (Property, Transaction, Repair, Dashboard, Issues).

Refined architectural decisions based on learnings.

Ensure all documentation aligns with the principles in docs/rules.md and docs/coding-guidelines.md.

Remove redundancy where information is better consolidated (e.g., ensure issues.md is the primary source for bug tracking, summarizing key ones elsewhere if needed).

2.2. Specific File Updates (Mandatory)

decisions.md:

Add a decision entry for "Server-Side Geocoding with OpenStreetMap" detailing the rationale (avoiding client-side issues, free provider) and implementation (lib/server/geocoding.ts, API routes).

Update "Strict Enum Validation" consequences based on the fix_invalid_issue_types.sql experience.

Review "Issue Tracking Implementation" section for accuracy based on the final code.

issues.md:

Update the status of all "Resolved" issues listed in section 1.3 above. Ensure resolution steps are clear.

Update "Property Map Invalid Coordinates Error" description to focus on handling missing coordinates gracefully.

Review all "In Progress" items; add specific next steps or break them down further if too broad (e.g., "Form Validation" -> "Add Zod validation to TenantForm").

architecture.md:

Add the "Geocoding Architecture" section (detailing client/server modules and API routes).

Add the "Database Schema -> Issue Model" section details.

Add the "API Routes -> Issues API" section.

Add the "React Query Hooks -> Issue Hooks" section.

Add the "Custom Components -> Issue Components" section.

Update the "Directory Structure" to include src/lib/schemas/ and potentially src/app/issues/.

features.md:

Update status for "Property Management", "Financial Tracking", "Repair Management", "Dashboard & Analytics".

Mark "Geocoding integration" under Property Management as complete.

Detail the current state of "Issue Tracking" based on implementation.

Add specific "Next Steps" for all "In Progress" features (e.g., Property Mgmt -> Add Edit/Delete functionality; Financial Tracking -> Implement Edit/Delete).

milestones.md:

Update "Phase 1: Foundation" progress. Mark Dashboard metrics as complete. Reflect Property/Transaction/Repair/Issue management as "In Progress".

Refine "Phase 2: Core Features" goals based on current status (e.g., specify Property Edit/Delete). Add Tenant Management MVP.

documentation.md:

Update "Project Structure".

Update "Recent Updates" list.

Update "Tech Stack" if necessary.

Update "Features" list status.

Add API endpoint documentation for /api/issues, /api/geocode, /api/properties/geocode. Update existing entries if needed.

Add component documentation snippets for IssueForm, IssueList.

ui_ux.md:

Add details about sonner for toast notifications under "User Feedback & Interaction".

Ensure component examples (Card, Label, Select) match current implementations.

3.2. Specific Bug Fix Instructions

Dashboard Hang/Load Failure:

File: src/components/dashboard/active-issues.tsx

Fix: Modify the useQuery hook's type definition to expect IssuesData { topIssues: Issue[]; totalOpenIssues: number; }. Update the component logic to use data.topIssues for mapping and display data.totalOpenIssues. Apply the diff provided in instructions.md.

File: src/app/hooks/useDashboardMetrics.ts

Fix: Remove occupancyRate and averageRent from the DashboardMetrics interface. Adjust the default return value in the hook accordingly. Apply the diff provided in instructions.md.

File: src/app/dashboard/page.tsx

Fix: Remove the entire <Card> component responsible for displaying "Occupancy Rate". Apply the diff provided in instructions.md.

Testing: Run npm run dev. Navigate to /dashboard. Verify the page loads completely without errors or hangs. Check that all cards (Properties, Value, Income, Overview, Transactions, Repairs, Issues) display data or appropriate empty/loading states. Confirm the "Occupancy Rate" card is gone. Check browser console for errors.

Repairs API OrderBy Field Error:

File: prisma/schema.prisma

Verify: Confirm the exact field name for the estimated completion date in the Repair model (it seems to be estimatedCompletionDate based on the schema file provided).

File: Identify the API route file making the failing orderBy query (likely /api/dashboard/repairs or potentially /api/repairs).

Fix: Ensure the orderBy clause in the db.repair.findMany call uses the correct field name (estimatedCompletionDate). Example: orderBy: { estimatedCompletionDate: 'asc' }.

Action: Run npx prisma generate after any schema confirmation/changes.

Testing: Make a GET request to the affected API endpoint using sorting parameters for the completion date. Verify a successful 200 OK response and that the data is sorted correctly. Check server logs for Prisma errors.

Property Map Graceful Failure:

File: src/components/properties/PropertyMap.tsx

Fix: Inside the useEffect hook, before the forEach loop that creates markers:

// Filter properties with valid coordinates BEFORE creating markers
const validProperties = properties.filter(
  property => 
    property.latitude !== null && 
    property.longitude !== null && 
    !isNaN(property.latitude) && 
    !isNaN(property.longitude)
);

console.log('Valid properties for markers:', validProperties); // Keep for debugging

// Add markers ONLY for valid properties
validProperties.forEach((property) => {
  // ... existing marker creation logic ...
});

// Fit bounds ONLY if there are valid properties
if (validProperties.length > 0) {
  const bounds = L.latLngBounds(validProperties.map(p => [p.latitude!, p.longitude!]));
  map.current.fitBounds(bounds, { padding: [50, 50] });
} else {
  // Optional: Set a default view if no properties have coordinates
  // map.current.setView([DEFAULT_LAT, DEFAULT_LNG], DEFAULT_ZOOM); // Define suitable defaults
  console.log('No valid properties with coordinates to display on map.');
}


UI Enhancement: Add a user-friendly message within the map container div if validProperties.length === 0 after filtering (e.g., "No properties with coordinates found to display on map.").

Testing:

Ensure the map loads correctly when all properties have valid coordinates.

Ensure the map loads correctly (showing only valid markers) when some properties have invalid/missing coordinates. Check console for errors related to L.marker.

Ensure the map displays a fallback message or default view when no properties have valid coordinates.

3.3. Update issues.md

Move fixed bugs (Dashboard hang, Repairs API OrderBy, Property Map handling) to the "Resolved Bugs" section with clear resolution summaries.

Update the status and "Next Steps" for any remaining "In Progress" bugs.

1. Feature Enhancement and Completion
4.1. Feature Status Review (Based on features.md)

Update features.md based on recent work: Issue Tracking (In Progress), Geocoding (Complete), Property Map (Enhanced).

4.2. Specific Feature Enhancement Instructions

Property Management - Edit/Delete:

Task: Implement Edit and Delete functionality for properties.

API: Implement PATCH /api/properties/[propertyId] and DELETE /api/properties/[propertyId] routes (skeleton provided). Ensure PATCH validates input using a partial Zod schema.

Hooks: Create/Update useProperty hook (src/app/hooks/useProperty.ts) with updateProperty and deleteProperty mutations using React Query. Ensure onSuccess handlers invalidate relevant queries (["properties"], ["property", propertyId]). Add loading states (isUpdating, isDeleting).

UI (Edit): Create src/app/properties/[propertyId]/edit/page.tsx (Server Component fetching initial data) and src/app/properties/[propertyId]/edit/components/PropertyEditClient.tsx (Client Component using useProperty hook and reusing PropertyForm). Pass initial data to PropertyForm and handle submission via updateProperty mutation.

UI (Delete): In src/app/properties/[propertyId]/components/PropertyDetailClient.tsx, implement the handleDelete function using the deleteProperty mutation from useProperty. Wrap the delete button in the shadcn AlertDialog for confirmation. Disable button during deletion. Redirect to /properties on success.

UI (List): Add Edit/Delete buttons to src/app/properties/components/PropertyList.tsx linking to the respective detail/edit pages.

Testing: Verify editing updates data correctly in UI and DB. Verify deletion removes property and redirects. Test confirmation dialog. Check error handling (e.g., deleting non-existent property).

4.3. Update features.md

Update "Property Management" status and "Next Steps". Mark Edit/Delete as implemented once complete.

5. Next Feature Assignment: Tenant Management (MVP)
5.1. Rationale

This is the next logical core data entity required for portfolio management.

Leverages established patterns (Prisma, API Routes, React Query, shadcn/ui, Zod, RHF).

5.2. Implementation Steps

Database Model Review:

File: prisma/schema.prisma

Action: Review the Tenant model. Confirm fields (name, email, phone, leaseStart, leaseEnd, rentAmount, propertyId) are sufficient for MVP. Ensure relation to Property is correct.

Action: Run npx prisma generate.

Zod Schema:

File: src/lib/schemas/tenantSchema.ts (Create if not exists)

Action: Define tenantSchema for creation/validation (include name, leaseStart, leaseEnd, rentAmount, propertyId, optional email, phone). Ensure date formats are handled (e.g., z.string().pipe(z.coerce.date())). Define tenantUpdateSchema as partial. Export types TenantFormData, TenantUpdateData.

API Routes:

Directory: src/app/api/tenants/

File: route.ts

Action: Implement GET handler: Fetch tenants, allow filtering by propertyId (query param), include property { select: { address } }. Add basic error handling.

Action: Implement POST handler: Parse request body, validate using tenantSchema, check if propertyId exists in DB, create tenant using db.tenant.create. Return created tenant with status 201. Add robust error handling (Zod errors, Prisma errors).

File: [tenantId]/route.ts (Create)

Action: Implement GET handler: Fetch tenant by params.tenantId. Handle not found (404).

Action: Implement PATCH handler: Validate body with tenantUpdateSchema. Update tenant. Handle errors.

Action: Implement DELETE handler: Delete tenant by ID. Handle errors. Return 204 on success.

React Query Hooks:

File: src/hooks/useTenants.ts (Create)

Action: Create useTenants hook: Uses useQuery to fetch data from GET /api/tenants. Accept optional propertyId filter. Key: ['tenants', { propertyId }].

Action: Create useCreateTenant hook: Uses useMutation to call POST /api/tenants. Invalidate ['tenants'] query on success. Handle errors using sonner/toast.

UI Components:

Directory: src/app/tenants/

File: page.tsx (Create)

Action: Basic page structure. Use Suspense. Render TenantsClient.

File: components/TenantsClient.tsx (Create)

Action: "use client". Use useTenants and useCreateTenant. Render TenantList and TenantForm. Pass data and mutation functions as props.

File: components/TenantList.tsx (Create)

Action: "use client". Receive tenants array prop. Display using shadcn Table. Columns: Name, Property Address, Lease End, Rent Amount. Add View/Edit/Delete links/buttons later. Handle loading/empty states.

File: components/TenantForm.tsx (Create)

Action: "use client". Use react-hook-form, zodResolver with tenantSchema. Use shadcn components (Input for name/email/phone/rent, DatePicker or Input type="date" for dates, Select for Property). Fetch properties using useProperties for the Select dropdown. Handle form submission using createTenant mutation. Show loading state on button. Display validation errors. Reset form on success.

Navigation:

File: src/app/layout.tsx

Action: Add a <Link href="/tenants">Tenants</Link> within the main navigation section.

Testing:

Manually test tenant creation via the UI.

Verify tenant list updates.

Check form validation messages.

Use a tool (Postman, curl) to test GET, PATCH, DELETE API endpoints directly.

5.3. Dependencies/Considerations

Requires Property data to exist for linking.

Date handling consistency (ensure form submits dates in a format the API/Prisma expects).

User experience for selecting properties in the form.

6. General Directives & Reminders

Adhere to docs/rules.md: Prioritize fixing root causes, simplicity, clarity, and robust solutions over workarounds.

Code Quality: Maintain strict TypeScript usage, follow coding-guidelines.md, use eslint (npm run lint).

Testing: Add tests for new API logic and complex UI interactions/validations.

Documentation: Keep all documentation files in /docs/ synchronized with code changes as you make them. Use JSDoc for complex functions/types.

Commits: Use Conventional Commits format (feat:, fix:, docs:, refactor:, test:, chore:). Keep commits atomic.

UI/UX: Ensure consistency with shadcn/ui and ui_ux.md. Implement loading states and error feedback (sonner).