<!-- File: /docs/issues.md -->
# Issues & Tracking

## Current Issues

### High Priority
1. **Property Map Invalid Coordinates Error**
   - Status: Resolved
   - Description: Error in PropertyMap component: "Invalid LatLng object: (undefined, undefined)"
   - Error: "Invalid LatLng object: (undefined, undefined)"
   - Impact: Map component fails to render when properties have missing coordinates
   - Root Cause: The map component was trying to create markers with undefined latitude and longitude values
   - Resolution:
     - Added validation to filter properties with valid coordinates before creating markers
     - Implemented graceful fallback when no valid coordinates are available
     - Added console logging for debugging purposes
     - Updated documentation to reflect the fix

2. **Repairs API OrderBy Field Error**
   - Status: Resolved
   - Description: Error in the repairs API route when trying to order by estimatedCompletionDate
   - Error: "Unknown argument `estimatedCompletionDate`. Available options are marked with ?"
   - Impact: Dashboard repairs endpoint was failing
   - Root Cause: Field mismatch between API and Prisma schema
   - Resolution:
     - Verified correct field name in Prisma schema
     - Updated API route to use correct field name
     - Regenerated Prisma client
     - Added proper error handling for invalid field names

3. **Dashboard Active Repairs Bug**
   - Status: Resolved
   - Description: Error in the dashboard overview component when accessing activeRepairs.length
   - Error: "TypeError: Cannot read properties of undefined (reading 'length')"
   - Impact: Dashboard crashes when activeRepairs data is not available
   - Root Cause: Missing null checks for optional properties in the MonthlyIncome interface
   - Resolution: 
     - Made activeRepairs and totalRepairCost optional in the MonthlyIncome interface
     - Added default values with null coalescing operators
     - Created local variables to safely access these properties
     - Updated all references to use the safe variables

4. **Repair Creation Not Working**
   - Status: Resolved
   - Description: Clicking "Save Repair" button had no effect and repairs were not being saved to the database
   - Impact: Users could not create new repairs
   - Root Cause: Error handling in the repair creation mutation was not properly passing error details to the form component
   - Resolution: 
     - Updated the createRepair mutation to properly parse and handle API errors
     - Added proper error object structure to match the ApiError interface in RepairForm
     - Improved error message display in the UI
     - Added proper type definitions for error handling

5. **Foreign Key Constraint Violation in Repairs**
   - Status: Resolved
   - Description: Unable to create repairs due to foreign key constraint violation
   - Error: "Foreign key constraint violated: `foreign key`"
   - Impact: Cannot create new repairs
   - Root Cause: Attempting to create repairs with non-existent property IDs
   - Resolution: 
     - Added property existence validation in the API route
     - Improved error handling in the form component
     - Added proper type checking for form fields
     - Added validation for empty property list
     - Added better error messages for users

6. **SQLite Database Read-Only Mode**
   - Status: Resolved
   - Description: SQLite database was in read-only mode, preventing write operations
   - Error: "attempt to write a readonly database"
   - Impact: Unable to create new repairs
   - Resolution: 
     - Reset the database using `prisma db push --force-reset`
     - Database permissions were verified
     - Database is now writable and functioning correctly
   - **IMPORTANT NOTE:** Future database operations should preserve existing data. Never use commands that delete or reset data without explicit user approval.

7. **Project Structure Cleanup**
   - Status: In Progress
   - Description: Consolidate and organize project structure
   - Resolution: 
     - Removed redundant TransactionForm component
     - Consolidated configuration files
     - Updated documentation

8. **Form Validation**
   - Status: In Progress
   - Description: Implement comprehensive form validation
   - Next Steps:
     - Add more comprehensive validation rules
     - Improve error message display
     - Add form validation for all features

9. **API Implementation**
   - Status: In Progress
   - Description: Need to implement CRUD operations for all entities
   - Next Steps:
     - Implement all CRUD endpoints
     - Add rate limiting
     - Add request validation
     - Add response caching

