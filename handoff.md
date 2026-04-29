# MyKit.tools SEO Recovery — Handoff

Date written: 2026-04-29. The previous session ran out of usage tokens partway through Wave B.

## Quick context

The site is recovering from a Google indexing collapse (887 → 310 indexed pages between April 7 and April 24). Root cause: 88% of tool pages had no SEO content under the tool widget. We are systematically writing 350-900 word SEO entries for each affected page, anchored to the gold-standard exemplar `data/seo-content/finance.js` `uk-tax-calculator`.

## What's already done

**Track A (technical fixes) — DEPLOYED:**
- `vercel.json` permanent www → non-www redirect
- `app/robots.js` Googlebot/Bingbot duplicate-key bug fixed
- Canonical added to category pages (`app/categories/[category]/page.jsx`)
- Tag page `RelatedTags` filtered to only valid tags via `isValidTag()`
- Country-prefix tools (`/^(us|canada|australia|india)-/`) get `noindex, follow` when no SEO content exists (in `lib/seo.js`)
- Global `X-Robots-Tag` header removed from `next.config.mjs` (was conflicting with per-page noindex)

**Track B (content sprint) — partially deployed, partially in working tree:**
- 24 Tier 1 flagships (the most-rejected) → DONE
- 277 Tier 2 from the April 27 GSC "Crawled - currently not indexed" list → DONE
- 20 Tier 1 at-risk currently-indexed flagships → DONE
- 93 of 167 Tier 2 at-risk currently-indexed → DONE in working tree (Wave B partials)
- **74 Tier 2 at-risk still pending** ← this is the immediate work for the next session

The working tree is **build-clean** as of this handoff. `npx next build` produces 1,425 pages successfully.

## What's pending — 74 slugs across 11 categories

Source of truth: `tmp-seo/wave_b_pending.json`. The 74 slugs:

```
creative (9):    contrast-checker, signature-pad, whiteboard, print-shrinkage-calculator,
                 fabric-cost-calculator, painting-cost-calculator, art-pricing-calculator,
                 soap-calculator, resin-calculator
text (9):        text-diff, readability-checker, fancy-text-generator, email-template-generator,
                 text-reverser, whitespace-remover, text-to-morse-code, readability-score-checker,
                 text-encryption-tool
health (7):      tdee-calculator, heart-rate-zone-calculator, conception-date-calculator,
                 implantation-calculator, fertile-window-calculator, maternity-leave-planner,
                 blood-alcohol-limit-by-country
                 (these go into data/seo-content/fitness.js, not health.js — fitness.js holds both)
cooking (7):     recipe-unit-converter, recipe-scaler, bbq-planner, calories-in-recipe,
                 freezer-storage-guide, kitchen-unit-converter, bake-sale-calculator
games (13):      dice-roller, would-you-rather, trivia-quiz, music-round-generator,
                 vampire-name-generator, fantasy-tavern-name-generator, pirate-ship-name-generator,
                 tarot-card-reader, palm-reading-guide, daily-horoscope, rune-stone-reader,
                 numerology-calculator, miniatures-cost-calculator
education (6):   flashcard-maker, animals-word-search, times-tables-practice,
                 country-comparison-tool, grade-conversion-tool, sat-score-calculator
travel (7):      travel-budget-calculator, flight-time-calculator, travel-visa-checker,
                 time-zone-converter, historical-exchange-rate-checker, travel-money-calculator,
                 tipping-guide-by-country
parenting (3):   pass-the-parcel-forfeit-generator, kids-activity-spinner, phonics-treasure-hunt
fun (7):         celebrity-birthday-twin, paint-colour-mixer, how-common-is-your-name,
                 excuse-generator, compliment-generator, nickname-generator, this-or-that-decider
converters (4):  uk-to-us-shoe-size-mens, uk-to-eu-shoe-size, uk-to-us-dress-size,
                 a5-to-half-letter-dimensions
pdf (2):         extract-pdf-pages, pdf-reader
```

## Bloat lessons from the previous session (READ THIS BEFORE DISPATCHING AGENTS)

The previous session burned tokens on:

1. **Repeating the full voice ruleset and audit checklist in every agent prompt.** Each prompt was ~3-5k tokens. Across 7 parallel agents, that's 20-35k of duplicated context.
2. **Asking agents to read the exemplar `finance.js`** every time. That file is now huge (1,200+ lines) because we appended to it across waves. Each agent loaded it.
3. **Asking agents to read the full tool component** when they only need a few constants (defaults, units, ranges). Tool components can be 500+ lines.
4. **Multi-file batches per agent** (10 files). Each Edit operation is a separate tool call, and big multi-file agents had to track state across many files.
5. **Too many parallel agents at once.** 7 parallel × ~150k each = 1M+ tokens used in roughly 8 minutes.

### Recommended approach for next session

**Use the `mykit-copywrite` skill instead of re-typing the rules.** It's at `~/.claude/skills/mykit-copywrite/SKILL.md` and already encodes the voice rules, banned phrases, audit checklist, and Tier shape. Invoke via the Skill tool.

