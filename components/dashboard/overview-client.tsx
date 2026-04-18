"use client"

import {
  FolderKanban,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import type { Route } from "next"
import { BlurFade } from "@/components/ui/blur-fade"
import { cn } from "@/lib/utils"
import type { Project, Lead } from "@/lib/types"

type SerializedProject = Omit<Project, "_id"> & { _id: string }
type SerializedLead = Omit<Lead, "_id"> & { _id: string }

const statusColor: Record<string, string> = {
  "planning": "bg-neutral-400",
  "in-progress": "bg-amber-500",
  "review": "bg-blue-500",
  "completed": "bg-emerald-500",
  "on-hold": "bg-red-500",
}

const statusBadge: Record<string, string> = {
  "planning": "bg-neutral-100 text-neutral-500",
  "in-progress": "bg-amber-50 text-amber-700",
  "review": "bg-blue-50 text-blue-700",
  "completed": "bg-emerald-50 text-emerald-700",
  "on-hold": "bg-red-50 text-red-600",
}

const leadStatusBadge: Record<string, string> = {
  "new": "bg-neutral-100 text-neutral-500",
  "contacted": "bg-blue-50 text-blue-700",
  "responded": "bg-cyan-50 text-cyan-700",
  "qualified": "bg-emerald-50 text-emerald-700",
  "proposal-sent": "bg-amber-50 text-amber-700",
  "negotiation": "bg-purple-50 text-purple-700",
  "won": "bg-emerald-50 text-emerald-700",
  "lost": "bg-red-50 text-red-600",
}

export function OverviewClient({
  projects,
  leads,
}: {
  projects: SerializedProject[]
  leads: SerializedLead[]
}) {
  const activeProjects = projects.filter((p) => p.status === "in-progress" || p.status === "review")
  const qualifiedLeads = leads.filter((l) => ["qualified", "proposal-sent", "negotiation", "won"].includes(l.status))
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget ?? 0), 0)

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <BlurFade inView delay={0}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-black tracking-[-0.03em] text-neutral-900">
              Overview
            </h1>
            <p className="mt-1 text-[14px] text-neutral-500">
              Your workspace at a glance.
            </p>
          </div>
          <Link
            href={"/dashboard/projects" as Route}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-neutral-700 active:scale-[0.97]"
          >
            <FolderKanban className="size-3.5" />
            New Project
          </Link>
        </div>
      </BlurFade>

      {/* Stat cards */}
      <BlurFade inView delay={0.05}>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-neutral-100">
                <FolderKanban className="size-4.5 text-neutral-600" />
              </div>
              <div>
                <p className="text-[12px] font-medium text-neutral-400">Total projects</p>
                <p className="text-[28px] font-black tracking-[-0.03em] text-neutral-900">
                  {projects.length}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50">
                <TrendingUp className="size-4.5 text-amber-600" />
              </div>
              <div>
                <p className="text-[12px] font-medium text-neutral-400">Active</p>
                <p className="text-[28px] font-black tracking-[-0.03em] text-amber-600">
                  {activeProjects.length}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50">
                <Users className="size-4.5 text-blue-600" />
              </div>
              <div>
                <p className="text-[12px] font-medium text-neutral-400">Total leads</p>
                <p className="text-[28px] font-black tracking-[-0.03em] text-blue-600">
                  {leads.length}
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50">
                <CheckCircle2 className="size-4.5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[12px] font-medium text-neutral-400">Total budget</p>
                <p className="text-[28px] font-black tracking-[-0.03em] text-neutral-900">
                  ${totalBudget.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Recent projects */}
      <BlurFade inView delay={0.1}>
        <div className="mb-8 rounded-2xl border border-neutral-200 bg-white">
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <h2 className="text-[15px] font-bold text-neutral-900">Recent Projects</h2>
            <Link href={"/dashboard/projects" as Route} className="text-[12px] font-medium text-neutral-400 hover:text-neutral-700">
              View all &rarr;
            </Link>
          </div>

          {projects.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-neutral-100">
                <FolderKanban className="size-5 text-neutral-400" />
              </div>
              <p className="text-[14px] font-medium text-neutral-500">No projects yet</p>
              <Link
                href={"/dashboard/projects" as Route}
                className="rounded-full bg-neutral-900 px-4 py-2 text-[12px] font-semibold text-white hover:bg-neutral-700"
              >
                Create your first project
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {projects.slice(0, 5).map((project) => (
                <div
                  key={project._id}
                  className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-neutral-50"
                >
                  <div className={cn("size-2 rounded-full", statusColor[project.status] ?? "bg-neutral-400")} />
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-neutral-900">{project.name}</p>
                    <p className="text-[11px] text-neutral-400">
                      {project.client?.name ?? "No client"} &middot; {project.priority}
                    </p>
                  </div>
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                    statusBadge[project.status] ?? "bg-neutral-100 text-neutral-500",
                  )}>
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </BlurFade>

      {/* Recent leads */}
      <BlurFade inView delay={0.15}>
        <div className="rounded-2xl border border-neutral-200 bg-white">
          <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
            <h2 className="text-[15px] font-bold text-neutral-900">Recent Leads</h2>
            <Link href={"/dashboard/leads" as Route} className="text-[12px] font-medium text-neutral-400 hover:text-neutral-700">
              View all &rarr;
            </Link>
          </div>

          {leads.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-neutral-100">
                <Users className="size-5 text-neutral-400" />
              </div>
              <p className="text-[14px] font-medium text-neutral-500">No leads yet</p>
              <Link
                href={"/dashboard/leads" as Route}
                className="rounded-full bg-neutral-900 px-4 py-2 text-[12px] font-semibold text-white hover:bg-neutral-700"
              >
                Add your first lead
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {leads.slice(0, 5).map((lead) => (
                <div
                  key={lead._id}
                  className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-neutral-50"
                >
                  <div className="flex size-8 items-center justify-center rounded-full bg-neutral-100 text-[11px] font-bold text-neutral-600">
                    {lead.name?.charAt(0) ?? "?"}
                  </div>
                  <div className="flex-1">
                    <p className="text-[13px] font-semibold text-neutral-900">{lead.name}</p>
                    <p className="text-[11px] text-neutral-400">
                      {lead.company || "No company"} &middot; {lead.source}
                    </p>
                  </div>
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                    leadStatusBadge[lead.status] ?? "bg-neutral-100 text-neutral-500",
                  )}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </BlurFade>
    </div>
  )
}
