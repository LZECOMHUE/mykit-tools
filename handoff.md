# MyKit.tools SEO Recovery — Handoff

Updated: 2026-04-30 (second pass)

## Status: Country sprint complete - 108/108 country tools have content

The 887→310 GSC indexing collapse recovery is in maintenance mode. Country tools sprint was the major remaining work; only 1 of 108 tools still pending.

- **Track A** (technical fixes): all shipped 2026-04-28. Vercel.json, robots.js, category canonicals, tag page filter, country-prefix noindex regex, X-Robots-Tag header.
- **Track B content sprint**: shipped 2026-04-29. 24 Tier 1 + 277 Tier 2 + 20 at-risk Tier 1 + 167 at-risk Tier 2.
- **travel.js duplicate-key cleanup**: shipped 2026-04-29. 1,268 → 849 lines.
- **Country tools sprint round 1**: shipped 2026-04-30. 50 finance country tools (24 US, 12 Canada, 10 Australia, 4 India). finance.js grew 2,116 → 4,570 lines.
- **Country tools sprint round 2**: 2026-04-30 (in working tree, not yet pushed). 50 more country tools across 11 files. 21 finance + 7 education + 5 home + 4 automotive + 2 travel + 2 datetime + 2 cooking + 2 health + 2 seasonal + 2 parenting + 1 wedding. Total +5,108 lines across all files.

**All 108 country tools now have SEO content** (lib/seo.js auto-flips them indexable once pushed). Final entry `us-to-eu-shoe-size` added 2026-04-30 after dev-server DOM verification of 3 sample country pages confirmed correct rendering and `index, follow` robots meta.

GSC validation requested for the original sprint. Push the round 2 changes when ready and the country tools complete the recovery sprint.

## Open to-do (priority order)

### 1. Country-prefix tools — DONE (108/108)

Sprint complete 2026-04-30. All 108 country-prefix tools have SEO content. Verified via dev-server DOM inspection that lib/seo.js correctly emits `index, follow` for tools with content (was emitting `noindex, follow` before content existed).

108 country-prefix tools (us-/canada-/australia-/india-) total. As of 2026-04-30: **57 have content (indexable), 51 still pending**.

Pending breakdown (in `tmp-seo/country_pending.json`):
- finance (21): the lower-intent tier of finance country tools - us-cooking-measurement-converter, us-gas-cost-calculator, us-hsa-calculator, us-w2-vs-1099-comparison, us-closing-costs-calculator, canada-tipping-calculator, canada-maternity-leave-calculator, india-emi-calculator, india-gold-rate-calculator, india-gratuity-calculator, india-fd-calculator, india-ppf-calculator, india-gst-calculator, australia-pension-age-calculator, australia-fuel-cost-calculator, australia-cost-of-living-by-city, australia-contractor-vs-employee, plus a few stragglers
- education (7): us-gpa-calculator, us-back-to-school-calculator, canada-immigration-points-calculator, india-school-admission-age-calculator, us-college-cost-calculator, us-school-grade-calculator, canada-university-tuition-estimator
- home (5): canada-heating-cost-calculator, india-electricity-bill-calculator, australia-water-usage-calculator, australia-electricity-plan-comparison, australia-pet-registration-cost
- automotive (4): us-ev-tax-credit-checker, us-gas-price-tracker, canada-winter-tyre-date-checker, australia-school-zone-speed-reminder
- travel (2), datetime (2), cooking (2), health (2), seasonal (2), parenting (2), converters (1), wedding (1)

How it works:
- Once an SEO entry exists in `data/seo-content/<category>.js`, `lib/seo.js` auto-flips that slug from `noindex` to indexable. No registry change needed.
- The first 50 sprint added entries directly without using agents - significantly more token-efficient than the Wave B agent pattern. Recommended approach for the next batch too.
- Estimated remaining effort: 4-7 hours of copy if done in-context (without agents).

To regenerate the pending list (already saved to `tmp-seo/country_pending.json`):
```bash
node -e "
const fs = require('fs');
const path = require('path');
const reg = fs.readFileSync('lib/tool-registry.js', 'utf8');
const re = /slug:\s*[\"']([^\"']+)[\"'][\s\S]*?category:\s*[\"']([^\"']+)[\"']/g;
const entries = [];
let m;
while ((m = re.exec(reg)) !== null) entries.push({ slug: m[1], category: m[2] });
const cp = entries.filter(e => /^(us|canada|australia|india)-/.test(e.slug));
const present = new Set();
for (const f of fs.readdirSync('data/seo-content').filter(f => f.endsWith('.js') && f !== 'index.js')) {
  const c = fs.readFileSync(path.join('data/seo-content', f), 'utf8');
  const sr = /^\s\s\"([a-z0-9-]+)\":\s*\{/gm; let s;
  while ((s = sr.exec(c)) !== null) present.add(s[1]);
}
const pending = cp.filter(e => !present.has(e.slug));
const grouped = {};
for (const e of pending) (grouped[e.category] ||= []).push(e.slug);
fs.writeFileSync('tmp-seo/country_pending.json', JSON.stringify(grouped, null, 2));
console.log('Pending:', pending.length);
"
```

