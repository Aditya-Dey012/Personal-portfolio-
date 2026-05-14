import { useState, useEffect, lazy, Suspense } from 'react';
import { personal } from '../data/portfolio.js';

const HeroOrbs = lazy(() => import('../scene/HeroOrbs.jsx'));

const ROLES = [
  'Multi-Agent LangGraph Pipelines',
  'FAISS-Powered RAG Systems',
  'Production AI Applications',
  'LLM Analytics Platforms',
  'FastAPI · AI Backends',
];

const TECH = ['LangGraph', 'FAISS', 'FastAPI', 'LangChain', 'PySpark', 'MLflow', 'AWS', 'Groq', 'Next.js'];

const STATS = [
  { num: '3+',  label: 'Production\nAI Systems' },
  { num: '12+', label: 'Projects\nShipped' },
  { num: '7+',  label: 'LangGraph\nAgents Built' },
  { num: 'NIT', label: 'Mizoram\nM.Tech' },
];

function Typewriter() {
  const [idx,       setIdx]       = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting,  setDeleting]  = useState(false);

  useEffect(() => {
    const target = ROLES[idx];
    let t;
    if (!deleting && displayed.length < target.length) {
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 52);
    } else if (!deleting && displayed.length === target.length) {
      t = setTimeout(() => setDeleting(true), 2400);
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 26);
    } else {
      setDeleting(false);
      setIdx(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, idx]);

  return (
    <span className="hero-typewriter">
      {displayed}<span className="hero-cursor" />
    </span>
  );
}

export default function HeroSection({ onTechClick }) {
  return (
    <section className="hero-section">
      <div className="hero-bg-glow" />
      <div className="hero-bg-grid" />

      <div className="hero-inner">
        {/* Left: text content */}
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="hero-dot" />
            Gen AI Engineer &nbsp;·&nbsp; Bengaluru
          </div>

          <h1 className="hero-name">
            Aditya<br /><span>Dey</span>
          </h1>

          <div className="hero-role-line">
            Building&nbsp;<Typewriter />
          </div>

          <p className="hero-bio">
            I design and ship production-grade AI systems — multi-agent orchestration,
            semantic retrieval, and LLM-powered analytics that actually scale.
          </p>

          <div className="hero-cta">
            <a href={`mailto:${personal.email}`} className="hero-btn-primary">
              Get in touch
            </a>
            <button
              className="hero-btn-ghost"
              onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View my work ↓
            </button>
          </div>

          <div className="hero-tags">
            {TECH.map((t, i) => (
              <span
                key={t}
                className="hero-tag tag-clickable"
                style={{ animationDelay: `${0.7 + i * 0.06}s` }}
                role="button"
                tabIndex={0}
                title={`Ask AI: What is ${t}?`}
                onClick={() => onTechClick?.(t)}
                onKeyDown={e => e.key === 'Enter' && onTechClick?.(t)}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Stats strip */}
          <div className="hero-stats-strip">
            {STATS.map(s => (
              <div key={s.num} className="hero-stat-item">
                <div className="hero-stat-n">{s.num}</div>
                <div className="hero-stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D orbs */}
        <div className="hero-canvas-wrap">
          <Suspense fallback={null}>
            <HeroOrbs />
          </Suspense>
        </div>
      </div>

      <div
        className="hero-scroll"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        scroll &nbsp;<span>↓</span>
      </div>
    </section>
  );
}
