"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Clock, ArrowRight, RefreshCw, Zap } from "lucide-react";

interface Job {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  tags: string[];
  applyUrl: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      if (data.jobs) {
        setJobs(data.jobs);
        setLastUpdated(new Date(data.lastUpdate).toLocaleTimeString());
      }
    } catch (error) {
      console.error("Job sync failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-bg-deep text-text-main font-sans selection:bg-primary-indigo selection:text-white pb-20">
      {/* Navbar is now global in layout.tsx */}
      
      {/* Header */}
      <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center border-b border-white/5 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan text-xs font-bold uppercase tracking-widest mb-6">
          <Zap className="w-3 h-3 fill-accent-cyan" />
          Live Automatic Feed
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Indian Tech <span className="text-gradient">Job Updates</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-text-muted max-w-2xl mx-auto mb-8"
        >
          Daily curated opportunities for 20 LPA+ roles in Bangalore, Gurgaon, Mumbai & Remote.
        </motion.p>
        
        <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
           <span className="flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             Scraper Status: Online
           </span>
           <span className="w-px h-3 bg-white/10" />
           <span className="flex items-center gap-1.5">
             <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
             Last sync: {lastUpdated || "Syncing..."}
           </span>
        </div>
      </div>

      {/* Job List */}
      <div className="max-w-4xl mx-auto px-6 pt-12 relative z-10">
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {isLoading && jobs.length === 0 ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card p-8 h-40 animate-pulse bg-white/5 border-white/10" />
              ))
            ) : (
              jobs.map((job, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-card p-6 md:p-8 hover:border-primary-indigo/30 transition-all group cursor-pointer flex flex-col md:flex-row gap-6 md:items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                        {job.title}
                      </h2>
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase font-bold text-accent-cyan tracking-wider">
                        {job.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-4">
                       <span className="flex items-center gap-1.5 font-medium text-white/80">
                         <Briefcase className="w-4 h-4 text-accent-cyan" /> {job.company}
                       </span>
                       <span className="flex items-center gap-1.5">
                         <MapPin className="w-4 h-4" /> {job.location}
                       </span>
                       <span className="flex items-center gap-1.5">
                         <DollarSign className="w-4 h-4" /> {job.salary}
                       </span>
                    </div>
    
                    <div className="flex gap-2">
                      {job.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-md text-[10px] uppercase tracking-wider font-bold text-white/40 group-hover:text-white/70 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
    
                  <div className="flex flex-col md:items-end gap-4 shrink-0">
                     <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest text-text-muted bg-white/5 px-2 py-1 rounded">
                       <Clock className="w-3 h-3" /> {job.posted}
                     </span>
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         window.open(job.applyUrl, "_blank");
                       }}
                       className="px-6 py-3 bg-white/5 hover:bg-white text-bg-deep font-bold rounded-xl transition-all transform group-hover:scale-105 flex items-center gap-2"
                     >
                       Apply Now
                       <ArrowRight className="w-4 h-4" />
                     </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
