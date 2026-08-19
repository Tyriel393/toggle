import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StartScreen } from '@/components/toggl/StartScreen'
import { ScopeToast, useScopeToast } from '@/components/toggl/ScopeToast'
import {
  currentEvaluation,
  demoReducer,
  initialState,
  SCENARIO_LABEL,
  type DemoAction,
  type DemoState,
  type Scenario,
} from '@/data/demo'
import { DAY_LABEL, evaluate, expectedTotalMins, fmtClock, fmtMins, taskLabel, type PlanTask } from '@/lib/planEval'
import { mondayPlan } from '@/data/demo'
import { getTrackLog, subscribeTrack, track } from '@/lib/track'
import { PageContainer } from '@/components/toggl/Shell'
import { CaptureBar, DayMeters, WeekToolbar, type MeterSegment } from '@/components/toggl/TimerChrome'
import { Button } from '@/components/toggl/Button'
import { Card } from '@/components/toggl/Surface'
import { Badge } from '@/components/toggl/Data'
import { Icon } from '@/components/toggl/Icon'
import { RemainingPrompt } from '@/components/toggl/RemainingPrompt'
import { MakeRoomDrawer } from '@/components/toggl/MakeRoomDrawer'
import { WeekStrip } from '@/components/toggl/WeekStrip'
import { WeekOnePanel } from '@/components/toggl/WeekOnePanel'
import { FeatureCoach, type CoachContent, type CoachStep } from '@/components/toggl/FeatureCoach'
import { WeekCapacityCard } from '@/components/toggl/WeekCapacityCard'

const STEP_LABELS = ['Say what’s left', 'See the risk', 'Make room', 'Learn from it'] as const

function steps(current: number): CoachStep[] {
  return STEP_LABELS.map((label, i) => ({
    label,
    state: i < current ? 'done' : i === current ? 'current' : 'todo',
  }))
}

