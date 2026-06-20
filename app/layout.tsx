import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { poppins } from "./font";
import { Navbar } from "@/components/Navbar";
import { ClientShell } from "@/components/ClientShell";
import { SiteShell } from "@/components/SiteShell";
import { Cursor } from "@/components/ui/Cursor";
import { Toaster } from "sonner";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Aditya Gupta",
    "Full Stack Developer",
    "Backend Engineer",
    "FastAPI",
    "React",
    "AWS",
    "AI Engineer",
    "Portfolio",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@adigupta1620",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={poppins.className}>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100000] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#e8390d] focus:text-white focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Providers>
          <ClientShell />
          <Cursor />
          <SiteShell>
            <Navbar />
            {children}
          </SiteShell>
          <Toaster richColors position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
