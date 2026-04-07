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

  // Track which section is in view
  useEffect(() => {
    if (!showSections || !sections) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.dataset.section);
          }
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
      const navbarHeight = 64; // h-16 = 64px
      const jumpNavHeight = navRef.current?.offsetHeight || 44;
      const y = el.getBoundingClientRect().top + window.scrollY - navbarHeight - jumpNavHeight - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Search + sort */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${categoryName} tools...`}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-border rounded-lg outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
          />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 text-sm bg-white border border-border rounded-lg outline-none focus:border-accent cursor-pointer">
          <option value="featured">Featured first</option>
          <option value="a-z">A to Z</option>
          <option value="newest">Newest first</option>
        </select>
      </div>

      {/* Sticky jump-nav */}
      {showSections && sections.length > 1 && (
        <div ref={navRef} className="sticky top-16 z-20 bg-background/95 backdrop-blur-sm border-b border-border -mx-4 px-4 sm:-mx-6 sm:px-6 mb-5">
          <div className="flex flex-wrap gap-1 py-2">
            {sections.map((s) => (
              <button
                key={s.tag}
                onClick={() => scrollToSection(s.tag)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeSection === s.tag
                    ? 'bg-accent text-white shadow-sm'
                    : 'bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                }`}
              >
                {s.label}
                <span className="ml-1 font-mono text-[10px] opacity-70">{s.tools.length}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search results count */}
      {search.trim() && (
        <p className="text-sm text-text-muted mb-3">
          {flatList.length} {flatList.length === 1 ? "tool" : "tools"} found
          <button onClick={() => setSearch("")} className="ml-2 text-accent text-xs hover:underline">Clear</button>
        </p>
      )}

      {/* Grouped sections */}
      {showSections ? (
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.tag}
              ref={(el) => { sectionRefs.current[section.tag] = el; }}
              data-section={section.tag}
            >
              <div className="flex items-center gap-3 mb-3">
                <h2 className="font-heading text-lg font-bold text-text-primary">
                  {section.label}
                </h2>
                <span className="text-xs font-mono text-text-muted bg-surface px-2 py-0.5 rounded-full">
                  {section.tools.length}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {section.tools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        flatList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {flatList.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-xl p-8 text-center">
            <p className="text-text-secondary mb-2">No tools match your search.</p>
            <button onClick={() => setSearch("")} className="text-sm text-accent font-medium hover:underline">Clear search</button>
          </div>
        )
      )}
    </div>
  );
}
