<!-- File: /docs/issues.md -->
# Issues & Tracking

## Current Issues

### High Priority
1. **Database Setup**
   - Status: Resolved
   - Description: Initial database setup and schema implementation
   - Resolution: Implemented Prisma schema with SQLite

2. **Project Structure**
   - Status: Resolved
   - Description: Establish proper Next.js project structure
   - Resolution: Created organized directory structure with proper separation of concerns

### Medium Priority
1. **API Implementation**
   - Status: In Progress
   - Description: Need to implement CRUD operations for all entities
   - Next Steps:
     - Create API routes for properties
     - Implement proper error handling
     - Add request validation

2. **Form Validation**
   - Status: Pending
   - Description: Implement comprehensive form validation
   - Next Steps:
     - Set up Zod schemas
     - Integrate with React Hook Form
     - Add error messages

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

2. **Module Import Error in PropertyList Component**
   - Description: Can't resolve '../../../hooks/useProperties'
   - Resolution: Updated import path to '../../hooks/useProperties'
   - Status: Resolved

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
   - Resolution: Created useTransactions hook with mock data and proper TypeScript types
   - Status: Resolved

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