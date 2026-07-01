# Testing Guide

## Overview

This project uses a layered testing approach to keep both the frontend and backend reliable as the application grows. The test suite focuses on:

- rendering and interaction behavior in the UI
- response handling and business logic in the backend
- input validation and edge cases
- regression protection for core features such as authentication, posts, comments, and contact messages

## Testing stack

The project currently uses:

- Vitest as the main test runner
- React Testing Library for frontend component and page tests
- Supertest and mocked service layers for backend controller and service tests
- Jest-style `describe`/`it`/`expect` conventions consistent with the existing suite

## Frontend and admin testing

The admin area follows the same frontend testing conventions as the rest of the application. Tests are primarily located under:

- `frontend/src/tests/pages`
- `frontend/src/tests/components`

### What these tests cover

- page rendering without crashing
- component structure and visible content
- keyboard and interaction behavior
- responsive layout expectations
- accessibility labels, roles, and semantic landmarks
- deterministic behavior through mocked data services

### Recommended patterns

- Add `data-testid` hooks to important containers, buttons, forms, and tables.
- Prefer testing user-visible behavior over implementation details.
- Mock API/service dependencies so page tests remain stable and fast.
- Cover both happy paths and error states.
- Validate that important UI elements are reachable and labeled for accessibility.

### Existing admin test files

- `frontend/src/tests/pages/AdminDashboard.test.jsx`
- `frontend/src/tests/pages/AdminPosts.test.jsx`
- `frontend/src/tests/pages/AdminMessages.test.jsx`
- `frontend/src/tests/pages/AdminAnalytics.test.jsx`
- `frontend/src/tests/pages/AdminSettings.test.jsx`
- `frontend/src/tests/components/AdminSidebar.test.jsx`
- `frontend/src/tests/components/AdminTopNavbar.test.jsx`
- `frontend/src/tests/components/AdminTopPostsTable.test.jsx`
- `frontend/src/tests/components/AdminMessagesTable.test.jsx`

### Running frontend tests

From the `frontend` folder run:

```bash
npm run test
```

To run Vitest in watch mode:

```bash
npm run test:ui
```

## Backend testing

The backend test suite is organized by responsibility and lives under `backend/src/tests`.

### Backend test structure

- `tests/controllers` for controller behavior
- `tests/services` for service-layer logic
- `tests/validators` for input validation rules
- `tests/middlewares` for authentication and request protection behavior
- `docs` for detailed documentation of each test area

### What backend tests verify

- correct HTTP status codes
- expected JSON responses
- proper service calls and payload handling
- validation failures and success cases
- edge cases such as empty results, missing records, and invalid input

### Backend test categories

1. Controller tests
   - verify that controllers return the correct response shape and status code
   - ensure successful and failed flows are handled properly

2. Service tests
   - exercise the business logic behind auth, posts, comments, and contact messages
   - confirm that data is transformed, filtered, and returned correctly

3. Validator tests
   - confirm that invalid input is rejected
   - ensure required fields, formats, and length rules behave correctly

4. Middleware tests
   - verify access control and authentication guard behavior

### Running backend tests

From the `backend` folder run:

```bash
npm run test
```

Or run once without watch mode:

```bash
npm run test-run
```

## Contact message testing

The backend test suite now includes dedicated coverage for contact message handling. These tests verify:

- contact form submission and controller responses
- service-layer behavior for creating and retrieving messages
- validator rules for required contact fields and email format
- message read/unread updates and deletion flow
- unread-count behavior

The related tests are organized under:

- `backend/src/tests/tests/controllers/contact.controller.test.js`
- `backend/src/tests/tests/services/contact.services.test.js`
- `backend/src/tests/tests/validators/contact.validators.test.js`

The accompanying documentation is stored in:

- `backend/src/tests/docs/controllers/contact.controller.md`
- `backend/src/tests/docs/services/contact.services.md`
- `backend/src/tests/docs/validations/contact.validation.md`

## Writing good tests

When adding or updating tests, keep the following in mind:

- test behavior, not implementation details
- use clear and descriptive test names
- include both positive and negative cases
- keep tests focused and maintainable
- mock only the boundaries that should be isolated, such as services or external data sources
- prefer realistic user flows over overly synthetic setups

## Accessibility and testability improvements

The admin UI has been improved with test-friendly structure and semantics, including:

- `role="main"` on primary content containers
- accessible labels for navigation and table regions
- stable `data-testid` hooks for important elements
- clearer semantic headings for page sections and cards

These improvements make the UI easier to test and improve the overall user experience.
