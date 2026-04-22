import { notFound } from "next/navigation";
import { getToolBySlug, getAllSlugs, getRelatedTools } from "@/lib/tool-registry";
import { generateToolMeta } from "@/lib/seo";
import { getToolComponent } from "@/lib/tool-components";
import ToolPageHeader from "@/components/design/ToolPageHeader";
import AdSlot from "@/components/premium/AdSlot";
import RelatedTools from "@/components/tools/RelatedTools";
import ToolSEOContent from "@/components/tools/ToolSEOContent";
import TrackRecent from "@/components/mykit/TrackRecent";
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

  const seoContent = getSEOContent(slug);

  const registryRelated = tool.relatedSlugs
    ? tool.relatedSlugs.map(getToolBySlug).filter(Boolean)
    : [];
  const seoRelated = seoContent?.relatedTools
    ? seoContent.relatedTools.map((rt) => {
        const found = getToolBySlug(rt.slug);
        return found || { slug: rt.slug, name: rt.label };
      })
    : [];
  const seoRelatedTools = registryRelated.length > 0 ? registryRelated : seoRelated;

  return (
    <>
      <TrackRecent slug={slug} />
      <ToolPageHeader tool={tool} />

      <AdSlot position="above-tool" />

      {ToolComponent ? (
        <ToolComponent />
      ) : (
        <div
          className="border-ink text-center text-[color:var(--color-muted)] font-medium"
          style={{
            background: "var(--color-paper)",
            borderRadius: 24,
            padding: 40,
          }}
        >
          <p className="text-lg mb-2 font-bold text-[color:var(--color-ink)]">Coming soon</p>
          <p className="text-sm">This tool is currently being built.</p>
        </div>
      )}

      <AdSlot position="below-tool" />

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
