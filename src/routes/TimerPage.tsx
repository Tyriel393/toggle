import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import {
  currentEvaluation,
  demoReducer,
  initialState,
  SCENARIO_LABEL,
  type DemoAction,
  type DemoState,
  type Scenario,
} from '@/data/demo'
import { DAY_LABEL, expectedTotalMins, fmtClock, fmtMins, taskLabel, type PlanTask } from '@/lib/planEval'
import { getTrackLog, subscribeTrack, track } from '@/lib/track'
import { PageContainer, TopBar } from '@/components/toggl/Shell'
import { Button, PlayButton } from '@/components/toggl/Button'
import { Card } from '@/components/toggl/Surface'
import { Badge } from '@/components/toggl/Data'
import { Icon } from '@/components/toggl/Icon'
import { RemainingPrompt } from '@/components/toggl/RemainingPrompt'
import { MakeRoomDrawer } from '@/components/toggl/MakeRoomDrawer'
import { WeekStrip } from '@/components/toggl/WeekStrip'
import { Tour, type TourStep } from '@/components/toggl/Tour'

const TOUR_STEPS: readonly TourStep[] = [
  {
    target: '[data-tour="timer"]',
    title: "You're a freelancer, mid-week.",
    body: 'Three clients on the go. You estimated Homepage revisions at 3h — the timer just passed it, and the job still is not done.',
  },
  {
    target: '[data-tour="prompt"]',
    title: "Toggl asks what's left.",
    body: 'An overrun is history — it cannot tell Toggl how much work remains. Maybe you are done and forgot to stop. So Toggl asks, and the answer takes one tap or one keystroke.',
  },
  {
    target: '[data-tour="week"]',
    title: 'Your week is the thing at risk.',
    body: 'Those extra hours have to come from somewhere. Say how much is left and Toggl works out whether the week still fits — and which client deadline it would cost you.',
  },
]

const RUNNING_BASE_SECONDS = 3 * 3600 + 11 * 60 + 42

function choiceLabel(mins: number): string {
  if (mins === 30) return '30m'
  if (mins === 60) return '1h'
  if (mins === 120) return '2h'
  return 'custom'
}

/*
 * The funnel from the metrics plan, emitted at the moment each step happens.
 * In production these calls are the analytics client (Mixpanel or equivalent).
 */
function emitEvents(prev: DemoState, next: DemoState, action: DemoAction): void {
  const homepage = next.plan.tasks.find((t) => t.id === 'homepage')
  switch (action.type) {
    case 'stop':
      track('estimate_prompt_shown', {
        trigger: 'timer_stop',
        estimate_mins: homepage?.originalEstimateMins ?? null,
        logged_mins: homepage?.loggedMins ?? null,
      })
      break
    case 'confirm-remaining': {
      track('remaining_confirmed', {
        choice: choiceLabel(action.mins),
        remaining_mins: action.mins,
      })
      const evaluation = currentEvaluation(next)
      if (next.phase === 'conflict') {
        track('conflict_detected', {
          over_mins: evaluation.overloads[0]?.overMins ?? 0,
          at_risk_task: evaluation.atRisk ? taskLabel(evaluation.atRisk.task) : null,
          at_risk_due: evaluation.atRisk ? DAY_LABEL[evaluation.atRisk.day] : null,
        })
        track('make_room_opened', { via: 'conflict' })
      } else {
        track('week_fits', { remaining_mins: action.mins })
      }
      break
    }
    case 'mark-done':
      track('remaining_confirmed', { choice: 'done', remaining_mins: 0 })
      break
    case 'reassign':
      track('remaining_confirmed', {
        choice: 'wrong_task',
        to_task: next.plan.tasks.find((t) => t.id === action.taskId)?.name ?? action.taskId,
      })
      break
    case 'defer':
      track('remaining_confirmed', { choice: 'not_sure', remaining_mins: null })
      break
    case 'preview':
      track('move_previewed', {
        task: (() => { const t = next.plan.tasks.find((x) => x.id === action.move.taskId); return t ? taskLabel(t) : action.move.taskId })(),
        to_day: DAY_LABEL[action.move.toDay],
        kind: action.move.risky ? 'risky' : 'safe',
      })
      break
    case 'approve':
      if (prev.previewMove) {
        track('move_approved', {
          task: prev.plan.tasks.find((t) => t.id === prev.previewMove?.taskId)?.name ?? '',
          to_day: DAY_LABEL[prev.previewMove.toDay],
          kind: prev.previewMove.risky ? 'risky' : 'safe',
        })
      }
      break
    case 'undo':
      track('move_undone', {
        task: prev.plan.tasks.find((t) => t.id === prev.appliedMove?.taskId)?.name ?? '',
      })
      break
    case 'keep':
      track('plan_kept', { reason: action.reason })
      break
    case 'close-drawer':
      if (prev.phase === 'conflict') track('plan_kept', { reason: 'acknowledged', via: 'dismiss' })
      break
    case 'reopen-drawer':
      track('make_room_opened', { via: 'review' })
      break
    case 'restart':
    case 'set-scenario':
      track('demo_reset', { scenario: next.scenario })
      break
    default:
      break
  }
}

