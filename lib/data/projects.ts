export type Project = {
  id: string
  name: string
  taskCount: number
  progress: number
  startDate: Date
  endDate: Date
  status: "backlog" | "planned" | "active" | "cancelled" | "completed"
  priority: "urgent" | "high" | "medium" | "low"
  tags: string[]
  members: string[]
  tasks: Array<{
    id: string
    name: string
    assignee: string
    status: "todo" | "in-progress" | "done"
    startDate: Date
    endDate: Date
  }>
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Fintech Mobile App Redesign",
    taskCount: 4,
    progress: 80,
    startDate: new Date(2025, 9, 25),
    endDate: new Date(2025, 10, 7),
    status: "active",
    priority: "high",
    tags: ["frontend", "feature"],
    members: ["jason duong"],
    tasks: [
      {
        id: "1-1",
        name: "Brainstorm, IA",
        assignee: "JD",
        status: "done",
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
      {
        id: "1-2",
        name: "Wireframe layout",
        assignee: "JD",
        status: "todo",
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
      {
        id: "1-3",
        name: "Demo 3 concept",
        assignee: "JD",
        status: "todo",
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
      {
        id: "1-4",
        name: "UI Other screens",
        assignee: "JD",
        status: "todo",
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
    ],
  },
  {
    id: "2",
    name: "Internal PM System",
    taskCount: 8,
    progress: 45,
    startDate: new Date(2025, 9, 25),
    endDate: new Date(2025, 10, 7),
    status: "planned",
    priority: "medium",
    tags: ["backend"],
    members: [],
    tasks: [],
  },
  {
    id: "3",
    name: "AI Learning Platform",
    taskCount: 2,
    progress: 70,
    startDate: new Date(2025, 9, 25),
    endDate: new Date(2025, 10, 7),
    status: "active",
    priority: "urgent",
    tags: ["feature", "urgent"],
    members: ["jason duong"],
    tasks: [
      {
        id: "3-1",
        name: "UI Other screens",
        assignee: "JD",
        status: "todo",
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
      {
        id: "3-2",
        name: "Payment intergration",
        assignee: "JD",
        status: "todo",
        startDate: new Date(2025, 9, 25),
        endDate: new Date(2025, 10, 7),
      },
    ],
  },
  {
    id: "4",
    name: "Internal CRM System",
    taskCount: 8,
    progress: 30,
    startDate: new Date(2025, 9, 25),
    endDate: new Date(2025, 10, 7),
    status: "backlog",
    priority: "low",
    tags: ["bug"],
    members: [],
    tasks: [],
  },
  {
    id: "5",
    name: "Ecommerce website",
    taskCount: 4,
    progress: 55,
    startDate: new Date(2025, 9, 25),
    endDate: new Date(2025, 10, 7),
    status: "completed",
    priority: "medium",
    tags: ["frontend"],
    members: ["jason duong"],
    tasks: [],
  },
]

export type FilterCounts = {
  status?: Record<string, number>
  priority?: Record<string, number>
  tags?: Record<string, number>
  members?: Record<string, number>
}

export function computeFilterCounts(list: Project[]): FilterCounts {
  const res: FilterCounts = {
    status: {},
    priority: {},
    tags: {},
    members: {},
  }
  for (const p of list) {
    // status
    res.status![p.status] = (res.status![p.status] || 0) + 1
    // priority
    res.priority![p.priority] = (res.priority![p.priority] || 0) + 1
    // tags
    for (const t of p.tags) {
      const id = t.toLowerCase()
      res.tags![id] = (res.tags![id] || 0) + 1
    }
    // members buckets
    if (p.members.length === 0) {
      res.members!["no-member"] = (res.members!["no-member"] || 0) + 1
    }
    if (p.members.length > 0) {
      res.members!["current"] = (res.members!["current"] || 0) + 1
    }
    if (p.members.some((m) => m.toLowerCase() === "jason duong")) {
      res.members!["jason"] = (res.members!["jason"] || 0) + 1
    }
  }
  return res
}
