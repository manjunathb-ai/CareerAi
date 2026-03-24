"use client";

import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const plans = [
  {
    name: "Free",
    price: "₹0",
    desc: "Perfect for exploring the AI capabilities.",
    features: ["1 AI Resume Scan", "Basic Portfolio Theme", "1 Mock Interview Session", "Community Support"],
    popular: false,
    cta: "Start Free",
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    desc: "Supercharge your career growth securely.",
    features: ["Unlimited Resumes", "5 Premium Portfolio Themes", "10 Mock Interviews/month", "Real-time Voice Analysis", "Priority Support"],
    popular: true,
    cta: "Upgrade to Pro",
    priceId: "price_pro_simulation",
  },
  {
    name: "Premium",
    price: "₹2999",
    period: "/month",
    desc: "For those aiming for 20 LPA+ roles.",
    features: ["Everything in Pro", "Unlimited Mock Interviews", "Custom Domain for Portfolio", "1-on-1 Expert Review (AI Guided)", "24/7 Priority Support"],
    popular: false,
    cta: "Go Premium",
    priceId: "price_premium123",
  }
];

export default function PricingSection() {
  const [loadingPlan, setLoadingPlan] = useState<number | null>(null);
  const router = useRouter();

  const handleCheckout = async (planIndex: number, priceId?: string) => {
    if (!priceId) {
      router.push("/register");
      return;
    }
    
    setLoadingPlan(planIndex);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId })
      });
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        router.push("/dashboard?success=true");
      }
    } catch (err: unknown) {
      router.push("/dashboard?success=true");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Invest in your <span className="text-gradient">Trajectory.</span>
          </motion.h2>
          <p className="text-xl text-text-muted">Transparent pricing for every stage of your career.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`glass-card p-8 lg:p-10 relative ${plan.popular ? 'border-primary-indigo shadow-[0_0_40px_rgba(99,102,241,0.2)] md:-translate-y-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-primary-indigo to-accent-cyan rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-text-muted mb-6 text-sm h-10">{plan.desc}</p>
              
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-text-muted">{plan.period}</span>}
              </div>

              <button 
                onClick={() => handleCheckout(idx, plan.priceId)}
                disabled={loadingPlan === idx}
                className={`block w-full flex items-center justify-center gap-2 py-4 rounded-full font-semibold transition-all ${plan.popular ? 'bg-primary-indigo text-white hover:bg-opacity-90 shadow-[0_4px_20px_rgba(99,102,241,0.3)]' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'} disabled:opacity-50`}
              >
                {loadingPlan === idx ? <Loader2 className="w-5 h-5 animate-spin" /> : plan.cta}
              </button>

              <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent-cyan shrink-0" />
                    <span className="text-text-muted text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
