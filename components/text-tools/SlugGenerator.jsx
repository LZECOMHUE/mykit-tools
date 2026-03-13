'use client';

import { useState, useMemo } from 'react';

export default function SlugGenerator() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState('hyphen');
  const [maxLength, setMaxLength] = useState('');
  const [transliterate, setTransliterate] = useState(true);

  const slug = useMemo(() => {
    if (!input.trim()) return '';

    let text = input.trim().toLowerCase();

    // Transliterate common accented characters
    if (transliterate) {
      const accents = {
        á: 'a', à: 'a', ä: 'a', â: 'a', å: 'a',
        é: 'e', è: 'e', ë: 'e', ê: 'e',
        í: 'i', ì: 'i', ï: 'i', î: 'i',
        ó: 'o', ò: 'o', ö: 'o', ô: 'o', ø: 'o',
        ú: 'u', ù: 'u', ü: 'u', û: 'u',
        ç: 'c', ñ: 'n',
        ß: 'ss', æ: 'ae', œ: 'oe'
      };

      text = text.split('').map(char => accents[char] || char).join('');
    }

    // Replace spaces and underscores with the chosen separator
    const sep = separator === 'hyphen' ? '-' : '_';
    text = text.replace(/[\s_-]+/g, sep);

    // Remove special characters, keep only alphanumeric and separator
    text = text.replace(new RegExp(`[^a-z0-9${sep}]`, 'g'), '');

    // Remove leading/trailing separators
    text = text.replace(new RegExp(`^${sep}+|${sep}+$`, 'g'), '');

    // Remove consecutive separators
    text = text.replace(new RegExp(`${sep}{2,}`, 'g'), sep);

    // Apply max length
    if (maxLength && !isNaN(maxLength)) {
      text = text.substring(0, parseInt(maxLength));
      // Remove trailing separator if length limit cut it off
      text = text.replace(new RegExp(`${sep}+$`), '');
    }

    return text;
  }, [input, separator, maxLength, transliterate]);

  const handleCopySlug = async () => {
    try {
      await navigator.clipboard.writeText(slug);
    } catch (err) {
      console.error('Failed to copy slug:', err);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Input */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          Title or Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your title or text here..."
          className="w-full mt-2 min-h-[100px] rounded-[var(--radius-input)] border border-border bg-white p-3 font-sans text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </div>

      {/* Options */}
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Separator */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Separator
          </label>
          <select
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="hyphen">Hyphen (-)</option>
            <option value="underscore">Underscore (_)</option>
          </select>
        </div>

        {/* Max Length */}
        <div>
          <label className="text-text-secondary text-sm font-medium">
            Max Length
          </label>
          <input
            type="number"
            value={maxLength}
            onChange={(e) => setMaxLength(e.target.value)}
            placeholder="No limit"
            min="1"
            className="w-full mt-2 rounded-[var(--radius-input)] border border-border bg-white px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Transliterate Toggle */}
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={transliterate}
              onChange={(e) => setTransliterate(e.target.checked)}
              className="w-4 h-4 rounded accent-accent"
            />
            <span className="text-text-secondary text-sm font-medium">
              Transliterate Accents
            </span>
          </label>
        </div>
      </div>

      {/* Output */}
      {slug && (
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
          <p className="text-text-secondary text-sm font-medium mb-2">
            Your Slug
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 font-mono text-text-primary break-all">
              {slug}
            </code>
            <button
              onClick={handleCopySlug}
              className="shrink-0 rounded-[var(--radius-card)] bg-accent text-white px-3 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="mt-2 text-[11px] text-text-muted">
            Length: <span className="font-mono">{slug.length}</span> characters
          </p>
        </div>
      )}
    </div>
  );
}
