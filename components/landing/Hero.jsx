'use client';
import Link from 'next/link';
import ParticleField from '@/components/ui/ParticleField';
import VSLModal from '@/components/landing/VSLModal';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [isVslOpen, setIsVslOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '0 24px',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      <ParticleField />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '900px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}>
        {/* Beta pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px',
          borderRadius: '100px',
          border: '1px solid var(--border-bright)',
          background: 'rgba(124,58,237,0.1)',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite',
            borderRadius: '100px',
          }} />
          <span style={{ fontSize: '13px', color: 'var(--accent-violet)', position: 'relative' }}>
            ✦ Now in Public Beta
          </span>
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(44px, 7vw, 82px)',
          lineHeight: 1.1,
          marginBottom: '24px',
          color: 'var(--text-primary)',
        }}>
          Your Learning Universe{' '}
          <span className="gradient-text">Starts Here</span>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: 'var(--text-secondary)',
          maxWidth: '620px',
          margin: '0 auto 40px',
          lineHeight: 1.7,
        }}>
          AI-powered learning. Real community. Zero limits.
          Join 10,000+ students and professionals already leveling up.
        </p>

        {/* CTA buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '32px',
        }}>
          <Link href="/signup">
            <button
              id="hero-cta-primary"
              className="btn-primary"
              style={{
                padding: '16px 36px',
                borderRadius: '12px',
                fontSize: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              Join Learniverse Free →
            </button>
          </Link>
          <button
            id="hero-cta-demo"
            className="btn-secondary"
            onClick={() => setIsVslOpen(true)}
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
            }}
          >
            Watch Demo ▶
          </button>
        </div>

        {/* Trust badges */}
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            { icon: '🔒', label: 'Free Forever' },
            { icon: '⚡', label: 'AI-Powered' },
            { icon: '🌍', label: 'Global Community' },
          ].map((badge) => (
            <div key={badge.label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '14px',
              color: 'var(--text-secondary)',
            }}>
              <span>{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce-chevron 2s ease-in-out infinite',
        color: 'var(--text-secondary)',
        fontSize: '24px',
        zIndex: 2,
      }}>
        ⌄
      </div>
      {/* VSL Modal */}
      <VSLModal isOpen={isVslOpen} onClose={() => setIsVslOpen(false)} />
    </section>
  );
}
