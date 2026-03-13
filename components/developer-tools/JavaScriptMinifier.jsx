'use client';

import { useState, useMemo } from 'react';

function minifyJS(js) {
  let minified = js;

  // Remove single-line comments
  minified = minified.replace(/\/\/.*$/gm, '');

  // Remove multi-line comments
  minified = minified.replace(/\/\*[\s\S]*?\*\//g, '');

  // Remove whitespace around operators (careful with some edge cases)
  minified = minified.replace(/\s*([{}[\]()=+\-*/%<>!&|^?:;,])\s*/g, '$1');

  // Remove unnecessary semicolons before closing braces or at end
  minified = minified.replace(/;(?=})/g, '');

  // Remove leading/trailing whitespace
  minified = minified.trim();

  // Remove newlines
  minified = minified.replace(/\n/g, '');

  // Collapse multiple spaces (but preserve single space after keywords)
  minified = minified.replace(/\s+/g, ' ');

  return minified;
}

export default function JavaScriptMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessed, setIsProcessed] = useState(false);

  const stats = useMemo(() => {
    if (!input.trim()) return null;

    const minified = minifyJS(input);
    setOutput(minified);
    setIsProcessed(true);

    const originalSize = new TextEncoder().encode(input).length;
    const minifiedSize = new TextEncoder().encode(minified).length;
    const saved = originalSize - minifiedSize;
    const savedPercent = ((saved / originalSize) * 100).toFixed(1);

    return {
      originalSize,
      minifiedSize,
      saved,
      savedPercent
    };
  }, [input]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:text/javascript;charset=utf-8,${encodeURIComponent(output)}`);
    element.setAttribute('download', 'minified.js');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full space-y-6">
      {/* Input */}
      <div>
        <label className="text-text-secondary text-sm font-medium">
          Paste Your JavaScript
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JavaScript code here..."
          className="w-full mt-2 min-h-[200px] rounded-[var(--radius-input)] border border-border bg-white p-3 font-mono text-[12px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </div>

      {/* Stats and Output */}
      {isProcessed && stats && (
        <>
          {/* Stats */}
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
              <div className="text-lg font-bold font-mono text-text-primary">
                {(stats.originalSize / 1024).toFixed(2)} KB
              </div>
              <div className="text-[11px] text-text-muted mt-1">Original</div>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
              <div className="text-lg font-bold font-mono text-text-primary">
                {(stats.minifiedSize / 1024).toFixed(2)} KB
              </div>
              <div className="text-[11px] text-text-muted mt-1">Minified</div>
            </div>
            <div className="rounded-[var(--radius-card)] bg-surface border border-border p-3 text-center">
              <div className="text-lg font-bold font-mono text-success">
                {(stats.saved / 1024).toFixed(2)} KB
              </div>
              <div className="text-[11px] text-text-muted mt-1">Saved</div>
            </div>
            <div className="rounded-[var(--radius-card)] bg-success bg-opacity-10 border border-success p-3 text-center">
              <div className="text-lg font-bold font-mono text-success">
                {stats.savedPercent}%
              </div>
              <div className="text-[11px] text-text-muted mt-1">Reduction</div>
            </div>
          </div>

          {/* Output */}
          <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
            <p className="text-text-secondary text-sm font-medium mb-3">
              Minified JavaScript
            </p>
            <div className="bg-white rounded-[var(--radius-input)] border border-border p-3 max-h-[250px] overflow-y-auto">
              <code className="font-mono text-[11px] text-text-primary break-all">
                {output}
              </code>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleCopy}
                className="flex-1 rounded-[var(--radius-card)] bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-accent-hover transition-colors"
              >
                Copy
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 rounded-[var(--radius-card)] bg-white border border-border text-text-primary px-4 py-2 text-sm font-medium hover:bg-surface transition-colors"
              >
                Download
              </button>
            </div>
          </div>

          {/* Warning */}
          <div className="rounded-[var(--radius-card)] bg-warning bg-opacity-10 border border-warning p-3">
            <p className="text-warning text-[13px]">
              Note: This is a basic minifier. For production use, consider dedicated tools like Terser, UglifyJS, or esbuild.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
