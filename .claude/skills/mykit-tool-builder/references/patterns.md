# MyKit Tool Patterns - Code Templates

Copy-paste ready patterns for common tool shapes. Every pattern here follows the 12 commandments in SKILL.md.

## Container patterns

### The basic tool wrapper
```jsx
return (
  <div className="space-y-4">
    {/* tool content */}
  </div>
);
```
No `max-w-*`, no `mx-auto`, no root padding - the page layout handles that.

### A content card
```jsx
<div className="bg-surface border border-border rounded-xl p-4">
  {/* content */}
</div>
```
OR use `<Card>` from `@/components/ui/Card` (has built-in `p-4 sm:p-5`).

### A white content card (stands out more than surface)
```jsx
<div className="bg-white border border-border rounded-xl p-4">
  {/* content */}
</div>
```

## Pill selector (THE signature UI element)

Use for ANY selection with 2-6 mutually exclusive options.

```jsx
const options = [
  { value: 'a', label: 'A', icon: '🎯' },
  { value: 'b', label: 'B', icon: '⚡' },
  { value: 'c', label: 'C', icon: '🌊' },
];

<div className="flex flex-wrap gap-1.5">
  {options.map((o) => (
    <button
      key={o.value}
      onClick={() => setValue(o.value)}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
        value === o.value
          ? 'bg-accent text-white'
          : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
      }`}
    >
      {o.icon} {o.label}
    </button>
  ))}
</div>
```

For labelled pill rows (as in settings panels):
```jsx
<div className="flex items-center gap-3">
  <label className="text-xs font-medium text-text-secondary w-24 shrink-0">Mode</label>
  <div className="flex gap-1.5">
    {/* pills here */}
  </div>
</div>
```

## Primary action button (when you DO need one)

```jsx
<button
  onClick={handler}
  className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors"
>
  {result ? 'Generate Another' : 'Generate'}
</button>
```

Or for inline / secondary action:
```jsx
<button className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors">
  Action
</button>
```

## Input fields

### Number input
```jsx
<div>
  <label className="text-xs text-text-muted block mb-1">Label</label>
  <input
    type="number"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary font-mono focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
  />
</div>
```

### Text input
```jsx
<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Placeholder"
  className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
/>
```

### Textarea
```jsx
<textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Placeholder"
  rows={4}
  className="w-full px-3 py-2 border border-border rounded-lg bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-y font-mono text-sm"
/>
```

### Time input
```jsx
<input
  type="time"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  className="px-2.5 py-1.5 rounded-lg border border-border bg-white text-sm font-mono text-text-primary outline-none focus:border-accent"
/>
```

### Range slider with number display
```jsx
<div className="flex items-center gap-3">
  <input
    type="range"
    min="0"
    max="100"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="flex-1 h-2 bg-border rounded-lg appearance-none cursor-pointer"
  />
  <span className="font-mono text-sm font-bold text-text-primary w-12 text-right">{value}</span>
</div>
```

## Result display patterns

### Hero number with stat grid (the best pattern)
```jsx
<div className="bg-surface border border-border rounded-xl overflow-hidden">
  {/* Dark header with the big result */}
  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Total</p>
    <p className="font-mono text-3xl md:text-4xl font-bold text-white">{result.total}</p>
  </div>

  {/* Stats grid - gaps form borders, white cells */}
  <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border">
    <div className="bg-white px-4 py-3">
      <p className="text-[10px] uppercase tracking-wider text-text-muted mb-0.5">Label</p>
      <p className="font-medium text-sm text-text-primary">{result.value}</p>
    </div>
    {/* more cells */}
  </div>
</div>
```

### Inline stats strip (lighter alternative)
```jsx
<div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
  <div>
    <p className="text-[10px] uppercase tracking-wider text-text-muted">Count</p>
    <p className="font-mono text-xl font-bold text-text-primary">{count}</p>
  </div>
  <div>
    <p className="text-[10px] uppercase tracking-wider text-text-muted">Average</p>
    <p className="font-mono text-xl font-bold text-text-primary">{avg}</p>
  </div>
