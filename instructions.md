Okay, Gemini here. Based on the project's current state, the previous tasks (map fix, styling standardization), and the new requirement for an "Issues Tracker," here are the directives for the Cursor agent.

Master Context (current_instructions) - Updated

Project Goal: Develop and maintain a personal Real Estate Portfolio Management web application using Next.js 14 (App Router). The application tracks properties, income, expenses, repairs, tenants, issues/tasks, and associated financials across multiple properties.

Tech Stack:

Framework: Next.js 14 (App Router)

Language: TypeScript

Database: SQLite via Prisma ORM

Styling: Tailwind CSS

UI Components: shadcn/ui (primary), Recharts (for charts), Leaflet (for maps)

State Management: TanStack Query (React Query) for server state

Forms: React Hook Form + Zod for validation

Notifications: Sonner

Theming: next-themes (dark mode default)

Geocoding: node-geocoder (via custom server/client wrappers), OpenStreetMap Nominatim

Current State & Key Features:

Structure: Standard Next.js App Router structure. API routes in src/app/api/, feature pages/components under src/app/[feature]/. Shared UI components in src/components/ui/. Custom hooks in src/hooks/. Types in src/types/. Utilities in src/lib/. Schema definitions possibly in src/lib/schemas/.

Database: Prisma schema defined (schema.prisma) for Property, Transaction, Repair, Tenant models. Uses SQLite (dev.db). Prisma client initialized via src/lib/db.ts.

Dashboard (/dashboard): Displays key metrics (Total Properties, Portfolio Value, Monthly Income, Active Repairs) fetched via /api/dashboard/metrics. Includes a financial overview chart (Recharts) using /api/dashboard/monthly-income, a list of recent transactions using /api/transactions, and a list of active repairs using /api/dashboard/repairs. (Potential future enhancement: Display upcoming/overdue issues).

Properties (/properties):

Lists properties using useProperties hook and shadcn Table (PropertyList.tsx).

Form for adding new properties (/properties/new) using PropertyForm.tsx (shadcn UI, RHF, Zod). Includes debounced geocoding on address input.

Detail View (/properties/[propertyId]): Displays full property details (PropertyDetailClient.tsx). Includes "Edit" and "Delete" actions.

Edit View (/properties/[propertyId]/edit): Allows editing property details using reused PropertyForm.tsx (PropertyEditClient.tsx).

Delete Functionality: Implemented via useProperty hook and confirmation dialog (PropertyDetailClient.tsx).

Map View: PropertyMapClient.tsx displays properties on a Leaflet map using usePropertyMap hook. (Assumed fixed based on previous tasks).

Geocoding Button (GeocodeButton.tsx): Triggers server-side geocoding for properties without coordinates via /api/properties/geocode.

Transactions (/transactions):

Lists transactions using useTransactions hook and custom list component (TransactionList.tsx).

Form (TransactionForm.tsx) for adding new transactions using shadcn UI, React Hook Form, Zod, React Query mutation. Fetches properties for dropdown.

API (/api/transactions) handles GET/POST with Prisma and Zod.

Repairs (/repairs):

Lists repairs using shadcn Table (RepairList.tsx).

Form (RepairForm.tsx) for adding repairs using shadcn UI, React Hook Form, Zod, React Query mutation. Fetches properties for dropdown.

API (/api/repairs) handles GET/POST with Prisma and Zod.

Tenant Management: Planned, schema exists. No UI/API implemented.

Issue Tracking: (New Feature - To be implemented) Planned feature to track tasks, deadlines, and statuses related to properties, repairs, tenants, etc.

UI/UX: Primarily uses shadcn/ui components built on Tailwind and Radix UI. Dark mode default via next-themes. sonner used for toast notifications. (Assumed CSS-in-JS inconsistency is fixed).

State: TanStack Query manages server state and caching. Custom hooks (useProperties, useTransactions, useDashboardMetrics, useProperty, usePropertyMap, etc.) abstract data fetching.

Validation: Zod used for form and API validation. Schemas potentially located in src/lib/schemas/.

Known Inconsistencies/Issues to Address (Post-Previous Tasks):

