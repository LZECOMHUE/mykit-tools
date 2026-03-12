'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

// Fallback UUID v4 generator for browsers without crypto.randomUUID
function generateUUIDv4() {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  // Fallback using getRandomValues
  const arr = new Uint8Array(16);
  window.crypto.getRandomValues(arr);

  arr[6] = (arr[6] & 0x0f) | 0x40;
  arr[8] = (arr[8] & 0x3f) | 0x80;

  const hex = Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20)}`;
}

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState(['']);
  const [quantity, setQuantity] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [includeHyphens, setIncludeHyphens] = useState(true);

  const handleGenerateSingle = () => {
    let uuid = generateUUIDv4();
    if (!includeHyphens) {
      uuid = uuid.replace(/-/g, '');
    }
    if (uppercase) {
      uuid = uuid.toUpperCase();
    }
    setUuids([uuid]);
  };

  const handleGenerateMultiple = () => {
    const generated = [];
    for (let i = 0; i < quantity; i++) {
      let uuid = generateUUIDv4();
      if (!includeHyphens) {
        uuid = uuid.replace(/-/g, '');
      }
      if (uppercase) {
        uuid = uuid.toUpperCase();
      }
      generated.push(uuid);
    }
    setUuids(generated);
  };

  const handleCopySingle = () => {
    navigator.clipboard.writeText(uuids[0] || '');
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <div className="w-full space-y-6">
      {/* Options Section */}
      <div className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Quantity */}
          <div className="space-y-2">
            <label htmlFor="quantity" className="block text-sm font-medium text-text-primary">
              Generate Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={100}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-full px-3 py-2 rounded-[--radius-input] border border-border bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
            <p className="text-xs text-text-muted">1-100 UUIDs</p>
          </div>

          {/* Uppercase */}
          <div className="space-y-2">
            <label htmlFor="uppercase" className="block text-sm font-medium text-text-primary">
              Format
            </label>
            <label className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-[--radius-input] border border-border bg-surface hover:bg-surface-hover">
              <input
                id="uppercase"
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-sm text-text-primary">Uppercase</span>
            </label>
          </div>

          {/* Hyphens */}
          <div className="space-y-2">
            <label htmlFor="hyphens" className="block text-sm font-medium text-text-primary">
              Format
            </label>
            <label className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-[--radius-input] border border-border bg-surface hover:bg-surface-hover">
              <input
                id="hyphens"
                type="checkbox"
                checked={includeHyphens}
                onChange={(e) => setIncludeHyphens(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer"
              />
              <span className="text-sm text-text-primary">With hyphens</span>
            </label>
          </div>
        </div>
      </div>

      {/* Generate Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button onClick={handleGenerateSingle} size="sm">
          Generate 1
        </Button>
        {quantity > 1 && (
          <Button onClick={handleGenerateMultiple} size="sm">
            Generate {quantity}
          </Button>
        )}
      </div>

      {/* Single UUID Display (if only 1) */}
      {uuids.length === 1 && uuids[0] && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Generated UUID
          </label>
          <div className="p-4 rounded-[--radius-card] border border-border bg-surface">
            <p className="font-mono-num text-2xl font-semibold text-accent break-all">
              {uuids[0]}
            </p>
          </div>
          <Button
            onClick={handleCopySingle}
            variant="secondary"
            size="sm"
          >
            Copy UUID
          </Button>
        </div>
      )}

      {/* Multiple UUIDs Display */}
      {uuids.length > 1 && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Generated UUIDs ({uuids.length})
          </label>
          <div className="p-4 rounded-[--radius-input] border border-border bg-surface max-h-96 overflow-auto">
            <pre className="font-mono-num text-sm text-text-primary">
              {uuids.join('\n')}
            </pre>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleCopyAll}
              variant="secondary"
              size="sm"
            >
              Copy All ({uuids.length})
            </Button>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="p-3 rounded-[--radius-card] bg-blue-50 border border-blue-200 text-blue-700 text-sm">
        <strong className="block mb-1">UUID v4</strong>
        <p>Randomly generated universally unique identifier. Standard format: 8-4-4-4-12 hexadecimal digits.</p>
      </div>
    </div>
  );
}
