import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/design/CategoryCard";
import PopularToolCard from "@/components/design/PopularToolCard";
import HomeHeroSearch from "@/components/design/HomeHeroSearch";
import { tools, getToolBySlug, getCategoryCounts } from "@/lib/tool-registry";
import { categories } from "@/lib/categories";

// Curated popular tools that span different categories
const POPULAR_SLUGS = [
  "uk-tax-calculator",
  "word-counter",
  "password-generator",
  "cups-to-grams",
  "bmi-calculator",
  "json-formatter",
];

const QUICK_CHIPS = [
  { emoji: "🏠", label: "Mortgage", slug: "mortgage-calculator" },
  { emoji: "🥣", label: "Cups to Grams", slug: "cups-to-grams" },
  { emoji: "🔐", label: "Password", slug: "password-generator" },
  { emoji: "💪", label: "BMI", slug: "bmi-calculator" },
  { emoji: "💰", label: "UK Tax", slug: "uk-tax-calculator" },
];

export default function HomePage() {
  const counts = getCategoryCounts();
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
  const popularTools = POPULAR_SLUGS.map((slug) => getToolBySlug(slug)).filter(Boolean);

  // Sort categories by count (high to low), take first 12 for balanced 4-col grid.
  const shownCategories = [...categories]
    .sort((a, b) => (counts[b.slug] || 0) - (counts[a.slug] || 0))
    .slice(0, 12);

  const recentTools = [...tools]
    .filter((t) => t.tier <= 2)
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 6);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative text-center px-5 sm:px-10 pt-8 pb-16 md:pt-12 md:pb-24">
          {/* Decorative floating blobs — hidden on mobile */}
          <div
            aria-hidden
            className="absolute hidden md:block pointer-events-none"
            style={{
              top: 40, left: 80, width: 60, height: 60,
              borderRadius: "50%", background: "var(--color-yellow)",
              opacity: 0.7, transform: "rotate(8deg)",
            }}
          />
          <div
            aria-hidden
            className="absolute hidden md:block pointer-events-none"
            style={{
              top: 120, right: 100, width: 90, height: 90,
              borderRadius: "42% 58% 50% 50% / 50%",
              background: "var(--color-pink)", opacity: 0.55,
            }}
          />
          <div
            aria-hidden
            className="absolute hidden md:block pointer-events-none"
            style={{
              top: 240, left: 130, width: 40, height: 40,
              borderRadius: "50%", background: "var(--color-mint)",
              opacity: 0.7,
            }}
          />

          {/* Trust badge */}
          <div
            className="inline-flex items-center gap-2 mb-7 border-[1.5px] relative"
            style={{
              padding: "6px 14px 6px 10px",
              borderRadius: 999,
              background: "var(--color-paper)",
              borderColor: "var(--color-border)",
              fontSize: 13,
              fontWeight: 600,
              color: "var(--color-ink)",
            }}
          >
            <span>🫶</span>
            <span>{totalCount.toLocaleString()} free tools · no sign-up, no ads on Pro</span>
          </div>

          <h1
            className="mx-auto mb-[18px] text-balance relative"
            style={{
              fontSize: "clamp(52px, 9vw, 80px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              maxWidth: 900,
            }}
          >
            Tiny tools for{" "}
            <em
              className="not-italic inline-block"
              style={{
                background: "var(--color-yellow)",
                padding: "0 12px",
                borderRadius: 14,
                transform: "rotate(-1.5deg)",
              }}
            >
              almost everything
            </em>
            .
          </h1>

          <p
            className="mx-auto mb-10 text-pretty"
            style={{
              fontSize: 19,
              color: "var(--color-muted)",
              lineHeight: 1.45,
              maxWidth: 560,
              fontWeight: 500,
            }}
          >
            Calculators, converters, generators, and a suspicious number of JSON tools. Open tab, use tool, done.
          </p>

          {/* Big search bar */}
          <div className="relative">
            <HomeHeroSearch />
          </div>

          {/* Quick chips */}
          <div className="flex gap-2 justify-center mt-6 flex-wrap relative">
            {QUICK_CHIPS.map(({ emoji, label, slug }) => (
              <Link
                key={slug}
                href={`/${slug}`}
                className="press-scale transition-colors hover:bg-[color:var(--color-surface-hover)]"
                style={{
                  padding: "6px 14px",
                  background: "var(--color-paper)",
                  borderRadius: 999,
                  border: "1.5px solid var(--color-border)",
                  fontSize: 13.5,
                  fontWeight: 600,
                  color: "var(--color-ink)",
                }}
              >
                {emoji} {label}
              </Link>
            ))}
          </div>
        </section>

        {/* Categories grid */}
        <section className="max-w-[1200px] mx-auto px-5 sm:px-10 pb-16">
          <div className="flex items-baseline justify-between mb-7">
            <h2
              className="m-0"
              style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Pick a category 👇
            </h2>
            <Link
              href="/categories/finance"
              className="text-sm font-bold text-[color:var(--color-accent)] press-scale"
            >
              All 25 →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {shownCategories.map((cat, i) => (
              <CategoryCard
                key={cat.slug}
                cat={cat}
                count={counts[cat.slug] || 0}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Popular */}
        {popularTools.length > 0 && (
          <section id="popular" className="max-w-[1200px] mx-auto px-5 sm:px-10 pb-20 scroll-mt-24">
            <h2
              className="m-0 mb-2"
              style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Currently obsessed with
            </h2>
            <p className="text-[15px] text-[color:var(--color-muted)] mb-6">
              The essentials everyone's opening right now.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularTools.map((tool) => (
                <PopularToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Recently added */}
        {recentTools.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-5 sm:px-10 pb-20">
            <h2
              className="m-0 mb-2"
              style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.03em" }}
            >
              Fresh out of the oven
            </h2>
            <p className="text-[15px] text-[color:var(--color-muted)] mb-6">
              Recently added — still warm.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentTools.map((tool) => (
                <PopularToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
