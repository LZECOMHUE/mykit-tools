# MyKit.tools SEO Implementation Guide
## AI-Optimized Search Strategy (GEO/AEO)

Based on the AI SEO/GEO/AEO Strategy Report prepared in March 2026, this guide covers the latest optimizations for MyKit.tools to maximize discoverability across traditional search engines and AI/LLM systems.

---

## Overview of Changes

This implementation focuses on three critical areas:

1. **Structured Data (Schema Markup)** — JSON-LD schemas for AI crawler comprehension
2. **Content Structure** — Answer-first format optimized for AI extraction
3. **Technical SEO** — robots.txt, metadata, semantic HTML for discoverability

---

## Changes Made

### 1. Enhanced SEO Library (`/lib/seo.js`)

#### New Functions:
- `generateToolJsonLd(tool)` — WebApplication schema with freshness signals
- `generateFAQSchema(slug, faqs)` — FAQ schema (highest citation rate in AI)
- `generateHowToSchema(slug, name, steps)` — Step-by-step instructions schema
- `generateArticleSchema(slug, tool, content)` — Article schema for SEO content
- `generateBreadcrumbSchema(breadcrumbs)` — Navigation structure schema
- `generateOrganizationSchema()` — Site-level authority signals

#### Updated Metadata:
- Titles now include "| MyKit.tools" suffix (under 60 chars)
- Descriptions enforced to 120-160 character range
- Added keywords field for traditional SEO
- Google and Bing-specific robot directives

**Strategy:** AI crawlers parse structured data to understand content relevance. Each schema type serves a specific purpose:
- **WebApplication** identifies tools as interactive (not just documentation)
- **FAQPage** is the highest-citation schema across ChatGPT, Perplexity, Claude
- **HowTo** maps directly to how-to queries in AI engines
- **BreadcrumbList** helps crawlers understand site hierarchy

### 2. New `robots.js` File

Allows **all major AI crawlers**:
- `GPTBot` (OpenAI)
- `Claude-Web` (Anthropic)
- `Claude-SearchBot` (Anthropic)
- `Google-Extended` (AI Overviews)
- `PerplexityBot`
- `CCBot` (Common Crawl)

**Why this matters:** The research shows that blocking or unclear permissions to AI crawlers results in zero citations in AI-generated answers. Clear allowance increases citation probability by 40%+ compared to sites that don't explicitly allow them.

Key details:
- No crawl delay for AI crawlers (they respect robots.txt but need fast access)
- 1-second crawl delay for standard Googlebot, 0 for AI crawlers
- Blocks aggressive SEO scrapers (AhrefsBot, SemrushBot)

### 3. Enhanced Root Layout (`/app/layout.js`)

#### Added:
- Organization schema in `<head>` (site-level authority)
- Comprehensive metadata with keywords, robots directives
- Preconnect and DNS prefetch for performance
- Explicit meta tags allowing AI crawlers (backup for robots.js)

**Strategy:** E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is critical for AI. Organization schema establishes trustworthiness. Performance signals (preconnect, DNS prefetch) improve crawlability.

### 4. Enhanced Tool Pages (`/app/(tools)/[slug]/page.jsx`)

#### Added:
- WebApplication schema injection
- BreadcrumbList schema injection
- Semantic HTML with `<header>` and `<article>` tags
- Proper heading hierarchy (h1 for tool name)

**Strategy:** Semantic HTML is crucial because:
- AI crawlers do NOT execute JavaScript (they parse static HTML)
- Heading hierarchy helps crawlers understand content structure
- `<article>` tag signals this is content-rich material
- Schema injection ensures crawlers have structured data

### 5. New `ToolSEOContent` Component (`/components/tools/ToolSEOContent.jsx`)

This is the template for implementing answer-first SEO content across all tools.

#### Key features:
- Answer-first structure (heading → complete answer → details)
- FAQ section with proper H3 markup (highest-citation format)
- Snippable answers (designed to be extracted without editing)
- Related tools section for internal linking
- Table support for reference data
- Automatic FAQ schema generation

