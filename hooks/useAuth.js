'use client';
import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

/**
 * useAuth — Firebase auth state observer
 * Returns { user, userProfile, loading }
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch Firestore profile
        try {
          const profileRef = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(profileRef);
          if (snap.exists()) {
            setUserProfile(snap.data());
          }
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, userProfile, loading };
}

/**
 * useRequireAuth — Redirects to /login if not authenticated
 */
export function useRequireAuth() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  return { user, userProfile, loading };
}