export function TimerPage() {
  const [state, setState] = useState((): DemoState => initialState('conflict', 'asking'))
  const stateRef = useRef(state)
  const dispatch = useCallback((action: DemoAction) => {
    const prev = stateRef.current
    const next = demoReducer(prev, action)
    stateRef.current = next
    emitEvents(prev, next, action)
    setState(next)
  }, [])

  useEffect(() => {
    track('estimate_prompt_shown', { trigger: 'cold_open', estimate_mins: 180, logged_mins: 192 })
  }, [])

  const evaluation = useMemo(() => currentEvaluation(state), [state])
  const homepage = state.plan.tasks.find((t) => t.id === 'homepage')
  const remainingMins = homepage?.confirmedRemainingMins ?? 0
  const [tourOpen, setTourOpen] = useState(true)
  const [capacityNoteOpen, setCapacityNoteOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const t = e.target
      const typing =
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        (t instanceof HTMLElement && t.isContentEditable)
      if (typing) return
      const current = stateRef.current
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (current.phase === 'approved') {
          e.preventDefault()
          dispatch({ type: 'undo' })
        }
        return
      }
      if (e.repeat || e.ctrlKey || e.metaKey || e.altKey) return
      if (e.key.toLowerCase() === 's' && current.phase === 'running') {
        e.preventDefault()
        dispatch({ type: 'stop' })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [dispatch])

  return (
    <>
      <TopBar
        title="Timer"
        actions={<span className="text-[14px] font-medium text-fg-secondary">Wednesday · this week</span>}
      />
      <PageContainer>
        <div className="mx-auto max-w-3xl space-y-4 pt-1">
          <div data-tour="timer">
            <TimerBar state={state} onStop={() => dispatch({ type: 'stop' })} onRestart={() => dispatch({ type: 'restart' })} />
          </div>

          {homepage && (state.phase === 'asking' || state.phase === 'custom' || state.phase === 'wrong-task') ? (
            <div data-tour="prompt">
            <RemainingPrompt
              task={homepage}
              mode={state.phase}
              reassignTargets={state.plan.tasks.filter((t) => t.id !== 'homepage')}
              onConfirm={(mins) => dispatch({ type: 'confirm-remaining', mins })}
              onDone={() => dispatch({ type: 'mark-done' })}
              onWrongTask={() => dispatch({ type: 'wrong-task' })}
              onReassign={(taskId) => dispatch({ type: 'reassign', taskId })}
              onDefer={() => dispatch({ type: 'defer' })}
              onOpenCustom={() => dispatch({ type: 'open-custom' })}
              onBackToAsk={() => dispatch({ type: 'back-to-ask' })}
            />
            </div>
          ) : null}

          {state.phase === 'fits' && homepage ? (
            <StatusCard tone="success" title="Still on track.">
              Your week has room for the extra {fmtMins(remainingMins)} — nothing needs to move.
              You&apos;ve now told the plan the truth: {fmtMins(homepage.originalEstimateMins)}{' '}
              estimated, {fmtMins(expectedTotalMins(homepage))} expected.
            </StatusCard>
          ) : null}

          {state.phase === 'marked-done' && homepage ? (
            <StatusCard tone="neutral" title="Marked done.">
              {fmtMins(homepage.loggedMins)} logged against a {fmtMins(homepage.originalEstimateMins)}{' '}
              estimate. No future capacity created — nothing to replan.
            </StatusCard>
          ) : null}

          {state.phase === 'reassigned' ? (
            <StatusCard tone="neutral" title="Session time moved.">
              The entry now belongs to{' '}
              {state.plan.tasks.find((t) => t.id === state.reassignedTo)?.name ?? 'the selected task'} —
              no replanning happened, because the overrun was bad data, not extra work.
            </StatusCard>
          ) : null}

          {state.phase === 'deferred' ? (
            <StatusCard tone="neutral" title="Okay — we'll ask again later.">
              A quiet marker stays on the task. The question returns after more time is tracked
              against it, not on every stop.
            </StatusCard>
          ) : null}

          {state.phase === 'kept' || (state.phase === 'approved' && !evaluation.fits) ? (
            <div className="flex items-center gap-3 rounded-lg border border-line-warning bg-bg-warning px-4 py-3">
              <span className="text-[14px] font-semibold text-fg-warning">
                {state.phase === 'approved'
                  ? `Moved — but ${DAY_LABEL[evaluation.overloads[0]?.day ?? 'wed']} is still ${fmtMins(
                      evaluation.overloads[0]?.overMins ?? 0,
                    )} over.`
                  : state.keptReason === 'overtime'
                    ? `Overtime accepted — ${DAY_LABEL[evaluation.overloads[0]?.day ?? 'wed']} runs ${fmtMins(
                        evaluation.overloads[0]?.overMins ?? 0,
                      )} over.`
                    : `Conflict acknowledged — ${DAY_LABEL[evaluation.overloads[0]?.day ?? 'wed']} is ${fmtMins(
                        evaluation.overloads[0]?.overMins ?? 0,
                      )} over.`}
              </span>
              <Button
                variant="secondary"
                size="sm"
                className="ml-auto"
                autoFocus={state.phase === 'kept'}
                onClick={() => dispatch({ type: 'reopen-drawer' })}
              >
                Review
              </Button>
            </div>
          ) : null}

          <TodayList state={state} />

          <div data-tour="week">
            <Card title="This week">
              <div className="pb-2">
                <WeekStrip
                  plan={state.plan}
                  evaluation={evaluation}
                  previewMove={state.previewMove}
                  atRiskTaskId={state.phase === 'conflict' ? (evaluation.atRisk?.task.id ?? null) : null}
                  onEditCapacity={() => setCapacityNoteOpen((v) => !v)}
                />
                {capacityNoteOpen ? (
                  <div className="mt-2 rounded-lg border border-line bg-bg-secondary px-3.5 py-2.5">
                    <p className="text-[13px] font-medium text-fg">
                      8h/day is Toggl&apos;s default — your working hours are not set.
                    </p>
                    <p className="mt-0.5 text-[12px] leading-4 font-medium text-fg-secondary">
                      Verified in the live product: the Members table shows Working hours as{' '}
                      <code className="font-mono">-</code> while Workload still reports a 40h week.
                      Time off and connected calendar events reduce it further. Make room states the
                      source of every capacity number so the arithmetic can be argued with.
                    </p>
                    <Button variant="secondary" size="sm" className="mt-2" onClick={() => setCapacityNoteOpen(false)}>
                      Got it
                    </Button>
                  </div>
                ) : null}
              </div>
            </Card>
          </div>
        </div>
      </PageContainer>

      <MakeRoomDrawer
        open={state.drawerOpen}
        plan={state.plan}
        evaluation={evaluation}
        remainingMins={remainingMins}
        previewMove={state.previewMove}
        onPreview={(move) => dispatch({ type: 'preview', move })}
        onCancelPreview={() => dispatch({ type: 'cancel-preview' })}
        onApprove={() => dispatch({ type: 'approve' })}
        onKeep={(reason) => dispatch({ type: 'keep', reason })}
        onClose={() => dispatch({ type: 'close-drawer' })}
      />

      <UndoToast state={state} onUndo={() => dispatch({ type: 'undo' })} />

      <Tour steps={TOUR_STEPS} open={tourOpen} onClose={() => setTourOpen(false)} />

      <SmallScreenNotice />

      <DemoChrome
        scenario={state.scenario}
        onRestart={() => dispatch({ type: 'restart' })}
        onScenario={(scenario) => dispatch({ type: 'set-scenario', scenario })}
        onTour={() => setTourOpen(true)}
      />
    </>
  )
}

