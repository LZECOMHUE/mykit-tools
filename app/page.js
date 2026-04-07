import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolCard from "@/components/tools/ToolCard";
import ToolCounter from "@/components/layout/ToolCounter";
import SurpriseButton from "@/components/layout/SurpriseButton";
import { tools, getToolBySlug, getCategoryCounts } from "@/lib/tool-registry";
import { categories } from "@/lib/categories";

// Curated popular tools that span different categories and showcase the site's breadth
const POPULAR_SLUGS = [
  "uk-tax-calculator",
  "word-counter",
  "password-generator",
  "cups-to-grams",
  "bmi-calculator",
  "json-formatter",
  "mortgage-calculator",
  "colour-picker",
  "percentage-calculator",
];

export default function HomePage() {
  const counts = getCategoryCounts();
  const popularTools = POPULAR_SLUGS
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean)
    .slice(0, 6);

  const recentTools = [...tools]
    .filter((t) => t.tier <= 2)
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 6);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="flex flex-col items-center text-center py-16 md:py-24 px-4 sm:px-6">
          <h1 className="font-heading font-black text-4xl md:text-6xl text-text-primary mb-6 tracking-tighter leading-tight">
            Free tools that<br />
            <span className="text-accent italic">actually work.</span>
          </h1>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto mb-12">
            Calculators, converters, generators, and more. No sign-up needed —
            just open and use.
          </p>
          <div className="flex justify-center mb-8">
            <ToolCounter />
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap font-body">
            <Link
              href="/uk-tax-calculator"
              className="inline-flex items-center px-6 py-3 text-sm font-bold text-white bg-accent hover:bg-accent-hover rounded-[var(--radius-input)] shadow-sm transition-all"
            >
              Try the UK Tax Calculator
            </Link>
            <Link
              href="/categories/finance"
              className="inline-flex items-center px-6 py-3 text-sm font-bold text-text-primary bg-white border border-border hover:bg-surface-hover rounded-[var(--radius-input)] shadow-sm transition-all"
            >
              Browse Categories
            </Link>
            <SurpriseButton />
          </div>
        </section>

        {/* Categories grid */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 mb-12">
          <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-end gap-4">
            <div>
              <h2 className="font-heading font-bold text-2xl tracking-tight mb-2 text-text-primary">
                Browse by Category
              </h2>
              <p className="font-body text-sm text-text-secondary">Hand-picked tools for every workflow.</p>
            </div>
            <Link className="text-sm font-bold text-accent flex items-center gap-1 group" href="/categories">
                View all categories
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="border border-black/5 rounded-2xl p-6 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                style={{ backgroundColor: `var(--color-${cat.color})` }}
              >
                <div className="w-14 h-14 bg-white/60 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/90 transition-all duration-300 text-3xl shadow-sm">
                  {cat.icon}
                </div>
                <span className="font-heading font-bold text-sm text-text-primary">{cat.name}</span>
                <span className="text-xs text-text-secondary mt-1 font-medium opacity-80">{counts[cat.slug] || 0} tools</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular tools */}
        {popularTools.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12 mb-8">
            <div className="mb-8">
              <h2 className="font-heading font-bold text-2xl tracking-tight mb-2 text-text-primary">
                Popular Tools
              </h2>
              <p className="font-body text-sm text-text-secondary">The essentials we're currently obsessing over.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}

        {/* Recently added */}
        {recentTools.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12 mb-8">
            <div className="mb-8">
              <h2 className="font-heading font-bold text-2xl tracking-tight mb-2 text-text-primary">
                Recently Added
              </h2>
              <p className="font-body text-sm text-text-secondary">Fresh tools right out of the oven.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
