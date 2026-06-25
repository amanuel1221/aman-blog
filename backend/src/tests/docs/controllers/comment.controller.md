# Comment Controller Testing

## 🧪 What Was Tested

- Create a new comment
- Get comments for a post
- Update an existing comment
- Delete a comment
- Like a comment
- Dislike a comment
- Error handling and authorization checks

---

## 🐞 Problems Encountered

### 1. Mocking Service Methods
Controller tests depend on service functions, so each service method needed to be mocked correctly.

### 2. Authorization Scenarios
Update and delete actions required testing both authorized and unauthorized users.

### 3. Response Validation
Needed to verify that controllers returned the correct status codes and response messages.

---

## 🔧 How It Was Solved

- Used `vi.spyOn()` to mock all comment service methods.
- Added separate tests for success and failure scenarios.
- Verified service calls, HTTP status codes, and JSON responses.
- Tested authorization errors for update and delete operations.

---

## 📊 Final Result

✅ Comment creation tested successfully

✅ Comment retrieval tested successfully

✅ Comment update and delete tested

✅ Like and dislike functionality tested

✅ Authorization checks covered

✅ Error handling verified

✅ All controller tests passing successfully