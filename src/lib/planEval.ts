export type Weekday = 'mon' | 'tue' | 'wed' | 'thu' | 'fri'

export const WEEK: readonly Weekday[] = ['mon', 'tue', 'wed', 'thu', 'fri']
export const DAY_LABEL: Record<Weekday, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
}

export type PlanTask = {
  id: string
  name: string
  client: string | null
  color: string
  originalEstimateMins: number
  confirmedRemainingMins: number | null
  loggedMins: number
  dueDate: Weekday | null
  scheduledDay: Weekday
  status: 'todo' | 'in-progress' | 'done'
}

export type HistoryEntry = {
  id: string
  day: Weekday
  mins: number
  label: string
  color: string
}

export type WeekPlan = {
  tasks: readonly PlanTask[]
  history: readonly HistoryEntry[]
  capacityMinsPerDay: number
  today: Weekday
}

export type Overload = { day: Weekday; overMins: number }

export type AtRisk = { task: PlanTask; day: Weekday }

export type Evaluation = {
  loads: Record<Weekday, number>
  overloads: Overload[]
  atRisk: AtRisk | null
  fits: boolean
}

export type SafeMove = {
  taskId: string
  fromDay: Weekday
  toDay: Weekday
  mins: number
  reason: 'no-deadline'
}

export type RiskyMove = {
  taskId: string
  fromDay: Weekday
  toDay: Weekday
  mins: number
  consequence: string
  breaksDeadline: boolean
}

export function plannedMins(task: PlanTask): number {
  if (task.status === 'done') return 0
  if (task.confirmedRemainingMins !== null) return task.confirmedRemainingMins
  return Math.max(task.originalEstimateMins - task.loggedMins, 0)
}

export function expectedTotalMins(task: PlanTask): number {
  return task.loggedMins + (task.confirmedRemainingMins ?? 0)
}

export function dayLoads(plan: WeekPlan): Record<Weekday, number> {
  const loads: Record<Weekday, number> = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 }
  for (const entry of plan.history) loads[entry.day] += entry.mins
  for (const task of plan.tasks) loads[task.scheduledDay] += plannedMins(task)
  return loads
}

export function evaluate(plan: WeekPlan): Evaluation {
  const loads = dayLoads(plan)
  const overloads: Overload[] = []
  for (const day of WEEK) {
    const over = loads[day] - plan.capacityMinsPerDay
    if (over > 0) overloads.push({ day, overMins: over })
  }
  return { loads, overloads, atRisk: findAtRisk(plan, loads, overloads), fits: overloads.length === 0 }
}

/*
 * A dated commitment is at risk when an overloaded day's surplus cannot be
 * absorbed by free capacity before that commitment's deadline. Deterministic
 * and explainable; never infers commercial priority.
 */
function findAtRisk(
  plan: WeekPlan,
  loads: Record<Weekday, number>,
  overloads: Overload[],
): AtRisk | null {
  for (const overload of overloads) {
    let surplus = overload.overMins
    const start = WEEK.indexOf(overload.day)
    for (let i = start + 1; i < WEEK.length; i++) {
      const day = WEEK[i]
      const free = Math.max(plan.capacityMinsPerDay - loads[day], 0)
      const dated = plan.tasks.find(
        (t) => t.scheduledDay === day && t.dueDate === day && t.status !== 'done',
      )
      if (surplus > free && dated) return { task: dated, day }
      surplus -= free
      if (surplus <= 0) break
    }
  }
  return null
}

/*
 * The only auto-recommendation basis: the task has no deadline AND the
 * destination day has capacity for it. Anything else is a collision the
 * user resolves. The task whose remainder was just confirmed is what we
 * are making room FOR — never a move candidate.
 */
