import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#020409",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Orbitlane Technologies | INNOVATE • BUILD • ELEVATE | Digital Engineering Forge",
  description:
    "Orbitlane Technologies is Kenya's premier software engineering and digital systems architecture company. Architecting custom enterprise platforms, MyShule ERP, high-performance web platforms, and intelligent automation for visionary organizations worldwide.",
  keywords: [
    "Orbitlane Technologies",
    "Software Engineering Kenya",
    "MyShule",
    "School Management ERP Kenya",
    "3D Web Development",
    "Next.js Developer Nairobi",
    "Custom Software Kenya",
    "M-Pesa API Integration",
    "Cloudflare Edge Architecture",
    "Enterprise Systems Nairobi",
  ],
  authors: [{ name: "Orbitlane Technologies", url: "https://orbitlane.ke" }],
  creator: "Orbitlane Technologies",
  publisher: "Orbitlane Technologies",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://orbitlane.ke",
    title: "Orbitlane Technologies | INNOVATE • BUILD • ELEVATE",
    description:
      "Kenya's leading digital engineering forge. We craft ultra-high-performance software, custom business architectures, scalable SaaS, and next-generation web ecosystems.",
    siteName: "Orbitlane Technologies",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orbitlane Technologies | INNOVATE • BUILD • ELEVATE",
    description:
      "Kenya's leading digital engineering forge. Custom enterprise software, MyShule educational ERP, and 3D web systems.",
    creator: "@orbitlanetech",
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
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#020409] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
