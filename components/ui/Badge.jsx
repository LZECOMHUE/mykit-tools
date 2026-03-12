import { getCategoryBySlug } from "@/lib/categories";

const colorMap = {
  "cat-finance": "bg-cat-finance text-blue-800",
  "cat-cooking": "bg-cat-cooking text-orange-800",
  "cat-games": "bg-cat-games text-pink-800",
  "cat-developer": "bg-cat-developer text-indigo-800",
  "cat-text": "bg-cat-text text-purple-800",
  "cat-converters": "bg-cat-converters text-green-800",
  "cat-health": "bg-cat-health text-teal-800",
  "cat-wedding": "bg-cat-wedding text-rose-800",
  "cat-education": "bg-cat-education text-yellow-800",
  "cat-home": "bg-cat-home text-orange-800",
  "cat-business": "bg-cat-business text-sky-800",
  "cat-travel": "bg-cat-travel text-cyan-800",
  "cat-datetime": "bg-cat-datetime text-violet-800",
  "cat-maths": "bg-cat-maths text-emerald-800",
  "cat-creative": "bg-cat-creative text-pink-800",
  "cat-parenting": "bg-cat-parenting text-lime-800",
  "cat-automotive": "bg-cat-automotive text-slate-700",
  "cat-seasonal": "bg-cat-seasonal text-red-800",
  "cat-fun": "bg-cat-fun text-yellow-800",
};

export default function Badge({ category, label, className = "" }) {
  if (category) {
    const cat = getCategoryBySlug(category);
    if (!cat) return null;
    const colors = colorMap[cat.color] || "bg-surface text-text-secondary";
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-[var(--radius-badge)] ${colors} ${className}`}
      >
        {cat.icon} {cat.name}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-[var(--radius-badge)] bg-surface text-text-secondary ${className}`}
    >
      {label}
    </span>
  );
}
