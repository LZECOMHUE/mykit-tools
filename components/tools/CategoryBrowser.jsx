"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

/* ── Helpers ─────────────────────────────────────────── */

function formatTag(tag) {
  // Turn kebab-case tags into readable labels
  return tag
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ── Featured Tool Card (larger, more prominent) ────── */

function FeaturedToolCard({ tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group block bg-white border border-border rounded-[var(--radius-card)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-accent/30"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors">
          {tool.name}
        </h3>
        {tool.tier === 1 && (
          <span className="shrink-0 text-xs font-medium text-accent-warm bg-accent-warm/10 px-2 py-0.5 rounded-full">
            Popular
          </span>
        )}
      </div>
      <p className="text-sm text-text-secondary line-clamp-3 mb-3">
        {tool.description}
      </p>
      <span className="text-xs font-medium text-accent group-hover:underline">
        Open tool →
      </span>
    </Link>
  );
}

/* ── Regular Tool Row (compact for the full list) ───── */

function ToolListItem({ tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex items-center gap-4 bg-white border border-border rounded-lg px-4 py-3 transition-all duration-200 hover:border-accent/30 hover:shadow-sm"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate">
          {tool.name}
        </h3>
        <p className="text-xs text-text-secondary truncate mt-0.5">
          {tool.description}
        </p>
      </div>
      <span className="shrink-0 text-xs text-text-muted">→</span>
    </Link>
  );
}

/* ── Grid Card (standard for grid view) ─────────────── */

function ToolGridCard({ tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group block bg-white border border-border rounded-[var(--radius-card)] p-5 max-sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border-hover"
    >
      <h3 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors mb-1.5">
        {tool.name}
      </h3>
      <p className="text-xs text-text-secondary line-clamp-2">
        {tool.description}
      </p>
    </Link>
  );
}

/* ── Main Component ─────────────────────────────────── */

export default function CategoryBrowser({
  allTools,
  featuredTools,
  filterTags,
  categoryName,
}) {
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [sortBy, setSortBy] = useState("featured"); // featured | a-z | newest
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  // Toggle a filter tag on or off
  function toggleTag(tag) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  // Clear all filters
  function clearFilters() {
    setSearch("");
    setActiveTags([]);
  }

  // Filter and sort the full tool list
  const filteredTools = useMemo(() => {
    let result = [...allTools];

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Tag filter (AND logic: tool must have ALL selected tags)
    if (activeTags.length > 0) {
      result = result.filter((t) =>
        activeTags.every((tag) => t.tags.includes(tag))
      );
    }

    // Sort
    if (sortBy === "a-z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "newest") {
      result.sort((a, b) =>
        (b.dateAdded || "").localeCompare(a.dateAdded || "")
      );
    } else {
      // "featured" sort: tier 1 first, then 2, then 3, then alphabetical
      result.sort((a, b) => {
        if (a.tier !== b.tier) return a.tier - b.tier;
        return a.name.localeCompare(b.name);
      });
    }

    return result;
  }, [allTools, search, activeTags, sortBy]);

  const hasActiveFilters = search.trim() || activeTags.length > 0;
  const featuredSlugs = new Set(featuredTools.map((t) => t.slug));
  const showFeatured = !hasActiveFilters && sortBy === "featured";

  // For the "All tools" section, exclude featured if they're shown separately
  const remainingTools = showFeatured
    ? filteredTools.filter((t) => !featuredSlugs.has(t.slug))
    : filteredTools;

  return (
    <div>
      {/* ── Search + Controls Bar ────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${categoryName} tools...`}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-border rounded-lg outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2.5 text-sm bg-white border border-border rounded-lg outline-none focus:border-accent cursor-pointer"
        >
          <option value="featured">Featured first</option>
          <option value="a-z">A to Z</option>
          <option value="newest">Newest first</option>
        </select>

        {/* View toggle (desktop only) */}
        <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-2.5 text-sm transition-colors ${
              viewMode === "grid"
                ? "bg-accent text-white"
                : "bg-white text-text-secondary hover:bg-surface"
            }`}
            aria-label="Grid view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-2.5 text-sm transition-colors ${
              viewMode === "list"
                ? "bg-accent text-white"
                : "bg-white text-text-secondary hover:bg-surface"
            }`}
            aria-label="List view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <rect x="1" y="1" width="14" height="3" rx="1" />
              <rect x="1" y="6.5" width="14" height="3" rx="1" />
              <rect x="1" y="12" width="14" height="3" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Filter Tags ──────────────────────────── */}
      {filterTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {filterTags.map((tag) => {
            const isActive = activeTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  isActive
                    ? "bg-accent text-white border-accent"
                    : "bg-white text-text-secondary border-border hover:border-accent/40 hover:text-accent"
                }`}
              >
                {formatTag(tag)}
              </button>
            );
          })}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-xs font-medium rounded-full text-error hover:bg-error/5 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* ── Results Count ────────────────────────── */}
      {hasActiveFilters && (
        <p className="text-sm text-text-muted mb-4">
          {filteredTools.length}{" "}
          {filteredTools.length === 1 ? "tool" : "tools"} found
        </p>
      )}

      {/* ── Featured Section ─────────────────────── */}
      {showFeatured && featuredTools.length > 0 && (
        <div className="mb-10">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            Top {categoryName} Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool) => (
              <FeaturedToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      )}

      {/* ── All Tools ────────────────────────────── */}
      {remainingTools.length > 0 && (
        <div>
          {showFeatured && (
            <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
              All {categoryName} Tools
            </h2>
          )}

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {remainingTools.map((tool) => (
                <ToolGridCard key={tool.slug} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {remainingTools.map((tool) => (
                <ToolListItem key={tool.slug} tool={tool} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Empty State ──────────────────────────── */}
      {filteredTools.length === 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-8 text-center">
          <p className="text-text-secondary mb-2">
            No tools match your search.
          </p>
          <button
            onClick={clearFilters}
            className="text-sm text-accent font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