function TimerBar({
  state,
  onStop,
  onRestart,
}: {
  state: DemoState
  onStop: () => void
  onRestart: () => void
}) {
  const running = state.phase === 'running'
  const [seconds, setSeconds] = useState(RUNNING_BASE_SECONDS)

  useEffect(() => {
    if (!running) {
      setSeconds(RUNNING_BASE_SECONDS)
      return
    }
    /* Ticks to the stop value and holds — the stopped display is always 3:12:04. */
    const id = window.setInterval(() => setSeconds((s) => Math.min(s + 1, 11524)), 1000)
    return () => window.clearInterval(id)
  }, [running])

  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-bg px-4 py-3">
      <p className="min-w-0 flex-1 truncate text-[14px] font-medium text-fg">Homepage revisions</p>
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-sm bg-bg-secondary px-2 py-1 text-[12px] font-medium text-fg-secondary">
        <span className="size-2 rounded-full" style={{ backgroundColor: '#fa9200' }} />
        Northstar
      </span>
      <span
        className={[
          'shrink-0 text-[16px] font-semibold tabular-nums',
          running ? 'text-fg' : 'text-fg-secondary',
        ].join(' ')}
        aria-label={running ? 'Timer running' : 'Timer stopped'}
      >
        {running ? fmtClock(seconds) : '3:12:04'}
      </span>
      <PlayButton running={running} onClick={running ? onStop : onRestart} />
    </div>
  )
}

