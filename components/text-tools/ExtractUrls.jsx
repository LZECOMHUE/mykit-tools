'use client';

import { useState, useMemo, useCallback } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const URL_REGEX = /(?:https?:\/\/|www\.)[a-zA-Z0-9][-a-zA-Z0-9@:%._+~#=]{0,255}\.[a-z]{2,63}\b[-a-zA-Z0-9@:%_+.~#?&/=]*/gi;

export default function ExtractUrls() {
  const [text, setText] = useState('');
  const [removeDuplicates, setRemoveDuplicates] = useState(true);
  const [sortAlpha, setSortAlpha] = useState(false);
  const [copied, setCopied] = useState('');

  const urls = useMemo(() => {
    const matches = text.match(URL_REGEX) || [];
    // Normalise www. URLs to include https://
    const normalised = matches.map((u) =>
      u.startsWith('www.') ? `https://${u}` : u
    );
    let result = removeDuplicates ? [...new Set(normalised)] : normalised;
    if (sortAlpha) result = [...result].sort((a, b) => a.localeCompare(b));
    return result;
  }, [text, removeDuplicates, sortAlpha]);

  const highlightedText = useMemo(() => {
    if (!text) return '';
    // HTML-escape the input first to prevent XSS, then highlight URLs
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    return escaped.replace(
      URL_REGEX,
      (match) => `<mark class="bg-blue-100 text-accent rounded px-0.5">${match}</mark>`
    );
  }, [text]);

  const copyToClipboard = useCallback((content, label) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(''), 1500);
    }).catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      {/* Options */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setRemoveDuplicates(!removeDuplicates)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            removeDuplicates
              ? 'bg-accent text-white'
              : 'bg-surface text-text-secondary border border-border'
          }`}
        >
          Remove duplicates
        </button>
        <button
          onClick={() => setSortAlpha(!sortAlpha)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            sortAlpha
              ? 'bg-accent text-white'
              : 'bg-surface text-text-secondary border border-border'
          }`}
        >
          Sort A-Z
        </button>
      </div>

      {/* Input */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">
          Paste any text containing URLs
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste web page content, emails, documents, or any text with URLs..."
          rows={5}
          className="w-full bg-white border border-border rounded-[var(--radius-input)] px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y"
        />
      </div>

      {/* Results */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            {urls.length > 0
              ? `Found ${urls.length} URL${urls.length !== 1 ? 's' : ''}`
              : 'No URLs found'}
          </h3>
          {urls.length > 0 && (
            <Button
              size="sm"
              onClick={() => copyToClipboard(urls.join('\n'), 'all')}
            >
              {copied === 'all' ? 'Copied!' : 'Copy All'}
            </Button>
          )}
        </div>

        {urls.length > 0 ? (
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {urls.map((url, i) => (
              <div
                key={`${url}-${i}`}
                className="flex items-center justify-between group px-2 py-1.5 rounded hover:bg-surface transition-colors gap-2"
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-accent hover:underline truncate min-w-0"
                  title={url}
                >
                  {url}
                </a>
                <button
                  onClick={() => copyToClipboard(url, `single-${i}`)}
                  className="text-xs text-text-muted hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  {copied === `single-${i}` ? 'Copied!' : 'Copy'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-text-muted py-4 text-center">
            Paste text above to extract URLs automatically.
          </p>
        )}
      </Card>

      {/* Highlighted preview */}
      {text && urls.length > 0 && (
        <Card>
          <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">
            Highlighted in text
          </h3>
          <div
            className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap break-all max-h-48 overflow-y-auto"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </Card>
      )}
    </div>
  );
}
