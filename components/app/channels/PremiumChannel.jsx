'use client';
import { useState, useEffect } from 'react';

const PREMIUM_CONTENT = [
  { icon: '🎯', title: '1-on-1 Mentorship Sessions', desc: 'Book a 30-min call with an expert in your field. Get personalized career guidance.', color: '#f59e0b' },
  { icon: '🚀', title: 'Advanced React Patterns', desc: 'Master server components, streaming, and cutting-edge React 18+ patterns.', color: '#7c3aed' },
  { icon: '💡', title: 'Startup Pitch Masterclass', desc: 'Craft a pitch that raises funding. Real examples from Y Combinator founders.', color: '#3b82f6' },
  { icon: '🔥', title: 'Figma to Code with AI', desc: 'Convert your Figma designs to production-ready code using AI workflows.', color: '#06b6d4' },
  { icon: '📈', title: 'Growth Hacking Secrets', desc: 'Proven strategies used by companies that scaled from 0 to 1M users fast.', color: '#ec4899' },
  { icon: '🤝', title: 'Exclusive Job Referrals', desc: 'Get referred directly by community members at top tech companies.', color: '#22c55e' },
];

function ProgressRing({ percent, size = 120, stroke = 10 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#xpGrad)" strokeWidth={stroke} strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
      <defs>
        <linearGradient id="xpGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function PremiumChannel({ xp = 0, username = 'Learner' }) {
  const [unlocked, setUnlocked] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const XP_REQUIRED = 500;
  const isUnlocked = xp >= XP_REQUIRED;
  const percent = Math.min(100, (xp / XP_REQUIRED) * 100);

  useEffect(() => {
    if (isUnlocked && !unlocked) {
      setShowBurst(true);
      setTimeout(() => { setUnlocked(true); setShowBurst(false); }, 2000);
    } else if (isUnlocked) {
      setUnlocked(true);
    }
  }, [isUnlocked]);

  if (!isUnlocked || showBurst) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-void)', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle lock pattern bg */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(245,158,11,0.03) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />

        {/* Burst animation */}
        {showBurst && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'level-up-flash 2s ease forwards', zIndex: 10, background: 'rgba(245,158,11,0.1)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '48px', color: '#f59e0b', textShadow: '0 0 40px rgba(245,158,11,0.8)', animation: 'scale-in 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}>🔓 UNLOCKED!</div>
          </div>
        )}

        {/* Lock icon */}
        <div style={{ fontSize: '64px', marginBottom: '24px', animation: 'gold-pulse 3s ease-in-out infinite', filter: 'drop-shadow(0 0 20px rgba(245,158,11,0.5))' }}>🔒</div>

        {/* Progress ring */}
        <div style={{ position: 'relative', marginBottom: '24px' }}>
          <ProgressRing percent={percent} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: '#f59e0b' }}>{xp}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>XP</div>
          </div>
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '26px', marginBottom: '12px' }}>Premium Channel Locked</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px', maxWidth: '360px', lineHeight: 1.6 }}>
          You need <span style={{ color: '#f59e0b', fontWeight: 700 }}>{XP_REQUIRED - xp} more XP</span> to unlock this exclusive channel.
        </p>

        {/* How to earn XP */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px 24px', maxWidth: '380px', width: '100%', textAlign: 'left' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '14px', marginBottom: '16px', color: 'var(--text-primary)' }}>How to earn XP faster:</div>
          {[
            { icon: '💬', text: 'Send messages in AI Tutor', xp: '+10 XP each' },
            { icon: '🗨️', text: 'Chat in Community', xp: '+10 XP each' },
            { icon: '📅', text: 'Log in daily', xp: '+50 XP bonus' },
          ].map(item => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '14px' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{item.text}</span>
              <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '12px' }}>{item.xp}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-void)' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(245,158,11,0.2)', background: 'linear-gradient(135deg, rgba(245,158,11,0.05), transparent)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '22px', filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.6))' }}>⭐</span>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>Premium Channel</div>
          <div style={{ fontSize: '12px', color: '#f59e0b' }}>Exclusive content for top learners</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px', animation: 'sparkle-spin 4s linear infinite', display: 'inline-block' }}>👑</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '24px', marginBottom: '8px' }}>
            Welcome to Premium, <span style={{ color: '#f59e0b' }}>{username}</span> 👑
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>You've unlocked exclusive content and mentorship opportunities.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {PREMIUM_CONTENT.map(item => (
            <div key={item.title} className="card-hover" style={{ background: 'var(--bg-card)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '32px', marginBottom: '14px', filter: `drop-shadow(0 0 8px ${item.color}66)` }}>{item.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--text-primary)' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>{item.desc}</p>
              <button style={{ width: '100%', padding: '9px', borderRadius: '10px', border: `1px solid ${item.color}44`, background: `${item.color}15`, color: item.color, fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = `${item.color}28`; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${item.color}15`; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                Access →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