</div>
```

### Copy-to-clipboard with toast
```jsx
const [copied, setCopied] = useState(false);

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  } catch {}
};

// In JSX
<button onClick={handleCopy} className="...">
  {copied ? '✓ Copied' : 'Copy'}
</button>
```

## Common component shapes

### Side-by-side option comparison (A vs B decision tools)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  <div className="bg-surface border border-border rounded-xl p-4">
    <p className="font-heading font-bold text-sm text-text-primary mb-2">Option A</p>
    {/* inputs */}
  </div>
  <div className="bg-surface border border-border rounded-xl p-4">
    <p className="font-heading font-bold text-sm text-text-primary mb-2">Option B</p>
    {/* inputs */}
  </div>
</div>

{/* Verdict below */}
<div className="bg-surface border border-border rounded-xl overflow-hidden">
  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Verdict</p>
    <p className="font-heading text-2xl font-bold text-white">{verdict}</p>
  </div>
</div>
```

### Themed selector grid (for themes, colours, icon choices)
```jsx
<div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
  {themes.map((t) => (
    <button
      key={t.id}
      onClick={() => setTheme(t.id)}
      className={`aspect-square rounded-lg border-2 transition-colors ${
        theme === t.id ? 'border-accent' : 'border-border hover:border-accent/30'
      }`}
      style={{ background: t.preview }}
    >
      <span className="text-lg">{t.icon}</span>
    </button>
  ))}
</div>
```

### Timeline / event list
```jsx
<div className="bg-surface border border-border rounded-xl overflow-hidden">
  <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3">
    <p className="font-heading text-lg font-bold text-white">Timeline</p>
  </div>
  <div className="divide-y divide-border">
    {events.map((e, i) => (
      <div key={i} className="flex items-start gap-3 px-4 py-2.5">
        <span className="text-lg mt-0.5">{e.icon}</span>
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-bold text-accent">{e.time}</span>
            <span className="text-sm font-medium text-text-primary">{e.title}</span>
          </div>
          <span className="text-xs text-text-muted">{e.detail}</span>
        </div>
      </div>
    ))}
  </div>
</div>
```

### Checkbox list (todos, checklists)
```jsx
<div className="bg-surface border border-border rounded-xl">
  <div className="divide-y divide-border">
    {items.map((item) => (
      <label key={item.id} className="flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-white/50">
        <input
          type="checkbox"
          checked={item.checked}
          onChange={() => toggle(item.id)}
          className="w-4 h-4 rounded"
        />
        <span className={`text-sm ${item.checked ? 'line-through text-text-muted' : 'text-text-primary'}`}>
          {item.label}
        </span>
      </label>
    ))}
  </div>
</div>
```

## Spacebar shortcut for generators

```jsx
useEffect(() => {
  const onKey = (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      generate();
    }
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [generate]);
```

## Share to social / native share

```jsx
const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'My Result',
        text: shareText,
        url: window.location.href,
      });
      return;
    } catch {}
  }
  // Fallback: copy to clipboard
  try {
    await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  } catch {}
};
```

## Semantic colours (USE THESE, not raw hex/Tailwind numbers)

```
bg-accent         = primary action colour (blue #2563eb)
bg-accent-hover   = darker hover state
bg-accent-muted   = accent at 7% opacity (for subtle highlights)
bg-accent/5       = accent at 5% opacity (subtle tint)
bg-accent/10      = accent at 10% opacity (slightly stronger tint)
bg-accent-warm    = warm amber (premium badges, stars)
bg-surface        = card background (#f8f8f8)
bg-surface-hover  = hover state for interactive surfaces
bg-white          = pure white cards
bg-border         = light grey for dividers (use on grid gap-px)

text-text-primary    = headings, primary content
text-text-secondary  = descriptions, labels
text-text-muted      = placeholders, helper text
text-accent          = accent blue text

border-border        = default borders
border-border-hover  = hover state
border-accent        = accent borders
border-accent/30     = subtle accent border (for hover states)

success, warning, error, info - semantic states (sparingly)
```

NEVER use `bg-blue-500`, `bg-green-100`, `bg-purple-700` etc. directly for containers. Only for tiny indicators like legend dots.
