<!-- File: /docs/architecture.md -->
# Architecture

## Architectural Overview
This document details the overall architecture of the Real Estate Portfolio Tracker, a personal web app designed to manage income, expenses, taxes, repairs, rents, and more across multiple properties.

## Design Principles
- **Modularity:** Components are designed to be reusable and self-contained
- **Scalability:** Architecture supports adding new features and components
- **Maintainability:** Clear separation of concerns and consistent patterns
- **Type Safety:** TypeScript throughout with proper type definitions
- **Responsive Design:** Mobile-first approach with responsive layouts

## Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Database:** SQLite with Prisma ORM
- **UI Components:** 
  - shadcn/ui for base components
  - Custom components built on top of shadcn/ui
  - Tailwind CSS for styling
- **State Management:** React Query for server state
- **Form Handling:** React Hook Form with Zod validation
- **Theme:** Dark mode support with next-themes
- **Maps:** Leaflet with OpenStreetMap for interactive property maps

## Core Components

### UI Components
- **Base Components:** shadcn/ui components in `src/components/ui/`
  - Button: Primary, secondary, and ghost variants
  - Card: For content containers with header, content, and footer
  - Form: Form components with validation
  - Input: Text input with variants
  - Select: Dropdown selection
  - Tabs: Tabbed interface
  - Theme Toggle: Light/dark mode switch
- **Custom Components:** Feature-specific components in `src/components/[feature]/`
  - PropertyList: List of properties with actions
  - PropertyForm: Form for creating/editing properties
  - PropertyMap: Interactive map for property locations with error handling for missing coordinates
  - TransactionList: List of transactions
  - TransactionForm: Form for creating transactions
  - Dashboard: Overview of portfolio performance

### Data Layer
- **API Routes:** Next.js API routes in `src/app/api/`
  - Properties: CRUD operations for properties
  - Transactions: CRUD operations for transactions
  - Dashboard: Metrics and analytics
- **Database:** Prisma schema in `prisma/schema.prisma`
  - Property model
  - Transaction model
  - Repair model
  - Tenant model

### Hooks
- **Data Hooks:** React Query hooks in `src/hooks/`
  - useProperties: Property data management
  - useTransactions: Transaction data management
  - useDashboard: Dashboard metrics

## Directory Structure
```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── issues/        # Issues API routes
│   │   └── tenants/       # Tenants API routes
│   │   └── calendar/      # Calendar API routes
│   ├── dashboard/         # Dashboard pages
│   ├── properties/        # Property pages
│   └── transactions/      # Transaction pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── dashboard/        # Dashboard components
│   ├── properties/       # Property components
│   └── transactions/     # Transaction components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── types/                # TypeScript types
```

## Architectural Decisions

### 1. Component Architecture
- **Base Components:** shadcn/ui provides consistent, accessible base components
- **Custom Components:** Built on top of base components with additional functionality
- **Component Composition:** Components are composed of smaller, reusable parts
- **Props Interface:** Clear TypeScript interfaces for component props

### 2. State Management
- **Server State:** React Query for data fetching and caching
- **Form State:** React Hook Form for form management
- **UI State:** React useState for local component state
- **Theme State:** next-themes for theme management

### 3. Data Flow
- **API Routes:** Handle data operations and validation
- **React Query:** Manage data fetching and caching
- **Components:** Display data and handle user interactions
- **Forms:** Handle data input and validation

### 4. Styling Approach
- **Tailwind CSS:** Utility-first CSS framework
- **shadcn/ui:** Pre-styled components with consistent design
- **Theme Support:** Dark mode with CSS variables
- **Responsive Design:** Mobile-first approach

## Security Considerations
- Input validation with Zod
- SQL injection prevention with Prisma
- XSS protection with React
- CSRF protection with Next.js

## Performance Considerations
- Server Components where possible
- Client Components for interactive features
- React Query for efficient data fetching
- Proper loading states and error boundaries

