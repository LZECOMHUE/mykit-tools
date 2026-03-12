import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ToolsLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5">
        {children}
      </main>
      <Footer />
    </>
  );
}
