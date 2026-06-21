# 🧪 What I tested / What was done

## PostReactions Component Tests

### Component Overview:

PostReactions is an interactive feedback component for blog posts

It allows users to:
- Like an article
- Dislike an article
- Toggle reactions (like ↔ remove like, dislike ↔ replace like)
- Prevent reactions when user is not authenticated

It integrates with:
- `AuthContext` for user authentication
- Local state for reaction tracking

---

## Main Features Tested:

### 1. Component Rendering

- Component renders correctly with valid props  
- Main container is present in DOM  
- Displays prompt text:
  - "Was this article helpful?"  
- Ensures UI loads without crashing  

---

### 2. Initial Like & Dislike Counts

- Component correctly displays initial reaction counts:
  - Likes count reflects `initialLikes` array length  
  - Dislikes count reflects `initialDislikes` array length  
- Ensures accurate state initialization  
- Data is properly derived from props  

---

### 3. Like Functionality (Add Like)

- Clicking like button increases like count  
- New like is reflected in UI immediately  
- Ensures state updates correctly on interaction  
- Validates user interaction flow  

---

### 4. Like Toggle Functionality (Remove Like)

- Clicking like when already liked removes reaction  
- Like count decreases to `0` when user toggles off  
- Ensures toggle behavior works correctly  
- Confirms idempotent reaction handling  

---

### 5. Dislike Functionality (With Like Removal)

- Clicking dislike adds dislike reaction  
- Existing like is removed when dislike is selected  
- Ensures mutual exclusivity between like/dislike  
- Prevents conflicting reactions from same user  

---

### 6. Authentication Protection

- When user is NOT logged in:
  - Clicking like triggers alert  
  - Alert message: `"Please login to react"`  
- Ensures unauthorized users cannot interact  
- Validates authentication guard logic  

---

### 7. AuthContext Mocking

- `useAuth` hook is successfully mocked  
- Allows controlled testing of user state:
  - Logged in user  
  - Logged out user  
- Ensures predictable test environment  

---

# 🐞 Problems I encountered

### 1. AuthContext Dependency

- Issue: Component depends on external `useAuth` context  
- Error: Tests failing due to missing provider  
- Root Cause: AuthContext not available in test environment  

---

### 2. Button Selection Ambiguity

- Issue: Using `getAllByRole("button")`  
- Error: Risk of selecting wrong button index  
- Root Cause: No unique test identifiers for buttons  

---

### 3. State Update Validation

- Issue: Verifying updated like/dislike counts  
- Error: DOM not updating immediately in some assertions  
- Root Cause: React state updates are asynchronous  

---

# 🔧 How I solved it

### 1. Context Mocking Strategy

- Mocked AuthContext properly:

```js id="authmock1"
vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));
Controlled user state per test:
Logged-in user
Null user (unauthenticated)
2. Controlled User State Per Test
Used:
useAuth.mockReturnValue({ user: mockUser });
Ensured predictable behavior in each test case
Avoided dependency on real authentication system
3. Event Simulation
Used fireEvent.click() for user interactions
Simulated:
Like button clicks
Dislike button clicks
Ensured realistic user behavior testing
4. Alert Handling Mocking
Mocked browser alert:
vi.spyOn(window, "alert").mockImplementation(() => {});
Verified unauthorized interaction handling
Ensured alert is triggered correctly
5. Reaction Logic Validation
Tested full reaction flow:
Like → Dislike switch
Toggle like off
Mutual exclusivity
Ensured business logic correctness
6. Careful DOM Assertions
Validated:
Reaction counts
Button interactions
UI updates after state change
Used text-based assertions for reliability
📌 Key Lesson
Always mock external contexts (Auth, API, stores)
Avoid relying on button order (getAllByRole) → prefer data-testid
Test behavior flow, not just individual clicks
Ensure state-driven UI updates are validated properly
Handle authentication logic separately in tests
📊 Final result
All tests passed successfully
PostReactions renders correctly
Like/dislike functionality works as expected
Toggle behavior verified
Authentication guard validated
Context mocking successful
All interaction flows tested
All test cases pass without errors