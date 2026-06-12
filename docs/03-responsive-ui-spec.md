# Responsive UI Layout & Component Specifications

---

## 📌 Overview

This document defines how all pages and components behave across different screen sizes:
- Desktop
- Tablet
- Mobile

It ensures consistency and smooth responsive design across the application.

---

## 🎯 Why this matters

- Keeps UI consistent across all devices
- Helps developers implement Figma designs correctly
- Improves user experience on mobile and tablet
- Reduces layout bugs during development

---

# 📱 Breakpoints

- Desktop: 1024px and above
- Tablet: 768px – 1023px
- Mobile: 390px – 767px

---

# 🏠 Core Pages

## Homepage Layout

### Desktop
- Full-width hero section
- Multi-column blog grid (3–4 columns)
- Large navigation bar

### Tablet
- 2-column blog grid
- Simplified navbar
- Reduced spacing

### Mobile
- Single column layout
- Collapsible navbar (hamburger menu)
- Stacked sections vertically

---

## Blog Page Layout

### Desktop
- Article content centered (max-width ~800px)
- Sidebar for related posts or ads
- Large typography

### Tablet
- Single column layout
- Reduced sidebar usage

### Mobile
- Full-width article
- Readable font scaling
- Sticky share buttons (optional)

---

## About Page Layout

### Desktop
- Two-column layout (image + text)
- Wide spacing and centered content

### Tablet
- Stacked layout (image on top, text below)

### Mobile
- Fully stacked vertical layout
- Center-aligned text

---

# 🧩 Page Sections

## Navbar Component

### Desktop
- Logo on left
- Menu items center/right
- Login/Profile button on right

### Tablet
- Reduced menu items
- Compact spacing

### Mobile
- Hamburger menu
- Slide-in navigation drawer

---

## Hero Section

### Desktop
- Large headline
- Subtext
- CTA button
- Background image or gradient

### Tablet
- Reduced font sizes
- Center-aligned content

### Mobile
- Stacked content
- Full-width button

---

## Footer Component

### Desktop
- Multi-column layout (links, socials, info)

### Tablet
- 2-column layout

### Mobile
- Single column stacked links

---

# ❤️ Interactivity Components

## Like / Dislike Buttons

### Desktop
- Hover effects enabled
- Smooth transitions

### Tablet
- Touch-friendly spacing
- Slightly larger icons

### Mobile
- Large tap targets (min 44px)
- Instant feedback on tap

---

# 📏 UI Rules

- All layouts must be responsive
- No horizontal scrolling allowed
- Buttons must be touch-friendly on mobile
- Text must remain readable on all devices
- Components must be reusable
- tesable with vitest pass all tests

---

# ✅ Acceptance Criteria

- [ ] All pages match Figma designs
- [ ] Layout adapts smoothly across breakpoints
- [ ] Navbar becomes mobile menu on small screens
- [ ] Buttons respond to hover and click states
- [ ] Mobile touch targets are at least 44px
- [ ] No layout breaks on any screen size