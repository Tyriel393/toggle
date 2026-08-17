/*
 * Mock dataset shaped like a real digital agency using Toggl 2.0.
 * Field names follow the object model verified in docs/product-map.md.
 * Deterministic: generated from a seeded PRNG so the demo is stable across reloads.
 */

export type Role = 'Organization Owner' | 'Admin' | 'Member' | 'Contractor'
export type TaskStatus = 'Todo' | 'In Progress' | 'Blocked' | 'Done'
export type Priority = 'None' | 'Low' | 'Medium' | 'High' | 'Urgent'
export type ProjectStage = 'Active' | 'At risk' | 'Wrapping up' | 'Draft' | 'Archived'

export type Member = {
  id: string
  name: string
  title: string
  role: Role
  /* hours per weekday, Mon–Fri — several people are not full-time */
  workingHours: readonly [number, number, number, number, number]
  /* billed to the client */
  rate: number | null
  /* internal cost */
  cost: number
  color: string
}

export type Client = { id: string; name: string }

export type Project = {
  id: string
  name: string
  clientId: string
  color: string
  stage: ProjectStage
  billable: boolean
  rate: number | null
  fixedFee: number | null
  startDate: string
  endDate: string
  tags: readonly string[]
}

export type Task = {
  id: string
  projectId: string
  name: string
  status: TaskStatus
  priority: Priority
  /* hours */
  estimate: number
  assigneeIds: readonly string[]
  startDate: string
  dueDate: string
}

export type TimeEntry = {
  id: string
  taskId: string
  memberId: string
  date: string
  hours: number
  billable: boolean
  description: string
}

export type TimeOff = {
  id: string
  memberId: string
  type: 'Holiday' | 'Vacation' | 'Sick' | 'Public holiday'
  startDate: string
  endDate: string
  status: 'Approved' | 'Pending'
}

/* ---------- deterministic PRNG ---------- */

function mulberry32(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(20260817)

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(rand() * items.length)]
}

function round(n: number, step: number): number {
  return Math.round(n / step) * step
}

/* ---------- palette (Toggl's 12 project colours) ---------- */

const DATA = [
  '#dd3919', '#e54c87', '#9447e1', '#5252d6', '#5aa4d8', '#79a02c',
  '#1da58c', '#c7a600', '#fa9200', '#1ab233', '#e024e0', '#6c6c7a',
] as const

/* ---------- members ---------- */

export const members: readonly Member[] = [
  { id: 'm1', name: 'Ana Kovačević', title: 'Founder & Strategy', role: 'Organization Owner', workingHours: [8, 8, 8, 8, 6], rate: 145, cost: 82, color: DATA[2] },
  { id: 'm2', name: 'Tom Whitfield', title: 'Design Lead', role: 'Admin', workingHours: [8, 8, 8, 8, 8], rate: 120, cost: 68, color: DATA[1] },
  { id: 'm3', name: 'Priya Raghunathan', title: 'Senior Product Designer', role: 'Member', workingHours: [8, 8, 8, 8, 8], rate: 105, cost: 58, color: DATA[4] },
  { id: 'm4', name: 'Marek Dvořák', title: 'Engineering Lead', role: 'Admin', workingHours: [8, 8, 8, 8, 8], rate: 135, cost: 76, color: DATA[6] },
  { id: 'm5', name: 'Sofia Meireles', title: 'Frontend Engineer', role: 'Member', workingHours: [8, 8, 8, 8, 8], rate: 110, cost: 62, color: DATA[9] },
  { id: 'm6', name: 'Daniel Osei', title: 'Backend Engineer', role: 'Member', workingHours: [8, 8, 8, 8, 8], rate: 110, cost: 62, color: DATA[3] },
  /* four-day week */
  { id: 'm7', name: 'Lena Hoffmann', title: 'Content Strategist', role: 'Member', workingHours: [8, 8, 8, 8, 0], rate: 95, cost: 54, color: DATA[8] },
  /* part-time */
  { id: 'm8', name: 'Yusuf Demir', title: 'QA Engineer', role: 'Member', workingHours: [5, 5, 5, 5, 5], rate: 85, cost: 48, color: DATA[5] },
  { id: 'm9', name: 'Clara Bennett', title: 'Account Manager', role: 'Member', workingHours: [8, 8, 8, 8, 8], rate: null, cost: 60, color: DATA[10] },
  { id: 'm10', name: 'Ravi Malhotra', title: 'Motion Designer', role: 'Contractor', workingHours: [6, 6, 6, 0, 0], rate: 100, cost: 100, color: DATA[7] },
  { id: 'm11', name: 'Elin Bergström', title: 'Delivery Manager', role: 'Member', workingHours: [8, 8, 8, 8, 8], rate: null, cost: 66, color: DATA[0] },
  { id: 'm12', name: 'Joel Nakamura', title: 'Junior Engineer', role: 'Member', workingHours: [8, 8, 8, 8, 8], rate: 70, cost: 40, color: DATA[11] },
]

