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
- **Frontend Framework:** Next.js 14 with App Router
- **Language:** TypeScript 5.0+
- **Database:** SQLite with Prisma ORM 6.5.0
- **UI Components:** 
  - Tailwind CSS 3.3.0 for styling
  - Tremor 3.18.7 for dashboards and charts
  - Headless UI 2.2.1 for accessible components
  - Heroicons 2.2.0 for icons
- **State Management:** 
  - TanStack Query (React Query) 5.72.0 for server state
  - React Hook Form 7.55.0 for form management
- **Data Validation:** Zod 3.24.2
- **HTTP Client:** Axios 1.8.4
- **Charts:** Recharts 2.15.2
- **Theming:** next-themes for dark/light mode support

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
  - Reusable UI components

## Directory Structure
```
re-portfolio-management/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── components/    # Shared components
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
│   ├── transactions/       # Transactions feature
│   │   ├── components/    # Transaction-specific components
│   │   └── page.tsx      # Transactions page
│   └── properties/        # Properties feature
│       ├── components/    # Property-specific components
│       └── page.tsx      # Properties page
├── hooks/                 # Custom React hooks
│   ├── useProperties.ts  # Properties data hook
│   └── useTransactions.ts # Transactions data hook
├── lib/                  # Utility functions
│   └── utils.ts          # Helper functions (e.g., class name merging)
└── types/                # TypeScript type definitions
    ├── property.ts       # Property interface
    └── transaction.ts    # Transaction interface
```

## Data Flow

1. **Hooks Layer**
   - Custom hooks (`useProperties`, `useTransactions`) manage data fetching and state
   - Hooks provide loading and error states
   - React Query for efficient data fetching and caching
   - Cache control headers to prevent browser caching
   - Refetch on mount and window focus for fresh data

2. **Component Layer**
   - Components consume hooks for data and state
   - Follow consistent pattern for loading and error handling
   - Maintain separation of concerns
   - Reusable UI components with consistent styling

3. **API Layer**
   - Next.js API routes for CRUD operations
   - File-based storage for data persistence
   - Zod validation for request data
   - Comprehensive error handling
   - Logging for debugging

4. **Storage Layer**
   - File-based JSON storage for development
   - Structured for easy migration to database
   - Helper functions for reading and writing data
   - Error handling for file operations

5. **Type System**
   - Strong TypeScript typing throughout the application
   - Shared interfaces in types directory
   - Ensures type safety across components and hooks

6. **Theming System**
   - CSS variables for theme values
   - Tailwind CSS for utility classes
   - next-themes for theme management
   - Dark mode by default with light mode option
