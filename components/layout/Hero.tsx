"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight,  Users, BarChart3, CheckCircle2 } from "lucide-react";
import Link from "next/link";

// ============================================================================
// 1. OBJECT LITERALS (Data separated from UI)
// ============================================================================
const recentCommits = [
  { id: "c1", repo: "orbit-core", message: "Refactored lead scoring function", time: "2m ago" },
  { id: "c2", repo: "client-dashboard", message: "Updated UI layout", time: "1h ago" },
];

// ============================================================================
// 2. THE GRADIENT STATS CARD (Your snippet, contained as a component)
// First-class function returning just this piece of the UI.
// ============================================================================
const UniqueStatsCard = () => {
  return (
    <div className="relative w-full h-48 bg-gray-950 rounded-2xl overflow-hidden flex flex-col justify-end p-6 font-sans shadow-2xl border border-gray-800">
      
      {/* The Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-emerald-600 rounded-full filter blur-[70px] opacity-40"></div>
      <div className="absolute -bottom-10 -right-10 w-[50%] h-[70%] bg-blue-600 rounded-full filter blur-[80px] opacity-30"></div>

      {/* The Grainy Noise Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* The Content */}
      <div className="relative z-10 w-full flex justify-between items-end text-white">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-3xl font-bold tracking-tight">1,284</h2>
          <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">Leads Generated</p>
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-3xl font-bold tracking-tight">94%</h2>
          <p className="text-xs text-gray-300 font-medium uppercase tracking-wider">Conversion Rate</p>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. MAIN HERO COMPONENT (The Professional Split Layout)
// ============================================================================
export default function ProfessionalHero() {
  return (
    <div className="relative min-h-screen w-full bg-[#FAFAFA] flex items-center pt-20 overflow-hidden font-sans">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* --- LEFT COLUMN: Typography & Business Value --- */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm w-fit mb-8">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-[13px] font-semibold text-gray-600 tracking-wide uppercase">
              Agency Operating System
            </span>
          </div>

          <h1 className="text-5xl lg:text-[4rem] font-bold text-gray-950 tracking-tight leading-[1.05] mb-6">
            End the chaos. <br />
            Command your <span className="text-emerald-600">agency.</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-lg mb-10 leading-relaxed">
            Stop waking up confused about priorities. Orbit provides perfect clarity by unifying your high-velocity lead generation with real-time GitHub project tracking.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-white bg-gray-950 hover:bg-gray-800 transition-colors rounded-lg shadow-md w-full sm:w-auto">
              Open Workspace
              <ArrowRight size={16} />
            </button>
            <Link href="/demo" className="flex items-center justify-center gap-2 px-8 py-3.5 text-[15px] font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors rounded-lg shadow-sm w-full sm:w-auto">
              View Documentation
            </Link>
          </div>
        </motion.div>

        {/* --- RIGHT COLUMN: The "Unique System" Visual Stack --- */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="relative w-full"
        >
          {/* A subtle background pattern just behind the cards to ground them */}
          <div className="absolute inset-0 -m-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 z-0"></div>

          <div className="relative z-10 flex flex-col gap-6">
            
            {/* Top Card: GitHub Integration (Clean, Light Theme) */}
            <div className="w-full md:w-[90%] ml-auto bg-white border border-gray-200 rounded-2xl p-6 shadow-xl shadow-gray-200/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                  Recent Commits
                </div>
                <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md">Synced</span>
              </div>
              
              <div className="flex flex-col gap-4">
                {/* 3. DESTRUCTURING the object literals */}
                {recentCommits.map(({ id, repo, message, time }) => (
                  <div key={id} className="flex gap-3">
                    <CheckCircle2 size={16} className="text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-[13px] font-bold text-gray-900">{repo}</p>
                      <p className="text-[13px] text-gray-500">{message}</p>
                    </div>
                    <span className="ml-auto text-[12px] text-gray-400 font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Card: The dark, premium stats card you provided */}
            <div className="w-full md:w-[95%] mr-auto z-20 -mt-8">
              <UniqueStatsCard />
            </div>

            {/* Floating Element: Priority Badge */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-1/3 bg-white border border-gray-200 p-4 rounded-xl shadow-lg flex items-center gap-3 z-30"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <BarChart3 size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Daily Priority</p>
                <p className="text-sm font-bold text-gray-900">Client Onboarding</p>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}