## Data Flow
1. User interacts with UI component
2. Component triggers React Query mutation
3. API route handles request
4. Prisma performs database operation
5. Response flows back through React Query
6. UI updates with new data

## Geocoding Architecture

### Overview
The application uses a server-side geocoding architecture to handle address geocoding efficiently and securely:

1. **Server-Side Geocoding Module** (`src/lib/server/geocoding.ts`)
   - Implements geocoding using OpenStreetMap's Nominatim API
   - Uses native `fetch` API for compatibility with server environment
   - Includes rate limiting and error handling
   - Returns standardized response format with coordinates

2. **Geocoding API Routes**
   - `/api/geocode` - Geocodes a single address
   - `/api/properties/geocode` - Geocodes a property by its ID
   - Includes proper error handling and rate limiting

3. **Client Integration**
   - Client components make requests to geocoding API routes
   - Handles loading states and errors gracefully
   - Provides fallback UI for failed geocoding attempts

### Benefits
- No API key exposure (server-side only)
- Better rate limiting control
- Consistent error handling
- Improved reliability
- Reduced client-side complexity

## Issue Tracking Architecture

### Database Schema
```prisma
model Issue {
  id          String      @id @default(cuid())
  title       String
  description String?
  dueDate     DateTime?
  status      IssueStatus @default(OPEN)
  priority    IssuePriority @default(MEDIUM)
  type        IssueType
  property    Property    @relation(fields: [propertyId], references: [id])
  propertyId  String
  repair      Repair?     @relation(fields: [repairId], references: [id])
  repairId    String?
  tenant      Tenant?     @relation(fields: [tenantId], references: [id])
  tenantId    String?
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

enum IssueStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}

enum IssuePriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}

enum IssueType {
  REPAIR
  MAINTENANCE
  INSPECTION
  OTHER
}
```

### API Routes
- `GET /api/issues` - List issues with filtering and sorting
  - Query parameters: status, priority, type, propertyId
  - Includes pagination and sorting
- `POST /api/issues` - Create new issue
  - Validates input using Zod schema
  - Checks property existence
- `PATCH /api/issues/[id]` - Update issue
  - Partial updates supported
  - Validates enum values
- `DELETE /api/issues/[id]` - Delete issue

### React Query Hooks
- `useIssues` - Fetch and filter issues
  - Supports all filter parameters
  - Includes pagination
  - Real-time updates
- `useCreateIssue` - Create new issues
  - Optimistic updates
  - Error handling
- `useUpdateIssue` - Update existing issues
  - Partial updates
  - Validation
- `useDeleteIssue` - Delete issues
  - Confirmation dialog
  - Cache updates

### UI Components
- `IssueList` - Display issues in a table
  - Status badges
  - Priority indicators
  - Sorting and filtering
  - Pagination
- `IssueForm` - Form for creating/editing issues
  - Zod validation
  - Property selection
  - Date picker
  - Status/priority/type selection
- `IssuesClient` - Client-side wrapper
  - State management
  - Error handling
  - Loading states

### Directory Structure
```
src/
├── app/
│   ├── api/
│   │   └── issues/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   └── issues/
│       ├── page.tsx
│       └── components/
│           ├── IssuesClient.tsx
│           ├── IssueList.tsx
│           └── IssueForm.tsx
├── lib/
│   └── schemas/
│       └── issueSchema.ts
└── hooks/
    └── useIssues.ts
```

## Database Schema

### Issue Model
- Fields: id, title, description, dueDate, status, priority, type
- Relations: property (required), repair (optional), tenant (optional)
- Enums: IssueStatus, IssuePriority, IssueType

## API Routes

### Issues API
- GET /api/issues - List issues with filtering and sorting
- POST /api/issues - Create a new issue

## React Query Hooks

### Issue Hooks
- useIssues - Fetch and filter issues
- useCreateIssue - Create new issues

## Custom Components

### Issue Components
- IssueList - Display issues in a table with status badges
- IssueForm - Form for creating new issues
- IssuesClient - Client-side wrapper for issues functionality

## Directory Structure

