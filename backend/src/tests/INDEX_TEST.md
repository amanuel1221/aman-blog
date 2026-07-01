# Backend Test Index

This file is the central guide for the backend test suite in this project. It helps developers quickly understand what is tested, where the tests live, and how to run them.

---

## Overview

The backend test suite is designed to verify the main application logic for authentication, posts, comments, contact messages, validation, and middleware behavior. The tests aim to ensure that the backend remains reliable as features are added or changed.

---

## Purpose

This index helps developers:

- find the relevant test files quickly
- understand the structure of the test suite
- know which parts of the backend are covered
- run tests using the correct commands
- extend the tests in a consistent way

---

## Test Structure

The test suite is organized into these main folders:

- `docs/` - documentation and notes related to tests
- `setup/` - shared setup helpers for tests
- `tests/` - the actual test files
  - `controllers/` - controller tests
  - `middlewares/` - middleware tests
  - `services/` - service-layer tests
  - `validators/` - validation tests

---

## Covered Areas

### 1. Controller Tests
These tests check whether controllers:

- return the correct status code
- return the expected JSON response
- handle success and failure cases properly
- call the right service methods

### 2. Service Tests
These tests validate the core business logic for:

- user registration
- user login
- post-related behavior
- comment-related behavior
- contact message creation and retrieval

### 3. Middleware Tests
These tests verify that authentication and request protection logic behave correctly.

### 4. Validator Tests
These tests confirm that invalid input is rejected and valid input is accepted, including contact form submissions.

---

## Test Tools

The backend tests use:

- Vitest as the main test runner
- Supertest for HTTP-related testing support
- mocked dependencies for isolated unit tests

---

## Running Tests

From the backend folder, use:

```bash
npm run test
```

To run once without watch mode:

```bash
npm run test-run
```

To watch for changes:

```bash
npm run test:watch
```

---

## Notes for Contributors

When adding new tests:

- keep them focused on behavior
- use clear test names
- cover both success and failure cases
- avoid testing implementation details unnecessarily
- group new tests in the appropriate folder

---

## Summary

The backend test suite provides a solid foundation for verifying the most important server-side behaviors of the application. It is organized, readable, and ready to grow as the project expands.
