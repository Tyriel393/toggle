import {
  DAY_LABEL,
  fmtMins,
  plannedMins,
  WEEK,
  type Evaluation,
  type Weekday,
  type WeekPlan,
} from '@/lib/planEval'
import type { MoveIntent } from '@/data/demo'

type Block = {
  key: string
  label: string
  mins: number
  color: string
  kind: 'history' | 'task'
  taskId: string | null
  preview?: 'incoming' | 'ghost'
}

const DAY_SHORT: Record<Weekday, string> = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri' }

/* Light blocks (the orange project) need dark text; 0.179 is the WCAG crossover. */
function labelClass(color: string): string {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16) / 255)
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const lum = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
  return lum > 0.179 ? 'text-black/85' : 'text-white'
}

export function WeekStrip({
  plan,
  evaluation,
  previewMove,
  atRiskTaskId,
  compact = false,
  onEditCapacity,
}: {
  plan: WeekPlan
  evaluation: Evaluation
  previewMove?: MoveIntent | null
  atRiskTaskId?: string | null
  compact?: boolean
  onEditCapacity?: () => void
}) {
  const hourPx = compact ? 13 : 17
  const capacityPx = (plan.capacityMinsPerDay / 60) * hourPx
  const maxPx = capacityPx + 3.2 * hourPx

  const columns = WEEK.map((day) => {
    const blocks: Block[] = []
    for (const entry of plan.history) {
      if (entry.day !== day) continue
      blocks.push({
        key: entry.id,
        label: entry.label,
        mins: entry.mins,
        color: entry.color,
        kind: 'history',
        taskId: null,
      })
    }
    for (const task of plan.tasks) {
      const mins = plannedMins(task)
      if (mins === 0) continue
      const moving = previewMove?.taskId === task.id
      if (moving && previewMove) {
        if (task.scheduledDay === day) {
          blocks.push({
            key: `${task.id}-ghost`, label: task.name, mins, color: task.color,
            kind: 'task', taskId: task.id, preview: 'ghost',
          })
        }
        if (previewMove.toDay === day) {
          blocks.push({
            key: `${task.id}-in`, label: task.name, mins, color: task.color,
            kind: 'task', taskId: task.id, preview: 'incoming',
          })
        }
        continue
      }
      if (task.scheduledDay !== day) continue
      blocks.push({
        key: task.id, label: task.name, mins, color: task.color, kind: 'task', taskId: task.id,
      })
    }

    const solidMins = blocks.filter((b) => b.preview !== 'ghost').reduce((sum, b) => sum + b.mins, 0)
    const overMins = Math.max(solidMins - plan.capacityMinsPerDay, 0)
    return { day, blocks, solidMins, overMins }
  })

  return (
    <div>
      <div className="flex gap-2">
        {columns.map(({ day, blocks, solidMins, overMins }) => (
          <div
            key={day}
            className="flex min-w-0 flex-1 flex-col"
            role="img"
            aria-label={`${DAY_LABEL[day]}: ${fmtMins(solidMins)} of ${fmtMins(plan.capacityMinsPerDay)}${
              overMins > 0 ? ` — ${fmtMins(overMins)} over` : ''
            }${day === plan.today ? ' (today)' : ''}`}
          >
            <p
              className={[
                'h-5 text-center text-[12px] font-semibold',
                overMins > 0 ? 'text-fg-error' : 'text-transparent',
              ].join(' ')}
              aria-hidden="true"
            >
              {overMins > 0 ? `+${fmtMins(overMins)}` : '·'}
            </p>
            <div className="relative rounded-sm bg-bg-secondary" style={{ height: maxPx }} aria-hidden="true">
              <div
                className="pointer-events-none absolute inset-x-0 z-10 border-t border-dashed border-line-tertiary"
                style={{ bottom: capacityPx }}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col-reverse gap-px overflow-hidden rounded-sm">
                {blocks.map((b) => {
                  const px = Math.max((b.mins / 60) * hourPx, 6)
                  const overCapacity = overMins > 0 && b.kind === 'task'
                  return (
                    <div
                      key={b.key}
                      title={`${b.label} · ${fmtMins(b.mins)}`}
                      className={[
                        'flex items-center justify-center overflow-hidden rounded-[3px] px-1 transition-all',
                        b.preview === 'ghost' ? 'border border-dashed border-line-tertiary bg-transparent' : '',
                        b.preview === 'incoming' ? 'ring-2 ring-(--color-accent-ring)' : '',
                        atRiskTaskId !== null && b.taskId === atRiskTaskId ? 'ring-2 ring-line-error' : '',
                      ].join(' ')}
                      style={{
                        height: px,
                        backgroundColor: b.preview === 'ghost' ? undefined : b.color,
                        opacity: b.kind === 'history' ? 0.45 : 1,
                        outline: overCapacity && !b.preview ? '1px solid rgb(var(--stroke-error))' : undefined,
                      }}
                    >
                      {!compact && px >= 22 ? (
                        <span
                          className={[
                            'truncate text-[10px] font-semibold',
                            b.preview === 'ghost' ? 'text-fg-tertiary' : labelClass(b.color),
                          ].join(' ')}
                        >
                          {b.label}
                        </span>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </div>
            <p
              className={[
                'mt-1.5 text-center text-[11px] font-semibold tracking-[0.275px] uppercase',
                day === plan.today ? 'text-fg-accent' : 'text-fg-tertiary',
              ].join(' ')}
              aria-hidden="true"
            >
              {DAY_SHORT[day]}
              {day === plan.today ? ' ·' : ''}
            </p>
          </div>
        ))}
      </div>
      {!compact ? (
        <div className="mt-2 flex items-center gap-4 text-[11px] font-medium text-fg-secondary">
          <LegendDot color="#fa9200" label="Northstar" />
          <LegendDot color="#5252d6" label="Atlas" />
          <LegendDot color="#6c6c7a" label="Internal" />
          <span className="ml-auto text-fg-tertiary">
            Dashed line = {fmtMins(plan.capacityMinsPerDay)}/day
            <button
              type="button"
              onClick={onEditCapacity}
              className="ml-1.5 cursor-pointer underline underline-offset-2 hover:text-fg"
            >
              from your working hours
            </button>
          </span>
        </div>
      ) : null}
      {evaluation.atRisk && !compact ? (
        <p className="sr-only">
          At risk: {evaluation.atRisk.task.name}, due {DAY_LABEL[evaluation.atRisk.day]}.
        </p>
      ) : null}
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  )
}
