"use client";

import { ArrowUpRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface AffiliateCardProps {
  title: string;
  description: string;
  link: string;
  icon?: any;
  id: string;
}

/**
 * Premium AffiliateCard Component:
 * - Glassmorphism style with backdrop blur
 * - Framer Motion animations for high-end SaaS feel
 * - Direct tracking via /api/affiliate-click
 */
export default function AffiliateCard({
  title,
  description,
  link,
  icon: Icon,
  id
}: AffiliateCardProps) {
  
  const handleTrackClick = async () => {
    try {
      await fetch("/api/affiliate-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ affiliateId: id, link })
      });
    } catch (e) {
      console.error("Tracking failed", e);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/5 hover:border-accent-cyan/30 hover:bg-white/[0.06] transition-all duration-500 overflow-hidden"
    >
      {/* Dynamic Glow Effect */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent-cyan/10 blur-[60px] rounded-full group-hover:bg-accent-cyan/20 transition-all duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan group-hover:scale-110 transition-transform duration-500">
            {Icon ? <Icon className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
          </div>
          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-accent-cyan/50 transition-colors">Recommended</span>
        </div>
        
        <h3 className="text-lg font-black text-white mb-2 tracking-tight group-hover:text-accent-cyan transition-colors leading-tight">{title}</h3>
        <p className="text-xs text-text-muted leading-relaxed mb-6 opacity-70 group-hover:opacity-100 transition-opacity line-clamp-2">{description}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTrackClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 group-hover:bg-accent-cyan text-white group-hover:text-bg-deep rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300"
        >
          Try Now
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </motion.div>
  );
}
