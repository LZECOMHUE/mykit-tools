/**
 * EXAMPLE: Complete SEO-Optimized Tool Page
 *
 * This is an example of how to implement all SEO changes on a tool page.
 * Based on: kg-to-lbs converter (Tier 3 tool)
 *
 * Key features demonstrated:
 * - Semantic HTML structure
 * - Schema injection (WebApplication, BreadcrumbList)
 * - Answer-first SEO content with FAQ section
 * - Related tools for cluster authority
 * - Proper heading hierarchy
 * - Internal linking strategies
 *
 * Copy this structure and adapt for any tool.
 */

import { notFound } from "next/navigation";
import { getToolBySlug, getAllSlugs } from "@/lib/tool-registry";
import { generateToolMeta, generateToolJsonLd, generateBreadcrumbSchema } from "@/lib/seo";
import { getToolComponent } from "@/lib/tool-components";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AdSlot from "@/components/premium/AdSlot";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolSEOContent, {
  createAnswerFirstSection,
  createFAQ,
  createTable,
} from "@/components/tools/ToolSEOContent";

// Generate static params
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return generateToolMeta(tool);
}

// ============================================================================
// EXAMPLE: KG TO LBS CONVERTER PAGE
// ============================================================================

export default async function KgToLbsPage({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const ToolComponent = getToolComponent(slug);

  // === SCHEMA INJECTION ===
  // These are injected into <head> and processed by AI crawlers
  const toolSchema = generateToolJsonLd(tool);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://mykit.tools" },
    { name: "Converters", url: "https://mykit.tools/categories/converters" },
    { name: "Weight Conversions", url: "https://mykit.tools/tags/weight" },
    { name: tool.name, url: `https://mykit.tools/${slug}` },
  ]);

  // === SEO CONTENT STRUCTURE ===
  // Answer-first format: heading → complete answer → supporting details
  const seoSections = [
    createAnswerFirstSection(
      "How to Convert Kg to Lbs",
      "To convert kilograms to pounds, multiply the kilogram value by 2.20462. For example: 5 kg × 2.20462 = 11.023 lbs. This converter does the calculation instantly — just enter your kilogram value and the pounds equivalent appears automatically.",
      [
        "No sign-up required",
        "Works on mobile and desktop",
        "Accurate to 5 decimal places",
        "Shows both metric (kg) and imperial (lbs) units",
      ]
    ),

    {
      heading: "Common Kg to Lbs Conversions",
      table: {
        headers: ["Kilograms (kg)", "Pounds (lbs)"],
        rows: [
          ["1 kg", "2.20 lbs"],
          ["5 kg", "11.02 lbs"],
          ["10 kg", "22.05 lbs"],
          ["25 kg", "55.12 lbs"],
          ["50 kg", "110.23 lbs"],
          ["100 kg", "220.46 lbs"],
        ],
      },
    },

    {
      heading: "When You Need Kg to Lbs Conversion",
      content: [
        "Following American recipes — ingredients are listed in pounds",
        "Checking fitness/nutrition data — US sources use lbs",
        "International shopping — product weights in kg",
        "Travel to the USA — understanding weight measurements",
        "Scientific work — converting metric to imperial units",
        "Gym/fitness tracking — US facilities use pounds",
      ],
    },

    {
      heading: "Understanding the Conversion",
      content: `The kilogram and pound are both units of weight/mass, but they use different systems. A kilogram (kg) is the base unit of mass in the metric system, used by most of the world. A pound (lb or lbs) is the standard unit of weight in the imperial system, used primarily in the United States.

The conversion factor is fixed: 1 kilogram = 2.20462 pounds. This means to convert any kilogram value to pounds, you simply multiply by 2.20462. For example:
- 10 kg = 10 × 2.20462 = 22.0462 lbs
- 75 kg = 75 × 2.20462 = 165.35 lbs
- 150 kg = 150 × 2.20462 = 330.69 lbs`,
    },

    {
      heading: "The Formula",
      content: `Formula: Pounds = Kilograms × 2.20462

Why 2.20462? This is the internationally accepted conversion factor. It comes from the relationship between the SI unit (kilogram) and the pound, defined as exactly 0.45359237 kg. Therefore: 1 kg ÷ 0.45359237 = 2.20462 lbs

This conversion is consistent worldwide and used in science, commerce, and everyday measurements.`,
    },

    {
      heading: "Reverse Conversion (Lbs to Kg)",
      content: `To convert in the opposite direction (pounds to kilograms), divide by 2.20462 instead of multiplying. For example: 22 lbs ÷ 2.20462 = 10 kg. Use our lbs to kg converter for the reverse conversion.`,
    },
  ];

  // === FAQ SECTION ===
  // FAQ is the highest-citation schema for AI systems
  // Question as heading, answer immediately following
  const faqs = [
    createFAQ(
      "What is the exact conversion factor from kg to lbs?",
      "The exact conversion factor is 2.20462. This means 1 kilogram equals exactly 2.20462 pounds. This is the internationally standardized conversion used worldwide."
    ),
    createFAQ(
      "Is it kg, kgs, or kilogram?",
      "Kg is the official abbreviation for kilogram. 'Kgs' is common in informal writing but not officially correct. The full term is 'kilogram' (singular or plural)."
    ),
    createFAQ(
      "How accurate does the conversion need to be?",
      "For most purposes (cooking, fitness, travel), accurate to 2 decimal places (e.g., 5.23 lbs) is sufficient. Scientific work may require more precision — this converter provides up to 5 decimal places."
    ),
    createFAQ(
      "Why do the USA use pounds instead of kilograms?",
      "The US is one of three countries not officially using the metric system. The imperial system was established in Britain before the metric system was developed. The US adopted some metric units (liters, celsius) but retained pounds for everyday weight measurement."
    ),
    createFAQ(
      "Is this converter mobile-friendly?",
      "Yes, this converter works perfectly on mobile, tablet, and desktop. Simply enter your kilogram value and see the pounds conversion instantly."
    ),
    createFAQ(
      "Can I save my conversions?",
      "With our free account, you can save up to 3 conversion projects. MyKit Pro subscribers can save unlimited conversions with cloud backup."
    ),
  ];

  // === RELATED TOOLS ===
  // Internal linking for cluster authority (critical for SEO)
  // Select 3-5 truly related tools, not random ones
  const relatedTools = [
    getToolBySlug("lbs-to-kg"), // Exact reverse conversion
    getToolBySlug("kg-to-stone"), // Related weight unit
    getToolBySlug("oz-to-grams"), // Related weight conversion
  ].filter(Boolean); // Remove nulls if any slug doesn't exist

  // =========================================================================
  // RENDER
  // =========================================================================

  return (
    <>
      {/* === SCHEMA.ORG STRUCTURED DATA === */}
      {/* Injected into head, parsed by AI crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* === BREADCRUMB NAVIGATION === */}
      <Breadcrumbs tool={tool} />

      {/* === PAGE HEADER === */}
      {/* Semantic HTML with proper heading hierarchy */}
      <header className="mb-6">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
          {tool.name}
        </h1>
        <p className="text-text-secondary mt-2 text-sm leading-relaxed max-w-2xl">
          {tool.description}
        </p>
      </header>

      {/* === AD SLOT (Above Tool) === */}
      <AdSlot position="above-tool" />

      {/* === MAIN TOOL INTERFACE === */}
      {/* Wrapped in <article> semantic tag */}
      <article className="my-8">
        {ToolComponent ? (
          <ToolComponent />
        ) : (
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-8 text-center text-text-muted">
            <p className="text-lg mb-2">Tool coming soon</p>
            <p className="text-sm">This converter is currently being built.</p>
          </div>
        )}
      </article>

      {/* === AD SLOT (Below Tool) === */}
      <AdSlot position="below-tool" />

      {/* === SEO CONTENT WITH FAQ === */}
      {/* This is critical for AI discovery and citation */}
      <ToolSEOContent
        toolName={tool.name}
        sections={seoSections}
        faqs={faqs}
        relatedTools={relatedTools}
        generateFAQSchema={true} // Auto-generates FAQPage schema
      />

      {/* === RELATED TOOLS SECTION === */}
      {/* Additional recommendation engine (auto-generated from registry) */}
      <RelatedTools slug={slug} />
    </>
  );
}

