'use client';

import { useMyKit } from '@/lib/mykit-context';
import { useIsSignedIn } from '@/lib/use-auth';

export default function BookmarkButton({ slug }) {
  const auth = useIsSignedIn();
  const mykit = useMyKit();

  if (!auth.isSignedIn || !mykit.loaded) return null;

  const bookmarked = mykit.isBookmarked(slug);

  return (
    <button
      onClick={() => mykit.toggleBookmark(slug)}
      className="inline-flex items-center gap-2 press-scale border-ink"
      style={{
        padding: '8px 14px',
        borderRadius: 999,
        background: bookmarked ? 'var(--color-yellow)' : 'var(--color-paper)',
        fontWeight: 700,
        fontSize: 13,
        color: 'var(--color-ink)',
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={bookmarked ? 'var(--color-ink)' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {bookmarked ? 'Saved' : 'Save'}
    </button>
  );
}
