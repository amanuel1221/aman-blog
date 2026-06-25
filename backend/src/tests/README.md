# Backend Test Suite Documentation

This folder contains the backend testing setup for the blog application. It is organized to make the test suite easy to understand, extend, and maintain as the project grows.

## What this folder contains

The tests in this folder focus on the core backend features of the application, especially:

- Authentication flow
- Post management
- Comment management
- Input validation
- Middleware behavior

The goal is to verify that the backend logic behaves correctly and that key edge cases are covered.

## Folder structure

- `docs/` - documentation and notes for the test suite, including controller, middleware, service, and validation references
- `setup/` - reserved for shared test setup files and future helpers
- `tests/` - actual test files grouped by area
  - `controllers/` - tests for controller logic
  - `middlewares/` - tests for authentication and request handling middleware
  - `services/` - tests for business logic and service-layer behavior
  - `validators/` - tests for request validation rules
  - `setup.js` - shared Vitest setup that clears mocks between tests

## What has been covered

### 1. Controller tests
Tests are written for the main controllers to verify that they:

- return the correct status codes
- return the expected JSON responses
- handle successful and failed operations correctly
- call the appropriate service methods

### 2. Service tests
Service-layer tests validate the core business logic for:

- user registration
- user login
- post-related operations
- comment-related operations

These tests check that the service behaves correctly for both happy paths and common failure cases.

### 3. Middleware tests
Middleware tests ensure that authentication and access control logic behave as expected, especially when requests are missing or invalid credentials.

### 4. Validator tests
Validation tests cover the request validation rules for authentication and other input handling. They confirm that:

- valid data is accepted
- missing fields are rejected
- invalid email formats are rejected
- password strength rules are enforced

## Testing tools

The backend test suite uses:

- Vitest for test execution
- Supertest for HTTP-level testing support
- mocked dependencies for isolated unit testing

## How to run the tests

From the backend folder, run:

```bash
npm run test
```

To run the tests once without watch mode:

```bash
npm run test-run
```

To keep Vitest watching for changes:

```bash
npm run test:watch
```

## Notes about the current test approach

The current tests are focused on correctness and reliability. They are designed to:

- verify expected behavior clearly
- isolate logic from external systems where possible
- make future refactoring safer
- provide a strong foundation for adding more coverage later

## Recommended next steps

To make this test suite even stronger, the next improvements would be include:

- adding more edge-case tests for posts and comments
- expanding middleware coverage for authorization rules
- adding integration tests with a test database
- increasing coverage for error handling and unexpected inputs
- test the entire flow wiht super test and integration test 


