"use client";

import { useState } from "react";
import { 
  Globe, Sparkles, Monitor, Palette, Code, Terminal, Zap, 
  ExternalLink, ShieldCheck, Trophy, Share2, Briefcase, 
  Wand2, LayoutTemplate, Star, RefreshCw 
} from "lucide-react";
import AffiliateCard from "@/components/dashboard/AffiliateCard";
import { getRecommendations } from "@/lib/affiliates";
import { motion, AnimatePresence } from "framer-motion";

interface PortfolioData {
  name: string;
  title: string;
  shortBio: string;
  projects: { title: string; description: string }[];
}

const samplePortfolios: (PortfolioData & { icon: any, category: string, theme: string })[] = [
  {
    category: "Developer",
    icon: <Code className="w-5 h-5" />,
    theme: "Terminal",
    name: "Alex Rivera",
    title: "Senior Cloud-Native Architect",
    shortBio: "Architecting high-availability distributed systems and edge-computing solutions for Fortune 500 tech giants.",
    projects: [
      { title: "QuantumMesh", description: "Led the migration of a monolith into 200+ microservices using Go, Kubernetes, and Istio." },
      { title: "HyperScale Storage", description: "Engineered a low-latency distributed file system that reduced data retrieval time by 40%." }
    ]
  },
  {
    category: "Designer",
    icon: <Palette className="w-5 h-5" />,
    theme: "Cinematic Dark",
    name: "Sarah Chen",
    title: "Product & Motion Lead",
    shortBio: "Fusing cinematic motion design with high-performance WebGL interfaces to create unforgettable digital brands.",
    projects: [
      { title: "Ether Vision", description: "A WebGL-based luxury marketplace that won the Awwwards Site of the Year 2024." },
      { title: "Nova UI", description: "A design system adopted by 12+ product teams, increasing design-to-dev speed by 3x." }
    ]
  },
  {
    category: "Manager",
    icon: <Briefcase className="w-5 h-5" />,
    theme: "Minimalist Light",
    name: "James Wilson",
    title: "Senior Director of Product",
    shortBio: "Driving multi-million dollar revenue growth through data-centric strategy and user-first product excellence.",
    projects: [
      { title: "MarketLink v2", description: "Scaled an e-commerce platform from 1M to 10M MAU within 6 months while maintaining 99% satisfaction." },
      { title: "Core Pay Engine", description: "Reduced checkout friction by 25%, resulting in a direct $12M ARR increase for our Fintech partners." }
    ]
  },
  {
    category: "Security",
    icon: <Wand2 className="w-5 h-5" />,
    theme: "Neo-Brutalist",
    name: "Elena Vance",
    title: "Cybersecurity Architect",
    shortBio: "Protecting critical infrastructure with zero-trust architectures and advanced threat modeling implementations.",
    projects: [
      { title: "Sentinel Guard", description: "Designed an automated incident response system that cut mean-time-to-recovery by 65%." },
      { title: "Nexus Compliance", description: "Automated GDPR and SOC-2 compliance across 1,000+ AWS accounts in real-time." }
    ]
  },
  {
    category: "AI / ML",
    icon: <Zap className="w-5 h-5" />,
    theme: "Cinematic Dark",
    name: "Marcus Wright",
    title: "Principal AI Researcher",
    shortBio: "Pushing the boundaries of transformers and LLM efficiency for real-time generative agents at scale.",
    projects: [
      { title: "AutoLLM Optimizer", description: "Developed a pruning algorithm that reduced LLM inference costs by 70% with zero accuracy loss." },
      { title: "GenVoice AI", description: "Pioneered a real-time speech-to-speech translation model with sub-100ms latency." }
    ]
  }
];

