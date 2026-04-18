import { auth } from "@/auth"
import { leadsCollection } from "@/lib/models"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const leads = await leadsCollection()
    .find({ userId: session.user.email })
    .sort({ updatedAt: -1 })
    .toArray()

  return NextResponse.json(leads)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const now = new Date().toISOString()

  const lead = {
    ...body,
    userId: session.user.email,
    usefulLinks: body.usefulLinks ?? [],
    createdAt: now,
    updatedAt: now,
  }

  const result = await leadsCollection().insertOne(lead)
  return NextResponse.json({ _id: result.insertedId, ...lead }, { status: 201 })
}
