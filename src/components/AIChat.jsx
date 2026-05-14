import { useState, useRef, useEffect, useCallback } from 'react';

const CURRENT_KEY  = 'adbot_session';
const SESSIONS_KEY = 'adbot_sessions';
const LIMIT_KEY    = 'adbot_count';
const MAX_QUESTIONS = 5;

const WELCOME = `ADBOT v1.0 — Aditya's Personal AI Assistant
Llama 3.1 · RAG knowledge base · Ask me anything about Aditya.`;

const SUGGESTIONS = [
  'Tell me about the SPOC power plant project',
  "What's Aditya's LangGraph experience?",
  'Why should I hire Aditya?',
  'What AI systems has Aditya built at Nexturn?',
  "What are Aditya's strongest skills?",
];

const defaultMsgs = () => [{ role: 'assistant', content: WELCOME }];

const loadCurrent = () => {
  try {
    const s = sessionStorage.getItem(CURRENT_KEY);
    if (s) return JSON.parse(s);
  } catch {}
  return defaultMsgs();
};

const loadSessions = () => {
  try {
    const s = sessionStorage.getItem(SESSIONS_KEY);
    if (s) return JSON.parse(s);
  } catch {}
  return [];
};

const getCount  = () => parseInt(sessionStorage.getItem(LIMIT_KEY) || '0', 10);
const bumpCount = () => sessionStorage.setItem(LIMIT_KEY, String(getCount() + 1));

const sessionTitle = (msgs) => {
  const first = msgs.find(m => m.role === 'user');
  if (!first) return 'New conversation';
  const t = first.content.trim();
  return t.length > 40 ? t.slice(0, 40) + '…' : t;
};

const timeLabel = (ts) =>
  new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function fmt(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n)/g).map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (p.startsWith('`')  && p.endsWith('`'))  return <code key={i}>{p.slice(1, -1)}</code>;
    if (p === '\n') return <br key={i} />;
    return p;
  });
}

