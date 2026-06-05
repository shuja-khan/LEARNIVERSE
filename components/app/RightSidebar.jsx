'use client';

const channels = [
  { id: 'ai-tutor', icon: '🤖', label: 'AI Tutor', default: true },
  { id: 'community', icon: '💬', label: 'Community Chat' },
  { id: 'courses', icon: '📚', label: 'Courses & Tools' },
  { id: 'jobs', icon: '💼', label: 'Jobs Board' },
  { id: 'premium', icon: '⭐', label: 'Premium', locked: true },
];

const onlineMembers = [
  { initials: 'AJ', gradient: 'linear-gradient(135deg,#7c3aed,#ec4899)' },
  { initials: 'MC', gradient: 'linear-gradient(135deg,#3b82f6,#06b6d4)' },
  { initials: 'PS', gradient: 'linear-gradient(135deg,#06b6d4,#22c55e)' },
  { initials: 'JW', gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
  { initials: 'SR', gradient: 'linear-gradient(135deg,#ec4899,#7c3aed)' },
];

export default function RightSidebar({ activeChannel, onChannelChange, xp = 0 }) {
  return (
    <aside style={{ width: '240px', flexShrink: 0, background: 'var(--bg-surface)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {/* Channels header */}
      <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'var(--font-body)' }}>
          Channels
        </div>
      </div>

      {/* Channel list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {channels.map(ch => {
          const isLocked = ch.locked && xp < 500;
          const isActive = activeChannel === ch.id;
          return (
            <button key={ch.id} onClick={() => onChannelChange(ch.id)} className={`channel-item ${isActive ? 'active' : ''}`} style={{ width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '14px', fontFamily: 'var(--font-body)' }}>
              <span style={{ fontSize: '18px' }}>{ch.icon}</span>
              <span style={{ flex: 1, fontWeight: isActive ? 600 : 400 }}>{ch.label}</span>
              {isLocked && <span style={{ fontSize: '12px' }}>🔒</span>}
              {ch.id === 'premium' && !isLocked && (
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '100px', background: 'rgba(245,158,11,0.2)', color: '#f59e0b', fontWeight: 700 }}>UNLOCKED</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Online members */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border)' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px', fontFamily: 'var(--font-body)' }}>
          Online Now
        </div>
        <div style={{ display: 'flex', gap: '-8px', marginBottom: '10px' }}>
          {onlineMembers.map((m, i) => (
            <div key={i} style={{ width: '32px', height: '32px', borderRadius: '50%', background: m.gradient, border: '2px solid var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: 'white', marginLeft: i > 0 ? '-8px' : 0, position: 'relative', zIndex: onlineMembers.length - i }}>
              {m.initials}
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', border: '1.5px solid var(--bg-surface)' }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
          47 members online
        </div>
      </div>
    </aside>
  );
}
