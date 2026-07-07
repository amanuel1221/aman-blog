# MongoDB Atlas Deployment Documentation

## Overview

This document explains how the production MongoDB database was created and configured using MongoDB Atlas.

The application uses MongoDB Atlas as the production database service and connects through Mongoose from the Node.js backend.

## Production Architecture

```
Frontend Application
        |
        |
        ↓
Backend API (Node.js + Express)
        |
        |
        ↓
MongoDB Atlas Cluster
```

## MongoDB Atlas Setup

### 1. Create Atlas Project

A MongoDB Atlas project was created:

```
Organization:
Amanuel's Org

Project:
Project 0
```

### 2. Create Database Cluster

A free MongoDB Atlas cluster was created:

```
Cluster Name:
Cluster0

Plan:
Free Tier (M0)

Provider:
AWS

Region:
Paris (eu-west-3)

Database Version:
MongoDB 8.0
```

## Database User Configuration

A database user was created for backend authentication.

```
Username:
**************

Authentication:
SCRAM

Role:
atlasAdmin
```

The credentials are stored securely in environment variables and are not committed to the repository.

## Network Access Configuration

To allow the backend application to connect to MongoDB Atlas, network access was configured.

Allowed IP:

```
0.0.0.0/0
```

This allows connections from hosted environments where IP addresses may change.

## Connection Configuration

The backend connects using a MongoDB SRV connection string.

Example:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blogDB
```

The actual credentials are stored in the `.env` file.

## Environment Variables

The backend requires:

```env
MONGODB_URI=
```

Example:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blogDB
```

## Database Name

The production database is:

```
blogDB
```

Collections are created automatically by Mongoose when data is inserted.

Expected collections:

```
blogDB

├── users
├── posts
├── comments
├── contacts
└── reactions
```

## Testing Connection

The database connection was tested locally by starting the backend server.

Successful connection output:

```
MongoDB Connected: cluster0....
Server running on port 5000
```

## Security Notes

* Database credentials are stored only in environment variables.
* `.env` files are excluded using `.gitignore`.
* Database access should be reviewed before production launch.
* Atlas monitoring and alerts can be enabled when needed.

## Status

MongoDB Atlas production database setup completed successfully.
