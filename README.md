# 💬 PulseChat - Real-Time Chat Application

PulseChat is a modern real-time chat application built using **React, Node.js, Express, MongoDB, and Socket.io**. It enables users to join instantly using a username, exchange messages in real time, view chat history, and see currently online users.

The application demonstrates full-stack development, REST APIs, WebSocket communication, database integration, and cloud deployment.

---

# 🚀 Live Demo

### Frontend (Vercel)

https://vedaz-chat-client.vercel.app

### Backend (Render)

https://vedaz-chat.onrender.com

Health Check:

https://vedaz-chat.onrender.com/health

---

# 📸 Features

## Mandatory Features

- Username-based login
- Real-time messaging using Socket.io
- Send and receive messages instantly
- Chat history persistence using MongoDB
- Message timestamps
- Responsive modern UI
- REST APIs for login and chat history
- Clean project structure
- Error handling
- Deployment on Vercel and Render

---

## Additional Features

- Online user list
- Message delivered status
- Message read status
- Automatic reconnection support
- Glassmorphism UI
- Mobile responsive design
- Dark mode support

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router
- Tailwind CSS
- Socket.io Client
- Axios
- Framer Motion
- Lucide React

## Backend

- Node.js
- Express.js
- Socket.io
- MongoDB Atlas
- Mongoose

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```
pulsechat
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── services
│   │   └── utils
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

```bash
cd YOUR_REPOSITORY
```

---

# Backend Setup

```bash
cd server
```

Install packages

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

CLIENT_URL=http://localhost:5173
```

Run server

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd client
```

Install packages

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api

VITE_SOCKET_URL=http://localhost:5000
```

Run frontend

```bash
npm run dev
```

---

# 🌐 REST APIs

## Login

```
POST /api/users/login
```

Request

```json
{
  "username": "Harish"
}
```

---

## Get Online Users

```
GET /api/users/online
```

---

## Fetch Messages

```
GET /api/messages
```

---

# 🔌 Socket Events

## Client → Server

- join
- sendMessage
- messageRead

---

## Server → Client

- receiveMessage
- messageDelivered
- messageRead
- userOnline

---

# 🗄 Database

MongoDB Atlas is used to store:

### Users

- username
- online status
- socketId
- lastSeen

### Messages

- sender
- text
- timestamp
- delivered
- read

---

# 🎯 Design Decisions

- React Context API is used for authentication and socket management.
- Socket.io enables low-latency, real-time communication.
- MongoDB stores chat history and user presence.
- REST APIs are used for authentication and history retrieval.
- The UI is component-based for better maintainability and reusability.

---

# 🧪 Testing

The application has been tested for:

- User login
- Multiple browser sessions
- Real-time messaging
- Chat history persistence
- Online user updates
- Logout and reconnect
- Mobile responsiveness
- Production deployment

---

# 📸 Screenshots

Add screenshots here.

Example:

- Login Screen
- Chat Screen
- Two Browser Real-Time Chat
- Mobile View

---

# 🔮 Future Improvements

- Private one-to-one chat
- Group chat
- Typing indicator
- File sharing
- Image sharing
- Voice messages
- Emoji support
- Push notifications
- JWT authentication

---

# 👨‍💻 Author

**Harish**

GitHub:

https://github.com/YOUR_USERNAME

LinkedIn:

https://linkedin.com/in/YOUR_PROFILE

---

# 📄 License

This project is created for learning purposes and as part of a Full Stack Developer assessment.  <img width="1710" height="956" alt="image" src="https://github.com/user-attachments/assets/883e63c8-e154-422a-a1ea-87a219cf2366" />   <img width="1743" height="890" alt="image" src="https://github.com/user-attachments/assets/c838e7b1-d0a3-4445-ad33-2843e77d9649" />  and mob view <img width="716" height="1600" alt="WhatsApp Image 2026-07-12 at 6 26 04 PM" src="https://github.com/user-attachments/assets/39be6bb0-9d21-41b8-8a58-669bff6799b0" />



