import client from "@/lib/db"
import type { Project, Lead } from "@/lib/types"

const db = client.db("orbit")

export const projectsCollection = () => db.collection<Project>("projects")
export const leadsCollection = () => db.collection<Lead>("leads")
