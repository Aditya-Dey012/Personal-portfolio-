import { useRef, useCallback, useState } from 'react';
import emailjs from '@emailjs/browser';
import { personal, skills, experience, projects, education, hobbies, languages, certifications } from '../data/portfolio.js';
import { playClick } from '../utils/sounds.js';
import useReveal from '../hooks/useReveal.js';
import ScrambleText from './ScrambleText.jsx';

const FEAT_COLORS = ['#ff6b35', '#ffd700', '#4ade80'];

/* 3D perspective tilt — desktop only, no-op on touch */
function TiltCard({ children, className, style }) {
  const ref = useRef();

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transition = 'box-shadow 0.12s ease';
    el.style.transform  = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
    el.style.boxShadow  = `${-x * 14}px ${y * 10}px 34px rgba(255,107,53,0.13)`;
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease';
    el.style.transform  = '';
    el.style.boxShadow  = '';
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

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

function CopyEmailBtn() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    playClick();
  };
  return (
    <button onClick={copy} className="copy-email-btn" title="Copy email">
      {copied ? '✓ Copied' : '⎘ Copy'}
    </button>
  );
}

function ResumeViewer({ onClose }) {
  return (
    <div className="resume-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="resume-modal">
        <div className="resume-modal-bar">
          <span>Aditya_CV.pdf</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="/Aditya_CV.pdf" download className="resume-dl-btn">↓ Download</a>
            <button className="resume-close-btn" onClick={onClose}>✕</button>
          </div>
        </div>
        <iframe src="/Aditya_CV.pdf" className="resume-iframe" title="Aditya CV" />
      </div>
    </div>
  );
}

export function AboutSection() {
  const ref = useReveal();
  const [showResume, setShowResume] = useState(false);
  return (
    <section id="about" className="section reveal-section" ref={ref}>
      <div className="section-eyebrow">◈ About Me</div>
      <h2 className="section-title">
        <ScrambleText>Building Production-Grade</ScrambleText><br />
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
              <div className="about-email-row">
                <a href={`mailto:${personal.email}`} className="contact-link">✉ {personal.email}</a>
                <CopyEmailBtn />
              </div>
              <a href={personal.github}    target="_blank" rel="noreferrer" className="contact-link">⌥ github.com/Aditya-Dey012</a>
              <a href={personal.linkedin}  target="_blank" rel="noreferrer" className="contact-link">⊛ LinkedIn Profile</a>
              <a href={personal.instagram} target="_blank" rel="noreferrer" className="contact-link">◉ Instagram</a>
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
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
            <button className="dl-resume-btn" onClick={() => { playClick(); setShowResume(true); }}>⊞ View Resume</button>
            <a href="/Aditya_CV.pdf" download className="dl-resume-btn" onClick={playClick}>↓ Download</a>
          </div>

          <hr className="divider-line" style={{ margin: '20px 0' }} />

          <div className="about-card-label">Certifications</div>
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {certifications.map(c => (
              <div key={c.title} className="cert-item">
                <div className="cert-title">{c.title}</div>
                <div className="cert-meta">{c.issuer}</div>
                <div className="cert-desc">{c.description}</div>
              </div>
            ))}
          </div>

          <hr className="divider-line" style={{ margin: '20px 0' }} />

          <div className="about-card-label">Languages</div>
          <div className="about-lang-list">
            {languages.map(l => (
              <div key={l.name} className="about-lang-item">
                <span className="about-lang-name">{l.name}</span>
                <span className="about-lang-level">{l.level}</span>
              </div>
            ))}
          </div>

          <hr className="divider-line" style={{ margin: '20px 0' }} />

          <div className="about-card-label">Beyond the terminal</div>
          <div className="about-hobbies">
            {hobbies.map(h => (
              <span key={h} className="tag" style={{ background: 'var(--surface3, var(--surface2))', color: 'var(--text-dim)', borderColor: 'var(--border)' }}>{h}</span>
            ))}
          </div>
        </div>
      </div>
      {showResume && <ResumeViewer onClose={() => setShowResume(false)} />}
    </section>
  );
}

export function ExperienceSection({ onTechClick }) {
  const ref = useReveal();
  return (
    <section id="experience" className="section reveal-section" ref={ref}>
      <div className="section-eyebrow">◆ Experience</div>
      <h2 className="section-title">
        <ScrambleText>Where I've </ScrambleText><span>Built</span>
      </h2>

      <div className="exp-timeline">
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
      </div>
    </section>
  );
}

