import { useEffect, useState } from 'react';

const BOOT_LINES = [
  { text: 'ADITYAOS BIOS v2.0.26  |  NIT Mizoram → Bengaluru',  cls: 'dim',    delay: 0 },
  { text: '',                                                      cls: '',       delay: 100 },
  { text: '[    0.000] Initializing hardware components...',      cls: 'dim',    delay: 180 },
  { text: '[    0.032] Memory check: 8192 MB OK',                 cls: '',       delay: 300 },
  { text: '[    0.128] Loading ADITYAOS kernel v1.0.0...',        cls: '',       delay: 420 },
  { text: '[    0.256] CPU: Gen AI Engineer @ Nexturn, Bengaluru',cls: 'dim',    delay: 540 },
  { text: '[    0.512] Mounting /dev/portfolio...',                cls: '',       delay: 660 },
  { text: '',                                                      cls: '',       delay: 720 },
  { text: '[    0.768] Starting services...',                      cls: '',       delay: 780 },
  { text: 'ok:langgraph-agents.service',                          cls: 'ok',     delay: 900 },
  { text: 'ok:faiss-vector-store.service',                        cls: 'ok',     delay: 1000 },
  { text: 'ok:ai-assistant.service (ADBOT v1.0)',                 cls: 'ok',     delay: 1100 },
  { text: 'ok:portfolio-data.service',                            cls: 'ok',     delay: 1200 },
  { text: 'ok:matrix-rain.service',                               cls: 'ok',     delay: 1300 },
  { text: 'ok:terminal-ui.service',                               cls: 'ok',     delay: 1400 },
  { text: '',                                                      cls: '',       delay: 1460 },
  { text: '[    1.800] All systems operational.',                   cls: 'bright', delay: 1540 },
  { text: '',                                                      cls: '',       delay: 1620 },
  { text: '══════════════════════════════════════════',           cls: 'dim',    delay: 1700 },
  { text: "  Welcome to ADITYAOS — Aditya Dey's Portfolio",      cls: 'bright', delay: 1800 },
  { text: "  Type 'help' to list available commands.",            cls: '',       delay: 1900 },
  { text: '══════════════════════════════════════════',           cls: 'dim',    delay: 1980 },
];

const LAST_DELAY = BOOT_LINES[BOOT_LINES.length - 1].delay;

function BootLine({ line }) {
  if (line.cls === 'ok') {
    return (
      <div className="boot-line">
        <span style={{ color: '#27c93f', fontWeight: 700, marginRight: '6px' }}>[  OK  ]</span>
        <span style={{ color: '#c9d1d9' }}>{line.text.replace('ok:', '')}</span>
      </div>
    );
  }
  return <div className={`boot-line ${line.cls}`}>{line.text}</div>;
}

export default function BootSequence({ onComplete }) {
  const [shown,  setShown]  = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    /* show each line */
    const timers = BOOT_LINES.map((_, i) =>
      setTimeout(() => setShown(i + 1), BOOT_LINES[i].delay)
    );

    /* start fade-out */
    const fadeTimer = setTimeout(() => setFading(true), LAST_DELAY + 300);

    /* call onComplete after fade finishes (500ms CSS transition) */
    const doneTimer = setTimeout(() => onComplete(), LAST_DELAY + 850);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div className={`boot-screen${fading ? ' fading' : ''}`}>
      {BOOT_LINES.slice(0, shown).map((line, i) => (
        <BootLine key={i} line={line} />
      ))}
    </div>
  );
}
