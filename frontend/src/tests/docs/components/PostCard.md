# 🧪 What I tested / What was done

## PostCard Component Tests

### Component Overview:

Card component that displays blog post preview information

Used in blog listing pages to show post summaries

Built with React Router for client-side routing

Accepts post data via props for dynamic rendering

---

## Main Features Tested:

### 1. Rendering & Structure

- Post card container renders with correct test ID  
- All post card elements are present in the document  
- Proper `data-testid` attributes for testing  

---

### 2. Post Image

- Image renders with correct `src` attribute from `coverImage` prop  
- Image has proper `alt` attribute set to post title for accessibility  
- Image is correctly displayed in the card  

---

### 3. Category Display

- Category renders when available in post data  
- Category text matches the provided mock data  
- Category test ID is present in the document  

---

### 4. Author Information

- Author name renders correctly from `mockPost.author.name`  
- Author name matches expected text content  
- Author link navigates to about page (`/about`)  

---

### 5. Post Metadata

- Date displays correctly from `mockPost.date`  
- Read time displays correctly from `mockPost.readTime`  
- Both metadata items are rendered in the meta container  

---

### 6. Post Content

- Title renders with correct text from `mockPost.title`  
- Excerpt renders with correct text from `mockPost.excerpt`  

---

### 7. Navigation Links

- "Read Article" link renders with correct route: `/blogs/${mockPost.id}`  
- Author link renders with correct route: `/about`  
- Links use proper React Router navigation  

---

# 🐞 Problems I encountered

### 1. Props Not Passed to Component

- Issue: Initially attempted to render `PostCard` without passing mock post data  
- Error: Component failed to render due to missing props  
- Root Cause: Forgot to provide required `post` prop  

---

### 2. Missing Mock Data Structure

- Issue: Post data structure did not match component expectations  
- Error: Undefined property access errors in component  
- Root Cause: Incomplete or incorrectly structured mock object  

---

# 🔧 How I solved it

### 1. Proper Props Implementation

Created a complete mockPost object matching component requirements:

```js
const mockPost = {
  id: "1",
  title: "Test Blog Post",
  excerpt: "This is a test excerpt for the blog post.",
  coverImage: "https://example.com/image.jpg",
  category: "Tech",
  author: {
    name: "Amanuel Amare",
  },
  date: "June 17, 2026",
  readTime: "5 min read",
};

2. Consistent Render Function
Created renderComponent() helper function for consistent test rendering
Wrapped component with MemoryRouter for React Router support
Passed mockPost as prop in all tests
3. Comprehensive Test Coverage
Tested each element using data-testid queries
Verified content matches mock data exactly
Tested navigation routes
Ensured accessibility (alt text, proper structure)
📊 Final result
All tests passed successfully
PostCard rendering tests completed successfully
Image rendering with correct src and alt verified
Category display confirmed
Author name and link validated
Metadata (date and read time) displayed correctly
Post title and excerpt verified
Navigation links confirmed
All 10 test cases passed without errors