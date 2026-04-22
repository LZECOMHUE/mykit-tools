import Link from "next/link";
import { getRelatedTools } from "@/lib/tool-registry";
import { getCategoryBySlug } from "@/lib/categories";

export default function RelatedTools({ slug }) {
  const related = getRelatedTools(slug, 4);
  if (related.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="text-[14px] font-[800] mb-3 text-[color:var(--color-ink)]">
        More tools →
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {related.map((tool) => {
          const cat = getCategoryBySlug(tool.category);
          return (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              className="border-ink shadow-ink-transition shadow-ink-hover flex items-center gap-2.5"
              style={{
                background: "var(--color-paper)",
                borderRadius: 14,
                padding: "12px 14px",
                fontSize: 13.5,
                fontWeight: 700,
                color: "var(--color-ink)",
              }}
            >
              <span className="text-lg shrink-0">{cat?.icon || "🛠"}</span>
              <span className="truncate">{tool.name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
