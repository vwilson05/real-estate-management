<!-- File: /docs/features.md -->
# Features

## Core Features

### 1. Property Management
**Status:** In Progress
**Description:** Create, view, edit, and delete properties in the portfolio.
**Implementation:**
- Property model with comprehensive fields (address, city, state, zipCode, type, marketValue, purchasePrice, purchaseDate)
- Property creation form with Zod validation
- Property list view using shadcn Table
- Property detail view with comprehensive information display
- Property edit functionality with form reuse
- Property deletion with confirmation dialog
- API endpoints for property CRUD operations
- Server-side geocoding integration with OpenStreetMap
- React Query integration for data fetching and caching
**Components:**
- `PropertyList`: Displays properties in a shadcn Table format
- `PropertyForm`: Form for creating and editing properties with Zod validation
- `PropertiesClient`: Client-side wrapper for state management
- `PropertyDetailClient`: Displays property details in a well-structured format
- `PropertyEditClient`: Handles property editing with form reuse
- `PropertyMap`: Interactive map with graceful handling of missing coordinates
**API Endpoints:**
- GET `/api/properties`: Retrieve all properties
- POST `/api/properties`: Create a new property
- GET `/api/properties/[propertyId]`: Retrieve a single property
- PATCH `/api/properties/[propertyId]`: Update a property
- DELETE `/api/properties/[propertyId]`: Delete a property
- GET `/api/geocode`: Geocode an address
- GET `/api/properties/geocode`: Geocode a property by ID
**Next Steps:**
- Implement property search and filtering
- Add property comparison feature
- Add property images support
- Add property performance metrics
- Implement property history tracking

### 2. Financial Tracking
**Status:** In Progress
**Description:** Track income, expenses, and financial metrics for each property.
**Implementation:**
- Transaction model with fields (date, amount, type, category, propertyId, description)
- Transaction creation form with Zod validation
- Transaction list view using shadcn Table
- API endpoints for transaction CRUD operations
- React Query integration for data management
**Components:**
- `TransactionList`: Displays transactions in a shadcn Table format
- `TransactionForm`: Form for creating transactions with Zod validation
- `TransactionsClient`: Client-side wrapper for state management
**API Endpoints:**
- GET `/api/transactions`: Retrieve all transactions
- POST `/api/transactions`: Create a new transaction
**Next Steps:**
- Implement transaction editing
- Add transaction deletion
- Implement advanced filtering and sorting
- Add pagination support
- Implement financial reports
- Add recurring transaction support
- Implement budget tracking
- Add transaction categories management

### 3. Repair Management
**Status:** In Progress
**Description:** Track and manage property repairs and maintenance.
**Implementation:**
- Repair model with fields (date, cost, description, status, priority, item, estimatedCompletionDate, propertyId)
- Repair creation form with Zod validation
- Repair list view using shadcn Table
- API endpoints for repair CRUD operations
- Dashboard integration for active repairs
**Components:**
- `RepairList`: Displays repairs in a shadcn Table format
- `RepairForm`: Form for creating repairs with Zod validation
- `RepairsClient`: Client-side wrapper for state management
- `ActiveRepairs`: Dashboard component for displaying active repairs
**API Endpoints:**
- GET `/api/repairs`: Retrieve all repairs
- POST `/api/repairs`: Create a new repair
- GET `/api/dashboard/repairs`: Get active repairs for dashboard
**Next Steps:**
- Implement repair editing
- Add repair deletion
- Implement repair status updates
- Add repair history view
- Implement maintenance scheduling
- Add repair cost tracking
- Implement repair request workflow
- Add repair notifications

### 4. Tenant Management
**Status:** Planned
**Description:** Manage tenant information and lease agreements.
**Implementation:**
- Tenant model defined in schema
- Basic fields: name, leaseStart, leaseEnd, rentAmount, propertyId, email, phone
**Next Steps:**
- Implement tenant profiles
- Add lease agreement management
- Implement rent payment tracking
- Add communication history
- Create tenant list view
- Implement tenant creation form
- Add tenant search and filtering
- Implement tenant-property relationship management

### 5. Dashboard & Analytics
**Status:** In Progress
**Description:** Overview of portfolio performance and key metrics.
**Implementation:**
- Dashboard layout with responsive grid
- Key metrics display (Total Properties, Portfolio Value, Monthly Income, Occupancy Rate)
- Financial overview chart using Recharts
- Recent transactions list
- Active repairs list
- API endpoints for dashboard data
**Components:**
- `Dashboard`: Main dashboard layout
- `Overview`: Financial metrics and charts
- `RecentTransactions`: List of recent transactions
- `ActiveRepairs`: List of active repairs
**API Endpoints:**
- GET `/api/dashboard/metrics`: Get portfolio metrics
- GET `/api/dashboard/monthly-income`: Get monthly financial data
- GET `/api/dashboard/repairs`: Get active repairs
**Next Steps:**
- Implement more detailed analytics
- Add customizable dashboard widgets
- Implement export functionality
- Add more data visualization components
- Implement property comparison charts
- Add trend analysis
- Implement performance metrics
- Add custom date range selection

