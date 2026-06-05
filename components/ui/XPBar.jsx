'use client';
import { useEffect, useRef } from 'react';

export default function XPBar({ xp = 0, percent = 0, nextBadge = '', xpToNext = 0, compact = false }) {
  const fillRef = useRef(null);

  useEffect(() => {
    if (fillRef.current) {
      fillRef.current.style.setProperty('--xp-width', `${Math.min(100, percent)}%`);
      fillRef.current.style.width = `${Math.min(100, percent)}%`;
    }
  }, [percent]);

  if (compact) {
    return (
      <div style={{ width: '100%' }}>
        <div style={{
          height: '6px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '3px',
          overflow: 'hidden',
        }}>
          <div
            ref={fillRef}
            className="xp-bar-fill"
            style={{
              height: '100%',
              borderRadius: '3px',
              width: `${Math.min(100, percent)}%`,
              transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <span style={{
          fontSize: '11px',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontFamily: 'var(--font-body)',
        }}>
          Experience Points
        </span>
        <span style={{
          fontSize: '13px',
          fontWeight: 700,
          color: 'var(--accent-violet)',
          fontFamily: 'var(--font-display)',
        }}>
          {xp.toLocaleString()} XP
        </span>
      </div>

      {/* Bar track */}
      <div style={{
        height: '8px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
      }}>
        <div
          ref={fillRef}
          className="xp-bar-fill"
          style={{
            height: '100%',
            borderRadius: '4px',
            width: `${Math.min(100, percent)}%`,
            transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
            position: 'relative',
          }}
        />
      </div>

      {/* Progress label */}
      <div style={{
        marginTop: '6px',
        fontSize: '11px',
        color: 'var(--text-secondary)',
        fontFamily: 'var(--font-body)',
      }}>
        {nextBadge !== 'Master' ? (
          <>→ {nextBadge}: <span style={{ color: 'var(--accent-cyan)' }}>{xpToNext} XP to go</span></>
        ) : (
          <span style={{ color: '#f59e0b' }}>👑 Maximum rank achieved!</span>
        )}
      </div>
    </div>
  );
}
