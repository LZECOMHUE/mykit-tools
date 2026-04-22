import Link from "next/link";
import { CatIcon } from "./BGlyph";

// Rotation pattern per Direction B spec — cycled deterministically by index.
const ROTATIONS = [-1, 1, -0.5, 0.7, -0.8];

export default function CategoryCard({ cat, count, index = 0, iconStyle = "emoji" }) {
  const tint = `var(--color-${cat.color})`;
  const rotation = ROTATIONS[index % ROTATIONS.length];

  return (
    <Link
      href={`/categories/${cat.slug}`}
      className="border-ink shadow-ink shadow-ink-transition shadow-ink-hover relative flex flex-col justify-between group"
      style={{
        background: tint,
        borderRadius: 22,
        padding: 20,
        minHeight: 130,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div
        className="border-ink grid place-items-center"
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "rgba(255,255,255,0.7)",
        }}
      >
        <CatIcon cat={cat} size={iconStyle === "emoji" ? 26 : 28} iconStyle={iconStyle} />
      </div>
      <div>
        <div className="font-[800] text-[16px] tracking-[-0.01em] text-[color:var(--color-ink)]">
          {cat.name}
        </div>
        <div className="text-[12.5px] font-semibold text-[color:var(--color-ink)] opacity-60 mt-[2px]">
          {count} tools
        </div>
      </div>
    </Link>
  );
}