/* ---------- clients & projects ---------- */

export const clients: readonly Client[] = [
  { id: 'c1', name: 'Northwind Bank' },
  { id: 'c2', name: 'Hemlock Coffee Roasters' },
  { id: 'c3', name: 'Vantage Health' },
  { id: 'c4', name: 'Studio Fennel' },
  { id: 'c5', name: 'Orbital Logistics' },
]

export const projects: readonly Project[] = [
  { id: 'p1', name: 'Mobile banking app redesign', clientId: 'c1', color: DATA[3], stage: 'Active', billable: true, rate: 130, fixedFee: null, startDate: '2026-06-01', endDate: '2026-10-30', tags: ['retainer', 'design'] },
  { id: 'p2', name: 'Ecommerce replatform', clientId: 'c2', color: DATA[8], stage: 'At risk', billable: true, rate: null, fixedFee: 96000, startDate: '2026-05-11', endDate: '2026-09-18', tags: ['fixed-fee', 'build'] },
  { id: 'p3', name: 'Patient portal — discovery', clientId: 'c3', color: DATA[6], stage: 'Active', billable: true, rate: 125, fixedFee: null, startDate: '2026-07-20', endDate: '2026-09-05', tags: ['discovery'] },
  { id: 'p4', name: 'Brand system & guidelines', clientId: 'c4', color: DATA[1], stage: 'Wrapping up', billable: true, rate: 110, fixedFee: null, startDate: '2026-04-06', endDate: '2026-08-28', tags: ['brand'] },
  { id: 'p5', name: 'Fleet dashboard v2', clientId: 'c5', color: DATA[4], stage: 'Active', billable: true, rate: 120, fixedFee: null, startDate: '2026-07-01', endDate: '2026-12-11', tags: ['build', 'retainer'] },
  { id: 'p6', name: 'Internal — studio operations', clientId: 'c4', color: DATA[11], stage: 'Active', billable: false, rate: null, fixedFee: null, startDate: '2026-01-06', endDate: '2026-12-31', tags: ['internal'] },
]

/* ---------- tasks ---------- */

const TASK_NAMES: Record<string, readonly string[]> = {
  p1: ['Card transaction list — IA rework', 'Biometric login flow', 'Accessibility audit: WCAG 2.2 AA', 'Design tokens handoff', 'Statement export prototype', 'Usability round 2 — 8 participants'],
  p2: ['Catalogue data migration', 'Checkout — guest flow', 'Payment provider spike', 'Subscription pricing rules', 'Search relevance tuning', 'Load testing before launch'],
  p3: ['Stakeholder interviews (11)', 'Journey map — referral to first appointment', 'Competitive teardown', 'Discovery readout deck'],
  p4: ['Logotype refinement', 'Typographic scale', 'Photography art direction', 'Guidelines document build'],
  p5: ['Live vehicle map performance', 'Alerting rules engine', 'Driver mobile handoff', 'Role-based permissions', 'Reporting export CSV'],
  p6: ['Weekly delivery sync', 'Hiring — senior engineer loop', 'Toolchain maintenance'],
}

const STATUSES: readonly TaskStatus[] = ['Todo', 'In Progress', 'Blocked', 'Done']
const PRIORITIES: readonly Priority[] = ['None', 'Low', 'Medium', 'High', 'Urgent']

export const tasks: readonly Task[] = projects.flatMap((project) =>
  (TASK_NAMES[project.id] ?? []).map((name, i) => {
    const assigneeCount = rand() > 0.78 ? 2 : 1
    const pool = members.filter((m) => m.role !== 'Organization Owner')
    const assigneeIds: string[] = []
    while (assigneeIds.length < assigneeCount) {
      const candidate = pick(pool).id
      if (!assigneeIds.includes(candidate)) assigneeIds.push(candidate)
    }
    return {
      id: `${project.id}-t${i + 1}`,
      projectId: project.id,
      name,
      status: project.stage === 'Wrapping up' && rand() > 0.35 ? 'Done' : pick(STATUSES),
      priority: pick(PRIORITIES),
      estimate: round(4 + rand() * 44, 2),
      assigneeIds,
      startDate: '2026-08-03',
      dueDate: '2026-08-28',
    }
  }),
)

