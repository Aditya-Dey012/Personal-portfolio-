# Aditya Dey — Portfolio

Personal portfolio for Aditya Dey, Gen AI Engineer.

## Stack

- **Frontend** — React + Vite, Three.js / @react-three/fiber
- **AI Chat** — Groq (Llama 3.1 8B), LangChain-style RAG, SSE streaming
- **Backend** — Vercel Serverless Functions (Node.js)
- **3D Visualization** — LangGraph-style directed graph with animated nodes, edges, and flowing particles

## Features

- **Cinematic loading screen** — perspective grid, CRT scanlines, glitch title reveal
- **3D hero graph** — 11 nodes (LangGraph, FAISS, ChromaDB, Agents, etc.) with smooth sphere geometry, glow halos, and real-time particle flow
- **ADBOT v1.0** — AI assistant powered by Groq Llama 3.1, with RAG knowledge base about Aditya's work and a 5-question session limit
- **Clickable tech tags** — every technology tag opens the AI chat and auto-asks "What is X?" with a 2–3 bullet answer
- **Chat history sidebar** — previous sessions archived and restorable within the same browser session
- **Dark theme** — warm dark tones with orange accents, fully responsive on mobile and desktop

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

## Project Structure

```
├── api/
│   ├── chat.js          # Groq streaming endpoint (RAG + tech mode)
│   └── knowledge.js     # RAG knowledge base + system prompts
├── public/
│   ├── profile.png
│   └── Aditya_CV.pdf
├── src/
│   ├── components/
│   │   ├── LoadingScreen.jsx   # Cinematic boot screen
│   │   ├── HeroSection.jsx     # Hero with typewriter + 3D canvas
│   │   ├── AIChat.jsx          # ADBOT chat window + sidebar
│   │   ├── Navbar.jsx
│   │   └── Sections.jsx        # About, Experience, Projects, Skills
│   ├── scene/
│   │   └── HeroOrbs.jsx        # Three.js directed graph visualization
│   ├── data/
│   │   └── portfolio.js        # All content — skills, experience, projects
│   └── App.jsx
├── dev-server.js        # Local shim for Vercel API functions
└── vite.config.js
```

## Deployment (Vercel)

1. Connect this repo to [Vercel](https://vercel.com)
2. Add environment variable: `GROQ_API_KEY = your_key`
3. Deploy — Vite build + serverless functions are auto-detected

## Contact

- Email: aditya2002dey@gmail.com
- GitHub: [github.com/Aditya-Dey012](https://github.com/Aditya-Dey012)
- LinkedIn: [linkedin.com/in/aditya-dey-8144b7202](https://linkedin.com/in/aditya-dey-8144b7202)