### Issue Tracking
**Status:** In Progress
**Description:** Track and manage issues, tasks, and reminders across properties.
**Implementation:**
- Issue model with comprehensive fields (title, description, dueDate, status, priority, type)
- Relations to Property (required), Repair (optional), and Tenant (optional)
- Issue creation form with Zod validation
- Issue list view using shadcn Table
- API endpoints for issue CRUD operations
- Dashboard integration for active issues
- Real-time updates using React Query
**Components:**
- `IssueList`: Displays issues in a shadcn Table format
- `IssueForm`: Form for creating issues with Zod validation
- `IssuesClient`: Client-side wrapper for state management
- `ActiveIssues`: Dashboard component for displaying active issues
**API Endpoints:**
- GET `/api/issues`: Retrieve all issues with filtering
- POST `/api/issues`: Create a new issue
- PATCH `/api/issues/[id]`: Update an issue
- DELETE `/api/issues/[id]`: Delete an issue
- GET `/api/dashboard/issues`: Get active issues for dashboard
**Features:**
- Status tracking (Open, In Progress, Resolved, Closed)
- Priority levels (Low, Medium, High, Urgent)
- Issue types (Repair, Maintenance, Inspection, Other)
- Filtering by property, status, priority, type
- Sorting by various fields
- Real-time updates
- Form validation
- Responsive layout
**Next Steps:**
- Implement issue editing
- Add issue deletion
- Implement issue status updates
- Add issue history view
- Implement issue notifications
- Add issue comments
- Implement issue attachments
- Add issue templates

## UI Components

### 1. Base Components
**Status:** Complete
**Description:** Core UI components built with shadcn/ui.
**Implementation:**
- Button variants (primary, secondary, ghost)
- Form components with validation
- Input fields with variants
- Select dropdowns
- Card components
- Tabs interface
- Theme toggle
**Components:**
- All components in `src/components/ui/`
**Next Steps:**
- Add more component variants
- Implement additional form components
- Add more interactive components

### 2. Feature Components
**Status:** In Progress
**Description:** Feature-specific components built on top of base components.
**Implementation:**
- Property management components
- Transaction management components
- Dashboard components
- Form components with validation
**Components:**
- Components in `src/components/[feature]/`
**Next Steps:**
- Refactor remaining components to use shadcn/ui
- Add more feature-specific components
- Implement responsive layouts
- Add loading states and error handling

## Technical Features

### 1. Authentication & Authorization
**Status:** Planned
**Description:** User authentication and role-based access control.
**Implementation:**
- User registration and login
- Role-based access control
- Session management
- Password reset
**Next Steps:**
- Implement user authentication
- Add role-based access control
- Implement session management
- Add password reset functionality

### 2. Data Management
**Status:** In Progress
**Description:** Efficient data handling and state management.
**Implementation:**
- React Query for server state
- Form state management with React Hook Form
- Data validation with Zod
- Optimistic updates
**Next Steps:**
- Implement data caching
- Add offline support
- Implement data synchronization
- Add data export/import

### 3. Theme Support
**Status:** Complete
**Description:** Light and dark mode support.
**Implementation:**
- Theme toggle component
- CSS variables for theming
- System preference detection
- Persistent theme selection
**Components:**
- `ThemeToggle`: Toggle between light and dark modes
**Next Steps:**
- Add more theme variants
- Implement theme customization
- Add theme preview
- Implement theme persistence

### 4. Responsive Design
**Status:** In Progress
**Description:** Mobile-first responsive design.
**Implementation:**
- Mobile-first approach
- Responsive layouts
- Touch-friendly interfaces
- Adaptive components
**Next Steps:**
- Implement more responsive layouts
- Add mobile-specific features
- Optimize for tablets
- Add print styles

## Future Features

### 1. Advanced Analytics
**Status:** Planned
**Description:** Advanced portfolio analytics and reporting.
**Implementation:**
- Custom reports
- Data visualization
- Trend analysis
- Predictive analytics
**Next Steps:**
- Implement custom reports
- Add data visualization
- Implement trend analysis
- Add predictive analytics

### 2. Integration
**Status:** Planned
**Description:** Integration with external services.
**Implementation:**
- Bank account integration
- Property listing sites
- Maintenance services
- Accounting software
**Next Steps:**
- Implement bank account integration
- Add property listing site integration
- Implement maintenance service integration
- Add accounting software integration

### 3. Mobile App
**Status:** Planned
**Description:** Native mobile application.
**Implementation:**
- React Native app
- Offline support
- Push notifications
- Mobile-specific features
**Next Steps:**
- Design mobile app
- Implement core features
- Add offline support
- Implement push notifications
