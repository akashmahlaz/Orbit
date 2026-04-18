"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import {
  Plus,
  FolderKanban,
  Search,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
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
import type { Project, ProjectStatus, ProjectPriority } from "@/lib/types"

type SerializedProject = Omit<Project, "_id"> & { _id: string }

const statusColors: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  "planning": "outline",
  "in-progress": "default",
  "review": "secondary",
  "completed": "secondary",
  "on-hold": "destructive",
}

export function ProjectsClient({ projects: initialProjects }: { projects: SerializedProject[] }) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  const filtered = initialProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client?.name?.toLowerCase().includes(search.toLowerCase())
  )

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    const fd = new FormData(e.currentTarget)

    const body = {
      name: fd.get("name"),
      description: fd.get("description"),
      client: {
        name: fd.get("clientName"),
        email: fd.get("clientEmail"),
        phone: fd.get("clientPhone") ?? "",
      },
      status: fd.get("status") ?? "planning",
      priority: fd.get("priority") ?? "medium",
      githubRepo: fd.get("githubRepo") ?? "",
      startDate: fd.get("startDate") ?? "",
      deadline: fd.get("deadline") ?? "",
      budget: Number(fd.get("budget")) || 0,
      notes: fd.get("notes") ?? "",
    }

    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    setSaving(false)
    setOpen(false)
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">{initialProjects.length} projects total</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={
            <Button>
              <Plus data-icon="inline-start" />
              New Project
            </Button>
          } />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Project</DialogTitle>
              <DialogDescription>Add a new project to your workspace.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Project Name</Label>
                  <Input id="name" name="name" required placeholder="Website Redesign" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input id="clientName" name="clientName" required placeholder="Acme Corp" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="clientEmail">Client Email</Label>
                  <Input id="clientEmail" name="clientEmail" type="email" required placeholder="client@example.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="budget">Budget ($)</Label>
                  <Input id="budget" name="budget" type="number" placeholder="5000" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" name="startDate" type="date" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" name="deadline" type="date" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue="planning">
                    <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="review">Review</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="priority">Priority</Label>
                  <Select name="priority" defaultValue="medium">
                    <SelectTrigger id="priority"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="githubRepo">GitHub Repo URL</Label>
                <Input id="githubRepo" name="githubRepo" placeholder="https://github.com/..." />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Brief project description..." rows={3} />
              </div>
              <DialogFooter>
                <DialogClose render={<Button variant="outline">Cancel</Button>} />
                <Button type="submit" disabled={saving}>
                  {saving ? "Creating..." : "Create Project"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FolderKanban className="size-12 text-muted-foreground/30" />
              <p className="mt-4 text-sm font-medium text-muted-foreground">
                {search ? "No projects match your search" : "No projects yet"}
              </p>
              {!search && (
                <Button variant="outline" size="sm" className="mt-3" onClick={() => setOpen(true)}>
                  Create your first project
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((project) => {
                  const totalTasks = project.tasks?.length ?? 0
                  const doneTasks = project.tasks?.filter((t) => t.status === "done").length ?? 0
                  const pct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

                  return (
                    <TableRow key={project._id}>
                      <TableCell>
                        <p className="font-medium">{project.name}</p>
                        <p className="max-w-50 truncate text-xs text-muted-foreground">{project.description}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{project.client?.name}</p>
                        <p className="text-xs text-muted-foreground">{project.client?.email}</p>
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
                      <TableCell className="tabular-nums">
                        ${(project.budget ?? 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {project.deadline ? format(new Date(project.deadline), "MMM d, yyyy") : "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={pct} className="w-16" />
                          <span className="text-xs text-muted-foreground tabular-nums">{pct}%</span>
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
    </div>
  )
}
