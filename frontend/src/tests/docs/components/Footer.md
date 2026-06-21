# 🧪 What I tested / What was done

## Footer Component Tests

### Component Overview:

Footer component that provides site-wide navigation links, social media connections, and branding information

Built with React Router for client-side navigation

Includes external social media links that open in new tabs

---

## Main Features Tested:

### 1. Rendering & Structure

- Footer container and navigation render correctly  
- Logo text **"Amanuel's Blog"** displays properly  
- Navigation links render:
  - Home  
  - Blogs  
  - About  
  - Contact Me  
- All footer elements are present in the document  

---

### 2. Navigation Links & Paths

- All navigation links have correct React Router paths:
  - "/" → Home  
  - "/about" → About  
  - "/blogs" → Blogs  
  - "/contact" → Contact Me  
- Links are properly accessible via `getByRole`

---

### 3. Social Media Links

- GitHub profile link:
  - https://github.com/amanuel1221  
- LinkedIn profile link:
  - https://linkedin.com/in/amanuel-amare-684234372  
- Email link (mailto:amanuelamare1227@gmail.com):
  - mailto:amanuelamare1227@gmail.com  
- Personal portfolio link verified  
- All social links open in new tab (`target="_blank"`)  
- Proper accessibility with ARIA labels  

---

### 4. Accessibility Testing

- Social icons tested using role-based queries with ARIA labels:
  - name: /github profile/i  
  - name: /linkedin profile/i  
  - name: /email address/i  
  - name: /personal portfolio/i  
- Links are properly labeled for screen readers  
- Improved accessibility and test reliability  

---

## 🐞 Problems I encountered

### 1. Social Links Not Found in Document

- Issue: Initially tried to get social links without proper ARIA labels  
- Error: Elements could not be found in the document  
- Root Cause: Missing `aria-label` attributes in Footer component  

---

### 2. Attribute Path Testing Errors

- Issue: Typographical errors in attribute values during testing  
- Error: Tests failing due to mismatched URLs or attributes  
- Root Cause: Incorrect URL strings or attribute names in assertions  

---

## 🔧 How I solved it

### 1. Social Links Accessibility Fix

- Reviewed console errors to locate missing elements  
- Added ARIA labels:
  - `aria-label="GitHub Profile"`  
  - `aria-label="LinkedIn Profile"`  
  - `aria-label="Email Address"`  
  - `aria-label="Personal Portfolio"`  
- Updated tests to use:
  - `getByRole("link", { name: /pattern/i })`  
- Ensured all social icons are accessible and testable  

---

### 2. Attribute Typo Fixes

- Carefully checked console error output  
- Fixed incorrect URL values in test assertions  
- Corrected GitHub URL formatting  
- Fixed LinkedIn profile URL  
- Ensured proper `mailto:` format for email  
- Verified `target="_blank"` exists for external links  

---

## 📌 Key Lesson

- Always use ARIA labels for interactive elements  
- Improves both accessibility and testability  
- Always read console errors carefully to detect mismatched attributes or missing elements  

---

## 📊 Final result

- All tests passed successfully  
- Footer rendering tests completed successfully  
- Navigation links with correct paths confirmed  
- Social media links validated  
- External links open in new tab verified  
- ARIA labels properly implemented for accessibility  
- All test suites pass without errors  