"use client";

import { motion } from "framer-motion";
import { Cookie, Shield, Info, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-bg-deep text-white pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           className="mb-8"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 rounded-2xl bg-primary-indigo/10 border border-primary-indigo/20 flex items-center justify-center text-primary-indigo mb-10">
            <Cookie className="w-8 h-8" />
          </div>
          
          <h1 className="text-5xl font-black mb-8 tracking-tighter">Cookie Policy</h1>
          <p className="text-text-muted text-lg mb-12">Last updated: March 2026</p>
          
          <div className="space-y-12 text-lg text-text-muted leading-relaxed font-light">
             <section>
               <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                 <Info className="w-5 h-5 text-accent-cyan" />
                 What are Cookies?
               </h2>
               <p>
                 Cookies are small text files stored on your device to help the CareerAI platform remember your preferences and provide a seamless AI generation experience. We use them sparingly to optimize performance and security.
               </p>
             </section>

             <section>
               <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                 <Shield className="w-5 h-5 text-accent-cyan" />
                 How We Use Cookies
               </h2>
               <ul className="list-disc pl-6 space-y-4">
                 <li><span className="text-white font-medium">Essential:</span> Used for authentication and security to keep your AI credits and data safe.</li>
                 <li><span className="text-white font-medium">Preferences:</span> Remembering your selected resume templates and portfolio themes.</li>
                 <li><span className="text-white font-medium">Analytics:</span> Anonymous data to help us improve our AI models and user experience.</li>
               </ul>
             </section>

             <section className="glass-card p-8 border-white/5">
                <p className="text-sm">
                  By continuing to use CareerAI, you agree to our use of cookies. You can manage your cookie preferences in your browser settings at any time.
                </p>
             </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
