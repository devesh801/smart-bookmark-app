# Smart Bookmark Manager

A full-stack web application that allows users to securely save and manage personal bookmarks.  
Built using **Next.js (App Router)** and **Supabase**, with Google OAuth authentication and real-time updates.

---

## 🔗 Live Demo

👉 https://smart-bookmark-app-gray-sigma.vercel.app

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **Supabase**
  - Google OAuth Authentication
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Realtime subscriptions
- **Tailwind CSS**
- **Vercel** (Deployment)
- **GitHub** (Version Control)

---

## ✨ Features

- Google OAuth login (no passwords)
- Users can add and delete bookmarks (title + URL)
- Each user can only see their own bookmarks
- Real-time updates across multiple browser tabs
- Secure backend with database-level access control
- Fully deployed on Vercel

---

## 🧱 Architecture Overview

This application follows a serverless full-stack architecture:

- **Frontend**: Next.js App Router with client-side components
- **Authentication**: Supabase Google OAuth
- **Database**: PostgreSQL (Supabase)
- **Security**: Row Level Security (RLS)
- **Realtime**: Supabase Postgres subscriptions
- **Deployment**: Vercel

No custom backend server is used.

---

## 🔐 Data Privacy & Security (RLS)

Each bookmark row contains a `user_id`.

RLS policies ensure:

- Users can read only their own bookmarks
- Users can insert bookmarks for themselves
- Users can delete only their own bookmarks

This guarantees complete data isolation between users.

---

## 🔄 Real-Time Updates

The app listens to changes on the `bookmarks` table using Supabase Realtime.

Whenever a bookmark is added or deleted:
- UI updates instantly
- No page refresh required
- Changes reflect across multiple open tabs

---

## 🚀 Deployment

The project is deployed on **Vercel**.

### Environment Variables Used

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
