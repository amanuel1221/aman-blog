# 🧪 What I Tested / What Was Done

---

## 📄 BlogsPage Component Tests

### 🧩 Component Overview

The `BlogsPage` component is the main blog listing page that:

- Displays all blog posts
- Supports category-based filtering
- Implements pagination (6 posts per page)
- Integrates a search modal system
- Uses React state management and responsive UI design

---

## 🚀 Main Features Tested

---

## 1. 🏗️ Page Rendering & Structure

- Page header renders correctly
- Title is displayed properly
- Description is visible
- Featured articles section exists in DOM

✔ Ensures the base UI structure is stable and consistent

---

## 2. 📊 Article & Category Statistics

- Total article count displays correctly (**8 posts**)
- Category count shows correct unique categories (**2 categories: React, Node**)
- Statistics update dynamically based on filters

✔ Ensures computed values from data are correct

---

## 3. 🏷️ Category Filtering

- All categories render correctly
- Clicking **React** filters posts → shows 4 posts
- Clicking **Node** filters posts → shows 4 posts
- Category change resets pagination to page 1

✔ Ensures filtering logic and state updates work correctly

---

## 4. 📑 Pagination Functionality

- First page shows **6 posts (default limit)**
- Pagination controls render properly
- Next page navigation works correctly
- Posts change when navigating pages

✔ Ensures pagination slicing and navigation logic is correct

---

## 5. 🔍 Search Modal Integration

- Search button renders correctly
- Clicking button opens modal
- Modal appears when `open = true`
- Modal content renders correctly

✔ Ensures UI interaction with modal system works

---

## 6. 🚫 Edge Cases & UI States

- Empty state renders safely when no posts exist
- Category switching does not break UI
- Featured section always remains stable
- Handles dynamic post counts properly

✔ Ensures robustness under different data conditions

---

# 🐞 Problems I Encountered

---

## 1. 📦 Mock Data Hoisting Issue

### ❌ Issue:
Mock posts were undefined during module import.

### 📌 Cause:
`vi.mock()` executed before mock data was available.

### 💥 Error:
Component received undefined posts.

---

## 2. 🧱 Child Component Mocking Complexity

### ❌ Issue:
`PostCard` and `SearchModal` were breaking tests.

### 📌 Cause:
Real components had extra dependencies and UI logic.

### 💥 Error:
Unstable rendering and unpredictable test output.

---

## 3. 🧠 Category Filter State Bug

### ❌ Issue:
Pagination did not reset after category change.

### 📌 Cause:
State updates were not synchronized correctly.

### 💥 Result:
Wrong page content after filtering.

---

## 4. 📊 Post Count Mismatch

### ❌ Issue:
Expected number of posts did not match rendered results.

### 📌 Cause:
Misunderstanding of mock dataset structure and filtering logic.

---

# 🔧 How I Solved It

---

## 1. ⚙️ Used `vi.hoisted()` for Mock Data

Ensured data is available before mocking modules:

```js
const mockPosts = vi.hoisted(() =>
  Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1}`,
    category: i % 2 === 0 ? "React" : "Node",
    date: `2025-01-${String(i + 1).padStart(2, "0")}`,
  }))
);

✔ Fixed module import timing issues

2. 🧩 Mocked Child Components
PostCard Mock
vi.mock("../../components/PostCard", () => ({
  default: ({ post }) => <div data-testid="post-card">{post.title}</div>,
}));
SearchModal Mock
vi.mock("../../components/SearchModal", () => ({
  default: ({ open }) =>
    open ? <div data-testid="search-modal">Search Open</div> : null,
}));

✔ Simplified testing scope and isolated logic

3. 🧪 Built Complete Test Coverage
Rendering tests
Filtering tests
Pagination tests
Modal tests
Edge case tests

✔ Ensured full user flow coverage

4. 🔄 Fixed State Behavior
Verified pagination resets on category change
Verified correct filtering results
Ensured UI updates correctly after state changes

✔ Improved reliability of UI behavior

📊 Final Result
✅ All Tests Passed Successfully
Verified Behaviors:
Page renders correctly (header, title, description)
Article count is accurate (8 posts)
Category count is correct (2 categories)
Pagination shows 6 posts per page
Category filtering works correctly (React / Node)
Pagination navigation changes posts correctly
Search modal opens and renders properly
Pagination controls exist and function correctly