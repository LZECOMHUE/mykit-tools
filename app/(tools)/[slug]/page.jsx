import { notFound } from "next/navigation";
import { getToolBySlug, getAllSlugs, getRelatedTools } from "@/lib/tool-registry";
import { generateToolMeta } from "@/lib/seo";
import { getToolComponent } from "@/lib/tool-components";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import AdSlot from "@/components/premium/AdSlot";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolSEOContent from "@/components/tools/ToolSEOContent";
import { getSEOContent } from "@/data/seo-content";

// Generate static params for all registered tools
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Generate metadata from registry
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return generateToolMeta(tool);
}

export default async function ToolPage({ params }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const ToolComponent = getToolComponent(slug);

  // Load SEO content if it exists for this tool
  const seoContent = getSEOContent(slug);

  // Build related tools list for SEO content internal linking
  const seoRelatedTools = tool.relatedSlugs
    ? tool.relatedSlugs.map(getToolBySlug).filter(Boolean)
    : [];

  return (
    <>
      <Breadcrumbs tool={tool} />

      <h1 className="font-heading text-3xl font-bold text-text-primary">
        {tool.name}
      </h1>
      <p className="text-text-secondary mt-1 mb-5 text-sm">{tool.description}</p>

      <AdSlot position="above-tool" />

      {ToolComponent ? (
        <ToolComponent />
      ) : (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-8 text-center text-text-muted">
          <p className="text-lg mb-2">Coming soon</p>
          <p className="text-sm">This tool is currently being built.</p>
        </div>
      )}

      <AdSlot position="below-tool" />

      {/* SEO content with tips, worked examples, and FAQs */}
      {seoContent && (
        <ToolSEOContent
          toolName={tool.name}
          sections={seoContent.sections || []}
          faqs={seoContent.faqs || []}
          relatedTools={seoRelatedTools}
          generateFAQSchema={true}
        />
      )}

      <RelatedTools slug={slug} />
    </>
  );
}
