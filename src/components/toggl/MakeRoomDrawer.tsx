import { useEffect, useMemo, useRef, useState } from 'react'
import {
  DAY_LABEL,
  findRiskyMoves,
  findSafeMoves,
  fmtMins,
  type Evaluation,
  type WeekPlan,
} from '@/lib/planEval'
import type { MoveIntent } from '@/data/demo'
import { Button } from './Button'
import { IconButton } from './Button'
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
  const restoreRef = useRef<HTMLElement | null>(null)
  const [showOther, setShowOther] = useState(false)

  const safeMoves = useMemo(() => findSafeMoves(plan, evaluation), [plan, evaluation])
  const riskyMoves = useMemo(() => findRiskyMoves(plan, evaluation), [plan, evaluation])
  const recommendation = safeMoves[0] ?? null
  const overload = evaluation.overloads[0] ?? null

  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      restoreRef.current?.focus()
    }
  }, [open, onClose])

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
        <span className="text-[16px] font-semibold text-fg">Make room</span>
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
              At risk: <strong>{atRisk.task.name}</strong> · due {DAY_LABEL[atRisk.day]} — it no
              longer fits before its deadline.
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
                        Move {task.name} → {DAY_LABEL[move.toDay]}
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
                          onClick={() =>
                            onPreview({
                              taskId: move.taskId,
                              fromDay: move.fromDay,
                              toDay: move.toDay,
                              mins: move.mins,
                              risky: true,
                              consequence: move.consequence,
                            })
                          }
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
          onClick={() => onKeep(recommendation ? 'acknowledged' : 'overtime')}
        >
          {recommendation ? 'Keep current plan' : 'Accept overtime for now'}
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
          </Button>
        ) : null}
        {previewMove !== null ? (
          <div className="flex gap-2">
            <Button variant="ghost" size="md" onClick={onCancelPreview}>
              Cancel
            </Button>
            <Button variant="primary" size="md" autoFocus onClick={onApprove}>
              Approve move
            </Button>
          </div>
        ) : null}
      </footer>
    </aside>
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
          <Button variant="primary" size="md" autoFocus onClick={onPreview}>
            Preview move
          </Button>
        )}
      </div>
    </div>
  )
}
