# TaskPlanet Social - Full Stack Media Application

This is a production-level social media application built with the MERN stack (MongoDB, Express, React, Node.js) and Material UI.

## 🚀 Features

- **Authentication**: JWT-based login/signup with secure password hashing.
- **Feed**: Card-based social feed with dark mode UI similar to TaskPlanet.
- **Posts**: Create posts with text and image support.
- **Engagement**: Real-time-like UI updates for Likes and Comments.
- **Pagination**: Supports loading posts in batches.
- **Responsive**: Fully optimized for mobile and desktop.

---

## 🛠️ Setup Instructions

### 1. Backend Setup
1. Open terminal and navigate to `server/`:
   ```bash
   cd social-app/server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` folder based on `.env.example`.
4. Add your **MongoDB Atlas Connection URI**.
5. Start the server:
   ```bash
   npm run start
   ```

### 2. Frontend Setup
1. Open another terminal and navigate to `client/`:
   ```bash
   cd social-app/client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```

---

## 🌍 Deployment Guide

### Backend (Render)
1. Push the code to a GitHub repository.
2. Link your repository to a new **Web Service** on [Render](https://render.com/).
3. Set the **Root Directory** to `social-app/server`.
4. Add environment variables (MONGO_URI, JWT_SECRET, etc.).
5. Use `npm install` as the build command and `node server.js` as the start command.

### Frontend (Vercel)
1. Link your repository to a new project on [Vercel](https://vercel.com/).
2. Set the **Root Directory** to `social-app/client`.
3. Set the **Framework Preset** to Vite.
4. Add the backend API URL to your environment variables if needed (update `api.js` to use a dynamic URL).
5. Vercel will automatically build and deploy.

---

## ⚠️ Important Note
Make sure to update the `baseURL` in `client/src/services/api.js` to your deployed backend URL before deploying the frontend.