### New Directories
- src/lib/schemas/ - Zod validation schemas
  - issueSchema.ts - Issue validation schema

### Tenants API

**Location**: `src/app/api/tenants/`

**Endpoints**:
- `GET /api/tenants`: List all tenants with optional property filtering
- `POST /api/tenants`: Create a new tenant
- `GET /api/tenants/[id]`: Get a single tenant by ID
- `PATCH /api/tenants/[id]`: Update a tenant
- `DELETE /api/tenants/[id]`: Delete a tenant

**Implementation**:
- Uses Prisma for database operations
- Validates input with Zod schemas
- Includes property details in responses
- Proper error handling with appropriate status codes

## React Query Hooks

### Tenant Hooks

**Location**: `src/hooks/useTenants.ts`

**Hooks**:
- `useTenants(propertyId?)`: Fetch all tenants with optional property filtering
- `useTenant(tenantId)`: Fetch a single tenant by ID
- `useCreateTenant()`: Create a new tenant
- `useUpdateTenant()`: Update an existing tenant
- `useDeleteTenant()`: Delete a tenant

**Implementation**:
- Proper query invalidation on mutations
- Toast notifications for success/error states
- Type safety with TypeScript

## Custom Components

### Tenant Components

**Location**: `src/app/tenants/components/`

**Components**:
- `TenantForm`: Form for creating and editing tenants
- `TenantList`: Table displaying all tenants with actions
- `TenantsClient`: Main client component for tenant management
- `TenantDetailClient`: Detailed view of a single tenant
- `TenantEditClient`: Form for editing an existing tenant

**Implementation**:
- Uses shadcn/ui components
- Form validation with React Hook Form and Zod
- Date pickers for lease dates
- Property selection dropdown
- Responsive design

## Calendar Architecture

### Database Schema
```prisma
model CalendarEvent {
  id          String    @id @default(cuid())
  title       String
  description String?
  start       DateTime
  end         DateTime?
  allDay      Boolean   @default(false)
  type        String
  propertyId  String
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  property    Property  @relation(fields: [propertyId], references: [id])
}
```

### API Routes
- `GET /api/calendar` - List calendar events with filtering
  - Query parameters: start, end, propertyId, type
  - Includes property relation
- `POST /api/calendar` - Create new calendar event
  - Validates input using Zod schema
  - Checks property existence
- `GET /api/calendar/[id]` - Get single calendar event
  - Includes property relation
- `PATCH /api/calendar/[id]` - Update calendar event
  - Partial updates supported
  - Validates date formats
- `DELETE /api/calendar/[id]` - Delete calendar event

### React Query Hooks
- `useCalendarEvents` - Fetch and filter calendar events
  - Supports date range filtering
  - Includes property relation
  - Real-time updates
- `useCreateCalendarEvent` - Create new calendar events
  - Optimistic updates
  - Error handling
- `useUpdateCalendarEvent` - Update existing calendar events
  - Partial updates
  - Validation
- `useDeleteCalendarEvent` - Delete calendar events
  - Confirmation dialog
  - Cache updates

### UI Components
- `Calendar` - Main calendar component using FullCalendar
  - Multiple view options (month, week, day, list)
  - Event display with property information
  - View switching controls
  - Responsive design
- `CalendarEventForm` - Form for creating/editing calendar events
  - Zod validation
  - Property selection
  - Date and time pickers
  - Event type selection
- `CalendarClient` - Client-side wrapper
  - State management
  - Error handling
  - Loading states

### Directory Structure
```
src/
├── app/
│   ├── api/
│   │   └── calendar/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── route.ts
│   └── calendar/
│       └── page.tsx
├── components/
│   └── calendar/
│       ├── Calendar.tsx
│       └── CalendarEventForm.tsx
└── types/
    └── calendar.ts
```

### FullCalendar Integration
- Uses FullCalendar React component
- Customized theme to match application design
- Responsive layout for mobile and desktop
- Event handling for creation, editing, and deletion
- View switching with state management
- Property relation display in events
