'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Toggle from '@/components/ui/Toggle';

export default function FindAndReplace() {
  const [text, setText] = useState('');
  const [findTerm, setFindTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [regexMode, setRegexMode] = useState(false);
  const [preview, setPreview] = useState(false);

  const { matchCount, highlightedText, replacedText } = useMemo(() => {
    if (!findTerm) {
      return { matchCount: 0, highlightedText: text, replacedText: text };
    }

    try {
      let pattern;
      let flags = caseSensitive ? 'g' : 'gi';

      if (regexMode) {
        pattern = new RegExp(findTerm, flags);
      } else {
        let escaped = findTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        if (wholeWord) {
          escaped = `\\b${escaped}\\b`;
        }
        pattern = new RegExp(escaped, flags);
      }

      const matches = text.match(pattern) || [];
      const highlighted = text.replace(pattern, (match) => {
        return `<mark>${match}</mark>`;
      });

      const replaced = text.replace(pattern, replaceTerm);

      return {
        matchCount: matches.length,
        highlightedText: highlighted,
        replacedText: replaced,
      };
    } catch (error) {
      return { matchCount: 0, highlightedText: text, replacedText: text };
    }
  }, [text, findTerm, replaceTerm, caseSensitive, wholeWord, regexMode]);

  const handleReplaceAll = () => {
    setText(replacedText);
    setFindTerm('');
    setReplaceTerm('');
    setPreview(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(preview ? replacedText : text);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Original Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text here..."
          className="w-full min-h-[150px] px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10 resize-vertical"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Find
          </label>
          <Input
            value={findTerm}
            onChange={(e) => setFindTerm(e.target.value)}
            placeholder="Term to find..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Replace With
          </label>
          <Input
            value={replaceTerm}
            onChange={(e) => setReplaceTerm(e.target.value)}
            placeholder="Replacement term..."
          />
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <Toggle
          label="Case Sensitive"
          checked={caseSensitive}
          onChange={setCaseSensitive}
          disabled={regexMode}
        />
        <Toggle
          label="Whole Word Only"
          checked={wholeWord}
          onChange={setWholeWord}
          disabled={regexMode}
        />
        <Toggle
          label="Regex Mode (Advanced)"
          checked={regexMode}
          onChange={setRegexMode}
        />
      </div>

      {findTerm && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
          <p className="text-text-secondary text-sm">
            Found <span className="font-mono font-semibold text-text-primary">{matchCount}</span> match{matchCount !== 1 ? 'es' : ''}
          </p>
        </div>
      )}

      {findTerm && (
        <div className="flex gap-2">
          <Button
            onClick={() => setPreview(!preview)}
            variant="secondary"
            className="flex-1"
          >
            {preview ? 'Hide Preview' : 'Show Preview'}
          </Button>
          <Button
            onClick={handleReplaceAll}
            disabled={matchCount === 0}
            className="flex-1"
          >
            Replace All
          </Button>
        </div>
      )}

      {preview && findTerm && matchCount > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
          <p className="text-sm font-medium text-text-secondary">Preview of replacements:</p>
          <div
            className="bg-white border border-border rounded-[var(--radius-input)] px-4 py-3 text-sm whitespace-pre-wrap break-words font-mono max-h-[300px] overflow-y-auto"
            dangerouslySetInnerHTML={{
              __html: replacedText.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
            }}
          />
          <Button onClick={handleCopy} className="w-full">
            Copy Result
          </Button>
        </div>
      )}

      {!preview && text && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
          <p className="text-sm font-medium text-text-secondary">Current text:</p>
          <textarea
            value={text}
            readOnly
            className="w-full min-h-[200px] px-4 py-3 font-mono text-sm text-text-primary bg-white border border-border rounded-[var(--radius-input)] resize-vertical"
          />
          <Button onClick={handleCopy} className="w-full">
            Copy Text
          </Button>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Find and replace text with support for regex patterns.</p>
      </div>
    </div>
  );
}
