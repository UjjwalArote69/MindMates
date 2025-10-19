# MindMates Frontend Application

> **Modern, responsive mental health tracking application built with React, TypeScript, Vite, and Tailwind CSS**

[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [State Management](#state-management)
- [Routing](#routing)
- [API Integration](#api-integration)
- [Styling Guide](#styling-guide)
- [Components](#components)
- [Environment Setup](#environment-setup)
- [Build & Deployment](#build--deployment)

---

## 🎯 Overview

MindMates Frontend is a comprehensive mental health tracking platform that provides users with tools to monitor mood, sleep, stress levels, and maintain a digital journal. Built with modern web technologies for optimal performance and user experience.

### Key Features

- 🎨 **Beautiful UI/UX** - Gradient-rich, animated interface with Tailwind CSS
- 📱 **Fully Responsive** - Mobile-first design with desktop optimization
- 🔐 **Secure Authentication** - JWT + Google OAuth integration
- 📊 **Real-time Analytics** - Interactive charts and health metrics
- 📝 **Digital Journaling** - Rich editor with mood tracking
- 🌓 **Theme Support** - Light/dark mode compatibility
- ⚡ **Optimized Performance** - Code splitting, lazy loading, Vite build
- 🔄 **Offline Support** - Service worker for PWA capabilities

---

## 🛠️ Tech Stack

### Core Technologies

| Technology       | Version | Purpose                 |
| ---------------- | ------- | ----------------------- |
| **React**        | 18.3+   | UI library              |
| **TypeScript**   | 5.5+    | Type safety             |
| **Vite**         | 5.4+    | Build tool & dev server |
| **Tailwind CSS** | 3.4+    | Utility-first CSS       |
| **React Router** | 6.26+   | Client-side routing     |
| **Zustand**      | 5.0+    | State management        |
| **Axios**        | 1.7+    | HTTP client             |
| **Lucide React** | 0.446+  | Icon library            |
| **Swiper**       | 11.1+   | Touch slider            |

### Additional Libraries

- **Framer Motion** - Animations
- **React Hot Toast** - Notifications
- **Date-fns** - Date utilities
- **Chart.js** - Data visualization

---

## ✨ Features

### 🔐 Authentication

- Email/password registration and login
- Google OAuth 2.0 integration
- JWT token management
- Protected routes
- Persistent sessions

### 📊 Dashboard

- Mental health score overview
- Mood trends visualization
- Sleep quality tracking
- Stress level monitoring
- Activity and hydration logs

### 📝 Journaling

- Create, read, update, delete entries
- Mood tagging per entry
- Custom tags and categories
- Search and filter functionality
- Statistics and insights

### 👤 Profile Management

- Personal information editing
- Emergency contact setup
- Account settings
- Subscription management
- Data export

### 📈 Analytics

- Weekly/monthly mood trends
- Sleep pattern analysis
- Stress level tracking
- Habit streak tracking
- AI-powered insights

---

## 🚀 Getting Started

### Prerequisites

node >= 18.0.0
npm >= 9.0.0

### Installation

1. **Clone the repository**
   git clone https://github.com/yourusername/mindmates-frontend.git
   cd mindmates-frontend

2. **Install dependencies**
   npm install

3. **Set up environment variables**
   cp .env.example .env

Edit `.env`:
VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com

4. **Start development server**
   npm run dev

The app will be available at `http://localhost:5173`

### Development Commands

Start dev server
npm run dev

Build for production
npm run build

Preview production build
npm run preview

Lint code
npm run lint

Type check
npm run type-check

---

## 📁 Project Structure

src/
├── assets/ # Static assets
│ ├── Fonts/ # Custom fonts
│ ├── Icons/ # SVG icons (60+ icons)
│ └── Images/ # Images organized by feature
│
├── components/ # Reusable components
│ ├── shared/ # Shared components
│ │ ├── Navbar.tsx # Bottom navigation
│ │ ├── ProtectedRoute.tsx # Auth guard
│ │ └── OnboardingGuard.tsx
│ └── ui/ # UI components
│ └── animated-blur-testimonials/
│
├── pages/ # Page components
│ ├── Authentication/ # Auth pages
│ │ ├── Login.tsx
│ │ ├── Register.tsx
│ │ └── GoogleCallback.tsx
│ │
│ ├── Home/ # Dashboard
│ │ ├── Home.tsx
│ │ └── components/ # Home-specific components
│ │ ├── AiReccomendation.tsx
│ │ ├── MindMatesScore.tsx
│ │ ├── MindfullTracker.tsx
│ │ ├── StressLevelChart.tsx
│ │ └── SwipableCards.tsx
│ │
│ ├── Journal/ # Journal feature
│ │ ├── Journal.tsx # Layout wrapper
│ │ ├── JournalHome.tsx # Entries list
│ │ └── JournalEditor.tsx # Create/edit entry
│ │
│ ├── Profile/ # User profile
│ │ ├── Profile.tsx
│ │ ├── ProfileHome.tsx
│ │ ├── PersonalInfo.tsx
│ │ ├── Emergency.tsx
│ │ ├── Feedback.tsx
│ │ └── ...
│ │
│ ├── Stats/ # Analytics & tracking
│ │ ├── Stats.tsx
│ │ ├── StatsHome.tsx
│ │ ├── Mood.tsx
│ │ ├── SleepAnalysis.tsx
│ │ ├── Stress.tsx
│ │ └── ...
│ │
│ ├── Chat/ # AI Chat (future)
│ ├── Hero.tsx # Landing page
│ ├── Onboarding.tsx # User onboarding
│ └── DailyTracker.tsx # Daily log entry
│
├── services/ # API services
│ ├── auth.service.ts # Authentication API
│ ├── user.service.ts # User management API
│ └── journal.service.ts # Journal API
│
├── store/ # State management
│ └── userStore.ts # Zustand store
│
├── types/ # TypeScript types
│ └── declarations.d.ts
│
├── lib/ # Utility functions
│ └── utils.ts
│
├── App.tsx # App component & routing
├── main.tsx # App entry point
└── index.css # Global styles

---

## 🗄️ State Management

### Zustand Store (`userStore.ts`)

interface UserState {
// User data
user: User | null;
loading: boolean;
error: string | null;
initialized: boolean;

// Onboarding state
gender: "male" | "female" | null;
age: number;
currentMood: string | null;
sleepQuality: number | null;

// Actions
fetchUser: () => Promise<void>;
login: (email: string, password: string) => Promise<User>;
register: (name, email, password) => Promise<UserRegisterResponse>;
logout: () => Promise<void>;
updateUserProfile: (data) => Promise<void>;
submitOnboarding: () => Promise<void>;
updateTodayMood: (mood: string) => Promise<void>;
updateTodayStress: (level: number) => Promise<void>;
}

### Usage Example

import { useUserStore } from './store/userStore';

function MyComponent() {
const { user, loading, fetchUser } = useUserStore();

useEffect(() => {
fetchUser();
}, []);

if (loading) return <Loader />;

return <div>Hello {user?.name}</div>;
}

---

## 🧭 Routing

### Route Structure

<Routes> {/_ Public Routes _/} <Route path="/" element={<Hero />} /> <Route path="/auth/_" element={<Auth />} />
{/_ Protected Routes \*/}
<Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
<Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>}>
<Route index element={<JournalHome />} />
<Route path=":id" element={<JournalEditor />} />
</Route>

{/_ Stats Routes _/}
<Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>}>
<Route index element={<StatsHome />} />
<Route path="mood" element={<Mood />} />
<Route path="sleep" element={<SleepAnalysis />} />
<Route path="stress" element={<Stress />} />
</Route>
</Routes>

### Navigation

import { useNavigate } from 'react-router-dom';

function MyComponent() {
const navigate = useNavigate();

return (
<button onClick={() => navigate('/journal')}>
Go to Journal
</button>
);
}

---

## 🔌 API Integration

### Service Layer Pattern

**Location**: `src/services/`

### Example: `journal.service.ts`

import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
const token = localStorage.getItem('token');
return {
'Content-Type': 'application/json',
...(token && { Authorization: Bearer ${token} }),
};
};

export const createJournalEntry = async (data) => {
const res = await axios.post(${API}/journal, data, {
headers: getAuthHeaders(),
withCredentials: true,
});
return res.data;
};

export const getJournalEntries = async (params) => {
const res = await axios.get(${API}/journal, {
headers: getAuthHeaders(),
withCredentials: true,
params,
});
return res.data;
};

### Usage in Components

import { createJournalEntry } from '../services/journal.service';

async function handleSubmit() {
try {
const data = await createJournalEntry({
title: 'My Entry',
content: 'Today was great!',
mood: 'happy',
tags: ['gratitude']
});
console.log('Saved:', data);
} catch (error) {
console.error('Error:', error);
}
}

---

## 🎨 Styling Guide

### Tailwind CSS Utility Classes

// ✅ Good: Utility-first approach

<div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-lg"> <h1 className=-2xl font-bold-gray-800">Title</h1> </div>
// ❌ Avoid: Inline styles (unless dynamic)

<div style={{ display: 'flex', padding: '16px' }}> ```
Custom Animations
/* index.css */
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -50px) scale(1.1); }
  50% { transform: translate(-20px, 20px) scale(0.9); }
  75% { transform: translate(50px, 50px) scale(1.05); }
}

.animate-blob {
animation: blob 20s infinite cubic-bezier(0.47, 0, 0.745, 0.715);
}
Color Palette
/_ Primary Colors _/
--primary-green: #A3B763;
--primary-brown: #4B2E2B;
--accent-amber: #FCE38A;
--accent-purple: #8676E2;

/_ Background _/
--bg-cream: #F9F5F2;
--bg-light: #FDFCFB;
Responsive Design

<div className="
  w-full px-4          {/* Mobile */}
  md:px-6 md:max-w-4xl {/* Tablet */}
  lg:px-8 lg:max-w-6xl {/* Desktop */}
">
  Content
</div>
🧩 Components
Reusable Component Structure
// components/shared/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
variant = 'primary',
size = 'md',
children,
onClick,
disabled = false,
}) => {
const baseClasses = 'rounded-xl font-bold transition-all';
const variantClasses = {
primary: 'bg-green-500-white hover:bg-green-600',
secondary: 'bg-gray-200-gray-800 hover:bg-gray-300',
danger: 'bg-red-500-white hover:bg-red-600',
};
const sizeClasses = {
sm: 'px-3 py-1.5-sm',
md: 'px-4 py-2-base',
lg: 'px-6 py-3-lg',
};

return (
<button
className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
onClick={onClick}
disabled={disabled} >
{children}
</button>
);
};
Protected Route Component
// components/shared/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
const { user, loading } = useUserStore();

if (loading) return <Loader />;
if (!user) return <Navigate to="/auth/login" replace />;

return <>{children}</>;
};
🔧 Environment Setup
Environment Variables

# .env

VITE*API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
Accessing in Code
const API_URL = import.meta.env.VITE_API_BASE_URL;
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
⚠️ Note: All Vite env variables must start with VITE*

📦 Build & Deployment
Build for Production
npm run build
Output: dist/ folder

Preview Production Build
npm run preview
Deploy to Vercel

# Install Vercel CLI

npm i -g vercel

# Deploy

vercel
vercel.json:

{
"rewrites": [
{ "source": "/(.*)", "destination": "/index.html" }
]
}
Deploy to Netlify

# Build command

npm run build

# Publish directory

dist
\_redirects (in public/):

/\* /index.html 200
🧪 Testing

# Run tests

npm test

# Run tests with coverage

npm run test:coverage
Example Test
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with', () => {
render(<Button>Click me</Button>);
const buttonElement = screen.getB(/click me/i);
expect(buttonElement).toBeInTheDocument();
});
📱 Progressive Web App (PWA)
Service Worker Setup
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default {
plugins: [
VitePWA({
registerType: 'autoUpdate',
manifest: {
name: 'MindMates',
short_name: 'MindMates',
theme_color: '#A3B763',
icons: [...]
}
})
]
}
🐛 Common Issues & Solutions
Issue: CORS Error
Solution: Check backend CORS configuration

// Backend should have:
app.use(cors({
origin: 'http://localhost:5173',
credentials: true
}));
Issue: 404 on Refresh
Solution: Add redirect rules (see Deployment section)

Issue: Token Expiration
Solution: Implement token refresh logic

axios.interceptors.response.use(
response => response,
error => {
if (error.response?.status === 401) {
localStorage.removeItem('token');
window.location.href = '/auth/login';
}
return Promise.reject(error);
}
);
📚 Resources
React Documentation

TypeScript Handbook

Tailwind CSS Docs

Vite Guide

React Router Docs

📝 License
MIT © 2025 MindMates

🤝 Contributing
Contributions welcome! Please read our contributing guidelines.