function TodayList({ state }: { state: DemoState }) {
  const reassignedTask: PlanTask | undefined = state.plan.tasks.find((t) => t.id === state.reassignedTo)
  const calls = state.plan.history.find((h) => h.id === 'h-calls')
  return (
    <Card title="Today · Wednesday">
      <ul className="divide-y divide-(--color-line-muted) pb-1">
        <EntryRow
          label={reassignedTask ? reassignedTask.name : 'Homepage revisions'}
          client={reassignedTask ? (reassignedTask.client ?? 'Internal') : 'Northstar'}
          color={reassignedTask ? reassignedTask.color : '#fa9200'}
          duration="3:12:04"
        >
          {state.phase === 'deferred' ? (
            <Badge tone="warning">
              <span className="inline-flex items-center gap-1">
                <Icon name="clock" size={10} />
                Estimate reached — will ask after more tracking
              </span>
            </Badge>
          ) : null}
        </EntryRow>
        {calls ? (
          <EntryRow label={calls.label} client="Northstar" color={calls.color} duration={`${fmtClock(calls.mins * 60)}`} />
        ) : null}
      </ul>
    </Card>
  )
}

function EntryRow({
  label,
  client,
  color,
  duration,
  children,
}: {
  label: string
  client: string
  color: string
  duration: string
  children?: React.ReactNode
}) {
  return (
    <li className="flex min-h-11 items-center gap-3 py-1.5">
      <p className="min-w-0 flex-1 truncate text-[14px] font-medium text-fg">{label}</p>
      {children}
      <span className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-fg-secondary">
        <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
        {client}
      </span>
      <span className="shrink-0 text-[13px] font-medium text-fg-secondary tabular-nums">{duration}</span>
    </li>
  )
}

function StatusCard({
  tone,
  title,
  children,
}: {
  tone: 'success' | 'neutral'
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      role="status"
      className={[
        'rounded-lg border px-4 py-3',
        tone === 'success' ? 'border-line-success bg-bg-success' : 'border-line bg-bg',
      ].join(' ')}
    >
      <p className={['text-[14px] font-semibold', tone === 'success' ? 'text-fg-success' : 'text-fg'].join(' ')}>
        {title}
      </p>
      <p className="mt-0.5 text-[13px] font-medium text-fg-secondary">{children}</p>
    </div>
  )
}

function UndoToast({ state, onUndo }: { state: DemoState; onUndo: () => void }) {
  const task = state.plan.tasks.find((t) => t.id === state.appliedMove?.taskId)
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
      {state.phase === 'approved' && state.appliedMove && task ? (
        <div className="pointer-events-auto flex items-center gap-3 rounded-lg border border-line bg-bg px-4 py-3 shadow-none">
          <span className="text-[14px] font-medium text-fg">
            Made room — {task.name} moved to {DAY_LABEL[state.appliedMove.toDay]}.
          </span>
          <Button variant="secondary" size="sm" onClick={onUndo}>
            Undo
          </Button>
        </div>
      ) : null}
    </div>
  )
}

type ThemeChoice = 'system' | 'light' | 'dark'

/*
 * Toggl 2.0 itself gates small screens ("Toggl 2.0 works better on bigger
 * screens" — verified live). We mirror that rather than invent a mobile
 * layout the real product does not have, and name the honest split.
 */