10. **Performance Optimization**
    - Status: In Progress
    - Description: Ensure fast and responsive application
    - Next Steps:
      - Implement proper caching strategies
      - Optimize bundle size
      - Add performance monitoring
      - Add error boundaries

11. **Documentation**
    - Status: Ongoing
    - Description: Keep documentation up to date with implementation
    - Next Steps:
      - Update API documentation
      - Add code comments
      - Maintain README

12. **Issue Creation DateTime Validation Error**
   - Status: Resolved
   - Description: Error when creating new issues due to invalid datetime format
   - Error: Invalid datetime format in issue creation
   - Impact: Users could not create new issues with due dates
   - Root Cause: Mismatch between HTML date input format (YYYY-MM-DD) and schema validation (datetime)
   - Resolution:
     - Updated issue schema to properly handle date input format
     - Added proper date format validation
     - Implemented date to datetime transformation
     - Added better error messages for invalid dates
     - Updated documentation to reflect the changes

13. **Batch Geocoding Rate Limiting**
   - Status: Resolved
   - Description: Potential rate limiting issues in batch geocoding due to rapid API calls
   - Impact: Risk of overwhelming the server and external Nominatim service
   - Root Cause: No delay between consecutive geocoding requests in GeocodeButton component
   - Resolution:
     - Added 100ms delay between geocoding requests
     - Implemented sleep utility function
     - Improved error handling and logging
     - Updated documentation

14. **TenantForm Submission State Bug**
   - Status: Resolved
   - Description: Form submission state could reset prematurely
   - Impact: Submit button could become enabled before the operation completed
   - Root Cause: setIsSubmitting(false) was called in finally block before async operations completed
   - Resolution:
     - Moved setIsSubmitting(true) before try block
     - Ensured proper async/await usage
     - Improved error handling
     - Updated documentation

15. **IssueList Color Mapping Types**
   - Status: Verified - No Fix Required
   - Description: Potential type inconsistency in IssueList color mappings
   - Impact: None - types were already correct
   - Investigation Results:
     - Confirmed proper use of Prisma enums (IssueStatus, IssuePriority)
     - Verified correct type definitions in color mapping objects
     - Documentation updated to reflect current implementation

### Medium Priority
1. **API Implementation**
   - Status: In Progress
   - Description: Need to implement CRUD operations for all entities
   - Next Steps:
     - Implement all CRUD endpoints
     - Add rate limiting
     - Add request validation
     - Add response caching

2. **Performance Optimization**
   - Status: In Progress
   - Description: Ensure fast and responsive application
   - Next Steps:
     - Implement proper caching strategies
     - Optimize bundle size
     - Add performance monitoring
     - Add error boundaries

### Low Priority
1. **Documentation**
   - Status: Ongoing
   - Description: Keep documentation up to date with implementation
   - Next Steps:
     - Update API documentation
     - Add code comments
     - Maintain README

## Potential Issues

### Technical Debt
1. **Type Safety**
   - Risk Level: Medium
   - Description: Ensure proper TypeScript usage throughout the application
   - Prevention:
     - Regular type checking
     - Avoid using 'any'
     - Implement proper interfaces

2. **Performance**
   - Risk Level: Medium
   - Description: Monitor and optimize application performance
   - Prevention:
     - Regular performance audits
     - Implement proper caching
     - Optimize bundle size

### Security Concerns
1. **Data Protection**
   - Risk Level: Medium
   - Description: Ensure proper data security measures
   - Prevention:
     - Implement proper validation
     - Sanitize inputs
     - Use environment variables

2. **API Security**
   - Risk Level: Medium
   - Description: Secure API endpoints
   - Prevention:
     - Implement rate limiting
     - Add request validation
     - Use proper error handling

### Scalability
1. **Database Performance**
   - Risk Level: Low
   - Description: Monitor database performance as data grows
   - Prevention:
     - Implement proper indexing
     - Use efficient queries
     - Regular monitoring

2. **Application Load**
   - Risk Level: Low
   - Description: Handle increased usage and data
   - Prevention:
     - Implement proper caching
     - Optimize queries
     - Monitor performance

## Bug Tracking