/* Always answers "what do I do next?" — for a new user and a cold evaluator alike. */
function coachFor(state: DemoState, previewing: boolean): CoachContent {
  const base = { headline: 'Make room', tone: 'accent' as const }

  /* Day 1 is the week-level decision; day 2 is the quiet middle. */
  if (state.weekDay < 3) {
    const weekSettled = state.weekFix !== null
    return {
      ...base,
      headline:
        state.weekDay === 1
          ? weekSettled
            ? 'Monday — week settled'
            : 'Monday — your week does not fit'
          : 'Tuesday — still on plan',
      why:
        state.weekDay === 1
          ? weekSettled
            ? 'You made the call on day one. Toggl now holds the plan you actually agreed to, not the one you hoped for.'
            : 'You have committed more work than the week holds. Toggl already knows your weekly capacity — it has just never told you when you have exceeded it.'
          : 'A second day tracked against the plan. Wednesday is full but still fits, so Toggl stays quiet.',
      action:
        state.weekDay === 1
          ? weekSettled
            ? 'Press Day 3 — that is when a job runs long and the day-level version fires'
            : 'Pick one of the three ways out below'
          : 'Press Day 3 in the demo bar — that is when a job runs long',
      steps: steps(0),
      metric:
        state.weekDay === 1
          ? {
              label: 'Eligibility',
              detail:
                'Decided here, not later: does this user have two dated, estimated commitments? The share who do is the concept’s biggest unknown.',
            }
          : {
              label: 'Leading indicator',
              detail:
                'Distinct days tracked. Two is where week-one retention starts to separate from a single-session signup.',
            },
    }
  }

  switch (state.phase) {
    case 'running':
      return {
        ...base,
        why: 'Your timer is past the 3h you estimated for this job, and it is not finished.',
        action: 'Stop the timer to see what happens next',
        steps: steps(0),
      }
    case 'asking':
    case 'custom':
    case 'wrong-task':
      return {
        ...base,
        why: 'You went over your estimate. Toggl cannot tell how much work is left — only you can.',
        action: 'Pick how much time is left — try “2h left”',
        steps: steps(0),
        metric: {
          label: 'Funnel · step 1',
          detail:
            'estimate_prompt_shown → remaining_confirmed. Guardrail: “Done” chosen only to dismiss, and any delay this adds at timer stop.',
        },
      }
    case 'fits':
      return {
        ...base,
        tone: 'success',
        headline: 'Your week absorbed it',
        why: 'The extra time fits, so Toggl says nothing more. A tool that only ever warns is noise.',
        action: 'Switch to the “Conflict” scenario to see the other outcome',
        steps: steps(1),
      }
    case 'marked-done':
    case 'reassigned':
    case 'deferred':
      return {
        ...base,
        headline: 'That answer ends the flow',
        why: 'Going over does not always mean more work — so this path creates no future capacity and no warning.',
        action: 'Press Restart, then answer “2h left” to see the main flow',
        steps: steps(0),
      }
    case 'conflict':
      if (previewing) {
        return {
          ...base,
          why: 'This is the week as it would be. Nothing has moved yet.',
          action: 'Approve the move — or press Enter',
          steps: steps(2),
        }
      }
      return {
        ...base,
        why: state.drawerOpen
          ? 'Those 2 hours have to come from somewhere. Toggl found the one job it can move without risking a deadline.'
          : 'Wednesday no longer fits, and a dated commitment is at risk.',
        action: state.drawerOpen ? 'Preview the suggested move — or press P' : 'Press Review to reopen Make room',
        steps: steps(2),
        metric: {
          label: 'Funnel · steps 2–3',
          detail:
            'conflict_detected → make_room_opened. The share of confirmations that produce a real collision is what tells us this fires often enough to matter.',
        },
      }
    case 'approved':
      return {
        ...base,
        tone: 'success',
        headline: 'Wednesday fits again',
        why: 'You chose what moved, and it can be undone. Toggl never moved a client commitment on its own.',
        action:
          state.weekDay >= 5
            ? 'Look at “Your first week” — that last line is the week-one payoff'
            : 'Jump to Day 5 in the demo bar to see what the week taught you',
        steps: steps(state.weekDay >= 5 ? 4 : 3),
        metric:
          state.weekDay >= 5
            ? {
                label: 'W0 outcome',
                detail:
                  'Do eligible freelancers track or plan on 3+ separate days in week one, against a matched control? That is the measure — everything above is the mechanism.',
              }
            : {
                label: 'Value metric',
                detail:
                  '% of collisions returned to a workable plan before the deadline they threatened. Guardrail: moves undone within 24h — press Ctrl+Z to log one.',
              },
      }
    case 'kept':
      return {
        ...base,
        headline: 'Conflict acknowledged',
        why: 'Choosing to absorb it is a valid answer — Toggl records the risk rather than hiding it.',
        action: 'Press Review to reopen your options',
        steps: steps(2),
      }
    default:
      return { ...base, why: '', action: '', steps: steps(0) }
  }
}

const RUNNING_BASE_SECONDS = 3 * 3600 + 11 * 60 + 42

const NORTHSTAR = '#fa9200'
const ATLAS = '#5252d6'
const INTERNAL = '#6c6c7a'

const DAY_METERS: readonly (readonly MeterSegment[])[] = [
  [{ mins: 250, color: NORTHSTAR, label: 'Northstar' }, { mins: 140, color: INTERNAL, label: 'Internal' }],
  [{ mins: 305, color: ATLAS, label: 'Atlas' }, { mins: 130, color: INTERNAL, label: 'Internal' }],
  [{ mins: 192, color: NORTHSTAR, label: 'Homepage revisions' }, { mins: 168, color: NORTHSTAR, label: 'Calls & email' }],
  [{ mins: 420, color: ATLAS, label: 'Atlas' }],
  [{ mins: 120, color: INTERNAL, label: 'Portfolio polish' }],
]

const DAY_TOTALS = ['6h 30m', '7h 15m', '6h 0m', '7h 0m', '2h 0m'] as const

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
    case 'week-fix':
      track('week_over_resolved', {
        fix: action.fix,
        over_mins: currentEvaluation(prev).weekOverMins,
      })
      break
    case 'week-fix-undo':
      track('week_fix_undone', {})
      break
    case 'restart':
    case 'set-scenario':
      /* Demo chrome, not a product event — deliberately not instrumented. */
      break
    default:
      break
  }
}

