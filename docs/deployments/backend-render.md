# Backend Deployment with Render

## Overview

This document explains how the backend API is deployed to Render for the production environment.

The backend is built with **Node.js** and **Express**, uses **MongoDB Atlas** as the database, and **Cloudinary** for image storage.

---

## Prerequisites

Before deploying the backend, ensure the following requirements are met:

* MongoDB Atlas cluster is configured and accessible.
* Backend source code is pushed to GitHub.
* Production environment variables are prepared.
* `package.json` includes a production `start` script.

---

## Production Scripts

The backend should include the following scripts:

```json
"scripts": {
  "start": "node ./src/server.js",
  "dev": "nodemon ./src/server.js",
  "test": "vitest",
  "test-run": "vitest run",
  "test:watch": "vitest"
}
```

---

## Server Configuration

The server should listen on the port provided by the hosting platform.

```javascript
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Deploying to Render

1. Log in to Render.
2. Click **New** → **Web Service**.
3. Connect the backend GitHub repository.
4. Configure the service:

| Setting       | Value         |
| ------------- | ------------- |
| Runtime       | Node          |
| Build Command | `npm install` |
| Start Command | `npm start`   |

5. Click **Create Web Service**.

---

## Environment Variables

Configure the following environment variables in the Render dashboard.

```env
MONGODB_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_URL=
PORT=
```

Do not commit these values to the repository.

---

## Build Process

Render will automatically:

1. Clone the repository.
2. Install project dependencies.
3. Start the Express server.
4. Connect to MongoDB Atlas.
5. Make the API publicly accessible.

---

## Deployment Verification

After deployment, verify that:

* The build completes successfully.
* The backend starts without errors.
* MongoDB Atlas connection is established.
* API endpoints respond correctly.
* Image uploads to Cloudinary work as expected.

---

## Expected Startup Logs

```text
MongoDB Connected: <cluster-host>

Server running on port <PORT>
```

---

## Production Architecture

```text
Frontend
      │
      ▼
Render (Node.js + Express)
      │
      ▼
MongoDB Atlas
      │
      ▼
Cloudinary
```

---

## Security Notes

* Store all secrets using Render Environment Variables.
* Never commit the `.env` file.
* Restrict CORS to the production frontend domain.
* Rotate secrets if they are exposed.

---

## Status

Backend deployment configuration completed and ready for production deployment on Render.
