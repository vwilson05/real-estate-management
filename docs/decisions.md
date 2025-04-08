# Architectural Decisions and Development Pathways

## Client-Server Component Architecture

### Decision: Use Client Components for Interactive Features
- **Context**: Next.js 14 uses React Server Components by default, but interactive features require client-side JavaScript.
- **Decision**: Mark components that use client-side libraries (React Query, React Hook Form) with the "use client" directive.
- **Implementation**: Added "use client" directive to:
  - PropertyList.tsx
  - PropertyForm.tsx
  - useProperties.ts
  - PropertiesClient.tsx
- **Rationale**: Ensures proper hydration and prevents serialization errors when passing data between server and client components.

### Decision: Create Client-Side Wrappers for Server Components
- **Context**: Server components cannot directly use client-side libraries or pass non-serializable objects to client components.
- **Decision**: Create client-side wrapper components that encapsulate client-side functionality.
- **Implementation**: Created PropertiesClient.tsx to wrap the server-side properties page.
- **Rationale**: Maintains a clean separation between server and client components while allowing server components to render client components.

## State Management

### Decision: Use React Query for Data Fetching and Caching
- **Context**: Need efficient data fetching, caching, and state management for properties.
- **Decision**: Implement React Query for data fetching, caching, and mutations.
- **Implementation**: Created useProperties hook that uses React Query for fetching and mutating property data.
- **Rationale**: Provides automatic caching, refetching, and optimistic updates with minimal boilerplate.

### Decision: Centralize React Query Provider
- **Context**: React Query requires a QueryClientProvider to be available to all components using React Query.
- **Decision**: Create a centralized Providers component that wraps the application.
- **Implementation**: Created providers.tsx with QueryClientProvider and updated layout.tsx to use it.
- **Rationale**: Ensures consistent state management across the application and prevents multiple QueryClient instances.

## Form Handling

### Decision: Use React Hook Form with Zod for Form Validation
- **Context**: Need robust form validation with good developer experience.
- **Decision**: Implement React Hook Form with Zod for schema validation.
- **Implementation**: Created PropertyForm component with React Hook Form and Zod validation.
- **Rationale**: Provides type-safe form validation with good error handling and developer experience.

## API Design

### Decision: Use Next.js API Routes for Backend
- **Context**: Need a simple backend API for property management.
- **Decision**: Implement Next.js API routes for property CRUD operations.
- **Implementation**: Created /api/properties route with GET and POST handlers.
- **Rationale**: Leverages Next.js built-in API routes for a unified development experience.

### Decision: Use SQLite with Prisma for Data Storage
- **Context**: Need a simple, file-based database for development and production.
- **Decision**: Use SQLite with Prisma ORM for data storage.
- **Implementation**: Created Prisma schema with Property, Transaction, Repair, and Tenant models.
- **Rationale**: Provides a simple, file-based database that's easy to set up and maintain, with proper type safety and query capabilities.

## UI Components

### Decision: Standardize on shadcn/ui for UI Components
- **Context**: Need a modern, responsive UI with minimal custom CSS.
- **Decision**: Implement shadcn/ui components for UI elements.
- **Implementation**: Used shadcn/ui components (Card, Table, Button, Form, etc.) throughout the application.
- **Rationale**: Provides a consistent, modern UI with minimal custom CSS and good developer experience.

### Decision: Use Recharts for Data Visualization
- **Context**: Need interactive charts for financial data visualization.
- **Decision**: Implement Recharts for financial charts and graphs.
- **Implementation**: Used Recharts in the dashboard for income, expenses, and NOI visualization.
- **Rationale**: Provides flexible, customizable charts with good performance and accessibility.

## Type Safety

### Decision: Use TypeScript Throughout
- **Context**: Need type safety and good developer experience.
- **Decision**: Use TypeScript for all components, hooks, and API routes.
- **Implementation**: Added proper TypeScript types to all components and functions.
- **Rationale**: Provides type safety, better IDE support, and catches errors at compile time.

