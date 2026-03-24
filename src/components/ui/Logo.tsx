"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  showText?: boolean;
  orientation?: "vertical" | "horizontal";
}

/**
 * Logo Component:
 * Recreates the "Neural Brain" branding from the user-provided image.
 * - Icon: Profile of a human head with neural nodes and pathways.
 * - Text: "CAREER AI" using the Sigmar (Nufal-style) font.
 * - Subtext: "YOUR AI CAREER ASSISTANT"
 */
export default function Logo({ 
  className = "", 
  showText = true,
  orientation = "vertical"
}: LogoProps) {
  const isVertical = orientation === "vertical";

  return (
    <div className={`flex ${isVertical ? "flex-col items-center gap-2" : "flex-row items-center gap-4"} group cursor-default ${className}`}>
      {/* Neural Brain SVG Icon */}
      <div className={`relative ${isVertical ? "w-20 h-20 md:w-24 md:h-24" : "w-10 h-10"}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]"
        >
          {/* Head Profile Outline */}
          <path
            d="M30 75C25 70 20 60 20 50C20 35 35 20 50 20C65 20 80 35 80 50C80 65 65 80 50 80"
            stroke="url(#logo-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          
          {/* Neural Pathways (Curved Lines) */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M45 25C55 25 65 35 65 50C65 65 55 75 45 75"
            stroke="url(#logo-gradient)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            d="M55 35C65 35 75 45 75 60C75 75 65 85 55 85"
            stroke="url(#logo-gradient)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />

          {/* Neural Nodes (Circles) */}
          {[
            { x: 45, y: 25 }, { x: 65, y: 50 }, { x: 45, y: 75 },
            { x: 55, y: 35 }, { x: 75, y: 60 }, { x: 55, y: 85 }
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="2.5"
              fill="url(#logo-gradient)"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Definitions */}
          <defs>
            <linearGradient id="logo-gradient" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FB923C" /> {/* Orange */}
              <stop offset="100%" stopColor="#DB2777" /> {/* Pink */}
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className={`flex flex-col ${isVertical ? "items-center" : "items-start"}`}>
          <h2 className={`${isVertical ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"} font-normal tracking-[0.1em] text-white font-sigmar leading-none`}>
            CAREER AI
          </h2>
          {isVertical && (
            <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-accent-cyan/80 uppercase mt-1">
              Your AI Career Assistant
            </p>
          )}
        </div>
      )}
    </div>
  );
}
