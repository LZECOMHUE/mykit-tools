"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { categories } from "@/lib/categories";

// Only use Clerk when keys are configured
const clerkReady = typeof window !== "undefined" && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
let SignInButton, UserButton, Show;
if (clerkReady) {
  const clerk = require("@clerk/nextjs");
  SignInButton = clerk.SignInButton;
  UserButton = clerk.UserButton;
  Show = clerk.Show;
}
import ToolSearch from "@/components/tools/ToolSearch";

export default function MobileNav({ onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const content = (
    <div className="fixed inset-0 z-[100] bg-white" style={{ backgroundColor: '#ffffff' }}>
      <div className="flex items-center justify-between px-4 h-16 border-b border-border">
        <span className="text-xl font-bold font-heading text-text-primary">
          MyKit<span className="text-accent">.tools</span>
        </span>
        <button
          onClick={onClose}
          className="p-2 text-text-secondary hover:text-text-primary cursor-pointer"
          aria-label="Close menu"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="overflow-y-auto h-[calc(100vh-64px)] p-4">
        <div className="mb-6">
          <ToolSearch onSelect={onClose} />
        </div>

        <div className="space-y-1">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-3 rounded-[var(--radius-input)] hover:bg-surface-hover transition-colors"
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="text-sm font-medium text-text-primary">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {Show && (
          <div className="mt-6 pt-6 border-t border-border">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button
                  onClick={onClose}
                  className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-accent rounded-[var(--radius-input)] cursor-pointer"
                >
                  Sign in
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-3 px-3">
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-9 h-9" } }} />
                <span className="text-sm text-text-secondary">My Account</span>
              </div>
            </Show>
          </div>
        )}
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(content, document.body);
}
