import { personal, skills, experience, projects, education } from '../data/portfolio.js';

const FEAT_COLORS = ['#ff6b35', '#ffd700', '#4ade80'];

function ProfilePhoto() {
  return (
    <div className="profile-photo-wrap">
      <img
        src="/profile.png"
        alt="Aditya Dey"
        className="profile-photo"
        onError={e => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextSibling.style.display = 'flex';
        }}
      />
      <div className="profile-photo-fallback" style={{ display: 'none' }}>AD</div>
    </div>
  );
}

/* Clickable tech tag — opens AI chat with "What is X?" */
function TechTag({ label, onTechClick, className = 'tag orange' }) {
  if (!onTechClick) return <span className={className}>{label}</span>;
  return (
    <span
      className={`${className} tag-clickable`}
      role="button"
      tabIndex={0}
      title={`Ask AI: What is ${label}?`}
      onClick={() => onTechClick(label)}
      onKeyDown={e => e.key === 'Enter' && onTechClick(label)}
    >
      {label}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="section-eyebrow">◈ About Me</div>
      <h2 className="section-title">
        Building Production-Grade<br />
        <span>AI Systems</span>
      </h2>

      <div className="about-grid">
        <div>
          <ProfilePhoto />

          <p className="about-bio-text">{personal.bio}</p>
          <p className="about-bio-text">
            At Nexturn I architect multi-agent LangGraph pipelines, FAISS-backed RAG systems,
            and AI-powered platforms that ship to production. My focus is the intersection of
            cutting-edge LLM research and reliable, scalable engineering.
          </p>

          <div style={{ marginTop: '32px' }}>
            <div className="about-card-label">Get in touch</div>
            <div className="about-contact">
              <a href={`mailto:${personal.email}`} className="contact-link">✉ {personal.email}</a>
              <a href={personal.github} target="_blank" rel="noreferrer" className="contact-link">⌥ github.com/Aditya-Dey012</a>
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="contact-link">⊛ LinkedIn Profile</a>
              <span className="contact-link" style={{ color: 'var(--text-dim)', cursor: 'default' }}>📍 {personal.location}</span>
            </div>
          </div>

          <div style={{ marginTop: '28px' }}>
            <div className="about-card-label">Open to opportunities</div>
            <div className="open-to-tags">
              {['FAANG AI/ML Roles', 'Senior GenAI', 'Research Engineering', 'ML Startups'].map(t => (
                <span key={t} className="tag orange">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="about-card">
          <div className="about-card-label">Education</div>
          {education.map((e, i) => (
            <div key={i} className="edu-item">
              <div className="edu-degree">{e.degree}</div>
              <div className="edu-meta">{e.institution} · {e.period}</div>
            </div>
          ))}

          <hr className="divider-line" style={{ margin: '20px 0' }} />

          <div className="about-card-label">Resume</div>
          <a href="/Aditya_CV.pdf" target="_blank" rel="noreferrer" className="dl-resume-btn">
            ↓ Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}

export function ExperienceSection({ onTechClick }) {
  return (
    <section id="experience" className="section">
      <div className="section-eyebrow">◆ Experience</div>
      <h2 className="section-title">
        Where I've <span>Built</span>
      </h2>

      {experience.map(job => (
        <div key={job.slug} className="exp-job">
          <div className="exp-job-header">
            <div className="exp-job-logo">{job.company[0]}</div>
            <div className="exp-job-info">
              <div className="exp-job-role">{job.role}</div>
              <div className="exp-job-meta">{job.company} · {job.period} · {job.location}</div>
            </div>
          </div>

          {job.projects.map(p => (
            <div key={p.name} className="exp-project">
              <div className="exp-project-name">{p.name}</div>
              <div className="exp-stack">
                {p.stack.map(s => (
                  <TechTag key={s} label={s} onTechClick={onTechClick} />
                ))}
              </div>
              <ul className="exp-bullets-list">
                {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export function ProjectsSection({ onTechClick }) {
  return (
    <section id="projects" className="section">
      <div className="section-eyebrow">⬡ Side Projects</div>
      <h2 className="section-title">
        Personal <span>Builds</span>
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--text-dim)', marginBottom: '36px', fontFamily: 'var(--font-mono)' }}>
        Work projects are detailed in the Experience section above. These are my personal explorations.
      </p>

      <div className="side-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {projects.map((p, i) => (
          <div key={p.slug} className="side-card" style={{ borderTop: `2px solid ${FEAT_COLORS[i % FEAT_COLORS.length]}44` }}>
            <div className="side-card-name">{p.name}</div>
            <p className="side-card-desc">{p.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
              {p.stack.map(s => (
                <TechTag key={s} label={s} onTechClick={onTechClick} className="tag" />
              ))}
            </div>
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" className="contact-link" style={{ fontSize: '11px' }}>
                ↗ GitHub
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkillsSection({ onTechClick }) {
  return (
    <section id="skills" className="section">
      <div className="section-eyebrow">⚡ Tech Stack</div>
      <h2 className="section-title">
        What I <span>Work With</span>
      </h2>

      <div className="skills-grid">
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat} className="skill-row">
            <div className="skill-cat-label">{cat}</div>
            <div className="skill-tags">
              {items.map(s => (
                <TechTag
                  key={s}
                  label={s}
                  onTechClick={onTechClick}
                  className="tag"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
