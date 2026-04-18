import { auth } from "@/auth"
import { leadsCollection } from "@/lib/models"
import { LeadsClient } from "@/components/dashboard/leads-client"

export default async function LeadsPage() {
  const session = await auth()
  const email = session?.user?.email ?? ""

  const leads = await leadsCollection()
    .find({ userId: email })
    .sort({ updatedAt: -1 })
    .toArray()

  const serialized = leads.map((l) => ({ ...l, _id: l._id.toString() }))

  return <LeadsClient leads={serialized} />
}