### Active Bugs
1. **Type Error in TransactionList Component**
   - Description: Property 'data' does not exist on type '{ transactions: Transaction[]; isLoading: boolean; error: string | null; }'
   - Status: In Progress
   - Priority: High
   - Root Cause: Mismatch between hook return type and component usage
   - Resolution: Need to update TransactionList component to use correct property names from useTransactions hook

### Resolved Bugs
1. **Initial Setup**
   - Description: Project configuration issues
   - Resolution: Updated dependencies and configuration

2. **Module Import Error in PropertyList Component**
   - Description: Can't resolve '../../../hooks/useProperties'
   - Resolution: Updated import path to '../../hooks/useProperties'
   - Status: Resolved

3. **Transaction Type Definition**
   - Description: Missing Transaction type definition
   - Resolution: Created Transaction interface in src/types/transaction.ts
   - Status: Resolved

4. **useTransactions Hook Implementation**
   - Description: Missing useTransactions hook implementation
   - Resolution: Created useTransactions hook with proper TypeScript types and React Query integration
   - Status: Resolved

5. **TransactionList Component Import Error**
   - Description: Cannot find module './components/TransactionForm' or its corresponding type declarations
   - Resolution: Created TransactionForm component and fixed import paths in transactions/page.tsx
   - Status: Resolved
  - Prevention: Follow project structure guidelines for component organization

6. **CSS Border Class Error**
   - Description: Error in CSS class for border styling
   - Resolution: Updated border class to use proper Tailwind syntax
   - Status: Resolved

7. **CSS Background Class Error**
   - Description: The `bg-background` class does not exist in Tailwind configuration
   - Status: Resolved
   - Priority: High
   - Root Cause: Incorrect CSS class name in globals.css
   - Resolution: Updated globals.css to use `bg-[hsl(var(--background))]` instead of the non-existent `bg-background` class

8. **React Query Client Error**
   - Description: "No QueryClient set, use QueryClientProvider to set one" error when using React Query hooks
   - Status: Resolved
   - Priority: High
   - Root Cause: Missing QueryClientProvider in the application root
   - Resolution: Added QueryClientProvider to the root layout component

9. **Invalid IssueType Values**
   - Description: Database contained invalid IssueType enum values
   - Status: Resolved
   - Priority: High
   - Root Cause: Data inconsistency between application and database
   - Resolution: 
     - Created migration script to fix invalid values
     - Updated enum validation in API routes
     - Added stricter type checking in forms
     - Improved error handling for invalid enum values

10. **Dashboard Metrics Calculation**
    - Description: Incorrect calculation of dashboard metrics
    - Status: Resolved
    - Priority: High
    - Root Cause: Missing null checks and incorrect data aggregation
    - Resolution:
      - Added proper null checks for all metrics
      - Implemented correct aggregation logic
      - Added data validation
      - Improved error handling

11. **Geocoding Integration**
    - Description: Client-side geocoding limitations and API key exposure
    - Status: Resolved
    - Priority: High
    - Root Cause: Using client-side geocoding with API key
    - Resolution:
      - Implemented server-side geocoding using OpenStreetMap
      - Added rate limiting and error handling
      - Removed client-side API key exposure
      - Improved geocoding reliability

12. **IssueForm Type Errors**
   - Description: Type errors in IssueForm component causing form validation issues
   - Error: Type mismatches between form schema and React Hook Form implementation
   - Impact: Form validation was not working correctly and TypeScript errors were present
   - Root Cause: Mismatch between the Zod schema and the form implementation
   - Resolution: 
     - Completely rebuilt the IssueForm component with proper TypeScript typing
     - Defined a clear Zod schema directly in the component file
     - Created a properly typed form using the inferred type from the schema
     - Added explicit validation rules for required fields
     - Improved error handling and user feedback
   - Status: Resolved
   - Prevention: Follow TypeScript best practices and ensure proper type definitions for all form components

## Feature Requests

### Under Consideration
1. **Enhanced Reporting**
   - Priority: Medium
   - Description: Add more detailed financial reports
   - Status: Planning

