'use client';

import { useState, useMemo } from 'react';

const QUICK_PATTERNS = {
  email: {
    label: 'Email Address',
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
  url: {
    label: 'URL',
    pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$',
  },
  phone: {
    label: 'Phone (US Format)',
    pattern: '^\\+?1?\\d{9,15}$',
  },
  ip: {
    label: 'IP Address',
    pattern: '^((25[0-5]|(2[0-4]|1\\d)?\\d)\\.?\\b){4}$',
  },
  date: {
    label: 'Date (YYYY-MM-DD)',
    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
  },
  hex_color: {
    label: 'Hex Color',
    pattern: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$',
  },
  username: {
    label: 'Username (alphanumeric, 3-20 chars)',
    pattern: '^[a-zA-Z0-9_]{3,20}$',
  },
  password: {
    label: 'Strong Password',
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
  },
};

export default function RegexTester() {
  const [pattern, setPattern] = useState('\\b[a-zA-Z]+\\b');
  const [testString, setTestString] = useState('The quick brown fox jumps over the lazy dog');
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [copied, setCopied] = useState(false);

  const { regex, matches, error } = useMemo(() => {
    try {
      const flagStr = Object.entries(flags)
        .filter(([_, enabled]) => enabled)
        .map(([flag]) => flag)
        .join('');

      const regex = new RegExp(pattern, flagStr);
      const allMatches = [];

      if (flags.g) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          allMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          allMatches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      return { regex, matches: allMatches, error: null };
    } catch (e) {
      return { regex: null, matches: [], error: e.message };
    }
  }, [pattern, testString, flags]);

  const highlightedText = useMemo(() => {
    if (error || matches.length === 0) return testString;

    let result = testString;
    const offsets = [];

    matches.forEach(match => {
      offsets.push({ start: match.index, end: match.index + match.text.length });
    });

    offsets.sort((a, b) => b.start - a.start);

    offsets.forEach(({ start, end }) => {
      result =
        result.slice(0, start) +
        `<span class="bg-yellow-200 font-semibold text-text-primary">${result.slice(start, end)}</span>` +
        result.slice(end);
    });

    return result;
  }, [testString, matches, error]);

  const handleToggleFlag = flag => {
    setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
  };

  const handleQuickPattern = patternKey => {
    setPattern(QUICK_PATTERNS[patternKey].pattern);
  };

  const handleCopy = () => {
    const content = `Pattern: ${pattern}\nFlags: ${Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('')}\n\nMatches: ${matches.length}`;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Quick Patterns */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <h3 className="text-sm font-semibold text-text-secondary mb-3">Quick Patterns</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(QUICK_PATTERNS).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => handleQuickPattern(key)}
              className="px-3 py-2 text-xs bg-white border border-border rounded-[var(--radius-input)] text-text-primary hover:border-accent hover:bg-accent hover:text-white transition-colors"
              title={label}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Pattern Input */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Regular Expression Pattern
        </label>
        <input
          type="text"
          value={pattern}
          onChange={e => setPattern(e.target.value)}
          placeholder="Enter regex pattern..."
          className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] font-mono text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />

        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-[var(--radius-input)] text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Flags */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Flags</h3>
        <div className="flex gap-4">
          {[
            { flag: 'g', label: 'Global (g) - Find all matches' },
            { flag: 'i', label: 'Case-insensitive (i)' },
            { flag: 'm', label: 'Multiline (m)' },
            { flag: 's', label: 'Dot matches all (s)' },
          ].map(({ flag, label }) => (
            <label key={flag} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={flags[flag]}
                onChange={() => handleToggleFlag(flag)}
                className="w-4 h-4"
              />
              <span className="text-sm text-text-primary">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Test String */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Test String
        </label>
        <textarea
          value={testString}
          onChange={e => setTestString(e.target.value)}
          placeholder="Enter text to test against..."
          rows="5"
          className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] font-mono text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Results */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Matches: <span className="text-accent font-mono-num">{matches.length}</span>
          </h3>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] text-sm font-medium hover:bg-opacity-90"
          >
            {copied ? '✓ Copied' : 'Copy Results'}
          </button>
        </div>

        {/* Highlighted Text */}
        <div className="mb-6 p-4 bg-white border border-border rounded-[var(--radius-input)]">
          <div className="text-sm text-text-secondary mb-2">Highlighted Matches:</div>
          <div
            className="font-mono text-sm text-text-primary whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        </div>

        {/* Match Details */}
        {matches.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-semibold text-text-primary">Match Details:</div>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {matches.map((match, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border border-border rounded-[var(--radius-input)] text-sm font-mono"
                >
                  <div className="text-text-secondary">
                    Match {idx + 1} at index <span className="text-accent">{match.index}</span>:
                  </div>
                  <div className="text-text-primary font-semibold mt-1">
                    "{match.text}"
                  </div>
                  {match.groups.length > 0 && (
                    <div className="mt-2 text-text-secondary text-xs">
                      <div>Captured groups:</div>
                      {match.groups.map((group, gIdx) => (
                        <div key={gIdx} className="ml-4">
                          Group {gIdx + 1}: "{group || ''}"
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!error && matches.length === 0 && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-[var(--radius-input)] text-blue-700 text-sm">
            No matches found. Try adjusting your pattern or test string.
          </div>
        )}
      </div>
    </div>
  );
}
