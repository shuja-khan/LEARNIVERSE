'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BackgroundOrbs from '@/components/ui/BackgroundOrbs';
import Logo from '@/components/ui/Logo';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleEmail(e) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/onboarding');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally { setLoading(false); }
  }

  async function handleGoogle() {
    setLoading(true); setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/onboarding');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally { setLoading(false); }
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-void)', padding: '24px', position: 'relative' }}>
      <BackgroundOrbs />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '420px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px', gap: '8px' }}>
          <Logo size={48} showText={true} />
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Create your free account and start learning.</p>
        </div>
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px', boxShadow: '0 0 60px rgba(124,58,237,0.15)' }}>
          <button onClick={handleGoogle} disabled={loading} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'white', color: '#1a1a1a', fontWeight: 600, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px', fontFamily: 'var(--font-body)', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/><path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/></svg>
            Sign up with Google
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>
          <form onSubmit={handleEmail} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input id="signup-email" type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required className="glow-input" style={{ padding: '14px 16px', borderRadius: '12px', fontSize: '15px', width: '100%' }} />
            <input id="signup-password" type="password" placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="glow-input" style={{ padding: '14px 16px', borderRadius: '12px', fontSize: '15px', width: '100%' }} />
            {error && <div style={{ color: '#ef4444', fontSize: '13px', padding: '10px 14px', background: 'rgba(239,68,68,0.1)', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.2)' }}>{error}</div>}
            <button type="submit" id="signup-submit" disabled={loading} className="btn-primary" style={{ padding: '14px', borderRadius: '12px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {loading ? (
                <><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'rotate-border 0.8s linear infinite' }} />Creating account...</>
              ) : 'Create Account →'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'var(--accent-violet)', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
