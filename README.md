# AI Chatbot Project

A full-stack AI-powered chatbot application built with **React** (frontend) and **Node.js/Express** (backend), using **MongoDB** for data storage and integrating with the **Gemini** (Google Generative AI) API for conversational intelligence.

---

## Features

- **Conversational AI**: Chat with an AI assistant powered by Gemini API and OpenAI integration.
- **Threaded Conversations**: Each chat is stored as a thread, allowing users to revisit previous conversations.
- **Persistent Storage**: All messages and threads are stored in MongoDB.
- **Modern UI**: Built with React, featuring a sidebar for thread navigation and a chat window for conversation.
- **Syntax Highlighting**: Supports markdown and code highlighting in chat responses.
- **Authentication Ready**: Frontend is prepared for authentication redirects (expandable).

---

## Project Structure

```
backend/
  server.js
  controllers/
  models/
  routes/
  utils/
frontend/
  src/
    components/
    contexts/
    services/
    App.jsx
    environment.js
```

---

## Backend

- **Framework**: Node.js, Express
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: Gemini API
- **Key Files**:
  - `server.js`: Express server setup, MongoDB connection, API routing.
  - `controllers/chatController.js`: Handles chat logic, thread management, and AI responses.
  - `models/`: Mongoose schemas for messages and threads.
  - `utils/gemini.js`: Handles requests to the Gemini API.

### API Endpoints

- `POST /chat`: Send a message and get an AI response (creates/updates a thread).
- `GET /thread`: List all threads.
- `GET /thread/:threadId`: Get a specific thread.
- `DELETE /thread/:threadId`: Delete a thread.
- `POST /test`: Test thread creation.

---

## Frontend

- **Framework**: React (with Vite)
- **Key Libraries**: axios, react-markdown, rehype-highlight, uuid
- **Key Files**:
  - `src/App.jsx`: Main app layout with sidebar and chat window.
  - `src/components/`: UI components for chat, sidebar, and chat window.
  - `src/services/api.js`: Axios instance for backend communication.
  - `src/contexts/context.jsx`: React context for global state management.
  - `src/environment.js`: Backend server URL.

---

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance (local or cloud)
- Gemini API key (Google Generative AI)

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd AI-Chatbot
```

### 2. Backend Setup

```sh
cd backend
npm install
```

- Create a `.env` file in `backend/` with:
  ```
  MONGODB_URL=<your-mongodb-connection-string>
  GEMINI_API_KEY=<your-gemini-api-key>
  ```

- Start the backend server:
  ```sh
  npm run dev
  # or
  npm start
  ```

### 3. Frontend Setup

```sh
cd ../frontend
npm install
npm run dev
```

- The frontend will run on [http://localhost:5173](http://localhost:5173) by default.

---

## Usage

- Open the frontend in your browser.
- Start a new chat or select an existing thread from the sidebar.
- Type your message and interact with the AI assistant.
- All conversations are saved and can be revisited.

---

## Environment Variables

**Backend (`backend/.env`):**
- `MONGODB_URL`: MongoDB connection string.
- `GEMINI_API_KEY`: Your Gemini API key.

**Frontend (`src/environment.js`):**
- Set the backend server URL (default: `http://localhost:8000/`).

---

## Dependencies

### Backend

- express
- mongoose
- dotenv
- cors
- cookie-parser
- openai
- nodemon (dev)

### Frontend

- react, react-dom
- axios
- react-markdown
- rehype-highlight
- uuid
- react-spinners

---

## Author

Gopal

---

## Notes

- This project is in progress for further expansion, such as authentication, deployment, and more advanced AI features.
