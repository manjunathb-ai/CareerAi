import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ProductShowcase from "@/components/landing/ProductShowcase";
import ResumeProcessSection from "@/components/landing/ResumeProcessSection";
import InterviewCoachSection from "@/components/landing/InterviewCoachSection";
import PricingSection from "@/components/landing/PricingSection";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Career Platform | Build Your Future with CareerAI",
  description: "Land your dream 20 LPA+ tech role. The world's #1 AI-powered career platform for resumes, portfolios, and job updates.",
};

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-bg-deep to-bg-deep" />
      
      <div className="relative z-10 pt-20">
        <HeroSection />
        <FeaturesSection />
        <ProductShowcase />
        <ResumeProcessSection />
        <InterviewCoachSection />
        <PricingSection />
      </div>
    </div>
  );
}
