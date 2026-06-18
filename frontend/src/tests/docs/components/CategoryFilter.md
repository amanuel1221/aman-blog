# 🧪 What I tested / What was done

## CategoryFilter Component Tests

---

## Component Overview

CategoryFilter is a reusable dropdown component used for filtering blog posts by category.

It provides:

- Category selection dropdown
- Dynamic category rendering
- Controlled component behavior
- Callback communication with parent components

The component receives:

- `categories`
- `selectedCategory`
- `onCategoryChange`

through props.

---

## Main Features Tested

### 1. Component Rendering

- Component renders correctly
- Select element appears in the document
- Proper test ID exists

---

### 2. Default Option Rendering

- "All Categories" option renders correctly
- Default option appears first
- Proper value is assigned

---

### 3. Dynamic Category Rendering

- All categories passed through props render correctly
- Categories display expected text
- Dynamic mapping works correctly

Example:

- React
- Node.js
- Testing
- Performance

---

### 4. Selected Category Display

- Component displays selected category correctly
- Controlled value updates properly
- Selected option matches prop value

---

### 5. Category Change Handling

- Changing selection triggers callback
- Correct category value is passed
- Parent component communication works properly

---

### 6. Multiple Category Selection

- User can select different categories
- Each selection triggers expected callback
- Dropdown behaves correctly across options

---

### 7. Option Count Validation

- Correct number of options rendered
- Includes:
  - All Categories option
  - Dynamic category options

Validation:

```js
categories.length + 1
```

---

# 🐞 Problems I encountered

### 1. Controlled Component Testing

Issue:

- Select value comes from props
- Component does not manage its own state

Root Cause:

- Needed to verify callback behavior rather than internal state changes

---

### 2. Dynamic Option Rendering

Issue:

- Categories are generated using `.map()`

Root Cause:

- Needed to verify all categories render correctly

---

### 3. Event Simulation

Issue:

- Dropdown interactions require change events

Root Cause:

- Missing proper `fireEvent.change()` setup initially

---

# 🔧 How I solved it

### 1. Mock Callback Function

Created callback mock:

```js
const mockOnCategoryChange = vi.fn();
```

Allowed validation of:

- Function calls
- Call count
- Passed values

---

### 2. Consistent Render Helper

Created reusable render function:

```js
renderComponent();
```

Benefits:

- Cleaner tests
- Less duplicated code
- Easier maintenance

---

### 3. Simulated User Selection

Used:

```js
fireEvent.change(select, {
  target: {
    value: "Testing",
  },
});
```

Verified callback receives correct value.

---

### 4. DOM-Based Assertions

Used:

- getByTestId
- getByText
- getAllByRole

Focused on user-visible behavior.

---

# 📌 Key Lessons

### ✔ Controlled components should test callbacks

Do not test internal state.

Instead verify:

- Selected value
- Callback execution
- Passed arguments

---

### ✔ Dynamic rendering requires coverage

Always verify:

- All items render
- Correct item count exists

---

### ✔ User interactions should be simulated

Use:

```js
fireEvent.change()
```

to mimic real user behavior.

---

### ✔ Test what the user sees

Focus on:

- Visible options
- Selected values
- Dropdown interactions

instead of implementation details.

---

# 📊 Final result

- All tests passed successfully
- Component renders correctly
- All categories display properly
- Default option verified
- Selected category handling confirmed
- Callback execution validated
- Dynamic rendering works correctly
- Dropdown filtering behavior behaves as expected

---