import Link from "next/link";
import { CatIcon } from "./BGlyph";

// Direction B category hero band — full-width tinted card with translucent
// circle bleed, offset icon tile and big title.
export default function CategoryHero({ cat, count, iconStyle = "emoji" }) {
  const tint = `var(--color-${cat.color})`;

  return (
    <section
      className="relative overflow-hidden border-ink"
      style={{
        background: tint,
        borderRadius: 28,
        padding: "40px",
      }}
    >
      {/* Translucent peeking circle */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: -60,
          right: -40,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.4)",
        }}
      />

      <div className="relative">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-3.5">
          <ol className="flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--color-ink)] opacity-60 flex-wrap">
            <li>
              <Link href="/" className="hover:opacity-100">Tools</Link>
            </li>
            <li aria-hidden>›</li>
            <li>Categories</li>
            <li aria-hidden>›</li>
            <li className="opacity-100 font-bold" aria-current="page">{cat.name}</li>
          </ol>
        </nav>

        <div className="flex items-center gap-5 mb-3.5 flex-wrap">
          <div
            className="grid place-items-center border-ink-2 shadow-ink"
            style={{
              width: 76,
              height: 76,
              borderRadius: 20,
              background: "var(--color-paper)",
              transform: "rotate(-4deg)",
              flexShrink: 0,
            }}
          >
            <CatIcon cat={cat} size={44} iconStyle={iconStyle} />
          </div>
          <div>
            <h1
              className="m-0"
              style={{
                fontSize: "clamp(36px, 6vw, 54px)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1,
              }}
            >
              {cat.name}
            </h1>
            <div className="text-[15px] font-semibold text-[color:var(--color-ink)] opacity-70 mt-1.5">
              {count} tools · free · no sign-up
            </div>
          </div>
        </div>

        <p
          className="m-0 text-[color:var(--color-ink)] opacity-80 text-pretty"
          style={{
            fontSize: 16,
            maxWidth: 560,
            lineHeight: 1.5,
          }}
        >
          {cat.description}
        </p>
      </div>
    </section>
  );
}
