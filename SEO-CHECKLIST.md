# MyKit.tools SEO Optimization Checklist
## AI-Optimized Search Strategy (GEO/AEO)

---

## ✅ Phase 1: Infrastructure & Foundation (COMPLETED)

This phase establishes the technical foundation for both traditional SEO and AI discoverability.

### Technical Foundation
- [x] Created `/app/robots.js` with explicit AI crawler allowances
  - Allows: GPTBot, Claude-Web, Claude-SearchBot, Google-Extended, PerplexityBot, CCBot
  - Blocks: Aggressive crawlers (AhrefsBot, SemrushBot)
  - No crawl delay for AI crawlers (critical for GEO)

- [x] Created `/public/llms.txt` (emerging LLM discovery standard)
  - Site description and purpose
  - Category organization and statistics
  - Update frequency and freshness signals
  - Content structure and schemas
  - Attribution guidelines
  - Technical specifications

- [x] Enhanced `/app/layout.js` (root metadata)
  - Organization schema in `<head>` (site-level authority)
  - Keywords field for traditional SEO
  - Robots directives for Google and Bing
  - Preconnect and DNS prefetch for performance
  - OG and Twitter card metadata
  - Verification meta tags (placeholders for Google/Yandex)

### Structured Data Foundation
- [x] Enhanced `/lib/seo.js` with comprehensive schema generation
  - `generateToolJsonLd()` — WebApplication schema
  - `generateFAQSchema()` — FAQ schema (highest AI citation rate)
  - `generateHowToSchema()` — Step-by-step instructions
  - `generateArticleSchema()` — Content schema
  - `generateBreadcrumbSchema()` — Navigation structure
  - `generateOrganizationSchema()` — Site-level authority

### Semantic HTML
- [x] Updated tool pages with `<header>`, `<article>` tags
- [x] Improved breadcrumbs with semantic `<nav>` and `<ol>`
- [x] Added `aria-current="page"` for accessibility
- [x] Proper h1 > h2 > h3 heading hierarchy

### Sitemap & Discovery
- [x] Enhanced `/app/sitemap.js` to include tag pages
- [x] Added priority weighting by tool tier
- [x] Added change frequency signals
- [x] Proper lastModified dates from tool registry

---

## ⏳ Phase 2: Content Structure & SEO (IN PROGRESS)

This phase implements answer-first content structures and semantic markup on all tools.

### Content Components
- [x] Created `/components/tools/ToolSEOContent.jsx`
  - Answer-first format (heading → complete answer → details)
  - FAQ section support with H3 markup
  - Snippable answers designed for AI extraction
  - Table support for reference data
  - Related tools section for internal linking
  - Automatic FAQ schema generation

- [x] Helper functions for content creation
  - `createAnswerFirstSection()` — Create answer-first content
  - `createFAQ()` — Create FAQ items
  - `createTable()` — Format reference tables

### E-E-A-T Signals
- [x] Created `/lib/eeat.js` helper module
  - `generateExpertiseSignals()` — Authority source links
  - `generateTrustworthinessSignals()` — Privacy, security, updates
  - `generateAuthoritativenessSignals()` — Breadth, depth, backlinks
  - `generateExperienceSignals()` — Creator bios, testimonials
  - `generateTrustBadges()` — Security certifications
  - `generateCreatorSchema()` — Author markup
  - `generateFormulaReference()` — Source attribution

### Implementation on Tools

#### Tier 1 Tools (Flagship) — Priority: HIGH
These complex tools should have comprehensive SEO content with FAQs and multiple sections.

**Status: NOT STARTED** — Needs implementation on:
- uk-tax-calculator
- [Other Tier 1 tools from registry]

Checklist for each Tier 1 tool:
- [ ] ToolSEOContent component added at bottom of page
- [ ] Minimum 5-8 FAQ items
- [ ] How to Use section (HowTo schema)
- [ ] Common scenarios/values table
- [ ] Formula explanation
- [ ] 3-5 related tools linked
- [ ] Creator/expert bio included

#### Tier 2 Tools (Solid Utility) — Priority: MEDIUM
These single-purpose tools should have basic answer-first content and FAQ section.

