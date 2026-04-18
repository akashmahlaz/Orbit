"use client"

import {
  FolderKanban,
  Users,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import type { Project, Lead } from "@/lib/types"

type SerializedProject = Omit<Project, "_id"> & { _id: string }
type SerializedLead = Omit<Lead, "_id"> & { _id: string }

const statusColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  "planning": "outline",
  "in-progress": "default",
  "review": "secondary",
  "completed": "secondary",
  "on-hold": "destructive",
}

const leadStatusColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  "new": "outline",
  "contacted": "secondary",
  "responded": "secondary",
  "qualified": "default",
  "proposal-sent": "default",
  "negotiation": "default",
  "won": "secondary",
  "lost": "destructive",
}

export function OverviewClient({
  projects,
  leads,
}: {
  projects: SerializedProject[]
  leads: SerializedLead[]
}) {
  const activeProjects = projects.filter((p) => p.status === "in-progress" || p.status === "review")
  const completedProjects = projects.filter((p) => p.status === "completed")
  const qualifiedLeads = leads.filter((l) => ["qualified", "proposal-sent", "negotiation", "won"].includes(l.status))
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget ?? 0), 0)

  // Chart data — leads by status
  const leadsByStatus = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(leadsByStatus).map(([status, count]) => ({
    status: status.replace("-", " "),
    count,
  }))

  const chartConfig = {
    count: { label: "Leads", color: "var(--color-primary)" },
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Projects</CardDescription>
            <CardTitle className="text-2xl">{projects.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FolderKanban className="size-3.5" />
              {activeProjects.length} active
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Active Projects</CardDescription>
            <CardTitle className="text-2xl">{activeProjects.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              In progress & review
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Leads</CardDescription>
            <CardTitle className="text-2xl">{leads.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="size-3.5" />
              {qualifiedLeads.length} qualified
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Total Budget</CardDescription>
            <CardTitle className="text-2xl">
              ${totalBudget.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="size-3.5" />
              Across all projects
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent projects */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Projects</CardTitle>
              <Link href="/dashboard/projects">
                <Button variant="ghost" size="sm">
                  View all <ArrowRight data-icon="inline-end" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {projects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FolderKanban className="size-10 text-muted-foreground/40" />
                <p className="mt-3 text-sm text-muted-foreground">No projects yet</p>
                <Link href="/dashboard/projects">
                  <Button variant="outline" size="sm" className="mt-3">
                    Create your first project
                  </Button>
                </Link>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.slice(0, 5).map((project) => {
                    const totalTasks = project.tasks?.length ?? 0
                    const doneTasks = project.tasks?.filter((t) => t.status === "done").length ?? 0
                    const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

                    return (
                      <TableRow key={project._id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{project.name}</p>
                            <p className="text-xs text-muted-foreground">{project.client?.name}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusColors[project.status] ?? "outline"}>
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={project.priority === "urgent" ? "destructive" : "secondary"}>
                            {project.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={pct} className="w-20" />
                            <span className="text-xs text-muted-foreground">{pct}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Lead pipeline chart */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Lead Pipeline</CardTitle>
            <CardDescription>{leads.length} total leads</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            {leads.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Users className="size-10 text-muted-foreground/40" />
                <p className="mt-3 text-sm text-muted-foreground">No leads yet</p>
                <Link href="/dashboard/leads">
                  <Button variant="outline" size="sm" className="mt-3">
                    Add your first lead
                  </Button>
                </Link>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="h-48 w-full">
                <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 12 }}>
                  <YAxis dataKey="status" type="category" width={80} tickLine={false} axisLine={false} className="text-xs capitalize" />
                  <XAxis type="number" hide />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-primary)" radius={4} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent leads table */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <CardTitle>Recent Leads</CardTitle>
            <Link href="/dashboard/leads">
              <Button variant="ghost" size="sm">
                View all <ArrowRight data-icon="inline-end" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="size-10 text-muted-foreground/40" />
              <p className="mt-3 text-sm text-muted-foreground">No leads yet</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.slice(0, 5).map((lead) => (
                  <TableRow key={lead._id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{lead.company || "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.source}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={leadStatusColors[lead.status] ?? "outline"}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "—"}
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
