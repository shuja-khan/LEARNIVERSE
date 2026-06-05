'use client';
import { useEffect, useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Sign Up & Tell Us Your Goals',
    desc: 'Create your free account and complete a quick onboarding. Tell us your interests, expertise level, and what you want to achieve.',
    icon: '🎯',
    color: '#7c3aed',
  },
  {
    number: '02',
    title: 'Chat With Your AI Tutor',
    desc: 'Get a personalized roadmap powered by Gemini AI. Ask questions, get course recommendations, and use voice mode hands-free.',
    icon: '🤖',
    color: '#3b82f6',
  },
  {
    number: '03',
    title: 'Learn, Grow & Connect',
    desc: 'Join the community, earn XP, unlock badges, discover courses, and land your dream job through our curated jobs board.',
    icon: '🚀',
    color: '#06b6d4',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible'));
      },
      { threshold: 0.15 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '120px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 52px)',
          marginBottom: '16px',
        }}>
          How It <span className="gradient-text">Works</span>
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '18px',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          Three simple steps to transform your learning journey.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '32px',
        position: 'relative',
      }}>
        {/* Connecting lines — desktop only */}
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '20%',
          right: '20%',
          height: '2px',
          background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #06b6d4)',
          opacity: 0.3,
          display: 'none', // shown via media query in style tag
        }} className="connecting-line" />

        {steps.map((step, i) => (
          <div
            key={step.number}
            className="reveal"
            style={{
              transitionDelay: `${i * 150}ms`,
              textAlign: 'center',
            }}
          >
            {/* Number bubble */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${step.color}33, transparent)`,
              border: `2px solid ${step.color}60`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '32px',
              position: 'relative',
            }}>
              {step.icon}
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: step.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 800,
                fontFamily: 'var(--font-display)',
                color: 'white',
              }}>
                {step.number}
              </div>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '20px',
              marginBottom: '12px',
              color: 'var(--text-primary)',
            }}>
              {step.title}
            </h3>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '15px',
              lineHeight: 1.7,
              maxWidth: '300px',
              margin: '0 auto',
            }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .connecting-line { display: block !important; }
        }
      `}</style>
    </section>
  );
}