**Status: NOT STARTED** — Affects ~200 tools

Checklist for each Tier 2 tool:
- [ ] ToolSEOContent component added
- [ ] Minimum 3-5 FAQ items
- [ ] How to Use section
- [ ] 2-3 related tools linked
- [ ] Formula/calculation explanation

#### Tier 3 Tools (Simple Converters) — Priority: MEDIUM
These template-based tools should have SEO content from the template.

**Status: NOT STARTED** — Affects ~800 converters

Checklist for each Tier 3 tool:
- [ ] Template includes SEO content section
- [ ] Formula explanation
- [ ] Common conversions table
- [ ] 2-3 related conversions linked
- [ ] Use cases and real-world examples

---

## 📊 Phase 3: Monitoring & Optimization (PENDING)

This phase monitors AI visibility and iterates based on data.

### AI Visibility Tracking
- [ ] Select tracking tool (Nightwatch.io, LLMrefs.io, or Profound)
- [ ] Create baseline for 20-30 representative keywords
- [ ] Monthly tracking of AI citations across:
  - ChatGPT with browsing
  - Perplexity
  - Google AI Overviews
  - Claude with web access
  - Gemini

### Metrics to Monitor
- [ ] Citation frequency (how many times tool appears in AI answers)
- [ ] Citation quality (full mention vs. brief reference)
- [ ] AI referral traffic (from ChatGPT, Perplexity, etc.)
- [ ] Click-through rate from AI citations
- [ ] Brand awareness (brand mentions in AI answers)
- [ ] Return visitor rate (visitors who came back after AI discovery)

### Performance Metrics
- [ ] Core Web Vitals (Google Search Console)
- [ ] Page load time (target: <2.5s LCP)
- [ ] Crawl stats (monitor crawl frequency from AI bots)
- [ ] Indexing status in Google Search Console

### Monthly Optimization Cycle
- [ ] Review AI citation data
- [ ] Identify low-citation keywords and improve content
- [ ] Refresh stale content with new data/statistics
- [ ] Add seasonal content/tools before traffic spikes
- [ ] Monitor competitor positioning in AI answers

---

## 🎯 Quality Checklist for Each Tool Page

Use this checklist before considering a tool "SEO-optimized."

### Metadata
- [ ] Title tag < 60 characters
- [ ] Meta description 120-160 characters
- [ ] Keywords included in description
- [ ] Open Graph image set (1200x630px)
- [ ] Twitter card metadata
- [ ] Canonical URL set

### Structured Data
- [ ] WebApplication schema present
- [ ] BreadcrumbList schema present
- [ ] FAQPage schema present (if FAQ section exists)
- [ ] HowTo schema present (for step-by-step tools)
- [ ] No schema validation errors in Google Rich Results Test

### Content Structure
- [ ] H1 tag contains tool name
- [ ] Heading hierarchy: h1 > h2 > h3 (no skipped levels)
- [ ] Answer-first format: heading → complete answer → details
- [ ] Answers are snippable (can be copied to AI response without editing)
- [ ] No vague qualifiers ("may", "might", "some people")
- [ ] Concrete numbers and percentages where possible

### SEO Content
- [ ] Minimum 150-200 words of SEO content below tool
- [ ] FAQ section with 3-8 items (Tier 1: 5-8, Tier 2: 3-5, Tier 3: 3+)
- [ ] How to Use section explaining steps
- [ ] Related tools section with 2-5 links
- [ ] Proper heading hierarchy in content
- [ ] Internal links use descriptive anchor text

### Accessibility
- [ ] Images have descriptive alt text
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works
- [ ] Semantic HTML: `<header>`, `<article>`, `<nav>`, `<section>`, `<h2>`-`<h3>` for content hierarchy
- [ ] Links have focus states

### Performance
- [ ] Largest Contentful Paint < 2.5 seconds
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] No render-blocking resources
- [ ] Images optimized (next/image with proper sizing)

### Mobile & Responsive
- [ ] Works at 375px width (smallest phones)
- [ ] Works at 768px width (tablets)
- [ ] Works at 1280px width (desktop)
- [ ] Touch targets minimum 44x44px
- [ ] No horizontal scrolling

