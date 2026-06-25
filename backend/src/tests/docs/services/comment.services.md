# Comment services Testing (Mocked Version)

## 🧪 What Was Tested

- Creating a comment
- Fetching comments by post
- Updating comments
- Deleting comments
- Liking a comment
- Disliking a comment
- Empty and error scenarios

---

## 🐞 Problems Encountered

### 1. Manual Mock Setup
Services were manually mocked which required careful reset between tests.

### 2. Authorization Handling
Some tests needed correct simulation of “owner vs non-owner” behavior.

### 3. Edge Cases
Empty comments and error responses needed separate assertions.

---

## 🔧 How It Was Solved

- Used `vi.mock()` to mock the entire comment service layer.
- Replaced service methods with `vi.fn()` for full control.
- Reset mocks using `vi.clearAllMocks()` in `beforeEach`.
- Tested both success and failure flows per controller function.

---

## 📊 Final Result

✅ Comment creation tested successfully

✅ Comment retrieval tested successfully

✅ Comment update and delete tested

✅ Like / dislike functionality tested

✅ Error handling covered

✅ Empty response cases tested

✅ All controller tests passing successfully
```