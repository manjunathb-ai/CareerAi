"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, X } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function HeroSection() {
  const containerRef = useRef(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const dashboardRotateX = useTransform(scrollYProgress, [0, 1], [15, 5]);
  const dashboardY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const dashboardOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh] pt-32 pb-20 flex flex-col items-center justify-start text-center overflow-visible"
    >
      {/* Premium Hero Visualization */}
      <motion.div
        style={{ y: orbY }}
        className="relative mb-12 z-10 flex flex-col items-center justify-center h-48"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ rotate: 180, scale: [1, 1.02, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-[280px] h-[280px] rounded-full border border-white/5 border-t-white/10"
          />
          <motion.div
            animate={{ rotate: -180, scale: [1, 1.05, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[380px] h-[380px] rounded-full border border-white/[0.03] border-b-accent-cyan/10"
          />
        </div>

        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20"
        >
          <Logo />
        </motion.div>
      </motion.div>

      {/* Main Headline */}
      <div className="z-10 max-w-5xl px-6 md:px-12 mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          <motion.span custom={0} variants={textVariants} initial="hidden" animate="visible" className="inline-block mr-3">
            Welcome to
          </motion.span>
          <motion.span custom={1} variants={textVariants} initial="hidden" animate="visible" className="inline-block mr-3">
            the Future
          </motion.span>
          <motion.span custom={2} variants={textVariants} initial="hidden" animate="visible" className="inline-block mr-3">
            of
          </motion.span>
          <motion.span custom={3} variants={textVariants} initial="hidden" animate="visible" className="inline-block text-gradient-primary">
            CareerAI
          </motion.span>
        </h1>

        <motion.p
          custom={4}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-text-muted max-w-2xl mx-auto mb-10"
        >
          Master your job search with AI-powered resumes, stunning portfolios, and real-time interview coaching.
        </motion.p>

        <motion.div
          custom={5}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/contact" className="group relative px-10 py-4 bg-gradient-to-r from-primary-indigo to-secondary-glow rounded-full font-bold shadow-[0_4px_20px_rgba(99,102,241,0.4)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.6)] transition-all hover:-translate-y-1 flex items-center gap-2 overflow-hidden">
            <span className="relative z-10">Contact</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </Link>
          
          <button 
            onClick={() => setIsDemoOpen(true)}
            className="px-8 py-4 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all font-medium text-text-muted hover:text-white"
          >
            <Play className="w-5 h-5 fill-white" />
            Watch Demo
          </button>
        </motion.div>
      </div>

      {/* 3D Dashboard Preview */}
      <div className="w-full max-w-6xl mt-24 px-6 relative perspective-[2000px] z-0">
        <motion.div
          style={{ 
            rotateX: dashboardRotateX,
            y: dashboardY,
            opacity: dashboardOpacity
          }}
          className="w-full aspect-[16/9] rounded-2xl md:rounded-[40px] border border-white/10 bg-glass-bg backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="h-12 w-full border-b border-white/10 bg-white/5 flex items-center px-6 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          
          <div className="flex-1 relative w-full h-full overflow-hidden bg-bg-deep">
            <img 
               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600" 
               alt="Premium Dashboard Interface" 
               className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/50 to-transparent opacity-80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-deep via-transparent to-bg-deep opacity-80 pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-[400px] h-[400px] bg-primary-indigo/10 rounded-full blur-[80px]" />
            </div>
          </div>
        </motion.div>
        <div className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-bg-deep to-transparent z-10" />
      </div>

      <AnimatePresence>
        {isDemoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsDemoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl aspect-video bg-bg-deep border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsDemoOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-full h-full relative group">
                 <iframe 
                   src="https://player.vimeo.com/video/441262070?background=1&autoplay=1&loop=1&byline=0&title=0"
                   frameBorder="0" 
                   allow="autoplay; fullscreen; picture-in-picture" 
                   className="absolute inset-0 w-full h-full"
                 />
                 <div className="absolute inset-0 bg-primary-indigo/10 mix-blend-overlay pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