export function ProjectsSection({ onTechClick }) {
  const ref = useReveal();
  return (
    <section id="projects" className="section reveal-section" ref={ref}>
      <div className="section-eyebrow">⬡ Side Projects</div>
      <h2 className="section-title">
        <ScrambleText>Personal </ScrambleText><span>Builds</span>
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--text-dim)', marginBottom: '36px', fontFamily: 'var(--font-mono)' }}>
        Work projects are detailed in the Experience section above. These are my personal explorations.
      </p>

      <div className="side-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
        {projects.map((p, i) => (
          <TiltCard
            key={p.slug}
            className="side-card stagger-item"
            style={{ borderTop: `2px solid ${FEAT_COLORS[i % FEAT_COLORS.length]}44`, '--i': i }}
          >
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
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

export function ContactSection() {
  const ref     = useReveal();
  const formRef = useRef();
  const [status,  setStatus]  = useState('idle'); // idle | sending | success | error
  const [errMsg,  setErrMsg]  = useState('');
  const [errors,  setErrors]  = useState({});

  const validate = () => {
    const f = formRef.current;
    const e = {};
    if (!f.from_name.value.trim())  e.from_name  = 'Name is required';
    if (!f.from_email.value.trim()) e.from_email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.from_email.value)) e.from_email = 'Enter a valid email';
    if (!f.message.value.trim())    e.message    = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );
      setStatus('success');
      formRef.current.reset();
    } catch (err) {
      setErrMsg(err?.text || 'Something went wrong. Try emailing directly.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section reveal-section" ref={ref}>
      <div className="section-eyebrow">✉ Contact</div>
      <h2 className="section-title">
        <ScrambleText>Let&apos;s </ScrambleText><span>Talk</span>
      </h2>

      <div className="contact-grid">
        <div className="contact-info">
          <p className="contact-blurb">
            Open to full-time roles, freelance AI projects, and interesting collaborations.
            Drop a message and I&apos;ll get back within 24 hours.
          </p>
          <div className="contact-links-stack">
            <a href={`mailto:${personal.email}`} className="contact-link">✉ {personal.email}</a>
            <a href={personal.linkedin}  target="_blank" rel="noreferrer" className="contact-link">⊛ LinkedIn</a>
            <a href={personal.github}    target="_blank" rel="noreferrer" className="contact-link">⌥ GitHub</a>
            <a href={personal.instagram} target="_blank" rel="noreferrer" className="contact-link">◉ Instagram</a>
            <span className="contact-link" style={{ cursor: 'default', color: 'var(--text-dim)' }}>📍 {personal.location}</span>
          </div>
        </div>

        <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="cf-field">
            <label className="cf-label">Name</label>
            <input className={`cf-input${errors.from_name ? ' cf-input-err' : ''}`} name="from_name" type="text" placeholder="Your name" disabled={status === 'sending'} onChange={() => setErrors(p => ({ ...p, from_name: '' }))} />
            {errors.from_name  && <span className="cf-err">{errors.from_name}</span>}
          </div>
          <div className="cf-field">
            <label className="cf-label">Email</label>
            <input className={`cf-input${errors.from_email ? ' cf-input-err' : ''}`} name="from_email" type="email" placeholder="your@email.com" disabled={status === 'sending'} onChange={() => setErrors(p => ({ ...p, from_email: '' }))} />
            {errors.from_email && <span className="cf-err">{errors.from_email}</span>}
          </div>
          <div className="cf-field">
            <label className="cf-label">Message</label>
            <textarea className={`cf-input cf-textarea${errors.message ? ' cf-input-err' : ''}`} name="message" rows={5} placeholder="What's on your mind?" disabled={status === 'sending'} onChange={() => setErrors(p => ({ ...p, message: '' }))} />
            {errors.message    && <span className="cf-err">{errors.message}</span>}
          </div>

          {status === 'success' && (
            <div className="cf-feedback success">✓ Message sent — I&apos;ll reply soon.</div>
          )}
          {status === 'error' && (
            <div className="cf-feedback error">✗ {errMsg}</div>
          )}

          <button
            className="cf-submit"
            type="submit"
            disabled={status === 'sending' || status === 'success'}
            onClick={playClick}
          >
            {status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent ✓' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  );
}

export function SkillsSection({ onTechClick }) {
  const ref = useReveal();
  return (
    <section id="skills" className="section reveal-section" ref={ref}>
      <div className="section-eyebrow">⚡ Tech Stack</div>
      <h2 className="section-title">
        <ScrambleText>What I </ScrambleText><span>Work With</span>
      </h2>

      <div className="skills-grid">
        {Object.entries(skills).map(([cat, items], i) => (
          <div key={cat} className="skill-row stagger-item" style={{ '--i': i }}>
            <div className="skill-cat-label">{cat}</div>
            <div className="skill-tags">
              {items.map(s => (
                <TechTag key={s} label={s} onTechClick={onTechClick} className="tag" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
