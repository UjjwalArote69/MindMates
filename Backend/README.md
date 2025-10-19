<div align="center">

# 🧠 Mental Health & Wellness Backend API

*A comprehensive Node.js backend API designed to support mental health and wellness applications*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

---

</div>

## ✨ Overview

Welcome to our **Mental Health & Wellness Backend API** – a robust, secure, and scalable solution built with modern technologies. This API powers applications focused on mental health tracking, journaling, user management, and comprehensive wellness monitoring.

> 🌟 **Built with care for mental health professionals and wellness enthusiasts**

---

## 🚀 **Tech Stack**

<table>
<tr>
<td>

### **Core Technologies**
- 🟢 **Node.js** - Runtime Environment
- ⚡ **Express.js** - Web Framework
- 🔷 **TypeScript** - Type Safety
- 🍃 **MongoDB** - Database
- 📦 **Mongoose** - ODM for MongoDB

</td>
<td>

### **Security & Authentication**
- 🔐 **JWT** - Token Authentication
- 🛡️ **Passport.js** - OAuth Strategies
- 🔒 **bcryptjs** - Password Hashing
- 🛡️ **Helmet** - Security Headers
- 🌐 **CORS** - Cross-Origin Requests

</td>
</tr>
</table>

### **Additional Features**
- 📊 **Winston** - Structured Logging
- ⚙️ **Google OAuth2.0** - Social Authentication
- 🚫 **Rate Limiting** - DDoS Protection
- 🍪 **Cookie Parser** - Session Management

---

## 📁 **Project Architecture**

```
🏗️ backend/
├── 📂 src/
│   ├── 🎮 controllers/          # Business Logic Handlers
│   │   ├── 🔐 auth.controller.ts
│   │   ├── 👤 user.controller.ts
│   │   └── 📝 journal.controller.ts
│   ├── 🗃️ models/               # Database Schemas
│   │   ├── 👤 user.model.ts
│   │   ├── 📖 journal.model.ts
│   │   └── 💬 feedback.model.ts
│   ├── 🛣️ routes/               # API Route Definitions
│   │   ├── 🔐 auth.route.ts
│   │   ├── 👤 user.route.ts
│   │   └── 📝 journal.route.ts
│   ├── 🛡️ middleware/           # Custom Middleware
│   │   └── 🔐 auth.middleware.ts
│   ├── 🛠️ utils/                # Utility Functions
│   │   ├── 🎫 generateToken.ts
│   │   ├── 📊 calculateMetrics.ts
│   │   ├── 📬 sendFeedbackToGoogleForm.ts
│   │   └── 📋 logger.ts
│   ├── ⚙️ config/               # Configuration Files
│   │   ├── 🗄️ db.ts
│   │   └── 🛂 passport.ts
│   ├── 🚀 app.ts                # Express App Configuration
│   └── 🖥️ server.ts             # Server Entry Point
├── 📄 logs/                     # Log Files Directory
├── 📦 package.json
├── 🔧 tsconfig.json
└── 📚 README.md
```

---

## 🛠️ **Quick Start Guide**

### **Prerequisites**

<table>
<tr>
<td align="center">

**🟢 Node.js**<br>
`v18+`

</td>
<td align="center">

**🍃 MongoDB**<br>
`v5.0+`

</td>
<td align="center">

**📦 npm/yarn**<br>
`Latest`

</td>
</tr>
</table>

### **🚀 Installation**

```bash
# 1️⃣ Clone the repository
git clone <repository-url>
cd backend

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# 4️⃣ Start development server
npm run dev

# 🎉 Server running at http://localhost:5000
```

### **🔧 Environment Configuration**

Create a `.env` file with the following configuration:

```env
# 🖥️ Server Configuration
PORT=5000
NODE_ENV=development

# 🗄️ Database
MONGODB_URI=mongodb://localhost:27017/wellness-app

# 🔐 JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# 🌐 Google OAuth2.0
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# 🍪 Session Secret
SESSION_SECRET=your-session-secret

# 🌍 Client URL (CORS)
CLIENT_URL=http://localhost:3000
```

---

## 📚 **API Documentation**

### **🔐 Authentication Routes**

<div align="center">

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| 🟢 POST | `/auth/register` | Register new user | ❌ |
| 🟢 POST | `/auth/login` | User login | ❌ |
| 🔵 GET | `/auth/google` | Google OAuth login | ❌ |
| 🔵 GET | `/auth/google/callback` | Google OAuth callback | ❌ |
| 🟢 POST | `/auth/logout` | User logout | ✅ |

</div>

### **👤 User Management Routes**

<div align="center">

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| 🔵 GET | `/user/profile` | Get user profile | ✅ |
| 🟡 PUT | `/user/profile` | Update user profile | ✅ |
| 🔴 DELETE | `/user/account` | Delete user account | ✅ |
| 🟢 POST | `/user/feedback` | Submit user feedback | ✅ |

</div>

### **📝 Journal Management Routes**

<div align="center">

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| 🔵 GET | `/journal` | Get user journals | ✅ |
| 🟢 POST | `/journal` | Create journal entry | ✅ |
| 🟡 PUT | `/journal/:id` | Update journal entry | ✅ |
| 🔴 DELETE | `/journal/:id` | Delete journal entry | ✅ |
| 🔵 GET | `/journal/metrics` | Get journal analytics | ✅ |

</div>

---

## 🔐 **Security Features**

<table>
<tr>
<td>

