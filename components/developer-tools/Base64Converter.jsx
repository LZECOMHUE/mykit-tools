'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

export default function Base64Converter() {
  const [plainText, setPlainText] = useState('');
  const [base64Text, setBase64Text] = useState('');
  const [autoMode, setAutoMode] = useState(true);
  const [error, setError] = useState(null);

  // Auto-convert when either side changes
  useMemo(() => {
    try {
      setError(null);

      if (autoMode) {
        if (plainText) {
          // Encode plain text to base64
          const encoded = btoa(unescape(encodeURIComponent(plainText)));
          setBase64Text(encoded);
        } else {
          setBase64Text('');
        }
      }
    } catch (err) {
      setError(`Error encoding: ${err.message}`);
    }
  }, [plainText, autoMode]);

  useMemo(() => {
    try {
      if (autoMode && base64Text) {
        // Only auto-decode if we're not actively typing in base64
        // This prevents feedback loops
        try {
          const decoded = decodeURIComponent(escape(atob(base64Text)));
          if (decoded !== plainText) {
            setPlainText(decoded);
          }
        } catch {
          // Invalid base64 during typing, don't show error
        }
      }
    } catch (err) {
      // Silently fail during typing
    }
  }, [base64Text, autoMode]);

  const handleEncodeManual = () => {
    try {
      setError(null);
      const encoded = btoa(unescape(encodeURIComponent(plainText)));
      setBase64Text(encoded);
    } catch (err) {
      setError(`Error encoding: ${err.message}`);
    }
  };

  const handleDecodeManual = () => {
    try {
      setError(null);
      const decoded = decodeURIComponent(escape(atob(base64Text)));
      setPlainText(decoded);
    } catch (err) {
      setError(`Error decoding: ${err.message}`);
    }
  };

  const handleCopyPlainText = () => {
    navigator.clipboard.writeText(plainText);
  };

  const handleCopyBase64 = () => {
    navigator.clipboard.writeText(base64Text);
  };

  return (
    <div className="w-full space-y-6">
      {/* Auto Mode Toggle */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={autoMode}
            onChange={(e) => setAutoMode(e.target.checked)}
            className="w-4 h-4 rounded border-border cursor-pointer"
          />
          <span className="text-sm text-text-secondary">
            Auto-convert as I type
          </span>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-[--radius-card] bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Plain Text Side */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Plain Text
          </label>
          <textarea
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            placeholder="Enter text to encode..."
            className="w-full h-48 p-4 rounded-[--radius-input] border border-border bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleEncodeManual}
              disabled={autoMode}
              size="sm"
            >
              Encode
            </Button>
            <Button
              onClick={handleCopyPlainText}
              variant="secondary"
              size="sm"
            >
              Copy
            </Button>
          </div>
        </div>

        {/* Base64 Side */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Base64
          </label>
          <textarea
            value={base64Text}
            onChange={(e) => setBase64Text(e.target.value)}
            placeholder="Enter Base64 to decode..."
            className="w-full h-48 p-4 rounded-[--radius-input] border border-border bg-surface text-text-primary font-mono-num text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
          />
          <div className="flex gap-2">
            <Button
              onClick={handleDecodeManual}
              disabled={autoMode}
              size="sm"
            >
              Decode
            </Button>
            <Button
              onClick={handleCopyBase64}
              variant="secondary"
              size="sm"
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
