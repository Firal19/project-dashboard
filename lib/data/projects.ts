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

// Fixed reference date so the demo timeline stays stable over time.
// Adjust this if you want to "re-snapshot" the projects around a new date.
const _today = new Date(2024, 0, 23) // 23 Jan 2024
const _base = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate() - 7)
const _d = (offsetDays: number) => new Date(_base.getFullYear(), _base.getMonth(), _base.getDate() + offsetDays)

export const projects: Project[] = [
  {
    id: "1",
    name: "Fintech Mobile App Redesign",
    taskCount: 4,
    progress: 35,
    startDate: _d(3),
    endDate: _d(27),
    status: "active",
    priority: "high",
    tags: ["frontend", "feature"],
    members: ["jason duong"],
    tasks: [
      {
        id: "1-1",
        name: "Discovery & IA",
        assignee: "JD",
        status: "done",
        startDate: _d(3),
        endDate: _d(10),
      },
      {
        id: "1-2",
        name: "Wireframe layout",
        assignee: "JD",
        status: "in-progress",
        startDate: _d(7),
        endDate: _d(12),
      },
      {
        id: "1-3",
        name: "UI kit & visual design",
        assignee: "HP",
        status: "todo",
        startDate: _d(13),
        endDate: _d(19),
      },
      {
        id: "1-4",
        name: "Prototype & handoff",
        assignee: "HP",
        status: "todo",
        startDate: _d(20),
        endDate: _d(27),
      },
    ],
  },
  {
    id: "2",
    name: "Internal PM System",
    taskCount: 6,
    progress: 20,
    startDate: _d(3),
    endDate: _d(24),
    status: "active",
    priority: "medium",
    tags: ["backend"],
    members: ["jason duong"],
    tasks: [
      {
        id: "2-1",
        name: "Define MVP scope",
        assignee: "PM",
        status: "done",
        startDate: _d(3),
        endDate: _d(5),
      },
      {
        id: "2-2",
        name: "Database schema",
        assignee: "BE",
        status: "in-progress",
        startDate: _d(6),
        endDate: _d(10),
      },
      {
        id: "2-3",
        name: "API endpoints",
        assignee: "BE",
        status: "todo",
        startDate: _d(11),
        endDate: _d(15),
      },
      {
        id: "2-4",
        name: "Roles & permissions",
        assignee: "BE",
        status: "todo",
        startDate: _d(16),
        endDate: _d(18),
      },
      {
        id: "2-5",
        name: "UI implementation",
        assignee: "FE",
        status: "todo",
        startDate: _d(19),
        endDate: _d(21),
      },
      {
        id: "2-6",
        name: "QA & rollout",
        assignee: "QA",
        status: "todo",
        startDate: _d(22),
        endDate: _d(24),
      },
    ],
  },
  {
    id: "3",
    name: "AI Learning Platform",
    taskCount: 3,
    progress: 40,
    startDate: _d(14),
    endDate: _d(28),
    status: "active",
    priority: "urgent",
    tags: ["feature", "urgent"],
    members: ["jason duong"],
    tasks: [
      {
        id: "3-1",
        name: "Course outline",
        assignee: "JD",
        status: "done",
        startDate: _d(14),
        endDate: _d(16),
      },
      {
        id: "3-2",
        name: "Lesson player UI",
        assignee: "HP",
        status: "in-progress",
        startDate: _d(17),
        endDate: _d(23),
      },
      {
        id: "3-3",
        name: "Payment integration",
        assignee: "BE",
        status: "todo",
        startDate: _d(24),
        endDate: _d(28),
      },
    ],
  },
  {
    id: "4",
    name: "Internal CRM System",
    taskCount: 4,
    progress: 0,
    startDate: _d(18),
    endDate: _d(35),
    status: "backlog",
    priority: "low",
    tags: ["bug"],
    members: [],
    tasks: [
      {
        id: "4-1",
        name: "Requirements gathering",
        assignee: "PM",
        status: "todo",
        startDate: _d(18),
        endDate: _d(21),
      },
      {
        id: "4-2",
        name: "Data model",
        assignee: "BE",
        status: "todo",
        startDate: _d(22),
        endDate: _d(25),
      },
      {
        id: "4-3",
        name: "Core screens",
        assignee: "FE",
        status: "todo",
        startDate: _d(26),
        endDate: _d(31),
      },
      {
        id: "4-4",
        name: "QA & UAT",
        assignee: "QA",
        status: "todo",
        startDate: _d(32),
        endDate: _d(35),
      },
    ],
  },
  {
    id: "5",
    name: "Ecommerce website",
    taskCount: 5,
    progress: 100,
    startDate: _d(-7),
    endDate: _d(0),
    status: "completed",
    priority: "medium",
    tags: ["frontend"],
    members: ["jason duong"],
    tasks: [
      {
        id: "5-1",
        name: "IA & sitemap",
        assignee: "JD",
        status: "done",
        startDate: _d(-7),
        endDate: _d(-5),
      },
      {
        id: "5-2",
        name: "Product listing UI",
        assignee: "HP",
        status: "done",
        startDate: _d(-5),
        endDate: _d(-3),
      },
      {
        id: "5-3",
        name: "Cart & checkout flow",
        assignee: "HP",
        status: "done",
        startDate: _d(-3),
        endDate: _d(-1),
      },
      {
        id: "5-4",
        name: "Payment gateway",
        assignee: "BE",
        status: "done",
        startDate: _d(-1),
        endDate: _d(0),
      },
      {
        id: "5-5",
        name: "Launch checklist",
        assignee: "QA",
        status: "done",
        startDate: _d(-2),
        endDate: _d(0),
      },
    ],
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
