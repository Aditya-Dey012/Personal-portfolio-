import { useState, useCallback, useEffect, useRef } from 'react';
import { SceneProvider } from './context/SceneContext.jsx';
import Navbar        from './components/Navbar.jsx';
import HeroSection   from './components/HeroSection.jsx';
import AIChat        from './components/AIChat.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import { AboutSection, ExperienceSection, ProjectsSection, SkillsSection } from './components/Sections.jsx';

export default function App() {
  const [loading,  setLoading]  = useState(true);
  const [showAI,   setShowAI]   = useState(false);
  const [aiQuery,  setAiQuery]  = useState(null);
  const [aiMode,   setAiMode]   = useState('knowledge');
  const [theme,    setTheme]    = useState('dark');

  const handleLoadDone = useCallback(() => setLoading(false), []);

  /* Scroll progress bar */
  const [scrollPct, setScrollPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el  = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollPct(Math.min(100, pct));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Cursor glow — direct DOM manipulation to avoid 60fps re-renders */
  const cursorRef = useRef();
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top  = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const openAIWithTech = (tech) => {
    setAiQuery(`What is ${tech}?`);
    setAiMode('tech');
    setShowAI(true);
  };

  const openAI = () => {
    setAiQuery(null);
    setAiMode('knowledge');
    setShowAI(true);
  };

  const closeAI = () => {
    setShowAI(false);
    setAiQuery(null);
    setAiMode('knowledge');
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadDone} />}

      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Cursor glow */}
      <div className="cursor-glow" ref={cursorRef} />

      {/* Film grain */}
      <div className="film-grain" aria-hidden="true" />

      <SceneProvider>
        <Navbar onOpenAI={openAI} theme={theme} onToggleTheme={toggleTheme} />

        <HeroSection onTechClick={openAIWithTech} />

        <main className="portfolio-content">
          <AboutSection />
          <ExperienceSection onTechClick={openAIWithTech} />
          <ProjectsSection   onTechClick={openAIWithTech} />
          <SkillsSection     onTechClick={openAIWithTech} />
          <footer className="portfolio-footer">
            <div>Aditya Dey · Gen AI Engineer · aditya2002dey@gmail.com</div>
            <div style={{ marginTop: '6px', opacity: 0.6 }}>
              Built with React · {new Date().getFullYear()}
            </div>
          </footer>
        </main>

        {/* Mobile bottom nav */}
        <div className="mobile-controls">
          {['about', 'experience', 'projects', 'skills'].map(id => (
            <button
              key={id}
              className="mob-btn"
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </button>
          ))}
          <button
            className="mob-btn"
            style={{ borderColor: 'var(--orange)', color: 'var(--orange)' }}
            onClick={openAI}
          >
            ◈ AI
          </button>
        </div>

        <button className="ai-fab" onClick={openAI} title="Ask ADBOT">◈</button>

        {showAI && (
          <AIChat
            onClose={closeAI}
            initialQuery={aiQuery}
            initialMode={aiMode}
          />
        )}
      </SceneProvider>
    </>
  );
}
