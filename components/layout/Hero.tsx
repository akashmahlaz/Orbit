"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const spring = { type: "spring" as const, stiffness: 100, damping: 20 };

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.4,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: spring,
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative isolate w-full min-h-0 flex-1 overflow-hidden bg-zinc-950">
      {/* ── Video Background ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0 "
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          style={{ willChange: "transform" }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Right-bottom content ── */}
      <div className="relative z-10 flex h-full items-end justify-end">
        <div className="w-full max-w-xl px-6 pb-28 md:px-10 md:pb-36 md:pr-16 lg:pr-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-end gap-5 text-right"
          >
            <div>
              <motion.h1
                variants={fadeUp}
                className="text-3xl font-bold tracking-tighter leading-[0.95] text-white md:text-5xl lg:text-6xl"
              >
                Ship projects. <br /><span className="text-orange-400">Close deals.</span>
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="mt-3 ml-auto max-w-[44ch] text-sm text-white/50 md:text-base"
              >
                Project tracking, CRM, and GitHub visibility — one workspace.
              </motion.p>
            </div>

            <motion.div variants={fadeUp}>
              <button className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-orange-400 active:scale-[0.98] active:-translate-y-px">
                Get Started
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