2. **Mobile Support**
   - Priority: Low
   - Description: Optimize for mobile devices
   - Status: Future consideration

3. **Property Map Integration**
   - Priority: Low
   - Description: Add map feature to see properties
   - Status: Future consideration

4. **Issue Tracking**
   - Priority: Low
   - Description: Add issue tracker per property
   - Status: Future consideration

## Maintenance Tasks

### Regular
- Dependency updates
- Code cleanup
- Documentation updates
- Performance monitoring

### Scheduled
- Weekly code reviews
- Monthly security audits
- Quarterly performance reviews

## Resolution Process
1. Issue identification
2. Priority assessment
3. Assignment
4. Implementation
5. Testing
6. Documentation
7. Closure

## Module Import Error in PropertyList Component

### Issue Description
**Date**: [Current Date]  
**Status**: Resolved  
**Priority**: High  
**Component**: PropertyList.tsx

The application failed to compile with the following error:

```
Failed to compile
./src/app/properties/components/PropertyList.tsx:5:0
Module not found: Can't resolve '../../../hooks/useProperties'
  3 | import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button } from "@tremor/react";
  4 | import Link from "next/link";
> 5 | import { useProperties, Property } from "../../../hooks/useProperties";
  6 |
  7 | export default function PropertyList() {
  8 |   const { properties, isLoading, error } = useProperties();
```

This error occurred during the build process and can only be dismissed by fixing the error.

### Root Cause
The import path for the `useProperties` hook was incorrect. The component was trying to import from `../../../hooks/useProperties`, but the actual path should be `../../hooks/useProperties` since the hooks directory is at the app level, not at the properties level.

### Resolution
1. Updated the import path in PropertyList.tsx from:
   ```typescript
   import { useProperties, Property } from "../../../hooks/useProperties";
   ```
   to:
   ```typescript
   import { useProperties, Property } from "../../hooks/useProperties";
   ```

2. This change aligns with our architectural decision to keep hooks at the app level for better organization and reusability.

### Prevention
To prevent similar issues in the future:
1. Follow the established project structure where hooks are placed in the app-level hooks directory
2. Use relative imports carefully, counting directory levels correctly
3. Consider using path aliases in tsconfig.json for more reliable imports

### Related Architectural Decision
This issue relates to our decision documented in decisions.md regarding the organization of hooks and client components. The resolution reinforces our approach of keeping hooks at the app level for better maintainability and reusability.

## Module Import Error in Transactions Page

### Issue Description
**Date**: [Current Date]  
**Status**: In Progress  
**Priority**: High  
**Component**: transactions/page.tsx

The application failed to compile with the following error:

```
⨯ ./src/app/transactions/page.tsx:1:0
Module not found: Can't resolve '../components/transactions/TransactionList'
> 1 | import TransactionList from '../components/transactions/TransactionList';
  2 | import TransactionForm from '../components/transactions/TransactionForm';
  3 |
  4 | export default function TransactionsPage() {
```

This error occurred during the build process and can only be dismissed by fixing the error.

### Root Cause
The import path for the `TransactionList` component is incorrect. The component is trying to import from `../components/transactions/TransactionList`, but this path doesn't exist in the project structure. Based on our project structure, components should be organized within their respective feature directories.

### Resolution
1. Create the necessary directory structure:
   ```
   src/app/transactions/components/
   ```

2. Create the TransactionList component in the correct location:
   ```
   src/app/transactions/components/TransactionList.tsx
   ```

3. Update the import path in transactions/page.tsx from:
   ```typescript
   import TransactionList from '../components/transactions/TransactionList';
   ```
   to:
   ```typescript
   import TransactionList from './components/TransactionList';
   ```

4. Similarly, update the import path for TransactionForm:
   ```typescript
   import TransactionForm from './components/TransactionForm';
   ```

### Prevention
To prevent similar issues in the future:
1. Follow the established project structure where components are placed in their respective feature directories
2. Use consistent import paths across the application
3. Consider using path aliases in tsconfig.json for more reliable imports

