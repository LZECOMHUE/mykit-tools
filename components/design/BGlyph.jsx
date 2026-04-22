// Custom mono-line glyph set — ported verbatim from direction-b.jsx.
// Stored as an alternative to emoji icons (toggleable via iconStyle setting).

const INK = "#1c1a17";

export default function BGlyph({ slug, size = 28 }) {
  const p = {
    stroke: INK,
    strokeWidth: 1.8,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const marks = {
    finance: (
      <>
        <circle cx="14" cy="14" r="7" {...p} />
        <path d="M11 11h5a2 2 0 0 1 0 4h-5m0 0h6m-6 0v3" {...p} />
      </>
    ),
    converters: <path d="M6 10h14l-3-3M20 18H8l3 3" {...p} />,
    creative: (
      <>
        <circle cx="14" cy="14" r="7" {...p} />
        <circle cx="11" cy="12" r="1.3" fill={INK} />
        <circle cx="17" cy="12" r="1.3" fill={INK} />
        <path d="M11 17c1 1 5 1 6 0" {...p} />
      </>
    ),
    home: <path d="M6 14l8-7 8 7v8h-5v-6h-6v6H6z" {...p} />,
    games: (
      <>
        <rect x="6" y="9" width="16" height="11" rx="2" {...p} />
        <circle cx="10" cy="14" r="1.3" fill={INK} />
        <circle cx="18" cy="14" r="1.3" fill={INK} />
      </>
    ),
    text: <path d="M7 9h14M7 14h10M7 19h14" {...p} />,
    developer: <path d="M10 9l-4 5 4 5M18 9l4 5-4 5M16 7l-4 14" {...p} />,
    cooking: (
      <>
        <path d="M7 13a7 7 0 0 1 14 0v1H7z" {...p} />
        <path d="M6 14h16l-1 7H7z" {...p} />
      </>
    ),
    health: <path d="M14 22s-8-5-8-12a4 4 0 0 1 8-2 4 4 0 0 1 8 2c0 7-8 12-8 12z" {...p} />,
    datetime: (
      <>
        <circle cx="14" cy="14" r="7" {...p} />
        <path d="M14 9v5l3 2" {...p} />
      </>
    ),
    travel: <path d="M5 15l18-7-4 14-4-7z" {...p} />,
    maths: <path d="M8 8h4m-2-2v4M16 8l4 4M16 12l4-4M8 20l4-4M16 18h4" {...p} />,
    education: <path d="M5 11l9-4 9 4-9 4zM8 13v5c2 2 10 2 12 0v-5" {...p} />,
    automotive: (
      <>
        <path d="M6 17l2-6h12l2 6v3H6z" {...p} />
        <circle cx="10" cy="20" r="1.5" {...p} />
        <circle cx="18" cy="20" r="1.5" {...p} />
      </>
    ),
    business: (
      <>
        <rect x="6" y="10" width="16" height="12" rx="1.5" {...p} />
        <path d="M11 10V7h6v3" {...p} />
      </>
    ),
    seasonal: <path d="M14 5v18M6 10l16 8M6 18l16-8" {...p} />,
    fun: <path d="M14 5s4 4 4 8a4 4 0 0 1-8 0c0-2 2-4 2-4s2 3 2 5" {...p} />,
    parenting: (
      <>
        <circle cx="14" cy="10" r="3" {...p} />
        <path d="M8 22c0-3 3-5 6-5s6 2 6 5" {...p} />
      </>
    ),
    quiz: (
      <>
        <circle cx="14" cy="14" r="7" {...p} />
        <path d="M12 12a2 2 0 1 1 3 2c-1 .5-1 1-1 2M14 19v.5" {...p} />
      </>
    ),
    music: (
      <>
        <circle cx="9" cy="19" r="2" {...p} />
        <circle cx="19" cy="17" r="2" {...p} />
        <path d="M11 19V7l10-2v12" {...p} />
      </>
    ),
    wedding: <path d="M11 17a3 3 0 1 1 6 0 3 3 0 1 1 6 0M5 17a3 3 0 1 1 6 0" {...p} />,
    betting: (
      <>
        <rect x="8" y="8" width="12" height="12" rx="2" {...p} />
        <circle cx="11" cy="11" r="1" fill={INK} />
        <circle cx="17" cy="17" r="1" fill={INK} />
        <circle cx="14" cy="14" r="1" fill={INK} />
      </>
    ),
    pdf: (
      <>
        <path d="M9 5h8l4 4v14H9z" {...p} />
        <path d="M17 5v4h4" {...p} />
      </>
    ),
    maps: (
      <>
        <path d="M14 22s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11z" {...p} />
        <circle cx="14" cy="11" r="2" {...p} />
      </>
    ),
    sports: (
      <>
        <circle cx="14" cy="14" r="7" {...p} />
        <path d="M14 7v14M7 14h14" {...p} />
      </>
    ),
  };

  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden>
      {marks[slug] || marks.text}
    </svg>
  );
}

// Icon slot: renders emoji or the mono glyph depending on iconStyle.
export function CatIcon({ cat, size = 32, iconStyle = "emoji" }) {
  if (iconStyle === "emoji") {
    return (
      <span style={{ fontSize: size, lineHeight: 1 }} aria-hidden>
        {cat.icon}
      </span>
    );
  }
  return <BGlyph slug={cat.slug} size={size} />;
}
