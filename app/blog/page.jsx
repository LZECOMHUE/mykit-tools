import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Blog | MyKit.tools",
  description:
    "Guides, tips, and how-tos for getting the most out of MyKit.tools. Blog coming soon.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-24 text-center">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text-primary mb-4">
          Blog
        </h1>
        <p className="text-lg text-text-secondary max-w-xl mx-auto mb-8">
          Guides, tips, and how-tos to help you get the most from our tools.
          We are working on our first posts now.
        </p>
        <div className="inline-flex items-center gap-2 px-5 py-3 bg-surface border border-border rounded-full text-sm font-medium text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Coming soon
        </div>
      </main>
      <Footer />
    </>
  );
}
