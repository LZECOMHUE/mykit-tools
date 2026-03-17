import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms of Service",
  description: "MyKit.tools terms of service. The rules and conditions for using our free and premium online tools.",
  alternates: {
    canonical: "https://mykit.tools/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
    <Navbar />
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">
        Terms of Service
      </h1>
      <p className="text-sm text-text-muted mb-8">Last updated: 16 March 2026</p>

      <div className="prose-legal space-y-8 text-text-secondary text-[15px] leading-relaxed">
        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">1. Introduction</h2>
          <p>
            These terms of service ("Terms") govern your use of the MyKit.tools website at mykit.tools (the "Site") and all tools, features, and services available through it (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms.
          </p>
          <p className="mt-3">
            The Service is operated from the United Kingdom. If you do not agree to these Terms, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">2. The Service</h2>
          <p>
            MyKit.tools provides free and premium online tools including calculators, converters, generators, planners, and other interactive utilities. All tools are available for free use in the browser. Premium features (such as watermark-free PDF downloads, AI-powered features, and cloud saving) may require a one-time purchase or subscription.
          </p>
          <p className="mt-3">
            We reserve the right to modify, suspend, or discontinue any part of the Service at any time without prior notice. We will make reasonable efforts to notify users of significant changes.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">3. Accounts</h2>
          <p>
            You may use most tools on the Site without creating an account. Certain features (MyKit bookmarks, cloud saving, purchase history) require you to sign in via our authentication provider, Clerk.
          </p>
          <p className="mt-3">
            When you create an account, you agree to provide accurate information and to keep your account secure. You are responsible for all activity that occurs under your account. If you suspect unauthorised access, please contact us immediately at <a href="mailto:hello@mykit.tools" className="text-accent hover:underline">hello@mykit.tools</a>.
          </p>
          <p className="mt-3">
            We may suspend or terminate accounts that violate these Terms or that we reasonably believe are being used for fraudulent or abusive purposes.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">4. Free and premium features</h2>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Free use</h3>
          <p>
            All tools on the Site are fully functional for free. Free use includes browser-based auto-saving (localStorage), standard JPG exports (which may include a small watermark), and limited AI-powered features where available.
          </p>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Single tool purchases</h3>
          <p>
            You may purchase premium exports for individual tools as a one-time payment. Once purchased, that premium feature is permanently available for that specific tool on your account. Single tool purchases are non-refundable once the premium download has been accessed.
          </p>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Toolkit bundles and subscriptions</h3>
          <p>
            We offer category-based toolkit bundles (monthly subscription) and MyKit Pro (monthly or annual subscription) that unlock premium features across multiple tools. Subscriptions auto-renew unless cancelled before the renewal date.
          </p>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Time-limited passes</h3>
          <p>
            Certain passes (such as the Wedding Pass) provide access to premium features for a specific category for a fixed period. Access expires at the end of the stated period regardless of usage.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">5. Payments and refunds</h2>
          <p>
            All payments are processed by Stripe. Prices are displayed in British Pounds (GBP) unless otherwise stated. VAT is included where applicable.
          </p>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Refund policy</h3>
          <p>
            For subscriptions, you may cancel at any time. Your access continues until the end of the current billing period. We do not provide partial refunds for unused time within a billing period.
          </p>
          <p className="mt-3">
            For single tool purchases, refunds are available within 14 days of purchase if the premium download has not been accessed. Once the premium content has been downloaded, the purchase is non-refundable.
          </p>
          <p className="mt-3">
            If you experience a technical issue that prevents you from accessing a purchased feature, please contact us at <a href="mailto:hello@mykit.tools" className="text-accent hover:underline">hello@mykit.tools</a> and we will resolve the issue or provide a refund.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">6. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Use the Service for any unlawful purpose or in violation of any applicable laws</li>
            <li>Attempt to gain unauthorised access to the Service, other users' accounts, or our systems</li>
            <li>Use automated scripts, bots, or scrapers to access or extract data from the Service without our prior written consent</li>
            <li>Interfere with or disrupt the Service or servers connected to it</li>
            <li>Resell, redistribute, or commercially exploit premium content (such as downloaded PDFs) beyond personal or internal business use</li>
            <li>Abuse AI-powered features by submitting content that is illegal, harmful, or designed to manipulate AI outputs for malicious purposes</li>
            <li>Circumvent or attempt to circumvent any access restrictions, rate limits, or payment requirements</li>
            <li>Use the Service to generate spam, phishing content, or misleading materials</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">7. Intellectual property</h2>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Our content</h3>
          <p>
            The Site design, branding, tool interfaces, SEO content, code, and underlying technology are owned by MyKit.tools and are protected by copyright and other intellectual property laws. You may not copy, modify, or redistribute our tools, code, or designs without our permission.
          </p>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Your content</h3>
          <p>
            Content you create using our tools (such as bingo cards, meal plans, quiz sheets, or printable downloads) belongs to you. You may use it for any personal or commercial purpose.
          </p>
          <p className="mt-3">
            When you use cloud save features, you grant us a limited licence to store and transmit your saved data solely for the purpose of providing the Service to you. We do not claim ownership of your saved content.
          </p>

          <h3 className="font-bold text-text-primary mt-4 mb-2">Premium downloads</h3>
          <p>
            Premium PDF downloads are licensed for personal and internal business use. You may print, share, and distribute generated content (such as party invitations or worksheets) to intended recipients. You may not resell the generated files themselves or use them as part of a competing service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">8. Disclaimer of warranties</h2>
          <p>
            The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          <p className="mt-3">
            While we strive for accuracy, we do not guarantee that calculations, conversions, or other tool outputs are error-free. Tools that involve financial calculations (such as tax calculators, mortgage tools, or pension estimators) are provided for informational and illustrative purposes only. They are not a substitute for professional financial, tax, or legal advice.
          </p>
          <p className="mt-3">
            Health-related tools (such as BMI calculators, pregnancy calculators, or calorie trackers) are for general informational purposes only and are not medical advice. Always consult a qualified healthcare professional for medical decisions.
          </p>
          <p className="mt-3">
            Data in our tools (such as UK tax rates, exchange rates, or travel information) is updated periodically but may not reflect the most current figures at all times. Please verify critical information from official sources.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">9. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, MyKit.tools and its owners, employees, and contractors shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, including but not limited to loss of profits, data, or business opportunities.
          </p>
          <p className="mt-3">
            Our total liability for any claim arising from the Service shall not exceed the amount you have paid to us in the 12 months preceding the claim, or 50 GBP, whichever is greater.
          </p>
          <p className="mt-3">
            Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under applicable law.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">10. Third-party services</h2>
          <p>
            The Service integrates with third-party providers including Clerk (authentication), Stripe (payments), Google Analytics (analytics), Anthropic (AI), Vercel (hosting), and Mediavine (advertising). Your use of these services is subject to their respective terms and privacy policies.
          </p>
          <p className="mt-3">
            We are not responsible for the availability, accuracy, or practices of third-party services. Links to external websites are provided for convenience and do not imply endorsement.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">11. Advertising</h2>
          <p>
            Free users may see display advertisements served by Mediavine or similar advertising partners. Ad content is selected by the advertising network and does not represent endorsement by MyKit.tools. MyKit Pro subscribers and active paying users may access an ad-free experience as described in their subscription benefits.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">12. Availability and uptime</h2>
          <p>
            We aim to keep the Service available at all times but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control. We will endeavour to provide advance notice of planned downtime where possible.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">13. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of material changes by posting a notice on the Site. Your continued use of the Service after changes take effect constitutes acceptance of the revised Terms.
          </p>
          <p className="mt-3">
            If you do not agree with updated Terms, you should stop using the Service and, if applicable, cancel your subscription.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">14. Governing law</h2>
          <p>
            These Terms are governed by the laws of England and Wales. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
          <p className="mt-3">
            If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">15. Contact us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <a href="mailto:hello@mykit.tools" className="text-accent hover:underline">hello@mykit.tools</a>.
          </p>
        </section>
      </div>
    </div>
    <Footer />
    </>
  );
}
