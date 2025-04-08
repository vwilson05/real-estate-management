<!-- File: /docs/architecture.md -->
# Architecture

## Architectural Overview
This document details the overall architecture of the Real Estate Portfolio Tracker, a personal web app designed to manage income, expenses, taxes, repairs, rents, and more across multiple properties.

## Design Principles
- **Modularity:** Separate core functionality (data management, reporting, UI) into discrete modules
- **Scalability:** Ensure the design accommodates future property additions or more detailed financial tracking
- **Maintainability:** Prioritize clear code structure and thorough documentation
- **Type Safety:** Utilize TypeScript throughout the application for better developer experience

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

## Core Components
- **Frontend:** 
  - App Router-based routing
  - Server and Client Components
  - Responsive layouts with Tailwind CSS
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

## Directory Structure
```
re-portfolio-management/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── components/    # Shared components
│   │   ├── lib/          # Utilities and helpers
│   │   ├── hooks/        # Custom React hooks
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