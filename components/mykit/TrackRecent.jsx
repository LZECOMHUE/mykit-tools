'use client';

import { useEffect } from 'react';
import { useMyKit } from '@/lib/mykit-context';
import { useAuth } from '@/lib/mock-auth';

export default function TrackRecent({ slug }) {
  const auth = useAuth();
  const mykit = useMyKit();

  useEffect(() => {
    if (auth.isSignedIn && mykit.loaded && slug) {
      mykit.trackRecent(slug);
    }
  }, [slug, auth.isSignedIn, mykit.loaded]);

  return null;
}
