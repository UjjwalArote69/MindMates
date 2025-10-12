# MindMates - Full-Stack Mental Health Platform

> **Complete mental health tracking platform with AI insights, journaling, and personalized analytics**

[![React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-brightgreen)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## 🌟 Project Overview

**MindMates** is a comprehensive mental health tracking platform designed to help users monitor their emotional well-being, track daily habits, and gain insights into their mental health patterns. The platform combines modern web technologies with AI-powered analytics to provide personalized mental health support.

### 🎯 Core Features

| Feature | Description |
|---------|-------------|
| **Smart Authentication** | Email/password + Google OAuth 2.0 with JWT tokens |
| **Mental Health Dashboard** | Real-time mental health score with visual analytics |
| **Mood Tracking** | Daily mood logging with trend analysis and insights |
| **Digital Journal** | Private journaling with mood tagging and search |
| **Sleep Analysis** | Track sleep quality and patterns over time |
| **Stress Management** | Monitor stress levels with breathing exercises |
| **Habit Tracking** | Hydration, activity, and meditation tracking |
| **AI Insights** | Personalized recommendations based on data patterns |
| **Profile Management** | Customizable user profiles with privacy controls |
| **Data Analytics** | Weekly/monthly reports with streak tracking |

---

## 🏗️ System Architecture

┌─────────────────────────────────────────────────────────────┐
│ CLIENT LAYER │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ React 18 + TypeScript + Vite │ │
│ │ - Tailwind CSS for styling │ │
│ │ - Zustand for state management │ │
│ │ - React Router for navigation │ │
│ │ - Axios for API communication │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
│ HTTPS/REST API
│ (JSON)
┌──────────────────────▼──────────────────────────────────────┐
│ SERVER LAYER │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Express.js + TypeScript │ │
│ │ - JWT Authentication │ │
│ │ - Passport.js OAuth │ │
│ │ - CORS & Security Middleware │ │
│ │ - RESTful API Routes │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
│ Mongoose ODM
│
┌──────────────────────▼──────────────────────────────────────┐
│ DATABASE LAYER │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ MongoDB Atlas │ │
│ │ - User Collection │ │
│ │ - Journal Collection │ │
│ │ - Feedback Collection │ │
│ │ - Indexed & Optimized │ │
│ └──────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘



---

## 📦 Technology Stack

### Frontend Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | React | 18.3.1 | UI library |
| **Language** | TypeScript | 5.5.3 | Type safety |
| **Build Tool** | Vite | 5.4.1 | Fast dev server & bundler |
| **Styling** | Tailwind CSS | 3.4.1 | Utility-first CSS |
| **State** | Zustand | 5.0.0-rc.2 | Global state management |
| **Routing** | React Router | 6.26.2 | Client-side routing |
| **HTTP** | Axios | 1.7.7 | API requests |
| **Icons** | Lucide React | 0.446.0 | Icon library |
| **Slider** | Swiper | 11.1.14 | Touch slider |

### Backend Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Runtime** | Node.js | 18.x+ | Server runtime |
| **Framework** | Express | 4.21.1 | Web framework |
| **Language** | TypeScript | 5.6.3 | Type safety |
| **Database** | MongoDB | 6.0+ | NoSQL database |
| **ODM** | Mongoose | 8.7.1 | MongoDB object modeling |
| **Auth** | Passport.js | 0.7.0 | Authentication |
| **Tokens** | JSON Web Token | 9.0.2 | JWT generation |
| **Security** | Bcrypt | 5.1.1 | Password hashing |
| **Validation** | Express Validator | 7.2.0 | Input validation |

---

## 🚀 Quick Start Guide

### Prerequisites

Ensure you have the following installed:

node >= 18.0.0
npm >= 9.0.0
git >= 2.0.0
MongoDB account (MongoDB Atlas recommended)
Google Cloud account (for OAuth)



### 1️⃣ Clone the Repository

git clone https://github.com/yourusername/mindmates.git
cd mindmates



### 2️⃣ Backend Setup

Navigate to backend directory
cd backend

Install dependencies
npm install

Create .env file
cp .env.example .env

Edit .env with your credentials
nano .env



**Backend `.env` configuration:**

PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mindmates
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:5173
SESSION_SECRET=your_session_secret_key


undefined
Start backend server
npm run dev



Backend will run on `http://localhost:5000`

### 3️⃣ Frontend Setup

Open new terminal and navigate to frontend
cd frontend

Install dependencies
npm install

Create .env file
cp .env.example .env

Edit .env
nano .env



**Frontend `.env` configuration:**

VITE_API_BASE_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com


undefined
Start frontend dev server
npm run dev



Frontend will run on `http://localhost:5173`

### 4️⃣ Access the Application

Open your browser and navigate to:
http://localhost:5173



---

## 📂 Complete Project Structure

mindmates/
│
├── backend/ # Backend API
│ ├── src/
│ │ ├── config/
│ │ │ ├── db.ts # MongoDB connection
│ │ │ └── passport.ts # OAuth strategies
│ │ ├── controllers/
│ │ │ ├── auth.controller.ts # Auth logic
│ │ │ ├── user.controller.ts # User management
│ │ │ └── journal.controller.ts # Journal CRUD
│ │ ├── middleware/
│ │ │ └── auth.middleware.ts # JWT verification
│ │ ├── model/
│ │ │ ├── user.model.ts # User schema
│ │ │ ├── journal.model.ts # Journal schema
│ │ │ └── feedback.model.ts # Feedback schema
│ │ ├── routes/
│ │ │ ├── auth.route.ts # Auth routes
│ │ │ ├── user.route.ts # User routes
│ │ │ └── journal.route.ts # Journal routes
│ │ ├── utils/
│ │ │ ├── generateToken.ts # JWT utils
│ │ │ ├── calculateMetrics.ts # Score calculation
│ │ │ └── sendFeedbackToGoogleForm.ts
│ │ ├── app.ts # Express app
│ │ └── server.ts # Server entry
│ ├── .env
│ ├── package.json
│ └── tsconfig.json
│
├── frontend/ # Frontend React App
│ ├── public/
│ │ └── vite.svg
│ ├── src/
│ │ ├── assets/ # Static assets
│ │ │ ├── Fonts/
│ │ │ ├── Icons/ # 60+ SVG icons
│ │ │ └── Images/ # Organized by feature
│ │ ├── components/
│ │ │ ├── shared/
│ │ │ │ ├── Navbar.tsx
│ │ │ │ ├── ProtectedRoute.tsx
│ │ │ │ └── OnboardingGuard.tsx
│ │ │ └── ui/ # Reusable UI components
│ │ ├── pages/
│ │ │ ├── Authentication/
│ │ │ │ ├── Login.tsx
│ │ │ │ ├── Register.tsx
│ │ │ │ └── GoogleCallback.tsx
│ │ │ ├── Home/
│ │ │ │ ├── Home.tsx
│ │ │ │ └── components/ # Dashboard widgets
│ │ │ ├── Journal/
│ │ │ │ ├── Journal.tsx # Layout
│ │ │ │ ├── JournalHome.tsx # List view
│ │ │ │ └── JournalEditor.tsx # Create/edit
│ │ │ ├── Profile/
│ │ │ │ ├── ProfileHome.tsx
│ │ │ │ ├── PersonalInfo.tsx
│ │ │ │ └── ...
│ │ │ ├── Stats/
│ │ │ │ ├── Mood.tsx
│ │ │ │ ├── SleepAnalysis.tsx
│ │ │ │ └── ...
│ │ │ ├── Hero.tsx # Landing page
│ │ │ ├── Onboarding.tsx
│ │ │ └── DailyTracker.tsx
│ │ ├── services/
│ │ │ ├── auth.service.ts # Auth API
│ │ │ ├── user.service.ts # User API
│ │ │ └── journal.service.ts # Journal API
│ │ ├── store/
│ │ │ └── userStore.ts # Zustand store
│ │ ├── types/
│ │ │ └── declarations.d.ts
│ │ ├── App.tsx # Root component
│ │ ├── main.tsx # Entry point
│ │ └── index.css # Global styles
│ ├── .env
│ ├── package.json
│ ├── vite.config.ts
│ └── tailwind.config.js
│
└── README.md # This file



---

## 🔐 Authentication Flow

### Registration Flow

User → Register Form → Frontend Validation → POST /api/auth/register
↓
Backend validates input → Hash password (bcrypt) → Save to MongoDB
↓
Generate JWT token → Return { user, token } → Store token in localStorage
↓
Redirect to /onboarding → Complete profile setup → Navigate to /home



### Login Flow

User → Login Form → POST /api/auth/login → Verify credentials
↓
Match email & password → Generate JWT → Return token
↓
Store token → Fetch user data → Redirect to /home



### Google OAuth Flow

User → Click "Sign in with Google" → Redirect to Google OAuth
↓
User grants permission → Google redirects to callback URL
↓
Backend exchanges code for user data → Create/update user
↓
Generate JWT → Redirect to frontend with token → Store & navigate



---

## 📊 API Endpoints Reference

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | Create new user | ❌ |
| POST | `/login` | Login user | ❌ |
| GET | `/google` | Initiate Google OAuth | ❌ |
| GET | `/google/callback` | OAuth callback | ❌ |

### Users (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/me` | Get current user | ✅ |
| PUT | `/me` | Update profile | ✅ |
| DELETE | `/me` | Delete account | ✅ |
| PUT | `/onboarding` | Complete onboarding | ✅ |
| POST | `/daily-log` | Submit daily log | ✅ |
| GET | `/daily-status` | Check today's log status | ✅ |
| PUT | `/mood` | Update current mood | ✅ |
| PUT | `/stress` | Update stress level | ✅ |
| POST | `/feedback` | Submit feedback | ✅ |
| POST | `/logout` | Logout user | ✅ |

### Journal (`/api/journal`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/` | Create entry | ✅ |
| GET | `/` | Get all entries | ✅ |
| GET | `/stats` | Get statistics | ✅ |
| GET | `/:id` | Get single entry | ✅ |
| PUT | `/:id` | Update entry | ✅ |
| DELETE | `/:id` | Delete entry | ✅ |

---

## 🗄️ Database Schema

### User Collection

{
_id: ObjectId,
googleId?: string,
name: string,
email: string, // Unique, indexed
password?: string, // Hashed with bcrypt
avatar?: string,

// Demographics
gender?: "male" | "female",
age?: number,
height?: number,
weight?: number,
birthDate?: Date,

// Mental Health Metrics
currentMood?: string,
mentalHealthScore?: number, // 0-100
sleepQuality?: number, // 1-10
currentStress?: number, // 1-10

// Tracking Arrays
moodTracker: [{ date: Date, mood: string }],
stressLogs: [{ date: Date, level: number }],
sleepLogs: [{ date: Date, quality: number, hours: number }],
hydrationLogs: [{ date: Date, liters: number }],
activityLogs: [{ date: Date, steps: number, minutes: number }],
meditationLogs: [{ date: Date, minutes: number }],
mentalHealthScoreLogs: [{ date: Date, score: number }],

// Metadata
isOnboarded: boolean,
isPro: boolean,
subscriptionType?: string,
todayLogged: boolean,
lastLoggedDate?: Date,
createdAt: Date,
updatedAt: Date
}



### Journal Collection

{
_id: ObjectId,
userId: ObjectId, // Reference to User
title?: string, // Max 200 chars
content: string, // Required, max 10000 chars
mood: "happy" | "neutral" | "sad" | "anxious" | "angry" | "excited" | "grateful",
tags: string[],
isPinned: boolean,
createdAt: Date,
updatedAt: Date
}



### Indexes

// User collection
{ email: 1 } // unique
{ googleId: 1 } // unique, sparse

// Journal collection
{ userId: 1, createdAt: -1 }
{ userId: 1, isPinned: -1 }



---

## 🎨 Frontend Features Deep Dive

### State Management (Zustand)

// Global state structure
{
user: User | null,
loading: boolean,
error: string | null,

// Actions
fetchUser: () => Promise<void>,
login: (email, password) => Promise<User>,
register: (name, email, password) => Promise<void>,
logout: () => Promise<void>,
updateUserProfile: (data) => Promise<void>,
}



### Protected Routes

// Only accessible when authenticated
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>

// Checks authentication before rendering
// Redirects to /auth/login if not authenticated



### API Service Pattern

// services/user.service.ts
export const getMe = async () => {
const token = localStorage.getItem('token');
const res = await axios.get(${API}/users/me, {
headers: { Authorization: Bearer ${token} }
});
return res.data;
};



### Responsive Design

- **Mobile-first approach** with Tailwind breakpoints
- **Touch-friendly** interactions with Swiper
- **Adaptive layouts** for mobile, tablet, desktop
- **Bottom navigation** on mobile, sidebar on desktop

---

## 🔧 Development Workflow

### Starting Development

Terminal 1: Backend
cd backend
npm run dev

Terminal 2: Frontend
cd frontend
npm run dev

Terminal 3: MongoDB (if local)
mongod



### Code Quality

Lint frontend
cd frontend
npm run lint

Type check
npm run type-check

Format code (recommended: Prettier)
npm run format



### Git Workflow

Create feature branch
git checkout -b feature/journal-tags

Make changes and commit
git add .
git commit -m "feat: add tag filtering to journal"

Push to remote
git push origin feature/journal-tags

Create pull request on GitHub


---

## 🚢 Production Deployment

### Backend Deployment (Railway/Render)

**1. Prepare for production**

cd backend
npm run build



**2. Set environment variables on hosting platform:**

NODE_ENV=production
MONGO_URI=mongodb+srv://prod-cluster...
JWT_SECRET=production_secret
CLIENT_URL=https://mindmates.app



**3. Deploy:**

Railway
railway up

Render
git push heroku main



### Frontend Deployment (Vercel/Netlify)

**1. Build for production**

cd frontend
npm run build



**2. Configure build settings:**

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | See `.env` |

**3. Deploy:**

Vercel
vercel --prod

Netlify
netlify deploy --prod



**4. Configure redirects**

**vercel.json:**
{
"rewrites": [
{ "source": "/(.*)", "destination": "/index.html" }
]
}



**netlify.toml:**
[[redirects]]
from = "/*"
to = "/index.html"
status = 200



---

## 🧪 Testing Strategy

### Backend Tests

cd backend
npm test

Test coverage
npm run test:coverage



**Example test:**

describe('POST /api/auth/register', () => {
it('should create a new user', async () => {
const res = await request(app)
.post('/api/auth/register')
.send({
name: 'Test User',
email: 'test@example.com',
password: 'Password123!'
});


expect(res.status).toBe(201);
expect(res.body.user.email).toBe('test@example.com');
expect(res.body.token).toBeDefined();
});
});



### Frontend Tests

cd frontend
npm test

Watch mode
npm run test:watch



**Example test:**

import { render, screen } from '@testing-library/react';
import { Login } from './Login';

test('renders login form', () => {
render(<Login />);
expect(screen.getByLabel(/email/i)).toBeInTheDocument();
expect(screen.getByLabel(/password/i)).toBeInTheDocument();
});



---

## 📈 Performance Optimization

### Frontend Optimizations

- ✅ **Code splitting** with React.lazy()
- ✅ **Image optimization** with WebP format
- ✅ **Bundle size reduction** with tree-shaking
- ✅ **Memoization** with useMemo/useCallback
- ✅ **Virtual scrolling** for large lists
- ✅ **Service worker** for offline support

### Backend Optimizations

- ✅ **Database indexing** on frequently queried fields
- ✅ **Query optimization** with Mongoose select()
- ✅ **Response compression** with gzip
- ✅ **Rate limiting** to prevent abuse
- ✅ **Caching** with Redis (future)

---

## 🐛 Troubleshooting

### Common Issues

#### Issue: "Cannot connect to MongoDB"

**Solution:**
1. Check MongoDB Atlas IP whitelist
2. Verify connection string format
3. Ensure network connectivity

Test MongoDB connection
mongosh "mongodb+srv://cluster.mongodb.net/test"



#### Issue: "CORS policy error"

**Solution:** Update backend CORS configuration

// backend/src/app.ts
app.use(cors({
origin: process.env.CLIENT_URL,
credentials: true
}));



#### Issue: "Token expired"

**Solution:** Implement token refresh logic

// frontend/services/auth.service.ts
if (error.response?.status === 401) {
localStorage.removeItem('token');
window.location.href = '/auth/login';
}



---

## 📱 Mobile App (Future)

**Planned features:**

- React Native mobile app
- Push notifications
- Offline-first architecture
- Biometric authentication
- HealthKit integration (iOS)
- Google Fit integration (Android)

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Contribution Workflow

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to branch** (`git push origin feature/AmazingFeature`)
5. **Open Pull Request**

### Code Standards

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Use ESLint/Prettier formatting

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Developer** - [Your Name](https://github.com/yourusername)
- **Designer** - [Designer Name]
- **Product Manager** - [PM Name]

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB University](https://university.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- Open source community

---

## 📞 Support

- **Email:** support@mindmates.app
- **Discord:** [Join our community](https://discord.gg/mindmates)
- **GitHub Issues:** [Report a bug](https://github.com/yourusername/mindmates/issues)

---

## 🗺️ Roadmap

### Q1 2026
- [ ] AI chatbot integration
- [ ] Group therapy sessions
- [ ] Meditation audio library
- [ ] Dark mode support

### Q2 2026
- [ ] Mobile app (iOS/Android)
- [ ] Premium subscription plans
- [ ] Therapist matching service
- [ ] Data export to PDF

### Q3 2026
- [ ] Community forum
- [ ] Gamification & achievements
- [ ] Multi-language support
- [ ] Integration with wearables
