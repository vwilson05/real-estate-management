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
│   │   ├── components/     # Reusable components
│   │   │   ├── ui/        # UI components (buttons, inputs, etc.)
│   │   │   └── theme-toggle.tsx # Theme toggle component
│   │   ├── lib/           # Utility functions and shared logic
│   │   ├── hooks/         # Custom React hooks
│   │   ├── properties/    # Properties feature
│   │   │   └── components/
│   │   │       └── PropertyForm.tsx # Property form with validation
│   │   ├── transactions/  # Transactions feature
│   │   ├── repairs/       # Repairs feature
│   │   ├── tenants/       # Tenants feature
│   │   ├── dashboard/     # Dashboard feature
│   │   ├── layout.tsx     # Root layout with navigation
│   │   ├── providers.tsx  # Application providers (Theme, QueryClient)
│   │   └── page.tsx       # Home page (redirects to dashboard)
├── prisma/
│   └── schema.prisma      # Database schema
├── docs/                  # Project documentation
└── package.json          # Project dependencies
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
- **UI Components:** Tailwind CSS, Tremor
- **State Management:** React Query
- **Forms:** React Hook Form with Zod validation
- **Theming:** next-themes for dark/light mode support

## Recent Updates
- **Theme Support:** Added dark/light mode toggle with proper CSS variable integration
- **React Query Integration:** Set up QueryClientProvider for data fetching
- **CSS Improvements:** Fixed CSS class errors and improved theming system
- **Component Library:** Added reusable UI components with proper styling
- **Property Management:** Enhanced PropertyForm with comprehensive field validation and improved UX
- **Form Validation:** Implemented Zod schema validation for property data
- **UI/UX Improvements:** Added required field indicators and helper text for better user guidance
- **Dashboard Metrics:** Implemented real-time metrics from database with loading states and error handling

## Database Schema
The application uses the following main entities:
- **Property:** Real estate properties with their details
  - Required fields: address, city, state, zipCode, type, marketValue, purchasePrice, purchaseDate
  - Optional fields: description
- **Transaction:** Financial transactions (income/expenses)
- **Repair:** Property maintenance and repairs
- **Tenant:** Property tenants and lease information

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
- [ ] Properties management
- [ ] Transaction tracking
- [ ] Repair management
- [ ] Tenant management
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
*(For a RESTful approach, list endpoints such as:)*

| Endpoint                 | Method | Description                                 | Parameters                   | Response                           |
|--------------------------|--------|---------------------------------------------|------------------------------|------------------------------------|
| `/api/properties`        | GET    | Retrieve list of properties                 | `None`                       | Array of property objects          |
| `/api/properties`        | POST   | Create a new property                       | Property data in JSON format | Created property object            |
| `/api/transactions`      | GET    | Retrieve list of income/expense transactions  | `propertyId` (optional)      | Array of transaction objects       |
| `/api/transactions`      | POST   | Record a new transaction                    | Transaction data in JSON     | Created transaction object         |
| `/api/dashboard/metrics` | GET    | Get dashboard metrics                       | `None`                       | Dashboard metrics object           |

## Database Schemas
### Properties Table
- **Table Name:** properties
- **Fields:**
  - `id`: Unique identifier (Primary Key)
  - `address`: Property address
  - `state`: State where the property is located
  - `type`: E.g., house, MFR, etc.
  - `purchase_date`: Date of purchase
  - `value`: Current market value

### Transactions Table
- **Table Name:** transactions
- **Fields:**
  - `id`: Unique transaction ID (Primary Key)
  - `property_id`: Foreign key linking to properties table
  - `date`: Transaction date
  - `category`: Income, expense, tax, repair, rent, etc.
  - `amount`: Monetary value
  - `description`: Details about the transaction

## Function Specifications
### Example: addProperty
- **Purpose:** Add a new property to the portfolio.
- **Inputs:** Object containing property details.
- **Outputs:** Confirmation of the new property record.
- **Edge Cases:** Handle duplicate properties and invalid input formats.

## Architectural Decisions
Refer to [architecture.md](./architecture.md) for details on technology stack and design choices.

## Known Issues and Fixes
Refer to [issues.md](./issues.md) for a comprehensive list of known issues, their resolutions, and ongoing bug tracking.

## Additional Resources
- **User Guide:** Instructions for interacting with the app.
- **Developer Guide:** Technical details for further development and customization.

## Component Documentation
### PropertyForm
The PropertyForm component provides a comprehensive interface for creating and editing property records.

#### Features
- Form validation using Zod schema
- Responsive grid layout
- Section-based organization
- Real-time validation feedback
- Support for both create and edit modes

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

## Dashboard

The dashboard provides an overview of the real estate portfolio with the following metrics:

### Key Metrics

- **Total Properties**: The number of properties in the portfolio
- **Portfolio Value**: The total market value of all properties
- **Monthly Income**: The total rental income for the current month
- **Active Repairs**: The number of pending or in-progress repairs

### API Endpoints

#### Dashboard Metrics

```
GET /api/dashboard/metrics
```

Returns the key metrics for the dashboard:
- `totalProperties`: Number of properties in the portfolio
- `totalValue`: Total market value of all properties
- `monthlyIncome`: Total rental income for the current month
- `activeRepairs`: Number of pending or in-progress repairs

#### Monthly Income

```
GET /api/dashboard/monthly-income
```

Returns monthly income data for the last 6 months:
- Array of objects with `month` (short month name) and `income` (total income for that month)