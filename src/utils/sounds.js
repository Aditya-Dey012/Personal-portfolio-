let _ctx = null;
let _enabled = JSON.parse(localStorage.getItem('sound_enabled') ?? 'true');

function getCtx() {
  if (!_ctx) _ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function tone(freq, dur, type = 'sine', vol = 0.1) {
  if (!_enabled) return;
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const g   = ac.createGain();
    osc.connect(g);
    g.connect(ac.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ac.currentTime);
    g.gain.setValueAtTime(vol, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
    osc.start();
    osc.stop(ac.currentTime + dur);
  } catch {}
}

/* Short mechanical tick — nav buttons, generic clicks */
export const playClick = () => tone(680, 0.055, 'square', 0.07);

/* Two-tone ping — AI chat open */
export const playOpen = () => {
  tone(520, 0.09, 'sine', 0.09);
  setTimeout(() => tone(780, 0.14, 'sine', 0.06), 80);
};

/* Crisp tap — suggestion chips */
export const playChip = () => tone(900, 0.04, 'square', 0.06);

export const isSoundOn   = () => _enabled;
export const toggleSound = () => {
  _enabled = !_enabled;
  localStorage.setItem('sound_enabled', JSON.stringify(_enabled));
  return _enabled;
};
