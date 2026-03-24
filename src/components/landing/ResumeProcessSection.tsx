"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, CheckCircle, Search, Settings, FileCheck, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: <Settings className="w-8 h-8 text-accent-cyan" />,
    title: "AI Customization",
    desc: "We craft resumes tailored to your skills with Expert Tips!",
    bgColor: "bg-accent-cyan/10",
  },
  {
    icon: <FileCheck className="w-8 h-8 text-primary-indigo" />,
    title: "Eye-Catching Templates",
    desc: "Choose from a variety of ATS-friendly designed templates",
    bgColor: "bg-primary-indigo/10",
  },
  {
    icon: <Search className="w-8 h-8 text-purple-400" />,
    title: "Say Goodbye to Typos",
    desc: "Built-in grammar and spell-check tools",
    bgColor: "bg-purple-400/10",
  },
];

const steps = [
  {
    step: "Step 1",
    title: "Select a Template",
    desc: "Explore our collection of templates to find one that suits your career path and style.",
    image: "/templates-preview.png", // We'll need to create this or use a placeholder
  },
  {
    step: "Step 2",
    title: "Enter Your Details with Ease",
    desc: "Fill in your background information and let our tool guide you to create a complete, polished resume.",
    image: "/details-preview.png",
  },
  {
    step: "Step 3",
    title: "Download with One Click",
    desc: "Review the final version, edit any sections if necessary, and download your resume. Apply with Confidence!",
    image: "/download-preview.png",
  },
];

export default function ResumeProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-20 text-center">
          <Link href="/dashboard/resume">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-lg shadow-lg shadow-emerald-500/20 mb-16 transition-all"
            >
              Create Resume
            </motion.button>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-full ${feature.bgColor} flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Curious about the process?</h2>
            <p className="text-xl text-text-muted">
              In just 3 steps, our AI resume builder will generate a <br className="hidden md:block" />
              stunning and professional resume for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-8 border border-white/10 group-hover:border-primary-indigo/30 transition-colors bg-white/5">
                   <Image 
                     src={step.image} 
                     alt={step.title}
                     fill
                     className="object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                </div>
                <h4 className="text-sm font-bold text-primary-indigo uppercase tracking-wider mb-2">{step.step}: {step.title}</h4>
                <p className="text-text-muted leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background blobs for premium feel */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary-indigo/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-cyan/10 blur-[100px] rounded-full -z-10" />
    </section>
  );
}
