import { NextResponse } from 'next/server'

export default async function middleware(request) {
  // Only run Clerk middleware if keys are configured
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY) {
    try {
      const { clerkMiddleware } = await import('@clerk/nextjs/server')
      return clerkMiddleware()(request)
    } catch (e) {
      console.error('Clerk middleware error:', e)
      return NextResponse.next()
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
