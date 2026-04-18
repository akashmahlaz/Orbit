"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import type { Route } from "next"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

type DropdownItem = { name: string; desc: string; href: string }
type DropdownSection = { title: string; items: DropdownItem[] }
type DropdownDef = { sections: DropdownSection[] }

const navItems: Array<{ label: string; href?: string; dropdown?: DropdownDef }> = [
  {
    label: "PLATFORM",
    dropdown: {
      sections: [
        {
          title: "Manage",
          items: [
            { name: "Projects", desc: "Track progress, deadlines, and budgets", href: "/dashboard/projects" },
            { name: "Leads & CRM", desc: "Pipeline from outreach to conversion", href: "/dashboard/leads" },
            { name: "Dashboard", desc: "Overview of everything at a glance", href: "/dashboard" },
          ],
        },
        {
          title: "Integrate",
          items: [
            { name: "GitHub Sync", desc: "Connect repos for dev visibility", href: "/dashboard" },
            { name: "Analytics", desc: "Charts, pipeline, and performance", href: "/dashboard" },
            { name: "Settings", desc: "Configure your workspace", href: "/dashboard/settings" },
          ],
        },
      ],
    },
  },
  {
    label: "SOLUTIONS",
    dropdown: {
      sections: [
        {
          title: "For Teams",
          items: [
            { name: "Agencies", desc: "Manage multiple clients from one dashboard", href: "#" },
            { name: "Freelancers", desc: "Track projects and close leads faster", href: "#" },
            { name: "Startups", desc: "Ship features and manage growth", href: "#" },
          ],
        },
        {
          title: "Use Cases",
          items: [
            { name: "Project Tracking", desc: "Tasks, milestones, and deadlines", href: "#" },
            { name: "Client Pipeline", desc: "Lead scoring and conversion tracking", href: "#" },
            { name: "Budget Management", desc: "Track spend across all projects", href: "#" },
          ],
        },
      ],
    },
  },
  { label: "PRICING", href: "/pricings" },
  { label: "DOCS", href: "#" },
]

export function NavDesktop() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120)
  }

  return (
    <div className="hidden items-center gap-0.5 md:flex">
      {navItems.map((item) =>
        item.dropdown ? (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => handleEnter(item.label)}
            onMouseLeave={handleLeave}
          >
            <button
              className={`flex items-center gap-1 rounded-md px-3.5 py-2 text-[11px] font-bold tracking-widest transition-colors ${
                activeDropdown === item.label
                  ? "text-neutral-900"
                  : "text-neutral-400 hover:text-neutral-700"
              }`}
            >
              {item.label}
              <ChevronDown
                className={`size-3 transition-transform duration-200 ${
                  activeDropdown === item.label ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {activeDropdown === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.13 }}
                  className="absolute left-1/2 top-full mt-1 min-w-85 -translate-x-1/2 rounded-2xl border border-neutral-100 bg-white p-5 shadow-xl shadow-neutral-200/60"
                  onMouseEnter={() => handleEnter(item.label)}
                  onMouseLeave={handleLeave}
                >
                  {/* Arrow pointer */}
                  <div className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-l border-t border-neutral-100 bg-white" />

                  <div
                    className={`grid gap-6 ${
                      item.dropdown.sections.length > 1 ? "grid-cols-2" : "grid-cols-1"
                    }`}
                  >
                    {item.dropdown.sections.map((section) => (
                      <div key={section.title}>
                        <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-400">
                          {section.title}
                        </p>
                        <div className="space-y-0.5">
                          {section.items.map((di) => (
                            <Link
                              key={di.name}
                              href={di.href as Route}
                              onClick={() => setActiveDropdown(null)}
                              className="group flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-neutral-50"
                            >
                              <span className="text-[13px] font-semibold text-neutral-800 group-hover:text-neutral-900">
                                {di.name}
                              </span>
                              <span className="mt-0.5 text-[12px] leading-snug text-neutral-400">
                                {di.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            key={item.label}
            href={(item.href ?? "#") as Route}
            className="rounded-md px-3.5 py-2 text-[11px] font-bold tracking-widest text-neutral-400 transition-colors hover:text-neutral-700"
          >
            {item.label}
          </Link>
        )
      )}
    </div>
  )
}
