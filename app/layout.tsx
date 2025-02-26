"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Providers from "../components/Providers";
import Analytics from "./components/Analytics";
import PWAPrompt from "./components/PWAPrompt";
import ScrollToTop from "./components/ScrollToTop";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Natural Chiropractic Solutions - Daniel M. Dziekan, DC, CCSP</title>
        <meta name="description" content="Experience personalized care for your health, beauty, and vitality with Dr. Daniel M. Dziekan, a Certified Chiropractic Sports Physician & Mei Zen Cosmetic Acupuncture Practitioner in Chicago." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="application-name" content="Natural Chiropractic Solutions" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#bccd30" />
        <meta name="msapplication-TileColor" content="#bccd30" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <Providers>
          <ServiceWorkerRegistration />
          <Analytics />
          <PWAPrompt />
          <ScrollToTop />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
