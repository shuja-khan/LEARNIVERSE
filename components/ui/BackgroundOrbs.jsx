'use client';

export default function BackgroundOrbs() {
  return (
    <>
      {/* Orb 1: top-left, violet */}
      <div
        style={{
          position: 'fixed',
          top: '-150px',
          left: '-150px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'float-orb 8s ease-in-out infinite',
        }}
      />
      {/* Orb 2: bottom-right, blue */}
      <div
        style={{
          position: 'fixed',
          bottom: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'float-orb 10s ease-in-out infinite reverse',
        }}
      />
      {/* Orb 3: center, cyan */}
      <div
        style={{
          position: 'fixed',
          top: '40%',
          left: '45%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'float-orb 12s ease-in-out infinite 3s',
        }}
      />
      {/* Grid overlay */}
      <div
        className="bg-grid"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
}
