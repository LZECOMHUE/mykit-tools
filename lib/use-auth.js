'use client';

/**
 * Unified auth hook that works with both Clerk (production) and mock-auth (local dev).
 */

import { useUser } from '@clerk/nextjs';
import { useAuth as useMockAuth } from '@/lib/mock-auth';

const clerkReady = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function useIsSignedIn() {
  if (clerkReady) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { isSignedIn, isLoaded, user } = useUser();
    return {
      isSignedIn: !!isSignedIn,
      loaded: isLoaded,
      user: user ? {
        id: user.id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.primaryEmailAddress?.emailAddress || '',
      } : null,
    };
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const auth = useMockAuth();
  return {
    isSignedIn: auth.isSignedIn,
    loaded: auth.loaded,
    user: auth.user,
    signIn: auth.signIn,
  };
}
