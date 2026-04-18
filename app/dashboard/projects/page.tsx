import { auth } from "@/auth"
import { projectsCollection } from "@/lib/models"
import { ProjectsClient } from "@/components/dashboard/projects-client"

export default async function ProjectsPage() {
  const session = await auth()
  const email = session?.user?.email ?? ""

  const projects = await projectsCollection()
    .find({ userId: email })
    .sort({ updatedAt: -1 })
    .toArray()

  const serialized = projects.map((p) => ({ ...p, _id: p._id.toString() }))

  return <ProjectsClient projects={serialized} />
}
