"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { FileText, Monitor, Mic, ArrowRight, Zap, Target, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";

const services = [
  {
    icon: <FileText className="w-10 h-10 text-primary-indigo" />,
    title: "Resume Preparation",
    desc: "Our AI engine analyzes your career history against specific job descriptions to create ATS-optimized, high-conversion resumes. We focus on keyword density, action verbs, and cinematic layout.",
    features: ["Tailored Keywords", "Multiple Export Formats", "ATS Scoring", "Cinematic Templates"],
    color: "from-primary-indigo/20 to-transparent",
    href: "/dashboard/resume"
  },
  {
    icon: <Monitor className="w-10 h-10 text-accent-cyan" />,
    title: "Portfolio Preparation",
    desc: "Transform your static resume into a living, breathing digital brand. Our AI generates the copy, structure, and interactive elements of a premium portfolio website in seconds.",
    features: ["Dynamic Project Case Studies", "Interactive Scroll Effects", "SEO Optimized", "One-click Publishing"],
    color: "from-accent-cyan/20 to-transparent",
    href: "/dashboard/portfolio"
  },
  {
    icon: <Mic className="w-10 h-10 text-secondary-glow" />,
    title: "Interview Help Services",
    desc: "Face your next interview with zero anxiety. Our real-time AI coach uses Gemini 1.5 Flash to simulate realistic technical and behavioral interviews with instant sentiment feedback.",
    features: ["Voice & Chat Modes", "Sentiment Tracking", "Technical Vetting", "Progressive Difficulty"],
    color: "from-secondary-glow/20 to-transparent",
    href: "/dashboard/interview"
  }
];

export default function ServicesPage() {
  /**
   * Layout Architecture:
   * - Globak Navbar (in layout.tsx)
   * - Cinematic Hero with blurred background accents
   * - Service Modules with staggered scroll animations
   * - Global Footer (in layout.tsx)
   */
  return (
    <div className="min-h-screen bg-bg-deep text-text-main pb-32 selection:bg-primary-indigo">
      {/* Navbar handled globally */}
      
      {/* 
          Hero Section: 
          Uses tracking-tighter for a modern, high-fashion aesthetic.
          Background blur creates depth without sacrificing performance.
      */}
      <div className="pt-40 pb-20 text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-indigo/10 blur-[120px] rounded-full -z-10" />
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter"
        >
          Our <span className="text-gradient-primary">Expertise.</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed"
        >
          We provide a comprehensive ecosystem of AI-driven career tools designed to propel you into the top 1% of your field.
        </motion.p>
      </div>

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {services.map((service, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 lg:gap-24 items-center`}
          >
            {/* Visual Part */}
            <div className="flex-1 w-full aspect-square md:aspect-video lg:aspect-square relative rounded-[40px] overflow-hidden group">
               <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />
               <div className="absolute inset-0 backdrop-blur-3xl border border-white/10" />
               <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-bg-deep/80 to-transparent" />
               
               <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-md"
                  >
                    {service.icon}
                  </motion.div>
               </div>
            </div>

            {/* Content Part */}
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-text-muted">
                <Zap className="w-3 h-3 text-accent-cyan" />
                Service Module 0{idx + 1}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">{service.title}</h2>
              <p className="text-xl text-text-muted leading-relaxed">{service.desc}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-accent-cyan shrink-0" />
                    <span className="text-text-muted font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Magnetic>
                  <Link href={service.href} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all group">
                    Start Preparation
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 mt-40">
        <div className="glass-card p-12 lg:p-20 text-center relative border-white/10 overflow-hidden">
           <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-accent-cyan/10 blur-[100px] rounded-full" />
           <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             className="text-4xl md:text-6xl font-bold mb-8 relative z-10"
           >
             Ready to <span className="text-gradient">Accelerate Your Career?</span>
           </motion.h2>
           <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto relative z-10">
             Unlock the full potential of CareerAI and join thousands of successful engineers.
           </p>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Magnetic>
                <Link href="/register" className="px-12 py-5 bg-gradient-to-r from-primary-indigo to-secondary-glow text-white rounded-full font-bold text-lg shadow-xl hover:shadow-primary-indigo/20 transition-all">
                  Get Started for Free
                </Link>
              </Magnetic>
              <Link href="/contact" className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-bold text-lg transition-all">
                Contact Sales
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
