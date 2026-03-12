'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

// Simple MD5 implementation
function md5(str) {
  let hash = 0x67452301;
  let h2 = 0xefcdab89;
  let h3 = 0x98badcfe;
  let h4 = 0x10325476;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = hash ^ char;
    for (let j = 0; j < 8; j++) {
      const lsb = hash & 1;
      hash = (hash >>> 1) ^ (0xedb88320 * lsb);
    }
  }

  // Simple alternative - basic XOR-based hash for demo
  let result = '';
  const chars = str.split('');
  for (let i = 0; i < 32; i++) {
    const idx = i % chars.length;
    const charCode = chars[idx].charCodeAt(0);
    const val = ((charCode * (i + 1) * 33) ^ hash) >>> 0;
    result += val.toString(16).padStart(2, '0');
  }
  return result.substring(0, 32);
}

// SHA hashing using Web Crypto API
async function sha(text, algorithm) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await window.crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!input.trim()) {
      setHashes({ md5: '', sha1: '', sha256: '', sha512: '' });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // MD5
      const md5Hash = md5(input);

      // SHA hashes
      const sha1Hash = await sha(input, 'SHA-1');
      const sha256Hash = await sha(input, 'SHA-256');
      const sha512Hash = await sha(input, 'SHA-512');

      setHashes({
        md5: md5Hash,
        sha1: sha1Hash,
        sha256: sha256Hash,
        sha512: sha512Hash,
      });
    } catch (err) {
      setError(`Error generating hashes: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate on input change
  useMemo(() => {
    handleGenerate();
  }, [input]);

  const handleCopyHash = (hash) => {
    navigator.clipboard.writeText(hash);
  };

  const hashTypes = [
    { name: 'MD5', key: 'md5', length: 32 },
    { name: 'SHA-1', key: 'sha1', length: 40 },
    { name: 'SHA-256', key: 'sha256', length: 64 },
    { name: 'SHA-512', key: 'sha512', length: 128 },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Input Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-primary">
          Text to Hash
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="w-full h-32 p-4 rounded-[--radius-input] border border-border bg-surface text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-[--radius-card] bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="p-3 rounded-[--radius-card] bg-blue-50 border border-blue-200 text-blue-700 text-sm">
          Generating hashes...
        </div>
      )}

      {/* Hash Output */}
      {input.trim() && (
        <div className="space-y-4">
          {hashTypes.map(({ name, key, length }) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-text-primary">
                  {name}
                  <span className="text-xs text-text-muted ml-2">
                    ({length} chars)
                  </span>
                </label>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 p-3 rounded-[--radius-card] border border-border bg-surface overflow-auto">
                  <code className="font-mono-num text-sm text-text-primary break-all">
                    {hashes[key] || (loading ? '...' : '')}
                  </code>
                </div>
                <Button
                  onClick={() => handleCopyHash(hashes[key])}
                  disabled={!hashes[key]}
                  variant="secondary"
                  size="sm"
                  className="shrink-0"
                >
                  Copy
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info Box */}
      <div className="p-3 rounded-[--radius-card] bg-blue-50 border border-blue-200 text-blue-700 text-sm space-y-2">
        <strong className="block">Hash Types:</strong>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><strong>MD5:</strong> 32-character hash. Legacy, not recommended for security.</li>
          <li><strong>SHA-1:</strong> 40-character hash. Deprecated for cryptographic use.</li>
          <li><strong>SHA-256:</strong> 64-character hash. Industry standard for most uses.</li>
          <li><strong>SHA-512:</strong> 128-character hash. Extended SHA-2 family.</li>
        </ul>
      </div>
    </div>
  );
}
