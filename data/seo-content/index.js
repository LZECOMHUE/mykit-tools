// Aggregates all SEO content by tool slug.
// Import category files and spread into a single lookup map.

import { financeSEO } from "./finance";
import { convertersSEO } from "./converters";
import { mathsSEO } from "./maths";
import { fitnessSEO } from "./fitness";
import { gameSEO } from "./games";
import { seasonalSEO } from "./seasonal.js";
import { businessSEO } from "./business.js";
import { mapsSEO } from "./maps.js";
import { cookingSEO } from "./cooking.js";
import { homeSEO } from "./home.js";
import { musicSEO } from "./music.js";
import { automotiveSEO } from "./automotive.js";

// Add more category imports as SEO content is written:
// import { educationSEO } from "./education";

const allSEOContent = {
  ...financeSEO,
  ...convertersSEO,
  ...mathsSEO,
  ...fitnessSEO,
  ...gameSEO,
  ...seasonalSEO,
  ...businessSEO,
  ...mapsSEO,
  ...cookingSEO,
  ...homeSEO,
  ...musicSEO,
  ...automotiveSEO,
  // ...educationSEO,
};

/**
 * Get SEO content (sections + FAQs) for a given tool slug.
 * Returns null if no content exists for this tool.
 */
export function getSEOContent(slug) {
  return allSEOContent[slug] || null;
}