### Related Architectural Decision
This issue relates to our decision documented in decisions.md regarding the organization of components. The resolution reinforces our approach of keeping components within their respective feature directories for better maintainability and organization.

## CSS Border Class Error

### Issue Description
**Date**: [Current Date]  
**Status**: Resolved  
**Priority**: High  
**File**: src/app/globals.css

The application failed to build with the following error:

```
./src/app/globals.css:1:1
Syntax error: /Users/victorwilson/Desktop/projects/personal/re-portfolio-management/src/app/globals.css The `border-border` class does not exist. If `border-border` is a custom class, make sure it is defined within a `@layer` directive.
```

This error occurred during the build process and can only be dismissed by fixing the error.

### Root Cause
The CSS was trying to use a `border-border` class in the `@apply` directive, but this class doesn't exist in our Tailwind configuration. While we defined a `--border` CSS variable, we didn't create a corresponding Tailwind class for it.

### Resolution
1. Updated the CSS in globals.css from:
   ```css
   * {
     @apply border-border;
   }
   ```
   to:
   ```css
   * {
     @apply border-[hsl(var(--border))];
   }
   ```

2. This change uses Tailwind's arbitrary value syntax to directly apply the HSL color value from our CSS variable.

### Prevention
To prevent similar issues in the future:
1. Ensure all classes used in `@apply` directives are properly defined in the Tailwind configuration
2. Use arbitrary value syntax (`[value]`) when applying CSS variables directly
3. Consider creating explicit Tailwind classes for commonly used CSS variables

### Related Design System Decision
This issue relates to our design system implementation documented in ui_ux.md. The resolution reinforces our approach of using CSS variables for theming while ensuring proper integration with Tailwind's utility classes.

## CSS Background Class Error

### Issue Description
**Date**: [Current Date]  
**Status**: Resolved  
**Priority**: High  
**File**: src/app/globals.css

The application failed to build with the following error:

```
Syntax error: /Users/victorwilson/Desktop/projects/personal/re-portfolio-management/src/app/globals.css The `bg-background` class does not exist. If `bg-background` is a custom class, make sure it is defined within a `@layer` directive.
```

This error occurred during the build process and can only be dismissed by fixing the error.

### Root Cause
Similar to the previous border-border error, the CSS was trying to use a `bg-background` class in the `@apply` directive, but this class doesn't exist in our Tailwind configuration. While we defined a `--background` CSS variable, we didn't create a corresponding Tailwind class for it.

### Resolution
1. Updated the CSS in globals.css from:
   ```css
   body {
     @apply bg-background text-foreground;
     font-feature-settings: "rlig" 1, "calt" 1;
   }
   ```
   to:
   ```css
   body {
     @apply bg-[hsl(var(--background))] text-[hsl(var(--foreground))];
     font-feature-settings: "rlig" 1, "calt" 1;
   }
   ```

2. This change uses Tailwind's arbitrary value syntax to directly apply the HSL color values from our CSS variables.

### Prevention
To prevent similar issues in the future:
1. Use arbitrary value syntax (`[value]`) for all CSS variable references in Tailwind classes
2. Ensure consistent approach to CSS variable usage throughout the application
3. Consider creating a utility function or component to standardize the application of CSS variables

### Related Design System Decision
This issue relates to our design system implementation documented in ui_ux.md. The resolution reinforces our approach of using CSS variables for theming while ensuring proper integration with Tailwind's utility classes. We should consider updating our design system documentation to explicitly mention the use of arbitrary value syntax for CSS variables.

## React Query Client Error

### Issue Description
**Date**: [Current Date]  
**Status**: Resolved  
**Priority**: High  
**File**: src/app/hooks/useProperties.ts

The application failed with the following error:

```
Unhandled Runtime Error
Error: No QueryClient set, use QueryClientProvider to set one

Source
src/app/hooks/useProperties.ts (43:36) @ useQueryClient

  41 |
  42 | export function useProperties() {
> 43 | const queryClient = useQueryClient();
     |                                  ^
  44 |
  45 | const { data: properties, isLoading, error } = useQuery({
  46 |   queryKey: ["properties"],
```

