'use client';
import { useState } from 'react';
import { courses, courseCategories } from '@/data/courses';

export default function CoursesTools() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [enrolledIds, setEnrolledIds] = useState([]);

  const filtered = activeCategory === 'All' ? courses : courses.filter(c => c.category === activeCategory);

  function handleEnroll(course) {
    setEnrolledIds(prev => prev.includes(course.id) ? prev : [...prev, course.id]);
    if (course.url) window.open(course.url, '_blank');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-void)' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <span style={{ fontSize: '22px' }}>📚</span>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>Courses & Tools</div>
        </div>
        {/* Filter pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {courseCategories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '6px 16px', borderRadius: '100px', border: `1px solid ${activeCategory === cat ? 'var(--accent-violet)' : 'var(--border)'}`, background: activeCategory === cat ? 'rgba(124,58,237,0.2)' : 'var(--bg-elevated)', color: activeCategory === cat ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: activeCategory === cat ? 600 : 400, transition: 'all 0.2s' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {filtered.map(course => {
            const enrolled = enrolledIds.includes(course.id);
            return (
              <div key={course.id} className="card-hover" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
                {/* Color bar */}
                <div style={{ height: '6px', background: `linear-gradient(90deg, ${course.color}, ${course.color}88)` }} />

                <div style={{ padding: '18px' }}>
                  {/* Top badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '100px', background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}>{course.platform}</span>
                    <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '100px', fontWeight: 700, background: course.badge === 'FREE' ? 'rgba(34,197,94,0.15)' : 'rgba(124,58,237,0.2)', color: course.badge === 'FREE' ? '#22c55e' : 'var(--accent-violet)', border: `1px solid ${course.badge === 'FREE' ? 'rgba(34,197,94,0.3)' : 'var(--border-bright)'}`, boxShadow: course.badge === 'FREE' ? '0 0 8px rgba(34,197,94,0.2)' : '0 0 8px rgba(124,58,237,0.2)' }}>
                      {course.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '15px', marginBottom: '10px', color: 'var(--text-primary)', lineHeight: 1.35 }}>{course.title}</h3>

                  {/* Meta */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '100px', background: `${course.color}22`, color: course.color, border: `1px solid ${course.color}44` }}>{course.category}</span>
                    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '100px', background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>{course.level}</span>
                  </div>

                  {/* Duration */}
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    🕐 {course.duration}
                  </div>

                  {/* Enroll button */}
                  <button onClick={() => handleEnroll(course)} style={{ width: '100%', padding: '9px', borderRadius: '10px', border: `1px solid ${enrolled ? '#22c55e' : 'var(--border-bright)'}`, background: enrolled ? 'rgba(34,197,94,0.1)' : 'transparent', color: enrolled ? '#22c55e' : 'var(--accent-violet)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    onMouseEnter={e => { if (!enrolled) { e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; } }}
                    onMouseLeave={e => { if (!enrolled) { e.currentTarget.style.background = 'transparent'; } }}
                  >
                    {enrolled ? '✓ Enrolled' : 'Enroll Now →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
