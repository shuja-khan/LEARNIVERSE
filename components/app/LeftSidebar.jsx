'use client';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import XPBar from '@/components/ui/XPBar';
import Logo from '@/components/ui/Logo';

const BADGE_CONFIG = {
  Beginner: { icon: '⭐', color: '#8b8aaa', glow: 'rgba(139,138,170,0.4)' },
  Explorer: { icon: '🌟', color: '#3b82f6', glow: 'rgba(59,130,246,0.4)' },
  Pro: { icon: '💎', color: '#7c3aed', glow: 'rgba(124,58,237,0.5)', pulse: true },
  Master: { icon: '👑', color: '#f59e0b', glow: 'rgba(245,158,11,0.5)', spin: true },
};

export default function LeftSidebar({ user, userProfile, xp, xpPercent, badge, nextBadgeName, xpToNextBadge }) {
  const router = useRouter();
  const badgeCfg = BADGE_CONFIG[badge] || BADGE_CONFIG.Beginner;

  async function handleLogout() {
    await signOut(auth);
    router.push('/login');
  }

  const displayName = userProfile?.name || user?.displayName || 'Learner';
  const username = displayName.toLowerCase().replace(/\s+/g, '');
  const initial = displayName[0]?.toUpperCase() || 'L';

  const stats = [
    { label: 'Messages', value: userProfile?.messagesSent || 0 },
    { label: 'Courses', value: userProfile?.coursesEnrolled || 0 },
    { label: 'Days Active', value: userProfile?.daysActive || 1 },
  ];

  return (
    <aside style={{ width: '260px', flexShrink: 0, background: 'var(--bg-elevated)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Violet left glow */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, transparent, var(--accent-violet), transparent)', opacity: 0.6, pointerEvents: 'none' }} />

      <div style={{ padding: '24px 20px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Brand Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
          <Logo size={34} showText={true} />
        </div>

        {/* User avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', paddingTop: '8px' }}>
          <div className="rotating-border" style={{ width: '72px', height: '72px', borderRadius: '50%', padding: '2px' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #3b82f6, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', color: 'white' }}>
              {initial}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '2px' }}>{displayName}</div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>@{username}</div>
            <span style={{ display: 'inline-block', padding: '3px 12px', borderRadius: '100px', background: 'rgba(124,58,237,0.2)', border: '1px solid var(--border-bright)', fontSize: '11px', color: 'var(--accent-violet)', fontWeight: 600 }}>
              {userProfile?.role || 'Learner'}
            </span>
          </div>
        </div>

        {/* XP section */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '16px' }}>
          {/* Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              fontSize: '24px',
              filter: `drop-shadow(0 0 8px ${badgeCfg.glow})`,
              animation: badgeCfg.pulse ? 'glow-pulse 2s ease-in-out infinite' : badgeCfg.spin ? 'sparkle-spin 4s linear infinite' : 'none',
            }}>
              {badgeCfg.icon}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: badgeCfg.color }}>{badge}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Current rank</div>
            </div>
            {badgeCfg.pulse && (
              <div style={{ marginLeft: 'auto', width: '10px', height: '10px', borderRadius: '50%', background: badgeCfg.color, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: badgeCfg.color, animation: 'pulse-ring 1.5s ease-out infinite' }} />
              </div>
            )}
          </div>
          <XPBar xp={xp} percent={xpPercent} nextBadge={nextBadgeName} xpToNext={xpToNextBadge} />
        </div>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '10px 8px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', color: 'var(--accent-violet)' }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '8px', width: '36px', height: '36px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-violet)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          title="Settings"
        >⚙️</button>
        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '13px', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}
