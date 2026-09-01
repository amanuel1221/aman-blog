# ⚛️ Aman Blog Frontend

The frontend of **Aman Blog**, a modern developer blogging platform built with **React** and **Vite**.

This application provides a fast, responsive, and accessible user experience for reading articles, authenticating users, interacting with content, and managing the admin dashboard.

The project focuses on clean component architecture, performance optimization, SEO best practices, and maintainable code.

---

# ✨ Features

## 🌍 Public Pages

- Home page
- Blog listing
- Blog details
- About page
- Contact page
- 404 Not Found page

---

## 📚 Blog Experience

- Read blog articles
- Search posts
- Filter by category
- Related posts
- Reading progress bar
- Table of contents
- Code syntax highlighting
- Estimated reading time

---

## ❤️ User Interaction

- Like posts
- Dislike posts
- Add comments
- Reply to comments
- Edit own comments
- Delete own comments
- Share articles

---

## 🔐 Authentication

- User registration
- User login
- Protected routes
- JWT authentication
- Persistent login
- Logout

---

## 👨‍💼 Admin Dashboard

The frontend includes a complete admin interface for managing the platform.

Features include:

- Dashboard overview
- Analytics cards
- Monthly activity charts
- Top posts
- User management
- Message management
- Contact message inbox
- Content management

---

# 🚀 Performance & SEO

The frontend has been optimized with modern SEO and performance techniques.

### SEO

- Dynamic page titles
- Meta descriptions
- Open Graph tags
- Twitter Cards
- Canonical URLs
- JSON-LD Structured Data
- Sitemap support
- Robots.txt support

### Performance

- Lazy loading
- Code splitting
- React memoization
- Optimized assets
- Lighthouse optimization
- Responsive images

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React | UI Library |
| Vite | Build Tool |
| React Router | Routing |
| Tailwind CSS | Styling |
| Axios | API Communication |
| React Helmet Async | SEO |
| React Icons | Icons |
| Recharts | Dashboard Charts |
| Vitest | Unit Testing |
| Testing Library | Component Testing |

---

# 📂 Folder Structure

```
frontend/
│
├── public/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── tests/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

# ⚙️ Installation

Move into the frontend directory.

```bash
cd frontend
```

Install project dependencies.

```bash
npm install
```

---

# ▶️ Development

Start the Vite development server.

```bash
npm run dev
```

The application will usually be available at:

```
http://localhost:5173
```

---

# 🌐 Environment Variables

Create a `.env` file inside the **frontend** folder.

Example:

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://your-backend-api.com
```

---

# 🔗 Backend Connection

The frontend communicates with the Express backend using Axios.

Main API features include:

- Authentication
- Blog Posts
- Comments
- Likes
- Contact Messages
- Admin Dashboard
- User Management

Make sure the backend server is running before starting the frontend.

---

# 🧪 Testing

This project uses **Vitest** together with **React Testing Library**.

Run all tests:

```bash
npm test
```

Run once:

```bash
npm run test:run
```

Open interactive UI:

```bash
npm run test:ui
```

Current tests cover:

- Components
- Pages
- Hooks
- Utilities
- API integrations
- Authentication flows

---

# 🏗 Production Build

Create a production build.

```bash
npm run build
```

Preview the production build locally.

```bash
npm run preview
```

---

# 📱 Responsive Design

The application is designed for:

- 💻 Desktop
- 📱 Mobile
- 📲 Tablet

Layouts automatically adapt to different screen sizes.

---

# ♿ Accessibility

Accessibility improvements include:

- Semantic HTML
- Keyboard navigation
- Proper heading hierarchy
- Accessible forms
- ARIA labels where appropriate
- Color contrast improvements

---

# 🎯 Coding Conventions

Some conventions followed throughout the project:

- Functional React components
- Reusable UI components
- Custom hooks for shared logic
- Context API for authentication
- API layer separated from UI
- Responsive-first design
- Consistent folder structure
- ESLint-friendly code
- Component-based architecture

---

# 🚀 Deployment

The frontend is intended to be deployed on **Vercel**.

Build command:

```bash
npm run build
```

Output directory:

```
dist/
```

Ensure the production environment variable is configured:

```env
VITE_API_URL=https://your-backend-api.com
```

---

# 📖 Learn More

Additional project documentation is available in the repository's `docs/` directory, including:

- Frontend architecture
- Component documentation
- API reference
- Testing guide
- Deployment guide

---

# 📄 License

This project is licensed under the **MIT License**.

See the repository root `LICENSE` file for details.