# Frontend Deployment with Vercel

## Overview

This document explains the deployment process for the frontend application using Vercel.

The frontend is built with **React** and **Vite** and communicates with the backend API deployed on Render.

## Production Architecture

```text
User Browser
      |
      ↓
Vercel (React + Vite Frontend)
      |
      ↓
Render (Node.js + Express Backend)
      |
      ↓
MongoDB Atlas + Cloudinary
```

---

## Prerequisites

Before deploying the frontend, ensure:

* Backend API is deployed and accessible.
* Frontend code is pushed to GitHub.
* Production environment variables are configured.
* The frontend builds successfully locally.

---

## Frontend Build Verification

The production build was tested locally using:

```bash
npm run build
```

Successful build output:

```text
✓ built successfully
```

The generated production files are created inside:

```text
dist/
```

---

## Vercel Deployment Setup

The project uses a monorepo structure:

```text
aman-blog/

├── backend/
│
└── frontend/
```

Since the frontend is inside a subdirectory, Vercel is configured with:

```text
Root Directory:
frontend
```

---

## Vercel Configuration

Deployment settings:

| Setting          | Value         |
| ---------------- | ------------- |
| Framework        | Vite          |
| Root Directory   | frontend      |
| Build Command    | npm run build |
| Output Directory | dist          |

---

## Environment Variables

The frontend uses environment variables for API configuration.

Local development:

```env
VITE_API_URL=http://localhost:5000
```

Production:

```env
VITE_API_URL=https://aman-blog-8jg2.onrender.com
```

The production value is configured inside the Vercel dashboard.

---

## Deployment Process

1. Connect GitHub repository to Vercel.
2. Select the frontend project.
3. Configure the root directory as `frontend`.
4. Add production environment variables.
5. Deploy the application.

Vercel automatically:

* Installs dependencies.
* Runs the Vite production build.
* Generates optimized frontend assets.
* Deploys the application globally.

---

## Deployment Verification

After deployment, verify:

* Frontend loads successfully.
* API requests reach the Render backend.
* Authentication works.
* Posts can be loaded.
* User interactions work correctly.
* Images load from Cloudinary.

---

## Production Environment Flow

```text
React Frontend
      |
      |
      ↓
VITE_API_URL
      |
      |
      ↓
Render Backend API
      |
      |
      ↓
MongoDB Atlas
```

---

## Performance Notes

The Vite build may show bundle size warnings during production builds.

These warnings do not prevent deployment.

Future improvements may include:

* Code splitting with dynamic imports.
* Lazy loading components.
* Reducing large dependency bundles.

---

## Security Notes

* Do not commit `.env` files.
* Store production variables in Vercel Environment Variables.
* Keep backend secrets only on the server.
* Configure backend CORS to allow the production frontend domain.

---

## Status

Frontend deployment configuration completed and ready for deployment on Vercel.
