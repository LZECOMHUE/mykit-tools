import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolCard from "@/components/tools/ToolCard";
import ToolCounter from "@/components/layout/ToolCounter";
import { tools, getCategoryCounts } from "@/lib/tool-registry";
import { categories } from "@/lib/categories";

export default function HomePage() {
  const counts = getCategoryCounts();
  const recentTools = [...tools]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 6);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-white border-b border-border">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              Free tools that{" "}
              <span className="text-accent">actually work</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-xl mx-auto mb-6">
              Calculators, converters, generators, and more. No sign-up needed —
              just open and use.
            </p>
            <div className="flex justify-center mb-8">
              <ToolCounter />
            </div>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/uk-tax-calculator"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-white bg-accent hover:bg-accent-hover rounded-[var(--radius-input)] transition-colors"
              >
                Try the UK Tax Calculator
              </Link>
              <Link
                href="/categories/finance"
                className="inline-flex items-center px-6 py-3 text-sm font-medium text-text-primary bg-white border border-border hover:bg-surface-hover rounded-[var(--radius-input)] transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </section>

        {/* Categories grid */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-heading text-2xl font-bold text-text-primary mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="flex items-center gap-3 p-4 bg-white border border-border rounded-[var(--radius-card)] hover:border-border-hover hover:shadow-sm transition-all"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <span className="text-sm font-medium text-text-primary block">
                    {cat.name}
                  </span>
                  <span className="text-xs text-text-muted">
                    {counts[cat.slug] || 0} tools
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recently added */}
        {recentTools.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-12">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-8">
              Recently Added
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