This error occurred during runtime and prevented the application from functioning properly.

### Root Cause
The error was occurring because we were using React Query hooks (`useQueryClient` and `useQuery`) without properly setting up the `QueryClientProvider` in our application. React Query requires a `QueryClientProvider` to be present in the component tree above any components that use React Query hooks.

### Resolution
1. Updated the providers.tsx file to include both ThemeProvider and QueryClientProvider:
   ```tsx
   "use client";
   
   import { ThemeProvider } from "next-themes";
   import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
   import { useState } from "react";
   
   export default function Providers({ children }: { children: React.ReactNode }) {
     const [queryClient] = useState(() => new QueryClient());
   
     return (
       <QueryClientProvider client={queryClient}>
         <ThemeProvider
           attribute="class"
           defaultTheme="dark"
           enableSystem
           disableTransitionOnChange
         >
           {children}
         </ThemeProvider>
       </QueryClientProvider>
     );
   }
   ```

2. This change ensures that all components in the application have access to the React Query client.

### Prevention
To prevent similar issues in the future:
1. Always set up required providers at the root of the application
2. Document all required providers in the project documentation
3. Consider creating a checklist for new features that require specific providers

### Related Architectural Decision
This issue relates to our architectural decision to use React Query for data fetching. The resolution reinforces our approach of centralizing data fetching logic in custom hooks while ensuring proper provider setup for these hooks to function correctly.

## Property Form UX Issues

### Issue: Poor Property Form User Experience
- **Status:** In Progress
- **Priority:** High
- **Description:** The property entry form has several UX issues that make it difficult to use:
  - Text contrast issues: White text on white background in input fields
  - Inconsistent grid system: Form layout doesn't follow a clean, consistent grid
  - Lack of helper text and hints: No guidance for users on how to fill out the form
  - Dropdown styling issues: Property type dropdown has styling and contrast problems
  - No visual indication of required fields
  - No clear error handling or validation feedback
  - White shadowing/glow effect when opening the form
  - Property type dropdown still has poor contrast and usability
  - Entire form appears white with no proper contrast against the background
- **Impact:** Users struggle to enter property information correctly, leading to frustration and potential data entry errors
- **Solution:** Implement comprehensive form improvements including:
  - Complete overhaul of form styling using direct CSS instead of Tailwind classes
  - Fix text contrast in all input fields by using proper text color classes
  - Implement a consistent grid system for form layout
  - Add helper text and hints for each field
  - Improve dropdown styling and usability with proper contrast
  - Add visual indicators for required fields
  - Enhance error handling and validation feedback
  - Remove white shadowing/glow effect by fixing CSS classes
  - Ensure proper styling for the property type dropdown
  - Use CSS variables directly instead of Tailwind classes for better control
- **Related Components:** PropertyForm.tsx, NewPropertyPage.tsx
- **Assigned To:** UI/UX Team
- **Target Resolution:** Sprint 3

## Property Save and Display Fix

### Issue Description
**Date**: [Current Date]  
**Status**: Resolved  
**Priority**: High  
**Component**: Multiple (API, Hooks, UI)

Properties were not being saved or displayed on the dashboard after creation. This was caused by several issues:
1. In-memory storage in the API route
2. Improper cache invalidation in React Query
3. Basic error handling in the UI

### Root Cause
1. The API route was using in-memory storage (`const properties: Property[] = []`), which meant data was lost on server restart
2. The React Query cache wasn't being properly updated after property creation
3. Error handling was basic and didn't provide good feedback to users

### Resolution
1. **API Route Improvements**:
   - Implemented file-based storage for persistence
   - Added comprehensive error handling
   - Added logging for debugging
   - Prepared for future database integration

2. **React Query Improvements**:
   - Set `staleTime: 0` to always fetch fresh data
   - Added cache control headers to prevent browser caching
   - Implemented optimistic updates for better UX
   - Added proper error handling and type safety
   - Improved cache management with forced refetching
   - Added refetchOnMount and refetchOnWindowFocus options

