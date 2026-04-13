'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function FindAndReplace() {
  const [text, setText] = useState('');
  const [findTerm, setFindTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [regexMode, setRegexMode] = useState(false);
  const [copied, setCopied] = useState(false);

  const { matchCount, replacedText } = useMemo(() => {
    if (!findTerm) return { matchCount: 0, replacedText: text };

    try {
      let flags = caseSensitive ? 'g' : 'gi';
      let pattern;

      if (regexMode) {
        pattern = new RegExp(findTerm, flags);
      } else {
        let escaped = findTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (wholeWord) escaped = `\\b${escaped}\\b`;
        pattern = new RegExp(escaped, flags);
      }

      const matches = text.match(pattern) || [];
      const replaced = text.replace(pattern, replaceTerm);

      return { matchCount: matches.length, replacedText: replaced };
    } catch {
      return { matchCount: 0, replacedText: text };
    }
  }, [text, findTerm, replaceTerm, caseSensitive, wholeWord, regexMode]);

  const handleReplaceAll = () => {
    setText(replacedText);
    setFindTerm('');
    setReplaceTerm('');
  };

  const handleCopy = async () => {
    const value = findTerm && matchCount > 0 ? replacedText : text;
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-4">
      {/* Find / Replace inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Find</label>
          <Input
            value={findTerm}
            onChange={(e) => setFindTerm(e.target.value)}
            placeholder="Term to find..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Replace with</label>
          <Input
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            placeholder="Replacement term..."
          />
        </div>
      </div>

      {/* Option toggles */}
      <div className="flex items-center gap-4 flex-wrap">
        {[
          { state: caseSensitive, setter: setCaseSensitive, label: 'Case sensitive', disabled: regexMode },
          { state: wholeWord, setter: setWholeWord, label: 'Whole word', disabled: regexMode },
          { state: regexMode, setter: setRegexMode, label: 'Regex mode', disabled: false },
        ].map(({ state, setter, label, disabled }) => (
          <label key={label} className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-40' : ''}`}>
            <input
              type="checkbox"
              checked={state}
              onChange={(e) => setter(e.target.checked)}
              disabled={disabled}
              className="w-4 h-4 rounded border-border accent-accent"
            />
            <span className="text-sm text-text-secondary">{label}</span>
          </label>
        ))}
        {findTerm && (
          <span className="text-sm text-text-muted font-mono ml-auto">
            {matchCount} match{matchCount !== 1 ? 'es' : ''}
          </span>
        )}
      </div>

      {/* Side-by-side text panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Original Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Preview output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">
              Preview{findTerm && matchCount > 0 ? ` (${matchCount} replaced)` : ''}
            </label>
            <div className="flex items-center gap-2">
              {findTerm && matchCount > 0 && (
                <Button variant="secondary" size="sm" onClick={handleReplaceAll}>
                  Apply
                </Button>
              )}
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!text}>
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
          <textarea
            value={findTerm && matchCount > 0 ? replacedText : text}
            readOnly
            placeholder="Preview will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
