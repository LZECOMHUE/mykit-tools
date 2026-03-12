'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

export default function URLEncoder() {
  const [plainText, setPlainText] = useState('');
  const [encodedText, setEncodedText] = useState('');
  const [encodingMode, setEncodingMode] = useState('component'); // 'component' or 'uri'
  const [autoMode, setAutoMode] = useState(true);
  const [error, setError] = useState(null);

  // Auto-convert when plain text changes
  useMemo(() => {
    try {
      setError(null);

      if (autoMode && plainText) {
        const encoded = encodingMode === 'component'
          ? encodeURIComponent(plainText)
          : encodeURI(plainText);
        setEncodedText(encoded);
      } else if (!plainText) {
        setEncodedText('');
      }
    } catch (err) {
      setError(`Error encoding: ${err.message}`);
    }
  }, [plainText, encodingMode, autoMode]);

  // Auto-convert when encoded text changes (decode mode)
  useMemo(() => {
    try {
      if (autoMode && encodedText) {
        try {
          const decoded = decodeURIComponent(encodedText);
          if (decoded !== plainText) {
            setPlainText(decoded);
          }
        } catch {
          // Invalid encoding during typing, don't show error
        }
      }
    } catch (err) {
      // Silently fail during typing
    }
  }, [encodedText, autoMode]);

  const handleEncodeManual = () => {
    try {
      setError(null);
      const encoded = encodingMode === 'component'
        ? encodeURIComponent(plainText)
        : encodeURI(plainText);
      setEncodedText(encoded);
    } catch (err) {
      setError(`Error encoding: ${err.message}`);
    }
  };

  const handleDecodeManual = () => {
    try {
      setError(null);
      const decoded = decodeURIComponent(encodedText);
      setPlainText(decoded);
    } catch (err) {
      setError(`Error decoding: ${err.message}`);
    }
  };

  const handleCopyPlainText = () => {
    navigator.clipboard.writeText(plainText);
  };

  const handleCopyEncoded = () => {
    navigator.clipboard.writeText(encodedText);
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
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

        <div className="flex items-center gap-2">
          <label htmlFor="encoding-mode" className="text-sm text-text-secondary">
            Mode:
          </label>
          <select
            id="encoding-mode"
            value={encodingMode}
            onChange={(e) => setEncodingMode(e.target.value)}
            className="px-3 py-2 rounded-[--radius-input] border border-border bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="component">Query Parameter (encodeURIComponent)</option>
            <option value="uri">Full URL (encodeURI)</option>
          </select>
        </div>
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
            {encodingMode === 'component' ? 'Plain Text / Parameter' : 'Decoded URL'}
          </label>
          <textarea
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            placeholder={encodingMode === 'component' ? 'Enter text to encode...' : 'Enter decoded URL...'}
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

        {/* Encoded Side */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            {encodingMode === 'component' ? 'Encoded' : 'Encoded URL'}
          </label>
          <textarea
            value={encodedText}
            onChange={(e) => setEncodedText(e.target.value)}
            placeholder={encodingMode === 'component' ? 'Encoded text appears here...' : 'Encoded URL appears here...'}
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
              onClick={handleCopyEncoded}
              variant="secondary"
              size="sm"
            >
              Copy
            </Button>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="p-3 rounded-[--radius-card] bg-blue-50 border border-blue-200 text-blue-700 text-sm">
        <strong className="block mb-1">Encoding Modes:</strong>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Query Parameter:</strong> Use for URL query strings and form data. Encodes spaces as %20.</li>
          <li><strong>Full URL:</strong> Use for complete URLs. Preserves URL structure (/,:, etc).</li>
        </ul>
      </div>
    </div>
  );
}
