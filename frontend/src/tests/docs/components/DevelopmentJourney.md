# 🧪 What I tested / What was done

## DevelopmentJourney Component Tests

### Component Overview:

DevelopmentJourney is a stats-based section component that showcases development progress and experience

It displays:
- Section title and description
- Dynamic stats cards
- Animated numbers via `AnimatedNumber` component

Built as a responsive grid-based UI section

---

## Main Features Tested:

### 1. Section Rendering & Structure

- DevelopmentJourney section renders correctly  
- Main container is present in the document  
- Section uses correct layout structure  
- All elements render without runtime errors  

---

### 2. Title Rendering

- Section title renders correctly:
  - "My Development Journey"  
- Title is displayed using correct test ID  
- Ensures proper heading visibility  

---

### 3. Description Rendering

- Description text renders correctly:
  - "Building projects, writing code, and continuously learning modern web technologies."  
- Text is properly displayed under title  
- Confirms informational content is visible  

---

### 4. Stats Container Rendering

- Stats grid container renders correctly  
- Grid layout is present in DOM  
- Responsive structure is properly applied  
- Container includes all stat cards  

---

### 5. Dynamic Stat Cards Rendering

- All stat cards render from `stats` array  
- Total cards rendered = **4**  
- Each card is properly displayed in grid layout  
- Ensures correct mapping of dynamic data  

---

### 6. Stat Labels Rendering

- All stat labels render correctly:
  - Repositories  
  - Projects  
  - GitHub Commits  
  - Focused on Performance & Testing  
- Labels match exactly with static data  
- Confirms correct data binding  

---

### 7. Stat Numbers Rendering (AnimatedNumber)

- All stat number containers render correctly  
- Total number elements = **4**  
- Each number is wrapped inside `AnimatedNumber` component  
- Confirms presence of animated numeric UI  

---

### 8. Label Containers Validation

- All label elements render correctly  
- Each stat card contains:
  - Number section  
  - Label section  
- Ensures consistent card structure  

---

# 🐞 Problems I encountered

### 1. Animated Component Abstraction

- Issue: Numbers are rendered via `AnimatedNumber` component  
- Challenge: Cannot directly assert animation behavior in DOM  
- Root Cause: Animation logic is abstracted inside child component  

---

### 2. Dynamic Mapping Validation

- Issue: Verifying correct rendering of all stat cards  
- Error: Confusion between static vs dynamically generated elements  
- Root Cause: Stats array mapping required computed validation  

---

### 3. Test ID Repetition

- Issue: Same test IDs used across multiple stat cards  
- Error: Needed to differentiate multiple rendered elements  
- Root Cause: Repeated `data-testid` on mapped components  

---

# 🔧 How I solved it

### 1. Data-Driven Testing Approach

- Used direct validation of `stats` array length  
- Ensured rendered cards match:
  - `stats.length === 4`  
- Used DOM queries instead of hardcoded assumptions  

---

### 2. Proper Query Strategy

- Used `getAllByTestId` for repeated elements:
  - cards  
  - numbers  
  - labels  
- Used `getByText` for verifying static labels  
- Ensured correct separation of concerns  

---

### 3. Component Abstraction Handling

- Accepted `AnimatedNumber` as a black-box component  
- Focused on:
  - Rendering presence  
  - Structural correctness  
- Avoided testing internal animation logic in this unit  

---

### 4. Clean Structural Validation

- Tested in layers:
  - Section  
  - Title  
  - Description  
  - Grid container  
  - Cards  
  - Labels  
  - Numbers  
- Ensured maintainable and readable test structure  

---

# 📌 Key Lesson

- When components include animations or child abstractions:
  - Test structure, not behavior  
- Always validate:
  - Data mapping correctness  
  - DOM rendering consistency  
- Avoid over-testing internal logic of child components  
- Use array length and content matching for dynamic UI  

---

# 📊 Final result

- All tests passed successfully  
- DevelopmentJourney section rendered correctly  
- Title and description verified  
- Stats grid container validated  
- All 4 stat cards rendered properly  
- Labels match expected values  
- AnimatedNumber components rendered successfully  
- Dynamic mapping confirmed  
- All test cases pass without errors  