"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, MapPin, Star, ThumbsUp } from "lucide-react";
import { useState } from "react";

const categories = [
  "Resume Builder",
  "Portfolio Generator",
  "Interview Coach",
  "Job Updates",
  "UI / Design",
  "General Feedback",
];

export default function ContactPage() {
  // Feedback form state
  const [fbName, setFbName] = useState("");
  const [fbEmail, setFbEmail] = useState("");
  const [fbCategory, setFbCategory] = useState(categories[0]);
  const [fbRating, setFbRating] = useState(5);
  const [fbMessage, setFbMessage] = useState("");
  const [fbStatus, setFbStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFbStatus("loading");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fbName,
          email: fbEmail,
          category: fbCategory,
          rating: fbRating,
          message: fbMessage,
        }),
      });
      if (res.ok) {
        setFbStatus("success");
        setFbName(""); setFbEmail(""); setFbMessage(""); setFbRating(5);
      } else {
        setFbStatus("error");
      }
    } catch {
      setFbStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-bg-deep text-text-main font-sans selection:bg-primary-indigo selection:text-white pb-32">
      {/* Navbar handled globally */}

      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Side: Text & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Let&apos;s <span className="text-gradient-primary">Connect.</span>
              </h1>
              <p className="text-xl text-text-muted max-w-lg leading-relaxed">
                Whether you have a question about our AI features, pricing, or just want to say hello, we&apos;re here for you.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary-indigo transition-colors shadow-lg shadow-black/20">
                  <Mail className="w-6 h-6 text-primary-indigo" />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">Email Support</div>
                  <a href="mailto:designsbymanjunath@gmail.com" className="text-lg font-medium text-white hover:text-primary-indigo transition-colors">designsbymanjunath@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent-cyan transition-colors shadow-lg shadow-black/20">
                  <MessageSquare className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">Live Chat</div>
                  <div className="text-lg font-medium text-white">Available 24/7 — Always Online</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-pink-500 transition-colors shadow-lg shadow-black/20">
                  <MapPin className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <div className="text-sm font-bold text-text-muted uppercase tracking-widest mb-1">Headquarters</div>
                  <div className="text-lg font-medium text-white">Bangalore, India 🇮🇳</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-10 md:p-12 relative border-white/10 overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-indigo/20 blur-[100px] rounded-full" />

            <form className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-3">Your Name</label>
                  <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-text-muted/30 focus:outline-none focus:border-primary-indigo transition-all ring-offset-bg-deep focus:ring-2 focus:ring-primary-indigo/20"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-3">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-text-muted/30 focus:outline-none focus:border-primary-indigo transition-all ring-offset-bg-deep focus:ring-2 focus:ring-primary-indigo/20"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-3">Subject</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-text-muted/30 focus:outline-none focus:border-primary-indigo transition-all ring-offset-bg-deep focus:ring-2 focus:ring-primary-indigo/20"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-muted mb-3">Message</label>
                <textarea
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-text-muted/30 focus:outline-none focus:border-primary-indigo transition-all ring-offset-bg-deep focus:ring-2 focus:ring-primary-indigo/20 resize-none"
                  placeholder="Your message details..."
                />
              </div>

              {/* Uiverse.io Button Integration */}
              <button
                type="button"
                className="relative inline-flex h-14 active:scale-95 transition overflow-hidden rounded-2xl p-[1px] focus:outline-none w-full"
              >
                <span
                  className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"
                >
                </span>
                <span
                  className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-7 text-lg font-bold text-white backdrop-blur-3xl gap-3 transition-colors hover:bg-slate-900"
                >
                  Contact me
                  <Send className="w-5 h-5 text-pink-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </form>
          </motion.div>
        </div>

        {/* ── Feedback / Review Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-accent-cyan mb-6">
              <ThumbsUp className="w-3 h-3" /> Share Your Feedback
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Help Us <span className="text-gradient">Improve.</span>
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Tell us what we&apos;re doing well and what we can do better. Every review directly shapes the future of CareerAI.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="glass-card p-10 md:p-12 border-white/10 relative overflow-hidden">
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent-cyan/10 blur-[100px] rounded-full" />

              {fbStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 relative z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-accent-cyan/20 border border-accent-cyan/30 flex items-center justify-center mx-auto mb-6">
                    <ThumbsUp className="w-10 h-10 text-accent-cyan" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                  <p className="text-text-muted">Your feedback has been received and will help us improve CareerAI.</p>
                  <button
                    onClick={() => setFbStatus("idle")}
                    className="mt-8 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all text-sm font-medium"
                  >
                    Submit Another Review
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-8 relative z-10">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-muted mb-3">Your Name</label>
                      <input
                        value={fbName}
                        onChange={e => setFbName(e.target.value)}
                        required
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-text-muted/30 focus:outline-none focus:border-accent-cyan transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-muted mb-3">Email (optional)</label>
                      <input
                        value={fbEmail}
                        onChange={e => setFbEmail(e.target.value)}
                        type="email"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-text-muted/30 focus:outline-none focus:border-accent-cyan transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-3">What area are you reviewing?</label>
                    <div className="flex flex-wrap gap-3">
                      {categories.map(cat => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setFbCategory(cat)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                            fbCategory === cat
                              ? "bg-accent-cyan/20 border-accent-cyan text-accent-cyan"
                              : "bg-white/5 border-white/10 text-text-muted hover:border-white/30"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-3">Overall Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setFbRating(star)}
                          className="transition-transform hover:scale-125"
                        >
                          <Star
                            className={`w-8 h-8 transition-colors ${
                              star <= fbRating ? "text-yellow-400 fill-yellow-400" : "text-white/20"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-text-muted text-sm">{fbRating}/5</span>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-3">What should we improve?</label>
                    <textarea
                      value={fbMessage}
                      onChange={e => setFbMessage(e.target.value)}
                      required
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-text-muted/30 focus:outline-none focus:border-accent-cyan transition-all resize-none"
                      placeholder="Share your honest thoughts — what works, what doesn't, what you'd love to see next..."
                    />
                  </div>

                  {fbStatus === "error" && (
                    <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={fbStatus === "loading"}
                    className="w-full py-4 bg-gradient-to-r from-accent-cyan/80 to-primary-indigo text-white font-bold rounded-2xl hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {fbStatus === "loading" ? (
                      <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <>
                        <ThumbsUp className="w-5 h-5" />
                        Submit Feedback
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
