> **Central documentation for the React Blog Application testing system.**

This document explains the testing architecture, folder organization, testing philosophy, tools, best practices, and conventions used throughout the project. It serves as a reference for contributors and developers who want to understand, maintain, or extend the test suite.

---

# 📖 Table of Contents

- Overview
- Purpose
- Testing Architecture
- Folder Structure
- Testing Layers
- Testing Philosophy
- Testing Tools
- Mocking Strategy
- Coverage Goals
- Coverage Report
- Component Coverage Map
- Page Coverage Map
- Testing Workflow
- Best Practices
- Common Challenges & Solutions
- Running Tests
- Contributing
- Summary

---

# 📌 Overview

The React Blog Application follows a **behavior-driven testing approach**, focusing on how users interact with the application instead of how components are implemented internally.

The testing system is designed to be:

- Scalable
- Maintainable
- Fast
- Reliable
- Easy to understand
- Production-ready

---

# 🎯 Purpose

This document helps developers:

- Understand the overall testing architecture.
- Locate test files quickly.
- Follow consistent testing standards.
- Maintain high-quality tests.
- Add new tests using existing conventions.
- Avoid common testing mistakes.

---

# 🏗 Testing Architecture

The testing system consists of three primary layers.

```
                    User Actions
                         │
                         ▼
           React Testing Library
          (User Behavior Simulation)
                         │
     ┌────────────┬────────────┬────────────┐
     ▼            ▼            ▼
 Components     Pages      User Flows
(Unit Tests) (Integration) (Workflow Tests)
     │            │            │
     └────────────┴────────────┘
                 ▼
            Vitest Runner
                 ▼
         Coverage Reports
```

Each layer validates a different aspect of the application to provide comprehensive confidence in application behavior.

---

# 📂 Testing Folder Structure

```
src/
│
├── tests/
│   │
│   ├── pages/
│   │   ├── HomePage.test.jsx
│   │   ├── BlogPage.test.jsx
│   │   ├── ContactPage.test.jsx
│   │   └── DetailsPage.test.jsx
│   │
│   ├── components/
│   │   ├── Navbar.test.jsx
│   │   ├── Footer.test.jsx
│   │   ├── PostCard.test.jsx
│   │   ├── PostReactions.test.jsx
│   │   ├── SearchModal.test.jsx
│   │   └── CodeBlock.test.jsx
│   │
│   ├── mocks/
│   │   ├── apiMock.js
│   │   ├── authMock.js
│   │   └── postsMock.js
│   │
│   └── setup/
│       └── testSetup.js
```

Keeping tests grouped by feature makes the project easier to navigate and maintain.

---

# 🧩 Testing Layers

## 1. Component Testing (Unit Tests)

Component tests verify individual UI components in isolation.

### Examples

- Buttons
- Navigation
- Cards
- Search Modal
- Footer
- Code Block
- Reaction Buttons

### Goals

- Render correctly
- Respond to user interactions
- Validate props
- Ensure accessibility
- Verify conditional rendering

---

## 2. Page Testing (Integration Tests)

Integration tests verify that multiple components work together correctly within a page.

### Pages Covered

- Home Page
- Blog Page
- Contact Page
- Details Page

### Goals

- Correct rendering
- Navigation
- Routing
- Component interaction
- Form behavior
- Search functionality

---

## 3. User Flow Testing

These tests simulate complete user journeys.

### Example Flows

- Browse blog posts
- Search articles
- Open a post
- Like a post
- Leave comments
- Navigate between pages

### Goals

- Validate real user behavior.
- Detect integration issues.
- Ensure stable application workflows.

---

# 🎯 Testing Philosophy

The project follows the core principle of:

> **Test behavior—not implementation.**

## ❌ We Avoid Testing

- React internal state
- Private helper functions
- Component implementation details
- CSS class names
- Styling structure

These details may change during development without affecting user experience.

---

## ✅ We Test

- What users can see
- What users can click
- What users can type
- Navigation
- Form validation
- UI updates
- User interactions
- Complete workflows

---

# 🛠 Testing Tools

## ⚡ Vitest

Used as the primary testing framework.

Features:

