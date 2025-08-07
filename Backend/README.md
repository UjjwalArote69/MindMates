# Backend API Documentation

## Overview
This is a Node.js/Express backend API built with TypeScript that provides authentication and user management functionality. It supports both traditional email/password authentication and Google OAuth integration.

## Technologies Used

### Core Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Security
- **JWT (JSON Web Tokens)** - Token-based authentication
- **bcryptjs** - Password hashing
- **passport** - Authentication middleware
- **passport-google-oauth20** - Google OAuth strategy
- **express-session** - Session management

### Development Tools
- **ts-node-dev** - TypeScript development server
- **nodemon** - Development auto-restart

## Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   ├── db.ts          # Database connection
│   │   └── passport.ts    # Passport configuration
│   ├── controllers/
│   │   ├── auth.controller.ts    # Authentication logic
│   │   └── user.controller.ts    # User management logic
│   ├── middleware/
│   │   └── auth.middleware.ts    # Authentication middleware
│   ├── model/
│   │   └── user.model.ts         # User schema
│   ├── routes/
│   │   ├── auth.route.ts         # Authentication routes
│   │   └── user.route.ts         # User management routes
│   ├── utils/
│   │   └── generateToken.ts      # JWT token generation
│   ├── app.ts                    # Express app setup
│   └── server.ts                 # Server initialization
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-jwt-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### 1. Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "name": "John Doe"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created - [user details] && Token - [jwt-token]"
  }
  ```

#### 2. Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "emailOrUsername": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Logged in User - [username] && [jwt-token]"
  }
  ```

#### 3. Google OAuth
- **GET** `/api/auth/google`
- Initiates Google OAuth flow

#### 4. Google OAuth Callback
- **GET** `/api/auth/google/callback`
- Handles Google OAuth callback and redirects with token

### User Routes (`/api/users`)

#### 1. Get Current User
- **GET** `/api/users/me`
- **Headers:** `Authorization: Bearer [jwt-token]`
- **Response:** User object

#### 2. Update Current User
- **PUT** `/api/users/me`
- **Headers:** `Authorization: Bearer [jwt-token]`
- **Body:** User fields to update
- **Response:** Updated user object

#### 3. Delete Current User
- **DELETE** `/api/users/me`
- **Headers:** `Authorization: Bearer [jwt-token]`
- **Response:** Deletion confirmation

## User Schema

```typescript
interface User {
  email: string;        // Required, unique
  password?: string;    // Optional (for Google users)
  name: string;         // Required
  googleId?: string;    // Google ID for OAuth users
  avatar?: string;      // Profile picture URL
  createdAt: Date;      // Auto-generated
  updatedAt: Date;      // Auto-generated
}
```

## Authentication Flow

### Traditional Authentication
1. User registers with email/password
2. Password is hashed using bcrypt
3. JWT token is generated upon successful login
4. Token is used for subsequent authenticated requests

### Google OAuth
1. User clicks "Sign in with Google"
2. Redirected to Google consent screen
3. Upon consent, Google redirects back with user info
4. JWT token is generated and user is logged in

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env` file

4. Start MongoDB service

5. Run development server:
   ```bash
   npm run dev
   ```

### Build for Production
```bash
npm run build
npm start
```

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- CORS enabled
- Environment variable configuration

## Error Handling

The API uses consistent error responses:
```json
{
  "message": "Error description"
}
```

