import { getRelatedTools } from "@/lib/tool-registry";
import ToolCard from "./ToolCard";

export default function RelatedTools({ slug }) {
  const related = getRelatedTools(slug, 4);
  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-heading text-xl font-bold text-text-primary mb-6">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