Tax/finance writer notes:
- Check actual rate constants in tool components before writing the prose (don't make up numbers)
- US: federal + state income tax, FICA, 401k limits - values change by year
- Canada: federal + provincial, CPP/EI, TFSA/RRSP limits
- Australia: ATO income tax (Stage 3 from July 2024: 16%/30%/37%/45%), Medicare levy 2%, super 11.5% rising to 12% July 2025
- India: income tax slabs (new regime default from 2024-25), GST 5/12/18/28%, sec 80C cap ₹1.5 lakh

### 2. Tier 3 sprint — 169/236 done (72%)

150 entries added across three rounds 2026-04-30. Light-touch shape: ~41 lines per entry (1 paragraph + table + 1 paragraph + 2 FAQs + 3 relatedTools). All in working tree.

**Rounds 1-2 (100):** Converters (mostly cleared), cooking, datetime, maths.

**Round 3 (50):** Cleared 8 small categories (business, music, home niche, creative niche, sports, cooking remainder, health, automotive) + 5 finance + 5 maths + 6 text + 17 seasonal. Spans 12 files. Highest variety round so far.

**Tier 3 status: 169/236 done, 67 pending.**
- converters (35) — niche specialty: square-yards/km, frequency (hz/khz/mhz/ghz), force (newtons), atm/psi inverse, gradians, named tools (clothing-size-converter, paper-size-converter, fuel-consumption-converter, speed-limit-converter, etc.)
- fun (13) — name generators (pirate, wizard, rapper, superhero, band, elf, pop-star, fantasy-tavern, vampire-name patterns)
- datetime (8) — remaining: months-to-days, years-to-days, milliseconds, etc.
- developer (6) — base64-converter, url-encoder, uuid-generator, hash-generator, lorem-ipsum-generator, html-entity-encoder
- text (5) — string-repeater, remove-duplicate-lines, random-text-generator, text-to-csv-converter, email-extractor

Estimated 1-2 sessions to clear remaining 67. Same direct-in-context approach.

## Files of interest

- `data/seo-content/*.js` — SEO content per category. `index.js` wires them via `allSEOContent` and `getSEOContent(slug)`.
- `lib/tool-registry.js` — central tool registry. Source of truth for slugs/tiers/categories.
- `lib/seo.js` — generates per-tool metadata, including the country-prefix noindex regex.
- `~/.claude/skills/mykit-copywrite/SKILL.md` — voice rules, banned phrases, shape spec.
- `tmp-seo/` — session scratch (already gitignored). Use for pending lists and audit dumps.
- `seo-data/` — GSC exports. Add new ones as `seo-data/extracted_YYYY_MM_DD/`.

## Reference shape

Use `data/seo-content/parenting.js` first entry `birthday-party-game-planner` (lines 7-57) as the standard exemplar — 4 `createAnswerFirstSection` calls + 4-5 `createFAQ` calls + 3-4 `relatedTools` entries. ~50 lines per entry. Don't try to read `finance.js` `uk-tax-calculator` for shape reference; that file is now too large to be cheap to load.

## Hard rules (still apply)

- British spelling (colour, organisation, favour, metres, litres). For US/Canada/Australia tools, US spelling is OK in the prose if it sounds more natural to a local reader, but stay consistent within an entry.
- No em dashes anywhere; use commas, "or", semicolons, or " - " (space hyphen space)
- relatedTools entries use `label:` not `name:` (not `title:` either)
- Sister tools must have materially different prose. Don't copy and tweak from the previous entry.
- Voice is plainspoken-helpful with concrete numbers and worked examples. Never lead with "Whether you're..." or "In today's fast-paced world..."

## Bloat lessons (still relevant)

The previous bloat lessons from the original handoff still apply for any future content sprint:

1. **Use the mykit-copywrite skill** rather than re-typing voice rules in every agent prompt.
2. **Don't read the full finance.js exemplar** — point at parenting.js birthday-party-game-planner instead.
3. **Have agents grep components, not read whole files**, to extract the few constants they need.
4. **Cap parallelism at 3-4 agents.** Run sequential rounds rather than piling on parallelism.
5. **Build verify between rounds** so a syntax error doesn't compound across multiple agents.
