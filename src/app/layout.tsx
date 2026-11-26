import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "UI Gerhana — Product Engineer in Bandung",
  description:
    "Product engineer in Bandung, working worldwide. Web apps, SaaS platforms, AI workflows, and design systems built from pixel to production.",
  metadataBase: new URL("https://uigerhana.space"),
  openGraph: {
    title: "UI Gerhana — Product Engineer in Bandung",
    description:
      "Web apps, SaaS platforms, AI workflows, and design systems built and handed over cleanly.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0e11",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pixelifySans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
