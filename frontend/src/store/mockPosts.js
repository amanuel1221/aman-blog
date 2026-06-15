const mockPosts = [
  {
    _id: "6668742ba3bc891122334401",
    id: 1, // Maintained for backward compatibility with your page state routing parameters
    title: "Building Secure REST APIs with JWT",
    slug: "building-secure-rest-apis-with-jwt",
    excerpt: "Learn how to implement secure JWT authentication and authorization in Node.js applications.",
    content: `
# Building Secure REST APIs with JWT

In this article, I explain how I build secure backend APIs using **Node.js + JWT authentication**.

---

## 🚀 Why JWT Matters

JWT (JSON Web Token) is used for:
- Secure authentication
- Stateless sessions
- Protecting API routes

---

## ⚙️ How Authentication Works

1. User logs in with email & password
2. Server generates a JWT token
3. Token is stored in client (localStorage / cookies)
4. Every request sends token in headers

\`\`\`js
Authorization: Bearer your_token_here
\`\`\`

---

## 🧠 Example Flow

- Login request → server validates user  
- Token created using secret key  
- Token returned to frontend  
- Frontend stores token  
- API requests use token for protection  

---

## 🔒 Key Takeaway

JWT helps build **stateless and scalable authentication systems** for modern web apps.
    `,
    author: {
      _id: "6668742ba3bc891122334499",
      name: "Amanuel Amare"
    },
    category: "Backend Development",
    readTime: "5 min read",
    date: "June 10, 2026",
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    tags: ["Nodejs", "JWT", "Security", "REST API"],
    views: 142,
    likes: ["user_amanuel_123", "user_guest_88"],
    dislikes: [],
    commentsCount: 2,
    isPublished: true,
    createdAt: "2026-06-10T08:30:00.000Z"
  },
  {
    _id: "6668742ba3bc891122334402",
    id: 2,
    title: "Mastering React Hooks",
    slug: "mastering-react-hooks",
    excerpt: "Understand useState, useEffect, and custom hooks through practical examples.",
    content: `
# Mastering React Hooks

React Hooks allow you to use state and lifecycle features in functional components.

---

## 🔥 Most Used Hooks

- useState → state management
- useEffect → side effects
- useMemo → performance optimization
- useCallback → function memoization

---

## 🧪 Example

\`\`\`js
const [count, setCount] = useState(0);

useEffect(() => {
  console.log("Component mounted");
}, []);
\`\`\`

---

## ⚡ Why Hooks Matter

Hooks make React:
- Cleaner
- More reusable
- Easier to test (Vitest friendly)
    `,
    author: {
      _id: "6668742ba3bc891122334499",
      name: "Amanuel Amare"
    },
    category: "Frontend Development",
    readTime: "7 min read",
    date: "June 8, 2026",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    tags: ["React", "Hooks", "Frontend"],
    views: 310,
    likes: ["user_john_doe"],
    dislikes: ["user_troll_42"],
    commentsCount: 1,
    isPublished: true,
    createdAt: "2026-06-08T14:15:00.000Z"
  },
  {
    _id: "6668742ba3bc891122334403",
    id: 3,
    title: "Getting Started with Tailwind CSS",
    slug: "getting-started-with-tailwind-css",
    excerpt: "Build modern and responsive user interfaces faster using utility-first CSS.",
    content: `
# Getting Started with Tailwind CSS

Tailwind CSS is a utility-first framework for building modern UIs quickly.

---

## 🎨 Why Tailwind?

- Fast development
- Responsive design built-in
- No need for custom CSS files

---

## 📱 Example

\`\`\`html
<div class="p-4 bg-blue-500 text-white rounded">
  Hello Tailwind
</div>
\`\`\`

---

## 🚀 Key Benefit

You build UI directly in HTML without leaving markup.
    `,
    author: {
      _id: "6668742ba3bc891122334499",
      name: "Amanuel Amare"
    },
    category: "CSS",
    readTime: "4 min read",
    date: "June 5, 2026",
    coverImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890",
    tags: ["Tailwind", "CSS", "UI-Design"],
    views: 95,
    likes: [],
    dislikes: [],
    commentsCount: 0,
    isPublished: true,
    createdAt: "2026-06-05T09:00:00.000Z"
  },
  {
    _id: "6668742ba3bc891122334404",
    id: 4,
    title: "Frontend Performance Optimization",
    slug: "frontend-performance-optimization",
    excerpt: "Learn how to improve Lighthouse score and real-world web performance.",
    content: `
# Frontend Performance Optimization

Performance is one of the most important parts of modern web apps.

---

## ⚡ Key Areas

- Reduce bundle size
- Code splitting
- Lazy loading images
- Optimize API calls

---

## 📊 Lighthouse Goals

- Performance: 90+
- Accessibility: 95+
- SEO: 100

---

## 🧠 Real Practice

In my projects, I improved performance using:
- Vite optimization
- React lazy loading
- Image compression
    `,
    author: {
      _id: "6668742ba3bc891122334499",
      name: "Amanuel Amare"
    },
    category: "Performance",
    readTime: "6 min read",
    date: "June 5, 2026",
    coverImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890",
    tags: ["Performance", "Vite", "Lighthouse"],
    views: 240,
    likes: ["user_alex_dev", "user_sara_m"],
    dislikes: [],
    commentsCount: 0,
    isPublished: true,
    createdAt: "2026-06-05T08:45:00.000Z"
  },
  {
    _id: "6668742ba3bc891122334405",
    id: 5,
    title: "Testing React Apps with Vitest",
    slug: "testing-react-apps-with-vitest",
    excerpt: "Learn how to test components, hooks, and UI behavior using Vitest.",
    content: `
# Testing React Apps with Vitest

Testing is important to ensure UI reliability.

---

## 🧪 What to Test

- Components rendering
- User interactions
- API calls
- State changes

---

## 🔧 Example Test

\`\`\`js
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  render(<App />);
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});
\`\`\`

---

## 🚀 Why Vitest?

- Fast
- Vite compatible
- Easy setup
    `,
    author: {
      _id: "6668742ba3bc891122334499",
      name: "Amanuel Amare"
    },
    category: "Testing",
    readTime: "5 min read",
    date: "June 5, 2026",
    coverImage: "https://images.unsplash.com/photo-1621839673705-6617adf9e890",
    tags: ["Testing", "Vitest", "React Testing Library"],
    views: 188,
    likes: ["user_amanuel_123"],
    dislikes: [],
    commentsCount: 0,
    isPublished: true,
    createdAt: "2026-06-05T07:12:00.000Z"
  }
];

export default mockPosts;