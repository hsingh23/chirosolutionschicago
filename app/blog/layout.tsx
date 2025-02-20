import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert Chiropractic & Wellness Blog | Dr. Daniel M. Dziekan",
  description: "Expert insights on chiropractic care, holistic wellness, and natural health solutions from Dr. Daniel M. Dziekan in Chicago.",
  openGraph: {
    title: "Expert Chiropractic & Wellness Blog | Dr. Daniel M. Dziekan",
    description: "Expert insights on chiropractic care, holistic wellness, and natural health solutions from Dr. Daniel M. Dziekan in Chicago.",
    url: "https://www.chirosolutionschicago.com/blog",
    siteName: "Dr. Daniel M. Dziekan - ChiroSolutions Chicago",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Chiropractic & Wellness Blog | Dr. Daniel M. Dziekan",
    description: "Expert insights on chiropractic care, holistic wellness, and natural health solutions from Dr. Daniel M. Dziekan in Chicago.",
    creator: "@chirochicago",
    site: "@chirochicago",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: "https://www.chirosolutionschicago.com/blog",
    types: {
      'application/rss+xml': '/rss.xml',
    },
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}