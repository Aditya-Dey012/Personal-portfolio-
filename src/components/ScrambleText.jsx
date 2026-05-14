import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_[]{}=+*^?#ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';

export default function ScrambleText({ children }) {
  const text   = String(children);
  const [out,  setOut]  = useState(text);
  const ref    = useRef();
  const fired  = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || fired.current) return;

    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      fired.current = true;

      let frame = 0;
      const total = 20;
      const id = setInterval(() => {
        frame++;
        setOut(
          text.split('').map((c, i) => {
            if (c === ' ') return ' ';
            if (frame >= Math.ceil(total * ((i + 1) / text.length))) return c;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join('')
        );
        if (frame >= total) { clearInterval(id); setOut(text); }
      }, 36);
    }, { threshold: 0.5 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [text]);

  return <span ref={ref}>{out}</span>;
}
