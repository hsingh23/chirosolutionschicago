import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "../components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daniel M. Dziekan, DC, CCSP - Luxury Chiropractic and Holistic Wellness in Chicago",
  description:
    "Experience personalized care for your health, beauty, and vitality with Dr. Daniel M. Dziekan, a Certified Chiropractic Sports Physician & Mei Zen Cosmetic Acupuncture Practitioner in Chicago.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
