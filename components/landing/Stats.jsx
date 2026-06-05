'use client';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 10000, suffix: '+', label: 'Members', icon: '👥' },
  { value: 500, suffix: '+', label: 'Courses', icon: '📚' },
  { value: 50, suffix: '+', label: 'Mentors', icon: '🎓' },
  { value: 95, suffix: '%', label: 'Success Rate', icon: '🏆' },
];

function Counter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return (
    <span ref={ref} style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'clamp(36px, 5vw, 52px)',
      color: 'var(--text-primary)',
      background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section style={{
      padding: '0 24px 120px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: '28px',
        padding: '64px 48px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '48px',
        boxShadow: '0 0 60px rgba(124,58,237,0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {stats.map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>{stat.icon}</div>
            <Counter target={stat.value} suffix={stat.suffix} />
            <div style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-secondary)',
              fontSize: '16px',
              marginTop: '8px',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