/* ---------- time entries ---------- */

const ENTRY_NOTES = [
  'Pairing on the checkout edge cases',
  'Review + revisions after client call',
  'Spec writing',
  'Standup and planning',
  'Prototype build',
  'Bug triage',
  'Client workshop prep',
  'QA pass on staging',
  'Refactor before handoff',
  'Research synthesis',
] as const

function weekdaysBetween(startISO: string, days: number): string[] {
  const out: string[] = []
  const cursor = new Date(startISO)
  for (let i = 0; i < days; i++) {
    const day = cursor.getUTCDay()
    if (day !== 0 && day !== 6) out.push(cursor.toISOString().slice(0, 10))
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }
  return out
}

/* Four weeks ending on the current demo week. Nobody logs a clean 8.0h. */
const WORKDAYS = weekdaysBetween('2026-07-27', 28)

export const timeEntries: readonly TimeEntry[] = WORKDAYS.flatMap((date, dayIndex) =>
  members.flatMap((member) => {
    const weekday = new Date(date).getUTCDay()
    const contracted = member.workingHours[Math.max(0, weekday - 1)] ?? 0
    if (contracted === 0) return []
    /* some days are missed entirely, some run long */
    if (rand() < 0.08) return []
    const target = contracted * (0.62 + rand() * 0.55)
    const memberTasks = tasks.filter((t) => t.assigneeIds.includes(member.id))
    if (memberTasks.length === 0) return []

    const entries: TimeEntry[] = []
    let remaining = round(target, 0.25)
    let n = 0
    while (remaining > 0.25 && n < 4) {
      const task = pick(memberTasks)
      const project = projects.find((p) => p.id === task.projectId)
      const chunk = n === 3 ? remaining : round(Math.min(remaining, 0.5 + rand() * 3.5), 0.25)
      entries.push({
        id: `e${dayIndex}-${member.id}-${n}`,
        taskId: task.id,
        memberId: member.id,
        date,
        hours: chunk,
        billable: project ? project.billable && rand() > 0.12 : false,
        description: pick(ENTRY_NOTES),
      })
      remaining = round(remaining - chunk, 0.25)
      n++
    }
    return entries
  }),
)

/* ---------- time off ---------- */

export const timeOff: readonly TimeOff[] = [
  { id: 'to1', memberId: 'm3', type: 'Vacation', startDate: '2026-08-17', endDate: '2026-08-21', status: 'Approved' },
  { id: 'to2', memberId: 'm6', type: 'Vacation', startDate: '2026-08-19', endDate: '2026-08-28', status: 'Approved' },
  { id: 'to3', memberId: 'm8', type: 'Sick', startDate: '2026-08-18', endDate: '2026-08-18', status: 'Approved' },
  { id: 'to4', memberId: 'm2', type: 'Vacation', startDate: '2026-08-24', endDate: '2026-09-04', status: 'Pending' },
  { id: 'to5', memberId: 'm12', type: 'Holiday', startDate: '2026-08-20', endDate: '2026-08-21', status: 'Approved' },
  { id: 'to6', memberId: 'm1', type: 'Public holiday', startDate: '2026-08-15', endDate: '2026-08-15', status: 'Approved' },
]

/* ---------- derived helpers ---------- */

export function loggedHours(taskId: string): number {
  return round(
    timeEntries.filter((e) => e.taskId === taskId).reduce((sum, e) => sum + e.hours, 0),
    0.25,
  )
}

export function weeklyCapacity(memberId: string): number {
  const member = members.find((m) => m.id === memberId)
  if (!member) return 0
  return member.workingHours.reduce((a, b) => a + b, 0)
}

export function bookedHours(memberId: string): number {
  const assigned = tasks.filter((t) => t.assigneeIds.includes(memberId))
  return round(
    assigned.reduce((sum, t) => sum + t.estimate / Math.max(1, t.assigneeIds.length) / 4, 0),
    0.25,
  )
}

export function memberById(id: string): Member | undefined {
  return members.find((m) => m.id === id)
}

export function projectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function clientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id)
}