### E-E-A-T Signals
- [ ] Creator/author identified
- [ ] Formulas cited to authoritative sources
- [ ] Last Updated date visible
- [ ] Privacy policy accessible
- [ ] SSL certificate (HTTPS)
- [ ] Ad transparency (all ads clearly marked)

---

## 📋 Implementation Timeline

### Week 1-2: Foundation (COMPLETED)
- [x] robots.js created
- [x] llms.txt created
- [x] Enhanced metadata and schemas
- [x] ToolSEOContent component created
- [x] E-E-A-T helpers created

### Week 3-4: High-Priority Tools
- [ ] Implement SEO content on top 5 Tier 1 tools
- [ ] Implement SEO content on top 20 Tier 2 tools
- [ ] Validate all schemas in Google Rich Results Test

### Week 5-8: Bulk Implementation
- [ ] Implement SEO content on remaining Tier 1 tools
- [ ] Implement SEO content on remaining Tier 2 tools
- [ ] Implement SEO content on Tier 3 template

### Week 9-12: Monitoring & Iteration
- [ ] Set up AI visibility tracking
- [ ] Monitor traffic and rankings
- [ ] Identify and optimize low-performing tools
- [ ] Refresh content with seasonal updates

### Month 4+: Continuous Improvement
- [ ] Monthly AI visibility reviews
- [ ] Quarterly content freshness updates
- [ ] Expand monitoring to all keywords
- [ ] Implement advanced features (category hubs, content clusters)

---

## 🔍 Validation Steps

### Before Going Live

1. **Schema Validation**
   ```
   Visit: https://schema.org/validator
   Paste each tool's HTML
   Verify: No errors, all required fields present
   ```

2. **Google Rich Results Test**
   ```
   Visit: https://search.google.com/test/rich-results
   Enter tool URL
   Check: FAQPage, WebApplication, BreadcrumbList
   Fix: Any errors shown
   ```

3. **Core Web Vitals**
   ```
   Visit: Google Search Console > Core Web Vitals
   Monitor: LCP, FID, CLS
   Target: All green
   ```

4. **AI Crawler Test**
   ```
   Check robots.txt: https://mykit.tools/robots.txt
   Verify: No disallow for tools
   Verify: AI bots listed explicitly
   ```

5. **Content Quality**
   ```
   Read SEO content aloud
   Ask: Can an AI extract this answer without editing?
   If no: Rewrite to be more snippable
   ```

6. **Mobile Responsive**
   ```
   Test in Chrome DevTools
   Viewport: 375x667 (iPhone SE)
   Check: No horizontal scroll, readable text
   ```

---

## 🚀 Success Criteria

### Month 1 (Infrastructure)
- [x] robots.js and llms.txt live
- [x] All schemas validated
- [x] Core Web Vitals: all green
- [x] No schema errors in GSC

### Month 2 (Content Implementation)
- [ ] 50+ tools with ToolSEOContent
- [ ] AI crawler traffic visible in GSC
- [ ] No increase in crawl errors
- [ ] Page speed maintained (no regressions)

### Month 3 (Monitoring)
- [ ] Baseline AI visibility established
- [ ] First AI citation detected
- [ ] Brand mentions in AI answers documented
- [ ] Feedback loop: identify and fix low-citation content

### Month 6 (Impact)
- [ ] 35%+ increase in organic traffic
- [ ] Measurable AI referral traffic
- [ ] 2-3x more citations than average competitor
- [ ] Tool pages ranking in AI Overviews

---

## 📚 Resources

- **AI SEO/GEO/AEO Strategy Report** — Reference document (PDF)
- **SEO-IMPLEMENTATION-GUIDE.md** — Detailed implementation steps
- **schema.org** — Structured data documentation
- **Google Search Central** — SEO best practices
- **robots.txt specification** — RFC 9309

---

## Contacts & Escalation

**Technical Issues:** [Dev Team]
**Content Questions:** [Content Team]
**Analytics & Tracking:** [Analytics Team]
**Schema Validation Errors:** [SEO Lead]

---

**Last Updated:** March 11, 2026
**Status:** Phase 1 Complete, Phase 2 In Progress
**Next Review:** April 8, 2026
