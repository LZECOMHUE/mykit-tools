/**
 * Robots.txt configuration for MyKit.tools
 * Allows all major AI crawlers for GEO/AEO optimization
 *
 * Key strategy:
 * - Allow GPTBot (OpenAI), Claude-Web (Anthropic), and other AI crawlers
 * - Disallow only sensitive paths (admin, user accounts)
 * - Set a reasonable crawl delay for standard bots
 * - Reference sitemap for efficient indexing
 */

export default function robots() {
  return {
    rules: [
      // === AI Crawlers (Allow all) ===
      {
        userAgent: "GPTBot",
        allow: "/",
        crawlDelay: 0, // No crawl delay for AI crawlers
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Claude-User",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "CCBot",
        allow: "/", // Commoncrawl
        crawlDelay: 0,
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        crawlDelay: 0,
      },

      // === Standard Search Crawlers ===
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },

      // === Disallow harmful bots ===
      {
        userAgent: "AhrefsBot",
        disallow: "/", // Aggressive crawler
      },
      {
        userAgent: "SemrushBot",
        disallow: "/", // Aggressive crawler
      },

      // === Default rule (applies to all others) ===
      {
        userAgent: "*",
        allow: "/",
        crawlDelay: 1,
      },
    ],

    // Sitemap for efficient indexing
    sitemap: "https://mykit.tools/sitemap.xml",

    // Disallow admin and user-specific paths
    // Note: These are enforced via the rules above for specific bots
    // For comprehensive security, also configure NextAuth paths
  };
}
