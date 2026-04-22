import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";

// Direction B breadcrumbs — muted text with chevron separators, category as a
// tinted pill chip. Preserves semantic <nav><ol> for SEO/a11y.
export default function Breadcrumbs({ tool }) {
  const category = tool ? getCategoryBySlug(tool.category) : null;

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex items-center gap-1.5 flex-wrap text-[13px] font-semibold text-[color:var(--color-muted)]">
        <li className="flex items-center gap-1.5">
          <Link href="/" className="hover:text-[color:var(--color-ink)] transition-colors">
            Tools
          </Link>
        </li>

        {category && (
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="text-[color:var(--color-subtle)]">›</span>
            <Link
              href={`/categories/${category.slug}`}
              className="inline-flex items-center gap-1 text-[color:var(--color-ink)] font-bold press-scale"
              style={{
                background: `var(--color-${category.color})`,
                padding: "2px 10px",
                borderRadius: 999,
              }}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          </li>
        )}

        {tool && (
          <li className="flex items-center gap-1.5">
            <span aria-hidden className="text-[color:var(--color-subtle)]">›</span>
            <span className="text-[color:var(--color-ink)] font-bold" aria-current="page">
              {tool.name}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}
