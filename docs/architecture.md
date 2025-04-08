<!-- File: /docs/architecture.md -->
# Architecture

## Architectural Overview
This document details the overall architecture of the Real Estate Portfolio Tracker, a personal web app designed to manage income, expenses, taxes, repairs, rents, and more across multiple properties.

## Design Principles
- **Modularity:** Separate core functionality (data management, reporting, UI) into discrete modules
- **Scalability:** Ensure the design accommodates future property additions or more detailed financial tracking
- **Maintainability:** Prioritize clear code structure and thorough documentation
- **Type Safety:** Utilize TypeScript throughout the application for better developer experience
- **Accessibility:** Ensure the application is usable by people with disabilities
- **Responsive Design:** Support various screen sizes and devices

## Tech Stack
- **Frontend Framework:** Next.js 14.1.3 with App Router
- **Language:** TypeScript 5.0+
- **Database:** SQLite with Prisma ORM 6.5.0
- **UI Components:** 
  - Tailwind CSS 3.4.17 for styling
  - Tremor 3.18.7 for dashboards and charts
  - Radix UI for accessible components
    - @radix-ui/react-avatar 1.1.3
    - @radix-ui/react-dropdown-menu 2.1.6
    - @radix-ui/react-label 2.1.2
    - @radix-ui/react-select 2.1.6
  - Lucide React 0.487.0 for icons
- **State Management:** 
  - TanStack Query (React Query) 5.72.0 for server state
  - React Hook Form 7.55.0 for form management
- **Data Validation:** Zod 3.24.2
- **HTTP Client:** Axios 1.8.4
- **Charts:** Recharts 2.15.2
- **Theming:** next-themes 0.4.6 for dark/light mode support
- **Notifications:** Sonner 2.0.3 for toast notifications

## Core Components
- **Frontend:** 
  - App Router-based routing
  - Server and Client Components
  - Responsive layouts with Tailwind CSS
  - Theme support with dark/light mode
- **Backend API:** 
  - Next.js API routes for CRUD operations
  - Prisma Client for database access
  - Zod schemas for validation
- **Database:** 
  - SQLite for local development
  - Prisma schema with relations
- **Reporting Module:** 
  - Tremor components for dashboards
  - Recharts for detailed analytics
- **UI System:**
  - CSS variables for theming
  - Tailwind CSS for utility classes
  - Reusable UI components from shadcn/ui

## Directory Structure
```
re-portfolio-management/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── components/    # Feature-specific components
│   │   │   ├── ui/       # UI components (buttons, inputs, etc.)
│   │   │   └── theme-toggle.tsx # Theme toggle component
│   │   ├── lib/          # Utilities and helpers
│   │   ├── hooks/        # Custom React hooks
│   │   ├── providers.tsx # Application providers (Theme, QueryClient)
│   │   └── (routes)/     # Page routes
├── prisma/               # Database configuration
└── docs/                # Documentation
```

## Architectural Decisions
| Decision ID | Description                                  | Rationale                                                |
|------------|----------------------------------------------|----------------------------------------------------------|
| AD-001     | Use Next.js App Router                       | Better performance, server components, simplified routing |
| AD-002     | SQLite with Prisma                          | Simple setup, good for personal use, type safety         |
| AD-003     | TanStack Query for data fetching            | Powerful caching, real-time updates, optimistic updates  |
| AD-004     | Tremor for dashboard components             | Ready-made, customizable analytics components            |
| AD-005     | Zod for validation                          | TypeScript integration, runtime validation               |
| AD-006     | CSS variables with Tailwind                 | Flexible theming with utility-first CSS approach         |
| AD-007     | next-themes for theme management            | Simple dark/light mode implementation with system preference support |
| AD-008     | Radix UI for accessible components          | Unstyled, accessible components that work with Tailwind  |
| AD-009     | Sonner for toast notifications              | Lightweight, customizable toast notifications            |

## Security Considerations
- Environment variables for sensitive data
- Input validation using Zod
- Type safety with TypeScript
- API route protection

## Performance Considerations
- Server Components for reduced client-side JS
- React Query for efficient data caching
- Optimistic updates for better UX
- Image optimization with Next.js

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── properties/    # Property endpoints
│   │   ├── transactions/  # Transaction endpoints
│   │   └── dashboard/     # Dashboard metrics endpoints
│   ├── transactions/      # Transactions feature
│   │   ├── components/    # Transaction-specific components
│   │   └── page.tsx      # Transactions page
│   ├── properties/        # Properties feature
│   │   ├── components/    # Property-specific components
│   │   └── page.tsx      # Properties page
│   └── dashboard/         # Dashboard feature
│       └── page.tsx      # Dashboard page
├── components/            # Shared components
│   └── ui/               # UI components (shadcn/ui)
├── hooks/                # Custom React hooks
│   ├── useProperties.ts  # Properties data hook
│   └── useTransactions.ts # Transactions data hook
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions
└── types/                # TypeScript type definitions
    ├── property.ts       # Property interface
    └── transaction.ts    # Transaction interface
```

## Data Flow

1. **Hooks Layer**
   - Custom hooks (`useProperties`, `useTransactions`) manage data fetching and state
   - Hooks provide loading and error states
   - React Query for efficient data fetching and caching
   - Cache invalidation on mutations
   - Optimistic updates for better UX

2. **Component Layer**
   - Components consume hooks for data and state
   - Follow consistent pattern for loading and error handling
   - Maintain separation of concerns
   - Reusable UI components with consistent styling
   - Toast notifications for user feedback

3. **API Layer**
   - Next.js API routes for CRUD operations
   - Prisma Client for database access
   - Zod validation for request data
   - Comprehensive error handling
   - Type-safe database operations

4. **Database Layer**
   - SQLite database for data persistence
   - Prisma schema with relations
   - Type-safe database queries
   - Migration support for schema changes

5. **Type System**
   - Strong TypeScript typing throughout the application
   - Shared interfaces in types directory
   - Prisma-generated types for database models
   - Zod schemas for runtime validation

6. **Theming System**
   - CSS variables for theme values
   - Tailwind CSS for utility classes
   - next-themes for theme management
   - Dark mode by default with light mode option
