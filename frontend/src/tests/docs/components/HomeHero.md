# 🧪 What I tested / What was done

## HomeHero Component Tests

### Component Overview:

HomeHero is a landing section component for the homepage

It introduces the blog platform with:
- Hero tag line
- Main title
- Description
- Call-to-action button
- Hero illustration

Built with React Router for client-side navigation

---

## Main Features Tested:

### 1. Hero Section Rendering & Structure

- HomeHero section renders correctly in the document  
- Main container is present with correct layout  
- Section uses proper semantic `<section>` tag  
- All hero elements render without errors  

---

### 2. Hero Tag (Badge Text)

- Hero tag renders correctly:
  - "Building Fast, Tested & Scalable Web Applications"  
- Tag is displayed in uppercase styled badge  
- Tag element is present using correct test ID  
- Ensures branding message is visible  

---

### 3. Hero Title Rendering

- Main title renders correctly:
  - "Amanuel Blogs Collection"  
- Title is displayed prominently  
- Font hierarchy is properly applied in DOM  
- Title matches expected static content  

---

### 4. Hero Description Rendering

- Description text renders correctly  
- Contains full stack engineering context:
  - React  
  - Node.js  
  - Performance optimization  
  - Vitest testing  
  - Fullstack development  
- Ensures informational content is properly displayed  

---

### 5. CTA Button Rendering & Navigation

- "Read Blogs" button renders correctly  
- Button is wrapped inside `NavLink` pointing to `/blogs`  
- Button container is present in DOM  
- Arrow icon (→) renders correctly  
- Button is interactive and properly structured  

---

### 6. Hero Image Rendering

- Hero illustration renders correctly  
- Image source is valid:
  - `/undraw_building-a-website_1wrp.svg`  
- Alt text is properly set for accessibility:
  - "Developer working on coding projects illustration"  
- Image loads with correct attributes (`loading="eager"`)  

---

### 7. Layout & UI Structure

- All hero elements are centered properly  
- Spacing between sections is correctly applied  
- Responsive layout structure is maintained  
- Hover and transition classes are applied correctly  

---

# 🐞 Problems I encountered

### 1. NavLink Wrapping Confusion

- Issue: Initially unclear structure of button inside NavLink  
- Error: Potential routing misinterpretation in early tests  
- Root Cause: Nested button inside NavLink required proper wrapper handling  

---

### 2. Static Content Validation

- Issue: Difficulty deciding whether to test full paragraph text  
- Error: Overchecking large description blocks in early attempts  
- Root Cause: Long static content made assertions verbose  

---

### 3. Image Loading Assumptions

- Issue: Unsure if image loads correctly in test environment  
- Error: Confusion between DOM presence vs actual rendering  
- Root Cause: Not distinguishing `getByTestId` vs visual rendering behavior  

---

# 🔧 How I solved it

### 1. Proper Component Structure Understanding

- Verified NavLink wraps the CTA button correctly  
- Ensured `/blogs` route is correctly assigned  
- Confirmed navigation behavior is handled by React Router  

---

### 2. Focused Testing Strategy

- Tested key elements instead of full paragraph matching  
- Focused on:
  - Presence  
  - Correct text  
  - Correct attributes  
- Avoided unnecessary over-validation of static text  

---

### 3. Image Validation Approach

- Verified image exists in DOM using test ID  
- Checked `src` and `alt` attributes instead of visual rendering  
- Ensured accessibility compliance rather than pixel validation  

---

### 4. Clean Test Boundaries

- Separated concerns:
  - Hero text validation  
  - Button/navigation validation  
  - Image validation  
- Ensured maintainable and readable test structure  

---

# 📌 Key Lesson

- Focus on **critical UI elements**, not full static content  
- For hero sections, prioritize:
  - Structure  
  - Navigation  
  - Accessibility  
- Avoid over-testing large text blocks unless necessary  
- Always validate routing behavior separately from UI  

---

# 📊 Final result

- HomeHero renders successfully  
- Hero tag, title, and description displayed correctly  
- CTA button links to `/blogs` correctly  
- Navigation via NavLink confirmed  
- Hero image renders with correct attributes  
- Layout structure verified  
- All UI elements present and stable  
- All test cases pass without errors  