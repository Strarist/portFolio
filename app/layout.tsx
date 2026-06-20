import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "./globals.css";
import { Providers } from "./providers";
import { poppins, instrumentSerif, jetbrainsMono } from "./font";
import { siteDescription, siteName, siteTitle, siteUrl } from "@/lib/site";
import {
  HELLO_BOOT_SCRIPT,
  HELLO_CRITICAL_CSS,
} from "@/lib/hello-preloader";
import Preloader from "@/components/Preloader";

const ClientShell = dynamic(() =>
  import("@/components/ClientShell").then((mod) => ({ default: mod.ClientShell }))
);

const DeferredUi = dynamic(() =>
  import("@/components/DeferredUi").then((mod) => ({ default: mod.DeferredUi }))
);

const SiteShell = dynamic(() =>
  import("@/components/SiteShell").then((mod) => ({ default: mod.SiteShell }))
);

const Navbar = dynamic(() =>
  import("@/components/Navbar").then((mod) => ({ default: mod.Navbar }))
);

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
    <html
      lang="en"
      className={`dark ${poppins.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style
          id="hello-critical"
          dangerouslySetInnerHTML={{ __html: HELLO_CRITICAL_CSS }}
        />
        <script
          id="hello-boot"
          dangerouslySetInnerHTML={{ __html: HELLO_BOOT_SCRIPT }}
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <div id="hello-static-splash" aria-hidden="true" />
        <Preloader />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100000] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#e8390d] focus:text-white focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <Providers>
          <ClientShell />
          <DeferredUi />
          <SiteShell>
            <Navbar />
            {children}
          </SiteShell>
        </Providers>
      </body>
    </html>
  );
}