### Decision: Use Zod for Runtime Type Validation
- **Context**: Need runtime type validation for API requests and form data.
- **Decision**: Use Zod for schema validation.
- **Implementation**: Created propertySchema with Zod and used it for validation.
- **Rationale**: Provides runtime type validation with good error messages and TypeScript integration.

### Decision: Centralize Type Definitions
- **Context**: Need consistent type definitions across the application.
- **Decision**: Create shared type definitions in src/types/ directory.
- **Implementation**: Created property.ts with shared Property interface.
- **Rationale**: Ensures type consistency and reduces duplication across the application.

### Decision: Strict Enum Validation (Updated)
- **Context**: Need to ensure data consistency and prevent invalid enum values, especially after encountering issues with invalid IssueType values.
- **Decision**: Implement strict enum validation at multiple levels with proper migration handling.
- **Implementation**: 
  - Define enums in Prisma schema
  - Create Zod schemas that match Prisma enums exactly
  - Validate data at API boundaries
  - Use TypeScript to enforce enum usage in components
  - Implement database migrations for fixing invalid enum values
- **Rationale**: Prevents data inconsistencies and provides clear error messages when invalid values are used.
- **Consequences**:
  - Positive: 
    - Type safety and data consistency
    - Clear error messages for invalid values
    - Proper handling of data migrations
  - Negative: 
    - Need to handle migration of invalid data
    - Additional complexity in database maintenance
    - Must be careful with enum changes in production

## Future Considerations

### Authentication and Authorization
- Implement user authentication
- Add role-based access control for properties

### Testing
- Add unit tests for components and hooks
- Add integration tests for API routes
- Add end-to-end tests for critical user flows

### Performance Optimization
- Implement proper caching strategies
- Add pagination for property lists
- Optimize bundle size

### Feature Enhancements
- Add property detail view
- Implement property editing
- Add property deletion with confirmation
- Add sorting and filtering to property list
- Implement property search
- Add tenant management features
- Implement document management
- Add tax reporting features

## Issue Tracking Implementation

### Decision
Implement a comprehensive issue tracking system to manage tasks, reminders, and issues across properties.

### Context
- Need to track various types of tasks and issues related to properties
- Want to link issues with properties, repairs, and tenants
- Need to support different priorities and statuses
- Must be easy to filter and sort

### Solution
1. Database Design:
   - Created Issue model with fields for title, description, due date
   - Used enums for status, priority, and type to ensure data consistency
   - Added relations to Property (required), Repair (optional), and Tenant (optional)

2. API Design:
   - RESTful endpoints for CRUD operations
   - Support for filtering and sorting via query parameters
   - Validation using Zod schemas

3. UI Components:
   - Split view with form and list
   - Used shadcn/ui components for consistency
   - Status and priority badges for visual clarity
   - Responsive grid layout

4. State Management:
   - Used React Query for server state
   - Implemented custom hooks for data fetching and mutations
   - Real-time updates through query invalidation

### Consequences
Positive:
- Centralized issue tracking across the application
- Consistent data structure with enums
- Flexible filtering and sorting
- Modern and responsive UI
- Type-safe implementation

Negative:
- Additional complexity in the database schema
- More API endpoints to maintain
- Increased bundle size from new components

## Geocoding Implementation

### Decision: Use Server-Side Geocoding with OpenStreetMap
- **Context**: Need reliable geocoding for property addresses while avoiding client-side limitations and API key requirements.
- **Decision**: Implement server-side geocoding using OpenStreetMap's Nominatim API.
- **Implementation**: 
  - Created lib/server/geocoding.ts for server-side geocoding functions
  - Used native fetch API for compatibility with server environment
  - Implemented rate limiting and error handling
  - Added API routes for geocoding operations
- **Rationale**: 
  - Avoids client-side API key exposure
  - Provides consistent geocoding across the application
  - Free and reliable service with good coverage
  - Better error handling and rate limiting control
- **Consequences**:
  - Positive: More reliable geocoding, better security, no API key management
  - Negative: Slightly increased server load, need to handle rate limiting 