"use client";

import { FileText, Monitor, Mic, ArrowUpRight, Zap, Code, Palette } from "lucide-react";
import Link from "next/link";
import AffiliateCard from "@/components/dashboard/AffiliateCard";

export default function DashboardPage() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, User</h1>
        <p className="text-text-muted">Here is an overview of your career progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6 border-t-2 border-t-primary-indigo bg-gradient-to-b from-primary-indigo/10 to-transparent">
           <div className="w-12 h-12 bg-primary-indigo/20 rounded-xl flex items-center justify-center mb-4">
             <FileText className="w-6 h-6 text-primary-indigo" />
           </div>
           <h3 className="text-xl font-semibold mb-1">Resumes Generated</h3>
           <p className="text-3xl font-bold mt-2">2 <span className="text-sm font-normal text-text-muted">/ ∞</span></p>
        </div>
        <div className="glass-card p-6 border-t-2 border-t-accent-cyan bg-gradient-to-b from-accent-cyan/10 to-transparent">
           <div className="w-12 h-12 bg-accent-cyan/20 rounded-xl flex items-center justify-center mb-4">
             <Monitor className="w-6 h-6 text-accent-cyan" />
           </div>
           <h3 className="text-xl font-semibold mb-1">Active Portfolios</h3>
           <p className="text-3xl font-bold mt-2">1</p>
        </div>
        <div className="glass-card p-6 border-t-2 border-t-secondary-glow bg-gradient-to-b from-secondary-glow/10 to-transparent">
           <div className="w-12 h-12 bg-secondary-glow/20 rounded-xl flex items-center justify-center mb-4">
             <Mic className="w-6 h-6 text-secondary-glow" />
           </div>
           <h3 className="text-xl font-semibold mb-1">Interviews Completed</h3>
           <p className="text-3xl font-bold mt-2">4</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/dashboard/resume" className="group glass-card p-6 flex items-center justify-between hover:border-primary-indigo/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-indigo/20 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Create New Resume</h4>
                <p className="text-sm text-text-muted">Tailor for a specific job description</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-white transition-colors" />
          </Link>
          
          <Link href="/dashboard/interview" className="group glass-card p-6 flex items-center justify-between hover:border-accent-cyan/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent-cyan/20 transition-colors">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Start Interview Session</h4>
                <p className="text-sm text-text-muted">Practice with voice-enabled AI coach</p>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-text-muted group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>
      
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Focus Tools</h2>
            <p className="text-sm text-text-muted">Propel your applications with our partner ecosystem.</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-8" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AffiliateCard 
            id="interviewing-io"
            title="Interviewing.io" 
            description="Anonymous technical mock interviews with engineers from FAANG."
            link="https://interviewing.io"
            icon={Zap}
          />
          <AffiliateCard 
            id="leetcode"
            title="LeetCode Premium" 
            description="Master technical assessments with curated company-specific tracks."
            link="https://leetcode.com"
            icon={Code}
          />
          <AffiliateCard 
            id="grammarly"
            title="Grammarly AI" 
            description="Ensure your communication is professional and error-free."
            link="https://grammarly.com"
            icon={FileText}
          />
          <AffiliateCard 
            id="canva-resume"
            title="Improve Your Resume Design 🎨" 
            description="Use Canva Pro templates to make your resume stand out"
            link="https://www.canva.com/pro/"
            icon={Palette}
          />
        </div>
      </div>
    </div>
  );
}
