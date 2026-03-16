'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';

export default function EmailExtractor() {
  const [text, setText] = useState('');
  const [emails, setEmails] = useState([]);

  const uniqueEmails = useMemo(() => {
    if (!text.trim()) {
      setEmails([]);
      return [];
    }

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const foundEmails = text.match(emailRegex) || [];
    const unique = [...new Set(foundEmails.map((e) => e.toLowerCase()))].sort();
    setEmails(unique);
    return unique;
  }, [text]);

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uniqueEmails.join('\n'));
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
  };

  const handleDownloadCSV = () => {
    const csv = uniqueEmails.join('\n');
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(csv)}`);
    element.setAttribute('download', 'emails.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Paste Text
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text containing email addresses..."
          className="w-full min-h-[150px] px-4 py-3 border border-border rounded-[var(--radius-input)] focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-10 resize-vertical"
        />
      </div>

      {uniqueEmails.length > 0 && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-sm">
              Found <span className="font-mono font-semibold text-text-primary">{uniqueEmails.length}</span> unique email{uniqueEmails.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCopyAll} className="flex-1">
              Copy All
            </Button>
            <Button onClick={handleDownloadCSV} variant="secondary" className="flex-1">
              Download TXT
            </Button>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {uniqueEmails.map((email, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-white border border-border rounded-[var(--radius-input)] hover:border-accent transition-colors"
                >
                  <code className="font-mono text-sm text-text-primary break-all">
                    {email}
                  </code>
                  <Button
                    onClick={() => handleCopyEmail(email)}
                    size="sm"
                    className="ml-2 flex-shrink-0"
                  >
                    Copy
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {text && uniqueEmails.length === 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 text-center">
          <p className="text-text-muted">No email addresses found in the text</p>
        </div>
      )}

      {!text && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 text-center">
          <p className="text-text-muted">Paste text to extract email addresses</p>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Extract and list all unique email addresses from any text.</p>
      </div>
    </div>
  );
}
