# Aman Blog Backend

A production-oriented REST API powering the **Aman Blog** platform.

The backend is built with **Node.js, Express, and MongoDB** and provides authentication, authorization, blog management, comments, contact messaging, dashboard analytics, and media management.

The codebase follows an **MVC architecture with a service layer**, separating HTTP handling, business logic, data access, and external integrations.

---

## Overview

The Aman Blog backend is responsible for the application's core server-side behavior.

It provides APIs for:

* Authentication and authorization
* User registration and login
* Google OAuth authentication
* Blog post CRUD operations
* Search, filtering, and pagination
* Comments and replies
* Post and comment reactions
* Contact messages
* Admin dashboard statistics
* Image uploads and media management
* MongoDB persistence
* Request validation
* Protected administrative operations

The backend is consumed by the React frontend through REST APIs.

---

## Architecture

The application follows a layered backend structure:

```text
Client
  │
  ▼
Express Routes
  │
  ▼
Middleware
  │
  ├── Authentication
  ├── Authorization
  ├── Validation
  └── Upload Handling
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ├── Business Logic
  ├── Database Operations
  └── External Services
  │
  ├───────────────┬────────────────
  ▼               ▼
MongoDB        Cloudinary
```

### Request Flow

A typical protected request follows this pattern:

```text
User Action
    ↓
React Frontend
    ↓
HTTP Request
    ↓
Express Route
    ↓
Authentication Middleware
    ↓
Authorization / Validation
    ↓
Controller
    ↓
Service Layer
    ↓
MongoDB / Cloudinary
    ↓
HTTP Response
    ↓
React UI
```

This separation keeps controllers focused on HTTP concerns while the service layer handles reusable business logic.

---

## Features

### Authentication & Authorization

* User registration
* User login
* JWT authentication
* JWT stored in HTTP-only cookies
* Password hashing with bcrypt
* Protected routes
* Admin-only routes
* Google OAuth authentication
* Authentication middleware
* Role-based authorization

The authentication system separates **identity verification** from **permission checking**.

```text
Authentication
      ↓
Who is this user?

Authorization
      ↓
What is this user allowed to do?
```

---

### Blog Management

The API supports the complete blog content lifecycle:

* Create posts
* Read posts
* Update posts
* Delete posts
* Automatic slug generation
* Reading-time calculation
* Search
* Category filtering
* Pagination
* Post view counting

The backend keeps blog-related business rules on the server rather than relying entirely on frontend logic.

---

### Comments & Engagement

The backend supports community interactions including:

* Add comments
* Edit comments
* Delete comments
* Reply to comments
* Comment reactions
* Like / unlike posts
* Post view counting
* Comment count tracking

These operations are validated and persisted through the API.

---

### Contact System

The contact module provides:

* Contact form submission
* Message persistence
* Admin message retrieval
* Read / unread state
* Message deletion

This allows customer or visitor communication to be managed from the administrative side.

---

### Admin Dashboard

The backend provides administrative statistics and data required by the dashboard.

Examples include:

* Total users
* Total posts
* Contact message count
* Recent activity
* Analytics data
* Administrative content management

Protected backend routes ensure that administrative operations are only available to authorized users.

---

### Media Uploads

Blog cover images are handled through a dedicated upload pipeline.

```text
Frontend
   ↓
Multer Memory Storage
   ↓
Validation
   ↓
Cloudinary
   ↓
Image URL
   ↓
MongoDB
```

Supported formats include:

* JPG
* JPEG
* PNG
* WEBP

Maximum upload size:

```text
5 MB
```

The backend also supports:

* Image validation
* Image optimization
* Replacing existing images
* Deleting images from Cloudinary
* Removing associated media when content is deleted

---

## Technology Stack

| Technology    | Purpose                       |
| ------------- | ----------------------------- |
| Node.js       | JavaScript runtime            |
| Express.js    | REST API framework            |
| MongoDB       | Primary database              |
| Mongoose      | MongoDB ODM                   |
| JWT           | Authentication                |
| bcryptjs      | Password hashing              |
| Cookie Parser | Cookie handling               |
| Multer        | File upload processing        |
| Cloudinary    | Media storage and delivery    |
| dotenv        | Environment configuration     |
| CORS          | Cross-origin request handling |
| Vitest        | Automated testing             |

---

## Project Structure

```text
backend/
│
├── src/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinaryConfig.js
│   │
│   ├── controllers/
│   │   ├── authControllers.js
│   │   ├── postControllers.js
│   │   ├── commentControllers.js
│   │   ├── contactControllers.js
│   │   └── dashboardControllers.js
│   │
│   ├── middlewares/
│   │   ├── authMiddlewares.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   ├── Comment.js
│   │   └── Contact.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── contactRoutes.js
│   │   └── dashboardRoutes.js
│   │
│   ├── services/
│   │   ├── authServices.js
│   │   ├── postServices.js
│   │   ├── commentServices.js
│   │   ├── contactServices.js
│   │   ├── dashboardServices.js
│   │   └── cloudinaryService.js
│   │
│   ├── validators/
│   │
│   ├── utils/
│   │
│   ├── app.js
│   └── server.js
│
└── package.json
```

### Layer Responsibilities

**Routes**

Define API endpoints and connect requests to the appropriate middleware and controller.

**Middleware**

Handles cross-cutting concerns such as authentication, authorization, validation, and file processing.

**Controllers**

Handle HTTP requests and responses while delegating business logic to services.

**Services**

Contain reusable business logic and coordinate database or external-service operations.

**Models**

Define MongoDB schemas and data relationships using Mongoose.

---

## API Modules

