<!-- File: /docs/features.md -->
# Features

## Core Features Overview

### 1. Property Management
- **Status:** In Progress
- **Description:** Manage and track properties including addresses, states, type, and market value
- **Implementation:**
  - `Property` model in `prisma/schema.prisma`
  - API routes (`src/app/api/properties/route.ts`) for GET/POST
  - `useProperties` hook (`src/app/hooks/useProperties.ts`) using React Query
  - Basic `PropertyList` component (`src/app/properties/components/PropertyList.tsx`)
  - `PropertyForm` component (`src/app/properties/components/PropertyForm.tsx`) with Zod/RHF validation
  - Client wrapper (`src/app/properties/components/PropertiesClient.tsx`)
  - New property page (`src/app/properties/new/page.tsx`)
  - Shared UI components from `src/components/ui/`
- **Next Steps:**
  - Implement property detail view
  - Implement property edit functionality
  - Implement property deletion
  - Add filtering/sorting to property list
  - Improve error handling

### 2. Financial Tracking
- **Status:** In Progress
- **Description:** Record and track income, expenses, taxes, repairs, and rents
- **Implementation:**
  - `Transaction` model in `prisma/schema.prisma`
  - API routes (`src/app/api/transactions/route.ts`) for GET/POST with basic filtering
  - `useTransactions` hook (`src/hooks/useTransactions.ts`) using React Query
  - `TransactionList` component (`src/app/transactions/components/TransactionList.tsx`) displaying data
  - `TransactionForm` component (`src/app/transactions/components/TransactionForm.tsx`) using shared UI components, Zod/RHF, and React Query mutation
  - Integration with `Property` model (fetching property address in `TransactionList`)
  - Toast notifications for success/error feedback
- **Next Steps:**
  - Implement transaction editing/deletion
  - Add advanced filtering/sorting
  - Implement pagination
  - Add financial reports/charts
  - Add bulk import/export

### 3. Repair Management
- **Status:** Planned
- **Description:** Track and manage property repairs and maintenance
- **Implementation:**
  - Database schema defined with `Repair` model in `prisma/schema.prisma`
- **Next Steps:**
  - Create repair tracking interface
  - Implement repair status updates
  - Add repair history view
  - Create maintenance schedules

### 4. Tenant Management
- **Status:** Planned
- **Description:** Manage tenant information and leases
- **Implementation:**
  - Database schema defined with `Tenant` model in `prisma/schema.prisma`
- **Next Steps:**
  - Create tenant list view
  - Implement lease management
  - Add tenant communication log
  - Create rent payment tracking

### 5. Dashboard & Analytics
- **Status:** In Progress
- **Description:** Provide overview and insights of portfolio performance
- **Implementation:**
  - Dashboard page (`src/app/dashboard/page.tsx`) with responsive grid layout
  - Usage of `Card` components from `src/components/ui/card.tsx`
  - API endpoint (`src/app/api/dashboard/metrics/route.ts`) calculating metrics from Prisma
  - React Query integration for data fetching and caching
  - Display of `totalProperties`, `totalValue`, `monthlyIncome`, `occupancyRate`
  - Skeleton loading states (`src/components/ui/skeleton.tsx`) used on the dashboard
  - Currency and percentage formatting utilities
  - Monthly income overview chart (`src/components/dashboard/overview.tsx`) showing net income trends
  - Recent transactions list (`src/components/dashboard/recent-transactions.tsx`) with React Query integration
  - Theme awareness via CSS variables and `next-themes`
  - Comprehensive error handling with user-friendly error states
- **Next Steps:**
  - Add more interactive charts
  - Implement filtering
  - Add export functionality
  - Add property performance comparison
  - Add more detailed financial metrics

## Technical Features

### 1. Data Validation
- **Status:** In Progress
- **Description:** Ensure data integrity and type safety
- **Implementation:**
  - Zod schemas used in `PropertyForm`, `TransactionForm`, and API routes
  - React Hook Form integration for form handling
  - Prisma schema types for database validation
  - TypeScript types throughout the application
- **Next Steps:**
  - Add more comprehensive validation rules
  - Improve error message display
  - Add form validation for all features

### 2. API Integration
- **Status:** In Progress
- **Description:** RESTful API endpoints for all features
- **Implementation:**
  - Next.js API routes for Properties, Transactions, Dashboard Metrics, Monthly Income
  - Prisma client usage for database operations
  - Basic error handling implemented
  - Type-safe database queries
- **Next Steps:**
  - Implement all CRUD endpoints
  - Add rate limiting
  - Add request validation
  - Add response caching

### 3. Performance Optimization
- **Status:** In Progress
- **Description:** Ensure fast and responsive application
- **Implementation:**
  - React Query for data fetching/caching
  - Server Components where applicable
  - Optimistic updates for better UX
  - Loading states with skeletons
- **Next Steps:**
  - Implement proper caching strategies
  - Optimize bundle size
  - Add performance monitoring
  - Add error boundaries

## Future Features

### 1. Document Management
- Store and manage property-related documents
- Track document expiration dates
- Implement document search

### 2. Tax Reporting
- Generate tax reports
- Track tax-deductible expenses
- Export data for tax preparation

### 3. Market Analysis
- Track property market values
- Compare with similar properties
- Generate market trend reports

### 4. Mobile App
- Create mobile-friendly interface
- Implement push notifications
- Add offline capabilities

### 5. Property Map Integration
- Map feature to see properties
- Integration with Google Maps
- Property clustering and filtering

### 6. Issue Tracking
- Issue tracker per property
- Track issues with description, last step, next step
- Contact management and follow-up
- Due date tracking and notifications

## Features to be fleshed out
- Map feature to see properties
- integration with google maps
- Issue tracker per property with issue, description, last step, next step, contact, due date, follow up email, etc to make managing/juggling easier
- calendar with email alerts function
