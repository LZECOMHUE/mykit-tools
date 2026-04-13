import Link from "next/link";
import Badge from "@/components/ui/Badge";

export default function ToolCard({ tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex flex-col bg-white rounded-xl border border-border/60 hover:border-accent/30 hover:shadow-md px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5"
    >
      <h3 className="font-heading font-bold text-[15px] leading-snug text-text-primary group-hover:text-accent transition-colors mb-1">
        {tool.name}
      </h3>
      <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-2.5 flex-1">
        {tool.description}
      </p>
      <Badge category={tool.category} className="shrink-0 self-start" />
    </Link>
  );
}
