'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';

function vigenereEncrypt(plaintext, key) {
  let ciphertext = '';
  let keyIndex = 0;

  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    const keyChar = key[keyIndex % key.length];

    if (/[a-z]/i.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const charCode = isUpperCase ? char.charCodeAt(0) - 65 : char.charCodeAt(0) - 97;
      const keyCode = keyChar.toUpperCase().charCodeAt(0) - 65;
      const encrypted = (charCode + keyCode) % 26;
      ciphertext += isUpperCase
        ? String.fromCharCode(encrypted + 65)
        : String.fromCharCode(encrypted + 97);
      keyIndex++;
    } else {
      ciphertext += char;
    }
  }

  return ciphertext;
}

function vigenereDecrypt(ciphertext, key) {
  let plaintext = '';
  let keyIndex = 0;

  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    const keyChar = key[keyIndex % key.length];

    if (/[a-z]/i.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const charCode = isUpperCase ? char.charCodeAt(0) - 65 : char.charCodeAt(0) - 97;
      const keyCode = keyChar.toUpperCase().charCodeAt(0) - 65;
      const decrypted = (charCode - keyCode + 26) % 26;
      plaintext += isUpperCase
        ? String.fromCharCode(decrypted + 65)
        : String.fromCharCode(decrypted + 97);
      keyIndex++;
    } else {
      plaintext += char;
    }
  }

  return plaintext;
}

function caesarEncrypt(plaintext, shift) {
  let ciphertext = '';

  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];

    if (/[a-z]/i.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const charCode = isUpperCase ? char.charCodeAt(0) - 65 : char.charCodeAt(0) - 97;
      const encrypted = (charCode + shift) % 26;
      ciphertext += isUpperCase
        ? String.fromCharCode(encrypted + 65)
        : String.fromCharCode(encrypted + 97);
    } else {
      ciphertext += char;
    }
  }

  return ciphertext;
}

function caesarDecrypt(ciphertext, shift) {
  return caesarEncrypt(ciphertext, 26 - shift);
}

export default function TextEncryptionTool() {
  const [mode, setMode] = useState('vigenere');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [vigenereKey, setVigenereKey] = useState('');
  const [caesarShift, setCaesarShift] = useState(3);

  const handleVigenereEncrypt = () => {
    if (!plaintext || !vigenereKey) return;
    setCiphertext(vigenereEncrypt(plaintext, vigenereKey));
  };

  const handleVigenereDecrypt = () => {
    if (!ciphertext || !vigenereKey) return;
    setPlaintext(vigenereDecrypt(ciphertext, vigenereKey));
  };

  const handleCaesarEncrypt = () => {
    if (!plaintext) return;
    setCiphertext(caesarEncrypt(plaintext, parseInt(caesarShift)));
  };

  const handleCaesarDecrypt = () => {
    if (!ciphertext) return;
    setPlaintext(caesarDecrypt(ciphertext, parseInt(caesarShift)));
  };

  const handleCopyPlaintext = () => {
    navigator.clipboard.writeText(plaintext).catch(() => {});
  };

  const handleCopyCiphertext = () => {
    navigator.clipboard.writeText(ciphertext).catch(() => {});
  };

  const tabs = [
    {
      id: 'vigenere',
      label: 'Vigenere Cipher',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Encryption Key
            </label>
            <Input
              type="password"
              value={vigenereKey}
              onChange={(e) => setVigenereKey(e.target.value)}
              placeholder="Enter a passphrase (letters only)"
            />
            <p className="text-xs text-text-muted mt-1">
              Use a memorable passphrase for both encryption and decryption.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleVigenereEncrypt}
              disabled={!plaintext || !vigenereKey}
              className="flex-1"
            >
              Encrypt
            </Button>
            <Button
              onClick={handleVigenereDecrypt}
              disabled={!ciphertext || !vigenereKey}
              className="flex-1"
              variant="secondary"
            >
              Decrypt
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: 'caesar',
      label: 'Caesar Cipher',
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Shift Amount (1-25)
            </label>
            <input
              type="number"
              min="1"
              max="25"
              value={caesarShift}
              onChange={(e) => setCaesarShift(Math.max(1, Math.min(25, parseInt(e.target.value) || 1)))}
              className="w-full px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
            <p className="text-xs text-text-muted mt-1">
              Standard Caesar cipher shifts by 3, but you can use any number 1-25.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleCaesarEncrypt}
              disabled={!plaintext}
              className="flex-1"
            >
              Encrypt
            </Button>
            <Button
              onClick={handleCaesarDecrypt}
              disabled={!ciphertext}
              className="flex-1"
              variant="secondary"
            >
              Decrypt
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-[var(--radius-card)] p-4">
        <p className="text-sm text-yellow-900">
          <strong>Warning:</strong> This tool uses basic educational encryption (Vigenere and Caesar ciphers). Do not use for protecting sensitive data. For real security, use modern encryption standards.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Encryption Method
        </label>
        <div className="bg-surface border border-border rounded-[var(--radius-card)]">
          <Tabs
            tabs={tabs.map((tab) => ({
              id: tab.id,
              label: tab.label,
              content: tab.content,
            }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Plaintext
          </label>
          <textarea
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            placeholder="Text to encrypt..."
            className="w-full min-h-[150px] px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10 resize-vertical"
          />
          {plaintext && (
            <Button onClick={handleCopyPlaintext} className="w-full mt-3">
              Copy Plaintext
            </Button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Ciphertext
          </label>
          <textarea
            value={ciphertext}
            onChange={(e) => setCiphertext(e.target.value)}
            placeholder="Encrypted text..."
            className="w-full min-h-[150px] px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10 resize-vertical"
          />
          {ciphertext && (
            <Button onClick={handleCopyCiphertext} className="w-full mt-3">
              Copy Ciphertext
            </Button>
          )}
        </div>
      </div>

      <div className="text-sm text-text-muted">
        <p>Encrypt and decrypt text using classic cipher algorithms. Educational purposes only.</p>
      </div>
    </div>
  );
}
