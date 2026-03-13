# 🧠 OpsMindAI — Enterprise Knowledge Base

> **An AI-powered enterprise knowledge base that lets employees instantly query company policies through natural language — with cited, source-backed answers pulled directly from your organization's PDF documents.**

![Version](https://img.shields.io/badge/version-1.0.0-indigo)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Node.js%20%2B%20MongoDB-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 👤 User

- Ask questions about company policies in plain English
- Get AI-generated answers with **citations** (source document + page number)
- Persistent chat history across sessions
- User profile management

### 🛡️ Admin

- Upload and manage PDF policy documents
- View **query audit logs** — see what employees are asking
- **Analytics dashboard** with top queried topics chart
- Knowledge base management (view, delete documents)

---

## 🏗️ Tech Stack

| Layer           | Technology                                  |
| --------------- | ------------------------------------------- |
| Frontend        | React, Tailwind CSS, Recharts, Lucide Icons |
| Backend         | Node.js, Express.js                         |
| Database        | MongoDB (Mongoose)                          |
| AI / Embeddings | Vector embeddings for semantic PDF search   |
| Auth            | JWT (Access + Refresh tokens)               |
| PDF Processing  | pdf-parse, custom text chunker              |
| Routing         | React Router v6                             |

---

## 📁 Project Structure

```
opsmindai/
├── frontend/                        # React frontend
│   ├── public/
│   └── src/
│       ├── admin/                   # Admin-only area
│       │   ├── hooks/
│       │   │   └── useDocument.js
│       │   ├── pages/               # Admin pages (Analytics, AuditLogs, etc.)
│       │   ├── AdminLayout.jsx
│       │   ├── Sidebar.jsx          # Admin sidebar
│       │   └── Topbar.jsx
│       ├── assets/
│       ├── components/              # Shared components
│       │   ├── ChatInput.jsx
│       │   ├── ChatMessage.jsx
│       │   ├── Details.jsx
│       │   ├── Login.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── Register.jsx
│       │   ├── RoleProtectedRoute.jsx
│       │   ├── Sidebar.jsx          # User chat sidebar
│       │   ├── Uploader.jsx
│       │   └── UserProfileModal.jsx
│       ├── contexts/                # React context providers
│       │   └── ChatContext.jsx
│       ├── hooks/
│       │   └── useAuth.js
│       ├── pages/                   # User-facing pages
│       │   ├── Chat.jsx
│       │   └── LandingPage.jsx
│       └── App.jsx
│
└── backend/                         # Express backend
    ├── config/
    ├── controllers/
    │   ├── authController.js
    │   ├── chatController.js
    │   ├── chunksController.js
    │   ├── fileController.js
    │   ├── refreshController.js
    │   └── textController.js
    ├── middleware/
    │   ├── multerMiddleware.js
    │   └── verifyToken.js
    ├── models/
    │   ├── chatModels.js
    │   ├── FileModel.js
    │   └── User.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── chatRoutes.js
    │   ├── refreshRoutes.js
    │   ├── textRoutes.js
    │   └── uploadRoutes.js
    ├── services/                    # Core AI/RAG logic
    │   ├── ragChat.js
    │   ├── ragPromptBuilder.js
    │   └── semanticSearchService.js
    ├── uploads/                     # Uploaded PDFs stored here
    ├── utils/
    |    ├── chunker.js
    |    ├── embedding.js
```

<!-- ---

## 📸 Screenshots

> Add your screenshots to a `/screenshots` folder in the root and update the paths below.

| Landing Page | Chat Interface |
|---|---|
| ![Landing](./screenshots/landing.png) | ![Chat](./screenshots/chat.png) |

| Admin Dashboard | Audit Logs |
|---|---|
| ![Analytics](./screenshots/analytics.png) | ![Audit](./screenshots/audit.png) |

--- -->

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/opsmindai.git
cd opsmindai
```

### 2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=5000

# MongoDB
MONGO_URI=mongodb://localhost:27017/opsmindai

# JWT
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Embeddings / AI
GEMINI_API_KEY=your_embedding_api_key
```

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Run the app

```bash
# Start backend (from /backend)
npm run dev

# Start frontend (from /frontend)
npm run dev
```

App will be available at `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| POST   | `/api/auth/register` | Register a new user      |
| POST   | `/api/auth/login`    | Login and receive tokens |
| POST   | `/api/auth/refresh`  | Refresh access token     |

### Chat

| Method | Endpoint                | Access | Description                                |
| ------ | ----------------------- | ------ | ------------------------------------------ |
| POST   | `/api/chat`             | User   | Send a query, get AI answer with citations |
| GET    | `/api/chat/history`     | User   | Get current user's chat history            |
| GET    | `/api/chat/history/all` | Admin  | Get all users' chat history                |
| GET    | `/api/chat/audit`       | Admin  | Get audit logs (user queries + citations)  |

### Documents

| Method | Endpoint                | Access     | Description                  |
| ------ | ----------------------- | ---------- | ---------------------------- |
| POST   | `/api/documents/upload` | Admin      | Upload one or more PDF files |
| GET    | `/api/documents`        | User/Admin | List all uploaded documents  |
| DELETE | `/api/documents/:id`    | Admin      | Delete a document by ID      |

---

## 🔐 Roles & Access

| Feature             | User     | Admin    |
| ------------------- | -------- | -------- |
| Ask questions       | ✅       | ✅       |
| View chat history   | ✅ (own) | ✅ (all) |
| Upload documents    | ❌       | ✅       |
| Delete documents    | ❌       | ✅       |
| View audit logs     | ❌       | ✅       |
| Analytics dashboard | ❌       | ✅       |

---

## 🧪 Testing

A sample policy PDF (`HR_Policy_2024.pdf`) is included for testing. It covers:

- Leave & Time-Off Policy
- Remote Work & Hybrid Policy
- Code of Conduct
- Data Security & IT Policy
- Compensation & Benefits

**Sample queries to test:**

- _"How many sick days do I get?"_
- _"What is the maternity leave policy?"_
- _"What are the password requirements?"_
- _"Does the company match 401k contributions?"_

---

## 📄 License

MIT License. See `LICENSE` for details.

---

<p align="center">Built with ❤️ using React, Node.js & AI</p>
