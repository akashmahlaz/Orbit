"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

// 1. OBJECT LITERALS WITH NESTED DATA:
// We've added an optional 'children' array to items that need a dropdown.
const navItems = [
  { id: "leads", label: "AI Leads", href: "/leads" },
  { id: "docs", label: "Docs", href: "/docs" },
  { 
    id: "solutions", 
    label: "Solutions", 
    href: "/solutions",
    children: [
      { title: "Lead Generation", href: "/solutions/leads" },
      { title: "Project Tracking", href: "/solutions/projects" },
      { title: "Client CRM", href: "/solutions/crm" }
    ]
  },
  { id: "pricings", label: "Pricings", href: "/pricings" },
  { 
    id: "company", 
    label: "Company", 
    href: "/company",
    children: [
      { title: "About Obitz", href: "/company/about" },
      { title: "Our Team", href: "/company/team" }
    ]
  },
];

export default function EnterpriseNavbar() {
  // We use a single state to track which item the mouse is currently over
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-6 pointer-events-none">
      
      <nav 
        onMouseLeave={() => setActiveItem(null)}
        className="pointer-events-auto relative shadow-xl shadow-emerald-100/50 flex items-center justify-between w-full max-w-5xl px-6 py-3 bg-white/90 backdrop-blur-md rounded-full border border-gray-100/50"
      >
        
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-50 rounded-full flex items-center justify-center">
            <span className="text-emerald-500 font-bold text-lg leading-none">O</span>
          </div>
          <span className="font-bold text-[16px] tracking-tight text-gray-900">
            Obitz
          </span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const { id, label, href, children } = item;
            const isActive = activeItem === id;

            return (
              <div 
                key={id} 
                className="relative"
                onMouseEnter={() => setActiveItem(id)}
              >
                <Link
                  href={href}
                  className={`relative px-4 py-2 text-[14px] font-medium transition-colors flex items-center gap-1 z-10
                    ${isActive ? "text-emerald-900" : "text-gray-600 hover:text-gray-900"}`}
                >
                  {label}
                  
                  {/* Small chevron that rotates if there are children */}
                  {children && (
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform duration-200 opacity-60 ${isActive ? "rotate-180" : ""}`} 
                    />
                  )}
                  
                  {/* Framer Motion: The background pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-hover-pill"
                      className="absolute inset-0 bg-emerald-50/80 rounded-full -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Floating Dropdown Menu */}
                {children && (
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden py-2"
                      >
                        {children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className="block px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50 transition-colors mx-2 rounded-lg"
                            onClick={() => setActiveItem(null)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link 
            href="/login" 
            className="text-[14px] font-medium text-gray-600 hover:text-gray-900 hidden sm:block"
          >
            Sign In
          </Link>
          <button className="flex items-center gap-2 px-5 py-2.5 text-[14px] font-semibold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors rounded-full shadow-sm shadow-emerald-200">
            Dashboard
            <ArrowRight size={14} />
          </button>
        </div>

      </nav>
    </div>
  );
}