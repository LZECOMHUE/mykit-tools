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
import { creativeSEO } from "./creative.js";
import { textSEO } from "./text.js";
import { developerSEO } from "./developer.js";
import { datetimeSEO } from "./datetime.js";
import { funSEO } from "./fun.js";
import { travelSEO } from "./travel.js";

import { educationSEO } from "./education";
import { parentingSEO } from "./parenting.js";
import { bettingSEO } from "./betting.js";
import { sportsSEO } from "./sports.js";

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
  ...creativeSEO,
  ...textSEO,
  ...developerSEO,
  ...datetimeSEO,
  ...funSEO,
  ...travelSEO,
  ...educationSEO,
  ...parentingSEO,
  ...bettingSEO,
  ...sportsSEO,
};

/**
 * Get SEO content (sections + FAQs) for a given tool slug.
 * Returns null if no content exists for this tool.
 */
export function getSEOContent(slug) {
  return allSEOContent[slug] || null;
}
