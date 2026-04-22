"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import ToolCard from "./ToolCard";

function formatTag(tag) {
  return tag.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function CategoryBrowser({
  allTools,
  featuredTools,
  filterTags,
  categoryName,
  cat,
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [activeSection, setActiveSection] = useState(null);
  const sectionRefs = useRef({});
  const navRef = useRef(null);

  const sortTools = (tools) => {
    const sorted = [...tools];
    if (sortBy === "a-z") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === "newest") sorted.sort((a, b) => (b.dateAdded || "").localeCompare(a.dateAdded || ""));
    else sorted.sort((a, b) => { if (a.tier !== b.tier) return a.tier - b.tier; return a.name.localeCompare(b.name); });
    return sorted;
  };

  const searchFiltered = useMemo(() => {
    if (!search.trim()) return allTools;
    const q = search.toLowerCase().trim();
    return allTools.filter(
      (t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [allTools, search]);

  const sections = useMemo(() => {
    if (filterTags.length === 0 || search.trim()) return null;
    const assigned = new Set();
    const groups = filterTags.map((tag) => {
      const tools = searchFiltered.filter((t) => t.tags.includes(tag));
      tools.forEach((t) => assigned.add(t.slug));
      return { tag, label: formatTag(tag), tools: sortTools(tools) };
    }).filter((g) => g.tools.length > 0);
    const other = searchFiltered.filter((t) => !assigned.has(t.slug));
    if (other.length > 0) groups.push({ tag: '_other', label: 'Other', tools: sortTools(other) });
    return groups;
  }, [filterTags, searchFiltered, sortBy]);

  const flatList = useMemo(() => sortTools(searchFiltered), [searchFiltered, sortBy]);
  const showSections = sections && !search.trim();

  useEffect(() => {
    if (!showSections || !sections) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.dataset.section);
        }
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [showSections, sections]);

  const scrollToSection = (tag) => {
    const el = sectionRefs.current[tag];
    if (el) {
      const navbarHeight = 74;
      const jumpNavHeight = navRef.current?.offsetHeight || 44;
      const y = el.getBoundingClientRect().top + window.scrollY - navbarHeight - jumpNavHeight - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
      {showSections && sections.length > 1 && (
        <aside className="w-full md:w-56 lg:w-64 shrink-0">
          <div className="sticky top-24">
            <nav ref={navRef} className="space-y-1 mb-6 max-md:flex max-md:overflow-x-auto max-md:pb-4 max-md:space-y-0 max-md:gap-2 max-md:-mx-4 max-md:px-4 hide-scrollbar">
              <div className="px-3 py-2 text-[10px] uppercase tracking-widest font-[800] text-[color:var(--color-muted)] hidden md:block">
                Subcategories
              </div>
              {sections.map((s) => {
                const active = activeSection === s.tag;
                return (
                  <button
                    key={s.tag}
                    onClick={() => scrollToSection(s.tag)}
                    className="flex items-center justify-between group whitespace-nowrap shrink-0 w-full text-left press-scale"
                    style={{
                      padding: "10px 14px",
                      borderRadius: 14,
                      background: active ? "var(--color-paper)" : "transparent",
                      border: active ? "1.5px solid var(--color-ink)" : "1.5px solid transparent",
                      boxShadow: active ? "2px 2px 0 var(--color-ink)" : "none",
                      color: "var(--color-ink)",
                      fontWeight: active ? 700 : 600,
                      fontSize: 14,
                    }}
                  >
                    <span>{s.label}</span>
                    <span
                      className="hidden md:inline-block font-bold ml-2 text-[10px]"
                      style={{
                        padding: "2px 8px",
                        borderRadius: 999,
                        background: active ? `var(--color-${cat.color})` : "var(--color-surface-hover)",
                        color: "var(--color-ink)",
                      }}
                    >
                      {s.tools.length}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>
      )}

      <div className="flex-1 min-w-0">
        {/* Search + sort */}
        <div className="flex flex-col sm:flex-row gap-2 mb-5">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[color:var(--color-muted)]" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${categoryName} tools…`}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-semibold bg-[color:var(--color-paper)] border-ink rounded-full placeholder:text-[color:var(--color-muted)] focus:ring-2 focus:ring-[color:var(--color-accent)]/20 outline-none transition-colors"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 text-sm font-semibold bg-[color:var(--color-paper)] border-ink rounded-full outline-none cursor-pointer"
          >
            <option value="featured">Featured first</option>
            <option value="a-z">A to Z</option>
            <option value="newest">Newest first</option>
          </select>
        </div>

        {search.trim() && (
          <p className="text-sm font-medium text-[color:var(--color-muted)] mb-4">
            {flatList.length} {flatList.length === 1 ? "tool" : "tools"} found
            <button onClick={() => setSearch("")} className="ml-2 text-[color:var(--color-accent)] text-xs font-bold hover:underline">Clear</button>
          </p>
        )}

        {showSections ? (
          <div className="space-y-8">
            {sections.map((section) => (
              <div
                key={section.tag}
                ref={(el) => { sectionRefs.current[section.tag] = el; }}
                data-section={section.tag}
              >
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-[20px] font-[800] tracking-[-0.01em] text-[color:var(--color-ink)] m-0">
                    {section.label}
                  </h2>
                  <span
                    className="text-xs font-bold"
                    style={{
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: `var(--color-${cat.color})`,
                      border: "1.5px solid var(--color-ink)",
                    }}
                  >
                    {section.tools.length}
                  </span>
                  <div className="flex-1 h-px bg-[color:var(--color-border)]" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {section.tools.map((tool, i) => (
                    <ToolCard key={tool.slug} tool={tool} featured={i === 0 && section === sections[0]} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : flatList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {flatList.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div
            className="border-ink text-center"
            style={{
              background: "var(--color-paper)",
              borderRadius: 22,
              padding: 32,
            }}
          >
            <p className="text-[color:var(--color-muted)] font-medium mb-2">No tools match your search.</p>
            <button onClick={() => setSearch("")} className="text-sm text-[color:var(--color-accent)] font-bold hover:underline">
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
