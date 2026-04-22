"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchTools } from "@/lib/search";
import { getCategoryBySlug } from "@/lib/categories";

export default function HomeHeroSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const r = searchTools(query);
    setResults(r);
    setOpen(r.length > 0 && query.length >= 2);
  }, [query]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (results[0]) router.push(`/${results[0].slug}`);
  }

  return (
    <div ref={ref} className="relative max-w-[620px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border-ink-2 shadow-ink-lg"
        style={{
          background: "var(--color-paper)",
          borderRadius: 999,
          padding: 8,
        }}
      >
        <span className="px-3.5 text-xl">🔍</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="What do you need to figure out?"
          className="flex-1 bg-transparent outline-none text-[16px] font-medium text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] min-w-0"
        />
        <button
          type="submit"
          className="press-scale shrink-0"
          style={{
            padding: "12px 20px",
            borderRadius: 999,
            background: "var(--color-accent)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          Find it →
        </button>
      </form>

      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-2 z-50 overflow-hidden border-ink shadow-ink text-left"
          style={{ background: "var(--color-paper)", borderRadius: 22 }}
        >
          {results.slice(0, 8).map((tool) => {
            const cat = getCategoryBySlug(tool.category);
            return (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                onClick={() => { setOpen(false); setQuery(""); }}
                className="flex items-center justify-between px-5 py-3 hover:bg-[color:var(--color-surface-hover)] transition-colors"
              >
                <div className="min-w-0">
                  <span className="text-[15px] font-bold text-[color:var(--color-ink)]">
                    {tool.name}
                  </span>
                  <p className="text-xs text-[color:var(--color-muted)] line-clamp-1 mt-0.5">
                    {tool.description}
                  </p>
                </div>
                {cat && (
                  <span
                    className="shrink-0 ml-3 text-[11px] font-bold border-ink"
                    style={{
                      padding: "3px 10px",
                      borderRadius: 999,
                      background: `var(--color-${cat.color})`,
                      color: "var(--color-ink)",
                    }}
                  >
                    {cat.icon} {cat.name}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
