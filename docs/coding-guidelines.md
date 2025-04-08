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