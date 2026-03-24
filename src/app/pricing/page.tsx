"use client";

import Navbar from "@/components/layout/Navbar";
import PricingSection from "@/components/landing/PricingSection";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-deep text-text-main pb-32">
      {/* Navbar handled globally */}
      
      <div className="pt-32 pb-16 text-center px-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
        >
          Investment in your <span className="text-gradient-primary">Future.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-text-muted max-w-2xl mx-auto"
        >
          Choose the plan that suits your career goals. From AI resumes to full portfolio automation.
        </motion.p>
      </div>

      <PricingSection />
      
      <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <div className="glass-card p-12 border-white/10">
          <h2 className="text-3xl font-bold mb-4 text-white">Need a custom plan?</h2>
          <p className="text-text-muted mb-8 text-lg">We offer enterprise solutions for universities and bootcamps. Get in touch for bulk credit discounts.</p>
          <a href="/contact" className="px-10 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-full text-white font-bold transition-all inline-block">
            Contact Sales
          </a>
        </div>
      </div>
    </div>
  );
}
