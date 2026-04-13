import { notFound } from "next/navigation";
import Link from "next/link";
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
import FinanceCategoryBrowser from "@/components/tools/FinanceCategoryBrowser";

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

  const counts = getCategoryCounts();

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {allTools.length > 0 ? (
          category === "finance" ? (
            <FinanceCategoryBrowser allTools={allTools} cat={cat} />
          ) : (
            <CategoryBrowser
              allTools={allTools}
              featuredTools={featured}
              filterTags={filterTags}
              categoryName={cat.name}
              cat={cat}
            />
          )
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
