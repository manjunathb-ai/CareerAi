"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github, Mail, Globe, MapPin } from "lucide-react";
import Logo from "../ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-bg-deep pt-24 pb-12 border-t border-white/5 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-primary-indigo/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand Identity */}
          <div className="flex flex-col items-start gap-6">
            <Link href="/">
              <Logo orientation="horizontal" className="h-8" />
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              The world's most advanced AI-powered career growth platform. Building the future of professional branding and job hunting.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Mail, href: "mailto:hello@careerai.saas" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-accent-cyan/30 transition-all group"
                >
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Productivity */}
          <div>
            <h4 className="text-white font-bold mb-6 italic tracking-tight uppercase text-xs">AI Intelligence</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/dashboard/resume" className="text-text-muted hover:text-white text-sm transition-colors">Resume Optimizer</Link></li>
              <li><Link href="/dashboard/portfolio" className="text-text-muted hover:text-white text-sm transition-colors">Portfolio Generator</Link></li>
              <li><Link href="/dashboard/interview" className="text-text-muted hover:text-white text-sm transition-colors">AI Interview Coach</Link></li>
              <li><Link href="/jobs" className="text-text-muted hover:text-white text-sm transition-colors">Indian Job Live Feed</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6 italic tracking-tight uppercase text-xs">The Mission</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/services" className="text-text-muted hover:text-white text-sm transition-colors">Our Capabilities</Link></li>
              <li><Link href="/pricing" className="text-text-muted hover:text-white text-sm transition-colors">Premium Plans</Link></li>
              <li><Link href="/about" className="text-text-muted hover:text-white text-sm transition-colors">Our Vision</Link></li>
              <li><Link href="/contact" className="text-text-muted hover:text-white text-sm transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          {/* Global Presence */}
          <div className="flex flex-col items-start gap-4">
            <h4 className="text-white font-bold mb-6 italic tracking-tight uppercase text-xs">Headquarters</h4>
            <div className="flex items-center gap-3 text-text-muted text-sm group">
              <MapPin className="w-5 h-5 text-accent-cyan group-hover:scale-110 transition-transform" />
              <span>Bangalore, India</span>
            </div>
            <div className="flex items-center gap-3 text-text-muted text-sm group">
              <Globe className="w-5 h-5 text-accent-cyan group-hover:scale-110 transition-transform" />
              <span>Global AI Operations Active</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-text-muted text-xs font-medium">
            &copy; {currentYear} CAREER AI. All rights strictly reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-text-muted hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-text-muted hover:text-white text-xs transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-text-muted hover:text-white text-xs transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
