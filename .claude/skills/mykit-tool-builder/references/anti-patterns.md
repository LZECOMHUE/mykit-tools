# MyKit Anti-Patterns - What NOT to Do

These are the mistakes we've had to fix repeatedly. Every one of these makes a tool feel broken or amateur. Avoid them from the start.

## 1. Garish coloured result blocks

**BAD:**
```jsx
<div className="bg-blue-700 text-white border border-blue-600 rounded-xl p-4">
  <p className="text-3xl font-bold">{result}</p>
</div>
```

**GOOD:**
```jsx
<div className="bg-surface border border-border rounded-xl overflow-hidden">
  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
    <p className="text-3xl font-bold text-white">{result}</p>
  </div>
</div>
```

Bright saturated Tailwind colours (blue-700, purple-600, green-50, amber-900, cyan-700, red-50) as result backgrounds ALWAYS look bad. Use the dark-gradient-header-white-grid pattern.

Exception: tiny legend dots, progress bars, and semantic state indicators can use specific colours.

## 2. Missing padding on containers

**BAD:**
```jsx
<div className="bg-surface rounded-lg space-y-4">
  {/* content touches the edges */}
</div>
```

**GOOD:**
```jsx
<div className="bg-surface rounded-lg p-4 space-y-4">
  {/* content has room to breathe */}
</div>
```

Rule: ANY `<div>` with `bg-*` OR `border` classes MUST have `p-3`, `p-4`, `p-5`, or `px-X py-Y` internal padding. No exceptions.

Exception: grid cells inside `gap-px bg-border` patterns use `px-4 py-3` on the inner cells.

## 3. Select dropdowns for small option sets

**BAD:**
```jsx
<Select
  value={mode}
  onChange={(e) => setMode(e.target.value)}
  options={[
    { value: 'practice', label: 'Practice' },
    { value: 'worksheet', label: 'Worksheet' },
  ]}
/>
```

**GOOD:**
```jsx
<div className="flex flex-wrap gap-1.5">
  {options.map((o) => (
    <button key={o.value} onClick={() => setMode(o.value)}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        mode === o.value ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
      }`}>{o.icon} {o.label}</button>
  ))}
</div>
```

For 2-6 options, ALWAYS use pills. Only use `<select>` for very long lists (countries, timezones, fonts).

## 4. Nested Cards

**BAD:**
```jsx
<Card>
  <Card>  {/* boxes inside boxes */}
    <p>Content</p>
  </Card>
</Card>
```

**GOOD:**
```jsx
<div className="space-y-4">
  <div className="bg-surface border border-border rounded-xl p-4">
    Section 1
  </div>
  <div className="bg-surface border border-border rounded-xl p-4">
    Section 2
  </div>
</div>
```

One border layer per visual section. Use `space-y-4` for vertical rhythm between sections.

## 5. Click-to-calculate button

**BAD:**
```jsx
const [result, setResult] = useState(null);
const calculate = () => setResult(compute(input1, input2));

return (
  <>
    <input /* input1 */ />
    <input /* input2 */ />
    <button onClick={calculate}>Calculate</button>
    {result && <div>{result}</div>}
  </>
);
```

**GOOD:**
```jsx
const result = useMemo(() => compute(input1, input2), [input1, input2]);

return (
  <>
    <input /* input1 */ />
    <input /* input2 */ />
    <div>{result}</div>  {/* always visible, updates live */}
  </>
);
```

Exception: keep a button when the computation is expensive (>500ms) or has a side effect (API call, file download, random generation). Calculators, converters, formatters should always be live.

## 6. `max-w-*mx-auto` root wrappers

**BAD:**
```jsx
return (
  <div className="max-w-2xl mx-auto p-4 space-y-4">
    {/* tool */}
  </div>
);
```

**GOOD:**
```jsx
return (
  <div className="space-y-4">
    {/* tool */}
  </div>
);
```

The page layout (via `/app/(tools)/layout.jsx`) handles max-width and centering. Tools should fill their slot. Multiple layers of max-width cause visual jitter.

## 7. Form-then-results layout

**BAD:**
```jsx
<Card>
  <h2>Configuration</h2>
  {/* inputs */}
  <button>Generate</button>
