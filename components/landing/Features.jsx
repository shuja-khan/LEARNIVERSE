'use client';
import { useEffect, useRef } from 'react';

const features = [
  {
    icon: '🤖',
    title: 'AI Learning Assistant',
    desc: 'Get personalized roadmaps, course recs, and answers. Powered by Gemini AI.',
    gradient: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
  },
  {
    icon: '🎙️',
    title: 'Voice Mode',
    desc: 'Talk to your AI tutor like Siri. Hands-free learning.',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    icon: '🏆',
    title: 'Gamified XP System',
    desc: 'Earn XP, unlock badges, access premium content.',
    gradient: 'linear-gradient(135deg, #ec4899, #7c3aed)',
  },
  {
    icon: '💬',
    title: 'Live Community',
    desc: 'Real-time chat with learners and professionals worldwide.',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
  },
  {
    icon: '💼',
    title: 'Jobs Board',
    desc: 'Discover remote and local opportunities across all fields.',
    gradient: 'linear-gradient(135deg, #f59e0b, #ec4899)',
  },
  {
    icon: '📚',
    title: 'Curated Courses',
    desc: 'Hand-picked free and premium courses for every skill.',
    gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)',
  },
];

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '120px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      {/* Title */}
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 52px)',
          marginBottom: '16px',
        }}>
          Everything You Need to{' '}
          <span className="gradient-text">Level Up</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '18px',
          maxWidth: '560px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          A complete ecosystem built for serious learners.
        </p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {features.map((f, i) => (
          <div
            key={f.title}
            className="reveal card-hover"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '32px',
              transitionDelay: `${i * 80}ms`,
            }}
          >
            {/* Icon container */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: f.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              marginBottom: '20px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
              className="feature-icon"
            >
              {f.icon}
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '20px',
              marginBottom: '10px',
              color: 'var(--text-primary)',
            }}>
              {f.title}
            </h3>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '15px',
              lineHeight: 1.65,
            }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        .card-hover:hover .feature-icon {
          transform: scale(1.15);
          box-shadow: 0 8px 24px rgba(124,58,237,0.4);
        }
      `}</style>
    </section>
  );
}
