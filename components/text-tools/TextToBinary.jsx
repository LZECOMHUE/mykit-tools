"use client";
import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

const FORMATS = [
  { value: "binary", label: "Binary" },
  { value: "hex", label: "Hex" },
  { value: "octal", label: "Octal" },
];

export default function TextToBinary() {
  const [input, setInput] = useState("Hello");
  const [spacesBetweenBytes, setSpacesBetweenBytes] = useState(true);
  const [activeFormat, setActiveFormat] = useState("binary");
  const [copied, setCopied] = useState(false);

  const { binary, hex, octal } = useMemo(() => {
    const sep = spacesBetweenBytes ? " " : "";
    const chars = input.split("");
    return {
      binary: chars.map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(sep),
      hex: chars.map((c) => c.charCodeAt(0).toString(16).padStart(2, "0").toUpperCase()).join(sep),
      octal: chars.map((c) => c.charCodeAt(0).toString(8).padStart(3, "0")).join(sep),
    };
  }, [input, spacesBetweenBytes]);

  const outputMap = { binary, hex, octal };
  const activeOutput = outputMap[activeFormat];

  const handleCopy = async () => {
    if (!activeOutput) return;
    try {
      await navigator.clipboard.writeText(activeOutput).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-4">
      {/* Format pills + spacing option */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-medium text-text-primary">Format:</span>
        {FORMATS.map((fmt) => (
          <button
            key={fmt.value}
            onClick={() => { setActiveFormat(fmt.value); setCopied(false); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeFormat === fmt.value
                ? "bg-accent text-white"
                : "bg-surface text-text-secondary hover:bg-surface-hover"
            }`}
          >
            {fmt.label}
          </button>
        ))}
        <label className="flex items-center gap-2 cursor-pointer ml-2">
          <input
            type="checkbox"
            checked={spacesBetweenBytes}
            onChange={(e) => setSpacesBetweenBytes(e.target.checked)}
            className="w-4 h-4 rounded border-border accent-accent"
          />
          <span className="text-sm text-text-secondary">Spaces between bytes</span>
        </label>
      </div>

      {/* Side-by-side grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Input */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1.5">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert"
            className="w-full h-48 md:h-64 p-3 font-mono text-sm bg-white border border-border rounded-[var(--radius-input)] resize-none focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-primary">
              {FORMATS.find((f) => f.value === activeFormat)?.label} Output
            </label>
            <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!activeOutput}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <textarea
            value={activeOutput}
            readOnly
            placeholder="Converted output will appear here..."
            className="w-full h-48 md:h-64 p-3 font-mono text-sm bg-surface border border-border rounded-[var(--radius-input)] resize-none focus:outline-none break-all"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Character reference table */}
      {input.length > 0 && input.length <= 20 && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">Char</th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">Binary</th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">Hex</th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">Decimal</th>
              </tr>
            </thead>
            <tbody>
              {input.split("").map((char, idx) => (
                <tr key={idx} className="border-b border-border">
                  <td className="py-1.5 px-2 font-mono text-text-primary">
                    {char === " " ? "(space)" : char}
                  </td>
                  <td className="py-1.5 px-2 font-mono text-text-secondary">
                    {char.charCodeAt(0).toString(2).padStart(8, "0")}
                  </td>
                  <td className="py-1.5 px-2 font-mono text-text-secondary">
                    {char.charCodeAt(0).toString(16).padStart(2, "0").toUpperCase()}
                  </td>
                  <td className="py-1.5 px-2 font-mono text-text-secondary">
                    {char.charCodeAt(0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
