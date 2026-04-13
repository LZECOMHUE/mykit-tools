"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import Toggle from "@/components/ui/Toggle";

export default function HtmlToText() {
  const [input, setInput] = useState("");
  const [preserveBreaks, setPreserveBreaks] = useState(true);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!input) return { output: "", tagsRemoved: 0 };

    const tagMatches = input.match(/<[^>]+>/g);
    const tagsRemoved = tagMatches ? tagMatches.length : 0;

    let html = input;

    if (preserveBreaks) {
      // Convert block-level elements to newlines before stripping
      html = html.replace(/<br\s*\/?>/gi, "\n");
      html = html.replace(/<\/p>/gi, "\n\n");
      html = html.replace(/<\/div>/gi, "\n");
      html = html.replace(/<\/h[1-6]>/gi, "\n\n");
      html = html.replace(/<\/li>/gi, "\n");
      html = html.replace(/<\/tr>/gi, "\n");
      html = html.replace(/<\/blockquote>/gi, "\n");
      html = html.replace(/<hr\s*\/?>/gi, "\n---\n");
    }

    // Use DOMParser to extract text
    try {
      const doc = new DOMParser().parseFromString(html, "text/html");
      let text = doc.body.textContent || "";

      if (preserveBreaks) {
        // Collapse 3+ newlines to 2
        text = text.replace(/\n{3,}/g, "\n\n");
        text = text.trim();
      }

      return { output: text, tagsRemoved };
    } catch {
      // Fallback: simple regex strip
      const text = html.replace(/<[^>]+>/g, "");
      return { output: text, tagsRemoved };
    }
  }, [input, preserveBreaks]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <Toggle
          label="Preserve line breaks"
          checked={preserveBreaks}
          onChange={setPreserveBreaks}
        />
        {input && result.tagsRemoved > 0 && (
          <span className="text-xs text-text-muted font-mono">
            {result.tagsRemoved} tag{result.tagsRemoved !== 1 ? "s" : ""} removed
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <span className="text-xs text-text-muted mb-1.5 font-mono">HTML</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste HTML here, e.g. <p>Hello <b>world</b></p>...'
            rows={14}
            className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-white text-sm text-text-primary placeholder:text-text-muted outline-none resize-y focus:border-accent focus:ring-2 focus:ring-accent/10 font-mono"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-text-muted font-mono">Plain text</span>
            {result.output && (
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            )}
          </div>
          <textarea
            value={result.output}
            readOnly
            rows={14}
            placeholder="Plain text output appears here..."
            className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-surface text-sm text-text-primary placeholder:text-text-muted outline-none resize-y font-mono"
          />
        </div>
      </div>
    </div>
  );
}