export default function AIChat({ onClose, initialQuery = null, initialMode = 'knowledge' }) {
  const [msgs,        setMsgs]        = useState(loadCurrent);
  const [sessions,    setSessions]    = useState(loadSessions);
  const [sidebarOpen, setSidebarOpen] = useState(() => loadSessions().length > 0);
  const [input,       setInput]       = useState('');
  const [loading,     setLoading]     = useState(false);
  const [stream,      setStream]      = useState('');

  const msgRef      = useRef();
  const inputRef    = useRef();
  const initialSent = useRef(false);

  /* Persist current chat */
  useEffect(() => {
    try { sessionStorage.setItem(CURRENT_KEY, JSON.stringify(msgs)); } catch {}
  }, [msgs]);

  /* Persist sessions list */
  useEffect(() => {
    try { sessionStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions)); } catch {}
  }, [sessions]);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight;
  }, [msgs, stream, loading]);

  /* Save current msgs to history (if it has user messages) */
  const archiveCurrent = useCallback((currentMsgs) => {
    const hasUser = currentMsgs.some(m => m.role === 'user');
    if (!hasUser) return;
    const entry = {
      id:    Date.now().toString(),
      title: sessionTitle(currentMsgs),
      msgs:  currentMsgs,
      time:  Date.now(),
    };
    setSessions(prev => [entry, ...prev].slice(0, 25));
    setSidebarOpen(true);
  }, []);

  /* New Chat — archives current, starts fresh */
  const newChat = useCallback(() => {
    archiveCurrent(msgs);
    setMsgs(defaultMsgs());
    setStream('');
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [msgs, archiveCurrent]);

  /* Load a past session — archives current, restores selected */
  const loadSession = useCallback((session) => {
    archiveCurrent(msgs);
    setSessions(prev => prev.filter(s => s.id !== session.id));
    setMsgs(session.msgs);
    setStream('');
    setInput('');
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [msgs, archiveCurrent]);

  /* Delete a session from history */
  const deleteSession = useCallback((e, id) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
  }, []);

  /* Auto-send initial tech query once on mount */
  useEffect(() => {
    if (initialQuery && !initialSent.current) {
      initialSent.current = true;
      // eslint-disable-next-line no-use-before-define
      sendMsg(initialQuery, initialMode);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMsg = useCallback(async (text, modeOverride = 'knowledge') => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    if (msg.toLowerCase() === 'exit')  { onClose(); return; }
    if (msg.toLowerCase() === 'clear') { newChat(); return; }

    /* Question limit */
    if (getCount() >= MAX_QUESTIONS) {
      setMsgs(prev => [
        ...prev,
        { role: 'user', content: msg },
        {
          role: 'assistant',
          content: `You've reached the **${MAX_QUESTIONS}-question limit** for this session.\n\nTo learn more about Aditya, reach out directly:\n✉ aditya2002dey@gmail.com\n⊛ linkedin.com/in/aditya-dey-8144b7202`,
        },
      ]);
      setInput('');
      return;
    }
    bumpCount();

    setInput('');
    const newMsgs = [...msgs, { role: 'user', content: msg }];
    setMsgs(newMsgs);
    setLoading(true);
    setStream('');

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMsgs
            .filter(m => !(m.role === 'assistant' && m.content === WELCOME))
            .map(m => ({ role: m.role, content: m.content })),
          mode: modeOverride,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const ct = res.headers.get('content-type') || '';
      if (ct.includes('text/event-stream')) {
        const reader = res.body.getReader();
        const dec    = new TextDecoder();
        let acc = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          for (const line of dec.decode(value, { stream: true }).split('\n')) {
            if (!line.startsWith('data: ')) continue;
            const d = line.slice(6).trim();
            if (d === '[DONE]') break;
            try {
              const token = JSON.parse(d).content || '';
              if (token) { acc += token; setStream(acc); }
            } catch {}
          }
        }
        setMsgs(prev => [...prev, { role: 'assistant', content: acc }]);
        setStream('');
      } else {
        const data = await res.json();
        setMsgs(prev => [...prev, { role: 'assistant', content: data.content || 'No response.' }]);
      }
    } catch (err) {
      setMsgs(prev => [
        ...prev,
        { role: 'assistant', content: `Error: ${err.message}\n\nCheck Vercel function logs for details.` },
      ]);
    } finally {
      setLoading(false);
      setStream('');
      inputRef.current?.focus();
    }
  }, [input, loading, msgs, onClose, newChat]);

  const onKey = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
    if (e.key === 'Escape') onClose();
  }, [sendMsg, onClose]);

  const remaining       = Math.max(0, MAX_QUESTIONS - getCount());
  const isFirstSession  = msgs.length <= 1;

  return (
    <div className="ai-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={`ai-window ${sidebarOpen ? 'sidebar-open' : ''}`}>

        {/* ── Sidebar ── */}
        <div className={`ai-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="ai-sidebar-header">
            <span>History</span>
            <button className="ai-sidebar-close" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>
          <div className="ai-sidebar-list">
            {sessions.length === 0 ? (
              <div className="ai-sidebar-empty">No previous chats yet.<br />Click "new chat" to start one.</div>
            ) : (
              sessions.map(s => (
                <div key={s.id} className="ai-session-item" onClick={() => loadSession(s)}>
                  <span className="ai-session-title">{s.title}</span>
                  <div className="ai-session-meta">
                    <span className="ai-session-time">{timeLabel(s.time)}</span>
                    <button
                      className="ai-session-del"
                      onClick={e => deleteSession(e, s.id)}
                      title="Delete"
                    >✕</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Main chat ── */}
        <div className="ai-main">
          <div className="ai-titlebar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                className="ai-sidebar-toggle"
                onClick={() => setSidebarOpen(o => !o)}
                title="Toggle chat history"
              >
                ☰
              </button>
              <div>
                <div className="ai-bot-name">◈ ADBOT v1.0</div>
                <div className="ai-bot-sub">Llama 3.1 · RAG · {remaining} q left</div>
              </div>
            </div>
            <div className="ai-titlebar-actions">
              <button className="ai-new-chat" onClick={newChat}>new chat</button>
              <button className="ai-close" onClick={onClose}>✕</button>
            </div>
          </div>

          <div className="ai-messages" ref={msgRef}>
            {msgs.map((m, i) => (
              <div key={i} className={`ai-msg ${m.role}`}>
                <span className="ai-msg-prefix">{m.role === 'user' ? 'you   >' : 'adbot >'}</span>
                <span className="ai-msg-content">{fmt(m.content)}</span>
              </div>
            ))}
            {stream && (
              <div className="ai-msg bot">
                <span className="ai-msg-prefix">adbot &gt;</span>
                <span className="ai-msg-content">
                  {fmt(stream)}
                  <span style={{ display: 'inline-block', width: '7px', height: '13px', background: 'var(--orange)', marginLeft: '2px', verticalAlign: 'text-bottom', animation: 'bounce 1s infinite' }} />
                </span>
              </div>
            )}
            {loading && !stream && <div className="ai-typing"><span /><span /><span /></div>}
          </div>

          {isFirstSession && !loading && (
            <div className="ai-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="ai-sug" onClick={() => sendMsg(s)}>{s}</button>
              ))}
            </div>
          )}

          <div className="ai-hint">Enter to send · Esc to close · &apos;clear&apos; to reset</div>

          <div className="ai-input-area">
            <span className="ai-input-prefix">you &gt;</span>
            <input
              ref={inputRef}
              className="ai-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="Ask about Aditya's projects, skills, experience…"
              disabled={loading}
              autoComplete="off"
              spellCheck={false}
            />
            <button className="ai-send-btn" onClick={() => sendMsg()} disabled={loading || !input.trim()}>
              {loading ? '…' : 'send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
