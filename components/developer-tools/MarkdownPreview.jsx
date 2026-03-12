'use client';

import { useState, useMemo } from 'react';

function parseMarkdown(markdown) {
  let html = markdown;

  // Code blocks (``` ... ```)
  html = html.replace(/```([^`]*?)```/gs, '<pre><code>$1</code></pre>');

  // Inline code (`...`)
  html = html.replace(/`([^`]+?)`/g, '<code>$1</code>');

  // Headers (# to ######)
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
  html = html.replace(/^##### (.*?)$/gm, '<h5>$1</h5>');
  html = html.replace(/^###### (.*?)$/gm, '<h6>$1</h6>');

  // Bold (**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Italic (*)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Links [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Images ![alt](url)
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

  // Blockquotes (>)
  html = html.replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>');

  // Horizontal rules (---)
  html = html.replace(/^---$/gm, '<hr>');

  // Ordered lists (1., 2., etc.)
  html = html.replace(/^\d+\. (.*?)$/gm, '<li>$1</li>');

  // Unordered lists (-)
  html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');

  // Wrap list items in ol/ul tags
  html = html.replace(/(<li>.*?<\/li>)/gs, function(match) {
    if (match.includes('<ol>') || match.includes('<ul>')) return match;
    return '<ul>' + match + '</ul>';
  });

  // Paragraphs (double newlines)
  html = html.split('\n\n').map(para => {
    if (
      para.includes('<h') ||
      para.includes('<pre') ||
      para.includes('<blockquote') ||
      para.includes('<ul') ||
      para.includes('<ol') ||
      para.includes('<hr')
    ) {
      return para;
    }
    return '<p>' + para + '</p>';
  }).join('\n');

  return html;
}

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Preview

## What is Markdown?
Markdown is a lightweight **markup language** for creating formatted text.

### Key Features
- Easy to read and write
- Supports *emphasis* and **strong text**
- Great for documentation

## Code Example
\`\`\`
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

You can use inline \`code\` too.

> Blockquotes are perfect for highlighting important information.

[Visit MyKit.tools](https://mykit.tools)

---

Happy writing!`);
  const [copied, setCopied] = useState(false);

  const htmlOutput = useMemo(() => parseMarkdown(markdown), [markdown]);

  const styledHtml = useMemo(() => {
    return htmlOutput
      .replace(new RegExp('<h([1-6])>(.*?)</h\\1>', 'g'), '<h$1 class="mt-4 mb-2 font-heading font-bold text-lg">$2</h$1>')
      .replace(new RegExp('<strong>(.*?)</strong>', 'g'), '<strong class="font-semibold">$1</strong>')
      .replace(new RegExp('<em>(.*?)</em>', 'g'), '<em class="italic">$1</em>')
      .replace(new RegExp('<a href="(.*?)">(.*?)</a>', 'g'), '<a href="$1" class="text-accent hover:underline">$2</a>')
      .replace(new RegExp('<code>(.*?)</code>', 'g'), '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(new RegExp('<pre>(.*?)</pre>', 'gs'), '<pre class="bg-gray-100 p-4 rounded overflow-x-auto"><code>$1</code></pre>')
      .replace(new RegExp('<blockquote>(.*?)</blockquote>', 'g'), '<blockquote class="border-l-4 border-accent pl-4 italic text-text-secondary">$1</blockquote>')
      .replace(new RegExp('<li>', 'g'), '<li class="ml-4">')
      .replace(new RegExp('<ul>(.*?)</ul>', 'gs'), '<ul class="list-disc">$1</ul>')
      .replace(new RegExp('<hr>', 'g'), '<hr class="my-4 border-border">')
      .replace(new RegExp('<p>(.*?)</p>', 'g'), '<p class="mb-3">$1</p>')
      .replace(new RegExp('<img src="(.*?)" alt="(.*?)">', 'g'), '<img src="$1" alt="$2" class="max-w-full h-auto rounded">');
  }, [htmlOutput]);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Split View Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border flex flex-col">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Markdown Editor</h3>
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            className="flex-1 p-4 bg-white border border-border rounded-[var(--radius-input)] font-mono text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            placeholder="Enter markdown here..."
          />
        </div>

        {/* Preview */}
        <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border flex flex-col">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Live Preview</h3>
          <div
            className="flex-1 p-4 bg-white border border-border rounded-[var(--radius-input)] prose prose-sm max-w-none overflow-auto"
            dangerouslySetInnerHTML={{ __html: styledHtml }}
          />
        </div>
      </div>

      {/* HTML Output */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Generated HTML</h3>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] text-sm font-medium hover:bg-opacity-90"
          >
            {copied ? '✓ Copied' : 'Copy HTML'}
          </button>
        </div>

        <pre className="bg-white border border-border rounded-[var(--radius-input)] p-4 overflow-x-auto text-xs font-mono text-text-primary max-h-64">
          {htmlOutput}
        </pre>
      </div>

      {/* Syntax Guide */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Markdown Syntax Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-semibold text-text-primary mb-2">Headers</div>
            <code className="block bg-white border border-border rounded px-2 py-1 font-mono text-xs text-text-secondary"># H1 / ## H2 / ### H3</code>
          </div>
          <div>
            <div className="font-semibold text-text-primary mb-2">Text Formatting</div>
            <code className="block bg-white border border-border rounded px-2 py-1 font-mono text-xs text-text-secondary">**bold** / *italic* / `code`</code>
          </div>
          <div>
            <div className="font-semibold text-text-primary mb-2">Links & Images</div>
            <code className="block bg-white border border-border rounded px-2 py-1 font-mono text-xs text-text-secondary">[text](url) / ![alt](url)</code>
          </div>
          <div>
            <div className="font-semibold text-text-primary mb-2">Lists & Quotes</div>
            <code className="block bg-white border border-border rounded px-2 py-1 font-mono text-xs text-text-secondary">{'- list / 1. ordered / > quote'}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