3. **UI Improvements**:
   - Added loading spinner
   - Improved error state with retry button
   - Added empty state with call-to-action
   - Wrapped list in Card component for consistent styling

### Prevention
To prevent similar issues in the future:
1. Always implement proper error handling at all layers
2. Use optimistic updates for better UX
3. Provide clear feedback to users during loading and error states
4. Use persistent storage solutions instead of in-memory storage
5. Implement proper cache control headers for API requests
6. Configure React Query to refetch data when components mount or window regains focus

### Related Architectural Decision
This fix aligns with our architectural decisions regarding:
- Client-Server Component Architecture
- State Management with React Query
- Error Handling and User Feedback
- UI Component Consistency
- Data Persistence

### Implementation Details
1. **File-based Storage**:
   - Created a `data` directory in the project root
   - Implemented `properties.json` file for storing property data
   - Added helper functions for reading and writing to the file
   - Ensured the data directory and file exist before operations

2. **React Query Configuration**:
   - Added cache control headers to prevent browser caching
   - Set `refetchOnMount: true` to ensure fresh data when components mount
   - Set `refetchOnWindowFocus: true` to refresh data when the window regains focus
   - Implemented both optimistic updates and forced refetching for reliability

3. **Error Handling**:
   - Added comprehensive error handling in the API route
   - Improved error messages in the UI
   - Added retry functionality for failed requests

## Dashboard Metrics Fix

### Issue Description
**Date**: April 8, 2024  
**Status**: Resolved  
**Priority**: High  
**Component**: Dashboard, API

The dashboard metrics were not displaying data from the database correctly. Monthly Income, Monthly Expenses, and Monthly NOI were showing as $0 even though there were transactions in the database.

### Root Cause
1. The API routes were not handling case-insensitive comparison for transaction types
2. The API routes were not handling future dates correctly
3. The dashboard was not showing the most recent month's data when the current month had no transactions

### Resolution
1. Updated the `/api/dashboard/metrics` route to:
   - Use case-insensitive comparison for transaction types
   - Fetch the most recent month's data when the current month has no transactions
   - Properly calculate total portfolio value and monthly income

2. Updated the `/api/dashboard/monthly-income` route to:
   - Use case-insensitive comparison for transaction types
   - Fetch the most recent month's data when the current month has no transactions
   - Properly calculate monthly income, expenses, and NOI

3. Added a debug API endpoint `/api/debug/transactions` to help diagnose transaction data issues

### Prevention
To prevent similar issues in the future:
1. Always use case-insensitive comparison for string fields that might have different casing
2. Handle edge cases like future dates or missing data gracefully
3. Add proper logging to help diagnose issues
4. Create debug endpoints for troubleshooting

## Transaction Creation Error

### Issue
When attempting to create a transaction, the following error occurs:

```
src/app/transactions/components/TransactionForm.tsx (62:14) @ Object.mutationFn

  60 | if (!response.ok) {
  61 |   const errorData = await response.json();
> 62 |   throw new Error(errorData.error || 'Failed to create transaction');
     |        ^
  63 | }
  64 | 
  65 | return response.json();
```

### Root Cause
The error occurs in the transaction creation mutation function. The issue is that the API response is being parsed twice:
1. First in the error handling block: `const errorData = await response.json();`
2. Then again in the return statement: `return response.json();`

This is problematic because the response body can only be read once. After the first `response.json()` call, the response stream is consumed and cannot be read again.

### Solution
We need to modify the error handling in the transaction creation mutation to avoid parsing the response body twice. We should either:
1. Store the parsed response in a variable and reuse it, or
2. Clone the response before parsing it in the error handling block

### Implementation
We implemented the first approach by storing the parsed response in a variable and reusing it:

```tsx
const createTransaction = useMutation({
  mutationFn: async (data: TransactionFormData) => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      throw new Error(responseData.error || 'Failed to create transaction');
    }
    
    return responseData;
  },
  // ... rest of the mutation config
});
```

### Status
✅ Resolved

### Related Architectural Decision
This fix aligns with our best practices for handling API responses in React Query mutations, as documented in the documentation.md file.

