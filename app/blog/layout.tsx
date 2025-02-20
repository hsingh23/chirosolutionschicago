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
    icon: "/images/icons/icon-192.png",
    shortcut: "/images/icons/icon-192.png",
    apple: "/images/icons/icon-192.png",
  },
  alternates: {
    canonical: "https://www.chirosolutionschicago.com/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}