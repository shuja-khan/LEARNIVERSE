'use client';
import { useState } from 'react';
import { jobs, jobTypes } from '@/data/jobs';

const FIELD_COLORS = {
  Design: '#7c3aed',
  Programming: '#3b82f6',
  Marketing: '#ec4899',
  Business: '#f59e0b',
  'Data Science': '#06b6d4',
};

export default function JobsBoard() {
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');

  const filtered = jobs.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.field.toLowerCase().includes(search.toLowerCase());
    const matchType = activeType === 'All' || (activeType === 'Remote' ? j.location === 'Remote' : activeType === 'On-site' ? j.location !== 'Remote' : j.type.toLowerCase().includes(activeType.toLowerCase()));
    return matchSearch && matchType;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg-void)' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <span style={{ fontSize: '22px' }}>💼</span>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>Jobs Board</div>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input type="text" placeholder="🔍  Search jobs, companies, fields..." value={search} onChange={e => setSearch(e.target.value)} className="glow-input" style={{ flex: 1, minWidth: '200px', padding: '9px 14px', borderRadius: '10px', fontSize: '13px' }} />
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {jobTypes.map(t => (
              <button key={t} onClick={() => setActiveType(t)} style={{ padding: '8px 14px', borderRadius: '100px', border: `1px solid ${activeType === t ? 'var(--accent-violet)' : 'var(--border)'}`, background: activeType === t ? 'rgba(124,58,237,0.2)' : 'var(--bg-elevated)', color: activeType === t ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: activeType === t ? 600 : 400, transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job listings */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '60px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>🔍</div>
            <div>No jobs found matching your search.</div>
          </div>
        )}
        {filtered.map(job => {
          const initial = job.company[0].toUpperCase();
          const fieldColor = FIELD_COLORS[job.field] || '#7c3aed';
          const isRemote = job.location === 'Remote';
          return (
            <div key={job.id} className="card-hover" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              {/* Company avatar */}
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `linear-gradient(135deg, ${fieldColor}, ${fieldColor}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'white', flexShrink: 0 }}>
                {initial}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '3px' }}>{job.title}</h3>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{job.company}</div>
                  </div>
                  <button onClick={() => window.open('https://linkedin.com/jobs', '_blank')} style={{ padding: '8px 18px', borderRadius: '10px', border: '1px solid var(--border-bright)', background: 'transparent', color: 'var(--accent-violet)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,58,237,0.15)'; e.currentTarget.style.transform = 'scale(1.03)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >Apply Now →</button>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>📍 {job.location}</span>
                  <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '100px', background: isRemote ? 'rgba(6,182,212,0.15)' : 'rgba(59,130,246,0.15)', color: isRemote ? '#06b6d4' : '#3b82f6', border: `1px solid ${isRemote ? 'rgba(6,182,212,0.3)' : 'rgba(59,130,246,0.3)'}`, fontWeight: 600 }}>
                    {isRemote ? 'Remote' : 'On-site'}
                  </span>
                  <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '100px', background: `${fieldColor}18`, color: fieldColor, border: `1px solid ${fieldColor}33` }}>{job.field}</span>
                  <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '100px', background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>{job.type}</span>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '13px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>💰 <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{job.salary}</span></span>
                  <span style={{ color: 'var(--text-secondary)' }}>Posted {job.posted}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
