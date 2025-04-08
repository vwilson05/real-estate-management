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

The application uses a two-tier geocoding architecture to handle address geocoding:

1. **Client-Side Geocoding Module** (`src/lib/geocoding.ts`)
   - Provides geocoding functionality for the client-side components
   - Makes API calls to the server-side geocoding endpoints
   - Handles errors and provides fallback values

2. **Server-Side Geocoding Module** (`src/lib/server/geocoding.ts`)
   - Implements the actual geocoding logic using the OpenStreetMap Nominatim API
   - Uses the native `fetch` API to make HTTP requests
   - Returns latitude and longitude coordinates for addresses

3. **Geocoding API Routes**
   - `/api/geocode` - Geocodes a single address
   - `/api/properties/geocode` - Geocodes a property by its ID

This architecture ensures that:
- Geocoding is performed on the server side, avoiding client-side issues with CORS and API rate limits
- The client-side code is kept simple and focused on UI concerns
- The server-side implementation can be updated independently of the client-side code

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
