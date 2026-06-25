# Auth Middlewares Testing (Mocked Version)

## 🧪 What Was Tested

- **Authentication Guarding (`protect`):**
  - Rejecting requests with missing cookies/tokens (`401 Unauthorized`).
  - Rejecting empty string tokens.
  - Graceful handling of missing `JWT_SECRET` environment configurations.
- **Role Authorization Guarding (`adminOnly`):**
  - Rejecting unauthenticated requests missing the user context (`401 Unauthorized`).
  - Restricting non-admin roles, alternative administrative strings like `"superadmin"`, and case-variant anomalies like `"Admin"` (`403 Forbidden`).
  - Safely bypassing valid users carrying explicit `"admin"` roles to the `next()` middleware handler.

---

## 🐞 Problems Encountered

### 1. Multi-Layered Dependency Interceptions
Mocking dynamic dependencies like `mongoose`, `jsonwebtoken`, and data models concurrently while preserving primitive schema utilities (like `Types.ObjectId`).

### 2. Strict Access Control Semantics
Ensuring that permission rules aren't bypassable via casing variations (e.g., separating `"Admin"` from `"admin"`) or alternative roles with higher structural naming properties (`"superadmin"`).

### 3. Environment Context Isolation
Preventing missing runtime environment variables (like a dropped `process.env.JWT_SECRET`) from leaking exceptions or crashing the execution cycle rather than producing handled errors.

---

## 🔧 How It Was Solved

- Leveraged `vi.mock()` alongside `vi.importActual()` to build robust partial spy stubs over `mongoose`.
- Simulated standard Express middleware lifecycle pipelines by initializing isolated spies for `req`, `res`, and `next()`.
- Guaranteed continuous state safety across tests using automated cleanup via `beforeEach` and `afterEach` configurations hook calling `vi.clearAllMocks()`.
- Implemented rigorous value checks against HTTP statuses (`401`, `403`) and targeted JSON payloads.

---

## 📊 Final Result

✅ Unauthenticated token requests intercepted and rejected

✅ Missing environmental secret errors safely managed

✅ Anonymous/Null users blocked from access tracks

✅ Role-based edge cases (`"superadmin"`, custom properties) validated

✅ String case-sensitivity constraints accurately verified

✅ Fully authenticated admin pass-through routing validated

✅ All authorization middleware tests passing successfully