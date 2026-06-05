'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import BackgroundOrbs from '@/components/ui/BackgroundOrbs';
import Logo from '@/components/ui/Logo';

const interests = [
  { icon: '🎨', label: 'Graphic Design' },
  { icon: '💻', label: 'Programming' },
  { icon: '📱', label: 'Marketing' },
  { icon: '💼', label: 'Business' },
  { icon: '📊', label: 'Data Science' },
  { icon: '🎬', label: 'Video Editing' },
  { icon: '📷', label: 'Photography' },
  { icon: '✍️', label: 'Writing' },
];

const roles = [
  { icon: '🎓', label: "I'm a Student" },
  { icon: '👔', label: "I'm a Professional" },
  { icon: '🔄', label: "I'm a Career Switcher" },
  { icon: '🔍', label: 'Just Exploring' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [expertise, setExpertise] = useState(1);
  const [goals, setGoals] = useState('');
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState('forward');
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.push('/login');
      else setUser(u);
    });
    return () => unsub();
  }, [router]);

  function goNext() {
    setDirection('forward');
    setStep(s => Math.min(3, s + 1));
  }

  function goBack() {
    setDirection('back');
    setStep(s => Math.max(1, s - 1));
  }

  function toggleInterest(label) {
    setSelectedInterests(prev =>
      prev.includes(label) ? prev.filter(i => i !== label) : [...prev, label]
    );
  }

  async function handleSubmit() {
    if (!user) return;
    setLoading(true);
    const levels = ['Beginner', 'Intermediate', 'Expert'];
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: name || user.displayName || 'Learner',
        role,
        interests: selectedInterests,
        expertise: levels[expertise - 1],
        goals,
        xp: 0,
        badge: 'Beginner',
        onboardingComplete: true,
        createdAt: new Date().toISOString(),
        daysActive: 1,
        messagesSent: 0,
        coursesEnrolled: 0,
      });
      router.push('/app');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const levels = ['Beginner', 'Intermediate', 'Expert'];
  const progressWidth = `${((step - 1) / 2) * 100}%`;

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-void)', padding: '24px', position: 'relative' }}>
      <BackgroundOrbs />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '540px' }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <Logo size={44} showText={true} />
        </div>
        {/* Progress bar */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Step {step} of 3</span>
            <span style={{ color: 'var(--accent-violet)', fontSize: '13px', fontWeight: 600 }}>{Math.round(((step - 1) / 2) * 100)}% complete</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: progressWidth, background: 'linear-gradient(90deg, #7c3aed, #3b82f6, #06b6d4)', borderRadius: '3px', transition: 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />
          </div>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px', boxShadow: '0 0 60px rgba(124,58,237,0.15)', minHeight: '480px', display: 'flex', flexDirection: 'column' }}>

          {/* STEP 1 */}
          {step === 1 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', marginBottom: '8px' }}>Let&apos;s get to know you ✨</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '15px' }}>Tell us a little about yourself to personalize your experience.</p>

              <input id="onboard-name" type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} className="glow-input" style={{ padding: '14px 16px', borderRadius: '12px', fontSize: '15px', width: '100%', marginBottom: '24px' }} />

              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px', fontWeight: 500 }}>What brings you here?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {roles.map(r => (
                  <button key={r.label} onClick={() => setRole(r.label)} style={{ padding: '16px', borderRadius: '14px', border: `2px solid ${role === r.label ? 'var(--accent-violet)' : 'var(--border)'}`, background: role === r.label ? 'rgba(124,58,237,0.15)' : 'var(--bg-elevated)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', transform: role === r.label ? 'scale(1.02)' : 'scale(1)' }}>
                    <div style={{ fontSize: '22px', marginBottom: '6px' }}>{r.icon}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: role === r.label ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: 500 }}>{r.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', marginBottom: '8px' }}>What are you passionate about? 🔥</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '15px' }}>Pick your interests — select as many as you like.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {interests.map(i => {
                  const active = selectedInterests.includes(i.label);
                  return (
                    <button key={i.label} onClick={() => toggleInterest(i.label)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', border: `2px solid ${active ? 'var(--accent-violet)' : 'var(--border)'}`, background: active ? 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(59,130,246,0.2))' : 'var(--bg-elevated)', cursor: 'pointer', fontSize: '14px', color: active ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: active ? 600 : 400, transform: active ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)', fontFamily: 'var(--font-body)' }}>
                      <span>{i.icon}</span> {i.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '28px', marginBottom: '8px' }}>How would you rate yourself? 🎯</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '15px' }}>Tell us your current expertise level and goals.</p>

              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  {levels.map((l, i) => (
                    <span key={l} style={{ fontSize: '13px', fontWeight: expertise === i + 1 ? 700 : 400, color: expertise === i + 1 ? 'var(--accent-violet)' : 'var(--text-secondary)', fontFamily: 'var(--font-body)', transition: 'color 0.2s' }}>{l}</span>
                  ))}
                </div>
                <input type="range" min="1" max="3" value={expertise} onChange={e => setExpertise(Number(e.target.value))} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--accent-violet)' }} />
                <div style={{ textAlign: 'center', marginTop: '8px', color: 'var(--accent-violet)', fontWeight: 600, fontSize: '14px' }}>{levels[expertise - 1]}</div>
              </div>

              <textarea id="onboard-goals" placeholder="What do you want to achieve in the next 3 months? (e.g. 'Get my first freelance client', 'Switch to a data science career')" value={goals} onChange={e => setGoals(e.target.value)} className="glow-input" style={{ padding: '14px 16px', borderRadius: '12px', fontSize: '15px', width: '100%', minHeight: '120px', resize: 'vertical', fontFamily: 'var(--font-body)' }} />
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', gap: '12px' }}>
            {step > 1 ? (
              <button onClick={goBack} className="btn-secondary" style={{ padding: '12px 24px', borderRadius: '10px', fontSize: '14px' }}>← Back</button>
            ) : <div />}

            {step < 3 ? (
              <button onClick={goNext} className="btn-primary" style={{ padding: '12px 32px', borderRadius: '10px', fontSize: '14px' }}>
                Continue →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="btn-primary" style={{ padding: '12px 32px', borderRadius: '10px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {loading ? <><div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'rotate-border 0.8s linear infinite' }} />Saving...</> : '🚀 Start Learning!'}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
