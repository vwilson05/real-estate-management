<!-- File: /docs/documentation.md -->
# documentation.md

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