#### Usage Example:
```jsx
<ToolSEOContent
  toolName="UK Tax Calculator"
  sections={[
    {
      heading: "How to Calculate UK Income Tax",
      content: "Use this calculator by entering your gross annual income, and it will automatically calculate your income tax, National Insurance, and take-home pay..."
    },
    {
      heading: "Common Tax Scenarios",
      content: [
        "Student loan repayment: Calculated at 9% of earnings over £27,000",
        "Pension contributions: Deductible from gross income",
        "Personal allowance: £12,570 (2025/26 tax year)"
      ]
    },
  ]}
  faqs={[
    {
      question: "What is the current UK personal allowance?",
      answer: "For the 2025/26 tax year, the personal allowance is £12,570. This is the amount you can earn before you pay income tax."
    },
  ]}
  relatedTools={[
    { slug: "vat-calculator", name: "VAT Calculator", description: "..." },
  ]}
  generateFAQSchema={true}
/>
```

### 6. Improved Breadcrumbs (`/components/layout/Breadcrumbs.jsx`)

#### Added:
- `aria-current="page"` on current page (accessibility)
- Proper semantic `<ol>` for ordered list
- Full URL construction for schema validity
- Better structured HTML for AI parsing

### 7. Enhanced Sitemap (`/app/sitemap.js`)

#### Added:
- Tag pages (cross-category navigation)
- Priority weighting by tool tier
- Change frequency tuned by content type
- Comments explaining strategy

**Strategy:** Comprehensive sitemaps help AI crawlers discover all content efficiently. Tag pages create internal links that establish cluster authority.

### 8. New `llms.txt` File (`/public/llms.txt`)

A new standard file that tells LLM/AI systems about your site. Think of it as an extended robots.txt for LLMs.

Includes:
- Site description and purpose
- Category organization
- Update cadence and freshness signals
- Data structure and schemas
- Attribution guidelines
- Contact information
- Technical specifications

**Why this matters:** As AI systems become more sophisticated, they look for explicit information about site structure, update frequency, and usage rights. This file provides all that in a standardized format.

---

## How to Implement SEO Content on Each Tool

Every tool page should now include comprehensive SEO content using the new `ToolSEOContent` component.

### Step-by-Step for Each Tool:

1. **Import the component:**
   ```jsx
   import ToolSEOContent, {
     createAnswerFirstSection,
     createFAQ,
     createTable
   } from "@/components/tools/ToolSEOContent";
   ```

2. **Create answer-first content sections:**
   ```jsx
   const sections = [
     createAnswerFirstSection(
       "How to Use the [Tool Name]",
       "To use this tool, enter [main input] and click [button]. The tool will calculate [what it does].",
       "Additional details..."
     ),
     {
       heading: "Common Conversions",
       table: {
         headers: ["Input", "Output"],
         rows: [
           ["1 kg", "2.20 lbs"],
           ["5 kg", "11.02 lbs"],
         ]
       }
     },
   ];
   ```

3. **Create FAQ items:**
   ```jsx
   const faqs = [
     createFAQ(
       "What is the formula?",
       "The formula is: Output = Input × Conversion Factor. For example, 1 kg × 2.20462 = 2.20462 lbs."
     ),
     createFAQ(
       "When would I need this conversion?",
       "When following recipes, checking fitness/nutrition data, or working with international measurements."
     ),
   ];
   ```

4. **Get related tools:**
   ```jsx
   const relatedTools = [
     getToolBySlug("lbs-to-kg"),
     getToolBySlug("kg-to-stone"),
     getToolBySlug("oz-to-grams"),
   ];
   ```

5. **Render the component at the bottom of the tool page:**
   ```jsx
   <ToolSEOContent
     toolName={tool.name}
     sections={sections}
     faqs={faqs}
     relatedTools={relatedTools}
     generateFAQSchema={true}
   />
   ```

### Content Writing Guidelines

These are critical for GEO/AEO success:

#### Answer-First Rule
**WRONG:** "This converter is useful for many purposes. You might use it when..."
**RIGHT:** "Use this converter when following American recipes, checking fitness data, or working in countries that use imperial measurements."

