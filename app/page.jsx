'use client';
import BackgroundOrbs from '@/components/ui/BackgroundOrbs';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Stats from '@/components/landing/Stats';
import HowItWorks from '@/components/landing/HowItWorks';
import Testimonials from '@/components/landing/Testimonials';
import CTABanner from '@/components/landing/CTABanner';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '60px 24px 40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'space-between', marginBottom: '48px' }}>
        <div style={{ maxWidth: '280px' }}>
          <div style={{ marginBottom: '12px' }}>
            <Logo size={36} showText={true} />
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7 }}>
            AI-powered learning community for students, professionals, and career switchers worldwide.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          {[
            { title: 'Product', links: ['Features', 'Community', 'Courses', 'Jobs'] },
            { title: 'Company', links: ['Privacy', 'Terms', 'About', 'Blog'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>{col.title}</div>
              {col.links.map(link => (
                <div key={link} style={{ marginBottom: '10px' }}>
                  <Link href="#" style={{ color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >{link}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Built with ❤️ for learners everywhere</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          {['𝕏', '📘', '💼', '📸'].map((icon, i) => (
            <button key={i} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s' }}>{icon}</button>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-void)' }}>
      <BackgroundOrbs />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Navbar */}
        <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', background: 'rgba(6,6,8,0.8)', backdropFilter: 'blur(20px)' }}>
          <div>
            <Logo size={36} showText={true} />
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            {['Features', 'Community', 'Courses', 'Jobs'].map(item => {
              const linkTarget = item === 'Features' ? '#features' : '/signup';
              return (
                <Link key={item} href={linkTarget} style={{ color: 'var(--text-secondary)', fontSize: '14px', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                >{item}</Link>
              );
            })}
            <Link href="/login" className="btn-secondary" style={{ padding: '8px 20px', borderRadius: '8px', fontSize: '14px', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
              Login
            </Link>
            <Link href="/signup" className="btn-primary" style={{ padding: '8px 20px', borderRadius: '8px', fontSize: '14px', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
              Sign Up Free
            </Link>
          </div>
        </nav>
        <div style={{ paddingTop: '64px' }}>
          <Hero />
          <div id="features">
            <Features />
          </div>
          <Stats />
          <HowItWorks />
          <Testimonials />
          <CTABanner />
          <Footer />
        </div>
      </div>
    </main>
  );
}
