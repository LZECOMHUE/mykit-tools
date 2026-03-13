"use client";

import { useState } from "react";
import Link from "next/link";
import ToolSearch from "@/components/tools/ToolSearch";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";

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

            {/* Auth — only renders when Clerk is configured */}
            {Show && (
              <div>
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-[var(--radius-input)] transition-colors cursor-pointer">
                      Sign in
                    </button>
                  </SignInButton>
                </Show>
                <Show when="signed-in">
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-9 h-9",
                      },
                    }}
                  />
                </Show>
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
