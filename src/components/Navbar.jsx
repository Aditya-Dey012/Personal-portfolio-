import { personal } from '../data/portfolio.js';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const NAV_ITEMS = [
  { label: 'About',      id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Skills',     id: 'skills' },
];

export default function Navbar({ onOpenAI, theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      {/* Left: Name + title */}
      <div className="navbar-left" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
        <div className="navbar-name">Aditya <span>Dey</span></div>
        <div className="navbar-title">Gen AI Engineer · Bengaluru, IN</div>
      </div>

      {/* Right: Nav + actions */}
      <div className="navbar-right">
        {NAV_ITEMS.map(item => (
          <button key={item.id} className="nav-btn" onClick={() => scrollTo(item.id)}>
            {item.label}
          </button>
        ))}

        <button
          className="nav-btn nav-btn-ai"
          onClick={onOpenAI}
        >
          ◈ AI Chat
        </button>

        {/* Theme toggle */}
        <button className="theme-btn" onClick={onToggleTheme} title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
          {theme === 'dark' ? '☀' : '☾'}
        </button>

        <div className="nav-social">
          <a href={personal.github}            target="_blank" rel="noreferrer" title="GitHub">GH</a>
          <a href={personal.linkedin}          target="_blank" rel="noreferrer" title="LinkedIn">LI</a>
          <a href={`mailto:${personal.email}`} title="Email">✉</a>
        </div>
      </div>
    </nav>
  );
}
