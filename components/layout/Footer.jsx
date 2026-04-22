import Link from "next/link";
import LogoChip from "@/components/design/LogoChip";
import { categories } from "@/lib/categories";

const POPULAR_TOOLS = [
  { slug: "uk-tax-calculator", name: "UK Tax Calculator" },
  { slug: "bmi-calculator", name: "BMI Calculator" },
  { slug: "word-counter", name: "Word Counter" },
  { slug: "kg-to-lbs", name: "Kg to Lbs" },
  { slug: "percentage-calculator", name: "Percentage Calculator" },
  { slug: "password-generator", name: "Password Generator" },
  { slug: "json-formatter", name: "JSON Formatter" },
  { slug: "cups-to-grams", name: "Cups to Grams" },
  { slug: "colour-picker", name: "Colour Picker" },
  { slug: "mortgage-calculator", name: "Mortgage Calculator" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 pb-8">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-10">
        {/* Pro nudge card */}
        <div
          className="border-ink shadow-ink relative overflow-hidden mb-10"
          style={{
            background: "var(--color-yellow)",
            borderRadius: 28,
            padding: "28px 32px",
          }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              top: -40, right: -40, width: 180, height: 180,
              borderRadius: "50%", background: "rgba(255,255,255,0.4)",
            }}
          />
          <div className="relative flex flex-col sm:flex-row items-center gap-4 justify-between">
            <div>
              <div className="text-[22px] font-[800] tracking-[-0.02em] text-[color:var(--color-ink)] mb-1">
                MyKit Pro — everything unlocked ✨
              </div>
              <p className="text-[14px] text-[color:var(--color-ink)] opacity-80 font-medium">
                No ads, unlimited premium exports, all AI features. £6.99/mo or £49.99/yr.
              </p>
            </div>
            <Link
              href="/pricing"
              className="border-ink shadow-ink-sm press-scale whitespace-nowrap"
              style={{
                padding: "12px 22px",
                borderRadius: 999,
                background: "var(--color-ink)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              View plans →
            </Link>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          <div className="col-span-2 md:col-span-3">
            <h3 className="text-[13px] font-[800] mb-4 uppercase tracking-wider text-[color:var(--color-ink)]">
              Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors truncate"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-[13px] font-[800] mb-4 uppercase tracking-wider text-[color:var(--color-ink)]">
              Popular
            </h3>
            <div className="flex flex-col gap-1.5">
              {POPULAR_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-[13px] font-[800] mb-4 uppercase tracking-wider text-[color:var(--color-ink)]">
              Resources
            </h3>
            <div className="flex flex-col gap-1.5">
              <Link href="/blog" className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors">Blog</Link>
              <Link href="/pricing" className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors">Pricing</Link>
              <Link href="/categories/finance" className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors">Finance</Link>
              <Link href="/categories/cooking" className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors">Cooking</Link>
              <Link href="/categories/developer" className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors">Developer</Link>
              <Link href="/categories/health" className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors">Health</Link>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="text-[13px] font-[800] mb-4 uppercase tracking-wider text-[color:var(--color-ink)]">
              Company
            </h3>
            <div className="flex flex-col gap-1.5">
              <Link href="/about" className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors">About</Link>
              <Link href="/contact" className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors">Contact</Link>
              <Link href="/privacy" className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors">Privacy</Link>
              <Link href="/terms" className="text-[13px] font-medium text-[color:var(--color-muted)] hover:text-[color:var(--color-accent)] transition-colors">Terms</Link>
            </div>
            <p className="text-[11px] text-[color:var(--color-muted)] mt-4 leading-relaxed font-medium">
              Built in the UK.<br />
              Free to use, no sign-up required.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[color:var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 press-scale">
            <LogoChip size={28} />
            <span className="font-bold text-[15px] text-[color:var(--color-ink)]">mykit.tools</span>
          </Link>
          <p className="text-xs font-medium text-[color:var(--color-muted)]">
            &copy; {year} MyKit.tools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