/**
 * KEY FEATURES OF THIS IMPLEMENTATION:
 *
 * 1. SCHEMA INJECTION
 *    - WebApplication schema (marks this as interactive tool)
 *    - BreadcrumbList schema (navigation structure)
 *    - FAQPage schema (auto-generated from faqs array)
 *
 * 2. SEMANTIC HTML
 *    - <header> wraps page title/description
 *    - <article> wraps tool interface
 *    - h1 for tool name, h2/h3 for sections
 *    - Proper heading hierarchy (no skipped levels)
 *
 * 3. ANSWER-FIRST CONTENT
 *    - Each section starts with direct answer
 *    - Supporting details follow
 *    - Designed to be snippable (AI can copy first sentence)
 *    - Includes quantitative data (numbers, formulas)
 *
 * 4. INTERNAL LINKING
 *    - Related tools section links to 2-5 similar tools
 *    - Creates topic cluster for authority
 *    - Related Tools component auto-suggests more
 *    - Context links within SEO content
 *
 * 5. FAQ OPTIMIZATION
 *    - Question as h3 heading
 *    - Answer immediately following
 *    - FAQPage schema auto-generated
 *    - 3-8 FAQs per tool
 *
 * 6. PERFORMANCE
 *    - No JavaScript required for static content
 *    - Interactive tool is only client-side component
 *    - SEO content is server-rendered
 *    - Optimized for Core Web Vitals
 *
 * 7. ACCESSIBILITY
 *    - Semantic HTML aids screen readers
 *    - Proper ARIA labels on navigation
 *    - Images should have alt text
 *    - Color contrast meets WCAG AA
 *
 * RESULT:
 * - AI crawlers can parse structure and schema
 * - Answers are snippable (likely to be cited)
 * - Related tools build cluster authority
 * - FAQPage schema increases citation rate 3x
 * - Internal linking improves topical authority
 */
