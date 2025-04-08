<!-- File: /docs/features.md -->
# Features

## Core Features

### 1. Property Management
**Status:** In Progress
**Description:** Create, view, edit, and delete properties in the portfolio.
**Implementation:**
- Property list view with filtering and sorting
- Property creation form with validation
- Property details view
- Edit and delete functionality
- Interactive property map with Leaflet and OpenStreetMap integration
  - Handles properties with missing coordinates gracefully
  - Filters out invalid coordinates before creating markers
  - Provides error handling for map initialization issues
**Components:**
- `PropertyList`: Displays properties in a table format
- `PropertyForm`: Form for creating and editing properties
- `PropertyCard`: Card view for property details
- `PropertyMap`: Interactive map displaying property locations using Leaflet
- `PropertyMapClient`: Client-side wrapper for the map component
**Next Steps:**
- Implement property detail views
- Add property images support
- Implement property search functionality
- Add property comparison feature
- Add clustering for multiple properties in the same area
- Implement map filters and search
- Add geocoding to automatically get coordinates from addresses

### 2. Financial Tracking
**Status:** In Progress
**Description:** Track income, expenses, and financial metrics for each property.
**Implementation:**
- Transaction creation and management
- Income and expense categorization
- Financial reporting and analytics
- Cash flow tracking
**Components:**
- `TransactionList`: Displays transactions in a table format
- `TransactionForm`: Form for creating and editing transactions
- `FinancialMetrics`: Displays key financial metrics
**Next Steps:**
- Implement transaction categories
- Add recurring transaction support
- Implement financial reports
- Add budget tracking

### 3. Repair Management
**Status:** Planned
**Description:** Track and manage property repairs and maintenance.
**Implementation:**
- Repair request creation
- Repair status tracking
- Cost tracking
- Maintenance scheduling
**Components:**
- `RepairList`: Displays repairs in a table format
- `RepairForm`: Form for creating and editing repairs
- `RepairStatus`: Displays repair status and timeline
**Next Steps:**
- Implement repair request workflow
- Add maintenance scheduling
- Implement cost tracking
- Add repair history view

### 4. Tenant Management
**Status:** Planned
**Description:** Manage tenant information and lease agreements.
**Implementation:**
- Tenant profile creation
- Lease agreement tracking
- Rent payment tracking
- Communication history
**Components:**
- `TenantList`: Displays tenants in a table format
- `TenantForm`: Form for creating and editing tenants
- `LeaseAgreement`: Displays lease agreement details
**Next Steps:**
- Implement tenant profiles
- Add lease agreement management
- Implement rent payment tracking
- Add communication history

### 5. Dashboard & Analytics
**Status:** In Progress
**Description:** Overview of portfolio performance and key metrics.
**Implementation:**
- Portfolio overview
- Financial metrics
- Property performance
- Recent activity
**Components:**
- `Dashboard`: Main dashboard layout
- `PortfolioMetrics`: Displays portfolio-level metrics
- `PropertyPerformance`: Displays property-level performance
- `RecentActivity`: Displays recent transactions and updates
**Next Steps:**
- Implement more detailed analytics
- Add customizable dashboard widgets
- Implement export functionality
- Add data visualization components

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
