# 🧪 What I tested / What was done

# WhatIWriteAbout Component Tests

## Component Overview

The `WhatIWriteAbout` component displays the main topics covered in the blog along with a checklist of technologies and development concepts.

The component includes:

- Topics grid with illustrations
- Section title and description
- Technology checklist
- Responsive content layout
- Topic cards rendered from local data arrays

---

# Main Features Tested

## 1. Component Rendering

### Verified:

- Component renders successfully
- Main section container exists
- Topics container renders correctly
- Content section renders correctly

### Elements Tested:

- `what-about-section`
- `what-about-topics`
- `what-about-content`

---

## 2. Section Content

### Verified:

- Main heading renders correctly

Expected text:

```text
What do I write about?
```

- Description paragraph renders
- Description contains expected content

### Elements Tested:

- `what-about-title`
- `what-about-description`

---

## 3. Topics Grid

### Verified:

All topic cards render successfully.

Expected topics:

- Backend
- Performance
- Vitest
- Agile Development

### Tests Performed:

- Correct number of topic cards rendered
- Topic images render correctly
- Image alt text matches topic names
- Each topic card has unique test ID

### Elements Tested:

- `what-about-topic-0`
- `what-about-topic-1`
- `what-about-topic-2`
- `what-about-topic-3`

---

## 4. Topic Images

### Verified:

Each topic image:

- Exists in document
- Has correct image source
- Has proper alt text
- Renders correctly inside topic card

### Elements Tested:

- `what-about-topic-image-0`
- `what-about-topic-image-1`
- `what-about-topic-image-2`
- `what-about-topic-image-3`

---

## 5. Checklist Rendering

### Verified:

Checklist container renders correctly.

Expected checklist items:

- React & Component Architecture
- Performance Optimization (Lighthouse 78 → 99)
- Vitest & Testing Strategies
- Node.js & Fullstack APIs
- Scalable Web Application Design
- Real-world project development

### Tests Performed:

- Correct number of checklist items
- All checklist texts render
- Items appear in correct order

### Elements Tested:

- `what-about-checklist`
- `what-about-checklist-item-0`
- `what-about-checklist-item-1`
- `what-about-checklist-item-2`
- `what-about-checklist-item-3`
- `what-about-checklist-item-4`
- `what-about-checklist-item-5`

---

## 6. Checklist Item Content

### Verified:

Each checklist item:

- Renders correct text
- Contains checkmark icon
- Appears inside checklist container

### Elements Tested:

- `what-about-checklist-item-text-0`
- `what-about-checklist-item-text-1`
- `what-about-checklist-item-text-2`
- `what-about-checklist-item-text-3`
- `what-about-checklist-item-text-4`
- `what-about-checklist-item-text-5`

---

## 7. Divider Element

### Verified:

Responsive divider element exists.

### Elements Tested:

- `what-about-divider`

---

# 🐞 Problems I encountered

## 1. Topic Data Not Easily Accessible

### Issue

Topic names are stored in a local array and only used as image alt text.

### Root Cause

The topic name itself is not rendered visibly inside the card.

### Solution

Used image alt attributes to verify correct topic rendering.

---

## 2. Repetitive Test Selectors

### Issue

Multiple cards and checklist items required individual validation.

### Root Cause

Component renders dynamic content using `.map()`.

### Solution

Used loops to validate all generated topic cards and checklist items.

---

## 3. Image Source Validation

### Issue

Image paths needed verification.

### Root Cause

Images are loaded from static SVG files.

### Solution

Checked image elements and validated their `src` attributes.

---

# 🔧 How I solved it

## 1. Render Helper

Created a reusable render function:

```javascript
const renderComponent = () => {
  render(<WhatIWriteAbout />);
};
```

This ensured consistent rendering across all tests.

---

## 2. Topic Validation

Verified:

- Total topic count
- Topic cards
- Topic images
- Alt text values

---

## 3. Checklist Validation

Verified:

- Checklist container
- Item count
- Text content
- Generated list items

---

## 4. Content Validation

Checked:

- Section title
- Description text
- Divider element
- Content container

---

# Key Lesson

When testing components that generate UI from arrays:

- Test the number of rendered elements.
- Validate dynamic content.
- Verify image accessibility using alt text.
- Use loops to reduce repetitive assertions.
- Test both containers and generated child elements.

---

# 📊 Final Result

## ✅ All tests passed successfully

### Verified Successfully

- Component renders correctly
- Section title displays properly
- Description content renders
- Topics grid renders expected cards
- Topic images display correctly
- Image alt text validated
- Checklist container renders
- All checklist items display correctly
- Divider element exists
- Dynamic content generation works correctly

---

# Test Coverage Summary

| Feature | Status |
|----------|----------|
| Component Render | ✅ Passed |
| Title Rendering | ✅ Passed |
| Description Rendering | ✅ Passed |
| Topics Grid | ✅ Passed |
| Topic Images | ✅ Passed |
| Alt Text Validation | ✅ Passed |
| Checklist Rendering | ✅ Passed |
| Checklist Content | ✅ Passed |
| Divider Rendering | ✅ Passed |
| Dynamic Data Mapping | ✅ Passed |

---

# Final Result

✅ All WhatIWriteAbout component tests passed successfully.

The component correctly renders topic cards, images, descriptive content, checklist items, and dynamically generated data while maintaining proper structure and accessibility.