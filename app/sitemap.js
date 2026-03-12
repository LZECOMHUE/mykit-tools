import { tools } from "@/lib/tool-registry";
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

  // Tag pages — cross-category organization
  // Extract unique tags from all tools
  const allTags = new Set();
  tools.forEach((tool) => {
    if (tool.tags && Array.isArray(tool.tags)) {
      tool.tags.forEach((tag) => allTags.add(tag));
    }
  });

  const tagPages = Array.from(allTags).map((tag) => ({
    url: `${BASE_URL}/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Combine all pages
  return [
    ...homePage,
    ...toolPages,
    ...categoryPages,
    ...tagPages,
  ];
}
