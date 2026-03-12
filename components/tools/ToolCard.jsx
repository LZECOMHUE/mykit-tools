import Link from "next/link";
import Badge from "@/components/ui/Badge";

export default function ToolCard({ tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group block bg-white border border-border rounded-[var(--radius-card)] p-6 max-sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border-hover"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-heading text-base font-bold text-text-primary group-hover:text-accent transition-colors">
          {tool.name}
        </h3>
        <Badge category={tool.category} className="shrink-0" />
      </div>
      <p className="text-sm text-text-secondary line-clamp-2">
        {tool.description}
      </p>
    </Link>
  );
}