- Fast execution
- Native mocking
- Coverage support
- Watch mode
- Snapshot support

---

## ⚛️ React Testing Library

Provides user-focused testing utilities.

Key principles:

- Accessible queries
- Real DOM rendering
- Behavior-driven testing

---

## 👤 user-event

Used for realistic user interactions.

Examples:

- Click
- Type
- Keyboard navigation
- Hover
- Tab
- Form submission

---

# 🎭 Mocking Strategy

Only external dependencies are mocked.

## ✔ Mock

- API requests
- Authentication
- Browser APIs
- Router
- External libraries

Example:

```javascript
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "1" }
  })
}));
```

## ❌ Avoid Mocking

- UI components
- Business logic
- Internal state
- Component rendering

Over-mocking reduces test reliability and hides real integration issues.

---

# 📊 Coverage Goals

| Area | Target |
|------|---------:|
| Components | 90% |
| Pages | 95% |
| User Flows | 90% |
| Overall | 90%+ |

---

# 📈 Coverage Reports

Run coverage:

```bash
npm run coverage
```

Or:

```bash
npx vitest run --coverage
```

Coverage includes:

- Statements
- Branches
- Functions
- Lines
- Uncovered code

Open the HTML report:

```
coverage/index.html
```

---

# 🧩 Component Coverage Map

Current component testing includes:

- AnimatedNumber
- ArticleShare
- AuthForm
- CodeBlock
- CommentItem
- Footer
- HomeHero
- Navbar
- NotesGrid
- PostCard
- PostComments
- PostReactions
- ReadingMode
- ReadingProgressBar
- ScrollToTopButton
- SearchModal
- TableOfContents
- WhyReadMyBlog
- CategoryFilter

Many components currently achieve **100% test coverage**, while the remaining components are covered through targeted behavior-based tests.

---

# 🏠 Page Coverage Map

## Home Page

- Hero section
- Featured posts
- Layout rendering
- Navigation

---

## Blog Page

- Search
- Filtering
- Pagination
- Post rendering

---

## Contact Page

- Form rendering
- Validation
- Submission
- Error handling

---

## Details Page

- Markdown rendering
- Reading mode
- Comments
- Reactions
- Sharing functionality

---

# 🔄 Typical Testing Workflow

When adding a new feature:

1. Create or update the component.
2. Write unit tests.
3. Add integration tests if needed.
4. Simulate user interactions.
5. Run all tests.
6. Check coverage.
7. Refactor confidently.

---

# ✅ Best Practices

- Test user behavior instead of implementation.
- Prefer `getByRole()` whenever possible.
- Use `userEvent` instead of `fireEvent`.
- Keep tests small and focused.
- Write descriptive test names.
- Mock only external dependencies.
- Avoid unnecessary snapshots.
- Keep tests independent.
- Make tests easy to read and maintain.

---

# 🐞 Common Challenges & Solutions

## Async Updates

**Problem**

UI updates asynchronously.

**Solution**

```javascript
await user.click(button);
await screen.findByText(...);
```

---

## Router Testing

**Problem**

Components require routing context.

**Solution**

```jsx
<MemoryRouter>
```

---

## Mock Timing

**Problem**

Mocks execute after imports.

**Solution**

```javascript
vi.hoisted()
```

---

## Over-Mocking

**Problem**

Tests become unrealistic.

**Solution**

Mock only external services and allow application logic to execute normally.

---

# ▶️ Running Tests

Run all tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test --watch
```

Coverage:

```bash
npm run coverage
```

Vitest directly:

```bash
npx vitest run --coverage
```

---

# 🤝 Contributing

When contributing tests:

- Follow the existing folder structure.
- Use descriptive test names.
- Keep tests behavior-focused.
- Maintain coverage goals.
- Ensure all tests pass before submitting changes.

---

# 🏁 Summary

The testing system is built to provide confidence that the application behaves correctly from a user's perspective.

It emphasizes:

- ✅ Behavior-driven testing
- ✅ Scalable architecture
- ✅ High code coverage
- ✅ Maintainable test suite
- ✅ Fast execution with Vitest
- ✅ Real user interaction testing
