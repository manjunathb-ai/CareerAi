"use client";

import { useState, useMemo } from "react";
import { 
  FileText, Wand2, Download, AlertCircle, Layout, CheckCircle2, 
  XCircle, Info, Star, Sparkles, Target, History, RefreshCw, Layers, ArrowRight
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import AffiliateCard from "@/components/dashboard/AffiliateCard";
import { getRecommendations } from "@/lib/affiliates";
import { motion, AnimatePresence } from "framer-motion";

type TemplateId = "modern" | "classic" | "minimalist";

interface Template {
  id: TemplateId;
  name: string;
  description: string;
  className: string;
}

const templates: Template[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean sans-serif design with subtle blue accents. Best for tech and creative roles.",
    className: "font-sans text-slate-800",
  },
  {
    id: "classic",
    name: "Classic Executive",
    description: "Traditional serif typography with a centered layout. Perfect for finance and law.",
    className: "font-serif text-black text-center",
  },
  {
    id: "minimalist",
    name: "Minimalist",
    description: "Ultra-clean layout with high whitespace. Great for designers and architects.",
    className: "font-light tracking-tight text-gray-700 space-y-8",
  },
];

export default function ResumeBuilderPage() {
  /**
   * Application State:
   * - isGenerating: UI state for the AI optimization lifecycle
   * - result: The final ATS-optimized resume content
   * - jobDescription: The target context for optimization
   * - experience: Raw professional history provided by the user
   * - selectedTemplate: Aesthetic ID for the final preview
   */
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("modern");

  /**
   * Memoized ATS Analysis:
   * Performs client-side keyword extraction and scoring.
   * This provides instant feedback before/after the AI optimization pass.
   */
  const atsAnalysis = useMemo(() => {
    if (!result || !jobDescription) return null;
    
    const jdKeywords = (jobDescription.toLowerCase().match(/\b(\w+)\b/g) as string[]) || [];
    const resumeWords = (result.toLowerCase().match(/\b(\w+)\b/g) as string[]) || [];
    
    // Extraction Logic: Filters for significant professional keywords (> 4 chars)
    const uniqueKeywords = Array.from(new Set(jdKeywords)).filter(w => w.length > 4);
    const matchedKeywords = uniqueKeywords.filter(w => resumeWords.includes(w));
    
    // Scoring Algorithm: Weights keyword density (60%) and section presence (40%)
    const keywordScore = Math.min(60, (matchedKeywords.length / uniqueKeywords.length) * 60);
    const sectionScore = (result.includes("EXPERIENCE") ? 10 : 0) + 
                         (result.includes("EDUCATION") ? 10 : 0) + 
                         (result.includes("SKILLS") ? 10 : 0) + 
                         (result.includes("CONTACT") || result.includes("PHONE") ? 10 : 0);
    
    const totalScore = Math.round(keywordScore + sectionScore);
    
    return {
      score: totalScore,
      matched: matchedKeywords.slice(0, 5),
      missing: uniqueKeywords.filter(w => !resumeWords.includes(w)).slice(0, 5),
    };
  }, [result, jobDescription]);

  /**
   * Optimizer Hub:
   * Interfaces with the Gemini AI to synthesize a custom resume
   * tailored specifically to the provided job description.
   */
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, currentExperience: experience }),
      });
      
      const data = await response.json();
      if (data.result) {
        setResult(data.result);
      } else {
        setResult(`Error: ${data.error || "Please check your network status."}`);
      }
    } catch (err) {
      console.error("Optimization failed:", err);
      setResult("A network error occurred during optimization.");
    } finally {
      setIsGenerating(false);
    }
  };

  const sampleResumes = [
    {
      name: "Software Engineer (Big Tech)",
      description: "Focuses on distributed systems, React, and Google Cloud experience.",
      experience: `- Senior Software Engineer at TechGiant (2020-Present)
- Led the rewrite of the core payment gateway using Go and Kafka.
- Reduced latency by 40% through advanced caching strategies.
- Mentored 5+ junior engineers and led code review standards.`,
      jobDescription: "Looking for a Senior Software Engineer with expertise in scalable backend systems, Go, and distributed architecture."
    },
    {
      name: "Product Designer (UI/UX)",
      description: "Emphasizes design systems, user research, and Framer Motion.",
      experience: `- Lead Product Designer at CreativeStudio (2021-Present)
- Defined the design system for a mobile app with 1M+ downloads.
- Conducted 50+ user interviews to drive product strategy.
- Expert in Figma, high-fidelity prototyping, and motion design.`,
      jobDescription: "Seeking a Product Designer who can bridge the gap between aesthetics and functionality for our flagship SaaS product."
    }
  ];

  const handleSampleLoad = (sample: typeof sampleResumes[0]) => {
    setExperience(sample.experience);
    setJobDescription(sample.jobDescription);
    setResult(null);
  };

  const currentTemplate = templates.find(t => t.id === selectedTemplate)!;

  return (
    <div className="p-8 md:p-12 w-full min-h-screen bg-bg-deep text-white flex flex-col">
      <div className="mb-12 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3 tracking-tighter italic">
            <FileText className="text-primary-indigo w-10 h-10" /> 
            RESUME <span className="text-gradient">ENGINE</span>
          </h1>
          <p className="text-text-muted text-lg">Architect your career narrative with ATS-aware intelligence.</p>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-[10px] uppercase font-black tracking-[0.2em] text-accent-cyan">Architectural Styles</label>
          <div className="flex gap-4">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.id)}
                className={`group relative flex flex-col items-start p-4 rounded-2xl border transition-all text-left w-48 ${
                  selectedTemplate === t.id 
                    ? "bg-primary-indigo/10 border-primary-indigo shadow-[0_0_20px_rgba(99,102,241,0.2)]" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedTemplate === t.id ? 'bg-primary-indigo text-white' : 'bg-white/5 text-white/40 group-hover:text-white/60'}`}>
                      <Layout className="w-4 h-4" />
                   </div>
                   {selectedTemplate === t.id && <CheckCircle2 className="w-4 h-4 text-primary-indigo" />}
                </div>
                <div className={`font-bold text-sm ${selectedTemplate === t.id ? 'text-white' : 'text-text-muted'}`}>{t.name}</div>
                <div className="text-[10px] opacity-40 line-clamp-1 mt-1">{t.id.toUpperCase()} TEMPLATE</div>
                
                {/* Visual indicator of the style */}
                <div className="mt-3 flex gap-1 w-full opacity-20">
                   <div className="h-1 w-1/2 bg-white rounded-full" />
                   <div className="h-1 w-1/4 bg-white rounded-full" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sample Resumes Quick Start */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
           <Layers className="w-5 h-5 text-amber-400" />
           <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60 italic">Blueprint Samples</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {sampleResumes.map((sample, i) => (
             <button 
               key={i}
               onClick={() => handleSampleLoad(sample)}
               className="glass-card p-6 border-white/5 hover:border-amber-400/30 text-left transition-all group flex items-center justify-between"
             >
               <div>
                  <div className="font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">{sample.name}</div>
                  <div className="text-xs text-text-muted mt-1">{sample.description}</div>
               </div>
               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-amber-400/10 text-amber-400 transition-all">
                  <ArrowRight className="w-4 h-4" />
               </div>
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        {/* Left Form Panel */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2">
          <form onSubmit={handleGenerate} className="glass-card p-6 flex flex-col space-y-4">
            <div className="flex items-center gap-2 mb-2 text-accent-cyan">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">AI Optimizer</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Target Job Description</label>
              <textarea 
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-text-muted/50 focus:outline-none focus:border-primary-indigo transition-colors"
                placeholder="Paste the job description here..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-2">Current Experience</label>
              <textarea 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full h-48 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-text-muted/50 focus:outline-none focus:border-primary-indigo transition-colors"
                placeholder="Paste your current resume bullets or LinkedIn profile summary..."
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={isGenerating}
              className="w-full py-4 bg-primary-indigo hover:bg-primary-indigo/80 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Optimizing Keywords...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Perfect Resume
                </>
              )}
            </button>
            <div className="flex items-center gap-2 text-xs text-text-muted mt-2">
              <Info className="w-4 h-4 text-accent-cyan" />
              Costs 1 AI Credit per optimization
            </div>
          </form>

          {atsAnalysis && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-6 border-accent-cyan/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">ATS Compatibility Score</h3>
                <div className="text-2xl font-black text-accent-cyan">{atsAnalysis.score}%</div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-text-muted mb-2">
                    <span>Performance</span>
                    <span>{atsAnalysis.score}/100</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${atsAnalysis.score}%` }}
                      className="h-full bg-gradient-to-r from-primary-indigo to-accent-cyan"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="text-[10px] uppercase font-bold text-green-400 mb-1">Keywords Found</div>
                    <div className="flex flex-wrap gap-1">
                      {atsAnalysis.matched.map(w => (
                        <span key={w} className="text-[10px] bg-green-500/20 px-1.5 py-0.5 rounded text-green-300">{w}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <div className="text-[10px] uppercase font-bold text-red-400 mb-1">Missing Keywords</div>
                    <div className="flex flex-wrap gap-1">
                      {atsAnalysis.missing.map(w => (
                        <span key={w} className="text-[10px] bg-red-500/20 px-1.5 py-0.5 rounded text-red-300">{w}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Preview Panel */}
        <div className="w-full lg:w-2/3 glass-card bg-white/5 border-white/10 overflow-hidden flex flex-col">
          <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-white/5">
            <div className="flex items-center gap-6">
              <span className="font-medium text-text-muted flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Preview
              </span>
              <div className="h-4 w-px bg-white/10" />
              <div className="text-xs text-text-muted flex items-center gap-1">
                <Layout className="w-3 h-3" />
                Selected: <span className="text-white font-bold">{currentTemplate.name}</span>
              </div>
            </div>
            
            <button 
              disabled={!result}
              onClick={() => {
                const printWindow = window.open('', '_blank');
                if (printWindow) {
                  printWindow.document.write(`
                    <html>
                      <head>
                        <title>Resume - CareerAI</title>
                        <script src="https://cdn.tailwindcss.com"></script>
                        <style>
                          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
                          body { padding: 40px; }
                        </style>
                      </head>
                      <body class="${currentTemplate.className}">
                        <div class="max-w-3xl mx-auto whitespace-pre-wrap">
                          ${result}
                        </div>
                      </body>
                    </html>
                  `);
                  printWindow.document.close();
                  printWindow.print();
                }
              }}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all disabled:opacity-30"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          <div className="flex-1 bg-white p-12 overflow-y-auto scrollbar-hide">
            <AnimatePresence mode="wait">
              {!result && !isGenerating && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center text-gray-300"
                >
                   <FileText className="w-20 h-20 mb-6 opacity-20" />
                   <p className="text-xl font-medium mb-2">Build your flagship resume</p>
                   <p className="text-sm opacity-60">Paste your details to see the magic happen.</p>
                </motion.div>
              )}
              
              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="w-full h-full flex flex-col items-center justify-center text-gray-400 space-y-6"
                >
                   <div className="relative">
                     <div className="w-16 h-16 border-4 border-gray-100 border-t-primary-indigo rounded-full animate-spin" />
                     <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary-indigo animate-pulse" />
                   </div>
                   <div className="text-center">
                     <p className="text-lg font-semibold text-gray-700">AI is architecting your resume...</p>
                     <p className="text-sm opacity-60 mt-1">Analyzing millions of data points for ATS perfection</p>
                   </div>
                </motion.div>
              )}

              {result && !isGenerating && (
                <motion.div 
                  key={selectedTemplate}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`${currentTemplate.className} whitespace-pre-wrap max-w-3xl mx-auto p-4`}
                >
                  {result}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
