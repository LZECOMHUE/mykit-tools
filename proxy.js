import { clerkMiddleware } from '@clerk/nextjs/server'

// Next.js 16 proxy file (renamed from middleware.js).
// Clerk handles session management (sign-in, sign-out, token refresh).
// When CLERK_SECRET_KEY is not set, clerkMiddleware still works - it just
// treats every request as unauthenticated and passes through.
export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc|__clerk)(.*)',
  ],
}
