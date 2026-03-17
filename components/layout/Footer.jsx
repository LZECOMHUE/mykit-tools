import Link from "next/link";
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

  // Split categories into 3 columns
  const colSize = Math.ceil(categories.length / 3);
  const catCol1 = categories.slice(0, colSize);
  const catCol2 = categories.slice(colSize, colSize * 2);
  const catCol3 = categories.slice(colSize * 2);

  return (
    <footer className="bg-surface border-t border-border mt-12">
      {/* Pro nudge strip */}
      <div className="bg-accent-muted border-b border-accent/10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[13px] text-text-secondary text-center sm:text-left">
            <span className="font-medium text-text-primary">MyKit Pro</span>{" "}
            - remove ads, unlock premium exports, and get unlimited AI features.
          </p>
          <Link
            href="/pricing"
            className="text-[13px] font-medium text-accent hover:text-accent-hover transition-colors whitespace-nowrap"
          >
            View plans &rarr;
          </Link>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
          {/* All Categories - spans 3 columns */}
          <div className="col-span-2 md:col-span-3">
            <h3 className="font-heading text-sm font-bold text-text-primary mb-4 uppercase tracking-wide">
              Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="text-[13px] text-text-secondary hover:text-accent transition-colors truncate"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Tools */}
          <div className="col-span-1">
            <h3 className="font-heading text-sm font-bold text-text-primary mb-4 uppercase tracking-wide">
              Popular Tools
            </h3>
            <div className="flex flex-col gap-1.5">
              {POPULAR_TOOLS.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="text-[13px] text-text-secondary hover:text-accent transition-colors"
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-heading text-sm font-bold text-text-primary mb-4 uppercase tracking-wide">
              Resources
            </h3>
            <div className="flex flex-col gap-1.5">
              <Link href="/blog" className="text-[13px] text-text-secondary hover:text-accent transition-colors">
                Blog
              </Link>
              <Link href="/pricing" className="text-[13px] text-text-secondary hover:text-accent transition-colors">
                Pricing
              </Link>
              <Link href="/categories/finance" className="text-[13px] text-text-secondary hover:text-accent transition-colors">
                Finance Tools
              </Link>
              <Link href="/categories/cooking" className="text-[13px] text-text-secondary hover:text-accent transition-colors">
                Cooking Tools
              </Link>
              <Link href="/categories/developer" className="text-[13px] text-text-secondary hover:text-accent transition-colors">
                Developer Tools
              </Link>
              <Link href="/categories/health" className="text-[13px] text-text-secondary hover:text-accent transition-colors">
                Health Tools
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="font-heading text-sm font-bold text-text-primary mb-4 uppercase tracking-wide">
              Company
            </h3>
            <div className="flex flex-col gap-1.5">
              <Link href="/about" className="text-[13px] text-text-secondary hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-[13px] text-text-secondary hover:text-accent transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-[13px] text-text-secondary hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[13px] text-text-secondary hover:text-accent transition-colors">
                Terms of Service
              </Link>
            </div>
            <p className="text-[11px] text-text-muted mt-4 leading-relaxed">
              Built in the UK.
              <br />
              Free to use, no sign-up required.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold font-heading text-text-primary hover:opacity-80 transition-opacity">
            MyKit<span className="text-accent">.tools</span>
          </Link>
          <p className="text-xs text-text-muted">
            &copy; {year} MyKit.tools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
