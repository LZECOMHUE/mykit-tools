import "./globals.css";
import { generateOrganizationSchema } from "@/lib/seo";
import Script from "next/script";

// Only import ClerkProvider when Clerk keys are configured
const hasClerk = !!(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
let ClerkProvider;
if (hasClerk) {
  ClerkProvider = require("@clerk/nextjs").ClerkProvider;
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title: {
    default: "MyKit.tools — Free Online Tools, Calculators & Generators",
    template: "%s | MyKit.tools",
  },
  description:
    "2,000+ free interactive tools, calculators, converters, and generators. From tax calculators to bingo card makers — tools that actually work.",
  metadataBase: new URL("https://mykit.tools"),
  keywords:
    "free online tools, calculators, converters, generators, tax calculator, unit converter, bingo card maker",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Add your actual Google verification code
    yandex: "yandex-verification-code", // Add your actual Yandex verification code
  },
  alternates: {
    canonical: "https://mykit.tools",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "MyKit.tools",
    url: "https://mykit.tools",
    title: "MyKit.tools — Free Online Tools, Calculators & Generators",
    description:
      "2,000+ free interactive tools, calculators, converters, and generators. From tax calculators to bingo card makers — tools that actually work.",
    images: [
      {
        url: "https://mykit.tools/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyKit.tools - Free Online Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mykittools",
    title: "MyKit.tools — Free Online Tools, Calculators & Generators",
    description:
      "2,000+ free interactive tools, calculators, converters, and generators.",
    image: "https://mykit.tools/og-image.png",
  },
};

export default function RootLayout({ children }) {
  // Generate Organization schema for site-level authority (GEO/AEO)
  const organizationSchema = generateOrganizationSchema();

  return (
    <html lang="en">
      <head>
        {/* Organization Schema - Site-level authority signal for AI crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Preconnect to important domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for analytics and ad services */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Explicitly allow AI crawlers in meta tag (backup for robots.js) */}
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      </head>
      <body className="antialiased">
        {hasClerk && ClerkProvider ? (
          <ClerkProvider>{children}</ClerkProvider>
        ) : (
          children
        )}
      </body>

      {/* Google Analytics */}
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
              });
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
    </html>
  );
}
