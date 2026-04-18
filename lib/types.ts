import { ObjectId } from "mongodb"

// ── Projects ──────────────────────────────────────────────

export type ProjectStatus = "planning" | "in-progress" | "review" | "completed" | "on-hold"
export type ProjectPriority = "low" | "medium" | "high" | "urgent"
export type TaskStatus = "todo" | "in-progress" | "done"

export interface ProjectTask {
  id: string
  title: string
  status: TaskStatus
  priority: ProjectPriority
}

export interface Project {
  _id?: ObjectId
  name: string
  description: string
  client: {
    name: string
    email: string
    phone: string
  }
  status: ProjectStatus
  priority: ProjectPriority
  githubRepo: string
  startDate: string
  deadline: string
  budget: number
  tasks: ProjectTask[]
  notes: string
  userId: string
  createdAt: string
  updatedAt: string
}

// ── Leads / CRM ──────────────────────────────────────────

export type LeadSource =
  | "linkedin"
  | "upwork"
  | "fiverr"
  | "referral"
  | "website"
  | "cold-outreach"
  | "other"

export type LeadStatus =
  | "new"
  | "contacted"
  | "responded"
  | "qualified"
  | "proposal-sent"
  | "negotiation"
  | "won"
  | "lost"

export interface Lead {
  _id?: ObjectId
  name: string
  email: string
  phone: string
  company: string
  source: LeadSource
  status: LeadStatus
  applyLink: string
  leadResponse: string
  ourAction: string
  usefulLinks: string[]
  notes: string
  userId: string
  createdAt: string
  updatedAt: string
}
