"use client";

import { useState, useMemo } from "react";
import Button from "@/components/ui/Button";

// MSN/MySpace era character substitution maps
const STYLES = {
  classic: {
    label: "MSN Classic",
    preview: "×ĐäŔK~ÄñĢ€Ŀ×",
    map: {
      a: "ä", b: "ß", c: "ç", d: "Đ", e: "€", f: "ƒ", g: "Ģ", h: "Ħ",
      i: "ï", j: "ĵ", k: "Ķ", l: "Ŀ", m: "m", n: "ñ", o: "◊", p: "þ",
      q: "q", r: "Ŕ", s: "$", t: "†", u: "ü", v: "√", w: "Ŵ", x: "×",
      y: "¥", z: "ž",
      A: "Ä", B: "ß", C: "Ç", D: "Đ", E: "€", F: "Ƒ", G: "Ģ", H: "Ħ",
      I: "Ï", J: "Ĵ", K: "Ķ", L: "Ŀ", M: "M", N: "Ñ", O: "◊", P: "Þ",
      Q: "Q", R: "Ŕ", S: "$", T: "†", U: "Ü", V: "√", W: "Ŵ", X: "×",
      Y: "¥", Z: "Ž",
    },
  },
  emo: {
    label: "Emo/Scene",
    preview: "xX_ĐaRk_Xx",
    map: {
      a: "å", b: "b", c: "ĉ", d: "đ", e: "ë", f: "f", g: "ğ", h: "h",
      i: "î", j: "ĵ", k: "k", l: "ł", m: "m", n: "ñ", o: "ø", p: "p",
      q: "q", r: "r", s: "š", t: "ţ", u: "û", v: "v", w: "ŵ", x: "x",
      y: "ÿ", z: "ź",
      A: "Å", B: "B", C: "Ĉ", D: "Đ", E: "Ë", F: "F", G: "Ğ", H: "H",
      I: "Î", J: "Ĵ", K: "K", L: "Ł", M: "M", N: "Ñ", O: "Ø", P: "P",
      Q: "Q", R: "R", S: "Š", T: "Ţ", U: "Û", V: "V", W: "Ŵ", X: "X",
      Y: "Ÿ", Z: "Ź",
    },
  },
  hacker: {
    label: "1337 H4X0R",
    preview: "1337 H4X0R",
    map: {
      a: "4", b: "8", c: "(", d: "|)", e: "3", f: "|=", g: "6", h: "#",
      i: "!", j: "_|", k: "|<", l: "1", m: "|\\/|", n: "|\\|", o: "0", p: "|>",
      q: "0,", r: "|2", s: "5", t: "7", u: "|_|", v: "\\/", w: "\\/\\/", x: "><",
      y: "'/", z: "2",
      A: "4", B: "8", C: "(", D: "|)", E: "3", F: "|=", G: "6", H: "#",
      I: "!", J: "_|", K: "|<", L: "1", M: "|\\/|", N: "|\\|", O: "0", P: "|>",
      Q: "0,", R: "|2", S: "5", T: "7", U: "|_|", V: "\\/", W: "\\/\\/", X: "><",
      Y: "'/", Z: "2",
    },
  },
  currency: {
    label: "Money Talks",
    preview: "M◊₦€¥ ₮₳£K$",
    map: {
      a: "₳", b: "₿", c: "¢", d: "₫", e: "€", f: "₣", g: "₲", h: "₴",
      i: "ɨ", j: "ʝ", k: "₭", l: "£", m: "₥", n: "₦", o: "◊", p: "₱",
      q: "Q", r: "₹", s: "$", t: "₮", u: "µ", v: "√", w: "₩", x: "×",
      y: "¥", z: "Ƶ",
      A: "₳", B: "₿", C: "¢", D: "₫", E: "€", F: "₣", G: "₲", H: "₴",
      I: "ɨ", J: "ʝ", K: "₭", L: "£", M: "₥", N: "₦", O: "◊", P: "₱",
      Q: "Q", R: "₹", S: "$", T: "₮", U: "µ", V: "√", W: "₩", X: "×",
      Y: "¥", Z: "Ƶ",
    },
  },
  nordic: {
    label: "Viking Runes",
    preview: "ŦĦɆ VƗꝀƗNǤ",
    map: {
      a: "Ⱥ", b: "ƀ", c: "ȼ", d: "đ", e: "ɇ", f: "ꝼ", g: "ǥ", h: "ħ",
      i: "ɨ", j: "ɉ", k: "ꝁ", l: "ł", m: "m", n: "n", o: "ø", p: "ᵽ",
      q: "ꝗ", r: "ɍ", s: "ȿ", t: "ŧ", u: "ᵾ", v: "v", w: "w", x: "x",
      y: "ɏ", z: "ƶ",
      A: "Ⱥ", B: "Ƀ", C: "Ȼ", D: "Đ", E: "Ɇ", F: "Ꝼ", G: "Ǥ", H: "Ħ",
      I: "Ɨ", J: "Ɉ", K: "Ꝁ", L: "Ł", M: "M", N: "N", O: "Ø", P: "Ᵽ",
      Q: "Ꝗ", R: "Ɍ", S: "Ȿ", T: "Ŧ", U: "ᵾ", V: "V", W: "W", X: "X",
      Y: "Ɏ", Z: "Ƶ",
    },
  },
  aesthetic: {
    label: "A E S T H E T I C",
    preview: "Ａ Ｅ Ｓ Ｔ Ｈ Ｅ Ｔ Ｉ Ｃ",
    // Uses fullwidth chars + spacing
    map: null,
    transform: (text) =>
      text.split("").map((c) => {
        const code = c.charCodeAt(0);
        if (code >= 33 && code <= 126) return String.fromCharCode(code + 0xFEE0);
        if (c === " ") return "\u3000";
        return c;
      }).join(" "),
  },
  sparkles: {
    label: "Sparkle Queen",
    preview: "✧・ﾟ:* Hello *:・ﾟ✧",
    map: null,
    transform: (text) => `✧・ﾟ:* ${text} *:・ﾟ✧`,
  },
  flowers: {
    label: "Flower Power",
    preview: "✿ Hello ✿",
    map: null,
    transform: (text) => {
      const flowers = ["✿", "❀", "❁", "✾", "❃"];
      const chars = text.split("");
      return chars.map((c, i) => {
        if (c === " ") return ` ${flowers[i % flowers.length]} `;
        return c;
      }).join("");
    },
  },
  stars: {
    label: "Star Bright",
    preview: "★ Hello ★",
    map: null,
    transform: (text) => {
      const stars = ["★", "☆", "✦", "✧", "⋆"];
      return `${stars[0]} ${text.split("").join(stars[2])} ${stars[0]}`;
    },
  },
  brackets: {
    label: "Scene Kid",
    preview: "»ĦëĿĿ◊«",
    map: {
      a: "ä", b: "ß", c: "ç", d: "Đ", e: "ë", f: "ƒ", g: "ğ", h: "Ħ",
      i: "ï", j: "ĵ", k: "ĸ", l: "Ŀ", m: "m", n: "ñ", o: "◊", p: "þ",
      q: "q", r: "ŕ", s: "§", t: "†", u: "ü", v: "√", w: "ŵ", x: "×",
      y: "¥", z: "ž",
      A: "Ä", B: "ß", C: "Ç", D: "Đ", E: "Ë", F: "Ƒ", G: "Ğ", H: "Ħ",
      I: "Ï", J: "Ĵ", K: "ĸ", L: "Ŀ", M: "M", N: "Ñ", O: "◊", P: "Þ",
      Q: "Q", R: "Ŕ", S: "§", T: "†", U: "Ü", V: "√", W: "Ŵ", X: "×",
      Y: "¥", Z: "Ž",
    },
    wrap: (text) => `»${text}«`,
  },
  tildes: {
    label: "~Tilde Vibes~",
    preview: "~*~Hello~*~",
    map: null,
    transform: (text) => `~*~${text}~*~`,
  },
  alt: {
    label: "aLtErNaTiNg",
    preview: "aLtErNaTiNg CaSe",
    map: null,
    transform: (text) =>
      text.split("").map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase())).join(""),
  },
};

