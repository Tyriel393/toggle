import { useEffect, useMemo, useReducer, useState } from 'react'
import {
  currentEvaluation,
  demoReducer,
  initialState,
  SCENARIO_LABEL,
  type DemoState,
  type Scenario,
} from '@/data/demo'
import { DAY_LABEL, expectedTotalMins, fmtClock, fmtMins, type PlanTask } from '@/lib/planEval'
import { PageContainer, TopBar } from '@/components/toggl/Shell'
import { Button, PlayButton } from '@/components/toggl/Button'
import { Card } from '@/components/toggl/Surface'
import { Badge } from '@/components/toggl/Data'
import { Icon } from '@/components/toggl/Icon'
import { RemainingPrompt } from '@/components/toggl/RemainingPrompt'
import { MakeRoomDrawer } from '@/components/toggl/MakeRoomDrawer'
import { WeekStrip } from '@/components/toggl/WeekStrip'

const RUNNING_BASE_SECONDS = 3 * 3600 + 11 * 60 + 42

export function TimerPage() {
  const [state, dispatch] = useReducer(
    demoReducer,
    undefined,
    (): DemoState => initialState('conflict', 'asking'),
  )
  const evaluation = useMemo(() => currentEvaluation(state), [state])
  const homepage = state.plan.tasks.find((t) => t.id === 'homepage')
  const remainingMins = homepage?.confirmedRemainingMins ?? 0

  return (
    <>
      <TopBar
        title="Timer"
        actions={<span className="text-[14px] font-medium text-fg-secondary">Wednesday · this week</span>}
      />
      <PageContainer>
        <div className="mx-auto max-w-3xl space-y-4 pt-1">
          <TimerBar state={state} onStop={() => dispatch({ type: 'stop' })} onRestart={() => dispatch({ type: 'restart' })} />

          {homepage && (state.phase === 'asking' || state.phase === 'custom' || state.phase === 'wrong-task') ? (
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

          {state.phase === 'kept' ? (
            <div className="flex items-center gap-3 rounded-lg border border-line-warning bg-bg-warning px-4 py-3">
              <span className="text-[14px] font-semibold text-fg-warning">
                {state.keptReason === 'overtime'
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
                onClick={() => dispatch({ type: 'reopen-drawer' })}
              >
                Review
              </Button>
            </div>
          ) : null}

          <TodayList state={state} />

          <Card title="This week">
            <div className="pb-2">
              <WeekStrip
                plan={state.plan}
                evaluation={evaluation}
                previewMove={state.previewMove}
                atRiskTaskId={state.phase === 'conflict' ? (evaluation.atRisk?.task.id ?? null) : null}
              />
            </div>
          </Card>
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

      <DemoChrome
        scenario={state.scenario}
        onRestart={() => dispatch({ type: 'restart' })}
        onScenario={(scenario) => dispatch({ type: 'set-scenario', scenario })}
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
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
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

function DemoChrome({
  scenario,
  onRestart,
  onScenario,
}: {
  scenario: Scenario
  onRestart: () => void
  onScenario: (scenario: Scenario) => void
}) {
  const [theme, setTheme] = useState<ThemeChoice>('system')

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
      className="fixed bottom-4 left-4 z-50 flex items-center gap-1 rounded-full border border-line bg-bg px-2 py-1.5"
      role="group"
      aria-label="Demo controls"
    >
      <span className="px-1.5 text-[11px] font-semibold tracking-[0.275px] text-fg-tertiary uppercase">
        Demo
      </span>
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
        onClick={cycleTheme}
        className="cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
        aria-label={`Theme: ${theme}. Click to change.`}
      >
        {theme === 'system' ? 'Auto' : theme === 'light' ? 'Light' : 'Dark'}
      </button>
    </div>
  )
}
