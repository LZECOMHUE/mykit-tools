// Placeholder component — each tool will provide its own SEO content.
// This component wraps it with consistent styling.

export default function SEOContent({ children }) {
  if (!children) return null;

  return (
    <section className="mt-12 max-w-[800px] prose prose-sm text-text-secondary">
      <div className="space-y-4 text-sm leading-relaxed">{children}</div>
    </section>
  );
}
