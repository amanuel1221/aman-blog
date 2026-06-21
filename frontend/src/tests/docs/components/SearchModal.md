# 🧪 What I tested / What was done

## SearchModal Component Tests

### Component Overview:

Modal component for searching blog posts

Provides real-time search filtering functionality

Controlled by `open` prop for show/hide behavior

Accepts `onClose` callback for parent component communication

Imports `mockPosts` data for testing

---

## Main Features Tested:

### 1. Modal Visibility Control

- Modal does not render when `open={false}`  
- Modal renders correctly when `open={true}`  
- Modal content container appears when open  
- Modal title displays **"Search Articles"**  

---

### 2. Post Display & Search Functionality

- All posts are displayed initially when modal opens  
- Search input filters posts in real-time  
- Only matching posts appear after search  
- Posts are filtered by title matching search term  

---

### 3. Search Results Handling

- Results container displays filtered posts  
- Shows **"No Results"** message when search term doesn't match any posts  
- No results description displays properly  
- Handles non-matching search queries gracefully  

---

### 4. Modal Interaction & Close Behavior

- Clicking backdrop calls `onClose` function  
- Clicking close button calls `onClose` function  
- Pressing `ESC` key calls `onClose` function  
- All close methods properly trigger the callback  

---

# 🐞 Problems I encountered

### 1. FireEvent Setup Missing

- Issue: Initially forgot to properly set up `fireEvent` for input changes  
- Error: Search filtering tests failing because input changes weren’t triggering correctly  
- Root Cause: Missing or incorrect `fireEvent` configuration  

---

### 2. Modal Open/Close Testing Issues

- Issue: Modal visibility tests were failing  
- Error: Open/close states not properly controlled in test environment  
- Root Cause: Inconsistent rendering with `open` prop  

---

### 3. Event Handling Not Registered

- Issue: Backdrop click and ESC key events not triggering callbacks  
- Error: `onClose` not being called as expected  
- Root Cause: Events not properly attached to DOM elements  

---

# 🔧 How I solved it

### 1. Proper FireEvent Implementation

- Used `fireEvent.change()` with correct target value  
- Ensured proper event simulation for input changes  
- Verified filtering by checking matching post titles  
- Added proper async handling where needed  

---

### 2. Consistent Render Function

- Created `renderModal()` helper function for consistency  
- Passed `open` and `onClose` as parameters with defaults  
- Wrapped component in `MemoryRouter` for routing support  
- Used `vi.fn()` for mocking callbacks  

---

### 3. Comprehensive Close Method Testing

Tested all close interactions:

- Backdrop click → `fireEvent.click()` on modal  
- Close button click → via test ID  
- ESC key press → `fireEvent.keyDown(window, { key: "Escape" })`  

- Verified `onClose` is called exactly once per action  

---

### 4. Edge Case Handling

- Tested "No Results" state with invalid search term  
- Verified empty result UI appears correctly  
- Ensured search handles edge cases gracefully  

---

# 📌 Key Lesson

- Always ensure proper event simulation setup  
- Use consistent rendering patterns for modal testing  
- Always test all interaction methods (click, keyboard, backdrop)  
- Validate both success and edge-case UI states  

---

# 📊 Final result

- All tests passed successfully  
- Modal rendering with open/close states verified  
- Search filtering functionality confirmed  
- No results message displays correctly  
- All close methods (backdrop, button, ESC) validated  
- Search input updates and filters posts in real-time  
- All 8 test cases pass without errors  