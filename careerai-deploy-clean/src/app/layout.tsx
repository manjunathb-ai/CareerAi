import type { Metadata } from "next";
import { Inter, Outfit, Sigmar } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/layout/CustomCursor";
import NoiseOverlay from "@/components/layout/NoiseOverlay";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const sigmar = Sigmar({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-sigmar"
});

export const metadata: Metadata = {
  title: {
    default: "CareerAI | #1 AI Resume Builder & Portfolio Generator",
    template: "%s | CareerAI"
  },
  description: "The world's most advanced AI Career platform. Build ATS-optimized resumes, cinematic portfolios, and get live Indian job updates. Land your dream 20 LPA+ role today.",
  keywords: [
    "AI Resume Builder", 
    "ATS Friendly Resume", 
    "Portfolio Generator", 
    "Indian Job Updates", 
    "20 LPA Jobs Bangalore", 
    "AI Career Coach India",
    "Best Resume Builder 2024",
    "Automatic Portfolio Website"
  ],
  authors: [{ name: "CareerAI Team" }],
  creator: "CareerAI",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://careerai.saas",
    title: "CareerAI | #1 AI Resume Builder & Portfolio Generator",
    description: "Build ATS-optimized resumes and cinematic portfolios instantly. Get daily job updates for premium Indian tech roles.",
    siteName: "CareerAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerAI | #1 AI Resume Builder & Portfolio Generator",
    description: "The future of career growth. Build your brand with AI.",
    creator: "@careerai",
  },
  robots: {
    index: true,
    follow: true,
  }
};

import LayoutWrapper from "@/components/layout/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} ${sigmar.variable} font-sans bg-bg-deep text-text-main selection:bg-primary-indigo/30 selection:text-white min-h-screen relative`}>
        <ScrollProgress />
        <NoiseOverlay />
        <CustomCursor />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
