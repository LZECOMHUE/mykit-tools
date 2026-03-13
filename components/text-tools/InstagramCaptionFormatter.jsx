'use client';

import { useState, useMemo } from 'react';

export default function InstagramCaptionFormatter() {
  const [caption, setCaption] = useState('');
  const [includeZeroWidth, setIncludeZeroWidth] = useState(true);

  // Zero-width character for line breaks on Instagram
  const ZERO_WIDTH_JOINER = '\u200D';
  const ZERO_WIDTH_SPACE = '\u200B';

  const formatted = useMemo(() => {
    if (!caption.trim()) return '';

    let text = caption;

    // Add zero-width characters before line breaks to preserve them on Instagram
    if (includeZeroWidth) {
      text = text.split('\n').join(`${ZERO_WIDTH_JOINER}\n`);
    }

    return text;
  }, [caption, includeZeroWidth]);

  const stats = useMemo(() => {
    const chars = caption.length;
    const hashtags = (caption.match(/#\w+/g) || []).length;
    const mentions = (caption.match(/@\w+/g) || []).length;
    const lineBreaks = (caption.match(/\n/g) || []).length;

    return { chars, hashtags, mentions, lineBreaks };
  }, [caption]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Input */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          Your Caption
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Paste or type your Instagram caption here..."
          className="w-full mt-2 min-h-[150px] rounded-[var(--radius-input)] border border-border bg-white p-3 font-sans text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </div>

      {/* Format Option */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={includeZeroWidth}
          onChange={(e) => setIncludeZeroWidth(e.target.checked)}
          className="w-4 h-4 rounded accent-accent"
        />
        <span className="text-text-secondary text-sm font-medium">
          Preserve Line Breaks (recommended for Instagram)
        </span>
      </label>

      {/* Stats */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
          <div className="text-lg font-bold font-mono text-text-primary">
            {stats.chars}
          </div>
          <div className="text-[11px] text-text-muted mt-1">Characters</div>
        </div>
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
          <div className="text-lg font-bold font-mono text-text-primary">
            {stats.hashtags}
          </div>
          <div className="text-[11px] text-text-muted mt-1">Hashtags</div>
        </div>
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
          <div className="text-lg font-bold font-mono text-text-primary">
            {stats.mentions}
          </div>
          <div className="text-[11px] text-text-muted mt-1">Mentions</div>
        </div>
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
          <div className="text-lg font-bold font-mono text-text-primary">
            {stats.lineBreaks}
          </div>
          <div className="text-[11px] text-text-muted mt-1">Line Breaks</div>
        </div>
      </div>

      {/* Formatted Output */}
      {caption.trim() && (
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
          <p className="text-text-secondary text-sm font-medium mb-3">
            Formatted Caption
          </p>
          <div className="bg-white rounded-[var(--radius-input)] border border-border p-3 mb-3 max-h-[200px] overflow-y-auto">
            <p className="font-sans text-text-primary whitespace-pre-wrap break-words text-sm">
              {formatted}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="w-full rounded-[var(--radius-card)] bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      )}

      {/* Tips */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
        <p className="text-text-secondary text-sm font-medium mb-2">
          Instagram Tips
        </p>
        <ul className="text-text-secondary text-sm space-y-1">
          <li>• Maximum 2,200 characters per caption</li>
          <li>• Use up to 30 hashtags for maximum reach</li>
          <li>• Add line breaks for better readability</li>
          <li>• Tag people with @ for notifications</li>
          <li>• Place hashtags at end or in first comment</li>
        </ul>
      </div>
    </div>
  );
}