## Transaction List UX Issues

### Issue: Poor Transaction List User Experience
- **Status:** In Progress
- **Priority:** High
- **Description:** The transaction list has several UX issues that make it difficult to use:
  - Lack of sorting and filtering options
  - No visual indicators for transaction types
  - No clear distinction between different transaction categories
  - Limited search functionality
- **Solution:** Implement comprehensive transaction list improvements including:
  - Add sorting and filtering options
  - Implement visual indicators for transaction types
  - Implement clear distinctions between different transaction categories
  - Enhance search functionality
- **Related Components:** TransactionList.tsx
- **Assigned To:** UI/UX Team
- **Target Resolution:** Sprint 3

## Transaction List UX Fixes

### Issue: Poor Transaction List User Experience
- **Status:** In Progress
- **Priority:** High
- **Description:** The transaction list has several UX issues that make it difficult to use:
  - Lack of sorting and filtering options
  - No visual indicators for transaction types
  - No clear distinction between different transaction categories
  - Limited search functionality
- **Solution:** Implement comprehensive transaction list improvements including:
  - Add sorting and filtering options
  - Implement visual indicators for transaction types
  - Implement clear distinctions between different transaction categories
  - Enhance search functionality
- **Related Components:** TransactionList.tsx
- **Assigned To:** UI/UX Team
- **Target Resolution:** Sprint 3

## Geocoding Implementation
- **Date**: 2024-04-08
- **Status**: Fixed
- **Description**: Added geocoding functionality using node-geocoder with OpenStreetMap provider
- **Changes Made**:
  - Created `src/lib/geocoding.ts` module
  - Implemented `geocodeAddress` function with proper error handling
  - Added TypeScript types for geocoding results
  - Fixed type issues with node-geocoder options
- **Technical Details**:
  - Using OpenStreetMap as the geocoding provider (free, no API key required)
  - Implemented null coalescing for latitude/longitude values
  - Added proper TypeScript type definitions
- **Related Components**:
  - PropertyForm.tsx
  - useDebounce.ts

## Geocoding Issues

### Server-side Geocoding Error with node-geocoder

**Issue**: The server-side geocoding functionality is failing with the error `HttpError: this.fetch is not a function`. This occurs because the `node-geocoder` library is trying to use a fetch function that doesn't exist in the server environment.

**Affected Components**:
- `src/lib/server/geocoding.ts`
- `src/app/api/properties/geocode/route.ts`

**Error Details**:
```
Server-side geocoding error: HttpError: this.fetch is not a function
    at eval (webpack-internal:///(rsc)/./node_modules/node-geocoder/lib/httpadapter/fetchadapter.js:59:15)
```

**Root Cause**:
The `node-geocoder` library's fetch adapter is not compatible with the Next.js server environment. The library is trying to use a global `fetch` function that doesn't exist in the context where the code is running.

**Solution**:
1. Replace the `node-geocoder` library with a direct implementation using the native `fetch` API
2. Create a custom geocoding function that uses the OpenStreetMap Nominatim API directly
3. Update the server-side geocoding utility to use this custom implementation

**Implementation Plan**:
1. Create a new implementation in `src/lib/server/geocoding.ts` that uses the native `fetch` API
2. Update the API routes to use this new implementation
3. Test the geocoding functionality to ensure it works correctly

**Status**: In Progress

## Resolved Issues

### Property Map Display Issues (RESOLVED)
- **Issue:** Properties were not appearing as markers on the map on the `/properties` page
- **Root Cause:** 
  1. Leaflet CSS was not being loaded correctly
  2. Marker icons were not properly initialized
  3. Icon images were not being loaded from CDN
- **Solution:**
  1. Added Leaflet CSS to root layout for consistent loading
  2. Simplified map initialization logic
  3. Explicitly defined marker icon configuration using CDN URLs
  4. Added proper error handling and logging
  5. Fixed TypeScript issues with null checks
- **Resolution Date:** [Current Date]
- **Resolution PR:** #[PR_NUMBER] - Fix property map marker display issues