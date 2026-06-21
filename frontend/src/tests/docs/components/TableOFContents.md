# 🧪 What I tested / What was done

## TableOfContents Component Tests

### Component Overview

* Table of Contents component used for blog articles.
* Dynamically extracts markdown headings from article content.
* Supports heading levels:

  * H1 (`#`)
  * H2 (`##`)
  * H3 (`###`)
* Provides expandable and collapsible navigation.
* Allows users to quickly navigate to article sections.

---

## Main Features Tested

### 1. Rendering & Structure

* Component renders successfully.
* Main container appears correctly.
* Toggle button renders properly.
* Table of Contents title is displayed.

### Verified Elements

* `table-of-contents`
* `table-of-contents-toggle`
* `table-of-contents-title`

---

### 2. Initial Closed State

* Component starts in collapsed mode.
* Content wrapper contains:

  * `max-h-0`
  * `opacity-0`
* No headings are displayed to the user initially.

### Verified

* Closed-state CSS classes are applied correctly.
* Initial UI behavior matches expected design.

---

### 3. Toggle Open Functionality

* Clicking the toggle button opens the content section.
* Content wrapper updates to:

  * `max-h-96`
  * `opacity-100`
* Heading list becomes accessible.

### Verified

* State changes successfully.
* Expand animation classes are applied correctly.

---

### 4. Toggle Close Functionality

* Clicking the toggle button again closes the content section.
* Content wrapper returns to:

  * `max-h-0`
  * `opacity-0`

### Verified

* Collapse behavior works correctly.
* Open and close states are properly managed.

---

### 5. Markdown Heading Extraction

The component correctly parses markdown headings from article content.

### Test Content

```md
# Introduction

## Getting Started

### Installation

## Testing
```

### Verified Headings

* Introduction
* Getting Started
* Installation
* Testing

---

### 6. Dynamic Heading Rendering

* Extracted headings render inside the TOC list.
* All heading text matches the source markdown.
* Generated list items display correctly.

### Verified

* Dynamic rendering logic works properly.
* Generated navigation items match markdown content.

---

### 7. Scroll Navigation

* Clicking a heading item triggers navigation behavior.
* `scrollIntoView()` executes successfully.
* Correct section ID is targeted.

### Verified

* Heading click events function correctly.
* Scroll navigation works as intended.

---

### 8. Empty Content Handling

* Component handles content without markdown headings.
* Empty heading list renders correctly.
* No runtime errors occur.

### Verified

* Component remains stable when no headings exist.
* Empty states are handled gracefully.

---

# 🐞 Problems I encountered

## 1. Visibility Assertion Failure

### Issue

Initially tested the hidden state using:

```javascript
expect(element).not.toBeVisible();
```

### Error

```bash
Received element is visible
```

### Root Cause

The component never removes the content element from the DOM.

The hidden state is controlled by Tailwind classes:

```jsx
max-h-0
opacity-0
```

JSDOM does not evaluate Tailwind CSS styles the same way as a real browser.

As a result:

```jsx
toBeVisible()
```

returned an unexpected result.

---

## 2. Toggle Close Test Failure

### Issue

The close-state test also used:

```javascript
not.toBeVisible()
```

### Error

The content element remained visible to JSDOM.

### Root Cause

The element was still mounted.

Only the wrapper classes changed.

Visibility assertions were testing the wrong thing.

---

## 3. Tailwind-Based UI Testing

### Issue

Testing visual states directly.

### Root Cause

Tailwind utility classes affect appearance visually but do not remove elements from the DOM.

JSDOM cannot calculate:

* opacity
* max-height
* animations

like a real browser.

---

# 🔧 How I solved it

## 1. Tested Wrapper Classes Instead

Instead of testing visibility:

```javascript
expect(element).not.toBeVisible();
```

I tested the wrapper classes:

```javascript
expect(wrapper).toHaveClass("max-h-0");
expect(wrapper).toHaveClass("opacity-0");
```

### Result

The component state became testable and reliable.

---

## 2. Verified Open State

After clicking the toggle button:

```javascript
fireEvent.click(toggleButton);
```

I checked:

```javascript
expect(wrapper).toHaveClass("max-h-96");
expect(wrapper).toHaveClass("opacity-100");
```

### Result

Open-state behavior was validated successfully.

---

## 3. Mocked scrollIntoView

Created a mock implementation:

```javascript
heading.scrollIntoView = vi.fn();
```

### Result

Scroll navigation functionality could be tested inside JSDOM.

---

## 4. Used Realistic Markdown Data

Created markdown content matching the component parser:

```md
# Introduction

## Getting Started

### Installation

## Testing
```

### Result

Heading extraction and rendering worked exactly as expected.

---

# 📊 Final Result

✅ All tests passed successfully

### Rendering Tests

* Component rendering verified
* Title rendering verified
* Container rendering verified

### State Management Tests

* Initial closed state verified
* Open state verified
* Close state verified

### Content Parsing Tests

* H1 extraction verified
* H2 extraction verified
* H3 extraction verified

### Interaction Tests

* Toggle button functionality verified
* Scroll navigation verified
* Heading click behavior verified

### Edge Case Tests

* Empty content handling verified
* No runtime errors detected

### Test Summary

* All component behaviors validated
* All interactive functionality confirmed
* Dynamic heading generation verified
* All test cases pass successfully

---

# 📚 Key Lessons

* Tailwind visibility classes should be tested with `toHaveClass()` rather than `toBeVisible()`.
* JSDOM does not calculate CSS-driven visibility like a real browser.
* Always test state changes using the actual implementation details.
* Mock browser APIs such as `scrollIntoView()` when necessary.
* Dynamic content generation should be tested using realistic sample data.
* Testing CSS state classes is often more reliable than testing visual appearance in unit tests.
* Read console error messages carefully to identify whether failures are caused by logic or rendering behavior.
