'use client';

import { useState, useMemo, useCallback } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

function markdownToHtml(md) {
  if (!md) return '';
  let html = md;

  // Code blocks first (protect from other replacements)
  const codeBlocks = [];
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre><code${lang ? ` class="language-${lang}"` : ''}>${escapeHtml(code.trim())}</code></pre>`);
    return `%%CODEBLOCK_${idx}%%`;
  });

  // Inline code (protect from other replacements)
  const inlineCodes = [];
  html = html.replace(/`([^`]+)`/g, (_, code) => {
    const idx = inlineCodes.length;
    inlineCodes.push(`<code>${escapeHtml(code)}</code>`);
    return `%%INLINECODE_${idx}%%`;
  });

  // Escape HTML entities in remaining text (not inside code blocks/inline code)
  // This prevents XSS from raw HTML in markdown input
  html = html.replace(/&/g, '&amp;');
  html = html.replace(/</g, '&lt;');
  html = html.replace(/>/g, '&gt;');

  // Images (before links to avoid conflict)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr />');

  // Bold and italic (bold first to avoid conflict)
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  // Merge adjacent blockquotes
  html = html.replace(/<\/blockquote>\n<blockquote>/g, '\n');

  // Unordered lists
  html = html.replace(/^(?:- (.+)\n?)+/gm, (match) => {
    const items = match.trim().split('\n').map((line) => {
      const content = line.replace(/^- /, '');
      return `<li>${content}</li>`;
    });
    return `<ul>${items.join('')}</ul>`;
  });

  // Ordered lists
  html = html.replace(/^(?:\d+\. (.+)\n?)+/gm, (match) => {
    const items = match.trim().split('\n').map((line) => {
      const content = line.replace(/^\d+\. /, '');
      return `<li>${content}</li>`;
    });
    return `<ol>${items.join('')}</ol>`;
  });

  // Paragraphs - wrap lines that aren't already HTML
  html = html.split('\n\n').map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    if (/^<(h[1-6]|ul|ol|li|blockquote|pre|hr|img)/.test(trimmed)) return trimmed;
    if (/^%%CODEBLOCK_/.test(trimmed)) return trimmed;
    return `<p>${trimmed.replace(/\n/g, '<br />')}</p>`;
  }).join('\n');

  // Restore code blocks and inline code
  codeBlocks.forEach((block, i) => {
    html = html.replace(`%%CODEBLOCK_${i}%%`, block);
  });
  inlineCodes.forEach((code, i) => {
    html = html.replace(`%%INLINECODE_${i}%%`, code);
  });

  // Clean empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');

  return html.trim();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const SAMPLE_MD = `# Hello World

This is a **Markdown to HTML** converter. It supports *italic text* and ***bold italic***.

## Features

- Headings (h1, h2, h3)
- **Bold** and *italic* text
- [Links](https://example.com)
- \`inline code\`
- Bullet lists and numbered lists

### Code Blocks

\`\`\`js
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

> This is a blockquote. It can contain **formatted** text.

1. First item
2. Second item
3. Third item

---

![Alt text](https://via.placeholder.com/150)`;

export default function MarkdownToHtml() {
  const [input, setInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => markdownToHtml(input), [input]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }).catch(() => {});
  }, [output]);

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setShowPreview(false)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !showPreview
              ? 'bg-accent text-white'
              : 'bg-surface text-text-secondary border border-border'
          }`}
        >
          HTML Code
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            showPreview
              ? 'bg-accent text-white'
              : 'bg-surface text-text-secondary border border-border'
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setInput(SAMPLE_MD)}
          className="px-3 py-1.5 rounded-full text-xs font-medium bg-surface text-text-secondary border border-border hover:bg-surface-hover transition-colors"
        >
          Load example
        </button>
        {output && (
          <Button size="sm" onClick={handleCopy} className="ml-auto">
            {copied ? 'Copied!' : 'Copy HTML'}
          </Button>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Markdown input */}
        <Card>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Markdown
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste Markdown here..."
            rows={16}
            className="w-full bg-white border border-border rounded-[var(--radius-input)] px-3 py-2 text-sm font-mono text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent resize-y"
          />
        </Card>

        {/* Output */}
        <Card>
          <label className="block text-sm font-medium text-text-primary mb-1">
            {showPreview ? 'Preview' : 'HTML Output'}
          </label>
          {showPreview ? (
            /* NOTE: Preview intentionally renders user-supplied HTML - this is the
               purpose of the markdown-to-HTML converter. Raw HTML in the markdown
               input is escaped during conversion (after code block extraction). */
            <div
              className="prose prose-sm max-w-none border border-border rounded-[var(--radius-input)] px-3 py-2 min-h-[384px] max-h-[500px] overflow-y-auto bg-white"
              dangerouslySetInnerHTML={{ __html: output }}
            />
          ) : (
            <textarea
              value={output}
              readOnly
              rows={16}
              className="w-full bg-surface border border-border rounded-[var(--radius-input)] px-3 py-2 text-sm font-mono text-text-primary resize-y"
            />
          )}
        </Card>
      </div>

      {/* Quick reference */}
      <Card>
        <h3 className="font-heading text-sm font-semibold text-text-primary mb-2">
          Markdown Quick Reference
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          {[
            ['# Heading 1', '<h1>'],
            ['## Heading 2', '<h2>'],
            ['**bold**', '<strong>'],
            ['*italic*', '<em>'],
            ['[text](url)', '<a>'],
            ['`code`', '<code>'],
            ['- item', '<ul><li>'],
            ['1. item', '<ol><li>'],
            ['> quote', '<blockquote>'],
            ['---', '<hr />'],
            ['![alt](url)', '<img>'],
            ['```code```', '<pre><code>'],
          ].map(([md, tag]) => (
            <div
              key={md}
              className="flex items-center justify-between bg-surface rounded px-2 py-1.5 gap-2"
            >
              <span className="font-mono text-text-primary truncate">{md}</span>
              <span className="font-mono text-text-muted shrink-0">{tag}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
