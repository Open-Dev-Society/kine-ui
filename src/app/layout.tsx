import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/ui/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://kine-ui.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Kine UI — Spatial Computing Components for React",
    template: "%s | Kine UI",
  },
  description: "Open-source hand gesture components for React. Copy-paste spatial computing primitives — air cursor, swipe detection, pinch-to-zoom, and air scroll — powered by MediaPipe WebAssembly. Zero server load.",
  keywords: [
    "kine ui", "hand gesture", "spatial computing", "react components",
    "mediapipe", "webcam", "hand tracking", "air cursor", "pinch to zoom",
    "swipe detection", "air scroll", "gesture recognition", "webassembly",
    "open source", "copy paste components", "shadcn", "nextjs",
  ],
  authors: [{ name: "Open Dev Society", url: "https://github.com/open-dev-society" }],
  creator: "Open Dev Society",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Kine UI",
    title: "Kine UI — Spatial Computing Components for React",
    description: "Open-source hand gesture components you can copy and paste into your React apps. Powered by MediaPipe WebAssembly. Zero server load.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kine UI — Spatial Computing Components for React",
    description: "Open-source hand gesture components you can copy and paste into your React apps. Powered by MediaPipe WebAssembly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="google-site-verification" content="Cak52LH2Ttv-hORQBBU19PZWthnfPruqKLjAd2M3YuQ" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Kine UI",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              description: "Open-source hand gesture components for React. Spatial computing primitives powered by MediaPipe WebAssembly.",
              url: "https://kine-ui.vercel.app",
              author: {
                "@type": "Organization",
                name: "Open Dev Society",
                url: "https://github.com/open-dev-society",
              },
              license: "https://opensource.org/licenses/MIT",
              programmingLanguage: ["TypeScript", "React"],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-[#0a0a0a] text-white min-h-screen flex flex-col selection:bg-white/10`}
      >
        <Navbar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
