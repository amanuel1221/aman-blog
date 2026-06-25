# Auth Controller Testing

## 🧪 What Was Tested

* User registration
* User login
* User logout
* Fetching user profile
* Getting authenticated user data
* Success and error responses

---

## 🐞 Problems Encountered

### 1. Mock Functions Not Being Called

Some tests failed because service methods were not mocked correctly before importing the controller.

### 2. Test Timeouts

A few tests were hanging because mocked promises were missing or not resolving properly.

### 3. Response Assertions

Some expected status codes and response messages did not match the actual controller implementation.

---

## 🔧 How It Was Solved

* Mocked all service functions before loading controllers.
* Used `mockResolvedValue()` and `mockRejectedValue()` for async operations.
* Updated assertions to match actual controller responses.
* Cleared and restored mocks after each test.

---

## 📊 Final Result

✅ Register controller tested

✅ Login controller tested

✅ Logout controller tested

✅ Get profile controller tested

✅ Get current user controller tested

✅ Success and failure scenarios covered

✅ All controller tests passing successfully
