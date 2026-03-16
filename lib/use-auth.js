'use client';

/**
 * Unified auth hook that works with both Clerk (production) and mock-auth (local dev).
 *
 * The branch is determined at module load time based on whether Clerk keys are configured,
 * so the same code path is always taken for the lifetime of the app (safe despite the
 * conditional hook call).
 */

const hasClerk = typeof window !== 'undefined' && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

let useClerkUser;
if (hasClerk) {
  try {
    useClerkUser = require('@clerk/nextjs').useUser;
  } catch (e) {
    // Clerk not installed or failed to load
  }
}

export function useIsSignedIn() {
  if (useClerkUser) {
    const { isSignedIn, isLoaded, user } = useClerkUser();
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

  // Mock auth fallback for local dev
  const { useAuth } = require('@/lib/mock-auth');
  const auth = useAuth();
  return {
    isSignedIn: auth.isSignedIn,
    loaded: auth.loaded,
    user: auth.user,
    signIn: auth.signIn,
  };
}
