<!-- File: /docs/coding_guidelines.md -->
# coding_guidelines.md

## Overview
These guidelines ensure consistency, clarity, and maintainability throughout the project.

## Code Style
- **Indentation:** Use 2 or 4 spaces consistently per indentation level.
- **Naming Conventions:** 
  - Variables and functions: camelCase or snake_case (choose one and stick to it).
  - Classes: PascalCase.
- **Commenting:** 
  - Use inline comments sparingly.
  - Write meaningful block comments to describe complex logic.
- **Formatting:** Follow the standard style guide for your chosen language (e.g., PEP8 for Python, Airbnb style for JavaScript).

## Version Control
- **Commit Messages:** Write clear, actionable commit messages.
- **Branching Strategy:** 
  - Use feature branches.
  - Commit early and often.
  - Merge only after thorough code review and testing.

## Testing
- **Unit Testing:** Write tests for critical functions and modules.
- **Integration Testing:** Verify that combined components interact correctly.
- **Documentation:** Ensure that test cases and their usage are clearly documented.

## React Component Guidelines

1. **Component Structure**
   ```tsx
   "use client"; // For client-side components
   
   import * as React from "react";
   import { cn } from "@/lib/utils";
   
   interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
     // Custom props
   }
   
   export function Component({ className, ...props }: ComponentProps) {
     return (
       <div className={cn("base-styles", className)} {...props}>
         {/* Component content */}
       </div>
     );
   }
   ```

2. **Component Organization**
   - Place UI components in `src/components/ui/`
   - Place feature-specific components in `src/components/[feature]/`
   - Place layout components in `src/components/layout/`

3. **Component Naming**
   - Use PascalCase for component names
   - Use descriptive names that reflect the component's purpose
   - Suffix with the component type (e.g., Button, Card, Modal)

4. **Props Handling**
   - Use TypeScript interfaces for props
   - Extend from React's built-in types when appropriate
   - Use destructuring for cleaner code
   - Provide default values when necessary

## Hooks Guidelines

1. **Custom Hook Structure**
   ```typescript
   export function use[Feature]() {
     const [data, setData] = useState<Type[]>([]);
     const [isLoading, setIsLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);
     
     // ... implementation
     
     return { data, isLoading, error };
   }
   ```

2. **Hook Naming**
   - Use camelCase
   - Prefix with 'use'
   - Name should reflect the data or functionality it provides

3. **Error Handling**
   - Always include error state
   - Provide meaningful error messages
   - Handle both API and runtime errors

4. **React Hooks Usage**
   - Import hooks from React: `import { useState, useEffect } from "react";`
   - Use hooks at the top level of components
   - Don't use hooks inside loops, conditions, or nested functions
   - Use the dependency array in useEffect to control when effects run

## TypeScript Guidelines

1. **Type Definitions**
   - Place shared interfaces in `/types` directory
   - Use descriptive names
   - Include JSDoc comments for complex types

2. **Type Usage**
   - Avoid using `any`
   - Prefer interfaces over type aliases for objects
   - Use union types for fixed sets of values

3. **Type Safety**
   - Enable strict mode in tsconfig.json
   - Use proper type assertions
   - Maintain type consistency across components

4. **Component Types**
   - Use React.forwardRef for components that need to forward refs
   - Define proper prop types for all components
   - Use generics when components need to work with different types