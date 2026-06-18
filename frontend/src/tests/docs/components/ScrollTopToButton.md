# 🧪 What I tested / What was done

## ScrollToTopButton Component Tests

---

## Component Overview

ScrollToTopButton is a utility component that appears when the user scrolls down the page.

It:

- Monitors scroll position
- Shows button after 600px scroll
- Smoothly scrolls page to top
- Uses browser scroll events

---

## Main Features Tested

### 1. Initial Rendering

- Button is hidden initially
- Component returns null when threshold not reached

---

### 2. Visibility Logic

- Button appears after scrolling beyond 600px
- Correct visibility state maintained

---

### 3. Scroll-To-Top Action

- Clicking button triggers scrollTo
- Smooth scrolling configuration verified

---

### 4. Hide Logic

- Button remains hidden below threshold
- Correct conditional rendering behavior confirmed

---

# 🐞 Problems I encountered

### 1. JSDOM Scroll Limitations

Issue:

- No real scrolling occurs during tests

Root Cause:

- Required manual scroll position mocking

---

### 2. Browser API Dependency

Issue:

- Component depends on `window.scrollTo`

Root Cause:

- Needed mock implementation

---

# 🔧 How I solved it

### 1. Mocked Scroll Position

```js
Object.defineProperty(window, "scrollY", {
  value: 700,
});
```

---

### 2. Mocked Browser API

```js
window.scrollTo = vi.fn();
```

---

### 3. Simulated Scroll Events

```js
fireEvent.scroll(window);
```

---

### 4. Verified Scroll Action

```js
expect(window.scrollTo).toHaveBeenCalledWith({
  top: 0,
  behavior: "smooth",
});
```

---

# 📌 Key Lessons

- Scroll-dependent components require browser API mocking
- Conditional rendering should test both visible and hidden states
- Verify browser method calls rather than implementation details
- Simulate real user scrolling behavior whenever possible

---

# 📊 Final result

- All tests passed successfully
- Initial hidden state verified
- Visibility threshold confirmed
- Scroll-to-top functionality validated
- Browser API integration tested
- Component behaves correctly across all scenarios

---