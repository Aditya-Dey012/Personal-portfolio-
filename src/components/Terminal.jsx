import { useState, useEffect, useRef, useCallback } from 'react';
import AIChat from './AIChat.jsx';
import { buildCommands, CommandNotFoundOutput } from '../utils/commands.jsx';

const PROMPT = 'aditya@portfolio:~$';
const QUICK_CMDS = ['help', 'whoami', 'experience', 'projects', 'skills', 'ai', 'neofetch', 'matrix'];

export default function Terminal({ booted, theme, onToggleTheme, onToggleMatrix }) {
  const [history,    setHistory]    = useState([]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx,    setHistIdx]    = useState(-1);
  const [input,      setInput]      = useState('');
  const [showAI,     setShowAI]     = useState(false);

  const bodyRef        = useRef(null);
  const inputRef       = useRef(null);
  const autoRanHelp    = useRef(false);

  /* scroll to bottom on every new output line */
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  /* addOutput — stable reference */
  const addOutput = useCallback((cmd, output) => {
    setHistory(prev => [...prev, { cmd, output }]);
  }, []);

  /* executeCommand is declared here so boot useEffect can call it */
  const executeCommand = useCallback((rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    const parts   = trimmed.split(/\s+/);
    const cmdKey  = parts[0].toLowerCase();
    const args    = parts.slice(1);
    const fullKey = trimmed.toLowerCase();

    /* update history unless it's the auto-boot call */
    if (rawCmd !== '__boot__') {
      setCmdHistory(prev => [trimmed, ...prev.filter(c => c !== trimmed)].slice(0, 100));
      setHistIdx(-1);
    }

    const commands = buildCommands({
      onCommand:      (c) => executeCommand(c),
      onClear:        () => setHistory([]),
      onToggleMatrix: onToggleMatrix,
      onOpenAI:       () => {
        addOutput(trimmed, (
          <div>
            <div className="c-green">Launching ADBOT v1.0…</div>
            <div className="c-dim" style={{ fontSize: '11px', marginTop: '3px' }}>
              GPT-4o-mini · RAG knowledge base loaded · type &#39;exit&#39; to close
            </div>
          </div>
        ));
        setTimeout(() => setShowAI(true), 500);
        return;
      },
    });

    /* sudo / hire easter egg */
    if (fullKey.startsWith('sudo hire') || fullKey === 'hire aditya') {
      addOutput(trimmed, commands['sudo hire aditya']?.());
      return;
    }

    /* ai command — handled above in buildCommands.onOpenAI, but intercept here too */
    if (cmdKey === 'ai') {
      commands.ai?.();
      return;
    }

    /* history command needs the current cmdHistory list */
    if (cmdKey === 'history') {
      addOutput(trimmed, commands.history?.(args, cmdHistory));
      return;
    }

    /* ping */
    if (cmdKey === 'ping') {
      addOutput(trimmed, commands.ping?.());
      return;
    }

    const handler = commands[cmdKey];
    if (!handler) {
      addOutput(trimmed, <CommandNotFoundOutput cmd={cmdKey} />);
      return;
    }

    const output = handler(args);
    if (output !== null && output !== undefined) {
      addOutput(trimmed, output);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addOutput, cmdHistory, onToggleMatrix]);

  /* run help once when boot completes */
  useEffect(() => {
    if (booted && !autoRanHelp.current) {
      autoRanHelp.current = true;
      executeCommand('help');
    }
  }, [booted, executeCommand]);

  /* keyboard handler */
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCmdHistory(prev => {
        if (histIdx < prev.length - 1) {
          const ni = histIdx + 1;
          setHistIdx(ni);
          setInput(prev[ni] ?? '');
        }
        return prev;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) {
        const ni = histIdx - 1;
        setHistIdx(ni);
        setCmdHistory(prev => { setInput(prev[ni] ?? ''); return prev; });
      } else {
        setHistIdx(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const ALL = ['help','whoami','about','skills','experience','projects','education',
        'contact','ls','cat','neofetch','resume','github','linkedin','email',
        'ai','matrix','clear','history','date','pwd','ping','sudo','uname'];
      const matches = ALL.filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        addOutput('', <div className="c-dim" style={{ fontSize: '12px' }}>{matches.join('  ')}</div>);
      }
    } else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      setHistory([]);
    } else if (e.ctrlKey && e.key === 'c') {
      e.preventDefault();
      if (input) addOutput(input + '^C', null);
      setInput('');
    }
  }, [input, histIdx, executeCommand, addOutput]);

  const focusInput = useCallback((e) => {
    /* don't steal focus from links, buttons, etc. */
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <div
        className="terminal-wrapper"
        style={{ visibility: booted ? 'visible' : 'hidden' }}
        onClick={focusInput}
      >
        {/* ── Title Bar ── */}
        <div className="terminal-titlebar">
          <div className="traffic-lights">
            <div className="traffic-dot red"    title="Close" />
            <div className="traffic-dot yellow" title="Minimize" />
            <div className="traffic-dot green"  title="Maximize" />
          </div>
          <div className="titlebar-title">
            {PROMPT} — aditya-portfolio v1.0
          </div>
          <div className="titlebar-actions">
            <button
              className="theme-toggle"
              onClick={e => { e.stopPropagation(); onToggleTheme(); }}
              title={theme === 'dark' ? 'Switch to macOS light mode' : 'Switch to hacker dark mode'}
            >
              {theme === 'dark' ? '☀ light' : '◑ dark'}
            </button>
          </div>
        </div>

        {/* ── Output Area ── */}
        <div className="terminal-body" ref={bodyRef}>
          {history.map((item, i) => (
            <div key={i} className="output-block">
              {item.cmd && (
                <div className="cmd-echo">
                  <span className="prompt-string">{PROMPT}</span>
                  <span className="cmd-text">&nbsp;{item.cmd}</span>
                </div>
              )}
              {item.output && <div>{item.output}</div>}
            </div>
          ))}
          <div style={{ height: '6px' }} />
        </div>

        {/* ── Input ── */}
        <div className="terminal-input-area">
          <span className="prompt-string">{PROMPT}&nbsp;</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus={booted}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
          <span className="blinking-cursor" />
        </div>

        {/* ── Mobile Quick Commands ── */}
        <div className="mobile-cmds">
          {QUICK_CMDS.map(cmd => (
            <button
              key={cmd}
              className="mobile-cmd-btn"
              onPointerDown={e => {
                e.preventDefault();
                executeCommand(cmd);
                inputRef.current?.focus();
              }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      {showAI && <AIChat onClose={() => setShowAI(false)} />}
    </>
  );
}
