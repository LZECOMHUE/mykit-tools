import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MyKitDashboard from "@/components/mykit/MyKitDashboard";

export const metadata = {
  title: "MyKit - Your Tools Dashboard",
  description: "Your personal tool dashboard. Access your favourite tools, purchases, saved projects, and recently used tools in one place.",
};

export default function MyKitPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5">
        <h1 className="font-heading text-3xl font-bold text-text-primary">MyKit</h1>
        <p className="text-text-secondary mt-1 mb-6 text-sm">Your personal tool dashboard</p>
        <MyKitDashboard />
      </main>
      <Footer />
    </>
  );
}