**Smaller batches, single file per agent:**
- 5-8 entries per agent
- One target file per agent
- Use a tight prompt that says "use the mykit-copywrite skill rules; here are the slugs; the file lives at <path>; read the file's existing entries to match indentation; append before the closing `};`"
- Don't re-paste the voice rules; the skill carries them

**Skip the exemplar read.** The pattern is now well-established. If the agent needs a reference, point to one specific small entry (e.g. `data/seo-content/parenting.js` `birthday-party-game-planner` is ~50 lines and is good shape).

**Have agents grep the component, not read whole files.** Tell them: "grep the component at `components/<cat>-tools/<Component>.jsx` for the constants you need (defaults, units, ranges). Don't read the whole file."

**Cap parallelism at 3-4 agents.** Prefer running fewer, smaller batches sequentially over piling on parallelism.

### Suggested batching for the 74 pending

Aim for 4 sequential rounds of 3-4 parallel agents, ~5-7 entries each:

| Round | Agent | Slugs | File | Count |
|---|---|---|---|---|
| 1 | A | creative pending | creative.js | 9 |
| 1 | B | text pending | text.js | 9 |
| 1 | C | games pending | games.js | 13 |
| 2 | D | health pending | fitness.js | 7 |
| 2 | E | cooking pending | cooking.js | 7 |
| 2 | F | travel pending | travel.js | 7 |
| 3 | G | education + parenting | education.js + parenting.js | 6+3=9 |
| 3 | H | fun + converters | fun.js + converters.js | 7+4=11 |
| 3 | I | pdf | pdf.js | 2 |

That's 9 agent runs, each handling 7-13 entries. Run 3 in parallel per round, finish a round before starting the next, build-verify between rounds.

## Critical reminders for the next session

1. **Use `label:` not `name:` in `relatedTools` entries.** This was a bug a previous agent introduced; we fixed it in `quiz.js` already. Confirm the agents you dispatch get this right.
2. **No em dashes anywhere.** Use ` - ` (space hyphen space) or commas/semicolons.
3. **British spelling throughout** (colour, organisation, favour, metres, litres).
4. **Sister tools must have materially different prose.** When two slugs in the same file are similar (e.g. `wedding-catering-calculator` and `wedding-cost-per-head-calculator`), the prose must not overlap. Google penalises duplicate content within a site.
5. **`fitness.js` holds both health AND fitness slugs** under the `fitnessSEO` export. There is no `health.js`.
6. **Don't run agents on already-completed slugs.** Use `tmp-seo/wave_b_pending.json` (or regenerate it from registry + seo-content) to find what's truly pending.

## Other open items

1. **Push pending changes.** The user pushed Track A fixes earlier; the 277 Tier 2 + 20 at-risk + 93 Wave B partials are all in working tree, not yet pushed. Once the 74 pending land, push everything in one commit.
2. **GSC validation.** After push, hit "Validate Fix" on the three error reports in GSC + "Request Indexing" on a sample of high-traffic pages.
3. **Travel.js duplicate keys.** Cosmetic issue: an earlier agent appended duplicate slug entries (8 keys appear twice). The newer entries win at parse time, so the UI is correct, but the file has ~870 lines of dead code. 5-min cleanup task: remove the older versions.
4. **Country tools.** 100+ country-prefix tools (us-/canada-/australia-/india-) are currently `noindex`ed because they have no SEO content. They need either content (so we can flip them back to indexable) or hard-deletion. Decision deferred to after the indexing recovery starts showing.
5. **Tier 3 sprint.** ~225 simple converters/calculators still without SEO content. Lower priority because Google's quality bar for converters is much lower. Could be tackled in a final wave after the at-risk indexed pages are covered.

## Files of interest

- `data/seo-content/*.js` — SEO content per category. `index.js` is the registry that wires them together.
- `lib/tool-registry.js` — central tool registry. Source of truth for slugs, tiers, categories.
- `~/.claude/skills/mykit-copywrite/SKILL.md` — the writing skill with voice rules, audit checklist, and shape spec.
- `tmp-seo/` — session scratch (priority lists, pending slugs grouped by category). Already gitignored.
- `seo-data/extracted_2026_04_27/` — the GSC export that drove the original priority list.
- `seo-data/today_valid/Table.csv` — the GSC "indexed pages" export from 2026-04-28 (310 URLs). The list of 268 at-risk URLs was built from this.

## Suggested first actions in the new session

```bash
cd C:/Users/grego/WEB_PROJECTS/MYKIT-TOOLS/mykit-tools
# Verify build still clean
npx next build 2>&1 | tail -5
# Read this handoff
cat handoff.md
# Check what's actually pending
cat tmp-seo/wave_b_pending.json
# Read the skill so you remember the rules
cat ~/.claude/skills/mykit-copywrite/SKILL.md
```

Then dispatch Round 1 of 3 parallel agents (creative, text, games), each with the tight prompt pattern. After they finish, build verify, then Round 2.

The end is in sight — 74 entries to go, then the recovery sprint is logically complete and we move to monitoring.
