'use client';
import { useState, useCallback } from 'react';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const BADGE_THRESHOLDS = {
  Beginner: 0,
  Explorer: 100,
  Pro: 500,
  Master: 1500,
};

function getBadge(xp) {
  if (xp >= BADGE_THRESHOLDS.Master) return 'Master';
  if (xp >= BADGE_THRESHOLDS.Pro) return 'Pro';
  if (xp >= BADGE_THRESHOLDS.Explorer) return 'Explorer';
  return 'Beginner';
}

/**
 * useXP — XP management with badge tracking
 */
export function useXP(uid, initialXP = 0) {
  const [xp, setXp] = useState(initialXP);
  const [badge, setBadge] = useState(getBadge(initialXP));
  const [leveledUp, setLeveledUp] = useState(null); // badge name if leveled up

  const addXP = useCallback(async (amount = 10) => {
    if (!uid) return;

    const newXP = xp + amount;
    const oldBadge = getBadge(xp);
    const newBadge = getBadge(newXP);

    setXp(newXP);
    setBadge(newBadge);

    // Trigger level-up animation if badge changed
    if (newBadge !== oldBadge) {
      setLeveledUp(newBadge);
      setTimeout(() => setLeveledUp(null), 4000);
    }

    // Persist to Firestore
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { xp: newXP, badge: newBadge });
    } catch (err) {
      console.error('Failed to update XP:', err);
    }

    return newXP;
  }, [xp, uid]);

  const syncXP = useCallback(async () => {
    if (!uid) return;
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      if (snap.exists()) {
        const data = snap.data();
        const storedXP = data.xp || 0;
        setXp(storedXP);
        setBadge(getBadge(storedXP));
      }
    } catch (err) {
      console.error('Failed to sync XP:', err);
    }
  }, [uid]);

  const xpToNextBadge = useCallback(() => {
    const thresholds = Object.values(BADGE_THRESHOLDS).sort((a, b) => a - b);
    for (const threshold of thresholds) {
      if (xp < threshold) return threshold - xp;
    }
    return 0;
  }, [xp]);

  const nextBadgeName = useCallback(() => {
    const entries = Object.entries(BADGE_THRESHOLDS).sort((a, b) => a[1] - b[1]);
    for (const [name, threshold] of entries) {
      if (xp < threshold) return name;
    }
    return 'Master';
  }, [xp]);

  const xpPercentToNext = useCallback(() => {
    const entries = Object.entries(BADGE_THRESHOLDS).sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < entries.length; i++) {
      const [, threshold] = entries[i];
      if (xp < threshold) {
        const prev = entries[i - 1]?.[1] || 0;
        return Math.min(100, ((xp - prev) / (threshold - prev)) * 100);
      }
    }
    return 100;
  }, [xp]);

  return {
    xp,
    setXp,
    badge,
    leveledUp,
    addXP,
    syncXP,
    xpToNextBadge: xpToNextBadge(),
    nextBadgeName: nextBadgeName(),
    xpPercent: xpPercentToNext(),
    BADGE_THRESHOLDS,
  };
}
