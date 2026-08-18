import {
  applyMove,
  evaluate,
  type Evaluation,
  type HistoryEntry,
  type PlanTask,
  type Weekday,
  type WeekPlan,
} from '@/lib/planEval'

export type MoveIntent = {
  taskId: string
  fromDay: Weekday
  toDay: Weekday
  mins: number
  risky: boolean
  consequence: string | null
}

export type Scenario = 'conflict' | 'fits' | 'no-safe-move'

export const SCENARIO_LABEL: Record<Scenario, string> = {
  conflict: 'Conflict',
  fits: 'Fits',
  'no-safe-move': 'No safe move',
}

export const CLIENT_COLOR = {
  northstar: '#fa9200',
  atlas: '#5252d6',
  internal: '#6c6c7a',
} as const

const CAPACITY = 8 * 60
const TODAY: Weekday = 'wed'

/* The cast — plan.md §4. Same three objects everywhere. */
function baseTasks(): PlanTask[] {
  return [
    {
      id: 'homepage',
      name: 'Homepage revisions',
      client: 'Northstar',
      color: CLIENT_COLOR.northstar,
      originalEstimateMins: 180,
      confirmedRemainingMins: null,
      loggedMins: 192,
      dueDate: null,
      scheduledDay: 'wed',
      status: 'in-progress',
    },
    {
      id: 'atlas-handoff',
      name: 'Final handoff',
      client: 'Atlas',
      color: CLIENT_COLOR.atlas,
      originalEstimateMins: 420,
      confirmedRemainingMins: null,
      loggedMins: 0,
      dueDate: 'thu',
      scheduledDay: 'thu',
      status: 'todo',
    },
    {
      id: 'portfolio',
      name: 'Portfolio polish',
      client: null,
      color: CLIENT_COLOR.internal,
      originalEstimateMins: 120,
      confirmedRemainingMins: null,
      loggedMins: 0,
      dueDate: null,
      scheduledDay: 'wed',
      status: 'todo',
    },
  ]
}

function baseHistory(callsMins: number): HistoryEntry[] {
  return [
    { id: 'h-mon', day: 'mon', mins: 390, label: 'Tracked Monday', color: CLIENT_COLOR.northstar },
    { id: 'h-tue', day: 'tue', mins: 435, label: 'Tracked Tuesday', color: CLIENT_COLOR.atlas },
    {
      id: 'h-calls',
      day: 'wed',
      mins: callsMins,
      label: 'Northstar — calls & email',
      color: CLIENT_COLOR.northstar,
    },
    {
      id: 'h-homepage',
      day: 'wed',
      mins: 192,
      label: 'Homepage revisions',
      color: CLIENT_COLOR.northstar,
    },
  ]
}

export function buildPlan(scenario: Scenario): WeekPlan {
  const tasks = baseTasks()
  if (scenario === 'fits') {
    /* Wednesday: 1h48m calls + 3h12m homepage + 1h portfolio = 6h → 2h free. */
    const portfolio = tasks.find((t) => t.id === 'portfolio')
    if (portfolio) portfolio.originalEstimateMins = 60
    return { tasks, history: baseHistory(108), capacityMinsPerDay: CAPACITY, today: TODAY }
  }
  if (scenario === 'no-safe-move') {
    /* Portfolio gains a Thursday deadline — nothing is safely movable. */
    const portfolio = tasks.find((t) => t.id === 'portfolio')
    if (portfolio) portfolio.dueDate = 'thu'
    return { tasks, history: baseHistory(168), capacityMinsPerDay: CAPACITY, today: TODAY }
  }
  /* Conflict: Wednesday 2h48m calls + 3h12m homepage + 2h portfolio = 8h, full. */
  return { tasks, history: baseHistory(168), capacityMinsPerDay: CAPACITY, today: TODAY }
}

export type Phase =
  | 'running'
  | 'asking'
  | 'custom'
  | 'wrong-task'
  | 'reassigned'
  | 'marked-done'
  | 'deferred'
  | 'fits'
  | 'conflict'
  | 'approved'
  | 'kept'

