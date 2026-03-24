"use client";

import { motion } from "framer-motion";
import { Target, Eye, Rocket, Globe, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "@/components/ui/Magnetic";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-deep text-white selection:bg-primary-indigo">
      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary-indigo/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-black uppercase tracking-[0.3em] text-accent-cyan mb-8"
          >
            <Target className="w-3 h-3" />
            The Neural Mission
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter italic uppercase"
          >
            Our <span className="text-gradient">Vision.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed font-light"
          >
            We are architecting a future where every professional has an AI-driven dual—a digital architect working 24/7 to optimize, brand, and launch your career into the top 1%.
          </motion.p>
        </div>
      </section>

      {/* Flagship Image Section */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-[21/9] rounded-[40px] overflow-hidden border border-white/10 glass-card group"
        >
          <Image 
            src="/careerai_vision_flagship.png" 
            alt="Futuristic AI Career Vision" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep/80 via-transparent to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
               <h3 className="text-3xl font-bold mb-4">Neural Infrastructure</h3>
               <p className="text-text-muted">Built on the world's most advanced LLMs, CareerAI is more than a tool—it's your private career strategist.</p>
            </div>
            <div className="flex gap-4">
               {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent-cyan/50" />)}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Philosophy Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              icon: Eye, 
              title: "Transparency", 
              desc: "We believe in clear ATS scoring and data-driven insights. No black boxes, just results." 
            },
            { 
              icon: ShieldCheck, 
              title: "Privacy First", 
              desc: "Your professional data is encrypted and architected for your eyes only. Security is our foundation." 
            },
            { 
              icon: Rocket, 
              title: "Velocity", 
              desc: "In an AI first world, speed is the differentiator. We deliver flagship resumes in seconds, not days." 
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-10 border-white/5 hover:border-accent-cyan/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-accent-cyan mb-8 group-hover:bg-accent-cyan/10 transition-all">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Deep Vision Content */}
      <section className="max-w-4xl mx-auto px-6 mb-40 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter">Join the <span className="text-gradient">Career Revolution.</span></h2>
        <div className="space-y-8 text-xl text-text-muted font-light leading-relaxed">
           <p>
             The traditional job market is broken. It relies on static documents and manual searches that can't keep up with the speed of innovation. 
             At <span className="text-white font-bold">CareerAI</span>, we are building the bridge between human talent and digital opportunity.
           </p>
           <p>
             Our vision extends beyond resumes. We are building the world's first individual-centric job ecosystem where AI doesn't just help you apply—it builds your agency, handles your branding, and prepares you for the high-stakes conversations that define your future.
           </p>
        </div>
        
        <div className="mt-16">
          <Magnetic>
             <Link href="/register" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black text-xl hover:bg-gray-200 transition-all group">
               Start Your Journey
               <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
             </Link>
          </Magnetic>
        </div>
      </section>
    </div>
  );
}
