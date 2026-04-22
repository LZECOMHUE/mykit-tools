---
name: mykit-tool-builder
description: Build a new tool page for MyKit.tools following the site's UX-First design philosophy. Use whenever the user asks to build, create, or add a new tool, calculator, converter, or generator to the MyKit.tools site. Guarantees compact layout, live updates, pill selectors, proper padding, and no anti-patterns.
tools: Read, Write, Edit, Glob, Grep, Bash
---

# MyKit Tool Builder

Build a new tool for MyKit.tools with consistently excellent UX. Every tool built via this skill will be compact, intuitive, fun, and free of the recurring anti-patterns we've had to fix repeatedly.

## Invocation

Call this skill when the user asks to build a new MyKit tool. The user may say things like:
- "Build a fortune cookie generator"
- "Add a Mad Libs tool"
- "Create a should I pay off debt or save calculator"

## Mandatory workflow (do these in order)

### 1. Gather requirements

Before writing any code, confirm:
- **Tool name** and **suggested slug** (kebab-case, e.g. `fortune-cookie-generator`)
- **Category** - verify against the real list by grepping the registry: `grep -oE 'category: "[a-z-]+"' lib/tool-registry.js | sort -u`. Canonical categories as of April 2026 include: finance, cooking, games, developer, text, converters, health, wedding, education, home, business, travel, datetime, maths, creative, parenting, automotive, seasonal, music, fun, quiz, sports, international-finance.
- **Tier** (1=flagship, 2=solid utility, 3=simple converter/calculator)
- **Core functionality** in one sentence
- **Premium export?** (yes/no)
- **Save system?** (yes/no - only for Tier 1 multi-step tools)

If in doubt about category name, check `/components/` subdirectories - each category has a matching folder (e.g. `fun-tools/`, `music-tools/`).

### 2. Read the design bible

Read these files first to ground yourself:
- `references/patterns.md` - code templates for common tool shapes
- `references/anti-patterns.md` - things to NEVER do
- `references/checklist.md` - pre-ship verification

### 3. Build in three files

Every tool needs:

**File 1: `/components/<category>-tools/<ComponentName>.jsx`** - the interactive component

**File 2: Registry entry in `/lib/tool-registry.js`** - add before the closing `];` of the tools array. Must **Read** the file first (it's 12k+ lines - use `offset` and `limit` to find a reasonable insertion point; append near the end is fine).

**File 3: Component mapping in `/lib/tool-components.js`** - add a line like `"slug": dynamic(() => import("@/components/<category>-tools/<ComponentName>")),` under the matching category comment block. The file has section headers like `// ── Finance Tools ──` - find the right section with Grep first. Must **Read** the file before editing.

**File 4 (for SEO): `/data/seo-content/<category>.js`** - MUST **Read** this file before editing. Use the helper-function format shown below. The file has a rule comment at the top about not using em dashes.

### 4. Verify

Run `npx next build 2>&1 | grep -E "error|Error|✗" | head -5` and ensure clean output.

## The 12 commandments

These are NON-NEGOTIABLE. Violating any of these means the tool needs rework.

1. **Live updates via useMemo** - no "Calculate" button on simple calculators. Results appear as user types.
2. **Pill selectors, not dropdowns** - for any selection with 2-6 options, use pill buttons (see patterns.md)
3. **Internal padding on every container** - any `<div>` with `bg-*` or `border` MUST have `p-3`, `p-4`, or `px-4 py-3`
4. **No nested Cards** - one border layer max per section
5. **No colored result blocks** - no `bg-blue-700`, `bg-purple-600`, `bg-green-50`, etc. Use `bg-surface`, `bg-accent/5`, or the dark-header-white-grid pattern (see patterns.md)
6. **No `max-w-*mx-auto` on root** - page layout handles width; tools fill their slot
7. **No "form then results" layouts** - inputs and outputs visible simultaneously
8. **Results are the hero** - big `font-mono text-3xl` or `text-4xl` number, compact controls secondary
9. **Copy button inline on text outputs** - with 1.5s success toast
10. **Spacebar shortcut** for generators - rolls again / generates another
11. **No em dashes** - use " - " instead throughout. This applies EVERYWHERE: SEO content, verdict strings, label strings inside the component, tooltips, registry descriptions. Search `—` before declaring done.
12. **DEFAULT exports only, no lucide-react** - never import lucide, use inline SVG or text symbols

## Tool shape templates

For common tool shapes, follow these structural patterns exactly:

### A. Simple calculator (SAT, tip, BMI style)
```jsx
'use client';
import { useState, useMemo } from 'react';

export default function ToolName() {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');

  const result = useMemo(() => {
    // compute from inputs
    return { ... };
  }, [input1, input2]);

  return (
    <div className="space-y-4">
      {/* Inputs side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="First" value={input1} onChange={setInput1} />
        <Field label="Second" value={input2} onChange={setInput2} />
      </div>

      {/* Hero result */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">Total</p>
          <p className="font-mono text-3xl font-bold text-white">{result.total}</p>
        </div>
        <div className="grid grid-cols-3 gap-px bg-border">
          <Stat label="X" value={result.x} />
          <Stat label="Y" value={result.y} />
          <Stat label="Z" value={result.z} />
        </div>
      </div>
    </div>
  );
}
```

### B. Generator with categories (name gens, fortune cookie, mad libs)
```jsx
const categories = [
  { value: 'x', label: 'X', icon: '🎯' },
];

export default function ToolName() {
  const [type, setType] = useState('x');
  const [result, setResult] = useState(null);

  const generate = useCallback(() => { /* pick random */ }, [type]);

  return (
    <div className="space-y-4">
      {/* Pills */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((c) => (
          <button key={c.value} onClick={() => { setType(c.value); setResult(null); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              type === c.value ? 'bg-accent text-white' : 'bg-surface border border-border text-text-secondary hover:border-accent/30 hover:text-accent'
            }`}>{c.icon} {c.label}</button>
        ))}
      </div>

      <button onClick={generate}
        className="w-full py-3 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-colors">
        {result ? 'Generate Another' : 'Generate'}
      </button>

      {result && (
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4">
            <p className="font-heading text-2xl md:text-3xl font-bold text-white">{result.name}</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            {/* detail cells */}
          </div>
        </div>
      )}
    </div>
  );
}
```

### C. Tier 3 converter
USE `ConverterTemplate` from `@/components/templates/ConverterTemplate`. Don't build a custom component.

### D. Decision tool ("Should I X or Y")
```jsx
// Side-by-side comparison with weighted result
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  <div className="bg-surface border border-border rounded-xl p-4">Option A inputs</div>
  <div className="bg-surface border border-border rounded-xl p-4">Option B inputs</div>
