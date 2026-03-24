"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Send, Square, AlertCircle, Sparkles, Zap, Brain, Target, ShieldCheck, RefreshCw, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AffiliateCard from "@/components/dashboard/AffiliateCard";
import { getRecommendations } from "@/lib/affiliates";

interface Message {
  role: "assistant" | "user";
  content: string;
}

export default function InterviewCoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "System Initialized. I am your AI Interview Coach. Shall we begin a high-stakes technical assessment, or would you prefer to focus on behavioral storytelling?" }
  ]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [confidence, setConfidence] = useState(85);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const recommendations = getRecommendations("developer", "skills");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Simulated Sentiment Analysis Logic
  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setConfidence(prev => Math.min(100, Math.max(70, prev + (Math.random() * 4 - 2))));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    if (!isSessionActive) setIsSessionActive(true);

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          history: messages,
          userMessage: userMsg 
        }),
      });

      const data = await response.json();
      if (data.result) {
        setMessages(prev => [...prev, { role: "assistant", content: data.result }]);
        setSessionScore(prev => Math.min(100, prev + 15));
      }
    } catch (err) {
      console.error("AI Coach Disturbance:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="p-8 md:p-12 w-full h-[calc(100vh-theme(spacing.8))] flex flex-col max-w-7xl mx-auto overflow-hidden">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter flex items-center gap-3">
            <Brain className="text-secondary-glow w-10 h-10" /> 
            NEURAL <span className="text-gradient">COACH v3.0</span>
          </h1>
          <p className="text-text-muted font-medium mt-1">High-fidelity interview synthesis via Gemini 1.5 Flash.</p>
        </div>
        <div className="flex items-center gap-6">
           <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">Session Integrity</span>
             <div className="flex gap-1">
               {[1,2,3,4,5].map(i => (
                 <motion.div 
                   key={i} 
                   animate={{ opacity: [0.3, 1, 0.3] }}
                   transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                   className="w-1.5 h-4 bg-secondary-glow rounded-full" 
                 />
               ))}
             </div>
           </div>
           <button 
             onClick={() => { setMessages([]); setIsSessionActive(false); setSessionScore(0); }}
             className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
           >
             <RefreshCw className="w-5 h-5 text-white/50" />
           </button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* Left: Performance Intelligence */}
        <div className="hidden lg:flex w-80 flex-col gap-6">
           <div className="glass-card p-6 border-secondary-glow/20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-secondary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xs font-black uppercase tracking-widest text-white/40 italic">Confidence Meter</h3>
                 <Zap className="w-4 h-4 text-secondary-glow fill-secondary-glow" />
              </div>
              <div className="relative">
                <svg className="w-full h-32" viewBox="0 0 100 50">
                   <path d="M 10 45 A 35 35 0 0 1 90 45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeLinecap="round" />
                   <motion.path 
                     d="M 10 45 A 35 35 0 0 1 90 45" 
                     fill="none" 
                     stroke="url(#gradient)" 
                     strokeWidth="8" 
                     strokeLinecap="round"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: confidence / 100 }}
                   />
                   <defs>
                     <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                       <stop offset="0%" stopColor="#A855F7" />
                       <stop offset="100%" stopColor="#22D3EE" />
                     </linearGradient>
                   </defs>
                </svg>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                   <div className="text-3xl font-black text-white">{Math.round(confidence)}%</div>
                   <div className="text-[10px] uppercase font-bold text-secondary-glow tracking-widest">REAL-TIME</div>
                </div>
              </div>
           </div>

           <div className="glass-card p-6 border-white/5 flex-1 flex flex-col">
              <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6 flex items-center gap-2 italic">
                <Trophy className="w-3 h-3 text-amber-500" /> Session Progress
              </h3>
              <div className="space-y-6 flex-1">
                 {[
                   { label: "Articulation", score: 92 },
                   { label: "Technical Depth", score: 78 },
                   { label: "Structure", score: 85 }
                 ].map(metric => (
                   <div key={metric.label}>
                      <div className="flex justify-between text-[10px] font-bold text-text-muted mb-2 uppercase">
                        <span>{metric.label}</span>
                        <span className="text-white">{metric.score}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-secondary-glow" 
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.score}%` }}
                        />
                      </div>
                   </div>
                 ))}
              </div>
              
              <div className="mt-auto space-y-4">
                 <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-4 border-b border-white/5 pb-2 italic">Skill Upgrades</p>
                 {recommendations.map(aff => (
                   <AffiliateCard key={aff.id} id={aff.id} title={aff.title} description={aff.description} link={aff.link} icon={aff.icon} />
                 ))}
              </div>
           </div>
        </div>

        {/* Right: Interaction Core */}
        <div className="flex-1 glass-card border-white/10 flex flex-col overflow-hidden bg-black/20 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary-glow to-transparent opacity-30 shadow-[0_0_20px_rgba(168,85,247,0.5)]" />
          
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center border transition-all duration-500
                    ${msg.role === 'user' 
                      ? 'bg-primary-indigo/10 border-primary-indigo/20 text-primary-indigo shadow-[0_0_20px_rgba(79,70,229,0.1)]' 
                      : 'bg-secondary-glow/10 border-secondary-glow/20 text-secondary-glow shadow-[0_0_20px_rgba(168,85,247,0.1)]'}`}>
                    {msg.role === 'user' ? <Target className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                  </div>
                  <div className={`p-6 rounded-[30px] max-w-[80%] text-lg leading-relaxed shadow-xl border
                    ${msg.role === 'user' 
                      ? 'bg-primary-indigo text-white border-primary-indigo/30 rounded-tr-none' 
                      : 'bg-white/[0.03] text-white border-white/10 rounded-tl-none backdrop-blur-md'}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="flex gap-6"
               >
                <div className="w-12 h-12 rounded-2xl bg-secondary-glow/10 border border-secondary-glow/20 text-secondary-glow shrink-0 flex items-center justify-center animate-pulse">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="p-6 rounded-[30px] bg-white/[0.03] border border-white/10 rounded-tl-none flex gap-1 items-center">
                   <div className="w-2 h-2 rounded-full bg-secondary-glow animate-bounce" />
                   <div className="w-2 h-2 rounded-full bg-secondary-glow animate-bounce" style={{ animationDelay: "0.2s" }} />
                   <div className="w-2 h-2 rounded-full bg-secondary-glow animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 bg-black/40 border-t border-white/10 backdrop-blur-xl">
            <form onSubmit={handleSend} className="relative flex items-end gap-3 max-w-4xl mx-auto">
              <motion.button 
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setIsRecording(!isRecording)}
                className={`p-5 rounded-2xl shrink-0 transition-all border shadow-lg ${
                  isRecording 
                    ? 'bg-red-500 text-white border-red-400 animate-pulse' 
                    : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'
                }`}
              >
                {isRecording ? <Square className="w-6 h-6 fill-current" /> : <Mic className="w-6 h-6" />}
              </motion.button>
              
              <div className={`flex-1 relative ${isRecording ? 'opacity-50 pointer-events-none' : ''}`}>
                 <textarea 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                       e.preventDefault();
                       handleSend();
                     }
                   }}
                   placeholder={isRecording ? "Neural analyzer active... Speak clearly." : "Type your response..."}
                   className="w-full bg-white/[0.05] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/20 focus:outline-none focus:border-secondary-glow transition-all appearance-none resize-none min-h-[60px] max-h-[150px] scrollbar-hide"
                   rows={1}
                 />
                 {!isRecording && (
                   <button 
                     type="submit"
                     disabled={!input.trim() || isTyping}
                     className="absolute right-3 bottom-3 p-3 bg-secondary-glow text-white rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] disabled:opacity-30 transition-all hover:scale-105"
                   >
                     <Send className="w-5 h-5" />
                   </button>
                 )}
              </div>
            </form>
            <div className="mt-4 flex items-center justify-center gap-6">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 italic">
                  <ShieldCheck className="w-3 h-3 text-secondary-glow" /> Encrypted Session
               </div>
               <div className="w-1 h-1 rounded-full bg-white/10" />
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 italic">
                  <Brain className="w-3 h-3 text-secondary-glow" /> Neuro-Synergy Active
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
