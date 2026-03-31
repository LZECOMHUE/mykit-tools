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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 lg:w-72 shrink-0">
            <div className="sticky top-24">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl drop-shadow-sm">{cat.icon}</span>
                  <h1 className="font-heading text-3xl font-extrabold tracking-tight text-text-primary">
                    {cat.name}
                  </h1>
                </div>
                <p className="text-text-secondary text-sm font-medium">
                  {cat.description}
                </p>
              </div>

              <nav className="space-y-1 mb-12 max-md:flex max-md:overflow-x-auto max-md:pb-4 max-md:space-y-0 max-md:gap-2 max-md:-mx-4 max-md:px-4 hide-scrollbar">
                <div className="px-3 py-2 text-[10px] uppercase tracking-widest font-bold text-text-muted hidden md:block">
                  Tool Categories
                </div>
                {categories.map((c) => {
                  const isActive = c.slug === category;
                  const count = counts[c.slug] || 0;
                  return (
                    <Link
                      key={c.slug}
                      href={`/categories/${c.slug}`}
                      className={`flex items-center justify-between group px-4 py-3 max-md:px-4 max-md:py-2 rounded-xl transition-all whitespace-nowrap shrink-0 ${
                        isActive
                          ? "bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-accent font-bold border border-border/60"
                          : "text-text-primary hover:bg-surface-hover font-medium border border-transparent"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`text-lg hidden md:block ${isActive ? '' : 'opacity-70 group-hover:opacity-100 transition-opacity'}`}>
                          {c.icon}
                        </span>
                        {c.name}
                      </span>
                      {isActive && (
                        <span className="hidden md:inline-block bg-accent/10 text-accent text-[10px] px-2 py-0.5 rounded-full font-bold ml-2">
                          {count}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Sidebar Promo */}
              <div className="p-6 bg-accent-muted rounded-xl relative overflow-hidden group hidden md:block border border-accent/10">
                <div className="relative z-10">
                  <h4 className="font-heading font-bold text-accent-hover leading-tight">
                    Create your own kit.
                  </h4>
                  <p className="text-xs mt-2 text-accent-hover/80 font-medium tracking-tight">
                    Save and organize your favorite tools.
                  </p>
                  <Link href="/pricing" className="mt-4 inline-block bg-white text-accent-hover px-4 py-2 rounded-full text-xs font-bold hover:shadow-md transition-all">
                    Join Pro
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Canvas */}
          <div className="flex-1 min-w-0">

        {/* Interactive browser (client component) */}
        {allTools.length > 0 ? (
          category === "finance" ? (
            <FinanceCategoryBrowser allTools={allTools} />
          ) : (
            <CategoryBrowser
              allTools={allTools}
              featuredTools={featured}
              filterTags={filterTags}
              categoryName={cat.name}
            />
          )
        ) : (
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-8 text-center text-text-muted">
            <p>Tools coming soon for this category.</p>
          </div>
        )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
