'use client';
import Link from 'next/link';

export default function CTABanner() {
  return (
    <section style={{ padding: '0 24px 120px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1))',
        border: '1px solid var(--border-bright)',
        borderRadius: '28px',
        padding: '80px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        animation: 'glow-pulse 4s ease-in-out infinite',
      }}>
        {/* Glow bg */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', marginBottom: '16px' }}>
            Ready to Start Your <span className="gradient-text">Journey?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Join thousands of learners who are already leveling up their skills and careers.
          </p>
          <Link href="/signup">
            <button className="btn-primary" style={{ padding: '18px 48px', borderRadius: '14px', fontSize: '17px', fontWeight: 700 }}>
              Get Started Free — It Takes 30 Seconds
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
