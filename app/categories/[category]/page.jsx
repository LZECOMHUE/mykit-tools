import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/categories";
import {
  getToolsByCategory,
  getFeaturedTools,
  getCategoryFilterTags,
  getCategoryCounts,
} from "@/lib/tool-registry";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CategoryBrowser from "@/components/tools/CategoryBrowser";

export async function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  const counts = getCategoryCounts();
  const count = counts[category] || 0;
  return {
    title: `${cat.name} Tools (${count})`,
    description: `${cat.description}. Browse ${count} free ${cat.name.toLowerCase()} tools, calculators and converters.`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const allTools = getToolsByCategory(category);
  const featured = getFeaturedTools(category, 6);
  const filterTags = getCategoryFilterTags(category);

  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{cat.icon}</span>
            <h1 className="font-heading text-3xl font-bold text-text-primary">
              {cat.name}
            </h1>
            <span className="text-sm text-text-muted font-mono">
              {allTools.length} tools
            </span>
          </div>
          <p className="text-text-secondary">{cat.description}</p>
        </div>

        {/* Interactive browser (client component) */}
        {allTools.length > 0 ? (
          <CategoryBrowser
            allTools={allTools}
            featuredTools={featured}
            filterTags={filterTags}
            categoryName={cat.name}
          />
        ) : (
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-8 text-center text-text-muted">
            <p>Tools coming soon for this category.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
