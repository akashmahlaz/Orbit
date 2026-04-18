import { auth } from "@/auth"
import { projectsCollection } from "@/lib/models"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const projects = await projectsCollection()
    .find({ userId: session.user.email })
    .sort({ updatedAt: -1 })
    .toArray()

  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const now = new Date().toISOString()

  const project = {
    ...body,
    userId: session.user.email,
    tasks: body.tasks ?? [],
    createdAt: now,
    updatedAt: now,
  }

  const result = await projectsCollection().insertOne(project)
  return NextResponse.json({ _id: result.insertedId, ...project }, { status: 201 })
}
