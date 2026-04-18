"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
  Plus,
  Users,
  Search,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { Lead, LeadStatus, LeadSource } from "@/lib/types"

type SerializedLead = Omit<Lead, "_id"> & { _id: string }

const statusColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  "new": "outline",
  "contacted": "secondary",
  "responded": "secondary",
  "qualified": "default",
  "proposal-sent": "default",
  "negotiation": "default",
  "won": "secondary",
  "lost": "destructive",
}

const sourceLabels: Record<LeadSource, string> = {
  "linkedin": "LinkedIn",
  "upwork": "Upwork",
  "fiverr": "Fiverr",
  "referral": "Referral",
  "website": "Website",
  "cold-outreach": "Cold Outreach",
  "other": "Other",
}

const statusSteps: LeadStatus[] = ["new", "contacted", "responded", "qualified", "proposal-sent", "negotiation", "won"]

export function LeadsClient({ leads: initialLeads }: { leads: SerializedLead[] }) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const filtered = initialLeads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company?.toLowerCase().includes(search.toLowerCase()) ||
      l.email?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || l.status === statusFilter
    return matchesSearch && matchesStatus
  })

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    const fd = new FormData(e.currentTarget)

    const body = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone") ?? "",
      company: fd.get("company") ?? "",
      source: fd.get("source") ?? "other",
      status: fd.get("status") ?? "new",
      applyLink: fd.get("applyLink") ?? "",
      leadResponse: "",
      ourAction: "",
      notes: fd.get("notes") ?? "",
    }

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    setSaving(false)
    setOpen(false)
    router.refresh()
  }

  // Pipeline counts
  const pipeline = statusSteps.map((s) => ({
    status: s,
    count: initialLeads.filter((l) => l.status === s).length,
  }))
  const lostCount = initialLeads.filter((l) => l.status === "lost").length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Leads</h1>
          <p className="text-sm text-muted-foreground">{initialLeads.length} leads in your pipeline</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={
            <Button>
              <Plus data-icon="inline-start" />
              New Lead
            </Button>
          } />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Lead</DialogTitle>
              <DialogDescription>Add a new lead to your CRM pipeline.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="John Doe" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="john@company.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" placeholder="+1 234 567 8900" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" placeholder="Acme Corp" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="source">Source</Label>
                  <Select name="source" defaultValue="linkedin">
                    <SelectTrigger id="source"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {Object.entries(sourceLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue="new">
                    <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="responded">Responded</SelectItem>
                        <SelectItem value="qualified">Qualified</SelectItem>
                        <SelectItem value="proposal-sent">Proposal Sent</SelectItem>
                        <SelectItem value="negotiation">Negotiation</SelectItem>
                        <SelectItem value="won">Won</SelectItem>
                        <SelectItem value="lost">Lost</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="applyLink">Apply / Job Link</Label>
                <Input id="applyLink" name="applyLink" placeholder="https://..." />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" name="notes" placeholder="Any notes about this lead..." rows={3} />
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline">Cancel</Button>} />
                <Button type="submit" disabled={saving}>
                  {saving ? "Adding..." : "Add Lead"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pipeline overview */}
      <div className="grid gap-3 sm:grid-cols-4 lg:grid-cols-8">
        {pipeline.map((p) => (
          <Card key={p.status} size="sm" className={statusFilter === p.status ? "ring-2 ring-primary" : "cursor-pointer"} onClick={() => setStatusFilter(statusFilter === p.status ? "all" : p.status)}>
            <CardContent className="flex flex-col items-center gap-1 py-3">
              <span className="text-lg font-semibold tabular-nums">{p.count}</span>
              <span className="text-xs capitalize text-muted-foreground">{p.status.replace("-", " ")}</span>
            </CardContent>
          </Card>
        ))}
        <Card size="sm" className={statusFilter === "lost" ? "ring-2 ring-destructive" : "cursor-pointer"} onClick={() => setStatusFilter(statusFilter === "lost" ? "all" : "lost")}>
          <CardContent className="flex flex-col items-center gap-1 py-3">
            <span className="text-lg font-semibold tabular-nums text-destructive">{lostCount}</span>
            <span className="text-xs text-muted-foreground">Lost</span>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        {statusFilter !== "all" && (
          <Button variant="ghost" size="sm" onClick={() => setStatusFilter("all")}>
            Clear filter
          </Button>
        )}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="size-12 text-muted-foreground/30" />
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {search || statusFilter !== "all" ? "No leads match your filter" : "No leads yet"}
              </p>
              {!search && statusFilter === "all" && (
                <Button variant="outline" size="sm" className="mt-3" onClick={() => setOpen(true)}>
                  Add your first lead
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((lead) => (
                  <TableRow key={lead._id}>
                    <TableCell>
                      <p className="font-medium">{lead.name}</p>
                      {lead.phone && <p className="text-xs text-muted-foreground">{lead.phone}</p>}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{lead.company || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{sourceLabels[lead.source] ?? lead.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusColors[lead.status] ?? "outline"}>
                        {lead.status.replace("-", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{lead.email}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {lead.createdAt ? format(new Date(lead.createdAt), "MMM d, yyyy") : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