export function findSafeMoves(plan: WeekPlan, evaluation: Evaluation): SafeMove[] {
  const moves: SafeMove[] = []
  for (const overload of evaluation.overloads) {
    const candidates = plan.tasks.filter(
      (t) =>
        t.scheduledDay === overload.day &&
        t.dueDate === null &&
        t.status !== 'done' &&
        t.confirmedRemainingMins === null &&
        plannedMins(t) > 0,
    )
    for (const task of candidates) {
      const mins = plannedMins(task)
      const start = WEEK.indexOf(overload.day)
      for (let i = start + 1; i < WEEK.length; i++) {
        const day = WEEK[i]
        const free = plan.capacityMinsPerDay - evaluation.loads[day]
        if (free >= mins) {
          moves.push({ taskId: task.id, fromDay: overload.day, toDay: day, mins, reason: 'no-deadline' })
          break
        }
      }
    }
  }
  return moves
}

export function findRiskyMoves(plan: WeekPlan, evaluation: Evaluation): RiskyMove[] {
  const safeIds = new Set(findSafeMoves(plan, evaluation).map((m) => m.taskId))
  const moves: RiskyMove[] = []
  const overloadedDays = new Set(evaluation.overloads.map((o) => o.day))
  const movable = plan.tasks.filter(
    (t) =>
      t.status !== 'done' &&
      plannedMins(t) > 0 &&
      t.confirmedRemainingMins === null &&
      !safeIds.has(t.id),
  )
  for (const task of movable) {
    const mins = plannedMins(task)
    const involved =
      overloadedDays.has(task.scheduledDay) ||
      evaluation.atRisk?.task.id === task.id
    if (!involved) continue
    const start = WEEK.indexOf(task.scheduledDay)
    for (let i = start + 1; i < WEEK.length; i++) {
      const day = WEEK[i]
      const breaksDeadline = task.dueDate !== null && WEEK.indexOf(day) > WEEK.indexOf(task.dueDate)
      const free = plan.capacityMinsPerDay - evaluation.loads[day]
      const overflows = free < mins
      const displaced = plan.tasks.find(
        (t) => t.scheduledDay === day && t.dueDate === day && t.status !== 'done' && t.id !== task.id,
      )
      let consequence: string
      if (breaksDeadline) {
        consequence = `misses its ${DAY_LABEL[task.dueDate as Weekday]} deadline`
      } else if (overflows && displaced) {
        consequence = `puts ${DAY_LABEL[day]} over — ${displaced.name} is due that day`
      } else if (overflows) {
        consequence = `puts ${DAY_LABEL[day]} ${fmtMins(mins - Math.max(free, 0))} over`
      } else {
        consequence = `fits, but ${DAY_LABEL[day]} loses its slack`
      }
      moves.push({
        taskId: task.id,
        fromDay: task.scheduledDay,
        toDay: day,
        mins,
        consequence,
        breaksDeadline: breaksDeadline || (overflows && displaced !== undefined),
      })
      break
    }
  }
  return moves
}

export function applyMove(
  tasks: readonly PlanTask[],
  move: Pick<SafeMove, 'taskId' | 'toDay'>,
): PlanTask[] {
  return tasks.map((t) => (t.id === move.taskId ? { ...t, scheduledDay: move.toDay } : t))
}

export function fmtMins(mins: number): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function fmtClock(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${h}:${pad(m)}:${pad(s)}`
}

export function parseDuration(raw: string): number | null {
  const text = raw.trim().toLowerCase()
  if (text === '') return null
  const hm = text.match(/^(?:(\d+(?:[.,]\d+)?)\s*h)?\s*(?:(\d+)\s*m)?$/)
  if (hm && (hm[1] !== undefined || hm[2] !== undefined)) {
    const hours = hm[1] !== undefined ? parseFloat(hm[1].replace(',', '.')) : 0
    const mins = hm[2] !== undefined ? parseInt(hm[2], 10) : 0
    const total = Math.round(hours * 60) + mins
    return total > 0 ? total : null
  }
  const bare = text.match(/^(\d+(?:[.,]\d+)?)$/)
  if (bare) {
    const value = parseFloat(bare[1].replace(',', '.'))
    const total = value <= 12 ? Math.round(value * 60) : Math.round(value)
    return total > 0 ? total : null
  }
  return null
}
