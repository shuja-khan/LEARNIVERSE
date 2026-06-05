'use client';
import { useEffect, useRef } from 'react';

export default function QuoteModal({ quote, onClose, onNext }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!quote) return null;

  return (
    <div ref={overlayRef} onClick={e => { if (e.target === overlayRef.current) onClose(); }} style={{ position: 'fixed', inset: 0, background: 'rgba(6,6,8,0.85)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', animation: 'scale-in 0.1s ease forwards' }}>
      <div style={{ background: 'var(--bg-elevated)', border: '2px solid transparent', borderRadius: '24px', padding: '48px 40px', maxWidth: '480px', width: '100%', position: 'relative', backgroundImage: 'linear-gradient(var(--bg-elevated), var(--bg-elevated)), linear-gradient(135deg, #f59e0b, #ec4899, #7c3aed)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box', animation: 'scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
        {/* Close button */}
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '20px', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s, color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >✕</button>

        {/* Quote icon */}
        <div style={{ fontSize: '52px', color: 'var(--accent-violet)', opacity: 0.6, lineHeight: 1, marginBottom: '20px', fontFamily: 'Georgia, serif' }}>❝</div>

        {/* Quote text */}
        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '22px', lineHeight: 1.5, color: 'var(--text-primary)', marginBottom: '24px' }}>
          {quote.text}
        </p>

        {/* Author */}
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', fontFamily: 'var(--font-body)', marginBottom: '32px' }}>
          — {quote.author}
        </p>

        {/* Next button */}
        <button onClick={onNext} className="btn-secondary" style={{ width: '100%', padding: '12px', borderRadius: '10px', fontSize: '14px' }}>
          Next Quote →
        </button>
      </div>
    </div>
  );
}
