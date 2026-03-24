"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, Star, RefreshCw, MessageSquare, Inbox } from "lucide-react";

interface FeedbackEntry {
  id: string;
  name: string;
  email: string;
  category: string;
  rating: number;
  message: string;
  createdAt: string;
}

const categoryColors: Record<string, string> = {
  "Resume Builder": "text-primary-indigo bg-primary-indigo/10 border-primary-indigo/30",
  "Portfolio Generator": "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/30",
  "Interview Coach": "text-secondary-glow bg-secondary-glow/10 border-secondary-glow/30",
  "Job Updates": "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  "UI / Design": "text-pink-400 bg-pink-400/10 border-pink-400/30",
  "General Feedback": "text-white/60 bg-white/5 border-white/15",
};

export default function FeedbackDashboardPage() {
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setFeedback(data.feedback || []);
    } catch {
      setFeedback([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const categories = ["All", ...Object.keys(categoryColors)];
  const filtered = filter === "All" ? feedback : feedback.filter(f => f.category === filter);

  const avgRating = feedback.length
    ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1)
    : "—";

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
            <MessageSquare className="text-accent-cyan w-8 h-8" />
            User Feedback
          </h1>
          <p className="text-text-muted">Reviews submitted from the Contact page</p>
        </div>
        <button
          onClick={fetchFeedback}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white hover:bg-white/10 transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card p-6 border-t-2 border-t-accent-cyan">
          <p className="text-text-muted text-sm mb-1">Total Reviews</p>
          <p className="text-4xl font-bold text-white">{feedback.length}</p>
        </div>
        <div className="glass-card p-6 border-t-2 border-t-yellow-400">
          <p className="text-text-muted text-sm mb-1">Average Rating</p>
          <p className="text-4xl font-bold text-white flex items-center gap-2">
            {avgRating} <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          </p>
        </div>
        <div className="glass-card p-6 border-t-2 border-t-primary-indigo">
          <p className="text-text-muted text-sm mb-1">Latest Category</p>
          <p className="text-xl font-bold text-white">{feedback[0]?.category || "—"}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
              filter === cat
                ? "bg-accent-cyan/20 border-accent-cyan text-accent-cyan"
                : "bg-white/5 border-white/10 text-text-muted hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feedback List */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-white/20 border-t-accent-cyan rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <Inbox className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <p className="text-text-muted text-lg">No feedback yet.</p>
          <p className="text-text-muted/50 text-sm mt-1">Submissions from the contact page will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-card p-6 border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-indigo/30 to-accent-cyan/10 border border-white/10 flex items-center justify-center font-bold text-white text-sm">
                    {entry.name[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{entry.name}</p>
                    <p className="text-xs text-text-muted">{entry.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${categoryColors[entry.category] || "text-white/50 bg-white/5 border-white/10"}`}>
                    {entry.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-4 h-4 ${s <= entry.rating ? "text-yellow-400 fill-yellow-400" : "text-white/10"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-text-muted">
                    {new Date(entry.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-text-muted leading-relaxed border-l-2 border-accent-cyan/30 pl-4">
                {entry.message}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