function SmallScreenNotice() {
  return (
    <div className="fixed inset-0 z-[70] hidden place-items-center bg-bg p-6 text-center max-md:grid">
      <div className="max-w-sm">
        <p className="text-[18px] leading-6 font-semibold text-fg">
          Make room needs a bigger screen
        </p>
        <p className="mt-2 text-[14px] leading-5 font-medium text-fg-secondary">
          Toggl 2.0 shows the same notice below this width — it is desktop-first by its own
          admission, so this prototype matches it rather than inventing a layout the product does
          not have.
        </p>
        <p className="mt-3 text-[13px] leading-5 font-medium text-fg-secondary">
          The honest split: the <strong>question</strong> — done, or more time? — belongs on a phone,
          where timers actually get stopped, as a notification with those answers as actions. The{' '}
          <strong>replan</strong> is a week grid and a trade-off, and that is desktop work.
        </p>
      </div>
    </div>
  )
}

function DemoChrome({
  scenario,
  onRestart,
  onScenario,
  onTour,
}: {
  scenario: Scenario
  onRestart: () => void
  onScenario: (scenario: Scenario) => void
  onTour: () => void
}) {
  const [theme, setTheme] = useState<ThemeChoice>('system')
  const [showEvents, setShowEvents] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    if (theme !== 'system') root.classList.add(theme)
  }, [theme])

  const cycleTheme = () => {
    setTheme((t) => (t === 'system' ? 'light' : t === 'light' ? 'dark' : 'system'))
  }

  const scenarios: readonly Scenario[] = ['conflict', 'fits', 'no-safe-move']

  return (
    <div
      className="fixed bottom-4 left-4 z-30 flex items-center gap-1 rounded-full border border-line bg-bg px-2 py-1.5"
      role="group"
      aria-label="Demo controls"
    >
      <span className="px-1.5 text-[11px] font-semibold tracking-[0.275px] text-fg-tertiary uppercase">
        Demo
      </span>
      <button
        type="button"
        onClick={onTour}
        className="cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
      >
        Tour
      </button>
      <Link
        to="/setup"
        className="cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
      >
        Setup
      </Link>
      <button
        type="button"
        onClick={onRestart}
        className="cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
      >
        Restart
      </button>
      <span className="h-4 w-px bg-(--color-line)" />
      {scenarios.map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onScenario(s)}
          aria-pressed={scenario === s}
          className={[
            'cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium',
            scenario === s
              ? 'bg-bg-muted text-fg-accent-on-muted'
              : 'text-fg-secondary hover:bg-bg-hover hover:text-fg',
          ].join(' ')}
        >
          {SCENARIO_LABEL[s]}
        </button>
      ))}
      <span className="h-4 w-px bg-(--color-line)" />
      <button
        type="button"
        onClick={() => setShowEvents((v) => !v)}
        aria-pressed={showEvents}
        className={[
          'cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium',
          showEvents
            ? 'bg-bg-muted text-fg-accent-on-muted'
            : 'text-fg-secondary hover:bg-bg-hover hover:text-fg',
        ].join(' ')}
      >
        Events
      </button>
      <button
        type="button"
        onClick={cycleTheme}
        className="cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
        aria-label={`Theme: ${theme}. Click to change.`}
      >
        {theme === 'system' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark'}
      </button>
      {showEvents ? <EventsPanel /> : null}
    </div>
  )
}

/*
 * The funnel, live. Every interaction in the demo emits the event schema from
 * the measurement plan — this panel makes that visible without the console.
 */
function EventsPanel() {
  const log = useSyncExternalStore(subscribeTrack, getTrackLog, getTrackLog)
  return (
    <div
      className="fixed bottom-14 left-4 max-h-72 w-[380px] overflow-y-auto rounded-lg border border-line bg-bg p-2"
      role="log"
      aria-label="Analytics events"
    >
      <p className="uppercase-label px-1 pb-1">Instrumentation — what production would send</p>
      <ul className="space-y-0.5">
        {[...log].reverse().map((event) => (
          <li key={event.id} className="rounded-sm px-1 py-0.5 font-mono text-[11px] leading-4">
            <span className="font-semibold text-fg">{event.name}</span>{' '}
            <span className="text-fg-secondary">
              {Object.entries(event.payload)
                .map(([k, v]) => `${k}=${v === null ? '∅' : v}`)
                .join(' ')}
            </span>
          </li>
        ))}
        {log.length === 0 ? (
          <li className="px-1 py-0.5 text-[11px] text-fg-tertiary">No events yet.</li>
        ) : null}
      </ul>
    </div>
  )
}
