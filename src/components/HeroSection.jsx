import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { personal } from '../data/portfolio.js';

/* Magnetic pull — on touch devices it's a no-op */
function MagneticWrap({ children }) {
  const ref = useRef();

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 24;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 24;
    el.style.transition = 'transform 0.1s ease';
    el.style.transform  = `translate(${x}px, ${y}px)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    el.style.transform  = '';
  }, []);

  return (
    <span ref={ref} style={{ display: 'inline-block' }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </span>
  );
}

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
  { to: 3,   suffix: '+', label: 'Production\nAI Systems' },
  { to: 12,  suffix: '+', label: 'Projects\nShipped' },
  { to: 7,   suffix: '+', label: 'LangGraph\nAgents Built' },
  { text: 'NIT',          label: 'Mizoram\nM.Tech' },
];

/* Counts from 0 → to when it enters the viewport */
function CountUp({ to, suffix }) {
  const [val,  setVal]    = useState(0);
  const ref     = useRef();
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        obs.disconnect();
        const dur   = 1500;
        const begin = performance.now();
        const tick  = (now) => {
          const p     = Math.min((now - begin) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setVal(Math.round(eased * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.8 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

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


          <div className="hero-cta">
            <MagneticWrap>
              <a href={`mailto:${personal.email}`} className="hero-btn-primary">
                Get in touch
              </a>
            </MagneticWrap>
            <MagneticWrap>
              <button
                className="hero-btn-ghost"
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View my work ↓
              </button>
            </MagneticWrap>
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
            {STATS.map((s, i) => (
              <div key={i} className="hero-stat-item">
                <div className="hero-stat-n">
                  {s.to !== undefined
                    ? <CountUp to={s.to} suffix={s.suffix} />
                    : s.text}
                </div>
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
