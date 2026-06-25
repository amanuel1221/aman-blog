# Auth Service Testing

## 🧪 What Was Tested

- User registration
- Duplicate user prevention
- User login
- Invalid email handling
- Incorrect password handling
- Password hashing and verification
- JWT token generation

---

## 🐞 Problems Encountered

### 1. Database Dependency
Service methods interact directly with the User model, requiring database operations to be mocked.

### 2. Password Hashing
`bcrypt` functions needed to be mocked to avoid real hashing during tests.

### 3. Authentication Flow
Login testing required mocking both user lookup and password comparison.

---

## 🔧 How It Was Solved

- Mocked `User.findOne()` and `User.create()` methods.
- Mocked `bcrypt.genSalt()`, `bcrypt.hash()`, and `bcrypt.compare()`.
- Added tests for successful and failed authentication scenarios.
- Verified returned user data and generated tokens.

---

## 📊 Final Result

✅ User registration tested successfully

✅ Duplicate user validation covered

✅ User login tested successfully

✅ Invalid credential scenarios tested

✅ Password hashing and verification validated

✅ JWT token generation verified

✅ All service tests passing successfully