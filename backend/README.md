# ⚙️ Aman Blog — Backend (Node.js + Express)

The **backend** powers the Aman Blog platform by providing a secure REST API for authentication, blog management, comments, contact messages, and the admin dashboard.

Built with **Node.js**, **Express**, and **MongoDB**, it follows a clean **MVC architecture** with a service layer to keep the codebase modular, maintainable, and easy to scale.

---

# 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the Server](#-running-the-server)
- [Available Scripts](#-available-scripts)
- [API Modules](#-api-modules)
- [Authentication](#-authentication)
- [File Uploads](#-file-uploads)
- [Testing](#-testing)
- [Code Style](#-code-style)
- [Future Improvements](#-future-improvements)
- [License](#-license)

---

# 📖 Overview

The backend exposes a RESTful API consumed by the React frontend.

It is responsible for:

- User authentication
- Authorization
- Blog CRUD operations
- Image uploads
- Comments
- Contact messages
- Admin dashboard statistics
- Database communication
- Business logic
- Request validation

The project follows the **MVC (Model-View-Controller)** architecture with an additional **Service Layer**, making it easier to organize business logic and keep controllers lightweight.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Hashing (bcrypt)
- Cookie-based Authentication
- Protected Routes
- Admin-only Routes

---

## 📝 Blog Management

- Create Posts
- Read Posts
- Update Posts
- Delete Posts
- Automatic Slug Generation
- Reading Time Calculation
- Search Posts
- Category Filtering
- Pagination

---

## 🖼 Cover Image Uploads

- Multer Memory Storage
- Cloudinary Integration
- Image Validation
- Automatic Image Optimization
- Replace Existing Images
- Delete Images from Cloudinary

---

## ❤️ Engagement

- Like / Unlike Posts
- View Counter
- Comment System
- Comment Count Tracking

---

## 📬 Contact System

- Contact Form API
- Store Messages
- Admin Message Management
- Read / Unread Status

---

## 📊 Admin Dashboard

- Dashboard Statistics
- User Count
- Post Count
- Contact Message Count
- Recent Activity
- Analytics Endpoints

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript Runtime |
| Express.js | REST API Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Cookie Parser | Cookie Handling |
| Multer | File Uploads |
| Cloudinary | Image Storage |
| dotenv | Environment Variables |
| CORS | Cross-Origin Requests |
| Vitest | Unit Testing |

---

# 📂 Project Structure

```text
backend/
│
├── src/
│
├── config/
│   ├── db.js
│   └── cloudinaryConfig.js
│
├── controllers/
│   ├── authControllers.js
│   ├── postControllers.js
│   ├── commentControllers.js
│   ├── contactControllers.js
│   └── dashboardControllers.js
│
├── middlewares/
│   ├── authMiddlewares.js
│   └── uploadMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│   └── Contact.js
│
├── routes/
│   ├── authRoutes.js
│   ├── postRoutes.js
│   ├── commentRoutes.js
│   ├── contactRoutes.js
│   └── dashboardRoutes.js
│
├── services/
│   ├── authServices.js
│   ├── postServices.js
│   ├── commentServices.js
│   ├── contactServices.js
│   ├── dashboardServices.js
│   └── cloudinaryService.js
│
├── validators/
│
├── utils/
│
├── app.js
└── server.js
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/amanuel1221/aman-blog.git
```

Move into the backend directory.

```bash
cd aman-blog/backend
```

Install dependencies.

```bash
npm install
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the **backend** directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

> Never commit your `.env` file to GitHub.

---

# ▶️ Running the Server

Start the development server.

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```

---

# 📦 Available Scripts

Start development server.

```bash
npm run dev
```

Run production server.

```bash
npm start
```

Run all backend tests.

```bash
npm test
```

Run tests once.

```bash
npm run test:run
```

Generate test coverage.

```bash
npm run coverage
```

---

# 📡 API Modules

The backend is organized into several modules.

## Authentication

- User Registration
- Login
- Logout
- JWT Verification

---

## Posts

- Create Post
- Get All Posts
- Get Single Post
- Update Post
- Delete Post
- Search
- Pagination
- Categories

---

## Comments

- Add Comment
- Edit Comment
- Delete Comment
- Reply to Comment
- Like / Dislike Comments

---

## Contact

- Send Message
- Retrieve Messages
- Mark Read / Unread
- Delete Messages

---

## Dashboard

- Statistics
- Recent Posts
- User Analytics
- Contact Analytics

---

# 🔐 Authentication

Authentication is handled using **JWT (JSON Web Tokens)**.

Protected routes require a valid access token.

Admin-only routes additionally verify the user's role before allowing access.

Authentication middleware includes:

- Protect Routes
- Admin Authorization
- Cookie Validation

---

# 🖼 File Uploads

The backend supports image uploads for blog cover images.

Features include:

- Upload images using Multer
- Store images in Cloudinary
- Automatic optimization
- Replace previous images on update
- Delete images when posts are removed

Supported formats:

- JPG
- JPEG
- PNG
- WEBP

Maximum upload size:

```text
5 MB
```

---

# 🧪 Testing

The backend uses **Vitest** for automated testing.

Run all tests.

```bash
npm test
```

Run once.

```bash
npm run test:run
```

Generate coverage.

```bash
npm run coverage
```

Current test coverage includes:

- Controllers
- Services
- Validators
- Utilities
- Middleware

---

# 📋 Code Style

The backend follows a consistent project structure and coding style.

### Architecture

- MVC Pattern
- Service Layer
- RESTful API Design

### Best Practices

- Input Validation
- Async/Await
- Modular Structure
- Reusable Services
- Environment Variables
- Clean Error Messages
- Separation of Concerns

---

# 🚀 Future Improvements

Planned backend enhancements include:

- Email Verification
- Password Reset
- Refresh Tokens
- Role-Based Permissions
- Draft Posts
- Scheduled Publishing
- Rich Text Editor Support
- Notifications
- Bookmark API
- OAuth Authentication
- Rate Limiting
- Request Logging
- API Documentation (Swagger/OpenAPI)

---

# 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file in the project root for details.

---

<div align="center">

Built with ❤️ using **Node.js**, **Express**, **MongoDB**, and modern backend development practices.

</div>