#### Snippability Rule
Ask: Can an AI system copy your answer directly into a response without editing? If yes, it's snippable.

**WRONG:** "There are various factors that influence the calculation, such as..."
**RIGHT:** "The calculation uses the formula: BMI = Weight (kg) ÷ Height (m)². A BMI under 18.5 is underweight, 18.5-24.9 is healthy, 25-29.9 is overweight, and over 30 is obese."

#### Quantitative Data
Always include numbers where possible. AI systems are 3-4x more likely to cite content with concrete percentages, statistics, and formulas.

**WRONG:** "Some people find this useful"
**RIGHT:** "79% of users find this tool saves time compared to manual calculations"

#### Entity Recognition
Use consistent naming for concepts. Define acronyms on first use.

**WRONG:** "Input the tax code and it will calculate..."
**RIGHT:** "Input your PAYE tax code and the tool will calculate your National Insurance contributions."

---

## Monitoring & Metrics

### What to Track

1. **AI Visibility (monthly)**
   - Keyword citations in ChatGPT, Perplexity, Claude, Google AI Overviews
   - Tools: Nightwatch.io, LLMrefs.io, Profound
   - Target: Track 20-30 representative keywords

2. **SEO Signals (weekly)**
   - Core Web Vitals (LCP, FID, CLS)
   - Page load time
   - Crawl stats in Google Search Console

3. **Traffic & Engagement**
   - AI referral traffic (referrer = ChatGPT, Perplexity, etc.)
   - Click-through rate from AI citations
   - Return visitor rate

### Expected Timeline

- **Weeks 1-4:** Infrastructure setup (schema validation, robots.txt, llms.txt)
- **Weeks 5-8:** Content optimization on 50 highest-traffic tools
- **Weeks 9-12:** Full implementation on all 200+ tools
- **Month 4+:** Monitor AI citations, iterate, expand

---

## Future Enhancements

### Phase 2 (Q2 2026):
- [ ] Add HowTo schema to every tool page (currently optional)
- [ ] Implement topic clusters (group related tools for authority)
- [ ] Create category hub pages with comprehensive cluster content
- [ ] Add "Last Updated" badges and update timestamps to all tools

### Phase 3 (Q3 2026):
- [ ] API endpoints for tool data (machine-readable)
- [ ] JSON/CSV export formats for all tools
- [ ] API documentation for developers
- [ ] Webhook support for data queries

### Phase 4 (Q4 2026):
- [ ] Agentic AI integration (tools as API calls)
- [ ] Brand monitoring dashboard
- [ ] AI citation analytics
- [ ] Content refresh automation based on freshness signals

---

## Validation Checklist

Before considering SEO implementation complete:

### Technical SEO
- [ ] robots.js is live and tested
- [ ] llms.txt is accessible at /public/llms.txt
- [ ] Organization schema validates in Google's Rich Results Test
- [ ] All tool pages have WebApplication schema
- [ ] All tool pages have BreadcrumbList schema
- [ ] No Schema validation errors in Google Search Console

### Content SEO
- [ ] All Tier 1 tools have ToolSEOContent with FAQ section
- [ ] All Tier 2 tools have basic answer-first content
- [ ] All converters/calculators have formula explanation
- [ ] Related tools are 3-5 per page for cluster authority
- [ ] Internal links use descriptive anchor text (not "click here")

### Performance
- [ ] Core Web Vitals: All green
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

### Accessibility
- [ ] Breadcrumbs use proper `<nav>` and `aria-label`
- [ ] Headings follow h1 > h2 > h3 hierarchy
- [ ] Images have descriptive alt text
- [ ] Color contrast ratios meet WCAG AA

---

## References

- **AI SEO/GEO/AEO Strategy Report** (March 2026)
- **schema.org** documentation for WebApplication, FAQPage, HowTo
- **robots.txt** specification and AI crawler guidelines
- **llms.txt** standard: https://llms.txt (emerging standard)

---

## Questions?

For implementation questions or technical issues, refer to the CLAUDE.md file for the full project specification, or contact the development team.

Last Updated: March 11, 2026
