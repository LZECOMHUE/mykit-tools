"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ToolSearch from "@/components/tools/ToolSearch";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";
import LogoChip from "@/components/design/LogoChip";
import { tools } from "@/lib/tool-registry";
import { useAuth } from "@/lib/mock-auth";
import { SignInButton, UserButton, Show, useClerk } from "@clerk/nextjs";

// Only use Clerk when keys are configured
const clerkReady = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

const FUN_CATEGORIES = ["games", "fun", "quiz", "creative"];
const funTools = tools.filter((t) => FUN_CATEGORIES.includes(t.category));

function ClerkSignOutButton({ className, children, onClick }) {
  const { signOut } = useClerk();
  return (
    <button
      className={className}
      onClick={(e) => {
        e.preventDefault();
        signOut({ redirectUrl: '/' });
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}

const NAV_LINKS = [
  { label: "Tools", href: "/", match: (p) => p === "/" },
  { label: "Popular", href: "/#popular", match: () => false },
  { label: "Blog", href: "/blog", match: (p) => p.startsWith("/blog") },
];

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname() || "/";
  const router = useRouter();
  const auth = useAuth();

  function handleSurprise() {
    const pick = funTools[Math.floor(Math.random() * funTools.length)];
    if (pick) router.push(`/${pick.slug}`);
  }

  return (
    <header className="sticky top-0 z-40 bg-[color:var(--color-background)]/90 backdrop-blur-md">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="flex items-center justify-between h-[74px] gap-6">
          {/* Left — logo + pill nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 press-scale">
              <LogoChip />
              <span className="font-bold text-[18px] text-[color:var(--color-ink)] hidden sm:inline">
                mykit.tools
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-2">
              {/* Tools */}
              {(() => {
                const link = NAV_LINKS[0];
                const active = link.match(pathname);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[14px] font-semibold transition-colors press-scale"
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: active ? "var(--color-ink)" : "transparent",
                      color: active ? "#fff" : "var(--color-ink)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })()}

              {/* Categories — opens the MegaMenu */}
              <button
                className="text-[14px] font-semibold press-scale inline-flex items-center gap-1 transition-colors"
                style={{
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: megaOpen || pathname.startsWith("/categories") ? "var(--color-ink)" : "transparent",
                  color: megaOpen || pathname.startsWith("/categories") ? "#fff" : "var(--color-ink)",
                }}
                onClick={() => setMegaOpen(!megaOpen)}
                aria-expanded={megaOpen}
              >
                Categories
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Popular + Blog */}
              {NAV_LINKS.slice(1).map((link) => {
                const active = link.match(pathname);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[14px] font-semibold transition-colors press-scale"
                    style={{
                      padding: "6px 12px",
                      borderRadius: 999,
                      background: active ? "var(--color-ink)" : "transparent",
                      color: active ? "#fff" : "var(--color-ink)",
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Middle — search (desktop only, compact) */}
          <div className="hidden md:block flex-1 max-w-sm">
            <ToolSearch />
          </div>

          {/* Right — Pro + Surprise + auth */}
          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="hidden sm:inline-flex text-[13.5px] font-semibold text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)] transition-colors"
            >
              Pro ✨
            </Link>

            <button
              onClick={handleSurprise}
              className="hidden sm:inline-flex items-center gap-1.5 press-scale"
              style={{
                padding: "8px 16px",
                borderRadius: 999,
                background: "var(--color-ink)",
                color: "#fff",
                fontSize: 13.5,
                fontWeight: 600,
              }}
            >
              🎲 Surprise me
            </button>

            {/* Auth */}
            {clerkReady ? (
              <div>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button
                      className="inline-flex items-center press-scale border-ink"
                      style={{
                        padding: "8px 14px",
                        borderRadius: 999,
                        background: "var(--color-accent)",
                        color: "#fff",
                        fontSize: 13.5,
                        fontWeight: 700,
                      }}
                    >
                      Sign in
                    </button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <div className="flex items-center gap-2">
                    <Link
                      href="/mykit"
                      className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)] transition-colors rounded-full hover:bg-[color:var(--color-surface-hover)]"
                      title="MyKit"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                      </svg>
                      <span>MyKit</span>
                    </Link>
                    <UserButton appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                    <ClerkSignOutButton className="hidden lg:inline-flex items-center px-3 py-2 text-sm font-semibold text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)] transition-colors">
                      Sign out
                    </ClerkSignOutButton>
                  </div>
                </Show>
              </div>
            ) : auth.loaded && (
              <div className="relative">
                {auth.isSignedIn ? (
                  <>
                    <div className="flex items-center gap-2">
                      {auth.isPro && (
                        <span
                          className="text-xs font-bold text-[color:var(--color-ink)]"
                          style={{
                            background: "var(--color-yellow)",
                            border: "1.5px solid var(--color-ink)",
                            padding: "2px 8px",
                            borderRadius: 999,
                          }}
                        >
                          PRO
                        </span>
                      )}
                      <button
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white cursor-pointer press-scale border-ink"
                        style={{ background: "var(--color-accent)" }}
                        title={`Signed in as ${auth.user.firstName}`}
                      >
                        {auth.user.firstName[0]}{auth.user.lastName[0]}
                      </button>
                    </div>

                    {userMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                        <div
                          className="absolute right-0 top-full mt-2 w-56 z-50 py-2 overflow-hidden border-ink shadow-ink"
                          style={{ background: "var(--color-paper)", borderRadius: 18 }}
                        >
                          <div className="px-4 py-3 border-b border-[color:var(--color-border)]">
                            <p className="text-sm font-semibold text-[color:var(--color-ink)]">
                              {auth.user.firstName} {auth.user.lastName}
                            </p>
                            <p className="text-xs text-[color:var(--color-muted)]">{auth.user.email}</p>
                          </div>
                          <Link href="/mykit" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-[color:var(--color-ink)] hover:bg-[color:var(--color-surface-hover)] transition-colors">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                              <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            MyKit
                          </Link>
                          <button onClick={auth.togglePro} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold text-[color:var(--color-muted)] hover:bg-[color:var(--color-surface-hover)] transition-colors cursor-pointer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            {auth.isPro ? 'Switch to Free' : 'Switch to Pro'}
                            <span className="ml-auto text-[10px] text-[color:var(--color-muted)] bg-[color:var(--color-surface-hover)] px-1.5 py-0.5 rounded">DEV</span>
                          </button>
                          <div className="border-t border-[color:var(--color-border)] my-1" />
                          <button onClick={() => { auth.signOut(); setUserMenuOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold text-[color:var(--color-ink)] hover:bg-[color:var(--color-surface-hover)] transition-colors cursor-pointer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                              <polyline points="16 17 21 12 16 7" />
                              <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Sign out
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <button
                    onClick={auth.signIn}
                    className="inline-flex items-center press-scale border-ink"
                    style={{
                      padding: "8px 14px",
                      borderRadius: 999,
                      background: "var(--color-accent)",
                      color: "#fff",
                      fontSize: 13.5,
                      fontWeight: 700,
                    }}
                  >
                    Sign in
                  </button>
                )}
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-[color:var(--color-ink)] cursor-pointer"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
      {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)} />}
    </header>
  );
}
