# Quick SEO Reference — MyKit.tools
## Fast lookup for implementation details

---

## 🚀 Quick Start: Adding SEO to a Tool

### 1. Import the component (at top of file)
```jsx
import ToolSEOContent, { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";
```

### 2. Add at bottom of tool page (before closing)
```jsx
<ToolSEOContent
  toolName="Tool Name"
  sections={[
    createAnswerFirstSection(
      "How to Use",
      "Direct answer here in 1-2 sentences."
    ),
  ]}
  faqs={[
    createFAQ("Q?", "A."),
  ]}
  generateFAQSchema={true}
/>
```

---

## 📋 Files Created/Modified

### NEW
- `app/robots.js` — AI crawler permissions
- `public/llms.txt` — LLM discovery
- `components/tools/ToolSEOContent.jsx` — Answer-first component
- `lib/eeat.js` — E-E-A-T helpers

### MODIFIED
- `lib/seo.js` — +6 schema functions
- `app/layout.js` — Organization schema
- `app/(tools)/[slug]/page.jsx` — Schema injection
- `components/layout/Breadcrumbs.jsx` — Semantic HTML
- `app/sitemap.js` — Tag pages

### DOCUMENTATION
- `SEO-IMPLEMENTATION-GUIDE.md`
- `SEO-CHECKLIST.md`
- `SEO-CHANGES-SUMMARY.md`
- `QUICK-SEO-REFERENCE.md` (this file)

---

## 🎯 Content Structure Template

```jsx
// Import
import ToolSEOContent, {
  createAnswerFirstSection,
  createFAQ,
  createTable
} from "@/components/tools/ToolSEOContent";

// Create sections
const sections = [
  createAnswerFirstSection(
    "How to Use [Tool]",
    "Direct, complete answer in 1-2 sentences. No vague qualifiers."
  ),
  {
    heading: "Common Values",
    table: {
      headers: ["Input", "Output"],
      rows: [["1 kg", "2.20 lbs"]]
    }
  },
  {
    heading: "When You Need This",
    content: "Use this when... (provide specific scenarios)"
  }
];

// Create FAQs
const faqs = [
  createFAQ("What's the formula?", "Output = Input × Factor."),
  createFAQ("When do I use this?", "Specific scenario..."),
];

// Render
<ToolSEOContent
  sections={sections}
  faqs={faqs}
  generateFAQSchema={true}
/>
```

---

## ✍️ Writing Guidelines

### Answer-First Rule
**WRONG:** "This converter can be useful in many situations..."
**RIGHT:** "Use this converter when following American recipes, checking fitness data, or working internationally."

### Snippability Rule
Can an AI copy your answer directly into a response without editing?
**WRONG:** "There are various factors that..."
**RIGHT:** "BMI = Weight (kg) ÷ Height (m)². Under 18.5 = underweight..."

### Quantitative Data
Include numbers, percentages, formulas.
**WRONG:** "Some savings are possible"
**RIGHT:** "You save approximately £2,400/year by contributing to a pension"

### Entity Recognition
Define acronyms, use consistent names.
**WRONG:** "The tax code determines..."
**RIGHT:** "Your PAYE tax code (e.g., 1257L) determines your Personal Allowance"

---

## 🔍 Schema Functions Quick Reference

| Function | Returns | Use When |
|----------|---------|----------|
| `generateToolJsonLd(tool)` | WebApplication schema | Every tool page (auto-injected) |
| `generateFAQSchema(slug, faqs)` | FAQPage schema | Tool has FAQ section |
| `generateHowToSchema(slug, name, steps)` | HowTo schema | Tool has step-by-step instructions |
| `generateBreadcrumbSchema(breadcrumbs)` | BreadcrumbList schema | Building breadcrumb navigation |
| `generateOrganizationSchema()` | Organization schema | Root layout (auto-injected) |
| `generateArticleSchema(slug, tool)` | Article schema | Content-heavy tools |

---

## 🛡️ E-E-A-T Signal Functions

