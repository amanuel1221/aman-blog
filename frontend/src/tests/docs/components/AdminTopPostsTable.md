# 🧪 AdminTopPostsTable Component Test Documentation

---

## 📌 What was tested / What was done

The **AdminTopPostsTable** component renders top-performing post summaries for admin review.
It includes a responsive table layout and a mobile card view for smaller screens.

---

## 🧩 Component Overview

- Displays top posts with metrics:
  - Title
  - Views
  - Likes
  - Comments
  - Created date
- Uses responsive layout:
  - mobile cards for small screens
  - table view for `md+` screens
- Includes clickable links to post details

---

## 🧪 Features Tested

### 1. Component container

- Verified the top posts component renders
- Used `data-testid="top-posts-table"`

### 2. Post title and link

- Verified the post title text renders
- Confirmed clickable link exists
- Used `getByRole("link", { name: /view details for post .../i })`

### 3. Responsive layout support

- Verified mobile cards container exists
- Used `data-testid="top-posts-mobile-list"`
- Verified desktop table container exists
- Used `data-testid="top-posts-table-desktop"`

---

## 🔧 How I solved it

- Added stable `data-testid` targets for both mobile and desktop layouts
- Added link `aria-label` for stronger test coverage and accessibility
- Kept assertions focused on rendering and link behavior

---

## 📊 Final result

- Top posts displays correctly in both mobile and desktop contexts
- Post link works and is accessible
- Component is well-covered by tests
