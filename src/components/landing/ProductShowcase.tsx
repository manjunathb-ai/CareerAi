"use client";

import { motion } from "framer-motion";

export default function ProductShowcase() {
  return (
    <section id="showcase" className="py-32 relative overflow-hidden z-10 bg-gradient-to-b from-transparent to-primary-indigo/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="flex-1 min-w-[300px]">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-10"
          >
            Build your future with <span className="text-gradient">Precision.</span>
          </motion.h2>
          
          <ul className="space-y-8">
            {[
              { num: "01", title: "ATS-Engineered Resumes", desc: "Built to pass corporate filters while looking stunning to humans." },
              { num: "02", title: "Dynamic Portfolios", desc: "Auto-generated web portfolios that showcase your journey." },
              { num: "03", title: "Live Feedback Loop", desc: "Instantly analyze job descriptions against your profile." }
            ].map((item, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex gap-4 items-start"
              >
                <span className="text-accent-cyan font-bold text-xl">{item.num}</span>
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-text-muted">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* 3D Floating Panels */}
        <div className="flex-1 min-w-[300px] lg:w-1/2 h-[600px] relative perspective-[1200px]">
          <motion.div
            initial={{ opacity: 0, rotateY: 20, z: -100 }}
            whileInView={{ opacity: 1, rotateY: -5, z: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute right-0 top-10 w-3/4 aspect-[3/4] glass-card p-2 z-10 bg-white/5 border-white/10 overflow-hidden"
          >
             <img 
               src="https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&q=80&w=800" 
               alt="AI Resume Builder" 
               className="w-full h-full object-cover rounded-xl opacity-80 hover:opacity-100 transition-opacity" 
             />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotateY: -20, x: -100, y: 100 }}
            whileInView={{ opacity: 1, rotateY: 10, x: -40, y: 150 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-0 w-2/3 aspect-video glass-card p-2 z-20 shadow-2xl border-primary-indigo/30 bg-bg-deep/80 overflow-hidden"
          >
             <img 
               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" 
               alt="Career Analytics Dashboard" 
               className="w-full h-full object-cover rounded-xl opacity-90 hover:opacity-100 transition-opacity" 
             />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
