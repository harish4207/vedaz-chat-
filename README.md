# PulseChat

Real-time messaging powered by Socket.io.

PulseChat is a polished full-stack chat app scaffold with a React + Vite frontend and a Node.js + Express + Socket.io backend backed by MongoDB.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, Socket.io Client, Framer Motion, Lucide React
- Backend: Node.js, Express, Socket.io, MongoDB, Mongoose, dotenv, cors

## Project Structure

```text
PulseChat/
├── client/
└── server/
```

## Getting Started

1. Copy `.env.example` to `.env` and fill in your MongoDB URI.
2. Install dependencies in both workspaces.
3. Start the server and client in separate terminals.

## Scripts

- `npm run dev:client`
- `npm run dev:server`
- `npm run build`

## Status

This workspace now contains the initial structure for the full build. The next step is wiring the frontend and backend foundations, then adding the chat flow and real-time features.