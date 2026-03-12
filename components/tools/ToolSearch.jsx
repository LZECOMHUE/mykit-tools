"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { searchTools } from "@/lib/search";
import Badge from "@/components/ui/Badge";

export default function ToolSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const r = searchTools(query);
    setResults(r);
    setOpen(r.length > 0 && query.length >= 2);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools..."
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface border border-border rounded-[var(--radius-input)] placeholder:text-text-muted focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-colors"
          onFocus={() => results.length > 0 && setOpen(true)}
        />
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-[var(--radius-card)] shadow-lg overflow-hidden z-50">
          {results.map((tool) => (
            <Link
              key={tool.slug}
              href={`/${tool.slug}`}
              onClick={() => {
                setOpen(false);
                setQuery("");
                onSelect?.();
              }}
              className="flex items-center justify-between px-4 py-3 hover:bg-surface-hover transition-colors"
            >
              <div>
                <span className="text-sm font-medium text-text-primary">
                  {tool.name}
                </span>
                <p className="text-xs text-text-muted line-clamp-1 mt-0.5">
                  {tool.description}
                </p>
              </div>
              <Badge category={tool.category} className="shrink-0 ml-3" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
