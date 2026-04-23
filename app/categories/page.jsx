import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/design/CategoryCard";
import { categories } from "@/lib/categories";
import { getCategoryCounts } from "@/lib/tool-registry";

export const metadata = {
  title: "All Categories",
  description: "Browse all 25 categories of free online tools — calculators, converters, generators, and more. Every tool at MyKit.tools, organised by topic.",
  alternates: { canonical: "https://mykit.tools/categories" },
};

export default function AllCategoriesPage() {
  const counts = getCategoryCounts();
  const totalCount = Object.values(counts).reduce((a, b) => a + b, 0);

  // Sort by tool count, highest first — keeps the grid visually balanced.
  const sortedCategories = [...categories].sort(
    (a, b) => (counts[b.slug] || 0) - (counts[a.slug] || 0)
  );

  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-5 sm:px-10 pt-8 pb-16">
        <div className="mb-10 text-center sm:text-left">
          <div
            className="inline-flex items-center gap-2 mb-5 border-[1.5px]"
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
            <span>🗂</span>
            <span>{categories.length} categories · {totalCount.toLocaleString()} tools total</span>
          </div>
          <h1
            className="m-0 mb-3 text-balance"
            style={{
              fontSize: "clamp(40px, 7vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 0.98,
            }}
          >
            Pick your flavour 👇
          </h1>
          <p
            className="m-0 text-[color:var(--color-muted)] text-pretty"
            style={{ fontSize: 18, lineHeight: 1.5, maxWidth: 640, fontWeight: 500 }}
          >
            Every category on MyKit.tools. Click through to browse the tools inside.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {sortedCategories.map((cat, i) => (
            <CategoryCard
              key={cat.slug}
              cat={cat}
              count={counts[cat.slug] || 0}
              index={i}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
