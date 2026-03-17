import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the MyKit.tools team. Report bugs, request new tools, or ask about MyKit Pro.",
  alternates: {
    canonical: "https://mykit.tools/contact",
  },
};

export default function ContactPage() {
  return (
    <>
    <Navbar />
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
        Contact Us
      </h1>
      <p className="text-text-secondary text-[15px] mb-10">
        We read every message. Most enquiries get a reply within 24 hours on
        weekdays.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        {/* General */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-2xl mb-3">&#x2709;&#xFE0F;</p>
          <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
            General enquiries
          </h2>
          <p className="text-[14px] text-text-secondary mb-4">
            Questions about the site, partnership proposals, or just want to say
            hello.
          </p>
          <a
            href="mailto:hello@mykit.tools"
            className="text-[14px] font-medium text-accent hover:underline"
          >
            hello@mykit.tools
          </a>
        </div>

        {/* Bug reports */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-2xl mb-3">&#x1F41B;</p>
          <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
            Report a bug
          </h2>
          <p className="text-[14px] text-text-secondary mb-4">
            Found something broken? Let us know which tool, what you expected to
            happen, and what actually happened.
          </p>
          <a
            href="mailto:bugs@mykit.tools"
            className="text-[14px] font-medium text-accent hover:underline"
          >
            bugs@mykit.tools
          </a>
        </div>

        {/* Tool requests */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-2xl mb-3">&#x1F4A1;</p>
          <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
            Request a tool
          </h2>
          <p className="text-[14px] text-text-secondary mb-4">
            Got an idea for a tool you wish existed? We prioritise requests that
            would help lots of people.
          </p>
          <a
            href="mailto:ideas@mykit.tools"
            className="text-[14px] font-medium text-accent hover:underline"
          >
            ideas@mykit.tools
          </a>
        </div>

        {/* Pro & billing */}
        <div className="bg-white border border-border rounded-[var(--radius-card)] p-6">
          <p className="text-2xl mb-3">&#x1F4B3;</p>
          <h2 className="font-heading text-lg font-bold text-text-primary mb-2">
            Pro &amp; billing
          </h2>
          <p className="text-[14px] text-text-secondary mb-4">
            Questions about your MyKit Pro subscription, downloads, or payments.
          </p>
          <a
            href="mailto:support@mykit.tools"
            className="text-[14px] font-medium text-accent hover:underline"
          >
            support@mykit.tools
          </a>
        </div>
      </div>

      {/* FAQ-style section */}
      <div className="space-y-6 text-[15px] text-text-secondary leading-relaxed">
        <h2 className="font-heading text-xl font-bold text-text-primary">
          Common questions
        </h2>

        <div>
          <h3 className="font-medium text-text-primary mb-1">
            Is MyKit.tools really free?
          </h3>
          <p>
            Yes. Every tool works completely free with no account required.
            Premium features like PDF exports and AI generation are available
            through{" "}
            <Link href="/pricing" className="text-accent hover:underline">
              MyKit Pro
            </Link>
            , but core functionality is always free.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-text-primary mb-1">
            Where is my data stored?
          </h3>
          <p>
            Most tools run entirely in your browser. Nothing is sent to our
            servers unless you use an AI feature or cloud save. See our{" "}
            <Link href="/privacy" className="text-accent hover:underline">
              privacy policy
            </Link>{" "}
            for full details.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-text-primary mb-1">
            Can I use the tools for commercial purposes?
          </h3>
          <p>
            Yes. The outputs you generate (PDFs, calculations, generated content)
            are yours to use however you like, including commercially.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-text-primary mb-1">
            How do I cancel my Pro subscription?
          </h3>
          <p>
            You can cancel any time from your{" "}
            <Link href="/account" className="text-accent hover:underline">
              account page
            </Link>
            . Your access continues until the end of the current billing period.
            No cancellation fees.
          </p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
