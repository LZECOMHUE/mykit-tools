'use client';

import { useState, useMemo } from 'react';

function decodeJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { error: 'Invalid JWT: must have 3 parts (header.payload.signature)' };
    }

    // Decode header
    const headerJson = JSON.parse(atob(parts[0]));

    // Decode payload
    const payloadJson = JSON.parse(atob(parts[1]));

    // Check expiry
    let isExpired = false;
    let expiresIn = '';
    if (payloadJson.exp) {
      const expiryDate = new Date(payloadJson.exp * 1000);
      const now = new Date();
      isExpired = expiryDate < now;
      const diffMs = expiryDate - now;
      if (isExpired) {
        expiresIn = `Expired ${Math.floor(Math.abs(diffMs) / 1000)} seconds ago`;
      } else {
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        expiresIn = days > 0
          ? `${days}d ${hours}h`
          : hours > 0
          ? `${hours}h ${mins}m`
          : `${mins}m`;
      }
    }

    return {
      header: headerJson,
      payload: payloadJson,
      signature: parts[2].substring(0, 20) + '...',
      isExpired,
      expiresIn,
      algorithm: headerJson.alg || 'unknown'
    };
  } catch (err) {
    return { error: `Failed to decode: ${err.message}` };
  }
}

export default function JWTDecoder() {
  const [token, setToken] = useState('');

  const decoded = useMemo(() => decodeJWT(token), [token]);

  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(token);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Input */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          Paste JWT Token
        </label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT token here (header.payload.signature)..."
          className="w-full mt-2 min-h-[100px] rounded-[var(--radius-input)] border border-border bg-white p-3 font-mono text-[12px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </div>

      {/* Decoding Result */}
      {token.trim() && (
        <>
          {decoded.error ? (
            <div className="rounded-[var(--radius-card)] border border-error bg-red-50 p-4">
              <p className="text-error text-sm font-medium">{decoded.error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Status */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
                  <p className="text-text-secondary text-[11px] font-medium uppercase">
                    Algorithm
                  </p>
                  <p className="font-mono text-text-primary mt-1">
                    {decoded.algorithm}
                  </p>
                </div>
                <div
                  className={`rounded-[var(--radius-card)] border p-3 ${
                    decoded.isExpired
                      ? 'bg-red-50 border-error'
                      : 'bg-surface border-border'
                  }`}
                >
                  <p className="text-[11px] font-medium uppercase">
                    {decoded.isExpired ? 'Status' : 'Expires In'}
                  </p>
                  <p className={`font-mono mt-1 ${decoded.isExpired ? 'text-error' : 'text-text-primary'}`}>
                    {decoded.isExpired ? 'Expired' : decoded.expiresIn || 'No expiry'}
                  </p>
                </div>
              </div>

              {/* Header */}
              <div className="rounded-[var(--radius-card)] bg-blue-50 border border-accent p-4">
                <p className="text-text-secondary text-sm font-medium mb-2">
                  Header
                </p>
                <pre className="font-mono text-[12px] text-text-primary overflow-x-auto">
                  {JSON.stringify(decoded.header, null, 2)}
                </pre>
              </div>

              {/* Payload */}
              <div className="rounded-[var(--radius-card)] bg-green-50 border border-success p-4">
                <p className="text-text-secondary text-sm font-medium mb-2">
                  Payload
                </p>
                <pre className="font-mono text-[12px] text-text-primary overflow-x-auto">
                  {JSON.stringify(decoded.payload, null, 2)}
                </pre>
              </div>

              {/* Signature */}
              <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
                <p className="text-text-secondary text-sm font-medium mb-2">
                  Signature (truncated)
                </p>
                <code className="font-mono text-[12px] text-text-primary break-all">
                  {decoded.signature}
                </code>
              </div>

              {/* Note */}
              <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3">
                <p className="text-text-secondary text-[11px]">
                  Note: This tool decodes the JWT but does not verify the signature. Use only for development purposes.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Info */}
      {!token.trim() && (
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
          <p className="text-text-secondary text-sm font-medium mb-2">
            What is JWT?
          </p>
          <p className="text-text-secondary text-[13px] mb-2">
            JSON Web Token (JWT) is a compact token format with three parts separated by dots:
          </p>
          <ul className="text-text-secondary text-[13px] space-y-1">
            <li>1. Header: Token type and hashing algorithm</li>
            <li>2. Payload: Data claims (user info, permissions, etc.)</li>
            <li>3. Signature: Cryptographic hash for verification</li>
          </ul>
        </div>
      )}
    </div>
  );
}
