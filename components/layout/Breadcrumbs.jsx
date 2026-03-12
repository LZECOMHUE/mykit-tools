import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";

/**
 * Breadcrumbs component with semantic HTML and aria labels
 * Improves SEO and accessibility, helps AI crawlers understand page hierarchy
 */
export default function Breadcrumbs({ tool }) {
  const category = tool ? getCategoryBySlug(tool.category) : null;

  // Build breadcrumb items for structured navigation
  const breadcrumbItems = [
    { name: "Home", url: "/" },
  ];

  if (category) {
    breadcrumbItems.push({
      name: category.name,
      url: `/categories/${category.slug}`,
    });
  }

  if (tool) {
    breadcrumbItems.push({
      name: tool.name,
      url: `https://mykit.tools/${tool.slug}`,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-text-muted mb-4">
      {/* Semantic ol for breadcrumb trail */}
      <ol className="flex items-center gap-1.5 flex-wrap">
        {breadcrumbItems.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            {/* Separator between items (hidden from screen readers) */}
            {idx > 0 && (
              <span aria-hidden="true" className="text-text-muted">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            )}

            {/* Breadcrumb item */}
            {idx === breadcrumbItems.length - 1 ? (
              /* Last item is current page (not clickable) */
              <span
                className="text-text-primary font-medium"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              /* Intermediate items are links */
              <Link
                href={item.url}
                className="hover:text-accent transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
