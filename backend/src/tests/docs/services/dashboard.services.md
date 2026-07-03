# 📊 Admin Dashboard Service Testing (Mocked Version)

This document explains the unit tests written for the **Admin Dashboard Service layer** using **Vitest** with fully mocked MongoDB models.

---

## 🧪 What Was Tested

The following service functions were tested:

- 📈 `getDashboardStats`
- 🔥 `getTopPosts`
- 💬 `getRecentMessages`
- 📊 `getEngagementBreakdown`
- 📅 `getMonthlyActivity`
- 👥 `getUsers`

---

## 🧠 Testing Strategy

All database interactions were **fully mocked** using `vi.fn()` to avoid real MongoDB calls.

We isolated service logic by mocking:

- `Post` model
- `User` model
- `ContactMessage` model

This ensures:
- Fast execution ⚡
- Deterministic results 🎯
- No database dependency 🛑

---

## 🧪 Mock Setup

```js
Post.find = vi.fn();
Post.countDocuments = vi.fn();
Post.aggregate = vi.fn();

User.countDocuments = vi.fn();
User.find = vi.fn();

ContactMessage.countDocuments = vi.fn();
ContactMessage.find = vi.fn();