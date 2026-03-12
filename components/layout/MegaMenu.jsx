"use client";

import Link from "next/link";
import { categories } from "@/lib/categories";
import { getCategoryCounts } from "@/lib/tool-registry";

export default function MegaMenu({ onClose }) {
  const counts = getCategoryCounts();

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute left-0 right-0 z-40 bg-white border-b border-border shadow-lg">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-[var(--radius-input)] hover:bg-surface-hover transition-colors"
              >
                <span className="text-xl">{cat.icon}</span>
                <div>
                  <span className="text-sm font-medium text-text-primary">
                    {cat.name}
                  </span>
                  <span className="text-xs text-text-muted ml-1.5">
                    ({counts[cat.slug] || 0})
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
