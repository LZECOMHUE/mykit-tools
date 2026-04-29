# MyKit.tools SEO Recovery — Handoff

Updated: 2026-04-29

## Status: Wave B complete

The 887→310 GSC indexing collapse recovery is now in maintenance mode. Everything from the original recovery plan is shipped:

- **Track A** (technical fixes): vercel.json www→non-www redirect, robots.js Googlebot/Bingbot fix, category page canonicals, tag page filter, country-prefix noindex flag in lib/seo.js, removed conflicting global X-Robots-Tag header. Pushed 2026-04-28.
- **Track B content sprint**: 24 Tier 1 flagships + 277 Tier 2 (April 27 GSC list) + 20 at-risk currently-indexed Tier 1 + 167 at-risk currently-indexed Tier 2. All pushed 2026-04-29.
- **travel.js duplicate-key cleanup**: 8 dead duplicate entries removed (1,268 → 849 lines), 0 behaviour change. Done 2026-04-29.

GSC validation requested. Now waiting for Google to re-index. Monitor the GSC Coverage and Performance reports weekly.

## Open to-do (priority order)

### 1. Country-prefix tools — write content for all 93 (Path A chosen)

108 country-prefix tools (us-/canada-/australia-/india-) exist; 93 are auto-noindexed because they have no SEO content. User chose **Path A**: write content for all 93 rather than deleting.

Breakdown:
- 43 `us-` tools, 25 `canada-`, 26 `australia-`, 14 `india-`
- 76 of 108 are finance (income tax, GST/HST, mortgage/EMI, payroll, super, etc)
- The other 32 scatter across education, automotive, home, health, datetime, travel

How it works:
- Once an SEO entry exists in `data/seo-content/<category>.js`, `lib/seo.js` auto-flips that slug from `noindex` to indexable. No registry change needed.
- Suggested batching: by country prefix first (us → canada → australia → india), then by category within each. Finance is the bulk; tackle that first.
- 5-10 slugs per agent, follow the same Wave B pattern (mykit-copywrite skill + build verify between rounds).
- Estimated effort: 7.5-15 hours of copy in batches.

To regenerate the pending list:
```bash
node -e "
const { tools } = require('./lib/tool-registry.js');
const { getSEOContent } = require('./data/seo-content/index.js');
const pending = tools.filter(t => /^(us|canada|australia|india)-/.test(t.slug) && !getSEOContent(t.slug));
console.log(JSON.stringify(pending.map(t => t.slug).sort(), null, 2));
"
```
(or write to `tmp-seo/country_pending.json` for the next session to consume.)

Tax/finance writer notes:
- Check actual rate constants in tool components before writing the prose (don't make up numbers)
- US: federal + state income tax, FICA, 401k limits — values change by year
- Canada: federal + provincial, CPP/EI, TFSA/RRSP limits
- Australia: ATO income tax, Medicare levy, super (currently 11.5%, rising to 12% July 2025)
- India: income tax slabs (new vs old regime), GST 5/12/18/28%, sec 80C cap

### 2. Tier 3 sprint — small-copy converters

~225 simple converters/calculators without SEO content. Lower priority because Google's quality bar is lower for converters.

- 150-250 words per entry (vs 350-700 for Tier 2)
- Can be batched in larger chunks (15-25 per agent)
- Many are cross-converter pairs (kg→lbs and lbs→kg) — the prose can mostly mirror with units swapped
- User said this happens "in batches" — no urgency

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