export default function PortfolioGeneratorPage() {
  /**
   * State Management: 
   * - isGenerating: Handles the async state of the AI generation process
   * - portfolioData: Stores the synthesized professional brand (manual or AI-generated)
   * - resumeText: The raw intelligence input from the user
   * - selectedTheme: User's architectural aesthetic preference
   */
  const [isGenerating, setIsGenerating] = useState(false);
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("Cinematic Dark");

  // Define available architectural styles (Themes)
  const themes = [
    { name: "Cinematic Dark", icon: <Wand2 className="w-4 h-4" /> },
    { name: "Minimalist Light", icon: <LayoutTemplate className="w-4 h-4" /> },
    { name: "Neo-Brutalist", icon: <Zap className="w-4 h-4" /> },
    { name: "Terminal", icon: <Code className="w-4 h-4" /> },
  ];

  /**
   * Synthesis Engine:
   * Communicates with the Gemini AI backend to transform raw resume text
   * into a structured, cinematic professional brand.
   */
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // API Call to synthesis endpoint
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceResume: resumeText }),
      });
      
      const data = await response.json();
      if (data.name) {
        setPortfolioData(data);
      }
    } catch (err) {
      console.error("Synthesis failed:", err);
      // Fallback or user notification could be added here
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Helper: Handle sample interactions.
   * Instantly populates the preview with pre-curated high-end data.
   */
  const handleSampleClick = (sample: any) => {
    setPortfolioData(sample);
    setSelectedTheme(sample.theme);
  };

  const renderTheme = () => {
    const data = portfolioData!;
    
    switch (selectedTheme) {
      case "Minimalist Light":
        return (
          <div className="bg-white min-h-full p-16 text-black font-sans">
            <div className="max-w-2xl">
              <h1 className="text-5xl font-light mb-4 tracking-tighter italic">{data.name}</h1>
              <p className="text-lg font-medium text-gray-500 mb-12 uppercase tracking-[0.2em]">{data.title}</p>
              <p className="text-xl text-gray-800 leading-relaxed mb-16 font-light">{data.shortBio}</p>
              <div className="space-y-12">
                {data.projects.map((p, i) => (
                  <div key={i} className="border-t border-gray-100 pt-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-2">{p.title}</h3>
                    <p className="text-gray-600 leading-relaxed italic">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Neo-Brutalist":
        return (
          <div className="bg-[#FF3E00] min-h-full p-12 text-black font-black">
            <div className="border-[6px] border-black bg-white p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h1 className="text-7xl mb-4 italic uppercase leading-none">{data.name}</h1>
              <div className="inline-block bg-black text-white px-4 py-2 text-xl mb-12 transform -rotate-1">{data.title}</div>
              <p className="text-2xl mb-16 leading-none tracking-tight border-b-4 border-black pb-12">{data.shortBio}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.projects.map((p, i) => (
                  <div key={i} className="border-4 border-black p-6 bg-[#00FF66] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:scale-[1.02] transition-transform">
                    <h3 className="text-2xl underline mb-3 uppercase tracking-tighter">{p.title}</h3>
                    <p className="text-lg font-bold">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "Terminal":
        return (
          <div className="bg-[#0A0A0A] min-h-full p-12 text-[#00FF41] font-mono relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
            <div className="mb-12 border-b border-[#00FF41]/20 pb-8">
              <div className="mb-4 text-white/50 animate-pulse">{">"} whoami --detailed</div>
              <h1 className="text-4xl mb-2 flex items-center gap-4">
                {data.name}
                <div className="w-3 h-8 bg-[#00FF41] animate-[blink_1s_infinite]" />
              </h1>
              <div className="text-xl opacity-80">LEVEL: {data.title.toUpperCase()}</div>
            </div>
            <div className="mb-16">
              <div className="mb-4 text-white/50">{">"} load bio_module.bin</div>
              <p className="text-lg leading-relaxed">{data.shortBio}</p>
            </div>
            <div>
              <div className="mb-8 text-white/50">{">"} query --projects --filter=top</div>
              <div className="space-y-8">
                {data.projects.map((p, i) => (
                  <div key={i} className="border border-[#00FF41]/30 p-6 bg-[#111] hover:bg-[#111]/80 transition-colors">
                    <h3 className="text-xl mb-2 text-white italic tracking-widest">{">"} ./{p.title.toLowerCase().replace(/\s+/g, '-')}</h3>
                    <p className="opacity-80 leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <style jsx>{`
              @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            `}</style>
          </div>
        );
      default: // Cinematic Dark
        return (
          <div className="flex-1 bg-[#050505] overflow-y-auto custom-scrollbar p-12 text-white">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center py-20"
            >
              <div className="w-12 h-12 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan mx-auto mb-10 group-hover:scale-110 transition-transform">
                 <Zap className="w-6 h-6 fill-accent-cyan" />
              </div>
              <h1 className="text-7xl font-bold mb-6 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">{data.name}</h1>
              <h2 className="text-xl text-accent-cyan font-bold mb-8 uppercase tracking-[0.4em] opacity-80">{data.title}</h2>
              <p className="text-xl text-gray-400 mb-16 leading-relaxed font-light">{data.shortBio}</p>
              
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />
              
              <div className="grid grid-cols-1 gap-12 text-left">
                {data.projects.map((project, i) => (
                  <div key={i} className="group/item relative">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-accent-cyan/0 group-hover/item:bg-accent-cyan/50 transition-all" />
                    <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover/item:text-accent-cyan transition-colors">{project.title}</h3>
                    <p className="text-lg text-gray-500 group-hover/item:text-gray-300 leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
            <Monitor className="text-accent-cyan w-8 h-8" /> 
            PORTFOLIO <span className="text-gradient">ENGINE</span>
          </h1>
          <p className="text-text-muted text-lg">Cinematic personal branding architected for your professional growth.</p>
        </div>
        {portfolioData && (
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setPortfolioData(null)}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold transition-all border border-white/10"
            >
              Back to Editor
            </button>
            <button className="px-8 py-3 bg-accent-cyan hover:bg-accent-cyan/80 text-bg-deep rounded-xl font-black flex items-center gap-2 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Globe className="w-5 h-5" />
              PUBLISH HUB
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!portfolioData ? (
          <div className="space-y-12">
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8"
            >
              <form onSubmit={handleGenerate} className="lg:col-span-3 glass-card p-8 flex flex-col space-y-8 h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-black uppercase tracking-widest text-text-muted">Intelligence Input</label>
                    <span className="text-[10px] text-accent-cyan font-bold bg-accent-cyan/10 px-2 py-0.5 rounded">ATS-AWARE</span>
                  </div>
                  <textarea 
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-lg font-light focus:outline-none focus:border-accent-cyan transition-all appearance-none resize-none placeholder:text-white/20"
                    placeholder="Paste your professional experience here..."
                    required
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-black uppercase tracking-widest text-text-muted">Aesthetic Architecture</label>
                    <span className="text-[10px] font-bold text-accent-cyan italic">DYNAMIC SWITCHER</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {themes.map((theme) => (
                      <div 
                        key={theme.name}
                        onClick={() => setSelectedTheme(theme.name)}
                        className={`border-2 rounded-2xl p-5 cursor-pointer transition-all flex flex-col items-center justify-center text-center gap-4 group relative overflow-hidden ${
                          selectedTheme === theme.name 
                            ? "border-accent-cyan bg-accent-cyan/10 ring-4 ring-accent-cyan/5" 
                            : "border-white/5 bg-white/5 hover:border-white/20"
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 scale-100 group-hover:scale-110 ${selectedTheme === theme.name ? "bg-accent-cyan text-bg-deep shadow-[0_0_20px_rgba(34,211,238,0.3)]" : "bg-white/5 text-white/40 group-hover:text-white/60"}`}>
                          {theme.icon}
                        </div>
                        <div className={`font-black text-[10px] uppercase tracking-widest leading-tight ${selectedTheme === theme.name ? "text-white" : "text-white/40"}`}>{theme.name}</div>
                        
                        {/* Style Preview Lines */}
                        <div className="flex flex-col gap-1 w-full opacity-10">
                           <div className="h-1 w-full bg-white rounded-full" />
                           <div className="h-1 w-2/3 bg-white rounded-full" />
                        </div>

                        {selectedTheme === theme.name && <motion.div layoutId="theme-active" className="absolute top-2 right-2 w-2 h-2 bg-accent-cyan rounded-full shadow-[0_0_8px_#22d3ee]" />}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isGenerating}
                  className="w-full py-5 bg-accent-cyan hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] text-bg-deep rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all mt-auto disabled:opacity-50 group"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      SYNTHESIZING...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      BUILD PORTFOLIO
                    </>
                  )}
                </button>
              </form>

              <div className="lg:col-span-2 glass-card flex flex-col items-center justify-center bg-gradient-to-br from-white/5 to-transparent border-white/10 p-12 text-center relative overflow-hidden group min-h-[400px]">
                <div className="absolute inset-0 bg-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center">
                  <Monitor className="w-24 h-24 text-white/10 mx-auto mb-8 group-hover:text-accent-cyan/30 transition-all duration-700 group-hover:scale-110" />
                  <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tighter italic">Engine Ready for Generation</h3>
                  <p className="text-text-muted max-w-sm mx-auto text-sm leading-relaxed mb-8 italic">Choose your architectural style and paste your experience to see the high-end output.</p>
                  
                  <button 
                    onClick={() => handleSampleClick(samplePortfolios[4])}
                    className="flex flex-col items-center group/btn"
                  >
                    <div className="flex gap-2 mb-4">
                      {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent-cyan/30 group-hover/btn:bg-accent-cyan transition-colors" />)}
                    </div>
                    <span className="text-[10px] uppercase font-black tracking-[0.3em] text-accent-cyan/60 group-hover/btn:text-accent-cyan transition-colors bg-accent-cyan/5 px-4 py-2 rounded-xl border border-accent-cyan/10 hover:border-accent-cyan/30">
                       Load AI Alpha Sample
                    </span>
                  </button>
              </div>

              {/* Strategic Affiliate Placement: Hosting & Domain */}
              <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                      <Globe className="w-4 h-4 text-accent-cyan" />
                   </div>
                   <h4 className="text-sm font-black uppercase tracking-widest text-white/60 italic">Publishing Ecosystem</h4>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {getRecommendations(undefined, "hosting").map(aff => (
                    <AffiliateCard key={aff.id} id={aff.id} title={aff.title} description={aff.description} link={aff.link} icon={aff.icon} />
                  ))}
                </div>
              </div>
            </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center text-amber-400">
                  <Star className="w-6 h-6 fill-amber-400" />
                </div>
                <h2 className="text-3xl font-black text-white tracking-tight italic uppercase">Premium Samples</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {samplePortfolios.map((sample, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSampleClick(sample)}
                    className={`glass-card p-6 cursor-pointer group flex flex-col items-center text-center transition-all ${
                      portfolioData?.name === sample.name 
                        ? "border-accent-cyan bg-accent-cyan/5 shadow-[0_0_20px_rgba(34,211,238,0.1)]" 
                        : "border-white/5 bg-white/[0.02] hover:border-accent-cyan/30"
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 mb-6 group-hover:bg-accent-cyan/10 group-hover:text-accent-cyan group-hover:border-accent-cyan/20 transition-all duration-300">
                      {sample.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-black text-white group-hover:text-accent-cyan transition-colors truncate w-full uppercase tracking-tighter">{sample.name}</h3>
                      <p className="text-[10px] font-bold text-text-muted truncate w-full">{sample.category}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 w-full">
                       <p className="text-[9px] uppercase font-black tracking-[0.2em] text-accent-cyan/50 group-hover:text-accent-cyan transition-colors">
                          {sample.theme}
                       </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            key="preview-active"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full flex flex-col gap-8 pb-20"
          >
            <div className="w-full aspect-[16/10] lg:aspect-[16/9] glass-card border-white/20 overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
              <div className="h-14 bg-white/5 border-b border-white/10 flex items-center px-6 gap-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-black/40 rounded-full px-6 py-1.5 text-[11px] font-black tracking-widest text-white/40 border border-white/5 flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    {portfolioData.name.toLowerCase().replace(/\s+/g, '-')}.careerai.dev
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
                   {themes.map(t => (
                     <button
                       key={t.name}
                       onClick={() => setSelectedTheme(t.name)}
                       className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${selectedTheme === t.name ? 'bg-accent-cyan text-bg-deep shadow-lg scale-110' : 'text-white/30 hover:text-white'}`}
                       title={t.name}
                     >
                       {t.icon}
                     </button>
                   ))}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-black">
                {renderTheme()}
              </div>
            </div>
            
            <div className="max-w-xl mx-auto text-center space-y-4">
              <p className="text-text-muted text-sm italic">"Your story, architecturalized by AI. This preview represents the live browser experience of your new brand."</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
