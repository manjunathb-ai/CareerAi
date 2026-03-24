"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bg-deep text-text-main font-sans selection:bg-primary-indigo selection:text-white pb-32">
      {/* Navbar handled globally */}
      
      <div className="max-w-4xl mx-auto px-6 pt-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 space-y-8"
        >
          <div className="border-b border-white/10 pb-8 mb-8">
            <h1 className="text-4xl font-bold mb-4 text-white">Privacy Policy</h1>
            <p className="text-text-muted">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p className="text-text-muted leading-relaxed">
              Welcome to CareerAI. We are committed to protecting your personal information and your right to privacy. 
              If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, 
              please contact us at support@careerai.com.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
            <p className="text-text-muted leading-relaxed">
              We collect personal information that you voluntarily provide to us when you register on the website, 
              express an interest in obtaining information about us or our products and services. The personal information 
              we collect depends on the context of your interactions with us and the website, but it may include: your name, 
              email address, job history, and resume data for AI processing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. How We Use Your Information</h2>
            <p className="text-text-muted leading-relaxed">
              We use personal information collected via our website for a variety of business purposes described below. 
              We process your personal information for these purposes in reliance on our legitimate business interests, 
              in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              Specifically, we use your resume data solely for the purpose of passing it through our AI models (OpenAI/Gemini) to generate your requested career materials.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">4. Will Your Information Be Shared?</h2>
            <p className="text-text-muted leading-relaxed">
              We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
              Specifically, your provided text data is securely transmitted to third-party LLM providers (Google Gemini / OpenAI) for generating your portfolios and resumes. These providers are not permitted to use your data to train their fundamental models.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">5. How Long Do We Keep Your Information?</h2>
            <p className="text-text-muted leading-relaxed">
              We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, 
              unless a longer retention period is required or permitted by law.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
