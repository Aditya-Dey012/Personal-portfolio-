import { personal, skills, experience, projects, education, COMMANDS_LIST } from '../data/portfolio.js';

/* ── helpers ── */
const G  = ({ children }) => <span className="c-green">{children}</span>;
const CY = ({ children }) => <span className="c-cyan">{children}</span>;
const YW = ({ children }) => <span className="c-yellow">{children}</span>;
const RD = ({ children }) => <span className="c-red">{children}</span>;
const DM = ({ children }) => <span className="c-dim">{children}</span>;
const WH = ({ children }) => <span className="c-white bold">{children}</span>;
const MG = ({ children }) => <span className="c-magenta">{children}</span>;

/* ── ASCII banner ── */
const BANNER = `
 █████╗ ██████╗ ██╗████████╗██╗   ██╗ █████╗     ██████╗ ███████╗██╗   ██╗
██╔══██╗██╔══██╗██║╚══██╔══╝╚██╗ ██╔╝██╔══██╗    ██╔══██╗██╔════╝╚██╗ ██╔╝
███████║██║  ██║██║   ██║    ╚████╔╝ ███████║    ██║  ██║█████╗   ╚████╔╝
██╔══██║██║  ██║██║   ██║     ╚██╔╝  ██╔══██║    ██║  ██║██╔══╝    ╚██╔╝
██║  ██║██████╔╝██║   ██║      ██║   ██║  ██║    ██████╔╝███████╗   ██║
╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝      ╚═╝   ╚═╝  ╚═╝    ╚═════╝ ╚══════╝   ╚═╝`;

const NEOFETCH_LOGO = `
   ___     __
  /   |   / /
 / /| |  / /
/ ___ | / /___
/_/  |_|/_____/`;

/* ═══════════════════════════════════════════
   COMMANDS
   ═══════════════════════════════════════════ */

