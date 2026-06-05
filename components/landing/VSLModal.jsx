'use client';
import { useState, useEffect } from 'react';

const SLIDES = [
  {
    title: "🌌 Accessing Learniverse Mainframe",
    subtitle: "Initializing neural learning gateway... v20.50",
    visual: "matrix",
    stats: { ping: "3ms", packets: "100%", encryption: "Quantum-AES" }
  },
  {
    title: "🤖 Neural AI Tutor Active",
    subtitle: "Gemini-powered cognitive synthesis and roadmapping.",
    visual: "ai-nodes",
    stats: { model: "Gemini 1.5 Flash", latency: "110ms", accuracy: "99.8%" }
  },
  {
    title: "💬 Synaptic Community Hub",
    subtitle: "Real-time global chat network synced via Firebase.",
    visual: "chat-stream",
    stats: { active_nodes: "10,234", throughput: "4.8 GB/s", channels: "5" }
  },
  {
    title: "💎 Quantum XP & Progression",
    subtitle: "Gamified reward matrix with real-time level triggers.",
    visual: "xp-charge",
    stats: { current_badge: "Pro", threshold: "500 XP", multiplier: "1.5x" }
  },
  {
    title: "💼 Career Matrix Gateways",
    subtitle: "Instant remote connection to global technical opportunities.",
    visual: "job-pills",
    stats: { jobs_indexed: "500+", matches: "98%", status: "Active" }
  }
];

export default function VSLModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % SLIDES.length);
            return 0;
          }
          return prev + 1;
        });
      }, 50); // ~5 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const slide = SLIDES[currentSlide];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(6, 6, 8, 0.9)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '24px',
      fontFamily: 'var(--font-body)',
    }}>
      {/* Laser scanline overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(rgba(124, 58, 237, 0) 95%, rgba(124, 58, 237, 0.15) 98%, rgba(124, 58, 237, 0) 100%)',
        backgroundSize: '100% 8px',
        pointerEvents: 'none',
        zIndex: 1002
      }} />

      {/* Main player box */}
      <div style={{
        width: '100%',
        maxWidth: '960px',
        background: 'var(--bg-surface)',
        border: '2px solid var(--border-bright)',
        borderRadius: '24px',
        boxShadow: '0 0 80px rgba(124,58,237,0.3)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        aspectRatio: '16/9'
      }}>
        {/* Hologram glitch pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(124,58,237,0.05) 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          pointerEvents: 'none'
        }} />

        {/* Top Control Info */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(26,26,46,0.5)',
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', animation: 'pulse-ring 1.5s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', color: 'var(--accent-cyan)' }}>LIVE VSL FEED // YEAR 2050</span>
          </div>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >✕</button>
        </div>

        {/* Display screen */}
        <div style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          textAlign: 'center',
          overflow: 'hidden'
        }}>
          {/* Animated visual overlays based on current slide */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }}>
            {/* Rotating grids */}
            <div style={{
              width: '200%',
              height: '200%',
              border: '1px solid var(--accent-violet)',
              transform: 'rotateX(60deg) translateY(-50%)',
              transformStyle: 'preserve-3d',
              animation: 'sparkle-spin 20s linear infinite',
              position: 'absolute',
              top: 0,
              left: '-50%'
            }} />
          </div>

          {/* Interactive slide simulation */}
          <div style={{ zIndex: 10, maxWidth: '640px' }}>
            {/* Visualizer display area */}
            <div style={{
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              position: 'relative'
            }}>
              {slide.visual === 'matrix' && (
                <div style={{ display: 'flex', gap: '4px', height: '80px', alignItems: 'flex-end' }}>
                  {[...Array(12)].map((_, i) => (
                    <div key={i} style={{
                      width: '6px',
                      background: 'linear-gradient(to top, var(--accent-violet), var(--accent-cyan))',
                      borderRadius: '3px',
                      animation: `sound-wave 0.5s ease-in-out infinite ${i * 0.05}s`
                    }} />
                  ))}
                </div>
              )}

              {slide.visual === 'ai-nodes' && (
                <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                  <div style={{ position: 'absolute', inset: 0, border: '2px dashed var(--accent-cyan)', borderRadius: '50%', animation: 'sparkle-spin 6s linear infinite' }} />
                  <div style={{ position: 'absolute', inset: '15px', border: '1px solid var(--accent-violet)', borderRadius: '50%', animation: 'sparkle-spin 3s linear infinite reverse' }} />
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '32px' }}>🤖</div>
                </div>
              )}

              {slide.visual === 'chat-stream' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '280px', transform: 'scale(0.95)' }}>
                  <div style={{ alignSelf: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '6px 12px', fontSize: '11px', color: 'var(--text-primary)', animation: 'slide-up-fade 0.3s ease' }}>
                    📡 Establishing synapse connection...
                  </div>
                  <div style={{ alignSelf: 'flex-end', background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', borderRadius: '8px', padding: '6px 12px', fontSize: '11px', color: 'white', animation: 'slide-up-fade 0.3s ease 0.2s' }}>
                    🚀 Quantum stream active!
                  </div>
                </div>
              )}

              {slide.visual === 'xp-charge' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '220px' }}>
                  <span style={{ fontSize: '32px', filter: 'drop-shadow(0 0 15px var(--accent-pink))', animation: 'glow-pulse 2s infinite' }}>💎</span>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-pink), var(--accent-violet))', borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-pink)' }}>SYNAPSE MULTIPLIER: {Math.round(progress * 1.5)}%</span>
                </div>
              )}

              {slide.visual === 'job-pills' && (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '320px' }}>
                  {["UI/UX Designer", "ML Engineer", "Automation Expert"].map((t, idx) => (
                    <span key={t} style={{
                      padding: '6px 14px',
                      borderRadius: '100px',
                      border: '1px solid var(--border)',
                      background: 'rgba(124, 58, 237, 0.1)',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-primary)',
                      animation: `scale-in 0.4s ease ${idx * 0.1}s forwards`
                    }}>{t}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Slide Text */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '26px',
              marginBottom: '10px',
              letterSpacing: '-0.01em',
              background: 'linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'all 0.3s ease'
            }}>{slide.title}</h2>
            <p style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '32px'
            }}>{slide.subtitle}</p>
          </div>

          {/* Real-time stats display (Right Panel overlay) */}
          <div style={{
            position: 'absolute',
            right: '24px',
            bottom: '64px',
            background: 'rgba(26,26,46,0.7)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '12px',
            width: '180px',
            textAlign: 'left',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            pointerEvents: 'none'
          }}>
            <div style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)', paddingBottom: '4px', marginBottom: '4px', fontWeight: 600 }}>SYSTEM DIAGNOSTICS:</div>
            {Object.entries(slide.stats).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{k.toUpperCase()}:</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border)',
          background: 'rgba(26,26,46,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          zIndex: 10
        }}>
          {/* Play / Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '6px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Timeline Indicators */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>0{currentSlide + 1}</span>
            <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent-violet)', borderRadius: '2px' }} />
            </div>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>0{SLIDES.length}</span>
          </div>

          {/* Channel selector nodes */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentSlide(idx); setProgress(0); }}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentSlide === idx ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'background 0.3s'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
