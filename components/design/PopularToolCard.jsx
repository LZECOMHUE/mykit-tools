import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";
import { CatIcon } from "./BGlyph";

// Popular tool card — white paper, 1.5px ink border, big peeking category tint circle.
export default function PopularToolCard({ tool, iconStyle = "emoji" }) {
  const cat = getCategoryBySlug(tool.category);
  if (!cat) return null;
  const tint = `var(--color-${cat.color})`;

  return (
    <Link
      href={`/${tool.slug}`}
      className="border-ink shadow-ink-transition shadow-ink-hover relative overflow-hidden block group"
      style={{ background: "var(--color-paper)", borderRadius: 20, padding: 20 }}
    >
      {/* Peeking circle — top-right */}
      <div
        className="absolute"
        style={{
          top: -20,
          right: -20,
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: tint,
        }}
      />
      <div className="relative">
        <div className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[color:var(--color-muted)] mb-3.5">
          <CatIcon cat={cat} size={iconStyle === "emoji" ? 14 : 16} iconStyle={iconStyle} />
          {cat.name}
        </div>
        <div className="font-[800] text-[20px] tracking-[-0.02em] mb-2 text-[color:var(--color-ink)] leading-tight">
          {tool.name}
        </div>
        <p className="text-[13.5px] text-[color:var(--color-muted)] leading-[1.5] text-pretty mb-3.5 line-clamp-2">
          {tool.description}
        </p>
        <div
          className="border-ink inline-flex items-center gap-1.5 text-[13px] font-bold text-[color:var(--color-ink)]"
          style={{
            padding: "6px 12px",
            background: "var(--color-yellow)",
            borderRadius: 999,
          }}
        >
          Open it →
        </div>
      </div>
    </Link>
  );
}
