import { useEffect, useRef } from 'react';

const CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|';

export default function MatrixRain({ visible, theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const fontSize = 14;
    let cols, drops;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols  = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -50);
    }

    resize();
    window.addEventListener('resize', resize);

    const greenColor  = theme === 'light' ? '#1a7f37' : '#00ff41';
    const brightColor = theme === 'light' ? '#2da44e' : '#ccffcc';
    const fadeBg      = theme === 'light'
      ? 'rgba(232,232,232,0.06)'
      : 'rgba(13,17,23,0.06)';

    let frame;
    function draw() {
      ctx.fillStyle = fadeBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y    = drops[i] * fontSize;

        // Head char is bright
        ctx.fillStyle = y < fontSize * 2 ? brightColor : greenColor;
        ctx.globalAlpha = y < 0 ? 0 : Math.min(1, (y / (canvas.height * 0.4)));
        ctx.fillText(char, i * fontSize, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5;
      }
      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    }

    if (visible) {
      draw();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
    };
  }, [visible, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`matrix-canvas${visible ? '' : ' hidden'}`}
    />
  );
}
