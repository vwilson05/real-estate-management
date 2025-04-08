<!-- File: /docs/architecture.md -->
# architecture.md

## Architectural Overview
This document details the overall architecture of the Real Estate Portfolio Tracker, a personal web app designed to manage income, expenses, taxes, repairs, rents, and more across multiple properties.

## Design Principles
- **Modularity:** Separate core functionality (data management, reporting, UI) into discrete modules.
- **Scalability:** Ensure the design accommodates future property additions or more detailed financial tracking.
- **Maintainability:** Prioritize clear code structure and thorough documentation.

## High-Level System Diagram
*(Add a diagram image or link if available)*

## Core Components
- **Frontend:** A user-friendly interface for entering and viewing property data.
- **Backend API:** Manages CRUD operations for properties, transactions, and reports.
- **Database:** Structured storage for properties, income, expenses, tax records, repairs, and rents.
- **Reporting Module:** Generates summaries and insights for portfolio performance.

## External Dependencies
List key dependencies, e.g.:
- Frameworks/libraries (React, Vue, Angular for the frontend; Node.js/Flask/Django for the backend)
- Database systems (PostgreSQL, MySQL, SQLite)
- Hosting or deployment platforms

## Architectural Decisions
| Decision ID | Description                                       | Date       | Rationale                                          |
|-------------|---------------------------------------------------|------------|----------------------------------------------------|
| AD-001      | Use a RESTful API for backend communication       | [Date]     | Widely supported; straightforward integration      |
| AD-002      | Adopt a modular design for separation of concerns | [Date]     | Simplifies future maintenance and feature expansion |