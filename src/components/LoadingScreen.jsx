import { useState, useEffect, useCallback } from 'react';

const BOOT_LINES = [
  { text: '▸ ADITYAOS v2.0 — Portfolio Intelligence System', delay: 380,  dim: true  },
  { text: '▸ Initializing LangGraph agent mesh...',           delay: 640,  dim: false },
  { text: '▸ Loading FAISS + ChromaDB vector indices...',     delay: 860,  dim: false },
  { text: '▸ Connecting Groq inference engine...',            delay: 1060, dim: false },
  { text: '▸ Compiling 3D render pipeline...',                delay: 1250, dim: false },
  { text: '▸ All systems operational.',                       delay: 1480, bright: true },
];

const DURATION = 2500;

export default function LoadingScreen({ onComplete }) {
  const [active,  setActive]  = useState(false);
  const [shown,   setShown]   = useState(0);
  const [pct,     setPct]     = useState(0);
  const [fading,  setFading]  = useState(false);

  const skip = useCallback(() => {
    setFading(true);
    setTimeout(onComplete, 450);
  }, [onComplete]);

  useEffect(() => {
    const t0     = setTimeout(() => setActive(true), 160);
    const timers = BOOT_LINES.map((l, i) =>
      setTimeout(() => setShown(i + 1), l.delay)
    );

    const start = Date.now();
    const tick  = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - start) / DURATION) * 100));
      setPct(p);
      if (p >= 100) clearInterval(tick);
    }, 30);

    const tFade = setTimeout(() => setFading(true), DURATION - 450);
    const tDone = setTimeout(onComplete, DURATION);

    const onKey = () => skip();
    window.addEventListener('keydown', onKey, { once: true });

    return () => {
      clearTimeout(t0);
      timers.forEach(clearTimeout);
      clearInterval(tick);
      clearTimeout(tFade);
      clearTimeout(tDone);
      window.removeEventListener('keydown', onKey);
    };
  }, [onComplete, skip]);

  return (
    <div
      className={`ls-root${fading ? ' ls-fading' : ''}`}
      onClick={skip}
      title="Click or press any key to skip"
    >
      {/* Perspective grid floor */}
      <div className="ls-grid" />

      {/* CRT scanlines */}
      <div className="ls-scanlines" />

      {/* Horizontal scan sweep */}
      <div className="ls-sweep" />

      {/* Corner reticles */}
      <span className="ls-corner ls-tl" />
      <span className="ls-corner ls-tr" />
      <span className="ls-corner ls-bl" />
      <span className="ls-corner ls-br" />

      {/* Floating hex decorations */}
      <div className="ls-hex ls-hex-1">⬡</div>
      <div className="ls-hex ls-hex-2">⬡</div>
      <div className="ls-hex ls-hex-3">◈</div>

      {/* ── Main title block ── */}
      <div className={`ls-hero ${active ? 'ls-hero-in' : ''}`}>
        <div className="ls-eyebrow">◈ &nbsp; PORTFOLIO SYSTEM INITIALIZING</div>

        <div className="ls-name">
          ADITYA<br /><span>DEY</span>
        </div>

        <div className="ls-tagline">
          GEN AI ENGINEER &nbsp;·&nbsp; BENGALURU
        </div>
      </div>

      {/* ── Boot log ── */}
      <div className="ls-log" aria-live="polite">
        {BOOT_LINES.slice(0, shown).map((l, i) => (
          <div
            key={i}
            className={`ls-log-line${l.bright ? ' ls-log-bright' : l.dim ? ' ls-log-dim' : ''}`}
          >
            {l.text}
          </div>
        ))}
      </div>

      {/* ── Progress bar ── */}
      <div className="ls-bottom">
        <div className="ls-bar-track">
          <div className="ls-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="ls-pct">{String(pct).padStart(2, '0')}%</div>
      </div>

      <div className="ls-skip-hint">click or press any key to skip</div>
    </div>
  );
}
