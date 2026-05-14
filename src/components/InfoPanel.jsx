import { useScene } from '../context/SceneContext.jsx';
import { personal, skills, experience, education } from '../data/portfolio.js';

const WORK_PROJECTS = experience.flatMap(e =>
  e.projects.map(p => ({ ...p, company: e.company, role: e.role, period: e.period }))
);

/* ── Panel content renderers ── */

function AboutPanel() {
  return (
    <>
      <div className="panel-section">
        <div className="panel-label">Who</div>
        <div className="panel-text" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--cream)', marginBottom: '8px' }}>
          Aditya Dey
        </div>
        <div className="panel-text" style={{ fontSize: '12px', color: 'var(--orange)', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
          Gen AI Engineer · Nexturn · Bengaluru
        </div>
        <p className="panel-text">
          I build production-grade AI systems — multi-agent RAG pipelines, LLM-powered analytics,
          and full-stack AI applications that actually ship.
        </p>
        <p className="panel-text" style={{ marginTop: '10px' }}>
          Proficient in <strong>LangChain</strong>, <strong>LangGraph</strong>, <strong>FAISS</strong>,
          <strong> FastAPI</strong>, and modern cloud-native data engineering.
        </p>
      </div>

      <hr className="divider-line" />

      <div className="panel-section">
        <div className="panel-label">Education</div>
        {education.map((e, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cream)' }}>{e.degree}</div>
            <div style={{ fontSize: '11px', color: 'var(--orange)', fontFamily: 'var(--font-mono)' }}>{e.institution} · {e.period}</div>
          </div>
        ))}
      </div>

      <hr className="divider-line" />

      <div className="panel-section">
        <div className="panel-label">Contact</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <a href={`mailto:${personal.email}`} className="panel-link">✉ {personal.email}</a>
          <a href={personal.github} target="_blank" rel="noreferrer" className="panel-link">⌥ github.com/Aditya-Dey012</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="panel-link">⊛ LinkedIn</a>
          <span className="panel-text" style={{ fontSize: '12px' }}>📍 {personal.location}</span>
        </div>
      </div>

      <hr className="divider-line" />

      <div className="panel-section">
        <div className="panel-label">Open To</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {['AI/ML Roles', 'GenAI'].map(t => (
            <span key={t} className="tag orange">{t}</span>
          ))}
        </div>
      </div>
    </>
  );
}

function ProjectPanel({ data }) {
  if (!data) return <div className="panel-text">Select a project frame on the wall.</div>;
  return (
    <>
      <div className="panel-section">
        <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--cream)', marginBottom: '4px' }}>
          {data.name}
        </div>
        {data.company && (
          <div style={{ fontSize: '11px', color: 'var(--orange)', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
            {data.company} · {data.role} · {data.period}
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
          {data.stack?.map(s => <span key={s} className="tag orange">{s}</span>)}
        </div>
      </div>

      <hr className="divider-line" />

      <div className="panel-section">
        <div className="panel-label">Key Contributions</div>
        {data.bullets ? (
          <ul className="exp-bullets">
            {data.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        ) : (
          <p className="panel-text">{data.description}</p>
        )}
      </div>

      {data.github && (
        <>
          <hr className="divider-line" />
          <a href={data.github} target="_blank" rel="noreferrer" className="panel-link">
            ↗ View on GitHub
          </a>
        </>
      )}
    </>
  );
}

function SkillsPanel({ data }) {
  const cats = data?.category
    ? [[data.category, data.items]]
    : Object.entries(skills);

  return (
    <>
      {cats.map(([cat, items]) => (
        <div key={cat} className="skill-cat">
          <div className="skill-cat-name">{cat}</div>
          <div className="skill-grid">
            {items.map(s => (
              <span key={s} className="tag" style={{ borderColor: 'var(--border2)', color: 'var(--text)' }}>{s}</span>
            ))}
          </div>
          <hr className="divider-line" />
        </div>
      ))}
    </>
  );
}

function ExperiencePanel() {
  return (
    <>
      {experience.map(exp => (
        <div key={exp.slug} className="exp-item">
          <div className="exp-role">{exp.role}</div>
          <div className="exp-meta">{exp.company} · {exp.period} · {exp.location}</div>
          {exp.projects.map(p => (
            <div key={p.name} style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cream)', margin: '6px 0 4px', borderLeft: '2px solid var(--orange)', paddingLeft: '8px' }}>
                {p.name}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginBottom: '6px' }}>
                {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
              <ul className="exp-bullets">
                {p.bullets.slice(0, 3).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
          <hr className="divider-line" />
        </div>
      ))}
    </>
  );
}

/* ── Icon/title map ── */
const PANEL_META = {
  about:      { icon: '◈', title: 'About Me' },
  project:    { icon: '⬡', title: 'Project Details' },
  skills:     { icon: '⚡', title: 'Tech Stack' },
  experience: { icon: '◆', title: 'Experience' },
};

export default function InfoPanel() {
  const { panel, setPanel } = useScene();
  const isOpen = Boolean(panel);
  const meta   = panel ? PANEL_META[panel.type] : null;

  return (
    <div
      className={`info-panel-overlay${isOpen ? ' open' : ''}`}
      onClick={e => e.target === e.currentTarget && setPanel(null)}
    >
      <div className="info-panel">
        {meta && (
          <>
            <div className="panel-header">
              <div className="panel-title">
                <span className="panel-icon">{meta.icon}</span>
                {meta.title}
              </div>
              <button className="panel-close" onClick={() => setPanel(null)}>✕</button>
            </div>

            <div className="panel-body">
              {panel.type === 'about'      && <AboutPanel />}
              {panel.type === 'project'    && <ProjectPanel data={panel.data} />}
              {panel.type === 'skills'     && <SkillsPanel  data={panel.data} />}
              {panel.type === 'experience' && <ExperiencePanel />}
            </div>

            {/* Resume download footer */}
            <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
              <a
                href="/Aditya_CV.pdf"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'linear-gradient(135deg, var(--orange-dim), var(--orange))',
                  color: '#fff',
                  padding: '8px 18px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  transition: 'opacity 0.2s',
                }}
              >
                ↓ Download Resume
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
