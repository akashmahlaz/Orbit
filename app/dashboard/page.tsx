import { auth } from "@/auth"
import { projectsCollection, leadsCollection } from "@/lib/models"
import { OverviewClient } from "@/components/dashboard/overview-client"

export default async function DashboardPage() {
  const session = await auth()
  const email = session?.user?.email ?? ""

  const [projects, leads] = await Promise.all([
    projectsCollection().find({ userId: email }).sort({ updatedAt: -1 }).toArray(),
    leadsCollection().find({ userId: email }).sort({ updatedAt: -1 }).toArray(),
  ])

  const serialized = {
    projects: projects.map((p) => ({ ...p, _id: p._id.toString() })),
    leads: leads.map((l) => ({ ...l, _id: l._id.toString() })),
  }

  return <OverviewClient projects={serialized.projects} leads={serialized.leads} />
}
