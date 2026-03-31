import Link from "next/link";
import Badge from "@/components/ui/Badge";

export default function ToolCard({ tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group block bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(46,47,44,0.06)] border border-border/50 p-6 max-sm:p-4 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-heading font-extrabold text-lg tracking-tight text-text-primary group-hover:text-accent transition-colors">
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
