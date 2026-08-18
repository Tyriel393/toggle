import { useEffect, useRef, useState } from 'react'
import { fmtMins, parseDuration, type PlanTask } from '@/lib/planEval'
import { Button } from './Button'
import { Kbd } from './Data'
import { Input } from './Field'

function isTypingTarget(e: KeyboardEvent): boolean {
  const t = e.target
  return (
    t instanceof HTMLInputElement ||
    t instanceof HTMLTextAreaElement ||
    t instanceof HTMLSelectElement ||
    (t instanceof HTMLElement && t.isContentEditable)
  )
}

/*
 * The core ask. Chips state time LEFT, not additions to the estimate —
 * "2h left" is unambiguous where "+2h" is not. The original estimate is
 * never modified; the answer lands in confirmedRemainingMins.
 */
export function RemainingPrompt({
  task,
  mode,
  reassignTargets,
  onConfirm,
  onDone,
  onWrongTask,
  onReassign,
  onDefer,
  onOpenCustom,
  onBackToAsk,
}: {
  task: PlanTask
  mode: 'asking' | 'custom' | 'wrong-task'
  reassignTargets: readonly PlanTask[]
  onConfirm: (mins: number) => void
  onDone: () => void
  onWrongTask: () => void
  onReassign: (taskId: string) => void
  onDefer: () => void
  onOpenCustom: () => void
  onBackToAsk: () => void
}) {
  const rootRef = useRef<HTMLElement>(null)
  const [customValue, setCustomValue] = useState('')
  const [customError, setCustomError] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const target =
      mode === 'custom'
        ? root.querySelector<HTMLInputElement>('input')
        : root.querySelector<HTMLButtonElement>('button')
    target?.focus()
  }, [mode])

  useEffect(() => {
    if (mode !== 'asking') return
    const handler = (e: KeyboardEvent) => {
      if (e.repeat || isTypingTarget(e) || e.ctrlKey || e.metaKey || e.altKey) return
      const key = e.key.toLowerCase()
      const actions: Record<string, () => void> = {
        d: onDone,
        '1': () => onConfirm(30),
        '2': () => onConfirm(60),
        '3': () => onConfirm(120),
        c: onOpenCustom,
        w: onWrongTask,
        n: onDefer,
      }
      const action = actions[key]
      if (action) {
        e.preventDefault()
        action()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [mode, onDone, onConfirm, onOpenCustom, onWrongTask, onDefer])

  const submitCustom = () => {
    const mins = parseDuration(customValue)
    if (mins === null) {
      setCustomError(true)
      return
    }
    setCustomError(false)
    onConfirm(mins)
  }

  return (
    <section
      ref={rootRef}
      role="region"
      aria-label="Estimate reached"
      className="rounded-lg border border-line-warning bg-bg p-4"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-bg-warning text-[12px] font-bold text-fg-warning">
          !
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-fg">
            You&apos;ve reached your {fmtMins(task.originalEstimateMins)} estimate on {task.name}.
          </p>
          <p className="mt-0.5 text-[14px] font-medium text-fg-secondary">
            {fmtMins(task.loggedMins)} logged. Is it done, or is there more to do?
          </p>

          {mode === 'asking' ? (
            <>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button variant="affirmative" size="md" onClick={onDone}>
                  ✓ Done
                  <Kbd>D</Kbd>
                </Button>
                {[30, 60, 120].map((mins, index) => (
                  <Button key={mins} variant="secondary" size="md" onClick={() => onConfirm(mins)}>
                    {fmtMins(mins)} left
                    <Kbd>{String(index + 1)}</Kbd>
                  </Button>
                ))}
                <Button variant="secondary" size="md" onClick={onOpenCustom}>
                  Custom…
                  <Kbd>C</Kbd>
                </Button>
              </div>
              <div className="mt-2.5 flex items-center gap-4">
                <QuietAction onClick={onWrongTask}>
                  Logged to wrong task
                  <Kbd>W</Kbd>
                </QuietAction>
                <QuietAction onClick={onDefer}>
                  Not sure yet
                  <Kbd>N</Kbd>
                </QuietAction>
              </div>
            </>
          ) : null}

          {mode === 'custom' ? (
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <Input
                  value={customValue}
                  onChange={(e) => {
                    setCustomValue(e.target.value)
                    setCustomError(false)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.nativeEvent.isComposing) submitCustom()
                  }}
                  placeholder="e.g. 1h 30m"
                  aria-label="Time left"
                  aria-invalid={customError}
                  className="w-36"
                />
                <Button variant="primary" size="md" onClick={submitCustom}>
                  Set time left
                </Button>
                <Button variant="ghost" size="md" onClick={onBackToAsk}>
                  Back
                </Button>
              </div>
              {customError ? (
                <p className="mt-1.5 text-[12px] font-medium text-fg-error">
                  Try a duration like “45m”, “2h” or “1h 30m”.
                </p>
              ) : null}
            </div>
          ) : null}

          {mode === 'wrong-task' ? (
            <div className="mt-3">
              <p className="text-[13px] font-medium text-fg-secondary">
                Move this session&apos;s {fmtMins(task.loggedMins)} to — no replanning from bad data:
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {reassignTargets.map((t) => (
                  <Button key={t.id} variant="secondary" size="md" onClick={() => onReassign(t.id)}>
                    <span className="size-2 rounded-full" style={{ backgroundColor: t.color }} />
                    {t.name}
                  </Button>
                ))}
                <Button variant="ghost" size="md" onClick={onBackToAsk}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function QuietAction({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex cursor-pointer items-center gap-1 text-[13px] font-medium text-fg-secondary underline underline-offset-2 hover:text-fg"
    >
      {children}
    </button>
  )
}
