# 🧪 What I tested / What was done

## ReadingProgressBar Component Tests

---

## Component Overview

ReadingProgressBar is a scroll indicator component that visually displays how much of the page has been read.

It:

- Tracks window scroll position
- Calculates reading progress percentage
- Updates progress bar width dynamically
- Uses scroll event listeners

---

## Main Features Tested

### 1. Component Rendering

- Progress bar renders correctly
- Element exists in DOM
- Proper test ID is present

---

### 2. Initial State

- Progress starts at 0%
- Width is initially set correctly

---

### 3. Scroll Progress Updates

- Scroll event updates progress value
- Width changes dynamically
- Progress calculation behaves correctly

---

# 🐞 Problems I encountered

### 1. Scroll Values Not Available

Issue:

- JSDOM does not provide realistic scroll values

Root Cause:

- Needed manual property mocking

---

### 2. Scroll Event Simulation

Issue:

- Scroll event doesn't occur automatically

Root Cause:

- Required explicit `fireEvent.scroll()`

---

# 🔧 How I solved it

### 1. Mocked Scroll Properties

```js
Object.defineProperty(window, "scrollY", {
  value: 500,
});
```

---

### 2. Simulated Scroll Event

```js
fireEvent.scroll(window);
```

---

### 3. Verified Width Changes

```js
expect(progressBar.style.width).toBe("50%");
```

---

# 📌 Key Lessons

- Scroll-based components require mocked browser values
- Test rendered styles instead of internal state
- Event-driven UI should be tested with user interactions

---

# 📊 Final result

- All tests passed successfully
- Component renders correctly
- Initial width verified
- Scroll progress calculation confirmed
- Dynamic width updates validated

---