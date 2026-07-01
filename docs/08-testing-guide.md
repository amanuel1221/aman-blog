# Testing Guide

## Admin Dashboard and Pages

The admin area uses the same front-end test conventions as the rest of the application: Vitest with React Testing Library. Admin-specific tests are located under `frontend/src/tests/pages` and `frontend/src/tests/components`.

### Goals

- Ensure admin UI components render without crashing
- Validate responsive page structure and semantic landmarks
- Confirm `data-testid` hooks are available for key elements
- Keep admin tests stable and lightweight

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

### Recommended test patterns

- Use `data-testid` on main sections, headings, buttons, and interactive elements.
- Test both desktop and mobile-friendly rendering when layout changes are important.
- Mock data services for page tests so admin pages remain deterministic.
- Verify accessibility labels and roles for sidebar navigation and page headings.

### Running admin tests

From the `frontend` folder run:

```bash
npm run test
```

Or to run Vitest in watch mode:

```bash
npm run test:ui
```

## Admin component accessibility and SEO improvements

Admin admin components now include:

- `role="main"` for the dashboard content wrapper
- `aria-label` on navigation and table regions
- `data-testid` on key interactive elements for reliable tests
- Semantic headings for page sections and data cards

These changes help with testability and provide a more consistent admin experience.
