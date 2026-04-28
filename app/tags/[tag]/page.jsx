import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import {
  getToolsByTag,
  getValidTags,
  isValidTag,
  getTagFallbackCategory,
} from "@/lib/tool-registry";
import { getCategoryBySlug } from "@/lib/categories";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToolCard from "@/components/tools/ToolCard";

export async function generateStaticParams() {
  return getValidTags().map(({ tag }) => ({ tag }));
}

function formatTagName(tag) {
  return tag
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }) {
  const { tag } = await params;
  if (!isValidTag(tag)) return {};
  const tools = getToolsByTag(tag);
  const name = formatTagName(tag);
  return {
    title: `${name} Tools (${tools.length}) - Free Online Tools | MyKit.tools`,
    description: `Browse ${tools.length} free ${name.toLowerCase()} tools, calculators and converters. Find the right tool for your needs.`,
    alternates: {
      canonical: `https://mykit.tools/tags/${tag}`,
    },
  };
}

export default async function TagPage({ params }) {
  const { tag } = await params;

  // Thin tags redirect to the most relevant category
  if (!isValidTag(tag)) {
    const fallback = getTagFallbackCategory(tag);
    if (fallback) redirect(`/categories/${fallback}`);
    notFound();
  }

  const tools = getToolsByTag(tag);
  const name = formatTagName(tag);

  // Group by category for better browsing
  const byCategory = {};
  for (const tool of tools) {
    const cat = tool.category;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(tool);
  }
  const sortedCategories = Object.entries(byCategory).sort(
    (a, b) => b[1].length - a[1].length
  );

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Breadcrumbs */}
        <nav className="text-xs text-text-muted mb-4">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-text-secondary">Tags</span>
          <span className="mx-1.5">/</span>
          <span className="text-text-secondary">{name}</span>
        </nav>

        <h1 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-1">
          {name} Tools
        </h1>
        <p className="text-sm text-text-secondary mb-6">
          {tools.length} free tools tagged with "{tag}"
        </p>

        {/* Related tags */}
        <RelatedTags currentTag={tag} tools={tools} />

        {/* Tools grouped by category */}
        {sortedCategories.map(([catSlug, catTools]) => {
          const cat = getCategoryBySlug(catSlug);
          return (
            <section key={catSlug} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{cat?.icon}</span>
                <h2 className="font-heading font-bold text-lg text-text-primary">
                  {cat?.name || catSlug}
                </h2>
                <span className="text-xs text-text-muted">
                  ({catTools.length})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {catTools
                  .sort((a, b) => a.tier - b.tier)
                  .map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
              </div>
            </section>
          );
        })}

        {/* SEO text */}
        <div className="mt-8 pt-6 border-t border-border text-sm text-text-secondary leading-relaxed max-w-3xl">
          <p>
            Explore our collection of {tools.length} free {name.toLowerCase()}{" "}
            tools. Each tool works directly in your browser with no sign-up
            required. From calculators and converters to generators and planners
            - find the right tool for your needs and get results instantly.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function RelatedTags({ currentTag, tools }) {
  // Find other common tags across these tools
  const tagCounts = {};
  for (const tool of tools) {
    for (const tag of tool.tags || []) {
      if (tag !== currentTag) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    }
  }
  // Only link to tags that have their own indexable page (3+ tools site-wide).
  // Linking to thin tags would re-create the /tags/* 404 problem GSC flagged.
  const related = Object.entries(tagCounts)
    .filter(([tag]) => isValidTag(tag))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  if (related.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 mb-6">
      <span className="text-xs text-text-muted mr-1 self-center">
        Related:
      </span>
      {related.map(([tag]) => (
        <Link
          key={tag}
          href={`/tags/${tag}`}
          className="px-2.5 py-1 rounded-full text-xs font-medium bg-surface border border-border hover:border-accent/30 hover:text-accent transition-colors"
        >
          {formatTagName(tag)}
        </Link>
      ))}
    </div>
  );
}
