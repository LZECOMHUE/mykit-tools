# MyKit Tool Pre-Ship Checklist

Run through this list BEFORE declaring a tool complete. Any unchecked item = not done.

## Visual / Layout

- [ ] No `max-w-*mx-auto` on root div
- [ ] `space-y-4` or similar for vertical rhythm between sections (not `space-y-6` or `space-y-8`)
- [ ] Every container with `bg-*` or `border` has internal padding (`p-3`, `p-4`, or `px-X py-Y`)
- [ ] No nested Cards or boxes-in-boxes
- [ ] No garish coloured containers (`bg-blue-700`, `bg-green-50`, `bg-purple-900`, etc.)
- [ ] Dark gradient header + white grid pattern used for hero results (where appropriate)
- [ ] Mobile layout tested at 375px width (no horizontal scroll, touch targets ≥44px)

## Inputs / Controls

- [ ] Pill buttons used for 2-6 option selectors (not `<select>` or `<Select>`)
- [ ] All inputs have `focus:border-accent focus:ring-1 focus:ring-accent` for focus state
- [ ] Numbers displayed in `font-mono`
- [ ] Labels above inputs (not inside placeholder only)
- [ ] Native `<select>` used only for >6 options (countries, timezones, fonts, etc.)

## Behaviour

- [ ] Results update live via `useMemo` (no "Calculate" button on simple tools)
- [ ] Inputs and results visible simultaneously (no "form then scroll to results")
- [ ] If tool has random generation, spacebar triggers it
- [ ] Copy-to-clipboard buttons have `try/catch` or `.catch()` fallback
- [ ] Copy button shows "✓ Copied" toast for 1.5s then reverts
- [ ] `generateQuestion()` / random functions NOT called directly in render body (use state/useMemo)
- [ ] Reset/clear button where appropriate

## Code hygiene

- [ ] `export default function` (no named exports for the main component)
- [ ] No `import ... from 'lucide-react'`
- [ ] Text uses " - " not em dashes
- [ ] Semantic colours (`bg-accent`, `text-text-primary`, etc.) - no raw Tailwind numbers for containers
- [ ] `'use client'` directive at top if using hooks
- [ ] `useCallback` for handlers passed to children or used in useEffect deps
- [ ] No console.log left behind

## Registry

- [ ] Entry added to `/lib/tool-registry.js` with all required fields:
  - [ ] slug (unique, kebab-case)
  - [ ] name (title case)
  - [ ] description (120-160 chars)
  - [ ] category (exactly one from categories.js)
  - [ ] tags (3-7 relevant tags, lowercase kebab)
  - [ ] keywords (comma-separated search terms)
  - [ ] tier (1, 2, or 3)
  - [ ] feature flags (hasSave, hasPremiumExport, hasAI, hasMultipleVariants)
  - [ ] dateAdded, lastReviewed (today's date)

- [ ] Entry added to `/lib/tool-components.js` with dynamic import

## SEO

- [ ] 150-300 words SEO content added to `/data/seo-content/<category>.js`
- [ ] Content includes 2-3 internal links to related tools
- [ ] Keywords from registry appear naturally in content
- [ ] FAQ section with 3-5 common questions (for FAQ schema)
- [ ] No em dashes in SEO content

## Build

- [ ] `npx next build` completes with no errors
- [ ] Tool page loads in browser at `http://localhost:3000/<slug>`
- [ ] Tool works end-to-end (inputs → outputs)
- [ ] No console errors in browser
- [ ] No hydration warnings

## Premium / monetisation (if applicable)

- [ ] `DownloadGate` component integrated if `hasPremiumExport: true`
- [ ] Free output has watermark / is lower quality
- [ ] Premium output is print-ready (300 DPI for images, proper typography for PDFs)
- [ ] `freeGenerator` and `premiumGenerator` functions defined

## Categories with specific conventions

### Finance
- Country detection via `detectUserCountry()` where relevant
- UK tax rates for current tax year
- Currency formatting using `Intl.NumberFormat`

### Generators (names, quotes, etc.)
- Default exports only
- Copy button prominent
- Spacebar shortcut to regenerate
- 10+ entries per category minimum (not 3)

### Converters (Tier 3)
- Use `ConverterTemplate` from `@/components/templates/ConverterTemplate`
- Don't build custom - template handles everything
- Quick reference table of common values
- Formula displayed
- Reverse conversion button

### Kids activities
- Age band variants (3-5, 5-7, 7-9, 9-12) where relevant
- Each variant is its own registry entry + page
- Pre-built content in `/data/kids-activities/`

### When-is tools
- Show countdown to next occurrence
- Historical dates list
- Add to calendar button
- Calculate and show number of days
