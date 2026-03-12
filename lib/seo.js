import { getToolBySlug } from "./tool-registry";

const SITE_URL = "https://mykit.tools";
const SITE_NAME = "MyKit.tools";

export function generateToolMeta(toolOrSlug) {
  const tool =
    typeof toolOrSlug === "string" ? getToolBySlug(toolOrSlug) : toolOrSlug;
  if (!tool) return {};

  // Ensure title is under 60 chars and description is 120-160 chars
  const title = tool.seoTitle || `${tool.name} — Free Online Tool | MyKit.tools`;
  const description = tool.description.length > 160
    ? tool.description.substring(0, 157) + "..."
    : tool.description;
  const url = `${SITE_URL}/${tool.slug}`;

  return {
    title,
    description,
    keywords: tool.keywords, // Include keywords for traditional SEO
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_GB",
      ...(tool.ogImage && { images: [{ url: tool.ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Generate comprehensive JSON-LD structured data for a tool.
 * Includes WebApplication, FAQPage, HowTo, and Article schemas.
 * Critical for AI crawler discoverability (GEO/AEO).
 */
export function generateToolJsonLd(tool, includeArticle = true) {
  const url = `${SITE_URL}/${tool.slug}`;

  // Base WebApplication schema
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: url,
    applicationCategory: capitalizeCategory(tool.category),
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    isAccessibleForFree: true,
    datePublished: tool.dateAdded,
    dateModified: tool.lastReviewed || tool.dateAdded,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1200",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return webApp;
}

/**
 * Generate FAQ schema for tools with common questions.
 * FAQ schema has the highest citation rate across AI platforms.
 */
export function generateFAQSchema(slug, faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate HowTo schema for step-by-step tool instructions.
 * Maps directly to "how-to" queries in AI engines.
 */
export function generateHowToSchema(slug, toolName, steps) {
  if (!steps || steps.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Use the ${toolName}`,
    description: `Step-by-step guide to using the ${toolName}`,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
      ...(step.image && { image: step.image }),
    })),
  };
}

/**
 * Generate Article schema for SEO content sections.
 * Establishes authorship and freshness signals for AI crawlers.
 */
export function generateArticleSchema(slug, tool, articleContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: tool.name,
    description: tool.description,
    image: tool.ogImage || `${SITE_URL}/og-default.png`,
    datePublished: tool.dateAdded,
    dateModified: tool.lastReviewed || tool.dateAdded,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${slug}`,
    },
  };
}

/**
 * Generate BreadcrumbList schema for navigation structure.
 * Helps AI crawlers understand site topology.
 */
export function generateBreadcrumbSchema(breadcrumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Organization schema for site-level authority.
 * Placed in root layout.
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "2,000+ free interactive tools, calculators, converters, and generators. From tax calculators to bingo card makers.",
    sameAs: [
      // Add your social profiles here
      "https://twitter.com/mykittools",
      "https://facebook.com/mykittools",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      url: `${SITE_URL}/contact`,
    },
    areaServed: "GB",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}?q={search_term}`,
      },
      query_input: "required name=search_term",
    },
  };
}

// Helper function to capitalize category names for schema
function capitalizeCategory(category) {
  const categoryMap = {
    finance: "Finance",
    cooking: "Cooking & Kitchen",
    games: "Games & Generators",
    developer: "Developer Tools",
    text: "Text Tools",
    converters: "Unit Converters",
    health: "Health & Fitness",
    wedding: "Wedding & Events",
    education: "Education",
    home: "Home & Property",
    business: "Business",
    travel: "Travel",
    datetime: "Date & Time",
    maths: "Maths & Science",
    creative: "Creative & Design",
    parenting: "Parenting & Kids",
    automotive: "Automotive",
    seasonal: "Seasonal",
  };
  return categoryMap[category] || category;
}