API/Schema Mismatches: Continue vigilance for field naming consistency (e.g., estimatedCompletionDate in repairs). Ensure enums (Repair status, priority, type; Transaction type; new Issue status, priority, type) are consistent across schema, API, hooks, and UI.

Dashboard Data: The dashboard currently shows active repairs. Consider adding a section for upcoming/overdue issues from the new tracker.

PropertyForm Type: Verify the property type dropdown in PropertyForm has robust validation/default selection.

Documentation: Ensure all documentation files (features.md, architecture.md, documentation.md, milestones.md, issues.md, decisions.md) are updated to reflect the previous fixes (Map, Styling) and the addition of the Issues Tracker feature. issues.md needs ongoing cleanup.

Coding Conventions:

Follow Next.js/React best practices.

Use TypeScript strictly.

Modular components and hooks.

Consistent naming (PascalCase for components/types, camelCase for variables/functions).

Utilize cn() for merging Tailwind classes.

Leverage shadcn/ui components for consistency.

Place Zod schemas in src/lib/schemas/ (create if not existing).

Task 1: Implement Issues Tracker - Backend & Core Logic

Goal: Set up the database schema, API endpoints, validation schemas, and core data fetching hooks for the Issues Tracker feature.

Specific Instructions:

Define Prisma Schema (prisma/schema.prisma):

Create enum IssueStatus { OPEN IN_PROGRESS DONE BLOCKED }.

Create enum IssuePriority { LOW MEDIUM HIGH }.

Create enum IssueType { TAX REPAIR TENANT_ACTION MAINTENANCE REMINDER OTHER }.

Create a new model Issue with the following fields:

id (String, @id, @default(cuid()))

createdAt (DateTime, @default(now()))

updatedAt (DateTime, @updatedAt)

title (String)

description (String, optional)

dueDate (DateTime, optional)

status (IssueStatus, @default(OPEN))

priority (IssuePriority, @default(MEDIUM))

type (IssueType)

propertyId (String) - Relation to Property model (required)

property (Property, @relation(...) )

repairId (String, optional) - Relation to Repair model (optional)

repair (Repair?, @relation(...) )

tenantId (String, optional) - Relation to Tenant model (optional)

tenant (Tenant?, @relation(...) )

Ensure relations (property, repair, tenant) are correctly defined with appropriate foreign keys (propertyId, repairId, tenantId).

Run npx prisma migrate dev --name add_issue_model to apply the changes and generate the Prisma client.

Create Zod Validation Schema (src/lib/schemas/issueSchema.ts - create file/directory if needed):

Define issueSchema using Zod for validating issue creation and updates.

Map Prisma enums to Zod enums (z.enum(['OPEN', 'IN_PROGRESS', ...])).

Ensure types match the Prisma model (e.g., dueDate can be string initially, transformed to Date).

Make fields optional for PATCH operations where appropriate (define a separate issueUpdateSchema or use .partial()).

Implement API Routes (src/app/api/issues/):

POST /api/issues/route.ts:

Handle POST requests to create a new issue.

Validate request body using issueSchema.

Check if the related propertyId exists before creating. Return 404 if not.

Create the issue using db.issue.create().

Return the created issue object (status 201).

Include error handling (Zod errors -> 400, Prisma/other errors -> 500).

GET /api/issues/route.ts:

Handle GET requests to retrieve a list of issues.

Support query parameters for filtering (e.g., propertyId, status, priority, type, dueDate[gte], dueDate[lte]).

Support query parameters for sorting (e.g., sortBy=dueDate, sortOrder=asc).

Include related data (property: { select: { id: true, address: true } }, potentially repair, tenant summaries too).

Return the list of issues.

Include error handling.

(Defer GET [id], PATCH [id], DELETE [id] to Task 2 unless time permits)

Create React Query Hooks (src/hooks/):

useIssues.ts:

Create useIssues hook using @tanstack/react-query.

Implement fetchIssues function calling GET /api/issues. Pass filter/sort parameters.

Hook should accept filter/sort options as arguments.

Return { issues, isLoading, error }. Include appropriate type definitions (Issue type from src/types/).

useIssue.ts:

Create useIssue hook.

