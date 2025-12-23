# MERN Todo App (Auth + Tasks) ✨
Simple MERN stack todo app with JWT auth, clean API design, and minimal UI.

## 🏗️ Architecture
- `backend/` — Node.js + Express + MongoDB API (JWT auth, tasks CRUD)
- `frontend/` — React (Vite) client (login/register, tasks list + create/edit/delete)

## 🔧 Prerequisites
- Node.js 18+
- MongoDB (Atlas or local)

## 🚀 Setup & Run
1) Install deps
```bash
cd backend && npm install
cd ../frontend && npm install
```
2) Env file
```bash
cd backend
cp env.example .env   # Windows: copy env.example .env
```
Fill `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=change_this_to_a_secure_random_string
```
3) Start backend (5000)
```bash
cd backend
npm run dev
```
4) Start frontend (5173)
```bash
cd frontend
npm run dev
```
Open the printed URL (usually http://localhost:5173).

## 📡 API (backend)
- `POST /auth/register` — create user
- `POST /auth/login` — login, returns JWT
- `POST /tasks` — create task (auth)
- `GET /tasks` — list tasks for logged-in user (auth)
- `PUT /tasks/:id` — update task (auth)
- `DELETE /tasks/:id` — delete task (auth)
Auth header: `Authorization: Bearer <token>`.

## 🧪 Postman
- Import `postman_collection.json`.
- Set variables: `base_url` (e.g., `http://localhost:5000`), `token` (from login).
- For update/delete, set `task_id`.

## 🔒 Notes
- JWT stored in `localStorage` on the frontend.
- Passwords hashed with bcrypt on the backend.



