import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";
import { CatIcon } from "@/components/design/BGlyph";

// Direction B tool card — white paper, 1.5px ink border, icon chip + title + desc.
// Optional "featured" variant swaps background to yellow with offset ink shadow.
export default function ToolCard({ tool, featured = false, iconStyle = "emoji" }) {
  const cat = getCategoryBySlug(tool.category);

  return (
    <Link
      href={`/${tool.slug}`}
      className={`border-ink shadow-ink-transition shadow-ink-hover flex flex-col group ${
        featured ? "shadow-ink" : ""
      }`}
      style={{
        background: featured ? "var(--color-yellow)" : "var(--color-paper)",
        borderRadius: 18,
        padding: 18,
        minHeight: 120,
      }}
    >
      <div className="flex items-center justify-between mb-2.5">
        <div
          className="border-ink grid place-items-center"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "rgba(255,255,255,0.7)",
          }}
        >
          {cat && (
            <CatIcon cat={cat} size={iconStyle === "emoji" ? 18 : 20} iconStyle={iconStyle} />
          )}
        </div>
        {featured && (
          <span
            className="text-white font-bold tracking-wider"
            style={{
              padding: "3px 8px",
              background: "var(--color-ink)",
              fontSize: 10.5,
              borderRadius: 999,
              letterSpacing: "0.04em",
            }}
          >
            ⭐ FEATURED
          </span>
        )}
      </div>
      <h3 className="font-[800] text-[16px] tracking-[-0.01em] mb-1 text-[color:var(--color-ink)] leading-snug">
        {tool.name}
      </h3>
      <p className="text-[13px] text-[color:var(--color-muted)] leading-[1.45] text-pretty flex-1 line-clamp-3">
        {tool.description}
      </p>
    </Link>
  );
}