function convert(text, styleKey) {
  const style = STYLES[styleKey];
  if (!style) return text;
  if (style.transform) return style.transform(text);

  let result = text.split("").map((c) => {
    if (style.map && style.map[c] !== undefined) return style.map[c];
    return c;
  }).join("");

  if (style.wrap) result = style.wrap(result);
  return result;
}

const MSN_ADJECTIVES = [
  "Dark", "Silent", "Broken", "Fallen", "Lost", "Shadow", "Mystic", "Lonely",
  "Gothic", "Toxic", "Wicked", "Twisted", "Bleeding", "Crimson", "Frozen",
  "Shattered", "Haunted", "Dreaming", "Fading", "Eternal", "Chaos", "Raven",
  "Crystal", "Midnight", "Neon", "Electric", "Velvet", "Savage", "Rebel",
];
const MSN_NOUNS = [
  "Angel", "Demon", "Rose", "Butterfly", "Phoenix", "Kitten", "Princess",
  "Nightmare", "Skull", "Dagger", "Spirit", "Flame", "Storm", "Rebel",
  "Viper", "Wolf", "Fairy", "Pixie", "Vampire", "Dragon", "Star",
  "Raven", "Blade", "Thorn", "Tear", "Shadow", "Moon", "Chaos",
];
const MSN_EMOTES = [
  "xXx", "x_x", "xD", "rawr", ":3", "^_^", "o_O", "<3", "XoXo",
  "=^.^=", "._.", ">.<", "~nyaa~", ":P", "T_T", "uwu",
];
const MSN_WRAPS = [
  (n) => `~*~${n}~*~`,
  (n) => `x_${n}_x`,
  (n) => `xX_${n}_Xx`,
  (n) => `>>>${n}<<<`,
  (n) => `*~${n}~*`,
  (n) => `-=${n}=-`,
  (n) => `||${n}||`,
  (n) => `~${n}~`,
  (n) => `[${n}]`,
  (n) => `x ${n} x`,
];

