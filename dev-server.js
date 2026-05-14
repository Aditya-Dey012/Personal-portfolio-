/**
 * Local dev server — runs the Vercel API functions on port 3001.
 * Vite proxies /api → http://localhost:3001 (configured in vite.config.js).
 * Run alongside `npm run dev` via `npm run dev:api`.
 */
import http from 'http';
import { readFileSync } from 'fs';

/* ── Load .env manually (no extra deps needed) ── */
try {
  readFileSync('.env', 'utf8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (key) process.env[key] = val;
  });
  console.log('[API] .env loaded');
} catch {
  console.warn('[API] No .env file found — set GROQ_API_KEY in environment');
}

/* ── Import the Vercel handler ── */
const { default: chatHandler } = await import('./api/chat.js');

/* ── Thin Express-style shim for Node http.ServerResponse ── */
function shimRes(res) {
  res.status = (code) => { res.statusCode = code; return res; };
  res.json   = (data) => {
    if (!res.headersSent) res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  };
  return res;
}

/* ── HTTP server ── */
const server = http.createServer(async (req, res) => {
  shimRes(res);

  /* CORS for local dev */
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const url = req.url?.split('?')[0];

  if (url === '/api/chat') {
    /* Parse JSON body */
    let raw = '';
    for await (const chunk of req) raw += chunk;
    try { req.body = JSON.parse(raw); } catch { req.body = {}; }

    try {
      await chatHandler(req, res);
    } catch (err) {
      console.error('[API] Unhandled handler error:', err);
      if (!res.headersSent) {
        res.status(500).json({ error: err.message });
      }
    }
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(3001, () => {
  console.log('[API] Dev server → http://localhost:3001');
  console.log('[API] GROQ_API_KEY:', process.env.GROQ_API_KEY ? '✓ set' : '✗ MISSING');
});
