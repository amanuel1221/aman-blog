# 🧪 What I tested / What was done

## NotesGrid Component Tests

### Component Overview:

NotesGrid is a responsive grid component that displays structured learning or notes data

It renders multiple cards dynamically using `notesData`

Each card contains:
- Icon
- Title
- Status badge
- List of items

---

## Main Features Tested:

### 1. Grid Rendering & Structure

- Notes grid container renders correctly  
- Grid wrapper is present in the document  
- Grid layout container (`notes-grid-container`) is rendered  
- Component successfully mounts without errors  

---

### 2. Dynamic Card Rendering

- All note cards render from `notesData` dynamically  
- Number of rendered cards matches `notesData.length`  
- Each card has correct `data-testid="notes-grid-card"`  
- Ensures data-driven rendering works correctly  

---

### 3. Card Title Rendering

- Each card title is rendered correctly  
- Titles match values from `notesData`  
- All titles are visible in the document  
- No missing or undefined titles detected  

---

### 4. Card Status Rendering

- Each card status badge renders correctly  
- Status text matches `notesData.status` values  
- Status elements are properly displayed inside each card  
- Ensures correct mapping from data source  

---

### 5. Icon Rendering & Validation

- All card icons render correctly  
- Icon `src` matches `notesData.iconUrl`  
- Icon `alt` text matches pattern:  
  - `${card.title} icon`  
- Ensures accessibility compliance for images  

---

### 6. List Items Rendering

- All list items inside each card render correctly  
- Each item is displayed in the document  
- No missing or undefined list entries  
- Nested data structure renders properly  

---

### 7. Total Items Validation

- Total number of rendered list items matches `notesData` structure  
- Ensures all nested items are included  
- Confirms correct flattening of nested arrays in DOM  

---

# 🐞 Problems I encountered

### 1. Dynamic Data Rendering Confusion

- Issue: Initially unclear whether cards or items were fully rendering  
- Error: Miscounted rendered elements in early tests  
- Root Cause: Nested structure in `notesData` caused incorrect assumptions  

---

### 2. Test ID Selection Issues

- Issue: Multiple elements shared similar structure  
- Error: Difficulty distinguishing between cards and items in tests  
- Root Cause: Repeated `data-testid` usage across nested elements  

---

### 3. Nested Array Validation

- Issue: Hard to validate total list items across multiple cards  
- Error: Incorrect item count assertions  
- Root Cause: Not properly flattening nested `items` arrays  

---

# 🔧 How I solved it

### 1. Correct Data-Driven Testing Approach

- Used `notesData` directly as the source of truth  
- Matched test expectations with actual data structure  
- Ensured dynamic rendering validation instead of hardcoded values  

---

### 2. Proper Query Strategy

- Used `getAllByTestId` for multiple cards  
- Used `getAllByTestId` for nested items  
- Used `getByText` for validating dynamic content  
- Ensured correct separation between card-level and item-level queries  

---

### 3. Accurate Item Count Validation

- Calculated total items using:

```js
notesData.reduce((acc, card) => acc + card.items.length, 0)