function randomMsnName() {
  const adj = MSN_ADJECTIVES[Math.floor(Math.random() * MSN_ADJECTIVES.length)];
  const noun = MSN_NOUNS[Math.floor(Math.random() * MSN_NOUNS.length)];
  const emote = MSN_EMOTES[Math.floor(Math.random() * MSN_EMOTES.length)];
  const wrap = MSN_WRAPS[Math.floor(Math.random() * MSN_WRAPS.length)];
  const patterns = [
    () => wrap(`${adj}_${noun}`),
    () => wrap(`${adj}${noun}${Math.floor(Math.random() * 100)}`),
    () => `${wrap(adj + noun)} says: ${emote}`,
    () => wrap(`${noun}_of_${adj}`),
    () => `${wrap(adj + noun)} ${emote}`,
    () => wrap(`ii${adj}${noun}ii`),
    () => `${emote} ${wrap(adj + noun)} ${emote}`,
  ];
  return patterns[Math.floor(Math.random() * patterns.length)]();
}

export default function MsnTextGenerator() {
  const [input, setInput] = useState("Hello World");
  const [copied, setCopied] = useState(null);

  const results = useMemo(() => {
    if (!input.trim()) return [];
    return Object.entries(STYLES).map(([key, style]) => ({
      key,
      label: style.label,
      output: convert(input, key),
    }));
  }, [input]);

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 1200);
  };

  const generateName = () => setInput(randomMsnName());

  return (
    <div className="space-y-3">
      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your text..."
          className="flex-1 px-4 py-3 text-lg rounded-[var(--radius-input)] border border-border bg-white text-text-primary placeholder:text-text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
        />
        <button
          onClick={generateName}
          className="px-4 py-3 rounded-[var(--radius-input)] bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium text-sm hover:from-pink-600 hover:to-purple-600 transition-all flex-shrink-0 whitespace-nowrap"
          title="Generate a random MSN-era username"
        >
          Random Name
        </button>
      </div>

      {/* Results grid */}
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

      <p className="text-xs text-text-muted text-center">
        Click any style to copy. Works on social media, Discord, gaming profiles, and anywhere that supports Unicode.
      </p>
    </div>
  );
}
