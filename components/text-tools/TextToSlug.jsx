'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Toggle from '@/components/ui/Toggle';

export default function TextToSlug() {
  const [text, setText] = useState('');
  const [separator, setSeparator] = useState('hyphen');
  const [lowercase, setLowercase] = useState(true);
  const [stripSpecial, setStripSpecial] = useState(true);

  const slug = useMemo(() => {
    let result = text;

    if (lowercase) {
      result = result.toLowerCase();
    }

    if (stripSpecial) {
      // Remove special characters, keep only alphanumeric, spaces, and hyphens/underscores
      result = result.replace(/[^\w\s-]/g, '');
    }

    // Trim whitespace
    result = result.trim();

    // Replace spaces with separator
    const sep = separator === 'hyphen' ? '-' : separator === 'underscore' ? '_' : '';
    result = result.replace(/\s+/g, sep);

    // Remove duplicate separators
    if (sep) {
      const escapedSep = sep === '-' ? '\\-' : '_';
      result = result.replace(new RegExp(`${escapedSep}{2,}`, 'g'), sep);
    }

    return result;
  }, [text, separator, lowercase, stripSpecial]);

  const handleCopy = () => {
    navigator.clipboard.writeText(slug).catch(() => {});
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Enter Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text to convert to slug..."
          className="w-full min-h-[100px] px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10 resize-vertical"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Separator
          </label>
          <Select
            value={separator}
            onChange={setSeparator}
            options={[
              { value: 'hyphen', label: 'Hyphen (-) [default]' },
              { value: 'underscore', label: 'Underscore (_)' },
              { value: 'none', label: 'None (no separator)' },
            ]}
          />
        </div>

        <div className="flex flex-col space-y-3">
          <Toggle
            label="Lowercase"
            checked={lowercase}
            onChange={setLowercase}
          />
          <Toggle
            label="Strip Special Characters"
            checked={stripSpecial}
            onChange={setStripSpecial}
          />
        </div>
      </div>

      <div className="bg-surface border border-border rounded-[var(--radius-card)]">
        <p className="text-text-secondary text-sm mb-3">URL-friendly slug:</p>
        <div className="flex items-center gap-3">
          <code className="flex-1 font-mono text-text-primary bg-white border border-border rounded-[var(--radius-input)] px-4 py-3 break-all">
            {slug || '(empty)'}
          </code>
          <Button
            onClick={handleCopy}
            disabled={!slug}
            className="flex-shrink-0"
          >
            Copy
          </Button>
        </div>
      </div>

      <div className="text-sm text-text-muted">
        <p>This tool converts text into URL-friendly slugs suitable for web addresses and file names.</p>
      </div>
    </div>
  );
}