</div>
{/* Hero verdict card with recommendation */}
```

### E. Text utility (truncator, trimmer, sorter)
- Large textarea for input
- Small controls row (pills or inline inputs)
- Live output below with copy button
- Optional stats strip (count, chars, etc.) in `grid grid-cols-3 gap-px bg-border`

## Multi-step interactions and animations

For tools with "reveal" moments (cracking, flipping, rolling, drawing):

```jsx
const [stage, setStage] = useState('idle'); // 'idle' | 'revealing' | 'revealed'
const [result, setResult] = useState(null);

const trigger = useCallback(() => {
  if (stage === 'revealing') return;
  setStage('revealing');
  const newResult = generate();
  // Brief delay for satisfying animation
  setTimeout(() => {
    setResult(newResult);
    setStage('revealed');
  }, 400);
}, [stage]);

// Reset to 'idle' on category/input change so user can trigger again
useEffect(() => {
  setStage('idle');
  setResult(null);
}, [category]);
```

Use CSS transitions via Tailwind for the animation itself:
```jsx
<div className={`transition-all duration-500 ${
  stage === 'revealing' ? 'scale-110 opacity-50' : stage === 'revealed' ? 'scale-100 opacity-100' : ''
}`}>
  {/* animated element */}
</div>
```

Keep animation duration ≤500ms - longer feels sluggish.

## Tool-specific SVG artwork

For tools with custom illustrations (cookies, dice, cards, mascots):
- Keep SVGs simple (geometric shapes, ≤20 path elements)
- Use `fill="currentColor"` for elements that should follow text color
- For static decorative colours, use CSS custom properties or semantic class names (not raw hex): `fill="var(--color-accent)"` or inline Tailwind via the `className` on path
- Inline SVGs directly in the component (don't import from asset files for simple shapes)
- Size via `className="w-32 h-32"` on the `<svg>` tag - don't hardcode width/height attrs

Example:
```jsx
<svg viewBox="0 0 100 100" className="w-32 h-32 text-accent">
  <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.1" />
  <path d="M30 50 L50 70 L70 30" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
