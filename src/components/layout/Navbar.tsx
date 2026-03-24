"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "../ui/Magnetic";
import Logo from "../ui/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? "bg-bg-deep/80 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <Link href="/">
            <Logo orientation="horizontal" className="h-8" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-sm font-medium text-text-muted hover:text-white transition-colors">Services</Link>
            <Link href="/jobs" className="text-sm font-medium text-text-muted hover:text-white transition-colors flex items-center gap-1">
              Job Updates <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
            </Link>
            <div className="relative group">
              <span className="text-sm font-medium text-text-muted hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                AI Tools
              </span>
              <div className="absolute top-full left-0 mt-4 w-48 glass-card border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all -translate-y-2 group-hover:translate-y-0 p-2 flex flex-col gap-1">
                 <Link href="/dashboard/resume" className="px-4 py-2 hover:bg-white/10 rounded-lg text-sm text-text-muted hover:text-white transition-colors">Resume Preparation</Link>
                 <Link href="/dashboard/portfolio" className="px-4 py-2 hover:bg-white/10 rounded-lg text-sm text-text-muted hover:text-white transition-colors">Portfolio Preparation</Link>
                 <Link href="/dashboard/interview" className="px-4 py-2 hover:bg-white/10 rounded-lg text-sm text-text-muted hover:text-white transition-colors">Interview Help</Link>
              </div>
            </div>
            <Link href="/pricing" className="text-sm font-medium text-text-muted hover:text-white transition-colors">Pricing</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-white hover:text-accent-cyan transition-colors">Sign in</Link>
            <Magnetic>
              <Link href="/contact" className="px-6 py-2.5 bg-gradient-to-r from-primary-indigo to-secondary-glow text-white text-sm font-semibold rounded-full hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all inline-block">
                Contact
              </Link>
            </Magnetic>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg-deep/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white border-b border-white/10 pb-4">Services</Link>
            <Link href="/jobs" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white border-b border-white/10 pb-4 flex items-center justify-between">
              Jobs Updates <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            </Link>
            <Link href="/dashboard/resume" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white border-b border-white/10 pb-4">Resume Preparation</Link>
            <Link href="/dashboard/portfolio" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white border-b border-white/10 pb-4">Portfolio Preparation</Link>
            <Link href="/dashboard/interview" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white border-b border-white/10 pb-4">Interview Help</Link>
            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-white border-b border-white/10 pb-4">Pricing</Link>
            <div className="mt-8 flex flex-col gap-4">
              <Link href="/login" className="w-full py-4 text-center border border-white/10 rounded-xl text-white font-medium" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <Link href="/contact" className="w-full py-4 text-center bg-primary-indigo rounded-xl text-white font-medium" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
