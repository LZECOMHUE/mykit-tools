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
import CategoryHero from "@/components/design/CategoryHero";
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
      <main className="max-w-[1280px] mx-auto px-5 sm:px-10 pt-2 pb-10">
        <CategoryHero cat={cat} count={counts[cat.slug] || 0} />

        <div className="mt-8">
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
            <div
              className="border-ink text-center text-[color:var(--color-muted)] font-medium"
              style={{
                background: "var(--color-paper)",
                borderRadius: 22,
                padding: 32,
              }}
            >
              <p>Tools coming soon for this category.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
