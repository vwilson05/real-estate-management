<!-- File: /docs/documentation.md -->
# Documentation

## Repository
- **GitHub:** [real-estate-management](https://github.com/vwilson05/real-estate-management.git)
- **Branch Strategy:**
  - `main`: Production-ready code
  - `develop`: Development branch
  - Feature branches: `feature/*`
  - Bug fixes: `fix/*`

## Project Structure
```
re-portfolio-management/
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── properties/     # Properties feature
│   │   │   └── components/
│   │   │       └── PropertyForm.tsx # Property form with validation
│   │   ├── transactions/  # Transactions feature
│   │   ├── repairs/       # Repairs feature
│   │   ├── tenants/       # Tenants feature
│   │   ├── dashboard/     # Dashboard feature
│   │   ├── layout.tsx     # Root layout with navigation
│   │   ├── providers.tsx  # Application providers (Theme, QueryClient)
│   │   └── page.tsx       # Home page (redirects to dashboard)
│   ├── components/        # Shared components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── dashboard/    # Dashboard components
│   │   ├── properties/   # Property components
│   │   └── theme-toggle.tsx # Theme toggle component
│   ├── lib/              # Utility functions and shared logic
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
├── prisma/
│   └── schema.prisma     # Database schema
├── docs/                 # Project documentation
└── package.json         # Project dependencies
```

## Navigation Structure
The application uses a single navigation menu in the root layout (`src/app/layout.tsx`) that provides consistent navigation across all pages. The navigation includes links to:

- Dashboard
- Properties
- Transactions
- Repairs
- Tenants

Each page focuses on its specific content without duplicating navigation elements.

## Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Database:** SQLite with Prisma ORM
- **UI Components:** 
  - shadcn/ui for base components
  - Recharts for data visualization
  - Tailwind CSS for styling
- **State Management:** React Query
- **Forms:** React Hook Form with Zod validation
- **Theming:** next-themes for dark/light mode support

## Recent Updates
- **Theme Support:** Added dark/light mode toggle with proper CSS variable integration
- **React Query Integration:** Set up QueryClientProvider for data fetching
- **CSS Improvements:** Fixed CSS class errors and improved theming system
- **Component Library:** Standardized on shadcn/ui components
- **Property Management:** Enhanced PropertyForm with comprehensive field validation and improved UX
- **Form Validation:** Implemented Zod schema validation for property data
- **UI/UX Improvements:** Added required field indicators and helper text for better user guidance
- **Dashboard Metrics:** Implemented real-time metrics from database with loading states and error handling
- **Transaction Form:** Enhanced date handling with native date picker and aligned validation schemas
- **API Validation:** Improved date format handling in transaction API endpoints
- **Type Safety:** Centralized type definitions in src/types/ directory
- **Repair Management:** Added repair tracking with status and priority management
- **Geocoding:** Implemented server-side geocoding with OpenStreetMap
- **Issue Tracking:** Added comprehensive issue tracking system with filtering and sorting
- **Property Map:** Enhanced map component with graceful handling of missing coordinates
- **Dashboard:** Added active issues tracking and improved metrics calculation
- **API Security:** Added rate limiting and improved error handling
- **Database:** Fixed enum validation and added migration support
- **Tenant Management:** Implemented full CRUD operations for tenants, including form validation, API routes, and UI components
- **Issue Tracking:** Added issue tracking functionality with API routes, hooks, and UI components
- **Geocoding:** Integrated server-side geocoding with OpenStreetMap for property addresses
- **Property Map:** Enhanced property map with graceful handling of invalid coordinates
- **Dashboard Metrics:** Fixed dashboard metrics calculation and display

## Database Schema
The application uses the following main entities:
- **Property:** Real estate properties with their details
  - Required fields: address, city, state, zipCode, type, marketValue, purchasePrice, purchaseDate
  - Optional fields: description, latitude, longitude
- **Transaction:** Financial transactions (income/expenses)
  - Required fields: date, amount, type, category, propertyId
  - Optional fields: description
- **Repair:** Property maintenance and repairs
  - Required fields: date, cost, description, status, priority, item, estimatedCompletionDate, propertyId
- **Issue:** Property issues and tasks
  - Required fields: title, status, priority, type, propertyId
  - Optional fields: description, dueDate, repairId, tenantId
- **Tenant:** Property tenants and lease information
  - Required fields: name, leaseStart, leaseEnd, rentAmount, propertyId
  - Optional fields: email, phone

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/vwilson05/real-estate-management.git
   cd real-estate-management
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Features
- [x] Project setup
- [x] Database schema
- [x] Basic layout and navigation
- [x] Dashboard page with summary cards
- [x] Theme support (dark/light mode)
- [x] React Query integration
- [x] Dashboard metrics from database
- [x] Properties management
- [x] Transaction tracking
- [x] Repair management
- [x] Tenant management
- [ ] Reports and analytics

## Development Guidelines
- Use TypeScript for type safety
- Follow the file structure conventions
- Write clean, maintainable code with proper comments
- Keep components modular and reusable
- Use Prisma for all database operations
- Implement proper error handling
- Follow REST API best practices for endpoints
- Use arbitrary value syntax (`[value]`) when applying CSS variables in Tailwind classes
- Use shared type definitions from src/types/ directory

## CSS and Theming
The application uses a combination of CSS variables and Tailwind CSS for theming:

```css
/* Example of using CSS variables with Tailwind */
@apply bg-[hsl(var(--background))] text-[hsl(var(--foreground))];
```

When using CSS variables in Tailwind classes, always use the arbitrary value syntax to avoid class name errors.

## Git Workflow
1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```
3. Push to the remote repository:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Create a pull request to merge into develop

## Overview
This document serves as the central repository for technical documentation. It covers API endpoints, database schemas, function specifications, and architectural decisions for the Real Estate Portfolio Tracker.

## API Endpoints

| Endpoint                 | Method | Description                                 | Parameters                   | Response                           |
|--------------------------|--------|---------------------------------------------|------------------------------|------------------------------------|
| `/api/properties`        | GET    | Retrieve list of properties                 | `None`                       | Array of property objects          |
| `/api/properties`        | POST   | Create a new property                       | Property data in JSON format | Created property object            |
| `/api/properties/[id]`   | GET    | Retrieve a single property                  | `id` in URL                  | Property object                    |
| `/api/properties/[id]`   | PATCH  | Update a property                           | `id` in URL, data in body    | Updated property object            |
| `/api/properties/[id]`   | DELETE | Delete a property                           | `id` in URL                  | 204 No Content                     |
| `/api/transactions`      | GET    | Retrieve list of transactions               | `propertyId` (optional)      | Array of transaction objects       |
| `/api/transactions`      | POST   | Record a new transaction                    | Transaction data in JSON     | Created transaction object         |
| `/api/repairs`          | GET    | Retrieve list of repairs                    | `propertyId` (optional)      | Array of repair objects            |
| `/api/repairs`          | POST   | Create a new repair                         | Repair data in JSON          | Created repair object              |
| `/api/issues`           | GET    | Retrieve list of issues                     | Multiple filter params       | Array of issue objects             |
| `/api/issues`           | POST   | Create a new issue                          | Issue data in JSON           | Created issue object               |
| `/api/issues/[id]`      | PATCH  | Update an issue                             | `id` in URL, data in body    | Updated issue object               |
| `/api/issues/[id]`      | DELETE | Delete an issue                             | `id` in URL                  | 204 No Content                     |
| `/api/geocode`          | GET    | Geocode an address                          | `address` in query           | Coordinates object                 |
| `/api/properties/geocode` | GET  | Geocode a property by ID                    | `propertyId` in query        | Coordinates object                 |
| `/api/dashboard/metrics` | GET    | Get dashboard metrics                       | `None`                       | Dashboard metrics object           |
| `/api/dashboard/repairs` | GET    | Get active repairs                          | `None`                       | Active repairs and total cost      |
| `/api/dashboard/issues`  | GET    | Get active issues                           | `None`                       | Active issues and total count      |
| `/api/dashboard/monthly-income` | GET | Get monthly income data                 | `None`                       | Monthly income, expenses, and NOI  |

### Tenants

- `GET /api/tenants`: List all tenants with optional property filtering
- `POST /api/tenants`: Create a new tenant
- `GET /api/tenants/[id]`: Get a single tenant by ID
- `PATCH /api/tenants/[id]`: Update a tenant
- `DELETE /api/tenants/[id]`: Delete a tenant

## Component Documentation
### PropertyForm
The PropertyForm component provides a comprehensive interface for creating and editing property records.

#### Features
- Form validation using Zod schema
- Responsive grid layout
- Section-based organization
- Real-time validation feedback
- Support for both create and edit modes
- Automatic geocoding of addresses

#### Required Fields
- Address
- City
- State
- ZIP Code
- Property Type
- Market Value
- Purchase Price
- Purchase Date

#### Optional Fields
- Description
- Latitude (auto-generated)
- Longitude (auto-generated)

#### Validation Rules
- All required fields must be filled
- Numeric fields must be positive
- Dates must be valid
- ZIP codes must follow proper format

#### Usage
```typescript
<PropertyForm
  initialData={propertyData} // Optional: For editing existing properties
  onSubmit={handleSubmit}   // Required: Callback for form submission
  isLoading={false}         // Optional: Loading state for submit button
/>
```

### RepairForm
- **Purpose:** Allows users to add new repairs
- **Location:** `src/app/repairs/components/RepairForm.tsx`
- **Features:**
  - Native date picker for better user experience
  - Consistent date format handling (YYYY-MM-DD)
  - Real-time form validation using Zod
  - Property selection dropdown
  - Cost validation for positive numbers
  - Status selection (PENDING, IN_PROGRESS, COMPLETED)
  - Priority selection (LOW, MEDIUM, HIGH)
  - Estimated completion date tracking

### Dashboard Components
- **Overview:** Financial metrics and charts
  - Monthly income, expenses, and NOI
  - Year-to-date totals
  - Month-over-month changes
  - Interactive bar charts using Recharts
- **Active Repairs:** List of ongoing repairs
  - Status badges with color coding
  - Cost tracking
  - Estimated completion dates
- **Recent Transactions:** Latest financial activities
  - Transaction type indicators
  - Amount formatting
  - Property association