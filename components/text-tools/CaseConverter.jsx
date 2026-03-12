'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function CaseConverter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const conversions = {
    uppercase: (str) => str.toUpperCase(),
    lowercase: (str) => str.toLowerCase(),
    titlecase: (str) =>
      str.replace(/\b\w/g, (char) => char.toUpperCase()),
    sentencecase: (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
    camelcase: (str) =>
      str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
          index === 0 ? word.toLowerCase() : word.toUpperCase()
        )
        .replace(/\s+/g, ''),
    pascalcase: (str) =>
      str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
        .replace(/\s+/g, ''),
    snakecase: (str) =>
      str.toLowerCase().replace(/\s+/g, '_').replace(/[^\w_]/g, ''),
    kebabcase: (str) =>
      str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
    constantcase: (str) =>
      str.toUpperCase().replace(/\s+/g, '_').replace(/[^\w_]/g, ''),
    dotcase: (str) =>
      str.toLowerCase().replace(/\s+/g, '.').replace(/[^\w.]/g, ''),
  };

  const handleConvert = (conversionType) => {
    const converted = conversions[conversionType](input);
    setOutput(converted);
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Input Text
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert..."
          className="w-full h-32 p-4 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
        />
        <p className="text-xs text-text-muted">
          Characters: <span className="font-mono-num">{input.length}</span>
        </p>
      </div>

      {/* Conversion Buttons */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-text-primary">Convert to:</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {[
            { key: 'uppercase', label: 'UPPERCASE' },
            { key: 'lowercase', label: 'lowercase' },
            { key: 'titlecase', label: 'Title Case' },
            { key: 'sentencecase', label: 'Sentence case' },
            { key: 'camelcase', label: 'camelCase' },
            { key: 'pascalcase', label: 'PascalCase' },
            { key: 'snakecase', label: 'snake_case' },
            { key: 'kebabcase', label: 'kebab-case' },
            { key: 'constantcase', label: 'CONSTANT_CASE' },
            { key: 'dotcase', label: 'dot.case' },
          ].map((conversion) => (
            <Button
              key={conversion.key}
              onClick={() => handleConvert(conversion.key)}
              variant="secondary"
              className="text-xs sm:text-sm"
            >
              {conversion.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Output Section */}
      {output && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-text-primary">
            Output
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 p-4 border border-border rounded-[var(--radius-input)] bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-text-muted">
              Characters: <span className="font-mono-num">{output.length}</span>
            </p>
            <Button onClick={handleCopy} className="text-sm">
              Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
