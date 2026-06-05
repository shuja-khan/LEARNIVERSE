'use client';

const testimonials = [
  { name: 'Aisha Johnson', role: 'UX Designer at Google', quote: 'Learniverse completely transformed how I approach learning. The AI tutor gave me a roadmap that got me hired in 3 months!', initials: 'AJ', gradient: 'linear-gradient(135deg, #7c3aed, #ec4899)', stars: 5 },
  { name: 'Marcus Chen', role: 'Software Engineer', quote: 'The community here is incredibly supportive. I went from beginner to landing my first dev job — all thanks to Learniverse.', initials: 'MC', gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)', stars: 5 },
  { name: 'Priya Sharma', role: 'Data Scientist', quote: 'The XP system keeps me motivated every single day. I\'ve earned the Pro badge and the community always cheers me on!', initials: 'PS', gradient: 'linear-gradient(135deg, #06b6d4, #22c55e)', stars: 5 },
  { name: 'James Williams', role: 'Marketing Manager', quote: 'Found my current job through the Jobs Board. The AI helped me prepare for interviews and write a killer cover letter.', initials: 'JW', gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)', stars: 5 },
  { name: 'Sofia Rodriguez', role: 'Graphic Designer', quote: 'Voice mode is a game changer. I learn while commuting! The personalized course recommendations are always spot-on.', initials: 'SR', gradient: 'linear-gradient(135deg, #ec4899, #7c3aed)', stars: 5 },
  { name: 'Ahmed Hassan', role: 'Business Analyst', quote: 'Premium content unlocked my career switch. The 1-on-1 mentorship sessions were worth every XP point earned.', initials: 'AH', gradient: 'linear-gradient(135deg, #7c3aed, #3b82f6)', stars: 5 },
];

function Card({ t }) {
  return (
    <div style={{ minWidth: '360px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '28px', marginRight: '24px' }}>
      <div style={{ color: '#f59e0b', fontSize: '16px', marginBottom: '16px' }}>{'★'.repeat(t.stars)}</div>
      <p style={{ color: 'var(--text-primary)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>"{t.quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '15px', color: 'white', flexShrink: 0 }}>{t.initials}</div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)' }}>{t.name}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{t.role}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const all = [...testimonials, ...testimonials];
  return (
    <section style={{ padding: '120px 0', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 24px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 52px)', marginBottom: '16px' }}>
          Loved by <span className="gradient-text">Learners Everywhere</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>Don&apos;t take our word for it — hear from our community.</p>
      </div>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(90deg, var(--bg-void), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px', background: 'linear-gradient(270deg, var(--bg-void), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div className="scroll-container" style={{ padding: '8px 0' }}>
          {all.map((t, i) => <Card key={i} t={t} />)}
        </div>
      </div>
    </section>
  );
}
