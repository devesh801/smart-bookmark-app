# Smart Bookmark Manager

A simple full-stack bookmark manager built using Next.js (App Router) and Supabase.  
Users can securely log in using Google OAuth, manage private bookmarks, and see real-time updates across tabs.

---

## 🔗 Live Demo

https://smart-bookmark-m4t5j13j4-gunwant-patils-projects.vercel.app

---

## 🛠 Tech Stack

- **Next.js (App Router)**
- **Supabase**
  - Authentication (Google OAuth)
  - Postgres Database
  - Row Level Security (RLS)
  - Realtime subscriptions
- **Tailwind CSS**
- **Vercel** (Deployment)

---

## ✅ Features

- Google OAuth authentication (no email/password)
- Users can add bookmarks (title + URL)
- Bookmarks are private per user
- Real-time updates across multiple tabs
- Users can delete their own bookmarks
- Fully deployed on Vercel

---

## 🧱 Architecture Overview

The application is built using Next.js App Router with client components for authentication and realtime interactions.

- Authentication is handled using Supabase Google OAuth.
- Bookmarks are stored in a Postgres table.
- Privacy is enforced using Row Level Security (RLS).
- Real-time updates are implemented using Supabase Realtime (Postgres change subscriptions).
- No separate backend server is implemented. Supabase handles authentication, database, and realtime functionality as a Backend-as-a-Service (BaaS).

---

## 🔐 Data Privacy (Row Level Security)

Privacy is enforced at the database level using RLS policies.

Each bookmark row contains a `user_id` column.

Policies ensure:

- SELECT: `user_id = auth.uid()`
- INSERT: `user_id = auth.uid()`
- DELETE: `user_id = auth.uid()`

This guarantees users can only view and modify their own bookmarks.

---

## 🔄 Real-Time Updates

Real-time updates are implemented using Supabase's Postgres change subscriptions.

The app subscribes to changes on the `bookmarks` table and re-fetches data whenever an INSERT or DELETE event occurs.

This allows bookmarks to update instantly across multiple open tabs without refreshing the page.

---

## 🚀 Deployment

The app is deployed on Vercel.

Environment variables used:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

---

Production OAuth configuration includes:

- Supabase Site URL updated to Vercel domain
- Redirect URLs configured in Supabase
- Authorized origins configured in Google Cloud Console

---

## ⚠️ Challenges Faced

1. Configuring Google OAuth correctly for production.
2. Ensuring Row Level Security policies were correctly scoped.
3. Properly handling realtime subscriptions to avoid duplicate listeners.
4. Properly setting environment variables during deployment.

Each issue was resolved by reviewing Supabase documentation and testing configuration changes incrementally.

---

## 📌 Future Improvements

- Edit bookmark functionality
- URL validation before insertion
- Pagination for large bookmark lists
- Optimistic UI updates
- Bookmark categorization

---

## 📂 Repository

https://github.com/gunwant29/smart-bookmark-app

