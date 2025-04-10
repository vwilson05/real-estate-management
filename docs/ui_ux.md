<!-- File: /docs/ui_ux.md -->
# UI/UX Guidelines

## Overview
This document outlines the design guidelines and principles for the Real Estate Portfolio Tracker's user interface and experience. The goal is to create a clean, modern, and intuitive application that supports both light and dark modes, utilizes great fonts, and delivers a phenomenal, accessible user experience.

## Design Principles

### Clean & Modern Aesthetics
- **Minimalistic Layouts:** Favor uncluttered interfaces with ample whitespace to reduce cognitive load.
- **Consistent Grid System:** Use a consistent grid or layout system to ensure uniformity across different screens.
- **Smooth Transitions:** Implement subtle animations and transitions to enhance the user experience without overwhelming the user.
- **Visual Hierarchy:** Use size, color, and spacing to create clear visual hierarchy and guide users' attention.

### Responsive & Intuitive Navigation
- **Mobile-First Design:** Ensure the interface is responsive, starting from mobile devices and scaling up.
- **Simple Navigation:** Use clear, hierarchical menus and navigation elements for easy access to major sections.
- **Call-to-Action Elements:** Design prominent and intuitive buttons for key actions.

### Light and Dark Mode
- **Theme Toggle:** Provide an accessible option to switch between light and dark modes.
- **High Contrast:** Use color palettes in both modes that meet or exceed accessibility standards (WCAG 2.1). Dark fonts on light backgrounds/light fonts on dark backgrounds. Dark mode is default.
- **Complementary Colors:** Select colors that are harmonious in both themes, enhancing readability and visual comfort.
- **Color Psychology:** Use colors strategically to convey meaning and importance:
  - Primary: Blue (#3B82F6) for main actions and brand identity
  - Success: Green (#22C55E) for positive values and actions
  - Warning: Yellow for cautionary information
  - Error: Red (#EF4444) for destructive actions and errors
  - Neutral: Gray scales for secondary information

### Typography & Iconography
- **Font Selection:** Choose clean, legible fonts (e.g., Roboto, Open Sans, or similar sans-serif fonts) that work well for both web and mobile.
- **Typographic Hierarchy:** Establish clear visual hierarchy using font sizes, weights, and spacing.
- **Consistent Icons:** Utilize icons that are stylistically consistent and intuitive, ensuring they align with the overall design language.
- **Icon Sizing:** Use larger icons (24px) for better visibility and touch targets.

### Consistent Design System
- **Reusable Components:** Develop a component library (e.g., cards, buttons, form elements) to maintain consistency.
- **Design Tokens:** Define tokens for colors, spacing, and typography to ensure uniform application of styles.
- **Style Guides:** Maintain a comprehensive style guide to help developers and designers adhere to the established UI/UX standards.
- **Component States:** Define clear states for interactive elements (hover, active, disabled).

### Accessibility & Usability
- **Accessibility Standards:** Ensure that all design choices meet accessibility guidelines (e.g., keyboard navigation, screen reader support, color contrast).
- **User Testing:** Regularly perform usability tests to validate design decisions and gather feedback.
- **Error Feedback:** Provide clear, timely feedback on user actions, including validation errors and success confirmations.

## UI Components

### Headers & Navigation
- **Navigation Bar:** A sticky header in the root layout that includes the logo, primary navigation links, and a theme toggle button.
  - **Consistent Navigation:** The navigation is defined once in the root layout (`src/app/layout.tsx`) to ensure consistency across all pages.
  - **Main Navigation Links:** Dashboard, Properties, Transactions, Repairs, and Tenants.
  - **Theme Toggle:** A button to switch between light and dark modes.
- **Breadcrumbs:** Support deeper navigation within the app to help users understand their current context.

### Forms & Inputs
- **Input Fields:** Use clearly labeled inputs with placeholders and inline validation messages.
  - **Search:** A search input component with an icon for searching properties.
- **Buttons:** Differentiate between primary, secondary, and tertiary buttons for distinct actions.
- **Interactive Elements:** Ensure that form inputs and interactive elements are accessible via keyboard and mouse.

### Data Presentation
- **Cards:** Use card components to display property summaries, transaction details, and dashboard insights.
  - **Card Structure:** Cards consist of several subcomponents:
    - `Card`: The main container with rounded corners, border, and shadow
    - `CardHeader`: Container for the card's header section
    - `CardTitle`: The main heading of the card
    - `CardDescription`: A brief description or subtitle
    - `CardContent`: The main content area of the card
    - `CardFooter`: The footer section for additional actions or information
  - **Usage Example:**
    ```tsx
    <Card>
      <CardHeader>
        <CardTitle>Property Details</CardTitle>
        <CardDescription>Overview of the property information</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Property details content */}
      </CardContent>
      <CardFooter>
        {/* Action buttons or additional info */}
      </CardFooter>
    </Card>
    ```
- **Tables & Lists:** Present data in easily readable tables or lists with options for sorting and filtering.
- **Charts & Graphs:** Use appropriate chart types for different data:
  - Area charts for trends over time
  - Donut charts for distribution data
  - Bar charts for comparisons
  - Line charts for continuous data
  - **Financial Dashboard Visualization:**
    - Income: Green bars (#22C55E) going up on the Y-axis
    - Expenses: Red bars (#EF4444) going down on the Y-axis (negative values)
    - NOI (Net Operating Income): Blue line (#3B82F6) showing the trend
    - Stacked bars for income and expenses to show the relationship
    - Interactive tooltips showing exact values
    - Month-over-month change indicators with up/down arrows and percentage values

### Visuals & Media
- **Responsive Images:** Support responsive images for property visuals and media content.
- **Charts & Graphs:** Integrate interactive data visualization tools to convey portfolio performance effectively.
- **Data Visualization:** Use color and size to highlight important data points and trends.

### User Interface Elements
- **Dropdown Menus:** Use dropdown menus for contextual actions and navigation.
  - **DropdownMenu:** A versatile dropdown menu component with various subcomponents for different menu items and actions.
- **Theme Toggle:** A button to switch between light and dark modes.
- **Avatar:** A component for displaying user avatars with fallback support.

## User Feedback & Interaction
- **Notifications:** Use in-app notifications to communicate important updates or errors to the user unobtrusively.
  - **Sonner Toast:** A lightweight toast notification library for displaying temporary messages.
    ```tsx
    import { toast } from 'sonner';
    
    // Success notification
    toast.success('Transaction added successfully');
    
    // Error notification
    toast.error('Failed to add transaction');
    
    // Info notification
    toast.info('Processing your request');
    
    // Warning notification
    toast.warning('Please review your input');
    ```
    Features:
    - Lightweight and performant
    - Customizable styling
    - Multiple toast types (success, error, info, warning)
    - Automatic dismissal
    - Stacking and queuing
    - Keyboard navigation support
    - Accessible by default
    - Consistent with theme
    - Error boundary integration
    - Form validation feedback
- **Modals & Overlays:** Utilize modals for additional details without disrupting the main workflow.
  - **AlertDialog:** For confirmations and important actions
  - **Dialog:** For forms and detailed information
  - **Sheet:** For mobile-friendly side panels
- **Feedback Animations:** Introduce subtle animations that provide feedback on user interactions (e.g., hover effects, button clicks).
- **Loading States:** Show loading indicators during data fetching and form submissions.
- **Error States:** Display clear error messages with recovery options.

## Form Components

### Label
The Label component is a form control that provides an accessible label for form elements. It uses Radix UI's label primitive and supports all standard HTML label attributes.

```tsx
import { Label } from "@/components/ui/label"

// Usage example
<Label htmlFor="email">Email</Label>
```

Features:
- Accessible by default
- Supports HTML label attributes
- Styled with Tailwind CSS
- Responsive and customizable
- Supports disabled states
- Required field indication
- Error state styling

### Select
The Select component provides a customizable dropdown menu for selecting options. It's built on top of Radix UI's select primitive and supports keyboard navigation, screen readers, and custom styling.

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Usage example
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

Features:
- Accessible by default (ARIA compliant)
- Keyboard navigation support
- Custom styling with Tailwind CSS
- Support for groups and separators
- Scroll buttons for long lists
- Customizable trigger and content
- Support for disabled states
- Animated transitions
- Error state handling
- Required field indication

### DatePicker
The DatePicker component provides a user-friendly interface for selecting dates. It's built on top of the native date input with additional styling and validation.

```tsx
import { DatePicker } from "@/components/ui/date-picker"

// Usage example
<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select a date"
/>
```

Features:
- Native date input integration
- Consistent styling with theme
- Validation support
- Error state handling
- Required field indication
- Disabled state support
- Placeholder text
- Custom date format

### Map
The Map component displays property locations using Leaflet and OpenStreetMap. It handles missing coordinates gracefully and provides a consistent user experience.

```tsx
import { PropertyMap } from "@/components/properties/PropertyMap"

// Usage example
<PropertyMap
  properties={properties}
  center={defaultCenter}
  zoom={defaultZoom}
/>
```

Features:
- Interactive map display
- Property markers with popups
- Graceful handling of missing coordinates
- Responsive design
- Theme-aware styling
- Loading state
- Error state with fallback
- Custom marker icons
- Cluster support for multiple properties

### IssueList
The IssueList component displays issues in a table format with status badges and priority indicators.

```tsx
import { IssueList } from "@/components/issues/IssueList"

// Usage example
<IssueList
  issues={issues}
  onStatusChange={handleStatusChange}
/>
```

Features:
- Tabular data presentation
- Status badges with color coding
- Priority indicators
- Sorting and filtering
- Pagination
- Responsive design
- Loading state
- Error state
- Empty state
- Action buttons
- Row selection
- Bulk actions

### Dashboard Components
The dashboard components provide an overview of the portfolio's performance and key metrics.

#### Overview
The Overview component displays financial metrics and charts for the portfolio.

```tsx
import { Overview } from "@/components/dashboard/overview"

// Usage example
<Overview />
```

Features:
- Monthly income, expenses, and NOI cards
- Month-over-month change indicators with up/down arrows
- Year-to-date totals
- Financial chart with:
  - Income as green bars going up
  - Expenses as red bars going down
  - NOI as a blue line showing the trend
- Interactive tooltips
- Responsive design
- Loading state
- Error state
- Empty state

#### RecentTransactions
The RecentTransactions component displays a list of recent transactions.

```tsx
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

// Usage example
<RecentTransactions />
```

Features:
- List of recent transactions
- Transaction type indicators
- Amount formatting
- Date formatting
- Property association
- Category display
- Description display
- Responsive design
- Loading state
- Error state
- Empty state
- View all link

#### ActiveRepairs
The ActiveRepairs component displays a list of active repairs.

```tsx
import { ActiveRepairs } from "@/components/dashboard/active-repairs"

// Usage example
<ActiveRepairs />
```

Features:
- List of active repairs
- Status badges
- Cost formatting
- Estimated completion date
- Property association
- Item description
- Location display
- Responsive design
- Loading state
- Error state
- Empty state

#### ActiveIssues
The ActiveIssues component displays a list of active issues.

```tsx
import { ActiveIssues } from "@/components/dashboard/active-issues"

// Usage example
<ActiveIssues />
```

Features:
- List of active issues
- Status badges
- Priority indicators
- Due date display
- Property association
- Issue description
- Responsive design
- Loading state
- Error state
- Empty state
- View all link

## Prototyping & Tools
- **High-Fidelity Prototypes:** Utilize design tools like Figma, Sketch, or Adobe XD for creating detailed prototypes.
- **Wireframing:** Develop wireframes to map out user journeys and validate layouts before moving to full design.
- **User Journey Mapping:** Create user journey maps to understand and optimize the interactions across the app.

## Implementation Considerations
- **CSS Frameworks:** Use Tailwind CSS for utility-first styling and theme support.
- **Component Libraries:** Leverage Tremor for data visualization and UI components.
- **Decoupled UI Layer:** Ensure the UI layer is separated from business logic, allowing for easier updates and maintenance.
- **Theme Implementation:** Use CSS variables with HSL values for consistent theming across the application.
- **Border Styling:** The `border-border` class is used to apply the theme's border color to elements. This is defined in the Tailwind configuration and uses the CSS variable `--border` for consistent styling across light and dark modes.
- **Component Architecture:** Follow a modular approach with components organized by functionality:
  - UI components in `src/components/ui/`
  - Feature-specific components in `src/components/[feature]/`
  - Layout components in `src/components/layout/`
- **React Hooks:** Use React hooks like `useState` and `useEffect` for managing component state and side effects.
- **Next.js Integration:** Leverage Next.js features like client-side navigation and server-side rendering for optimal performance.

## Final Thoughts
Focus on continuous improvement by gathering user feedback, analyzing usage patterns, and iterating on the design to ensure that the final product remains clean, modern, and exceptionally intuitive.

## Mobile Responsiveness

The application is designed to be fully responsive and provide a great user experience across all device sizes:

### Navigation
- Desktop: Full navigation menu visible in the header
- Mobile: Hamburger menu with collapsible navigation
- Smooth transitions between mobile and desktop views

### Dashboard
- Cards: Responsive grid layout (1 column on mobile, 2 columns on tablet, 3 columns on desktop)
- Charts: Horizontally scrollable on mobile with minimum width to ensure readability
- All data visualizations maintain clarity across screen sizes

### General Layout
- Fluid container widths with appropriate padding
- Responsive typography that scales with viewport
- Touch-friendly interactive elements
- Proper spacing and margins for mobile viewing

### Best Practices
- Mobile-first approach to layout and design
- Touch targets are appropriately sized (minimum 44x44px)
- Content is readable without zooming
- No horizontal scrolling on main content (except for specific data visualizations)