"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";

export default function InterviewCoachSection() {
  return (
    <section className="py-32 relative z-10">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Master the <span className="text-gradient-primary">Interview.</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-text-muted mb-16 max-w-2xl mx-auto"
        >
          AI-driven mock sessions with real-time feedback, voice analysis, and cinematic immersion.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-6 md:p-10 max-w-3xl mx-auto text-left h-[500px] flex flex-col justify-between relative overflow-hidden"
        >
          {/* Messages Area */}
          <div className="flex-1 space-y-6 overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-indigo to-secondary-glow shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                <p className="text-white">Hello! I&apos;m your CareerAI Interview Coach. Are you ready to practice for your Software Engineer role?</p>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-4 flex-row-reverse"
            >
              <div className="w-10 h-10 rounded-full bg-accent-cyan shrink-0" />
              <div className="bg-primary-indigo text-white rounded-2xl rounded-tr-none p-4 max-w-[80%]">
                <p>Yes, let&apos;s start with a system design question.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="flex items-start gap-4 opacity-70"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-indigo to-secondary-glow shrink-0" />
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 rounded-full bg-text-muted" />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 rounded-full bg-text-muted" />
                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 rounded-full bg-text-muted" />
              </div>
            </motion.div>
          </div>

          {/* Voice Waveform Footer Mock */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-6">
            <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
              <Mic className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-1 h-12">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ["20%", "100%", "20%"] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1 + (i % 5) / 5,
                    delay: (i % 3) / 3,
                  }}
                  className="w-1.5 bg-accent-cyan rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
