export default function GlitchText({ children, className = '' }) {
  return (
    <span
      className={`glitch ${className}`}
      data-text={typeof children === 'string' ? children : ''}
    >
      {children}
    </span>
  );
}
