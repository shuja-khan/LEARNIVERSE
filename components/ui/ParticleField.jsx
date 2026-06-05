'use client';
import { useEffect, useRef } from 'react';

const SHAPES = ['circle', 'square', 'triangle'];
const COUNT = 20;

export default function ParticleField() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = [];

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement('div');
      const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const size = Math.random() * 12 + 4;
      const startX = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 10;
      const color = Math.random() > 0.5
        ? 'rgba(124,58,237,0.4)'
        : 'rgba(59,130,246,0.35)';

      el.style.cssText = `
        position: absolute;
        left: ${startX}%;
        bottom: -20px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
        animation: particle-rise ${duration}s linear ${delay}s infinite;
        opacity: 0;
      `;

      if (shape === 'circle') {
        el.style.borderRadius = '50%';
        el.style.background = color;
      } else if (shape === 'square') {
        el.style.background = color;
        el.style.transform = `rotate(45deg)`;
      } else {
        // triangle via border trick
        el.style.width = '0';
        el.style.height = '0';
        el.style.borderLeft = `${size / 2}px solid transparent`;
        el.style.borderRight = `${size / 2}px solid transparent`;
        el.style.borderBottom = `${size}px solid ${color}`;
        el.style.background = 'transparent';
      }

      container.appendChild(el);
      particles.push(el);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