</Card>

{result && <Card>{/* results */}</Card>}
```

**GOOD:**
```jsx
<div className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>{/* compact inputs */}</div>
    <div>{/* tips or reference data */}</div>
  </div>
  <div>{/* result always visible, updates live */}</div>
</div>
```

User should see inputs AND results at once. The only exception is tools where the result is genuinely a separate experience (e.g. a multi-step quiz, a game).

## 8. Big empty headings inside tool components

**BAD:**
```jsx
<Card>
  <h2 className="text-2xl font-bold mb-4">Tool Name</h2>
  <h3>Configuration</h3>
  {/* inputs */}
</Card>
```

**GOOD:**
```jsx
<div className="space-y-4">
  {/* just the inputs, no redundant heading */}
</div>
```

The page already has an `<h1>` with the tool name at the top (rendered by the tool page layout). Don't duplicate it inside the component.

## 9. `import { X } from 'lucide-react'`

**BAD:**
```jsx
import { Copy, Download, Share } from 'lucide-react';
<Copy className="w-4 h-4" />
```

**GOOD:**
```jsx
{/* Use inline SVG or text symbols */}
<svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="..." /></svg>
{/* Or even simpler: */}
<span>📋</span>
<span>✓</span>
```

Lucide adds 100kb+ of JS for icons we can replicate with 3-line SVGs. Not worth it.

## 10. Named exports for components

**BAD:**
```jsx
export function MyComponent() { ... }
```

**GOOD:**
```jsx
export default function MyComponent() { ... }
```

All components use DEFAULT exports. The `tool-components.js` dynamic imports assume this.

## 11. Em dashes

**BAD:** "Calculate your tax—instantly—and save."

**GOOD:** "Calculate your tax - instantly - and save."

Site-wide convention. Em dashes are inconsistent across fonts and unprofessional for utility UI.

## 12. Calling random/generator functions in render body

**BAD:**
```jsx
export default function Quiz() {
  const question = generateQuestion();  // runs on every render!

  return <div>{question.text}</div>;
}
```

**GOOD:**
```jsx
export default function Quiz() {
  const [question, setQuestion] = useState(() => generateQuestion());

  return <div>{question.text}</div>;
}

// or with useMemo bounded to deps that change intentionally
const question = useMemo(() => generateQuestion(), [roundNumber]);
```

This was the Country Quiz bug - a new question was generated on every render, breaking the quiz entirely.

## 13. `opacity-*` for disabled text (use colour instead)

**BAD:**
```jsx
<p className="text-white text-opacity-60">Label</p>  {/* broken in many Tailwind versions */}
```

**GOOD:**
```jsx
<p className="text-white/70">Label</p>  {/* modern alpha syntax */}
<p className="text-text-muted">Label</p>  {/* semantic token */}
<p className="text-gray-400">Label</p>  {/* on dark bg, use gray-400 not opacity */}
```

## 14. Green-50 / blue-50 info boxes

**BAD:**
```jsx
<div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
  <p className="text-blue-700">ℹ Pro tip: ...</p>
</div>
```

**GOOD:**
```jsx
<div className="bg-accent/5 border border-accent/20 p-4 rounded-lg">
  <p className="text-text-secondary">ℹ Pro tip: ...</p>
</div>
```

Or just use subtle `bg-surface border border-border`. The garish tinted info boxes are dated.

## 15. Forgetting `.catch(() => {})` on `navigator.clipboard.writeText`

**BAD:**
```jsx
await navigator.clipboard.writeText(text);  // throws in iframes, Safari private mode, etc.
```

**GOOD:**
```jsx
try {
  await navigator.clipboard.writeText(text);
} catch {}
```

Or `.catch(() => {})` inline. Clipboard API fails silently in many contexts.
