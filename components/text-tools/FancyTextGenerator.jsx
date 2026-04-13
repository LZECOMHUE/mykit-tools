"use client";

import { useState, useMemo } from "react";

// Unicode offset-based conversion (more reliable than hardcoded char strings)
function makeOffsetMap(upperStart, lowerStart, digitStart) {
  return (char) => {
    const code = char.charCodeAt(0);
    if (code >= 65 && code <= 90 && upperStart) return String.fromCodePoint(upperStart + (code - 65));
    if (code >= 97 && code <= 122 && lowerStart) return String.fromCodePoint(lowerStart + (code - 97));
    if (code >= 48 && code <= 57 && digitStart) return String.fromCodePoint(digitStart + (code - 48));
    return char;
  };
}

const STYLES = [
  { key: "bold", label: "Bold", fn: makeOffsetMap(0x1D400, 0x1D41A, 0x1D7CE) },
  { key: "italic", label: "Italic", fn: makeOffsetMap(0x1D434, 0x1D44E, null) },
  { key: "boldItalic", label: "Bold Italic", fn: makeOffsetMap(0x1D468, 0x1D482, null) },
  { key: "script", label: "Script", fn: makeOffsetMap(0x1D49C, 0x1D4B6, null) },
  { key: "boldScript", label: "Bold Script", fn: makeOffsetMap(0x1D4D0, 0x1D4EA, null) },
  { key: "fraktur", label: "Gothic / Fraktur", fn: makeOffsetMap(0x1D504, 0x1D51E, null) },
  { key: "doubleStruck", label: "Double Struck", fn: makeOffsetMap(0x1D538, 0x1D552, 0x1D7D8) },
  { key: "sansSerif", label: "Sans Serif", fn: makeOffsetMap(0x1D5A0, 0x1D5BA, 0x1D7E2) },
  { key: "sansBold", label: "Sans Bold", fn: makeOffsetMap(0x1D5D4, 0x1D5EE, 0x1D7EC) },
  { key: "sansItalic", label: "Sans Italic", fn: makeOffsetMap(0x1D608, 0x1D622, null) },
  { key: "sansBoldItalic", label: "Sans Bold Italic", fn: makeOffsetMap(0x1D63C, 0x1D656, null) },
  { key: "monospace", label: "Monospace", fn: makeOffsetMap(0x1D670, 0x1D68A, 0x1D7F6) },
  {
    key: "circled",
    label: "Circled",
    fn: (char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + (code - 97));
      if (code === 48) return "\u24EA"; // 0
      if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + (code - 49));
      return char;
    },
  },
  {
    key: "squared",
    label: "Squared",
    fn: (char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1F130 + (code - 97));
      return char;
    },
  },
  {
    key: "negSquared",
    label: "Negative Squared",
    fn: (char) => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F170 + (code - 65));
      if (code >= 97 && code <= 122) return String.fromCodePoint(0x1F170 + (code - 97));
      return char;
    },
  },
  {
    key: "smallCaps",
    label: "Small Caps",
    fn: (char) => {
      const map = "ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ";
      const code = char.charCodeAt(0);
      if (code >= 97 && code <= 122) return map[code - 97] || char;
      if (code >= 65 && code <= 90) return map[code - 65] || char;
      return char;
    },
  },
  {
    key: "fullwidth",
    label: "Fullwidth",
    fn: (char) => {
      const code = char.charCodeAt(0);
      if (code >= 33 && code <= 126) return String.fromCodePoint(code + 0xFEE0);
      if (char === " ") return "\u3000";
      return char;
    },
  },
  {
    key: "upsideDown",
    label: "Upside Down",
    fn: null,
    convert: (text) => {
      const map = "ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz";
      const MAP = "ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz";
      return text.split("").reverse().map((c) => {
        const code = c.charCodeAt(0);
        if (code >= 97 && code <= 122) return map[code - 97] || c;
        if (code >= 65 && code <= 90) return MAP[code - 65]?.toUpperCase?.() || map[code - 65] || c;
        return c;
      }).join("");
    },
  },
  {
    key: "strikethrough",
    label: "Strikethrough",
    fn: (char) => char + "\u0336",
  },
  {
    key: "underline",
    label: "Underline",
    fn: (char) => char + "\u0332",
  },
];

function convertText(text, style) {
  if (style.convert) return style.convert(text);
  if (style.fn) return text.split("").map(style.fn).join("");
  return text;
}

export default function FancyTextGenerator() {
  const [input, setInput] = useState("Hello World");
  const [copied, setCopied] = useState(null);

  const results = useMemo(() => {
    if (!input.trim()) return [];
    return STYLES.map((style) => ({
      key: style.key,
      label: style.label,
      output: convertText(input, style),
    }));
  }, [input]);

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your text..."
        className="w-full px-4 py-3 text-lg rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {results.map(({ key, label, output }) => (
          <button
            key={key}
            onClick={() => copy(output, key)}
            className="text-left px-4 py-3 rounded-[var(--radius-card)] border border-border bg-white hover:border-accent hover:bg-accent/5 transition-all group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-text-muted mb-1">{label}</p>
                <p className="text-sm text-text-primary break-all leading-relaxed">
                  {output}
                </p>
              </div>
              <span className={`text-xs flex-shrink-0 px-2 py-0.5 rounded-full transition-all ${
                copied === key
                  ? "bg-green-100 text-green-700"
                  : "bg-surface text-text-muted group-hover:bg-accent/10 group-hover:text-accent"
              }`}>
                {copied === key ? "Copied!" : "Copy"}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
