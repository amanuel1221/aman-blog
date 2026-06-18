# 🧪 What I tested / What was done

## PostComments Component Tests

---

## Component Overview:

PostComments is a blog comment system that allows:

- Viewing comments per post
- Adding root comments
- Replying to comments
- Authentication-based restrictions
- Empty state handling

It uses:
- `useAuth()` context for authentication
- `mockComments` as initial dataset
- Local React state for comment updates

---

## Main Features Tested:

### 1. Component Rendering

- PostComments renders correctly
- Main container exists in DOM
- Component loads without crashing
- `post-comments` test id is present

---

### 2. Comment Count Display

- Comment counter renders correctly
- Displays total number of responses
- Uses `allComments.length` for accuracy

---

### 3. Authentication Warning

- When user is NOT logged in:
  - Warning message is shown
  - Message: "Sign in to leave comments and participate in discussions."
- Ensures proper UX for guests

---

### 4. Empty State Handling

- When no comments exist:
  - Empty state message is displayed
- Message:
  - "No thoughts shared yet. Be the first to start the conversation!"
- Ensures fallback UI works

---

### 5. Comment Input Interaction

- User can type inside textarea
- Input updates state correctly
- Controlled component behavior verified

---

### 6. Submit Button Behavior

- Button is disabled when input is empty
- Button becomes enabled when user types text
- Ensures form validation works correctly

---

### 7. Authentication Protection

- If user is NOT logged in:
  - Clicking submit triggers alert
  - Message: "Please login to react"
- Prevents unauthorized comment posting

---

# 🐞 Problems I encountered

### 1. Auth Context Dependency

- Component depends on `useAuth`
- Required mocking in test environment

---

### 2. State-Based Rendering

- Comment list depends on `mockComments`
- Needed correct `postId` filtering

---

### 3. Alert Handling

- Browser alert interferes with tests
- Required `vi.spyOn(window, "alert")`

---

### 4. Controlled Input Behavior

- Textarea is controlled component
- Required `fireEvent.change` for updates

---

# 🔧 How I solved it

### 1. Mocked Auth Context

```js
vi.mock("../../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

2. Controlled User States
useAuth.mockReturnValue({ user: mockUser });

Handled:

Logged in user
Guest user
3. Alert Mocking
vi.spyOn(window, "alert").mockImplementation(() => {});

Prevented real browser alerts during tests

4. DOM-Based Assertions
Used getByTestId
Used getByPlaceholderText
Avoided internal state testing
5. Interaction Simulation
Used fireEvent.change
Used fireEvent.click

Simulated real user behavior

📌 Key Lesson
Always mock authentication in comment systems
Test behavior, not internal state
Handle browser APIs (alert) in tests
Controlled inputs require event simulation
Focus on user flow, not implementation
📊 Final result
All tests passed successfully
PostComments renders correctly
Input interaction works
Submit validation works
Authentication guard works
Empty state handled correctly
Comment system behaves as expected
All interaction flows verified