function HelpOutput({ onCommand }) {
  const groups = {
    'NAVIGATION': ['whoami', 'about', 'skills', 'experience', 'projects', 'education', 'contact'],
    'FILESYSTEM': ['ls', 'cat'],
    'ACTIONS':    ['resume', 'github', 'linkedin', 'ai', 'matrix', 'neofetch'],
    'SYSTEM':     ['clear', 'history', 'date'],
  };

  return (
    <div>
      <pre className="ascii" style={{ fontSize: '11px', marginBottom: '12px' }}>{BANNER}</pre>
      <div style={{ marginBottom: '4px' }}>
        <WH>Gen AI Engineer</WH> <DM>·</DM> <CY>Bengaluru, IN</CY> <DM>·</DM>{' '}
        <G>LangChain · LangGraph · FAISS · FastAPI · AWS</G>
      </div>
      <hr className="divider" style={{ margin: '10px 0' }} />

      {Object.entries(groups).map(([group, cmds]) => (
        <div key={group} style={{ marginBottom: '10px' }}>
          <div className="c-yellow bold" style={{ fontSize: '11px', letterSpacing: '0.1em', marginBottom: '4px' }}>
            {group}
          </div>
          <table className="cmd-table">
            <tbody>
              {cmds.map(c => {
                const info = COMMANDS_LIST.find(x => x.cmd === c);
                return (
                  <tr key={c}>
                    <td>
                      <span
                        className="cmd-name"
                        onClick={() => onCommand && onCommand(c)}
                      >
                        {c}
                      </span>
                    </td>
                    <td className="cmd-desc">{info?.desc || ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}

      <hr className="divider" style={{ margin: '8px 0' }} />
      <DM>
        Tip: Press <G>↑/↓</G> for history · <G>Tab</G> to complete · <G>Ctrl+L</G> to clear
      </DM>
    </div>
  );
}

function WhoAmIOutput() {
  return (
    <div>
      <pre className="banner-ascii">{BANNER}</pre>
      <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <div><WH>Name      </WH><G>:</G>  <WH>Aditya Dey</WH></div>
        <div><WH>Role      </WH><G>:</G>  <CY>Gen AI Engineer @ Nexturn</CY></div>
        <div><WH>Location  </WH><G>:</G>  <span className="c-text">Bengaluru, Karnataka, India</span></div>
        <div><WH>Stack     </WH><G>:</G>  <G>LangChain · LangGraph · FAISS · FastAPI · React</G></div>
        <div><WH>Education </WH><G>:</G>  <span className="c-text">M.Tech Data Science — NIT Mizoram</span></div>
        <div><WH>GitHub    </WH><G>:</G>  <a href={personal.github} target="_blank" rel="noreferrer" className="c-cyan" style={{ textDecoration: 'none' }}>{personal.github.replace('https://', '')}</a></div>
        <div><WH>Email     </WH><G>:</G>  <a href={`mailto:${personal.email}`} className="c-cyan" style={{ textDecoration: 'none' }}>{personal.email}</a></div>
        <div style={{ marginTop: '8px' }}>
          <DM>"{personal.bio}"</DM>
        </div>
      </div>
    </div>
  );
}

function AboutOutput() {
  return (
    <div>
      <div className="c-yellow bold" style={{ marginBottom: '8px' }}>$ cat about.md</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '700px' }}>
        <p className="c-text">
          I'm a <WH>Gen AI Engineer</WH> with hands-on experience designing{' '}
          <G>multi-agent RAG pipelines</G>, LLM-integrated analytics systems, and full-stack AI applications.
        </p>
        <p className="c-text">
          Proficient in <CY>LangChain</CY>, <CY>LangGraph</CY>, <CY>FAISS</CY>, <CY>AWS</CY>, and modern data engineering tools —
          with a strong foundation in machine learning, deep learning, and cloud-native development.
        </p>
        <p className="c-text">
          I thrive at the intersection of <G>AI research</G> and <G>production engineering</G> —
          turning bleeding-edge LLM capabilities into reliable, scalable systems that actually ship.
        </p>
        <div style={{ marginTop: '8px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href={personal.github}   target="_blank" rel="noreferrer" className="c-green" style={{ textDecoration: 'none' }}>↗ GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="c-cyan"  style={{ textDecoration: 'none' }}>↗ LinkedIn</a>
          <a href={`mailto:${personal.email}`} className="c-magenta" style={{ textDecoration: 'none' }}>↗ Email</a>
        </div>
      </div>
    </div>
  );
}

function LSOutput({ args }) {
  const path = (args || []).join(' ').trim().toLowerCase();

  if (!path || path === '.' || path === '~' || path === './') {
    return (
      <div>
        <div className="c-dim" style={{ marginBottom: '6px' }}>total 9</div>
        <div className="file-list">
          {[
            { perms: 'drwxr-xr-x', type: 'dir',  name: 'experience/' },
            { perms: 'drwxr-xr-x', type: 'dir',  name: 'projects/' },
            { perms: '-rw-r--r--', type: 'file', name: 'about.md' },
            { perms: '-rw-r--r--', type: 'file', name: 'skills.json' },
            { perms: '-rw-r--r--', type: 'file', name: 'education.md' },
            { perms: '-rw-r--r--', type: 'file', name: 'contact.md' },
            { perms: '-rwxr-xr-x', type: 'exec', name: 'resume.pdf' },
            { perms: '-rwxr-xr-x', type: 'exec', name: 'ask-ai.sh' },
          ].map(f => (
            <div key={f.name} className="file-entry">
              <span className="file-perms">{f.perms}</span>
              <span className={`file-name ${f.type}`}>{f.name}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '8px' }}>
          <DM>Try: <G>cat about.md</G>  ·  <G>ls experience/</G>  ·  <G>ls projects/</G></DM>
        </div>
      </div>
    );
  }

  if (path === 'experience/' || path === 'experience') {
    return (
      <div className="file-list">
        {experience.map(e => (
          <div key={e.slug} className="file-entry">
            <span className="file-perms">drwxr-xr-x</span>
            <span className="file-name dir">{e.slug}/</span>
            <span className="c-dim" style={{ fontSize: '11px' }}>{e.role} @ {e.company}</span>
          </div>
        ))}
        <div style={{ marginTop: '6px' }}><DM>Run: <G>cat experience/{experience[0].slug}</G></DM></div>
      </div>
    );
  }

  if (path === 'projects/' || path === 'projects') {
    return (
      <div className="file-list">
        {[
          ...experience.flatMap(e => e.projects.map(p => ({ name: p.name, type: 'work', slug: p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }))),
          ...projects.map(p => ({ name: p.name, type: 'side', slug: p.slug })),
        ].map((p, i) => (
          <div key={i} className="file-entry">
            <span className="file-perms">-rw-r--r--</span>
            <span className={`file-name ${p.type === 'work' ? 'dir' : 'file'}`}>{p.slug}</span>
            <span className="c-dim" style={{ fontSize: '11px' }}>{p.type === 'work' ? '[work]' : '[side]'}</span>
          </div>
        ))}
        <div style={{ marginTop: '6px' }}><DM>Run: <G>cat projects/spoc-smart-power-operations-centre</G></DM></div>
      </div>
    );
  }

  return <div className="error-output">ls: cannot access '{path}': No such file or directory</div>;
}

function CatOutput({ args }) {
  if (!args || args.length === 0) {
    return <div className="error-output">Usage: cat &lt;filename&gt;  e.g.  cat about.md</div>;
  }

  const file = args.join(' ').trim().toLowerCase();

  if (file === 'about.md') return <AboutOutput />;
  if (file === 'skills.json') return <SkillsOutput />;
  if (file === 'education.md') return <EducationOutput />;
  if (file === 'contact.md') return <ContactOutput />;
  if (file === 'resume.pdf') {
    window.open('/Aditya_CV.pdf', '_blank');
    return <div className="success-msg">Opening resume.pdf…</div>;
  }

  /* experience/slug */
  if (file.startsWith('experience/')) {
    const slug = file.replace('experience/', '');
    const exp  = experience.find(e => e.slug === slug);
    if (exp) return <ExperienceDetailOutput exp={exp} />;
  }

  /* projects/slug */
  if (file.startsWith('projects/')) {
    const slug = file.replace('projects/', '');

    // work projects
    for (const exp of experience) {
      for (const p of exp.projects) {
        const ps = p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        if (ps === slug || slug.includes(ps.slice(0, 8))) {
          return <WorkProjectDetail project={p} company={exp.company} role={exp.role} />;
        }
      }
    }

    // side projects
    const sp = projects.find(p => p.slug === slug || slug.includes(p.slug.slice(0, 8)));
    if (sp) return <SideProjectDetail project={sp} />;
  }

  return <div className="error-output">cat: {file}: No such file or directory</div>;
}

function SkillsOutput() {
  return (
    <div>
      <div className="c-yellow bold" style={{ marginBottom: '8px' }}>$ cat skills.json</div>
      <div className="skills-section">
        {Object.entries(skills).map(([cat, items]) => (
          <div key={cat}>
            <div className="skills-category-label">{cat}</div>
            <div className="skills-chips">
              {items.map(s => (
                <span key={s} className="skill-chip">{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceOutput() {
  return (
    <div>
      <div className="c-yellow bold" style={{ marginBottom: '10px' }}>$ ls experience/ —— Work History</div>
      {experience.map(exp => (
        <div key={exp.slug} className="exp-block">
          <div className="exp-header">
            <span className="exp-company">{exp.company}</span>
            <span className="c-dim">│</span>
            <span className="exp-role">{exp.role}</span>
            <span className="c-dim">│</span>
            <span className="exp-period">{exp.period}</span>
            <span className="exp-location">📍 {exp.location}</span>
          </div>
          {exp.projects.map(p => (
            <div key={p.name} className="project-block">
              <div className="project-name">▸ {p.name}</div>
              <div className="project-stack">
                {p.stack.map(s => <span key={s} className="stack-badge">{s}</span>)}
              </div>
              <ul className="bullet-list">
                {p.bullets.slice(0, 2).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
          <div style={{ marginTop: '4px', marginLeft: '12px' }}>
            <DM>Run: <G>cat experience/{exp.slug}</G> for full detail</DM>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceDetailOutput({ exp }) {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <span className="exp-company bold">{exp.company}</span>
        <span className="c-dim"> · </span>
        <span className="exp-role">{exp.role}</span>
        <span className="c-dim"> · </span>
        <span className="exp-period">{exp.period}</span>
        <span className="c-dim"> · </span>
        <span className="exp-location">📍 {exp.location}</span>
      </div>
      {exp.projects.map(p => (
        <div key={p.name} className="project-block" style={{ marginBottom: '16px' }}>
          <div className="project-name">◈ {p.name}</div>
          <div className="project-stack">
            {p.stack.map(s => <span key={s} className="stack-badge">{s}</span>)}
          </div>
          <ul className="bullet-list">
            {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}

function WorkProjectDetail({ project, company, role }) {
  return (
    <div>
      <div style={{ marginBottom: '6px' }}>
        <WH>{project.name}</WH>
        <DM> · {company} ({role})</DM>
      </div>
      <div className="project-stack" style={{ marginBottom: '8px' }}>
        {project.stack.map(s => <span key={s} className="stack-badge">{s}</span>)}
      </div>
      <ul className="bullet-list">
        {project.bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  );
}

function SideProjectDetail({ project }) {
  return (
    <div>
      <div style={{ marginBottom: '6px' }}><WH>{project.name}</WH> <DM>[side project]</DM></div>
      <div className="project-stack" style={{ marginBottom: '8px' }}>
        {project.stack.map(s => <span key={s} className="stack-badge">{s}</span>)}
      </div>
      <p className="c-text" style={{ fontSize: '13px', marginBottom: '8px' }}>{project.description}</p>
      <a href={project.github} target="_blank" rel="noreferrer" className="c-green" style={{ textDecoration: 'none', fontSize: '12px' }}>
        ↗ {project.github.replace('https://', '')}
      </a>
    </div>
  );
}

function ProjectsOutput() {
  // Work projects (detailed)
  const workProjects = experience.flatMap(e =>
    e.projects.map(p => ({ ...p, company: e.company, role: e.role }))
  );

  return (
    <div>
      {/* Work Projects — detailed */}
      <div className="c-yellow bold" style={{ marginBottom: '8px' }}>WORK PROJECTS</div>
      {workProjects.map(p => (
        <div key={p.name} className="exp-block">
          <div className="project-name" style={{ fontSize: '14px', marginBottom: '4px' }}>
            ◈ {p.name}
          </div>
          <div className="c-dim" style={{ fontSize: '11px', marginBottom: '5px' }}>
            {p.company} · {p.role}
          </div>
          <div className="project-stack">
            {p.stack.map(s => <span key={s} className="stack-badge">{s}</span>)}
          </div>
          <ul className="bullet-list" style={{ marginTop: '4px' }}>
            {p.bullets.slice(0, 3).map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>
      ))}

      <hr className="divider" style={{ margin: '14px 0' }} />

      {/* Side Projects — concise grid */}
      <div className="c-yellow bold" style={{ marginBottom: '8px' }}>SIDE PROJECTS</div>
      <div className="projects-grid">
        {projects.map(p => (
          <SideProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}

function SideProjectCard({ project }) {
  return (
    <div
      className="project-card tilt-card"
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x    = (e.clientX - rect.left) / rect.width  - 0.5;
        const y    = (e.clientY - rect.top)  / rect.height - 0.5;
        e.currentTarget.style.transform =
          `perspective(600px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
      }}
    >
      <div className="project-card-name">{project.name}</div>
      <div className="project-stack" style={{ marginBottom: '6px' }}>
        {project.stack.map(s => <span key={s} className="stack-badge" style={{ fontSize: '9px' }}>{s}</span>)}
      </div>
      <div className="project-card-desc">{project.description}</div>
      <a href={project.github} target="_blank" rel="noreferrer" className="project-card-link">
        ↗ GitHub
      </a>
    </div>
  );
}

function EducationOutput() {
  return (
    <div>
      <div className="c-yellow bold" style={{ marginBottom: '10px' }}>$ cat education.md</div>
      {education.map((e, i) => (
        <div key={i} className="edu-entry">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span className="edu-degree">{e.degree}</span>
            <span className="c-dim">·</span>
            <span className="edu-inst">{e.institution}</span>
            <span className="c-dim">·</span>
            <span className="edu-meta">{e.period}</span>
          </div>
          <div className="edu-meta" style={{ marginLeft: '12px' }}>📍 {e.location}</div>
          {i < education.length - 1 && <hr className="divider" style={{ margin: '8px 0' }} />}
        </div>
      ))}
    </div>
  );
}

function ContactOutput() {
  const items = [
    { icon: '✉', label: 'Email',    value: personal.email,    href: `mailto:${personal.email}` },
    { icon: '☎', label: 'Phone',    value: personal.phone,    href: `tel:${personal.phone}` },
    { icon: '⌂', label: 'Location', value: personal.location,  href: null },
    { icon: '⌥', label: 'GitHub',   value: personal.github.replace('https://', ''), href: personal.github },
    { icon: '⊛', label: 'LinkedIn', value: personal.linkedin.replace('https://', ''), href: personal.linkedin },
  ];

  return (
    <div>
      <div className="c-yellow bold" style={{ marginBottom: '10px' }}>$ cat contact.md</div>
      <div className="contact-grid">
        {items.map(item => (
          <div key={item.label} className="contact-row">
            <span className="contact-icon">{item.icon}</span>
            <span className="contact-label"><DM>{item.label}</DM></span>
            <span className="contact-value">
              {item.href
                ? <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{item.value}</a>
                : item.value
              }
            </span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '12px' }}>
        <G>Open to: </G>
        <span className="c-text">Senior AI/ML roles · FAANG · Startups · Research positions</span>
      </div>
    </div>
  );
}

function NeofetchOutput() {
  const info = [
    { key: 'OS',       val: 'ADITYAOS 1.0' },
    { key: 'Kernel',   val: 'aditya-portfolio-v1' },
    { key: 'Shell',    val: 'bash (hacker edition)' },
    { key: 'Role',     val: 'Gen AI Engineer @ Nexturn' },
    { key: 'Stack',    val: 'LangGraph · FAISS · FastAPI · React' },
    { key: 'Location', val: 'Bengaluru, Karnataka, India' },
    { key: 'Education',val: 'M.Tech Data Science · NIT Mizoram' },
    { key: 'GitHub',   val: '@Aditya-Dey012' },
    { key: 'Email',    val: personal.email },
    { key: 'Status',   val: '🟢 Open to FAANG opportunities' },
  ];

  return (
    <div className="neofetch-grid">
      <pre className="neofetch-logo">{NEOFETCH_LOGO}</pre>
      <div className="neofetch-info">
        <div className="c-green bold" style={{ fontSize: '14px', marginBottom: '4px' }}>
          aditya@portfolio
        </div>
        <div className="c-dim" style={{ marginBottom: '6px' }}>──────────────────</div>
        {info.map(r => (
          <div key={r.key} className="neofetch-row">
            <span className="neofetch-key">{r.key}</span>
            <span className="c-dim">:</span>
            <span className="neofetch-value"> {r.val}</span>
          </div>
        ))}
        <div style={{ marginTop: '10px', display: 'flex', gap: '4px' }}>
          {['#ff5f56','#ffbd2e','#27c93f','#00bfff','#bd00ff','#ff00ff'].map(c => (
            <div key={c} style={{
              width: '18px', height: '18px', background: c,
              borderRadius: '3px', display: 'inline-block',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommandNotFoundOutput({ cmd }) {
  return (
    <div>
      <div className="error-output">bash: {cmd}: command not found</div>
      <div className="c-dim" style={{ fontSize: '12px', marginTop: '4px' }}>
        Type <G>help</G> to see available commands.
      </div>
    </div>
  );
}

function SudoHireOutput() {
  return (
    <div>
      <div className="c-red">[sudo] password for recruiter:</div>
      <div className="c-green" style={{ marginTop: '4px' }}>
        ✓ Access granted — initiating hire sequence...
      </div>
      <div className="c-yellow" style={{ marginTop: '6px' }}>
        🚀 Great choice. Let's build something legendary together.
      </div>
      <div style={{ marginTop: '6px' }}>
        <DM>Reach me at: </DM>
        <a href={`mailto:${personal.email}`} className="c-cyan" style={{ textDecoration: 'none' }}>
          {personal.email}
        </a>
      </div>
    </div>
  );
}

function PingOutput() {
  return (
    <div>
      <div className="c-dim">PING aditya@bengaluru (in@real.life) 56 bytes of data.</div>
      <div className="c-green">64 bytes from aditya: icmp_seq=0 ttl=64 time=0.000 ms ← always available</div>
      <div className="c-green">64 bytes from aditya: icmp_seq=1 ttl=64 time=2.400 ms</div>
      <div className="c-green">64 bytes from aditya: icmp_seq=2 ttl=64 time=1.800 ms</div>
      <div style={{ marginTop: '6px' }}>
        <DM>--- aditya@bengaluru ping statistics ---</DM>
        <div><G>3 packets transmitted, 3 received, 0% packet loss</G></div>
        <div>Round-trip: min=0.0ms / avg=1.4ms / max=2.4ms</div>
        <div style={{ marginTop: '4px' }}>
          <DM>Contact via: </DM>
          <a href={`mailto:${personal.email}`} className="c-cyan" style={{ textDecoration: 'none' }}>{personal.email}</a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   COMMAND REGISTRY
   ═══════════════════════════════════════════ */

export function buildCommands({ onCommand, onClear, onToggleMatrix, onOpenAI }) {
  return {
    help:       ()     => <HelpOutput onCommand={onCommand} />,
    whoami:     ()     => <WhoAmIOutput />,
    about:      ()     => <AboutOutput />,
    skills:     ()     => <SkillsOutput />,
    experience: ()     => <ExperienceOutput />,
    projects:   ()     => <ProjectsOutput />,
    education:  ()     => <EducationOutput />,
    contact:    ()     => <ContactOutput />,
    neofetch:   ()     => <NeofetchOutput />,

    ls:         (args) => <LSOutput args={args} />,
    cat:        (args) => <CatOutput args={args} />,

    date:       ()     => <div className="c-green">{new Date().toString()}</div>,
    pwd:        ()     => <div className="c-cyan">/home/aditya/portfolio</div>,
    uname:      ()     => <div className="c-text">ADITYAOS aditya-portfolio 1.0.0 #1 SMP 2026</div>,

    clear: () => { onClear(); return null; },
    matrix: () => { onToggleMatrix(); return null; },
    ai:    () => { onOpenAI(); return null; },

    resume: () => {
      window.open('/Aditya_CV.pdf', '_blank');
      return <div className="success-msg">📄 Downloading resume.pdf…</div>;
    },
    github: () => {
      window.open(personal.github, '_blank');
      return <div className="c-green">↗ Opening GitHub profile…</div>;
    },
    linkedin: () => {
      window.open(personal.linkedin, '_blank');
      return <div className="c-green">↗ Opening LinkedIn profile…</div>;
    },
    email: () => {
      try { navigator.clipboard.writeText(personal.email); } catch {}
      return <div className="c-green">✓ Email copied: {personal.email}</div>;
    },

    /* Easter eggs */
    'sudo hire aditya': () => <SudoHireOutput />,
    'sudo hire me':     () => <SudoHireOutput />,
    'hire aditya':      () => <SudoHireOutput />,
    ping:               () => <PingOutput />,

    history: (_, hist) => (
      <div>
        {(hist || []).map((h, i) => (
          <div key={i}><span className="c-dim">{String(i + 1).padStart(4, ' ')}  </span><span className="c-text">{h}</span></div>
        ))}
      </div>
    ),

    '': () => null,
  };
}

export { CommandNotFoundOutput };
