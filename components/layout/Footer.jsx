import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Footer() {
  const year = new Date().getFullYear();

  // Show first 8 categories in footer
  const footerCategories = categories.slice(0, 8);

  return (
    <footer className="bg-surface border-t border-border mt-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Categories */}
          <div className="col-span-2">
            <h3 className="font-heading text-base font-bold text-text-primary mb-4">
              Categories
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {footerCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="text-sm text-text-secondary hover:text-accent transition-colors"
                >
                  {cat.icon} {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="font-heading text-base font-bold text-text-primary mb-4">
              Popular Tools
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/uk-tax-calculator" className="text-sm text-text-secondary hover:text-accent transition-colors">
                UK Tax Calculator
              </Link>
              <Link href="/kg-to-lbs" className="text-sm text-text-secondary hover:text-accent transition-colors">
                Kg to Lbs
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-heading text-base font-bold text-text-primary mb-4">
              Company
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/pricing" className="text-sm text-text-secondary hover:text-accent transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="text-sm text-text-secondary hover:text-accent transition-colors">
                Blog
              </Link>
              <span className="text-sm text-text-muted">Privacy Policy</span>
              <span className="text-sm text-text-muted">Terms of Service</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xl font-bold font-heading text-text-primary">
            MyKit<span className="text-accent">.tools</span>
          </span>
          <p className="text-sm text-text-muted">
            &copy; {year} MyKit.tools. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
