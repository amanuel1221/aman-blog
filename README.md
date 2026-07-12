

# 🚀 Aman Blog

### A Modern MERN Blogging Platform for Developers

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css)
![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?logo=vitest)
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

</p>

<p align="center">

A production-ready blogging platform built with the MERN stack that combines a modern developer portfolio, powerful content management, secure authentication, and an intuitive reading experience.

</p>

---

## 🌐 Live Demo

| Application       | Link                               |
| ----------------- | ---------------------------------- |
| Frontend          | https://aman-blog-seven.vercel.app |
| Backend API       | https://aman-blog-8jg2.onrender.com|
| API Documentation |               |

---

## 📚 Table of Contents

* [Overview](#-overview)
* [Project Goals](#-project-goals)
* [Features](#-features)
* [Tech Stack](#-tech-stack)
* [Project Architecture](#-project-architecture)
* [Project Structure](#-project-structure)
* [Documentation](#-documentation)
* [Getting Started](#-getting-started)
* [Environment Variables](#-environment-variables)
* [Installation](#-installation)
* [Running the Project](#-running-the-project)
* [Testing](#-testing)
* [Deployment](#-deployment)
* [Screenshots](#-screenshots)
* [API Overview](#-api-overview)
* [Security](#-security)
* [Roadmap](#-roadmap)
* [Contributing](#-contributing)
* [License](#-license)
* [Author](#-author)

---

# 🌟 Overview

**Aman Blog** is a modern full-stack blogging platform built with the **MERN** stack. It was created to combine a personal developer portfolio with a complete blogging experience while following modern software engineering practices.

The project focuses on writing clean, maintainable code and building scalable features using a layered architecture. It includes secure authentication, blog management, comments, reactions, an admin dashboard, responsive design, SEO optimization, testing, and production deployment.

Beyond being a blog, this project represents my journey as a Software Engineering student and MERN Stack Developer, bringing together everything I've learned about frontend development, backend APIs, databases, authentication, testing, deployment, and project organization.

Whether you're a recruiter, developer, or fellow student, I hope this project provides a useful example of building a production-ready web application from the ground up.

---

# 🎯 Project Goals

This project was built to:

* Build a complete production-ready MERN application
* Practice scalable backend architecture using MVC
* Improve frontend architecture with reusable React components
* Learn secure authentication using JWT and HTTP-only cookies
* Implement responsive and accessible UI design
* Explore SEO best practices for React applications
* Write maintainable and testable code
* Gain experience with deployment and cloud services
* Showcase my skills through a real-world portfolio project

---

# ✨ Features

## 📰 Blogging Experience

* Browse published articles
* Read detailed blog posts
* Reading progress indicator
* Estimated reading time
* Related posts
* Category filtering
* Search articles
* Responsive typography
* Syntax highlighted code blocks

---

## 💬 Community Features

* Comment on articles
* Reply to comments
* Like & dislike posts
* Comment validation
* Real-time UI updates
* Nested discussion threads

---

## 🔐 Authentication

* User registration
* Secure login
* JWT Authentication
* HTTP-only Cookies
* Protected routes
* Session persistence
* Password hashing using bcrypt

---

## 👤 User Experience

* Responsive interface
* Developer portfolio
* Contact page
* About page
* Smooth navigation
* Loading states
* Error handling
* Toast notifications

---

## ⚙️ Admin Dashboard

* Dashboard overview
* Manage blog posts
* Manage comments
* Manage contact messages
* User management
* Analytics overview
* Content moderation

---

## 📈 Performance & SEO

* SEO optimized pages
* Dynamic meta tags
* Open Graph support
* Structured data
* Sitemap
* Robots.txt
* Google Analytics ready
* Google Search Console ready

---

## 📱 Responsive Design

Fully optimized for:

* 💻 Desktop
* 💼 Laptop
* 📱 Mobile
* 📟 Tablet

The interface adapts seamlessly across different screen sizes while maintaining accessibility and usability.

---

# 🛠 Tech Stack

## Frontend

| Technology         | Purpose           |
| ------------------ | ----------------- |
| React              | User Interface    |
| Vite               | Build Tool        |
| React Router       | Routing           |
| Tailwind CSS       | Styling           |
| Axios              | API Requests      |
| Context API        | Global State      |
| React Helmet Async | SEO               |
| React Icons        | Icons             |
| Vitest             | Unit Testing      |
| Testing Library    | Component Testing |

---

## Backend

| Technology    | Purpose               |
| ------------- | --------------------- |
| Node.js       | JavaScript Runtime    |
| Express.js    | REST API              |
| MongoDB       | Database              |
| Mongoose      | ODM                   |
| JWT           | Authentication        |
| bcrypt        | Password Encryption   |
| Cookie Parser | Cookie Management     |
| Multer        | File Uploads          |
| Cloudinary    | Image Storage         |
|Pagination     | Paginate Posts to limit fetch posts|

---

## Development Tools

| Tool            | Purpose             |
| --------------- | ------------------- |
| Git             | Version Control     |
| GitHub          | Source Code Hosting |
| GitHub Projects | Project Management  |
| Postman         | API Testing         |
| MongoDB Atlas   | Cloud Database      |
| Vercel          | Frontend Deployment |
| Render          | Backend Deployment  |

---

---

# 🏗 Project Architecture

The project follows a modular architecture that separates responsibilities between the frontend and backend, making the codebase easier to maintain, test, and scale.

```
                    ┌─────────────────────────┐
                    │        Frontend         │
                    │  React + Vite + API     │
                    └────────────┬────────────┘
                                 │
                          HTTP Requests
                                 │
                    ┌────────────▼────────────┐
                    │      Express API        │
                    │    Controllers Layer    │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      Service Layer      │
                    │ Business Logic & Rules  │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │    Mongoose Models      │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      MongoDB Atlas      │
                    └─────────────────────────┘
```

### Backend Architecture

The backend follows the **MVC (Model–View–Controller)** pattern with an additional **Service Layer**.

| Layer       | Responsibility                         |
| ----------- | -------------------------------------- |
| Routes      | Define API endpoints                   |
| Controllers | Handle requests and responses          |
| Services    | Business logic                         |
| Models      | Database schemas                       |
| Validators  | Input validation                       |
| Middlewares | Authentication, uploads, authorization |
| Utils       | Shared helper functions                |

This structure keeps the project organized and makes each layer responsible for a single purpose.

---

# 📂 Project Structure

```
aman-blog/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── store/
│   ├── tests/
│   ├── utils/
│   └── main.jsx
│
├── backend/
│   ├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── docs/
│
├── README.md
└── LICENSE
```

---

# 📖 Documentation

Project documentation is organized inside the **docs/** directory.

| Document         | Description                          |
| ---------------- | ------------------------------------ |
| Project Overview | High-level project introduction      |
| Frontend Guide   | Frontend architecture and components |
| Backend Guide    | Backend architecture and API         |
| API Reference    | REST API documentation               |
| Database Design  | MongoDB schemas and relationships    |
| Testing Guide    | Testing strategy and commands        |
| Deployment Guide | Production deployment instructions   |

Documentation is continuously updated as the project grows.

---

# 🚀 Getting Started

Follow the steps below to run the project locally.

## Prerequisites

Before getting started, make sure the following software is installed:

* Node.js (Latest LTS)
* npm
* Git
* MongoDB Atlas account (or local MongoDB)
* Cloudinary account (for image uploads)

Verify your installation:

```bash
node -v
npm -v
git --version
```

---

# ⚙ Environment Variables

## Backend (.env)

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

## Frontend (.env)

Create another `.env` file inside the frontend directory.

```env
VITE_API_URL=http://localhost:5000
```

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/amanuel1221/aman-blog.git
```

Move into the project directory

```bash
cd aman-blog
```

---

## Install Backend Dependencies

```bash
cd backend

npm install
```

---

## Install Frontend Dependencies

Open a second terminal.

```bash
cd frontend

npm install
```

---

# ▶ Running the Project

## Start Backend

```bash
cd backend

npm run dev
```

The API will be available at

```
http://localhost:5000
```

---

## Start Frontend

```bash
cd frontend

npm run dev
```

The frontend will be available at

```
http://localhost:5173
```

Open your browser and visit:

```
http://localhost:5173
```

to explore the application.

---

# 🔄 Development Workflow

The typical workflow for contributing to the project is:

1. Create a new Git branch.
2. Implement your feature or bug fix.
3. Write or update tests.
4. Verify the application locally.
5. Commit using Conventional Commits.
6. Push your branch.
7. Open a Pull Request for review.

Example:

```bash
git checkout -b feature/add-comments

git add .

git commit -m "feat: add nested comment replies"

git push origin feature/add-comments
```

---

# 🧪 Testing

Testing is an important part of Aman Blog development. The project uses automated testing to ensure components, services, and application logic behave correctly.

The goal is to catch issues early and maintain confidence while adding new features.

---

## Frontend Testing

Frontend testing is implemented using:

* **Vitest** - Test runner
* **React Testing Library** - Component testing
* **User Event** - User interaction testing
* **jsdom** - Browser environment simulation

### Run Frontend Tests

Navigate to the frontend folder:

```bash
cd frontend
```

Run tests in watch mode:

```bash
npm test
```

Run all tests once:

```bash
npm run test:run
```

Open the interactive testing interface:

```bash
npm run test:ui
```

---

### Frontend Test Coverage Includes

✅ Components rendering correctly
✅ User interactions
✅ Form submissions
✅ Authentication states
✅ Navigation behavior
✅ Error handling
✅ UI state changes

Example:

```javascript
describe("Login Component", () => {
  it("should login user successfully", async () => {
  });
});
```

---

## Backend Testing

Backend testing focuses on validating API behavior and business logic.

Testing areas include:

* Controllers
* Services
* Validators
* Middleware
* Authentication logic
* Database operations

Example backend tests:

```javascript
describe("Post Service", () => {
  it("should create a new post", async () => {
  });
});
```

---

# 📡 API Overview

Aman Blog provides a RESTful API built with Express.js.

The API follows standard HTTP methods:

| Method | Purpose       |
| ------ | ------------- |
| GET    | Retrieve data |
| POST   | Create data   |
| PATCH  | Update data   |
| DELETE | Remove data   |

---

# 🔐 Authentication API

| Endpoint         | Method | Description        |
| ---------------- | ------ | ------------------ |
| `/auth/register` | POST   | Create new account |
| `/auth/login`    | POST   | Login user         |
| `/auth/logout`   | POST   | Logout user        |
| `/auth/me`       | GET    | Get current user   |

Authentication uses:

* JWT tokens
* HTTP-only cookies
* Protected middleware

---

# 📝 Posts API

| Endpoint          | Method | Description      |
| ----------------- | ------ | ---------------- |
| `/posts`          | GET    | Get all posts    |
| `/posts/:slug`    | GET    | Get post details |
| `/posts`          | POST   | Create post      |
| `/posts/:id`      | PATCH  | Update post      |
| `/posts/:id`      | DELETE | Delete post      |
| `/posts/:id/view` | POST   | Increase views   |
| `/posts/:id/like` | POST   | Like/unlike post |

---

# 💬 Comments API

| Endpoint                 | Method | Description    |
| ------------------------ | ------ | -------------- |
| `/api/comments`          | POST   | Add comment    |
| `/api/comments/:id`      | PATCH  | Update comment |
| `/api/comments/:id`      | DELETE | Delete comment |
| `/api/comments/:id/like` | POST   | Like comment   |

---

# 📩 Contact API

| Endpoint                  | Method | Description          |
| ------------------------- | ------ | -------------------- |
| `/api/contact`            | POST   | Send contact message |
| `/admin/contact/messages` | GET    | View messages        |

---

# 🖼 Image Upload

Aman Blog uses Cloudinary for handling media uploads.

Image workflow:

```
User uploads image
        ↓
Multer receives file
        ↓
Cloudinary stores image
        ↓
Image URL saved in MongoDB
        ↓
Frontend displays optimized image
```

Supported formats:

* JPG
* JPEG
* PNG
* WEBP

---

# 🚀 Deployment

The application is deployed using modern cloud services.

## Deployment Architecture

```
                 Users

                   │

                   ▼

          ┌────────────────┐
          │     Vercel     │
          │    Frontend    │
          └────────────────┘

                   │

                   ▼

          ┌────────────────┐
          │     Render     │
          │    Backend     │
          └────────────────┘

                   │

                   ▼

          ┌────────────────┐
          │ MongoDB Atlas  │
          │   Database     │
          └────────────────┘

                   │

                   ▼

          ┌────────────────┐
          │   Cloudinary   │
          │     Media      │
          └────────────────┘
```

---

## Frontend Deployment

Frontend is deployed using:

**Vercel**

Build command:

```bash
npm run build
```

Output:

```
dist/
```

Environment variable:

```env
VITE_API_URL=your_backend_url
```

---

## Backend Deployment

Backend is deployed using:

**Render**

Required settings:

```
Environment:
Node

Build Command:
npm install

Start Command:
npm start
```

Required environment variables:

```env
PORT
MONGO_URI
JWT_SECRET
CLIENT_URL

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

---

# 📸 Screenshots

Screenshots demonstrate the main features of Aman Blog.

---

## 🏠 Homepage

<p align="center">

<img src="./assets/screenshots/Homepages.png" width="900">

</p>

---

## 📖 Blog Details

<p align="center">

<img src="./assets/screenshots/DetilsPage.png" width="900">

</p>

---

## 📬 Blogs Page

<p align="center">

<img src="./assets/screenshots/BlogsPae.png" width="900">

</p>

---

## 📬 About Page

<p align="center">

<img src="./assets/screenshots/AboutPage.png" width="900">

</p>

---

## 🔐 Authentication

| Sign In | Sign Up |
|---------|---------|
| <img src="./assets/screenshots/SignInPage.png" width="450"> | <img src="./assets/screenshots/SinuUpPage.png" width="450"> |

---

## ⚙️ Admin Dashboard

<p align="center">

<img src="./assets/screenshots/Dashboard.png" width="900">

</p>

---


## 📬 Admin messages

<p align="center">

<img src="./assets/screenshots/AdminMessages.png" width="900">

</p>

---
## 📬 Admin Analytics

<p align="center">

<img src="./assets/screenshots/AdminAnalytics.png" width="900">

</p>

---

## 📬 Admin posts

<p align="center">

<img src="./assets/screenshots/\Admin Posts.png" width="900">

</p>

---

---

## 📬 Create Post

<p align="center">

<img src="./assets/screenshots/createPost.png" width="900">

</p>

---

## 📬 Contact System

<p align="center">

<img src="./assets/screenshots/contactPage.png" width="900">

</p>

---

# 🧪 Testing

This project includes a complete testing system for both the frontend and backend applications.  
The goal of the test suite is to ensure reliability, maintainability, and confidence when adding new features or refactoring existing code.

---

## Frontend Testing

The frontend testing system is built with **Vitest**, **React Testing Library**, and **user-event**.  
The tests focus on real user behavior instead of implementation details, ensuring that the application works correctly from a user's perspective.

### What Was Tested

The frontend test suite covers:

- ✅ Component rendering and behavior
- ✅ User interactions such as clicks, typing, and form submissions
- ✅ Navigation and routing behavior
- ✅ Authentication flows
- ✅ Search and filtering functionality
- ✅ Blog post interactions
- ✅ Comments and reactions system
- ✅ Contact form validation and submission
- ✅ Admin dashboard pages and management features
- ✅ Error handling and loading states

The testing approach includes:

- Unit testing for reusable components
- Integration testing for complete pages
- User-flow testing for important application journeys

### Frontend Test Result

<p align="center">
  <img src="./assets/screenshots/frontend-test.png" width="900">
</p>

---

## Backend Testing

The backend testing system is built with **Vitest** and **Supertest** to verify API behavior, business logic, and backend reliability.

The tests are organized by controllers, services, middleware, and validators to keep the test architecture scalable and maintainable.

### What Was Tested

The backend test suite covers:

- ✅ Authentication functionality
  - User registration
  - User login
  - Token validation
  - Authentication middleware

- ✅ Post management
  - Creating posts
  - Fetching posts
  - Updating posts
  - Handling invalid requests

- ✅ Comment management
  - Creating comments
  - Retrieving comments
  - Updating and deleting comments

- ✅ Contact message handling
  - Creating messages
  - Retrieving messages
  - Validation of submitted data

- ✅ Validation and error handling
  - Required fields
  - Invalid input formats
  - Failed operations
  - Unauthorized requests

### Backend Test Result

<p align="center">
  <img src="./assets/screenshots/Backend-test.png" width="900">
</p>

---

# 🚀 Future Testing Improvements

Although the current test coverage provides strong confidence in the application, the following improvements are planned:

### Frontend Improvements

- Add end-to-end testing using Playwright or Cypress
- Add visual regression testing for UI consistency
- Add accessibility testing with tools like axe
- Add performance testing for important user flows
- Integrate automated tests into GitHub Actions CI/CD
- Increase coverage for edge cases and complex interactions

### Backend Improvements

- Add full integration testing with a dedicated test database
- Expand API endpoint coverage
- Add more edge-case testing for posts and comments
- Improve authorization and permission testing
- Add automated API testing in CI/CD pipelines
- Add load and performance testing for critical endpoints

---

## Testing Philosophy

The testing strategy focuses on:

- Testing user behavior instead of implementation details
- Keeping tests independent and maintainable
- Mocking external dependencies when necessary
- Ensuring reliability during future development

This approach helps maintain a stable, scalable, and production-ready application.

# 📊 Performance & Optimization

The project focuses on delivering a fast and optimized user experience.

Implemented improvements:

* Lazy loading components
* Image optimization
* Code splitting
* SEO metadata
* Optimized API requests
* Responsive layouts
* Efficient React rendering
* Database query optimization

---

# 🔍 SEO Implementation

Aman Blog includes SEO optimization features:

✅ Dynamic page titles
✅ Meta descriptions
✅ Open Graph tags
✅ Twitter cards
✅ Structured data
✅ Sitemap.xml
✅ Robots.txt
✅ Google Search Console support
✅ Google Analytics integration ready

These improvements help search engines understand and index the content properly.

---

# 🔒 Security

Security was considered throughout development.

Implemented:

* JWT authentication
* HTTP-only cookies
* Password hashing
* Input validation
* Protected routes
* Authorization checks
* CORS configuration
* Secure environment variables
* MongoDB query protection
* File upload validation

---

# 🛣 Roadmap

Future improvements planned:

## Completed

* [x] MERN application setup
* [x] Authentication system
* [x] Blog management
* [x] Comments system
* [x] Admin dashboard
* [x] Cloudinary image uploads
* [x] Testing setup
* [x] Production deployment
* [x] Markdown support

---

## Upcoming

* [ ] OAuth authentication
* [ ] Email verification
* [ ] Password reset
* [ ] Rich text editor
* [ ] Notifications
* [ ] Bookmark posts
* [ ] User following system
* [ ] Dark mode
* [ ] Progressive Web App (PWA)

---

# 🤝 Contributing

Contributions, suggestions, and feedback are welcome.

## How to contribute

### 1. Fork the repository

### 2. Create a branch

```bash
git checkout -b feature/new-feature
```

### 3. Make your changes

### 4. Run tests

```bash
npm test
```

### 5. Commit your changes

```bash
git commit -m "feat: add new feature"
```

### 6. Push your branch

```bash
git push origin feature/new-feature
```

### 7. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

You are free to:

* Use the project
* Modify it
* Distribute it

See the `LICENSE` file for details.

---

# 👨‍💻 Author

## Aman Amare

Software Engineering Student
MERN Stack Developer

Passionate about building modern web applications, learning new technologies, and improving software engineering skills through real-world projects.

---

## 🔗 Links

GitHub:

https://github.com/amanuel1221

Portfolio:

https://amanuel-portfolio-flame.vercel.app

---

<p align="center">

⭐ If you found this project interesting, consider giving it a star!

<br/>

Built with ❤️ using React, Node.js, Express, MongoDB, and modern web technologies.

</p>