export type DemoState = {
  scenario: Scenario
  phase: Phase
  plan: WeekPlan
  scheduleBeforeMove: WeekPlan | null
  previewMove: MoveIntent | null
  appliedMove: MoveIntent | null
  keptReason: 'overtime' | 'acknowledged' | null
  reassignedTo: string | null
  drawerOpen: boolean
}

export type DemoAction =
  | { type: 'stop' }
  | { type: 'confirm-remaining'; mins: number }
  | { type: 'open-custom' }
  | { type: 'mark-done' }
  | { type: 'wrong-task' }
  | { type: 'reassign'; taskId: string }
  | { type: 'defer' }
  | { type: 'back-to-ask' }
  | { type: 'preview'; move: MoveIntent }
  | { type: 'cancel-preview' }
  | { type: 'approve' }
  | { type: 'undo' }
  | { type: 'keep'; reason: 'overtime' | 'acknowledged' }
  | { type: 'reopen-drawer' }
  | { type: 'close-drawer' }
  | { type: 'restart' }
  | { type: 'set-scenario'; scenario: Scenario }

export function initialState(scenario: Scenario, phase: Phase = 'asking'): DemoState {
  return {
    scenario,
    phase,
    plan: buildPlan(scenario),
    scheduleBeforeMove: null,
    previewMove: null,
    appliedMove: null,
    keptReason: null,
    reassignedTo: null,
    drawerOpen: false,
  }
}

function withConfirmed(plan: WeekPlan, mins: number): WeekPlan {
  return {
    ...plan,
    tasks: plan.tasks.map((t) =>
      t.id === 'homepage' ? { ...t, confirmedRemainingMins: mins } : t,
    ),
  }
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'stop':
      return { ...state, phase: 'asking' }
    case 'open-custom':
      return { ...state, phase: 'custom' }
    case 'back-to-ask':
      return { ...state, phase: 'asking' }
    case 'confirm-remaining': {
      const plan = withConfirmed(state.plan, action.mins)
      const result = evaluate(plan)
      return {
        ...state,
        plan,
        phase: result.fits ? 'fits' : 'conflict',
        drawerOpen: !result.fits,
        previewMove: null,
      }
    }
    case 'mark-done':
      return {
        ...state,
        phase: 'marked-done',
        plan: {
          ...state.plan,
          tasks: state.plan.tasks.map((t) =>
            t.id === 'homepage' ? { ...t, status: 'done' as const } : t,
          ),
        },
      }
    case 'wrong-task':
      return { ...state, phase: 'wrong-task' }
    case 'reassign':
      return { ...state, phase: 'reassigned', reassignedTo: action.taskId }
    case 'defer':
      return { ...state, phase: 'deferred' }
    case 'preview':
      return { ...state, previewMove: action.move }
    case 'cancel-preview':
      return { ...state, previewMove: null }
    case 'approve': {
      if (!state.previewMove) return state
      return {
        ...state,
        scheduleBeforeMove: state.plan,
        plan: { ...state.plan, tasks: applyMove(state.plan.tasks, state.previewMove) },
        appliedMove: state.previewMove,
        previewMove: null,
        phase: 'approved',
        drawerOpen: false,
      }
    }
    case 'undo': {
      /* Restore the schedule; the confirmed remaining effort is retained. */
      if (!state.scheduleBeforeMove) return state
      return {
        ...state,
        plan: state.scheduleBeforeMove,
        scheduleBeforeMove: null,
        appliedMove: null,
        phase: 'conflict',
        drawerOpen: true,
      }
    }
    case 'keep':
      return { ...state, phase: 'kept', keptReason: action.reason, drawerOpen: false, previewMove: null }
    case 'reopen-drawer':
      return { ...state, drawerOpen: true, phase: 'conflict' }
    case 'close-drawer':
      return state.phase === 'conflict'
        ? { ...state, drawerOpen: false, phase: 'kept', keptReason: 'acknowledged', previewMove: null }
        : { ...state, drawerOpen: false, previewMove: null }
    case 'restart':
      return initialState(state.scenario, 'running')
    case 'set-scenario':
      return initialState(action.scenario, 'asking')
    default:
      return state
  }
}

export function currentEvaluation(state: DemoState): Evaluation {
  return evaluate(state.plan)
}
