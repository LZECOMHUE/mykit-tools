"use client";
import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

export default function WhitespaceRemover() {
  const [input, setInput] = useState("  Hello    World  \n\nThis  has   extra   spaces");
  const [trimLines, setTrimLines] = useState(true);
  const [removeBlank, setRemoveBlank] = useState(true);
  const [collapseSpaces, setCollapseSpaces] = useState(true);
  const [removeAll, setRemoveAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    let result = input;

    if (removeAll) {
      return result.replace(/\s/g, "");
    }

    if (trimLines) {
      result = result.split("\n").map((line) => line.trim()).join("\n");
    }

    if (removeBlank) {
      result = result.split("\n").filter((line) => line.trim() !== "").join("\n");
    }

    if (collapseSpaces) {
      result = result.split("\n").map((line) => line.replace(/\s+/g, " ")).join("\n");
    }

    return result;
  }, [input, trimLines, removeBlank, collapseSpaces, removeAll]);

  const charDifference = input.length - output.length;

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-4">
      {/* Options as compact checkboxes */}
      <div className="flex items-center gap-4 flex-wrap">
        {[
          { state: trimLines, setter: setTrimLines, label: "Trim lines" },
          { state: removeBlank, setter: setRemoveBlank, label: "Remove blank lines" },
          { state: collapseSpaces, setter: setCollapseSpaces, label: "Collapse spaces" },
          { state: removeAll, setter: setRemoveAll, label: "Remove all whitespace" },
        ].map(({ state, setter, label }) => (
          <label key={label} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={state}
              onChange={(e) => setter(e.target.checked)}
              className="w-4 h-4 rounded border-border accent-accent"
            />
            <span className="text-sm text-text-secondary">{label}</span>
          </label>
        ))}
      </div>

      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Input</label>
            {input.length > 0 && (
              <span className="text-xs text-text-muted font-mono">{input.length} chars</span>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text with extra whitespace"
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">Cleaned Output</label>
            <div className="flex items-center gap-2">
              {charDifference > 0 && (
                <span className="text-xs text-success font-mono">-{charDifference} chars</span>
              )}
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output.trim()}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
          <textarea
            value={output}
            readOnly
            placeholder="Cleaned text will appear here..."
            className="w-full h-64 md:h-80 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