export function TimerPage() {
  /* Arriving from onboarding lands on Monday — the week decision comes first. */
  const [state, setState] = useState((): DemoState => {
    const base = initialState('conflict', 'asking')
    try {
      const d = Number(new URLSearchParams(window.location.search).get('day'))
      if (d >= 1 && d <= 5) return { ...base, weekDay: d as 1 | 2 | 3 | 4 | 5 }
    } catch {
      /* no search params available */
    }
    return base
  })
  const stateRef = useRef(state)
  const dispatch = useCallback((action: DemoAction) => {
    const prev = stateRef.current
    const next = demoReducer(prev, action)
    stateRef.current = next
    emitEvents(prev, next, action)
    setState(next)
  }, [])

  const coldOpenSent = useRef(false)
  useEffect(() => {
    if (coldOpenSent.current) return
    coldOpenSent.current = true
    track('estimate_prompt_shown', { trigger: 'cold_open', estimate_mins: 180, logged_mins: 192 })
  }, [])

  const evaluation = useMemo(() => currentEvaluation(state), [state])
  /* Monday has its own plan: nothing tracked yet, the whole week committed. */
  const mondayView = useMemo(() => {
    const plan = mondayPlan(state.weekFix === 'defer')
    return { plan, evaluation: evaluate(plan) }
  }, [state.weekFix])
  const onMonday = state.weekDay === 1
  const homepage = state.plan.tasks.find((t) => t.id === 'homepage')
  const remainingMins = homepage?.confirmedRemainingMins ?? 0
  const [capacityNoteOpen, setCapacityNoteOpen] = useState(false)
  const navigate = useNavigate()
  const scope = useScopeToast()

  /* Shown once per session; reopenable from the “?” in the demo bar. */
  const [startOpen, setStartOpen] = useState(() => {
    try {
      return sessionStorage.getItem('make-room-started') === null
    } catch {
      return true
    }
  })
  const [guided, setGuided] = useState(true)
  const closeStart = (wantGuided: boolean) => {
    setGuided(wantGuided)
    setStartOpen(false)
    track('prototype_started', { mode: wantGuided ? 'guided' : 'explore' })
    try {
      sessionStorage.setItem('make-room-started', '1')
    } catch {
      /* private mode — start screen simply reappears */
    }
  }

  const [runningSeconds, setRunningSeconds] = useState(RUNNING_BASE_SECONDS)
  useEffect(() => {
    if (state.phase !== 'running') {
      setRunningSeconds(RUNNING_BASE_SECONDS)
      return
    }
    const id = window.setInterval(() => setRunningSeconds((s) => Math.min(s + 1, 11524)), 1000)
    return () => window.clearInterval(id)
  }, [state.phase])
  const runningClock = fmtClock(runningSeconds)

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
      <CaptureBar
        running={state.phase === 'running'}
        clock={state.phase === 'running' ? runningClock : '0:00:00'}
        description={state.weekDay >= 3 ? 'Homepage revisions' : null}
        onToggle={() =>
          dispatch({ type: state.phase === 'running' ? 'stop' : 'restart' })
        }
        onScope={scope.notInScope}
      />
      <WeekToolbar
        label={`Week one · ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][state.weekDay - 1]} 1${state.weekDay + 6} Aug`}
        onScope={scope.notInScope}
      />
      <DayMeters
        logged={DAY_METERS[state.weekDay - 1]}
        loggedTotal={DAY_TOTALS[state.weekDay - 1]}
        plannedMins={state.weekDay >= 3 ? 135 : 60}
        capacityMins={state.plan.capacityMinsPerDay}
        onViewReports={() => navigate('/reports')}
      />
      <PageContainer>
        <div className="mx-auto flex max-w-6xl gap-5 pt-1">
        <div className="min-w-0 flex-1 space-y-4">
          {!startOpen ? <PremiseNote day={state.weekDay} /> : null}

          {/* On Monday the red card is the message — a second explainer above it just competes. */}
          {guided && !(onMonday && state.weekFix === null) ? (
            <FeatureCoach content={coachFor(state, state.previewMove !== null)} />
          ) : null}

          {onMonday ? (
            <WeekCapacityCard
              plannedMins={mondayView.evaluation.weekPlannedMins + (state.weekFix === 'defer' ? 120 : 0)}
              capacityMins={mondayView.evaluation.weekCapacityMins}
              overMins={state.weekFix === 'defer' ? 120 : mondayView.evaluation.weekOverMins}
              deferrableName="Portfolio polish"
              deferrableMins={120}
              resolved={state.weekFix}
              onFix={(fix) => dispatch({ type: 'week-fix', fix })}
              onUndo={() => dispatch({ type: 'week-fix-undo' })}
            />
          ) : null}


          {homepage &&
          state.weekDay >= 3 &&
          (state.phase === 'asking' || state.phase === 'custom' || state.phase === 'wrong-task') ? (
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

          {state.weekDay >= 3 ? <TodayList state={state} /> : <EarlyWeekList day={state.weekDay === 1 ? 1 : 2} />}

          <div data-tour="week">
            <Card title="This week">
              <div className="pb-2">
                <WeekStrip
                  plan={onMonday ? mondayView.plan : state.plan}
                  evaluation={onMonday ? mondayView.evaluation : evaluation}
                  previewMove={onMonday ? null : state.previewMove}
                  atRiskTaskId={
                    !onMonday && state.phase === 'conflict' ? (evaluation.atRisk?.task.id ?? null) : null
                  }
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

        <aside className="hidden w-[300px] shrink-0 xl:block">
          <WeekOnePanel
            state={{
              day: state.weekDay,
              weekPlanned: true,
              trackedAgainstPlan: state.weekDay >= 2,
              collisionCaught:
                state.phase === 'conflict' ||
                state.phase === 'approved' ||
                state.phase === 'kept',
              planRepaired: state.phase === 'approved',
              originalEstimateMins: homepage?.originalEstimateMins ?? 180,
              expectedTotalMins: homepage
                ? homepage.loggedMins + (homepage.confirmedRemainingMins ?? 0)
                : 192,
              savedTask: evaluation.atRisk ? taskLabel(evaluation.atRisk.task) : 'Atlas — Final handoff',
            }}
          />
        </aside>
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

      <ScopeToast message={scope.message} onDismiss={scope.dismiss} />

      {startOpen ? (
        <StartScreen
          mondayIntro={onMonday && state.weekFix === null}
          onGuided={() => closeStart(true)}
          onExplore={() => closeStart(false)}
        />
      ) : null}

      <SmallScreenNotice />

      <DemoChrome
        scenario={state.scenario}
        weekDay={state.weekDay}
        onRestart={() => dispatch({ type: 'restart' })}
        onScenario={(scenario) => dispatch({ type: 'set-scenario', scenario })}
        onDay={(day) => dispatch({ type: 'set-day', day })}
        onHelp={() => setStartOpen(true)}
        guided={guided}
        onToggleGuided={() => setGuided((g) => !g)}
      />
    </>
  )
}

/*
 * States the demo's premise, so nobody wonders why the account already has
 * data: signup and setup are done, and week one starts here.
 */
/* Compact reminder once the arrival modal has been dismissed. */
function PremiseNote({ day }: { day: 1 | 2 | 3 | 4 | 5 }) {
  const [open, setOpen] = useState(true)
  if (!open) return null
  const dayName = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][day - 1]
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-line bg-bg-secondary px-3.5 py-2">
      <p className="min-w-0 flex-1 text-[12px] leading-4 font-medium text-fg-secondary">
        <strong className="text-fg">{dayName}</strong> of your first week with Toggl · signup and
        planning already done
      </p>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss"
        className="shrink-0 cursor-pointer text-fg-tertiary hover:text-fg"
      >
        <Icon name="close" size={12} />
      </button>
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

/* Days 1–2: an ordinary tracked day. No prompt, because nothing has gone over. */
function EarlyWeekList({ day }: { day: 1 | 2 }) {
  const rows =
    day === 1
      ? [{ label: 'Northstar — Homepage revisions', client: 'Northstar', color: '#fa9200', duration: '4:10:00' },
         { label: 'Northstar — calls & email', client: 'Northstar', color: '#fa9200', duration: '2:20:00' }]
      : [{ label: 'Atlas — Final handoff', client: 'Atlas', color: '#5252d6', duration: '5:05:00' },
         { label: 'Portfolio polish', client: 'Internal', color: '#6c6c7a', duration: '2:10:00' }]
  return (
    <Card title={`Today · ${day === 1 ? 'Monday' : 'Tuesday'}`}>
      <ul className="divide-y divide-(--color-line-muted) pb-1">
        {rows.map((r) => (
          <EntryRow key={r.label} label={r.label} client={r.client} color={r.color} duration={r.duration} />
        ))}
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
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center">
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
  weekDay,
  onRestart,
  onScenario,
  onDay,
  onHelp,
  guided,
  onToggleGuided,
}: {
  scenario: Scenario
  weekDay: 1 | 2 | 3 | 4 | 5
  onRestart: () => void
  onScenario: (scenario: Scenario) => void
  onDay: (day: 1 | 2 | 3 | 4 | 5) => void
  onHelp: () => void
  guided: boolean
  onToggleGuided: () => void
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
      /* Centred within the content area, not the viewport — 249px of rail + sidebar sits to the left. */
      className="fixed bottom-4 left-1/2 z-30 ml-[124px] flex max-w-[calc(100vw-249px-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-1 rounded-full border border-line bg-bg px-2 py-1.5"
      role="group"
      aria-label="Demo controls"
    >
      <span className="px-1.5 text-[11px] font-semibold tracking-[0.275px] text-fg-tertiary uppercase">
        Demo
      </span>
      <Link
        to="/onboarding"
        className="cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
      >
        Onboarding
      </Link>
      <Link
        to="/setup"
        className="cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
      >
        Tasks
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
        onClick={onHelp}
        aria-label="What am I looking at?"
        className="grid size-6 cursor-pointer place-items-center rounded-full text-[12px] font-semibold text-fg-secondary hover:bg-bg-hover hover:text-fg"
      >
        ?
      </button>
      <button
        type="button"
        onClick={onToggleGuided}
        aria-pressed={guided}
        className={[
          'cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium',
          guided ? 'bg-bg-muted text-fg-accent-on-muted' : 'text-fg-secondary hover:bg-bg-hover hover:text-fg',
        ].join(' ')}
      >
        Guide
      </button>
      <span className="h-4 w-px bg-(--color-line)" />
      <span className="px-1 text-[11px] font-semibold tracking-[0.275px] text-fg-tertiary uppercase">
        Day
      </span>
      {([1, 2, 3, 4, 5] as const).map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => onDay(d)}
          aria-pressed={weekDay === d}
          aria-label={`Week day ${d}`}
          className={[
            'size-6 cursor-pointer rounded-full text-[12px] font-medium',
            weekDay === d
              ? 'bg-bg-muted text-fg-accent-on-muted'
              : 'text-fg-secondary hover:bg-bg-hover hover:text-fg',
          ].join(' ')}
        >
          {d}
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
        Metrics
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

const FUNNEL: readonly { event: string; label: string }[] = [
  { event: 'estimate_prompt_shown', label: 'Prompt shown' },
  { event: 'remaining_confirmed', label: 'Remaining confirmed' },
  { event: 'conflict_detected', label: 'Conflict detected' },
  { event: 'make_room_opened', label: 'Make room opened' },
  { event: 'move_previewed', label: 'Move previewed' },
  { event: 'move_approved', label: 'Move approved' },
]

const GUARDRAILS: readonly { event: string; label: string; note: string }[] = [
  { event: 'move_undone', label: 'Move undone', note: 'regret — plan churn' },
  { event: 'plan_kept', label: 'Plan kept', note: 'conflict accepted, not hidden' },
  { event: 'week_fits', label: 'No conflict', note: 'correctly stayed quiet' },
]

/*
 * A one-person session is not a funnel, so this does not pretend to be one. It
 * shows what this session emitted, then the measurement plan those events feed:
 * north star, the load-bearing step, counter-metrics, and the kill criteria.
 */
function EventsPanel() {
  const log = useSyncExternalStore(subscribeTrack, getTrackLog, getTrackLog)
  const count = (name: string) => log.filter((e) => e.name === name).length

  return (
    <div
      className="fixed bottom-16 left-1/2 max-h-[520px] w-[380px] -translate-x-1/2 overflow-y-auto rounded-lg border border-line bg-bg p-3.5"
      role="region"
      aria-label="Measurement plan"
    >
      <p className="uppercase-label pb-0.5">North star</p>
      <p className="text-[12px] leading-4 font-medium text-fg">
        Among <strong>eligible</strong> new freelancers, the share who track or plan on{' '}
        <strong>3+ distinct days in their first 7</strong> — against a matched control.
      </p>
      <p className="mt-1 text-[11px] leading-4 font-medium text-fg-secondary">
        Not prompts shown or moves approved. Those are things the feature does to people; this is
        something people do.
      </p>

      <p className="uppercase-label mt-3 pb-1">This session emitted</p>
      <ul className="space-y-0.5">
        {FUNNEL.map((step) => {
          const n = count(step.event)
          return (
            <li key={step.event} className="flex items-baseline justify-between gap-2 text-[11px]">
              <span className={n > 0 ? 'font-medium text-fg' : 'text-fg-tertiary'}>{step.label}</span>
              <span
                className={[
                  'shrink-0 font-mono tabular-nums',
                  n > 0 ? 'text-fg-success' : 'text-fg-tertiary',
                ].join(' ')}
              >
                {n > 0 ? '✓' : '—'}
              </span>
            </li>
          )
        })}
      </ul>
      <p className="mt-1.5 text-[11px] leading-4 font-medium text-fg-tertiary">
        One session, so no conversion rates — a percentage here would be theatre. At scale this is
        the mechanism funnel, per eligible user.
      </p>

      <p className="uppercase-label mt-3 pb-1">Beyond the funnel</p>
      <ul className="space-y-1.5 text-[11px] leading-4 font-medium text-fg-secondary">
        <li>
          <strong className="text-fg">Replan lead time</strong> <em>(needs the new plan-repair log)</em> — days between detecting a collision
          and the deadline it threatened. The value is not that we warned; it is that we warned
          early. Under a day and we are a late-warning system.
        </li>
        <li>
          <strong className="text-fg">Weekly over-commitment rate</strong> <em>(computable today)</em> — % of freelancer weeks
          planned above capacity. Measurable <em>today</em>, before building.
        </li>
        <li>
          <strong className="text-fg">Estimate calibration trend</strong> <em>(computable today)</em> — does per-client variance
          shrink week over week? The compounding value, and why the original estimate is never
          overwritten.
        </li>
      </ul>

      <p className="uppercase-label mt-3 pb-1">The load-bearing step</p>
      <p className="text-[11px] leading-4 font-medium text-fg-secondary">
        <span className="font-mono text-fg">remaining_confirmed</span> — the only step that needs
        belief. If people will not say what is left, nothing downstream can happen, and it cannot be
        inferred. Watch the <em>mix</em>: a high “Done” rate on tasks later reopened means the prompt
        is being dismissed, not answered.
      </p>

      <p className="uppercase-label mt-3 pb-1">Counter-metrics</p>
      <ul className="space-y-1">
        {GUARDRAILS.map((g) => {
          const n = count(g.event)
          return (
            <li key={g.event} className="flex items-baseline justify-between gap-2 text-[11px]">
              <span className={n > 0 ? 'font-medium text-fg' : 'text-fg-tertiary'}>
                {g.label}
                <span className="ml-1 text-fg-tertiary">— {g.note}</span>
              </span>
              <span className="shrink-0 font-mono tabular-nums text-fg-secondary">{n}</span>
            </li>
          )
        })}
        <li className="flex items-baseline justify-between gap-2 border-t border-line pt-1 text-[11px]">
          <span className="font-medium text-fg-warning">
            Tracked hours vs control
            <span className="ml-1 font-normal text-fg-tertiary">— the existential one</span>
          </span>
          <span className="shrink-0 font-mono text-fg-tertiary">n/a here</span>
        </li>
      </ul>
      <p className="mt-1.5 text-[11px] leading-4 font-medium text-fg-secondary">
        We are adding a question at timer-stop. If that makes people track less, the feature is
        net-negative however well its own funnel performs.
      </p>

      <p className="uppercase-label mt-3 pb-1">Kill it if</p>
      <ul className="list-disc space-y-0.5 pl-3.5 text-[11px] leading-4 font-medium text-fg-secondary">
        <li>The eligible cohort is too small to justify a dedicated surface</li>
        <li>Tracked hours drop in the exposed group</li>
        <li>Conflicts are seen but nothing changes — the warning is noise</li>
        <li>No return lift among eligible exposed users</li>
      </ul>

      <p className="mt-2.5 border-t border-line pt-2 text-[11px] leading-4 font-medium text-fg-secondary">
        <strong className="text-fg">First step is a query, not a build:</strong> size how many W0
        freelancers ever reach this moment. It could end the project cheaply, before any engineering — see{' '}
        <span className="font-mono">docs/measurement-plan.md</span>.
      </p>
    </div>
  )
}
