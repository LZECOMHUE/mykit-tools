import BookmarkButton from "@/components/mykit/BookmarkButton";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

// Direction B tool page header — breadcrumbs with tinted category pill,
// large heading, description, and action pills on the right.
export default function ToolPageHeader({ tool }) {
  return (
    <>
      <Breadcrumbs tool={tool} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-7">
        <div className="flex-1 min-w-0">
          <h1
            className="m-0 text-[color:var(--color-ink)] text-balance"
            style={{
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            {tool.name}
          </h1>
          <p
            className="mt-3.5 mb-0 text-pretty text-[color:var(--color-muted)]"
            style={{ fontSize: 16, lineHeight: 1.5, maxWidth: 620, fontWeight: 500 }}
          >
            {tool.description}
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <BookmarkButton slug={tool.slug} />
        </div>
      </div>
    </>
  );
}
