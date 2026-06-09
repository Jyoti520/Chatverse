<div align="center">

# Real-Time Chat Application

A full-stack real-time messaging system built to demonstrate WebSocket-based architecture, secure authentication, and scalable backend design.

</div>

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| ⚡ | **Real-Time Messaging** | Instant messaging via Socket.IO |
| 🔐 | **Secure Authentication** | JWT with HTTP-only cookies |
| 🟢 | **Online Presence** | Live online/offline user tracking |
| 💬 | **Private Conversations** | One-to-one chat support |
| 🔔 | **Unread Counters** | Per-chat unread message tracking |
| 🔍 | **User Search** | Find users and start chats instantly |
| 📱 | **Responsive UI** | Fully optimized for mobile and desktop |
| 🧠 | **Persistent Storage** | All messages stored in MongoDB |

---

## 🛠️ Tech Stack

### Frontend
<p>
  <img src="https://skillicons.dev/icons?i=react,tailwind,vite" />
</p>

### Backend
<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" />
</p>

### Tools
<p>
  <img src="https://skillicons.dev/icons?i=postman,git,github" />
</p>

---

## 🧠 System Design Overview

1. Client authenticates via JWT cookie on app load
2. Socket.IO establishes a persistent connection after auth
3. Server validates session before allowing socket room joins
4. Messages are emitted in real-time and persisted in MongoDB
5. Presence updates are broadcast to all connected clients


---

## 🏗️ Architecture

```
React Client
     │
     │  HTTP (REST APIs + Auth)
     ▼
Express Backend
├── Auth Middleware (JWT Cookies)
├── REST APIs (Users, Chats, Messages)
└── Socket.IO Server
    ├── Messaging Events
    ├── Presence Events
    └── Chat Room Management
     │
     ▼
MongoDB
├── Users
├── Chats
└── Messages
```

---

## 📁 Project Structure

```
chat-app/
├── client/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── pages/
│       └── services/
│
└── server/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── sockets/
```

---

## ⚙️ Getting Started

### Prerequisites
<p>
  <img src="https://skillicons.dev/icons?i=nodejs,mongodb" />
</p>

- Node.js v18+
- MongoDB

### 1. Clone the repository

```bash
git clone https://github.com/your-username/chatverse.git
cd chatverse
```

### 2. Install dependencies

```bash
# Client
cd client && npm install

# Server
cd server && npm install
```

### 3. Configure environment variables

**`server/.env`**
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

**`client/.env`**
```env
VITE_SERVER_URL=http://localhost:5000
```

### 4. Run the application

```bash
# Start backend
cd server && npm run dev

# Start frontend (new terminal)
cd client && npm run dev
```

> App runs at **http://localhost:5173**

---

## 🔮 Upcoming Features

- Media sharing — images and files via cloud storage
- Message search with indexing
- Reactions and replies
- Push notifications
- Group chat support

---

## 📊 What This Project Demonstrates

- Real-time WebSocket communication at scale
- Secure stateless authentication using JWT and cookies
- Modular and maintainable backend architecture
- State synchronization across multiple clients
- Production-ready full-stack system design thinking

---

<div align="center">
  <sub>Built with ❤️ using React, TailwindCSS, Node.js, and Socket.IO</sub>
</div>
