# Aditya Dey — Personal Portfolio

> Gen AI Engineer · Multi-agent systems · LLM-powered analytics · Full-stack AI

Live portfolio built with React + Vite, featuring a 3D interactive hero, a terminal command interface, and an embedded RAG-powered AI assistant (ADBOT) backed by Groq Llama 3.1.

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, Three.js, @react-three/fiber |
| AI Assistant | Groq Llama-3.1-8b-instant, RAG (semantic chunking + retrieval), SSE streaming |
| Backend | Node.js serverless (Vercel Functions) |
| 3D Scene | React Three Fiber — directed LangGraph-style node graph with particle flow |

---

## Features

- **Cinematic loading screen** — perspective grid, CRT scanlines, glitch title reveal
- **3D hero graph** — 11 nodes (LangGraph, FAISS, Agents, etc.) with animated edges and real-time particle flow
- **ADBOT v1.0** — RAG AI assistant powered by Groq Llama-3.1-8b-instant
  - Knowledge base chunked into semantic segments; relevant context retrieved per query
  - Streams responses token-by-token over SSE
  - Grounded answers — draws only from retrieved portfolio knowledge
  - 5-question session limit; chat history sidebar with session restore
- **Terminal interface** — custom commands (`whoami`, `experience`, `projects`, `cat`, `neofetch`, `matrix`) with tab completion and command history
- **Clickable tech tags** — every stack tag opens ADBOT and auto-asks "What is X?"
- **Scroll animations** — scroll-triggered reveals, magnetic UI elements, card glow, progress bar
- **Fully responsive** — dark theme with warm orange accents, mobile + desktop

---

## Projects Showcased

- **AI Analytics RAG System** — Production LangGraph multi-agent state machine (5 GPT-4o-powered agents: Orchestrator, Context Resolver, Data Agent, Summarization Agent, Chart Agent) with FAISS schema retrieval, SSE-streamed React + Plotly dashboard, and automated PDF reports
- **AI-Powered Recruitment Management System** — GPT-4o-mini resume parsing, PII masking, SharePoint integration, SendGrid scheduling
- **SPOC** — 7-agent LangGraph monitoring platform for a 350 MW power plant with FAISS document search and real-time Next.js dashboard

---

## Local Development

**Prerequisites:** Node.js 18+, a [Groq API key](https://console.groq.com) (free tier)

```bash
# Install dependencies
npm install

# Add your Groq key
echo "GROQ_API_KEY=your_key_here" > .env

# Terminal 1 — API server (port 3001)
npm run dev:api

# Terminal 2 — Vite dev server (port 5173)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
├── api/
│   ├── chat.js          # Groq streaming endpoint — RAG retrieval + SSE
│   └── knowledge.js     # Semantic knowledge chunks + system prompts
├── public/
│   ├── profile.png
│   └── Aditya_CV.pdf
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx   # Cinematic boot screen
│   │   ├── HeroSection.jsx     # Hero with typewriter + 3D canvas
│   │   ├── AIChat.jsx          # ADBOT chat window + session sidebar
│   │   ├── Navbar.jsx
│   │   └── Sections.jsx        # About, Experience, Projects, Skills
│   ├── scene/
│   │   └── HeroOrbs.jsx        # Three.js LangGraph-style directed graph
│   ├── data/
│   │   └── portfolio.js        # All content — skills, experience, projects
│   └── App.jsx
├── dev-server.js        # Local shim for Vercel serverless functions
└── vite.config.js
```

---

## Deployment (Vercel)

1. Connect this repo to [Vercel](https://vercel.com)
2. Add environment variable: `GROQ_API_KEY = your_key`
3. Deploy — Vite build + serverless functions are auto-detected

---

## Contact

- Email: aditya2002dey@gmail.com
- GitHub: [github.com/Aditya-Dey012](https://github.com/Aditya-Dey012)
- LinkedIn: [linkedin.com/in/aditya-dey-8144b7202](https://linkedin.com/in/aditya-dey-8144b7202)