</svg>
```

## Share/download integration

For tools that produce shareable output:
- **JPG share card** - render to canvas, use `/lib/download-utils.js` `downloadAsJPG`
- **PDF premium** - use `/lib/worksheet-pdf.js` or jsPDF directly
- **Copy button** - navigator.clipboard.writeText + "Copied!" toast for 1.5s
- **Share button** - use native `navigator.share({ title, text, url })` with fallback to copy

## Registry entry template

Add to `/lib/tool-registry.js` before the closing `];` of the `tools` array.

```javascript
{
  slug: "tool-slug",
  name: "Tool Name",
  description: "120-160 chars explaining what it does and why someone would use it",
  category: "category-slug",
  alsoIn: ["other-category"],  // OPTIONAL - tool also appears in these category listings
  tags: ["primary-tag", "secondary", "related"],
  keywords: "primary keyword, secondary keyword, search phrase",
  tier: 2,
  hasSave: false, hasPremiumExport: false, hasAI: false, hasMultipleVariants: false,
  seoTitle: null, ogImage: null, relatedSlugs: null,
  dateAdded: "2026-04-16", lastReviewed: "2026-04-16",
},
```

**Field notes:**
- **`description`**: Exactly 120-160 chars - this doubles as the meta description. Check with `echo -n "your description" | wc -c` before committing.
- **`alsoIn`** (optional): If the tool reasonably belongs in a second category too, add it here. Example: a VAT calculator might have `category: "finance", alsoIn: ["business"]`.
- **`relatedSlugs`** (optional): Array of 3-6 slugs if you want to manually curate related tools shown at the bottom of the page. If `null`, related tools auto-generate from category + tag matching.
- **`tags`**: Lowercase, kebab-case. Target both broad and specific (e.g. `["calculator", "debt", "savings", "uk", "finance"]`).
- **`keywords`**: Comma-separated target search queries, in the order users would actually type them.

## SEO content

Every tool page needs 150-300 words of SEO content. Add to `/data/seo-content/<category>.js` using the helper functions (NOT raw objects).

**Import helpers at top of file if not already imported:**
```javascript
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";
```

**Add entry inside the exported object:**
```javascript
export const funSEO = {
  // ... existing entries ...

  "tool-slug": {
    sections: [
      createAnswerFirstSection(
        "How the Tool Works",  // h2 heading
        "Short answer paragraph (2-4 sentences) that directly answers the most common question.",  // answer-first
        "Follow-up detail paragraph with more context, tips, or examples."  // deeper explanation
      ),
      {
        heading: "Data Table Heading",
        table: {
          headers: ["Col 1", "Col 2", "Col 3"],
          rows: [
            ["row a", "row a", "row a"],
            ["row b", "row b", "row b"],
          ],
        },
      },
      createAnswerFirstSection(
        "Another Section",
        "Answer paragraph.",
        "Detail paragraph."
      ),
    ],
    faqs: [
      createFAQ("Question 1?", "Answer paragraph."),
      createFAQ("Question 2?", "Answer paragraph."),
      createFAQ("Question 3?", "Answer paragraph."),
    ],
    relatedTools: [
      { slug: "related-tool-1", label: "Related Tool 1" },
      { slug: "related-tool-2", label: "Related Tool 2" },
      { slug: "related-tool-3", label: "Related Tool 3" },
    ],
  },
};
```

**SEO content rules:**
- Use `createAnswerFirstSection` for prose content (answer-first is good for featured snippets)
- Use plain `{ heading, table: { headers, rows } }` for data tables (no helper needed)
- Use `createFAQ` for FAQ items (generates schema automatically)
- Include 3-5 FAQs (for FAQ schema rich snippets)
- Include 2-3 `relatedTools` (internal linking)
- Never use em dashes (the file has a comment at top enforcing this)
- The `description` field in tool-registry is 120-160 chars (doubles as meta description); SEO content is separate and longer

## Verification (run after build)

```bash
cd /path/to/mykit-tools
npx next build 2>&1 | grep -E "error|Error|✗" | head -5
```

Exit cleanly with no errors.

## Red flags during review

If you catch yourself writing any of these, STOP and reconsider:
- `<Card><Card>` - nested cards, use one border layer
- `bg-blue-700` / `bg-purple-600` / `bg-green-50` as a container background
- `<Select>` with 2-6 options - should be pills
- "Calculate" / "Generate" button on a simple calculator - use useMemo
- `<div className="bg-*">` without `p-X` - missing padding
- `<div className="max-w-*xl mx-auto">` as root - remove it
- Separate "config" and "results" sections with no live preview
- `import { X } from 'lucide-react'` - never do this
