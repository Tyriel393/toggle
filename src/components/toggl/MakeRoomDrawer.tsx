import { useEffect, useMemo, useRef, useState } from 'react'
import {
  DAY_LABEL,
  findRiskyMoves,
  findSafeMoves,
  fmtMins,
  taskLabel,
  type Evaluation,
  type WeekPlan,
} from '@/lib/planEval'
import type { MoveIntent } from '@/data/demo'
import { Button } from './Button'
import { IconButton } from './Button'
import { Kbd } from './Data'
import { Icon } from './Icon'
import { WeekStrip } from './WeekStrip'

/*
 * Steps 2-4 in Toggl's 500px right-drawer pattern. Non-blocking of thought,
 * blocking of nothing: names the collision, offers only safe moves, and every
 * judgment call stays with the user. Escape / close = conflict acknowledged.
 */
export function MakeRoomDrawer({
  open,
  plan,
  evaluation,
  remainingMins,
  previewMove,
  onPreview,
  onCancelPreview,
  onApprove,
  onKeep,
  onClose,
}: {
  open: boolean
  plan: WeekPlan
  evaluation: Evaluation
  remainingMins: number
  previewMove: MoveIntent | null
  onPreview: (move: MoveIntent) => void
  onCancelPreview: () => void
  onApprove: () => void
  onKeep: (reason: 'overtime' | 'acknowledged') => void
  onClose: () => void
}) {
  const panelRef = useRef<HTMLElement>(null)
  /* Open by default: hiding the riskier choices makes the safe one look like the only one. */
  const [showOther, setShowOther] = useState(true)
  const [confirming, setConfirming] = useState<MoveIntent | null>(null)

  const safeMoves = useMemo(() => findSafeMoves(plan, evaluation), [plan, evaluation])
  const riskyMoves = useMemo(() => findRiskyMoves(plan, evaluation), [plan, evaluation])
  const recommendation = safeMoves[0] ?? null
  const overload = evaluation.overloads[0] ?? null

  /* Keyboard actions read through refs so the handler registers once per open. */
  const onCloseRef = useRef<() => void>(() => {})
  const onKeepRef = useRef<() => void>(() => {})
  const onPreviewRecommendationRef = useRef<() => void>(() => {})
  const onApproveIfPreviewingRef = useRef<() => void>(() => {})
  onCloseRef.current = onClose
  onKeepRef.current = () => onKeep(recommendation ? 'acknowledged' : 'overtime')
  onPreviewRecommendationRef.current = () => {
    if (recommendation && previewMove === null) {
      onPreview({
        taskId: recommendation.taskId,
        fromDay: recommendation.fromDay,
        toDay: recommendation.toDay,
        mins: recommendation.mins,
        risky: false,
        consequence: null,
      })
    }
  }
  onApproveIfPreviewingRef.current = () => {
    if (previewMove !== null) onApprove()
  }

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.repeat) return
      const t = e.target
      const typing =
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        (t instanceof HTMLElement && t.isContentEditable)
      if (typing || e.ctrlKey || e.metaKey || e.altKey) return
      const key = e.key.toLowerCase()
      if (key === 'k') {
        e.preventDefault()
        onKeepRef.current()
        return
      }
      if (key === 'p') {
        e.preventDefault()
        onPreviewRecommendationRef.current()
        return
      }
      if (e.key === 'Enter' && !(t instanceof HTMLButtonElement)) {
        e.preventDefault()
        onApproveIfPreviewingRef.current()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  if (!open || !overload) return null

  const taskById = (id: string) => plan.tasks.find((t) => t.id === id)
  const atRisk = evaluation.atRisk

  return (
    <aside
      ref={panelRef}
      role="complementary"
      aria-label="Make room"
      className="fixed inset-y-0 right-0 z-40 flex w-[500px] max-w-full flex-col border-l border-line bg-bg"
    >
      <header className="flex items-center gap-3 border-b border-line px-5 py-3.5">
        <span className="grid size-6 place-items-center rounded-full bg-bg-error text-[12px] font-bold text-fg-error">
          !
        </span>
        <span className="flex items-center gap-1 text-[16px] font-semibold text-fg">
          Make room
          <span className="text-[10px] text-fg-accent" title="Premium — priced with Toggl's existing capacity intelligence">
            ★
          </span>
        </span>
        <IconButton icon="close" label="Close — keep current plan" onClick={onClose} className="ml-auto size-7" />
      </header>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        <div className="rounded-lg border border-line-error bg-bg-error px-4 py-3">
          <p className="text-[14px] font-semibold text-fg-error">
            Fitting {fmtMins(remainingMins)} more into this week puts {DAY_LABEL[overload.day]}{' '}
            {fmtMins(overload.overMins)} over.
          </p>
          {atRisk ? (
            <p className="mt-1 text-[13px] font-medium text-fg-error">
              At risk: <strong>{taskLabel(atRisk.task)}</strong> · due {DAY_LABEL[atRisk.day]} — it
              no longer fits before its deadline.
            </p>
          ) : null}
        </div>

        <WeekStrip
          plan={plan}
          evaluation={evaluation}
          previewMove={previewMove}
          atRiskTaskId={atRisk?.task.id ?? null}
          compact
        />

        {recommendation ? (
          <RecommendationCard
            title={`Move ${taskById(recommendation.taskId)?.name ?? ''} to ${DAY_LABEL[recommendation.toDay]}`}
            body={`It has no deadline — moving it doesn't put a dated commitment at risk. ${DAY_LABEL[overload.day]} fits again.`}
            previewing={previewMove?.taskId === recommendation.taskId && !previewMove.risky}
            onPreview={() =>
              onPreview({
                taskId: recommendation.taskId,
                fromDay: recommendation.fromDay,
                toDay: recommendation.toDay,
                mins: recommendation.mins,
                risky: false,
                consequence: null,
              })
            }
            onCancel={onCancelPreview}
            onApprove={onApprove}
          />
        ) : (
          <div className="rounded-lg border border-line bg-bg-secondary px-4 py-3">
            <p className="text-[14px] font-semibold text-fg">
              Nothing can move without touching a dated commitment.
            </p>
            <p className="mt-1 text-[13px] font-medium text-fg-secondary">
              Every remaining option risks a deadline. Review the trade-offs below, or accept the
              overtime consciously — Toggl won&apos;t choose which client matters for you.
            </p>
          </div>
        )}

        <div className="border-t border-line pt-3">
          <button
            type="button"
            onClick={() => setShowOther((v) => !v)}
            aria-expanded={showOther}
            className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-fg"
          >
            <span className={['transition-transform', showOther || !recommendation ? 'rotate-0' : '-rotate-90'].join(' ')}>
              <Icon name="chevronDown" size={12} />
            </span>
            Other options
          </button>
          {showOther || !recommendation ? (
            <ul className="mt-2 space-y-2">
              {riskyMoves.map((move) => {
                const task = taskById(move.taskId)
                if (!task) return null
                const active = previewMove?.taskId === move.taskId && previewMove.risky
                return (
                  <li
                    key={`${move.taskId}-${move.toDay}`}
                    className="rounded-lg border border-line px-3.5 py-2.5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: task.color }} />
                      <span className="text-[14px] font-medium text-fg">
                        Move {taskLabel(task)} → {DAY_LABEL[move.toDay]}
                      </span>
                    </div>
                    <p
                      className={[
                        'mt-0.5 pl-4 text-[12px] font-medium',
                        move.breaksDeadline ? 'text-fg-error' : 'text-fg-secondary',
                      ].join(' ')}
                    >
                      {move.consequence}
                    </p>
                    <div className="mt-1.5 flex gap-2 pl-4">
                      {active ? (
                        <>
                          <Button variant="primary" size="sm" onClick={onApprove}>
                            Approve move
                          </Button>
                          <Button variant="ghost" size="sm" onClick={onCancelPreview}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            const intent: MoveIntent = {
                              taskId: move.taskId,
                              fromDay: move.fromDay,
                              toDay: move.toDay,
                              mins: move.mins,
                              risky: true,
                              consequence: move.consequence,
                            }
                            if (move.breaksDeadline) setConfirming(intent)
                            else onPreview(intent)
                          }}
                        >
                          Preview
                        </Button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-line px-5 py-3.5">
        <Button
          variant="ghost"
          size="md"
          autoFocus={!recommendation}
          onClick={() => onKeep(recommendation ? 'acknowledged' : 'overtime')}
        >
          {recommendation ? 'Keep current plan' : 'Accept overtime for now'}
          <Kbd>K</Kbd>
        </Button>
        {recommendation && previewMove === null ? (
          <Button
            variant="primary"
            size="md"
            autoFocus
            onClick={() =>
              onPreview({
                taskId: recommendation.taskId,
                fromDay: recommendation.fromDay,
                toDay: recommendation.toDay,
                mins: recommendation.mins,
                risky: false,
                consequence: null,
              })
            }
          >
            Preview move
            <Kbd>P</Kbd>
          </Button>
        ) : null}
        {previewMove !== null ? (
          <div className="flex gap-2">
            <Button variant="ghost" size="md" onClick={onCancelPreview}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={onApprove}>
              Approve move
              <Kbd>↵</Kbd>
            </Button>
          </div>
        ) : null}
      </footer>

      {confirming ? (
        <ConfirmBreak
          taskName={taskById(confirming.taskId)?.name ?? 'this work'}
          consequence={confirming.consequence ?? ''}
          onCancel={() => setConfirming(null)}
          onConfirm={() => {
            onPreview(confirming)
            setConfirming(null)
          }}
        />
      ) : null}
    </aside>
  )
}

/*
 * Breaking a dated commitment is the one action the user should have to say out
 * loud. Toggl will do it — but not quietly, and not without naming the cost.
 */
function ConfirmBreak({
  taskName,
  consequence,
  onCancel,
  onConfirm,
}: {
  taskName: string
  consequence: string
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center bg-black/60 p-5">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label="Confirm missed deadline"
        className="w-full rounded-lg border border-line-error bg-bg p-5"
      >
        <p className="text-[15px] leading-6 font-semibold text-fg">
          This one misses a client deadline.
        </p>
        <p className="mt-1.5 text-[13px] leading-5 font-medium text-fg-secondary">
          Moving <strong className="text-fg">{taskName}</strong> {consequence}. That is a promise to
          someone, not a preference — so Toggl will not do it on a single click.
        </p>
        <p className="mt-2.5 rounded-lg border border-line bg-bg-secondary px-3 py-2 text-[12px] leading-4 font-medium text-fg-secondary">
          You can still preview it first, and undo it afterwards. Nothing is sent to the client
          either way.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="secondary" size="md" autoFocus onClick={onCancel}>
            Pick something else
          </Button>
          <Button variant="destructive" size="md" onClick={onConfirm}>
            Preview it anyway
          </Button>
        </div>
      </div>
    </div>
  )
}

function RecommendationCard({
  title,
  body,
  previewing,
  onPreview,
  onCancel,
  onApprove,
}: {
  title: string
  body: string
  previewing: boolean
  onPreview: () => void
  onCancel: () => void
  onApprove: () => void
}) {
  return (
    <div className="rounded-lg border border-line-accent bg-bg-muted px-4 py-3">
      <p className="text-[11px] font-semibold tracking-[0.275px] text-fg-accent-on-muted uppercase">
        Suggested
      </p>
      <p className="mt-1 text-[14px] font-semibold text-fg">{title}</p>
      <p className="mt-0.5 text-[13px] font-medium text-fg-secondary">{body}</p>
      <div className="mt-2.5 flex gap-2">
        {previewing ? (
          <>
            <Button variant="primary" size="md" onClick={onApprove}>
              Approve move
            </Button>
            <Button variant="ghost" size="md" onClick={onCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="primary" size="md" onClick={onPreview}>
            Preview move
          </Button>
        )}
      </div>
    </div>
  )
}
