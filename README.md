# 🐦 Tweetly — AI-Powered Tweet Generator

**Tweetly** is an AI-powered tool designed for makers, developers, and students to publicly track their progress — effortlessly.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-usetweetly.vercel.app-blue?style=for-the-badge)](https://usetweetly.vercel.app)

---

## ✨ What Can Tweetly Do?

* ✍️ **Generate tweets from daily progress updates**
* 🤖 **Customize tone** — choose from Funny, Motivational, Sarcastic, or Professional
* 📏 **Set tweet length** — Short, Medium, Thread, or Twitter-Free
* 🧠 **AI-powered phrasing** using custom model integrations
* 📜 **Tweet history saved** securely to your account
* 🔒 **Authentication via Supabase**
* ⚡ **Instant, clean UI** powered by React, Tailwind, and Framer Motion

> 🛑 **Note**: Tweetly currently does *not* auto-post to Twitter due to Twitter API limitations. Users can manually copy and share their generated tweets.

---

## 🔧 Upcoming Features

* ✨ **Tweetly browser extension** to:

  * Generate better replies on X (Twitter)
  * Rephrase your tweets contextually using AI
* 📅 Tweet scheduling (pending Twitter API availability)
* 🧠 Learning your tweet style over time
* 🌐 Dark mode & accessibility enhancements

---

## 🛠 Tech Stack

| Layer     | Tech                                     |
| --------- | ---------------------------------------- |
| Frontend  | React + Vite + Tailwind CSS + TypeScript |
| Backend   | Node.js + Express + TypeScript           |
| Auth & DB | Supabase                                 |
| AI        | OpenRouter (or other models via API)     |
| Hosting   | Vercel (Frontend), Render (Backend)      |

---

## 📦 Project Structure

```
tweetly/
├── tweetly-frontend/   # React frontend (Vercel)
└── tweetly-backend/    # Node.js backend (Render)
```

---

## 🔐 Environment Variables

Tweetly uses environment variables to manage configuration for both the frontend and backend. These variables should be defined in `.env` files locally and securely stored in deployment platforms like Vercel (frontend) and Render (backend).

### 🔹 Frontend (`tweetly-frontend/.env`)

```env
VITE_SUPABASE_URL=https://osakqgadoifavjsupygp.supabase.co
VITE_SUPABASE_ANON_KEY=...your-anon-key-here...
VITE_API_URL=https://tweetly-3j18.onrender.com
```

| Variable                 | Purpose                                               |
| ------------------------ | ----------------------------------------------------- |
| `VITE_SUPABASE_URL`      | Supabase project URL (public)                         |
| `VITE_SUPABASE_ANON_KEY` | Public anon key used for client-side auth and queries |
| `VITE_API_URL`           | Backend endpoint for generating tweets                |

> 🔐 These frontend variables are **safe to expose** but should still be managed securely in production.

### 🔹 Backend (`tweetly-backend/.env`)

```env
PORT=3000
OPENROUTER_API_KEY=your-openrouter-api-key
SUPABASE_URL=https://osakqgadoifavjsupygp.supabase.co
SUPABASE_SERVICE_ROLE=your-supabase-service-role-key
```

| Variable                | Purpose                                                |
| ----------------------- | ------------------------------------------------------ |
| `PORT`                  | Port the server listens on (default: 3000)             |
| `OPENROUTER_API_KEY`    | API key for the AI model integration                   |
| `SUPABASE_URL`          | Supabase project URL                                   |
| `SUPABASE_SERVICE_ROLE` | Private service role key used for secure DB operations |

---

## 📸 Screenshots

*Coming soon!*

---

## ✍️ Author

Built with 💙 by [@amren008](https://github.com/amren008)

---

## 📃 License

MIT
