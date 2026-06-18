# 🧪 What I tested / What was done

## ArticleShare Component Tests

### Component Overview:

ArticleShare is a social sharing component used on blog articles

It provides:
- Social sharing links (LinkedIn, Twitter/X)
- Copy-to-clipboard functionality
- Visual feedback when link is copied

It dynamically uses:
- `title` prop for share text
- `window.location.href` for current page URL
- `navigator.clipboard` for copying links

---

## Main Features Tested:

### 1. Share Section Rendering

- ArticleShare section renders correctly  
- Main container is present in the DOM  
- Section uses correct `data-testid="article-share-section"`  
- Component renders without runtime errors  

---

### 2. Share Title Rendering

- Title section renders correctly:
  - "Share this article"  
- Title is visible in the document  
- Ensures proper UI labeling for sharing feature  

---

### 3. Social Share Buttons Rendering

- All share buttons render correctly:
  - LinkedIn button  
  - Twitter/X button  
  - Copy link button  
- All buttons are present in DOM  
- Each button has correct `data-testid` attributes  

---

### 4. Copy to Clipboard Functionality

- Clicking copy button triggers clipboard API  
- `navigator.clipboard.writeText` is called correctly  
- Copies current page URL (`window.location.href`)  
- Ensures correct integration with browser API  

---

### 5. Copied State Feedback

- Clicking copy button shows success state  
- "Link copied" message appears after click  
- UI updates correctly after state change  
- Message disappears after timeout (2 seconds behavior implied)  

---

### 6. LinkedIn Share Link Validation

- LinkedIn share link renders correctly  
- URL contains:
  - `linkedin.com/sharing/share-offsite`  
  - Encoded current page URL  
- Ensures proper integration with LinkedIn sharing API  

---

### 7. Twitter/X Share Link Validation

- Twitter share link renders correctly  
- URL contains:
  - Tweet intent endpoint  
  - Encoded title text  
  - Encoded page URL  
- Ensures correct share formatting for social media  

---

# 🐞 Problems I encountered

### 1. Clipboard API Mocking

- Issue: Clipboard API is not available in test environment  
- Error: `navigator.clipboard.writeText is not a function`  
- Root Cause: Browser API not available in Jest/Vitest runtime  

---

### 2. Window Location Dependency

- Issue: Component depends on `window.location.href`  
- Error: Undefined or inconsistent URL values in tests  
- Root Cause: Missing mock for browser environment  

---

### 3. Async UI State Update

- Issue: "Link copied" message appears after state update  
- Error: Test failing due to timing mismatch  
- Root Cause: State update happens asynchronously via `setTimeout`  

---

# 🔧 How I solved it

### 1. Clipboard API Mocking

- Stubbed global navigator object:

```js
vi.stubGlobal("navigator", {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(),
  },
});

Ensured writeText calls are tracked correctly
Allowed simulation of copy behavior
2. Window Location Mocking
Stubbed window.location.href:
vi.stubGlobal("window", {
  location: {
    href: "https://example.com/article/1",
  },
});
Ensured consistent URL for all share links
Allowed deterministic test assertions
3. Handling Async UI Updates
Used async query for copied state:
await screen.findByText("Link copied");
Ensured DOM updates are properly awaited
Fixed timing-related test failures
4. Robust Assertion Strategy
Validated:
Presence of UI elements
Clipboard interaction calls
Correct URL encoding
Used partial matching for URLs instead of strict equality
Focused on behavior rather than implementation
📌 Key Lesson
Browser APIs (clipboard, window) must always be mocked in tests
Social share components should be tested for:
UI rendering
API integration
State feedback
Always handle async UI updates with findBy* queries
Prefer behavior-based testing over exact URL matching
📊 Final result
All tests passed successfully
Share section renders correctly
Clipboard copy functionality works and is verified
"Link copied" feedback appears correctly
LinkedIn share URL validated
Twitter share URL validated
Window + clipboard APIs properly mocked
All test cases pass without errors