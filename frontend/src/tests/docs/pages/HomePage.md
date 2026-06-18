# 🧪 HomePage Component Test Documentation

---

## 📌 What was tested / What was done

The **HomePage component** is the main landing page of the blog application.  
It combines multiple sections like hero content, learning sections, and latest blog posts.

---

## 🧩 Component Overview

- Displays landing page UI for the blog platform
- Shows:
  - Hero section (`HomeHero`)
  - Writing topics (`WhatIWriteAbout`)
  - Development journey section
  - Blog motivation section
  - Latest blog posts (from mock data)
- Uses routing with `react-router-dom`
- Fetches and sorts posts from `mockPosts`

---

## 🧪 Features Tested

---

## 1. 🏠 Page Rendering (Structure + Visible UI)

### ✔ What was tested

- Page renders without crashing
- Main wrapper exists

### ✔ Assertions used

- `getByTestId("home-page")`
- `getByText("Latest Articles")`
- `getByText("Recent Blog Posts")`

### ✔ Expected result

- Home page UI is visible
- Title and section headers are correctly rendered

---

## 2. 📰 Latest Articles Section

### ✔ What was tested

- Latest posts section renders correctly
- Only **3 latest posts** are shown

### ✔ Assertions used

- `getByTestId("home-page-latest-articles")`
- `getAllByTestId("post-card")`

### ✔ Logic tested

- Posts are sorted by date
- Only top 3 are displayed

### ✔ Expected result

- Exactly **3 PostCard components** rendered

---

## 3. 🔗 Navigation Links

### ✔ What was tested

- “View All” link is visible (desktop)
- “View All Articles” link is visible (mobile)

### ✔ Assertions used

- `getByTestId("home-page-view-all-articles")`
- `getByTestId("home-page-view-all-articles-mobile")`

### ✔ Expected result

- Links exist and point to `/blogs`

---

## 4. 🧱 Component Composition

### ✔ What was tested

- All child components render correctly:
  - `HomeHero`
  - `WhatIWriteAbout`
  - `DevelopmentJourney`
  - `WhyReadMyBlog`

### ✔ Assertions used

- `getByTestId("home-page")`

### ✔ Expected result

- Full homepage layout renders all sections

---

## 5. 📦 Posts Rendering Logic

### ✔ What was tested

- Posts are sorted correctly by date
- Only latest 3 posts are shown

### ✔ Expected behavior

- Newest posts appear first
- Older posts are excluded

---

## 🐞 Problems encountered

---

### 1. Missing Test IDs in UI sections

- Some UI sections required `data-testid`
- Without them, tests fail for structure validation

---

### 2. Sorting logic confusion

- Initial issue: incorrect order of posts in test
- Cause: date comparison not properly mocked

---

### 3. Component isolation

- Child components needed to be mocked in some cases
- Without mocks, tests became too heavy

---

## 🔧 How it was solved

---

### ✔ 1. Added stable test IDs

Used:

```jsx
data-testid="home-page-latest-articles"
data-testid="home-page-latest-posts"
data-testid="home-page-view-all-articles"
✔ 2. Used visible text testing (getByText)

Instead of overusing test IDs:

screen.getByText("Latest Articles")
screen.getByText("Recent Blog Posts")
✔ 3. Verified logic separately
Sorting tested via mock data
Slice logic verified for top 3 posts
📊 Final Result
✅ All tests passed successfully

✔ HomePage renders correctly
✔ All sections appear as expected
✔ Latest posts show only 3 items
✔ Navigation links work
✔ UI text is correctly visible
✔ Layout structure is stable
