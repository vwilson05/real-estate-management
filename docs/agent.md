<!-- File: /docs/.agent.md -->
# .agent.md

## Overview
This document outlines the rules and processes that the AI agent (Cursor) should always follow during development. The focus is on small, iterative development while preserving context, maintaining up-to-date documentation, and using best practices (like git branching and early commits).

## Agent Guidelines
- **Iterative Development:** Work in small, manageable increments.
- **Context Preservation:** Keep changes focused; avoid overcomplicating fixes.
- **Version Control:**
  - Adopt clear and descriptive commit messages.
  - Use a branching strategy (e.g., feature branches, hotfix branches) to isolate changes.
- **Documentation Updates:** Ensure that each code change is accompanied by updates in the corresponding md files.
- **Testing & Validation:** Run unit and integration tests early and often.

## Development Processes

### Bug Fixes
1. **Identification:** Clearly identify and document bugs in the issues file.
2. **Branching:** Create a bug-fix branch off the main or development branch.
3. **Fix & Test:** Apply iterative fixes and validate with tests.
4. **Merge:** Merge after reviews and successful tests.

### Feature Implementation
1. **Planning:** Outline requirements and design (refer to features.md and architecture.md).
2. **Incremental Changes:** Develop and commit small chunks of functionality.
3. **Integration:** Continuously integrate changes and run tests.
4. **Documentation:** Update all relevant documentation concurrently.