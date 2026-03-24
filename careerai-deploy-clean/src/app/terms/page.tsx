"use client";

import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

export default function TermsOfService() {
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
            <h1 className="text-4xl font-bold mb-4 text-white">Terms of Service</h1>
            <p className="text-text-muted">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
            <p className="text-text-muted leading-relaxed">
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&ldquo;you&rdquo;) 
              and CareerAI (&ldquo;we,&rdquo; &ldquo;us&rdquo; or &ldquo;our&rdquo;), concerning your access to and use of our website as well as any other media form, media channel, 
              mobile website or mobile application related, linked, or otherwise connected thereto.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">2. Intellectual Property Rights</h2>
            <p className="text-text-muted leading-relaxed">
              Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, 
              audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us.
              The AI-generated resumes and portfolios produced by the service are licensed to you for your personal career development use upon generation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">3. User Representations</h2>
            <p className="text-text-muted leading-relaxed">
              By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; 
              (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">4. Payment and Subscriptions</h2>
            <p className="text-text-muted leading-relaxed">
              We may provide paid products and/or services within the Service. In that case, we use third-party services for payment processing (e.g. Stripe).
              We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">5. Disclaimers</h2>
            <p className="text-text-muted leading-relaxed">
               The Site is provided on an as-is and as-available basis. You agree that your use of the Site and our services will be at your sole risk. 
              We make no warranties or representations about the accuracy or completeness of the site&apos;s content or the content of any websites linked to the site.
              We do not guarantee that the use of our services will result in securing employment or a specific job offer.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