| Function | Returns | Purpose |
|----------|---------|---------|
| `generateExpertiseSignals(category)` | Authority links | Show subject expertise |
| `generateTrustworthinessSignals()` | Privacy, security info | Show you're trustworthy |
| `generateAuthoritativenessSignals(cat)` | Coverage, topical depth | Show authority on topic |
| `generateExperienceSignals()` | Creator bios, testimonials | Show human expertise |
| `generateCreatorSchema(creator)` | Author markup | Cite specific person |
| `generateFormulaReference(name, url)` | Citation schema | Link to source formula |

---

## 🤖 Checking Your Work

### Before Publishing
1. **Schema Validation**
   - Visit: https://schema.org/validator
   - Paste HTML, check for errors

2. **Google Rich Results**
   - Visit: https://search.google.com/test/rich-results
   - Enter URL, verify schemas

3. **Readability**
   - Read content aloud
   - Can an AI extract first sentence without editing?
   - If no → rewrite to be more snippable

4. **Mobile**
   - Test at 375px width
   - Test at 768px width
   - No horizontal scroll?

---

## 📊 Monitoring

### Monthly
- [ ] Check Google Search Console for crawl stats
- [ ] Review AI citations (using Nightwatch.io or Profound)
- [ ] Check Core Web Vitals
- [ ] Monitor CTR and impressions

### Quarterly
- [ ] Update data/statistics in tools
- [ ] Review low-performing content
- [ ] Add seasonal tools before traffic spikes
- [ ] Refresh E-E-A-T signals

### Annually
- [ ] Comprehensive content audit
- [ ] Update all tax/regulatory tools
- [ ] Review competitor positioning

---

## 🎓 Key Concepts

### GEO = Generative Engine Optimization
Making your content discoverable IN AI-generated answers (ChatGPT, Claude, Perplexity)

### AEO = Answer Engine Optimization
Broader: making your content accurately represent your brand in AI systems

### E-E-A-T = Experience, Expertise, Authoritativeness, Trustworthiness
What AI systems evaluate when deciding whether to cite you

### Snippability
Content designed to be extracted by AI without editing. The #1 predictor of citation.

---

## 💡 Pro Tips

1. **Use tables for reference data** → 5x more likely to be cited
2. **Include concrete numbers** → 3-4x more likely to be cited
3. **Add FAQ section** → 3x more likely to be cited vs. narrative
4. **Cite authoritative sources** → Builds E-E-A-T signals
5. **Update regularly** → Shows freshness, improves crawl frequency
6. **Link related tools** → Builds cluster authority
7. **Keep answers short** → Easier for AI to extract

---

## 🚨 Common Mistakes

❌ Burying the answer in long paragraphs
❌ Using vague language ("may", "might", "could")
❌ No internal links to related tools
❌ Outdated formulas or statistics
❌ No creator/author information
❌ Missing structured data
❌ No table of contents for long content
❌ Broken links to sources

---

## ✅ Verification Checklist

- [ ] Metadata: title < 60 chars, description 120-160
- [ ] Schema: No validation errors
- [ ] Content: Answer-first, 150+ words, 3+ FAQs
- [ ] Links: 2-5 related tools
- [ ] Performance: LCP < 2.5s, CLS < 0.1
- [ ] Mobile: Works at 375px
- [ ] Accessibility: Alt text, contrast, semantic HTML

---

## 📞 When to Ask for Help

**Technical Issues:**
- Schema validation errors → Check schema.org docs
- Core Web Vitals problems → Check Next.js optimization
- Broken links → Use link checker tool

**Content Questions:**
- How snippable is this? → Read aloud, ask if AI can copy it
- Is my answer-first? → If explanation comes first, rewrite
- Too many FAQs? → 3-8 is good range

**SEO Strategy:**
- Should I include this data? → If it's quantitative and authoritative, yes
- How do I cite a source? → Use `generateFormulaReference()` or link directly

---

## 📚 Detailed Guides

For complete details, see:
- **SEO-IMPLEMENTATION-GUIDE.md** — Full implementation walkthrough
- **SEO-CHECKLIST.md** — Quality standards and validation
- **SEO-CHANGES-SUMMARY.md** — Technical overview of all changes

---

**Last Updated:** March 11, 2026
**Version:** 1.0
**Status:** Ready for tool implementation
