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
│   │   ├── lib/           # Utility functions and shared logic
│   │   ├── hooks/         # Custom React hooks
│   │   ├── properties/    # Properties feature
│   │   ├── transactions/  # Transactions feature
│   │   ├── repairs/       # Repairs feature
│   │   ├── tenants/       # Tenants feature
│   │   ├── dashboard/     # Dashboard feature
│   │   ├── layout.tsx     # Root layout with navigation
│   │   └── page.tsx       # Home page (redirects to dashboard)
├── prisma/
│   └── schema.prisma      # Database schema
├── docs/                  # Project documentation
└── package.json          # Project dependencies
```

## Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Database:** SQLite with Prisma ORM
- **UI Components:** Tailwind CSS, Tremor
- **State Management:** React Query
- **Forms:** React Hook Form with Zod validation

## Database Schema
The application uses the following main entities:
- **Property:** Real estate properties with their details
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

## Additional Resources
- **User Guide:** Instructions for interacting with the app.
- **Developer Guide:** Technical details for further development and customization.