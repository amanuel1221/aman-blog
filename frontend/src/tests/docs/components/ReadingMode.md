# 🧪 What I tested / What was done

## ReadingMode Component Tests

---

## Component Overview

ReadingMode is a toggle button component that allows users to switch between:

- Normal Mode
- Reading Mode

The component:

- Maintains local state using `useState`
- Calls parent callback through `onToggle`
- Updates button text dynamically
- Changes icon based on current state

---

## Main Features Tested

### 1. Component Rendering

- Component renders successfully
- Toggle button appears in the document
- Text container renders correctly
- No rendering errors occur

---

### 2. Initial State

- Component starts in disabled state
- Displays:

```text
Reading Mode
```

- Initial UI matches expected design

---

### 3. Toggle Functionality

- Clicking button enables reading mode
- State updates correctly
- UI reflects new state

Text changes from:

```text
Reading Mode
```

to:

```text
Exit Reading
```

---

### 4. Enable Callback

- Clicking toggle button calls `onToggle`
- Parent receives:

```js
true
```

- Confirms reading mode activation

---

### 5. Disable Callback

- Clicking button again disables reading mode
- Parent receives:

```js
false
```

- Confirms reading mode deactivation

---

### 6. Multiple Toggle Cycles

- User can repeatedly toggle state
- Component remains stable
- State transitions correctly each time

---

### 7. Callback Frequency

- Callback fires once per click
- Correct call count verified
- No duplicate executions occur

---

# 🐞 Problems I encountered

### 1. Internal State Testing

Issue:

- Component state is managed internally

Root Cause:

- Needed to verify behavior through UI changes rather than state variables

---

### 2. Callback Verification

Issue:

- Parent communication occurs through callback

Root Cause:

- Required mock function to validate arguments

---

### 3. Toggle State Transitions

Issue:

- Component switches between two UI states

Root Cause:

- Needed multiple clicks to verify complete toggle cycle

---

# 🔧 How I solved it

### 1. Mocked Callback Function

Created callback mock:

```js
const mockOnToggle = vi.fn();
```

Allowed verification of:

- Call count
- Passed values
- Toggle sequence

---

### 2. User Interaction Simulation

Used:

```js
fireEvent.click(button);
```

to simulate real user behavior.

---

### 3. UI-Based Assertions

Verified visible text:

```text
Reading Mode
```

and

```text
Exit Reading
```

instead of testing React state directly.

---

### 4. Multiple Toggle Testing

Performed:

```js
click
click
click
```

to validate repeated state changes.

---

# 📌 Key Lessons

### ✔ Test behavior instead of state

Avoid testing:

```js
enabled === true
```

Test what the user sees:

- Button text
- Callback execution

---

### ✔ Callbacks are part of component behavior

Always verify:

- Correct arguments
- Correct call count

---

### ✔ Toggle components need full cycle testing

Test:

```text
OFF → ON → OFF
```

instead of only one state change.

---

### ✔ UI updates are the best assertions

Users don't see state variables.

Users see:

- Text changes
- Icons
- Interactions

Focus tests there.

---

# 📊 Final result

- All tests passed successfully
- Component renders correctly
- Initial state verified
- Toggle functionality confirmed
- Enable callback validated
- Disable callback validated
- Multiple toggle cycles work correctly
- Parent communication behaves as expected
- ReadingMode component fully tested

---