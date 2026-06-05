'use client';

export default function Logo({ size = 40, animated = true, showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div 
        className={animated ? 'logo-container' : ''} 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px var(--glow-violet)',
          flexShrink: 0
        }}
      >
        <img 
          src="/logo.png" 
          alt="Learniverse Logo" 
          style={{ 
            width: '90%', 
            height: '90%', 
            objectFit: 'contain',
            borderRadius: '50%'
          }} 
        />
      </div>
      {showText && (
        <span 
          className="gradient-text" 
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontWeight: 800, 
            fontSize: `${size * 0.55}px`,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Learniverse
        </span>
      )}
    </div>
  );
}
