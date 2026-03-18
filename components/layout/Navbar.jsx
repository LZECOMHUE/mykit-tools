"use client";

import { useState } from "react";
import Link from "next/link";
import ToolSearch from "@/components/tools/ToolSearch";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";
import { useAuth } from "@/lib/mock-auth";

// Only use Clerk when keys are configured
const clerkReady = typeof window !== "undefined" && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
let SignInButton, UserButton, Show;
if (clerkReady) {
  const clerk = require("@clerk/nextjs");
  SignInButton = clerk.SignInButton;
  UserButton = clerk.UserButton;
  Show = clerk.Show;
}

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const auth = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
          >
            <span className="text-xl font-bold font-heading text-text-primary">
              MyKit<span className="text-accent">.tools</span>
            </span>
          </Link>

          {/* Search — hidden on mobile, shown in MobileNav instead */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <ToolSearch />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Categories button — desktop */}
            <button
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-[var(--radius-input)] hover:bg-surface-hover cursor-pointer"
              onClick={() => setMegaOpen(!megaOpen)}
            >
              Categories
              <svg
                className={`w-4 h-4 transition-transform ${megaOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Auth — Clerk when configured, mock auth for local dev */}
            {Show ? (
              <div>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-[var(--radius-input)] transition-colors cursor-pointer">
                      Sign in
                    </button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <div className="flex items-center gap-2">
                    <Link
                      href="/mykit"
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-[var(--radius-input)] hover:bg-surface-hover"
                      title="MyKit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                      <span className="hidden lg:inline">MyKit</span>
                    </Link>
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox: "w-9 h-9",
                        },
                      }}
                    />
                  </div>
                </Show>
              </div>
            ) : auth.loaded && (
              <div className="relative">
                {auth.isSignedIn ? (
                  <>
                    <div className="flex items-center gap-2">
                      {auth.isPro && (
                        <span className="text-xs font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">PRO</span>
                      )}
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold cursor-pointer hover:bg-accent-hover transition-colors"
                        title={`Signed in as ${auth.user.firstName}`}
                      >
                        {auth.user.firstName[0]}{auth.user.lastName[0]}
                      </button>
                    </div>

                    {userMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-border rounded-xl shadow-lg z-50 py-2 overflow-hidden">
                          {/* User info */}
                          <div className="px-4 py-3 border-b border-border">
                            <p className="text-sm font-medium text-text-primary">{auth.user.firstName} {auth.user.lastName}</p>
                            <p className="text-xs text-text-muted">{auth.user.email}</p>
                          </div>

                          {/* MyKit link */}
                          <Link
                            href="/mykit"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary hover:bg-surface transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                            MyKit
                          </Link>

                          {/* Manage account */}
                          <Link
                            href="/mykit"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-primary hover:bg-surface transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                            Manage account
                          </Link>

                          <div className="border-t border-border my-1" />

                          {/* Dev toggle */}
                          <button
                            onClick={auth.togglePro}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-text-secondary hover:bg-surface transition-colors cursor-pointer"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                            {auth.isPro ? 'Switch to Free' : 'Switch to Pro'}
                            <span className="ml-auto text-[10px] text-text-muted bg-surface px-1.5 py-0.5 rounded">DEV</span>
                          </button>

                          <div className="border-t border-border my-1" />

                          {/* Sign out */}
                          <button
                            onClick={() => { auth.signOut(); setUserMenuOpen(false); }}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-text-primary hover:bg-surface transition-colors cursor-pointer"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                            Sign out
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <button
                    onClick={auth.signIn}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-[var(--radius-input)] transition-colors cursor-pointer"
                  >
                    Sign in
                  </button>
                )}
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-text-secondary hover:text-text-primary cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu dropdown */}
      {megaOpen && (
        <MegaMenu onClose={() => setMegaOpen(false)} />
      )}

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <MobileNav onClose={() => setMobileOpen(false)} />
      )}
    </header>
  );
}
