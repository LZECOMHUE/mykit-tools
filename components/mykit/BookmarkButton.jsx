'use client';

import { useMyKit } from '@/lib/mykit-context';
import { useAuth } from '@/lib/mock-auth';

export default function BookmarkButton({ slug }) {
  const auth = useAuth();
  const mykit = useMyKit();

  if (!auth.isSignedIn || !mykit.loaded) return null;

  const bookmarked = mykit.isBookmarked(slug);

  return (
    <button
      onClick={() => mykit.toggleBookmark(slug)}
      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer ${
        bookmarked
          ? 'border-accent bg-blue-50 text-accent'
          : 'border-border text-text-muted hover:border-blue-200 hover:text-accent hover:bg-blue-50'
      }`}
    >
      {bookmarked ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      )}
      {bookmarked ? 'In MyKit' : 'Add to MyKit'}
    </button>
  );
}
