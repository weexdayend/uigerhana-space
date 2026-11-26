import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { PROFILE } from "@/data/profile";
import { PUBLIC_PROFILES } from "@/data/writing";
import { SITE_META } from "@/data/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const pixelifySans = Pixelify_Sans({ variable: "--font-pixelify-sans", subsets: ["latin"], weight: ["400", "500", "700"] });

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.displayName,
  jobTitle: PROFILE.positioning,
  url: SITE_META.siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bandung",
    addressCountry: "ID",
  },
  sameAs: PUBLIC_PROFILES.map((profile) => profile.href),
  knowsAbout: [
    "Product engineering",
    "Interface design",
    "Software architecture",
    "Enterprise AI",
    "Data architecture",
    "Production engineering",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.siteUrl),
  alternates: { canonical: "/" },
  title: { default: "Irvan Gerhana — Product Engineer", template: "%s | Irvan Gerhana" },
  description: "Irvan Gerhana is a Product Engineer working across product thinking, interface design, software engineering, enterprise AI, and production systems.",
  applicationName: "UI Gerhana",
  authors: [{ name: "Irvan Gerhana" }],
  creator: "Irvan Gerhana",
  keywords: ["Irvan Gerhana", "Product Engineer", "Software Engineering", "Product Design", "Enterprise AI", "UI/UX"],
  openGraph: {
    title: "Irvan Gerhana — Product Engineer",
    description: "Connecting product thinking, interface design, and software engineering to build meaningful digital products.",
    url: "https://uigerhana.space",
    siteName: "UI Gerhana",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "Irvan Gerhana — Product Engineer. From pixel to production.",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Irvan Gerhana — Product Engineer",
    description: "From pixel to production. Product thinking, interface design, and software engineering.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = { themeColor: "#0b0e11" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
