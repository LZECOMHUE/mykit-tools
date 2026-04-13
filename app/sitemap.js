import { tools, getValidTags } from "@/lib/tool-registry";
import { categories } from "@/lib/categories";

const BASE_URL = "https://mykit.tools";

/**
 * Dynamic XML sitemap generation
 * Includes: homepage, tools, categories, tags
 * Automatically updated from tool registry
 *
 * AI crawlers (Googlebot, GPTBot, Claude-Web) will use this
 * to efficiently discover and crawl the entire site structure
 */
export default function sitemap() {
  // Homepage — highest priority
  const homePage = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Tool pages — priority based on tier (Tier 1 = flagship tools)
  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}/${tool.slug}`,
    lastModified: tool.lastReviewed || tool.dateAdded,
    changeFrequency: tool.tier === 1 ? "weekly" : "monthly",
    priority: tool.tier === 1 ? 0.9 : tool.tier === 2 ? 0.7 : 0.5,
  }));

  // Category pages — for topical browsing and cluster authority
  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/categories/${cat.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Static core pages
  const staticPages = ["about", "contact", "pricing", "privacy", "terms"].map((route) => ({
    url: `${BASE_URL}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Tag pages — cross-category groupings (only tags with 3+ tools)
  const tagPages = getValidTags().map(({ tag }) => ({
    url: `${BASE_URL}/tags/${tag}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  // Combine all pages
  return [
    ...homePage,
    ...staticPages,
    ...toolPages,
    ...categoryPages,
    ...tagPages,
  ];
}