### Authentication

Handles:

```text
Registration
Login
Logout
JWT verification
Google OAuth
Protected access
Admin authorization
```

### Posts

Handles:

```text
Create
Read
Update
Delete
Search
Filtering
Pagination
Slug generation
View counting
```

### Comments

Handles:

```text
Create
Edit
Delete
Reply
Like / Unlike
```

### Contact

Handles:

```text
Create message
Read messages
Mark read / unread
Delete messages
```

### Dashboard

Handles:

```text
Statistics
Recent activity
User analytics
Contact analytics
```

---

## Authentication Flow

The authentication process follows a protected server-side flow.

```text
Login Request
    ↓
Validate Credentials
    ↓
Verify Password
    ↓
Generate JWT
    ↓
Set HTTP-only Cookie
    ↓
Authenticated Requests
    ↓
Authentication Middleware
    ↓
Verify JWT
    ↓
Attach User Context
    ↓
Protected Controller
```

For administrative actions, authorization is checked after authentication.

```text
Authenticated User
        ↓
Check Role
        ↓
Admin?
   ┌────┴────┐
  Yes        No
   ↓          ↓
Allow      Reject
```

---

## Database

MongoDB stores the application's persistent data.

Main models include:

| Model   | Responsibility                        |
| ------- | ------------------------------------- |
| User    | User accounts and authentication data |
| Post    | Blog content and post metadata        |
| Comment | Comments, replies, and engagement     |
| Contact | Visitor contact messages              |

Mongoose provides schema definitions, validation, relationships, and database interaction.

---

## File Upload Pipeline

The backend uses **Multer memory storage** to process incoming uploads before sending them to Cloudinary.

```text
Multipart Request
       ↓
Multer
       ↓
File Validation
       ↓
Cloudinary Upload
       ↓
Cloudinary URL
       ↓
MongoDB Document
```

When an existing post image is replaced, the previous Cloudinary asset can also be removed to avoid leaving unused media behind.

---

## Validation & Error Handling

The backend is designed to validate incoming data before performing protected operations.

Important validation areas include:

* Authentication credentials
* Request body data
* User permissions
* Uploaded files
* Database identifiers
* Required fields

Errors are handled at the API layer so the frontend can respond appropriately to invalid or failed requests.

---

## Testing

The backend uses **Vitest** for automated testing.

Run all tests:

```bash
npm test
```

Run tests once:

```bash
npm run test:run
```

Generate coverage:

```bash
npm run coverage
```

Testing covers areas such as:

* Controllers
* Services
* Middleware
* Validators
* Utilities
* API behavior

Across the Aman Blog application, testing is treated as part of the development workflow rather than something added only after implementation.

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit secrets or `.env` files to the repository.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/amanuel1221/aman-blog.git
```

### 2. Move into the backend

```bash
cd aman-blog/backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create `.env` and add the required configuration.

### 5. Start the development server

```bash
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

---

## Available Scripts

### Development

```bash
npm run dev
```

Starts the development server.

### Production

```bash
npm start
```

Starts the production server.

### Testing

```bash
npm test
```

Runs the test suite.

```bash
npm run test:run
```

Runs tests once.

```bash
npm run coverage
```

Generates test coverage information.

---

## Code Organization Principles

The backend follows several engineering principles.

### Separation of Concerns

Routes, middleware, controllers, services, models, and external integrations have separate responsibilities.

### Reusable Business Logic

Common operations are placed in services rather than duplicated across controllers.

### Protected Server-Side Operations

Authorization and sensitive business rules are enforced on the backend.

### Environment-Based Configuration

Secrets and deployment-specific settings are supplied through environment variables.

### Maintainability

The structure is designed so individual modules can be changed without unnecessarily affecting unrelated parts of the system.

---

## Security Considerations

Security-related implementation includes:

* HTTP-only authentication cookies
* Password hashing with bcrypt
* Protected routes
* Admin authorization
* Input validation
* File validation
* Environment-based secrets
* CORS configuration

The backend is responsible for enforcing permissions rather than trusting the client.

---

## Production Considerations

The backend is designed with production concerns in mind:

* Environment-based configuration
* MongoDB persistence
* Cloudinary media storage
* Protected API operations
* Structured application layers
* Automated testing
* Error handling
* Separation of business logic from HTTP handling

The goal is to keep the backend maintainable as the application grows.

---

## Future Improvements

Potential backend improvements include:

* Email verification
* Password reset
* Refresh-token authentication
* More granular role-based permissions
* Draft posts
* Scheduled publishing
* Notifications
* Bookmark APIs
* Rate limiting
* Request logging
* API documentation with Swagger / OpenAPI
* Additional integration and end-to-end testing

These are future improvements rather than current functionality.

---

## What This Backend Demonstrates

This project gave me practical experience building a complete backend system rather than only individual API endpoints.

It demonstrates experience with:

* REST API design
* Node.js and Express
* MongoDB and Mongoose
* Authentication and authorization
* JWT and HTTP-only cookies
* OAuth integration
* MVC architecture
* Service-layer design
* File upload pipelines
* Cloudinary integration
* Validation and error handling
* Automated testing
* Admin-oriented backend workflows
* Production-oriented application design

---

## Related Project

The backend is part of the larger **Aman Blog** full-stack application.

**Live Application:**
https://aman-blog-seven.vercel.app

**Main Repository:**
https://github.com/amanuel1221/aman-blog

---

## License

This project is licensed under the **MIT License**.

See the `LICENSE` file in the repository root for details.

---

<div align="center">

Built with **Node.js · Express · MongoDB · Mongoose**

</div>