Implement createIssue mutation function calling POST /api/issues.

Use useMutation hook.

On success, invalidate the ['issues'] query key.

Handle loading (isCreating) and error states. Return createIssue mutate function.

(Defer single issue fetch, update, delete mutations)

Define TypeScript Type (src/types/issue.ts - create file):

Create an Issue interface mirroring the Prisma model and including the shapes of related data returned by the API (e.g., property: { id: string; address: string }).

Task 2: Implement Issues Tracker - Frontend UI

Goal: Build the user interface for viewing, adding, and potentially managing issues.

Specific Instructions:

Create Issues Page Structure (src/app/issues/):

Create page.tsx: Basic page component.

Create components/IssuesClient.tsx: Client component to fetch data using useIssues and manage UI state. Render IssueList and IssueForm.

Create components/IssueList.tsx:

Use shadcn/ui Table to display issues fetched via useIssues.

Columns: Title, Property (Address), Due Date (formatted), Status (Badge), Priority (Badge), Type, Actions (Edit/Delete - buttons initially, functionality later).

Use Badge component for Status and Priority, applying appropriate colors based on value (similar to RepairList).

Implement basic loading state (skeletons) and error display.

(Defer filtering/sorting UI controls)

Create components/IssueForm.tsx:

Use shadcn/ui Card for structure.

Use react-hook-form and zodResolver with issueSchema.

Include fields: Title (Input), Description (Textarea), Due Date (Input type="date"), Status (Select), Priority (Select), Type (Select), Property (Select - populated from /api/properties).

Fetch properties using useProperties hook (or pass from parent) for the Property dropdown.

Connect the form's onSubmit to the createIssue mutation from useIssue hook (passed via props or context).

Display validation errors using FormMessage.

Show loading state on the submit button (isCreating).

Use sonner (toast) for success/error feedback.

Integrate Components:

In IssuesClient.tsx, fetch issues using useIssues and pass data to IssueList.

Render IssueForm within IssuesClient.tsx (or potentially in a modal/dialog triggered by an "Add Issue" button). Pass the createIssue function to the form.

Ensure properties are fetched and passed to IssueForm for the dropdown.

Add Navigation:

Add a link to /issues in the main navigation bar (src/app/layout.tsx).

Testing:

Manually test creating new issues via the form.

Verify issues appear in the list after creation (due to query invalidation).

Check form validation and error messages.

Test the display of different statuses and priorities with correct badges/colors.

Task 3: Documentation Updates

Goal: Update all relevant documentation files to reflect the addition of the Issues Tracker feature and the assumed completion of previous tasks (Map fix, Styling standardization).

Specific Instructions:

docs/features.md:

Add a new section for "Issue Tracking" under "Core Features". Describe its purpose and planned sub-features (CRUD, filtering, linking). Mark as "In Progress".

Update status of "Property Management" Map feature if resolved.

docs/architecture.md:

Add the Issue model to the Database section.

Add /api/issues endpoints to the API Routes section.

Add useIssues, useIssue to the Hooks section.

Add IssueList, IssueForm to the Custom Components section.

Update the Directory Structure if src/lib/schemas was created.

docs/documentation.md:

Update the Project Structure.

Add the Issue entity to the Database Schema section.

Add the /api/issues endpoints to the API Endpoints table.

Add documentation for IssueList and IssueForm components.

docs/milestones.md:

Add "Issue Tracking Implementation" as a goal under an appropriate phase (e.g., "Core Features" or create a new phase).

docs/issues.md:

Clean up resolved issues (Map bug, CSS inconsistencies if fixed).

Add any new potential issues identified during the planning of the Issues Tracker (e.g., "Need robust filtering/sorting UI for Issues", "Dashboard integration for Issues").

docs/decisions.md:

Add a section for "Issue Tracking" detailing the decision to implement it and the chosen approach (Prisma model structure, API design, UI components).

Update decisions related to Maps or Styling if they were finalized.

docs/ui_ux.md:

Mention the use of Badge components for status/priority indicators in lists like Repairs and Issues.

Ensure form guidelines cover dropdowns populated from API data (like Properties in IssueForm).
