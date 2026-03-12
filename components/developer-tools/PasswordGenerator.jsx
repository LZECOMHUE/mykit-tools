'use client';

import { useState, useCallback, useEffect } from 'react';

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

const AMBIGUOUS_CHARS = new Set(['0', 'O', 'o', '1', 'l', 'I']);

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });

  // Build the character set based on selected options
  const buildCharset = useCallback(() => {
    let charset = '';
    if (options.uppercase) charset += CHARSETS.uppercase;
    if (options.lowercase) charset += CHARSETS.lowercase;
    if (options.numbers) charset += CHARSETS.numbers;
    if (options.symbols) charset += CHARSETS.symbols;

    if (options.excludeAmbiguous) {
      charset = charset
        .split('')
        .filter(char => !AMBIGUOUS_CHARS.has(char))
        .join('');
    }

    return charset;
  }, [options]);

  // Generate secure password using crypto.getRandomValues()
  const generatePassword = useCallback(() => {
    const charset = buildCharset();

    if (charset.length === 0) {
      setPassword('');
      return;
    }

    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset[randomValues[i] % charset.length];
    }

    setPassword(newPassword);
  }, [length, buildCharset]);

  // Auto-generate on mount and when options change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // Calculate password strength (entropy)
  const calculateStrength = () => {
    const charset = buildCharset();
    if (charset.length === 0) return 0;
    const entropy = Math.log2(charset.length) * length;
    return Math.round(entropy);
  };

  const getStrengthLevel = (entropy) => {
    if (entropy < 40) return { label: 'Weak', color: 'bg-red-500' };
    if (entropy < 60) return { label: 'Fair', color: 'bg-orange-500' };
    if (entropy < 80) return { label: 'Good', color: 'bg-yellow-500' };
    if (entropy < 100) return { label: 'Strong', color: 'bg-green-500' };
    return { label: 'Very Strong', color: 'bg-green-600' };
  };

  const entropy = calculateStrength();
  const strength = getStrengthLevel(entropy);

  // Copy to clipboard
  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Toggle option
  const handleOptionChange = (key) => {
    setOptions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const hasAnyOption = Object.values(options).slice(0, 4).some(v => v);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Password Display Card */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            {password ? (
              <div className="text-lg font-mono-num text-text-primary break-all">
                {password}
              </div>
            ) : (
              <div className="text-text-muted">
                Select at least one character set
              </div>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              disabled={!password}
              className="px-3 py-2 bg-surface border border-border rounded-[var(--radius-input)] text-text-primary text-sm font-medium hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Copy to clipboard"
            >
              {copied ? '✓' : 'Copy'}
            </button>
            <button
              onClick={generatePassword}
              disabled={!hasAnyOption}
              className="px-3 py-2 bg-surface border border-border rounded-[var(--radius-input)] text-text-primary text-sm font-medium hover:bg-surface-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Regenerate password"
            >
              🔄
            </button>
          </div>
        </div>
      </div>

      {/* Length Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-text-primary font-medium">
            Length: <span className="text-accent">{length}</span>
          </label>
        </div>
        <input
          type="range"
          min="8"
          max="128"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-accent"
        />
        <div className="flex justify-between text-text-muted text-sm">
          <span>8</span>
          <span>128</span>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <h3 className="text-text-primary font-medium">Character Sets</h3>
        <div className="space-y-2">
          {[
            { key: 'uppercase', label: 'Uppercase (A-Z)' },
            { key: 'lowercase', label: 'Lowercase (a-z)' },
            { key: 'numbers', label: 'Numbers (0-9)' },
            { key: 'symbols', label: 'Symbols (!@#$%^&*()_+-=[]{}|;:,.<>?)' },
            { key: 'excludeAmbiguous', label: 'Exclude ambiguous (0O, 1lI)' },
          ].map(({ key, label }) => (
            <label
              key={key}
              className="flex items-center gap-3 cursor-pointer p-2 rounded-[var(--radius-input)] hover:bg-surface transition-colors"
            >
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() => handleOptionChange(key)}
                className="w-4 h-4 accent-accent rounded cursor-pointer"
              />
              <span className="text-text-primary text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Strength Meter */}
      {hasAnyOption && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-text-primary font-medium">Strength</label>
            <span className={`text-sm font-medium ${strength.color.replace('bg-', 'text-')}`}>
              {strength.label}
            </span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className={`h-full ${strength.color} transition-all duration-300`}
              style={{ width: `${Math.min((entropy / 120) * 100, 100)}%` }}
            />
          </div>
          <p className="text-text-muted text-xs">
            Entropy: {entropy} bits
          </p>
        </div>
      )}
    </div>
  );
}
