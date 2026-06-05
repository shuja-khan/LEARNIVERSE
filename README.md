# Learniverse 🌌

> **AI-powered learning community. Real community. Zero limits.**

## 📖 Project Overview

Learniverse is a **premium learning community platform** combining AI tutoring, gamified XP, real-time chat, curated courses, and a jobs board.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Custom CSS Animations
- **Auth + DB**: Firebase (Auth, Firestore, Realtime Database)
- **AI**: Google Gemini API (gemini-1.5-flash)
- **Fonts**: Syne + DM Sans + JetBrains Mono

## 🚀 Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure `.env.local`
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here
```

### 3. Run dev server
```bash
npm run dev
```

## 🔑 Getting API Keys

### Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click **"Create API Key"**

### Firebase Config
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project → Enable Auth (Email + Google) → Create Firestore + Realtime DB
3. Project Settings → Your Apps → Web → Copy config

## 🌐 Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Add environment variables in Vercel dashboard → redeploy.

## ✨ Features
- 🤖 Gemini AI Tutor with typewriter + voice mode
- 🏆 XP & Badge System (Beginner → Explorer → Pro → Master)
- 💬 Firebase Realtime Community Chat
- 📚 12 Curated Courses with category filter
- 💼 10 Job Listings with search + filter
- ⭐ Premium Channel (unlocks at 500 XP)
- 💡 Motivational quotes every 5 minutes
- 🎯 3-step onboarding wizard

Built with ❤️ for learners everywhere.
