import OpenAI from 'openai';
import { SYSTEM_PROMPT, TECH_SYSTEM_PROMPT, retrieveRelevantChunks, KNOWLEDGE_CHUNKS } from './knowledge.js';

const groq = new OpenAI({
  apiKey:  process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

/* ── Server-side IP rate limit: max 10 requests per IP per 15 min ── */
const ipHits = new Map();
const IP_LIMIT   = 10;
const IP_WINDOW  = 15 * 60 * 1000; // 15 minutes in ms

function isRateLimited(ip) {
  const now  = Date.now();
  const entry = ipHits.get(ip) || { count: 0, reset: now + IP_WINDOW };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + IP_WINDOW; }
  entry.count += 1;
  ipHits.set(ip, entry);
  return entry.count > IP_LIMIT;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')   return res.status(405).json({ error: 'Method not allowed' });

  if (!process.env.GROQ_API_KEY) {
    return res.status(503).json({ error: 'AI assistant not configured. Add GROQ_API_KEY to environment.' });
  }

  /* IP rate limit — blocks bots / scrapers */
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a few minutes.' });
  }

  const { messages, mode } = req.body || {};
  const isTechMode = mode === 'tech';

  console.log('[ADBOT] mode:', mode || 'knowledge', '| messages:', Array.isArray(messages) ? messages.length : 'bad');

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
  const userQuery   = lastUserMsg?.content || '';
  console.log('[ADBOT] query:', userQuery.slice(0, 120));

  let systemMessage;

  if (isTechMode) {
    /* Tech mode — LLM answers from its own training knowledge, no RAG */
    systemMessage = TECH_SYSTEM_PROMPT;
    console.log('[ADBOT] tech mode — skipping RAG');
  } else {
    /* Knowledge mode — inject RAG context about Aditya */
    let relevantChunks;
    try {
      relevantChunks = retrieveRelevantChunks(userQuery);
      if (relevantChunks.length === 0) relevantChunks = KNOWLEDGE_CHUNKS.slice(0, 4);
      console.log('[ADBOT] chunks:', relevantChunks.map(c => c.id));
    } catch (e) {
      console.error('[ADBOT] RAG error:', e.message);
      relevantChunks = KNOWLEDGE_CHUNKS.slice(0, 3);
    }
    const context = relevantChunks.map(c => c.content).join('\n\n---\n\n');
    systemMessage = `${SYSTEM_PROMPT}

---
RETRIEVED KNOWLEDGE BASE CONTEXT:
${context}
---

Answer based on the context above. Be helpful, accurate, and concise.
If unrelated to Aditya, politely redirect.`;
  }

  const openaiMessages = [
    { role: 'system', content: systemMessage },
    ...messages.slice(-8),
  ];

  const temperature = isTechMode ? 0.4 : 0.2;
  const max_tokens  = isTechMode ? 200  : 800;

  try {
    console.log('[ADBOT] → Groq | temp:', temperature, '| max_tokens:', max_tokens);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    const stream = await groq.chat.completions.create({
      model:       'llama-3.1-8b-instant',
      messages:    openaiMessages,
      max_tokens,
      temperature,
      stream:      true,
    });

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content;
      if (token) res.write(`data: ${JSON.stringify({ content: token })}\n\n`);
      if (chunk.choices[0]?.finish_reason === 'stop') break;
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (err) {
    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ content: `\n\nError: ${err.message}` })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
      return;
    }
    console.error('[ADBOT] Groq error:', {
      message: err.message, status: err.status,
      code: err.code, stack: err.stack?.split('\n').slice(0, 3).join(' | '),
    });
    if (err.status === 401) return res.status(401).json({ error: 'Invalid Groq API key.' });
    if (err.status === 429) return res.status(429).json({ error: 'Rate limit hit. Try again shortly.' });
    return res.status(500).json({ error: err.message || 'Failed to generate response' });
  }
}