### **🛡️ Authentication Security**
- 🎫 **JWT Tokens** with HTTP-only cookies
- 🔒 **bcryptjs** password hashing
- 🌐 **Google OAuth2.0** integration
- ⏰ **Configurable token expiration**

</td>
<td>

### **🛡️ Application Security**
- 🛡️ **Helmet** security headers
- 🌐 **CORS** protection
- 🚫 **Rate limiting** anti-DDoS
- 🍪 **Secure cookie handling**

</td>
</tr>
</table>

---

## 📊 **Logging & Monitoring**

### **📋 Winston Logger Configuration**

Our application uses **Winston** for comprehensive logging:

<table>
<tr>
<td align="center">

**📊 Log Levels**<br>
`error` `warn` `info` `debug`

</td>
<td align="center">

**🖥️ Console Logging**<br>
Development Environment

</td>
<td align="center">

**📄 File Logging**<br>
`error.log` & `combined.log`

</td>
</tr>
</table>

### **💻 Usage Example**

```typescript
import logger from './utils/logger';

// ✅ Info logging
logger.info('User registered successfully', { userId: user._id });

// ❌ Error logging
logger.error('Database connection failed', { error: error.message });
```

---

## 🗄️ **Database Models**

<div align="center">

### **👤 User Model**
*Personal info • Authentication data • Preferences • Account status*

### **📖 Journal Model**
*Entries • Mood tracking • Privacy settings • Tags • Timestamps*

### **💬 Feedback Model**
*User feedback • Ratings • Categories • Response tracking*

</div>

---

## 🧪 **API Examples**

### **✨ User Registration**

```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**✅ Success Response:**
```json
{
  "user": {
    "_id": "60d5ec49f1b2c8b1f8e4e1a1",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "isNewUser": true
}
```

### **📝 Create Journal Entry**

```bash
POST /journal
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Daily Reflection",
  "content": "Today was a wonderful day full of gratitude...",
  "mood": 8,
  "tags": ["gratitude", "reflection", "wellness"]
}
```

---

## ⚡ **Development Scripts**

<table>
<tr>
<td>

```bash
# 🚀 Development with auto-reload
npm run dev
```

</td>
<td>

```bash
# 🏗️ Build TypeScript
npm run build
```

</td>
</tr>
<tr>
<td>

```bash
# 🎯 Production start
npm start
```

</td>
<td>

```bash
# ✅ Type checking
npx tsc --noEmit
```

</td>
</tr>
</table>

---

## 📈 **Performance & Monitoring**

### **🔍 Health Check**
```bash
GET /health
# Returns server status and uptime
```

### **📊 Monitoring Features**
- 📝 **Request Logging** with response times
- 🐛 **Error Tracking** with stack traces
- 👤 **User Activity** monitoring
- 🗄️ **Database Connection** status
- 🔄 **Auto-reconnection** handling

---

## 🚦 **Error Handling**

### **🎯 Structured Error Responses**

```json
{
  "success": false,
  "message": "User-friendly error description",
  "error": "Detailed technical info (development only)"
}
```

### **🛡️ Features**
- 🎯 **Centralized error handling** middleware
- 📊 **Structured error responses**
- 🔄 **Environment-specific** error details
- 📋 **Comprehensive logging**

---

## 🧪 **Testing Structure**

```
🧪 tests/
├── 🔬 unit/
│   ├── 🎮 controllers/
│   ├── 🗃️ models/
│   └── 🛠️ utils/
├── 🔗 integration/
│   └── 🛣️ routes/
└── ⚙️ setup/
    └── 🗄️ testDb.ts
```

### **📋 Testing Commands**

<table>
<tr>
<td>

```bash
# 🧪 Run tests
npm test
```

</td>
<td>

```bash
# 📊 Test coverage
npm run test:coverage
```

</td>
<td>

```bash
# 👀 Watch mode
npm run test:watch
```

</td>
</tr>
</table>

---

## 🚀 **Deployment**

### **🐳 Docker Support**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

### **🌍 Production Environment**

```env
NODE_ENV=production
PORT=80
MONGODB_URI=mongodb+srv://your-production-db
JWT_SECRET=your-super-secure-production-secret
```

---

## 🤝 **Contributing**

<div align="center">

### **🌟 We welcome contributions from the community!**

</div>

### **📋 Development Guidelines**

<table>
<tr>
<td>

**✅ Code Quality**
- Follow TypeScript strict mode
- Use ESLint and Prettier
- Write meaningful commit messages
- Add JSDoc comments

</td>
<td>

**🧪 Testing**
- Write tests for new features
- Maintain test coverage
- Test edge cases
- Update integration tests

</td>
</tr>
</table>

### **🔄 Workflow**
1. 🍴 **Fork** the repository
2. 🌿 **Create** a feature branch
3. ✨ **Implement** your changes
4. 🧪 **Test** thoroughly
5. 📝 **Document** updates
6. 🚀 **Submit** pull request

---

## 📄 **License**

<div align="center">

This project is licensed under the **MIT License**

*See the LICENSE file for details*

</div>

---

## 🆘 **Support & Community**

<div align="center">

### **Need Help?**

📝 **Create an Issue** • 📖 **Check Documentation** • 📋 **Review Logs**

</div>

### **🤝 Community Guidelines**
- 🌟 Be respectful and inclusive
- 💡 Share knowledge and insights
- 🐛 Report bugs constructively
- 🚀 Contribute to improvements

---

<div align="center">

### **🧠 Built with Mental Health in Mind**

*This backend is designed to work seamlessly with React frontends and supports the mental wellness community.*

---

**⭐ Star this repository if it helped you!**

</div>