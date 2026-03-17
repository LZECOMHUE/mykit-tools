import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "MyKit.tools privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://mykit.tools/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
    <Navbar />
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
        Privacy Policy
      </h1>
      <p className="text-sm text-text-muted mb-8">Last updated: 16 March 2026</p>

      <div className="prose-legal space-y-8 text-text-secondary text-[15px] leading-relaxed">
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">1. Who we are</h2>
          <p>
            MyKit.tools ("we", "us", "our") is a trading name operated from the United Kingdom. We provide free and premium online tools, calculators, converters, and generators at mykit.tools (the "Site").
          </p>
          <p className="mt-3">
            If you have any questions about this policy, you can contact us at <a href="mailto:hello@mykit.tools" className="text-accent hover:underline">hello@mykit.tools</a>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">2. What information we collect</h2>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Information you provide directly</h3>
          <p>
            When you create an account via our authentication provider (Clerk), we receive your name, email address, and profile picture from your Google account or the email address you sign up with. We do not store passwords ourselves.
          </p>
          <p className="mt-3">
            When you make a purchase, payment information is handled entirely by Stripe. We receive confirmation of your purchase (product, amount, date) but never see or store your full card details.
          </p>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Information collected automatically</h3>
          <p>
            We use Google Analytics 4 to understand how visitors use the Site. This collects anonymised data such as pages visited, time on site, device type, browser, approximate location (country/city level), and referral source. We have IP anonymisation enabled.
          </p>
          <p className="mt-3">
            We use localStorage in your browser to save your tool preferences, auto-save your work in progress, and remember your MyKit bookmarks and recently used tools. This data stays on your device and is not transmitted to our servers unless you are signed in and using cloud save features.
          </p>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Cookies and similar technologies</h3>
          <p>
            We use essential cookies to keep you signed in and to remember your preferences. Third-party services we use may set their own cookies:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><span className="font-medium text-text-primary">Clerk</span> sets authentication cookies to manage your sign-in session.</li>
            <li><span className="font-medium text-text-primary">Google Analytics</span> sets cookies to distinguish unique visitors and track sessions.</li>
            <li><span className="font-medium text-text-primary">Stripe</span> sets cookies during the checkout process to prevent fraud.</li>
            <li><span className="font-medium text-text-primary">Mediavine</span> (when active) sets cookies to serve relevant advertisements and measure ad performance.</li>
          </ul>
          <p className="mt-3">
            You can control cookies through your browser settings. Disabling cookies may affect your ability to sign in and use certain features.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">3. How we use your information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Provide, maintain, and improve the Site and our tools</li>
            <li>Process purchases and manage your subscription</li>
            <li>Sync your MyKit bookmarks, saved projects, and preferences across devices when you are signed in</li>
            <li>Send transactional emails related to your account or purchases (via Clerk and Stripe)</li>
            <li>Understand usage patterns so we can improve our tools and add new ones</li>
            <li>Detect and prevent fraud or abuse</li>
            <li>Display relevant advertisements (when Mediavine is active)</li>
          </ul>
          <p className="mt-3">
            We do not sell your personal information to third parties. We do not send marketing emails unless you have explicitly opted in.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">4. AI-powered features</h2>
          <p>
            Some tools on the Site use artificial intelligence via the Anthropic API (Claude). When you use an AI-powered feature, the input you provide (such as quiz topics or itinerary preferences) is sent to Anthropic for processing and is subject to <a href="https://www.anthropic.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Anthropic's privacy policy</a>.
          </p>
          <p className="mt-3">
            We do not send your personal account information (name, email, payment details) to AI providers. Only the specific input required to generate your result is transmitted.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">5. Who we share your information with</h2>
          <p>We share information only with the service providers necessary to operate the Site:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><span className="font-medium text-text-primary">Clerk</span> (authentication) - processes your sign-in and stores your account credentials</li>
            <li><span className="font-medium text-text-primary">Stripe</span> (payments) - processes your purchases and manages subscriptions</li>
            <li><span className="font-medium text-text-primary">Vercel</span> (hosting) - hosts the Site and may process server logs containing IP addresses</li>
            <li><span className="font-medium text-text-primary">Google</span> (analytics) - receives anonymised usage data via Google Analytics 4</li>
            <li><span className="font-medium text-text-primary">Anthropic</span> (AI) - receives tool input data when you use AI-powered features</li>
            <li><span className="font-medium text-text-primary">Mediavine</span> (advertising, when active) - serves ads and collects data for ad targeting</li>
          </ul>
          <p className="mt-3">
            Each of these providers operates under their own privacy policies and data processing agreements. We do not share your data with any other third parties except where required by law.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">6. Data retention</h2>
          <p>
            Your account information is retained for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where we are required to retain it for legal or financial record-keeping purposes.
          </p>
          <p className="mt-3">
            localStorage data on your device persists until you clear your browser data or uninstall the relevant browser.
          </p>
          <p className="mt-3">
            Google Analytics data is retained for 14 months before being automatically deleted.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">7. Your rights</h2>
          <p>Under UK data protection law (UK GDPR), you have the right to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><span className="font-medium text-text-primary">Access</span> the personal data we hold about you</li>
            <li><span className="font-medium text-text-primary">Rectify</span> any inaccurate or incomplete data</li>
            <li><span className="font-medium text-text-primary">Erase</span> your personal data ("right to be forgotten")</li>
            <li><span className="font-medium text-text-primary">Restrict</span> processing of your data in certain circumstances</li>
            <li><span className="font-medium text-text-primary">Object</span> to processing based on legitimate interests</li>
            <li><span className="font-medium text-text-primary">Data portability</span> - receive your data in a structured, machine-readable format</li>
            <li><span className="font-medium text-text-primary">Withdraw consent</span> at any time where processing is based on consent</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at <a href="mailto:hello@mykit.tools" className="text-accent hover:underline">hello@mykit.tools</a>. We will respond within 30 days.
          </p>
          <p className="mt-3">
            You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">ico.org.uk</a>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">8. International transfers</h2>
          <p>
            Some of our service providers (Vercel, Stripe, Anthropic, Google) may process data outside the UK. Where this happens, we ensure appropriate safeguards are in place, including Standard Contractual Clauses or equivalent mechanisms approved under UK data protection law.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">9. Children's privacy</h2>
          <p>
            The Site is not directed at children under 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal data, please contact us and we will delete it promptly.
          </p>
          <p className="mt-3">
            Some of our tools are designed for use by children (such as educational worksheets and kids activity generators), but these tools work entirely in the browser without collecting personal information. Any tool use by children should be supervised by a parent or guardian.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">10. Security</h2>
          <p>
            We take reasonable measures to protect your information. All data transmitted between your browser and our servers is encrypted using TLS (HTTPS). Authentication is handled by Clerk, a dedicated identity provider with enterprise-grade security. Payment processing is handled by Stripe, which is PCI DSS Level 1 certified.
          </p>
          <p className="mt-3">
            No method of transmission or storage is 100% secure. If you discover a security vulnerability, please report it to <a href="mailto:hello@mykit.tools" className="text-accent hover:underline">hello@mykit.tools</a>.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">11. Changes to this policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of significant changes by posting a notice on the Site or, where appropriate, by email. The "Last updated" date at the top of this page indicates when the policy was last revised.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">12. Contact us</h2>
          <p>
            If you have any questions about this privacy policy or how we handle your data, please contact us at <a href="mailto:hello@mykit.tools" className="text-accent hover:underline">hello@mykit.tools</a>.
          </p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
}
