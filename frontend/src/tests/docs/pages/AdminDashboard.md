# 🧪 AdminDashboard Page Test Documentation

---

## 📌 What was tested / What was done

The **AdminDashboard** page loads dashboard data and renders admin analytics, stats, top posts, and messages.
It supports asynchronous data fetching and displays a loading state before content appears.

---

## 🧩 Page Overview

- Fetches dashboard data from `getDashboardData`
- Renders:
  - statistics cards
  - analytics charts
  - top posts table
  - recent messages list
- Includes loading state while data is fetched

---

## 🧪 Features Tested

### 1. Loading state

- Verified dashboard shows a loader before data appears
- Used `screen.getByText(/loading dashboard/i)`

### 2. Data rendering

- Mocked `getDashboardData` with test payload
- Verified dashboard page renders after load
- Used `data-testid="admin-dashboard-page"`

### 3. Content coverage

- Confirmed page heading renders:
  - `Dashboard Overview`
- Confirmed statistics section exists
- Confirmed analytics headings render:
  - `Top Performing Posts`
  - `Contact Messages`

---

## 🔧 How I solved it

- Mocked the dashboard service with `vi.mock()`
- Waited for content to render using `waitFor`
- Verified key sections using text and test ID queries

---

## 📊 Final result

- Admin dashboard data loads correctly
- Page displays all major dashboard sections
- Loading state and final content are tested clearly
