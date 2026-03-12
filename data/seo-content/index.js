// Aggregates all SEO content by tool slug.
// Import category files and spread into a single lookup map.

import { financeSEO } from "./finance";

// Add more category imports as SEO content is written:
// import { educationSEO } from "./education";
// import { gameSEO } from "./games";

const allSEOContent = {
  ...financeSEO,
  // ...educationSEO,
  // ...gameSEO,
};

/**
 * Get SEO content (sections + FAQs) for a given tool slug.
 * Returns null if no content exists for this tool.
 */
export function getSEOContent(slug) {
  return allSEOContent[slug] || null;
}
