import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { tools } from "@/lib/tool-registry";
import { categories } from "@/lib/categories";

export const metadata = {
  title: "About MyKit.tools",
  description:
    "MyKit.tools is a free collection of online calculators, converters, and generators. Built in the UK, used worldwide.",
  alternates: {
    canonical: "https://mykit.tools/about",
  },
};

export default function AboutPage() {
  const toolCount = tools.length;
  const categoryCount = categories.length;

  return (
    <>
    <Navbar />
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl font-bold text-text-primary mb-6">
        About MyKit.tools
      </h1>

      <div className="space-y-6 text-[15px] text-text-secondary leading-relaxed">
        <p>
          MyKit.tools is a growing collection of{" "}
          <span className="font-medium text-text-primary">{toolCount} free online tools</span>{" "}
          across {categoryCount} categories. Every tool works instantly in your
          browser with no sign-up, no installation, and no data leaving your
          device.
        </p>

        <p>
          The site started in late 2025 with a simple goal: build the tools
          people actually search for, and make them genuinely good. Not the
          kind of tool that looks like it was built in 2008 and buried in
          pop-ups, but something you would actually bookmark.
        </p>

        <h2 className="font-heading text-xl font-bold text-text-primary pt-2">
          What we build
        </h2>

        <p>
          We cover everything from{" "}
          <Link href="/categories/finance" className="text-accent hover:underline">
            tax and finance calculators
          </Link>{" "}
          to{" "}
          <Link href="/categories/cooking" className="text-accent hover:underline">
            cooking converters
          </Link>
          ,{" "}
          <Link href="/categories/creative" className="text-accent hover:underline">
            creative and design tools
          </Link>
          ,{" "}
          <Link href="/categories/games" className="text-accent hover:underline">
            party game generators
          </Link>
          , and{" "}
          <Link href="/categories/developer" className="text-accent hover:underline">
            developer utilities
          </Link>
          . Tools range from quick unit converters that take seconds to use, to
          complex interactive planners you can spend an afternoon with.
        </p>

        <h2 className="font-heading text-xl font-bold text-text-primary pt-2">
          Free to use, always
        </h2>

        <p>
          Every tool on the site is completely free. You do not need an account.
          Premium features like high-resolution PDF exports and AI-powered
          generation are available through{" "}
          <Link href="/pricing" className="text-accent hover:underline">
            MyKit Pro
          </Link>
          , but the core functionality of every tool is free and will stay that
          way.
        </p>

        <h2 className="font-heading text-xl font-bold text-text-primary pt-2">
          Built in the UK
        </h2>

        <p>
          MyKit.tools is built and maintained in the United Kingdom. Finance
          tools use HMRC rates and UK tax years. Cooking tools default to metric
          with imperial options. But the vast majority of tools work for anyone,
          anywhere.
        </p>

        <h2 className="font-heading text-xl font-bold text-text-primary pt-2">
          Privacy first
        </h2>

        <p>
          Most tools run entirely in your browser. Your inputs are not sent to a
          server, not logged, and not shared. For tools that use AI features, we
          send the minimum data needed and do not store it afterwards. You can
          read the full details in our{" "}
          <Link href="/privacy" className="text-accent hover:underline">
            privacy policy
          </Link>
          .
        </p>

        <h2 className="font-heading text-xl font-bold text-text-primary pt-2">
          Get in touch
        </h2>

        <p>
          Got a tool request, found a bug, or want to say hello? Drop us a line
          on the{" "}
          <Link href="/contact" className="text-accent hover:underline">
            contact page
          </Link>{" "}
          or email{" "}
          <a
            href="mailto:hello@mykit.tools"
            className="text-accent hover:underline"
          >
            hello@mykit.tools
          </a>
          .
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
}
