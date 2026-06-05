'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useXP } from '@/hooks/useXP';
import { useQuoteTimer } from '@/hooks/useQuoteTimer';
import BackgroundOrbs from '@/components/ui/BackgroundOrbs';
import LeftSidebar from '@/components/app/LeftSidebar';
import RightSidebar from '@/components/app/RightSidebar';
import QuoteModal from '@/components/app/QuoteModal';
import AITutor from '@/components/app/channels/AITutor';
import CommunityChat from '@/components/app/channels/CommunityChat';
import CoursesTools from '@/components/app/channels/CoursesTools';
import JobsBoard from '@/components/app/channels/JobsBoard';
import PremiumChannel from '@/components/app/channels/PremiumChannel';

export default function AppPage() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeChannel, setActiveChannel] = useState('ai-tutor');
  const [levelUpBadge, setLevelUpBadge] = useState(null);
  const [toasts, setToasts] = useState([]);
  const router = useRouter();

  // XP hook — initialized with 0, synced from Firestore
  const { xp, setXp, badge, leveledUp, addXP, syncXP, xpPercent, xpToNextBadge, nextBadgeName } = useXP(user?.uid, userProfile?.xp || 0);
  const { showQuote, currentQuote, dismissQuote, nextQuote } = useQuoteTimer();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { router.push('/login'); return; }
      setUser(u);
      try {
        const snap = await getDoc(doc(db, 'users', u.uid));
        if (snap.exists()) {
          const data = snap.data();
          setUserProfile(data);
          setXp(data.xp || 0);
          if (!data.onboardingComplete) {
            router.push('/onboarding');
            return;
          }
        } else {
          router.push('/onboarding');
          return;
        }
      } catch (err) {
        console.error(err);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, [router, setXp]);

  // Show level-up overlay
  useEffect(() => {
    if (leveledUp) {
      setLevelUpBadge(leveledUp);
      addToast(`🎉 Level Up! You are now ${leveledUp}!`, '#f59e0b');
      setTimeout(() => setLevelUpBadge(null), 4000);
    }
  }, [leveledUp]);

  function addToast(message, color = 'var(--accent-violet)') {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }

  async function handleXPGain(amount = 10) {
    const newXP = await addXP(amount);
    addToast(`+${amount} XP earned! 🌟`, 'var(--accent-violet)');
    setUserProfile(prev => prev ? { ...prev, messagesSent: (prev.messagesSent || 0) + 1 } : prev);
  }

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-void)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <BackgroundOrbs />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid rgba(124,58,237,0.3)', borderTop: '3px solid var(--accent-violet)', borderRadius: '50%', animation: 'rotate-border 0.8s linear infinite', margin: '0 auto 16px' }} />
          <div style={{ fontFamily: 'var(--font-display)', color: 'var(--text-secondary)', fontSize: '15px' }}>Loading your universe...</div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={{ height: '100vh', overflow: 'hidden', background: 'var(--bg-void)', position: 'relative' }}>
      <BackgroundOrbs />

      {/* Level-up overlay */}
      {levelUpBadge && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6,6,8,0.7)', backdropFilter: 'blur(8px)', animation: 'level-up-flash 4s ease forwards', pointerEvents: 'none' }}>
          <div style={{ textAlign: 'center', animation: 'scale-in 0.5s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <div style={{ fontSize: '80px', marginBottom: '16px', filter: 'drop-shadow(0 0 30px rgba(245,158,11,0.8))' }}>🎉</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '48px', background: 'linear-gradient(135deg,#f59e0b,#ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '8px' }}>LEVEL UP!</div>
            <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '18px' }}>You are now <strong style={{ color: '#f59e0b' }}>{levelUpBadge}</strong></div>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <div style={{ position: 'fixed', top: '16px', right: '16px', zIndex: 600, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {toasts.map(toast => (
          <div key={toast.id} className="toast" style={{ background: 'var(--bg-elevated)', border: `1px solid ${toast.color}44`, borderLeft: `3px solid ${toast.color}`, borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', boxShadow: `0 4px 20px rgba(0,0,0,0.4)`, minWidth: '220px' }}>
            {toast.message}
          </div>
        ))}
      </div>

      {/* 3-column layout */}
      <div style={{ display: 'flex', height: '100vh', position: 'relative', zIndex: 2 }}>
        {/* Left sidebar */}
        <LeftSidebar user={user} userProfile={userProfile} xp={xp} xpPercent={xpPercent} badge={badge} nextBadgeName={nextBadgeName} xpToNextBadge={xpToNextBadge} />

        {/* Center — channel view */}
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {activeChannel === 'ai-tutor' && <AITutor userProfile={userProfile} onXPGain={handleXPGain} />}
          {activeChannel === 'community' && <CommunityChat user={user} userProfile={userProfile} onXPGain={handleXPGain} />}
          {activeChannel === 'courses' && <CoursesTools />}
          {activeChannel === 'jobs' && <JobsBoard />}
          {activeChannel === 'premium' && <PremiumChannel xp={xp} username={userProfile?.name || 'Learner'} />}
        </main>

        {/* Right sidebar */}
        <RightSidebar activeChannel={activeChannel} onChannelChange={setActiveChannel} xp={xp} />
      </div>

      {/* Quote modal */}
      {showQuote && currentQuote && (
        <QuoteModal quote={currentQuote} onClose={dismissQuote} onNext={nextQuote} />
      )}
    </div>
  );
}
