import {
  DAY_LABEL,
  fmtMins,
  plannedMins,
  taskLabel,
  WEEK,
  type Evaluation,
  type PlanTask,
  type Weekday,
  type WeekPlan,
} from '@/lib/planEval'
import type { MoveIntent } from '@/data/demo'

const DAY_SHORT: Record<Weekday, string> = {
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
}
const DAY_DATE: Record<Weekday, string> = { mon: '17', tue: '18', wed: '19', thu: '20', fri: '21' }

type Card = {
  key: string
  title: string
  meta: string
  mins: number
  color: string
  kind: 'logged' | 'planned'
  taskId: string | null
  dueHere: boolean
  state: 'normal' | 'ghost' | 'incoming'
}

/*
 * The week as Toggl's Timeline renders it: days across, work as cards inside
 * each day, capacity per column. Moving a task visibly relocates its card,
 * which is the whole point of "make room" being previewable.
 */
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
  const columns = WEEK.map((day) => {
    const cards: Card[] = []

    for (const entry of plan.history) {
      if (entry.day !== day) continue
      cards.push({
        key: entry.id,
        title: entry.label,
        meta: 'tracked',
        mins: entry.mins,
        color: entry.color,
        kind: 'logged',
        taskId: null,
        dueHere: false,
        state: 'normal',
      })
    }

    for (const task of plan.tasks) {
      const mins = plannedMins(task)
      if (mins === 0) continue
      const moving = previewMove?.taskId === task.id
      const base = {
        title: task.name,
        meta: task.client ?? 'Internal',
        mins,
        color: task.color,
        kind: 'planned' as const,
        taskId: task.id,
      }
      if (moving && previewMove) {
        if (task.scheduledDay === day) {
          cards.push({ ...base, key: `${task.id}-ghost`, dueHere: false, state: 'ghost' })
        }
        if (previewMove.toDay === day) {
          cards.push({
            ...base,
            key: `${task.id}-in`,
            dueHere: task.dueDate === day,
            state: 'incoming',
          })
        }
        continue
      }
      if (task.scheduledDay !== day) continue
      cards.push({ ...base, key: task.id, dueHere: task.dueDate === day, state: 'normal' })
    }

    const solid = cards.filter((c) => c.state !== 'ghost').reduce((s, c) => s + c.mins, 0)
    return { day, cards, solid, over: Math.max(solid - plan.capacityMinsPerDay, 0) }
  })

  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {columns.map(({ day, cards, solid, over }) => {
          const isToday = day === plan.today
          const fill = Math.min(solid / plan.capacityMinsPerDay, 1) * 100
          return (
            <section
              key={day}
              aria-label={`${DAY_LABEL[day]}: ${fmtMins(solid)} of ${fmtMins(plan.capacityMinsPerDay)}${
                over > 0 ? ` — ${fmtMins(over)} over` : ''
              }${isToday ? ' (today)' : ''}`}
              className={[
                'flex min-w-0 flex-col rounded-lg border transition-colors',
                over > 0
                  ? 'border-line-error bg-bg-error/30'
                  : isToday
                    ? 'border-line-accent bg-bg'
                    : 'border-line bg-bg',
              ].join(' ')}
            >
              <header className="border-b border-line px-2.5 py-2">
                <div className="flex items-baseline justify-between gap-1">
                  <span
                    className={[
                      'text-[11px] font-semibold tracking-[0.275px] uppercase',
                      isToday ? 'text-fg-accent' : 'text-fg-tertiary',
                    ].join(' ')}
                  >
                    {DAY_SHORT[day]} {DAY_DATE[day]}
                  </span>
                  {over > 0 ? (
                    <span className="text-[11px] font-bold text-fg-error">+{fmtMins(over)}</span>
                  ) : (
                    <span className="text-[11px] font-medium text-fg-tertiary">
                      {fmtMins(Math.max(plan.capacityMinsPerDay - solid, 0))} free
                    </span>
                  )}
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-bg-tertiary">
                  <div
                    className={[
                      'h-full rounded-full transition-all duration-300',
                      over > 0 ? 'bg-bg-destructive' : 'bg-bg-accent',
                    ].join(' ')}
                    style={{ width: `${over > 0 ? 100 : fill}%` }}
                  />
                </div>
              </header>

              <div className={['flex flex-col gap-1.5 p-1.5', compact ? 'min-h-16' : 'min-h-28'].join(' ')}>
                {cards.length === 0 ? (
                  <p className="px-1 py-2 text-[11px] font-medium text-fg-tertiary">Nothing planned</p>
                ) : null}
                {cards.map((card) => (
                  <TaskCard
                    key={card.key}
                    card={card}
                    compact={compact}
                    atRisk={card.taskId !== null && card.taskId === atRiskTaskId}
                  />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {!compact ? (
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-fg-secondary">
          <LegendDot color="#fa9200" label="Northstar" />
          <LegendDot color="#5252d6" label="Atlas" />
          <LegendDot color="#6c6c7a" label="Internal" />
          <span className="inline-flex items-center gap-1.5 text-fg-tertiary">
            <span className="h-1 w-4 rounded-full bg-bg-tertiary" />
            faded = already tracked
          </span>
          <span className="ml-auto text-fg-tertiary">
            {fmtMins(plan.capacityMinsPerDay)}/day
            {onEditCapacity ? (
              <button
                type="button"
                onClick={onEditCapacity}
                className="ml-1.5 cursor-pointer underline underline-offset-2 hover:text-fg"
              >
                from your working hours
              </button>
            ) : null}
          </span>
        </div>
      ) : null}

      {evaluation.atRisk && !compact ? (
        <p className="sr-only">
          At risk: {taskLabel(evaluation.atRisk.task)}, due {DAY_LABEL[evaluation.atRisk.day]}.
        </p>
      ) : null}
    </div>
  )
}

function TaskCard({ card, compact, atRisk }: { card: Card; compact: boolean; atRisk: boolean }) {
  const ghost = card.state === 'ghost'
  return (
    <article
      title={`${card.title} · ${fmtMins(card.mins)}`}
      className={[
        'relative overflow-hidden rounded-md border pr-1.5 pl-2 transition-all duration-200',
        compact ? 'py-1' : 'py-1.5',
        ghost
          ? 'border-dashed border-line-tertiary bg-transparent opacity-60'
          : card.kind === 'logged'
            ? 'border-line bg-bg-secondary'
            : 'border-line bg-bg',
        card.state === 'incoming' ? 'ring-2 ring-(--color-accent-ring)' : '',
        atRisk ? 'ring-2 ring-line-error' : '',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1"
        style={{ backgroundColor: card.color, opacity: ghost ? 0.4 : 1 }}
      />
      <p
        className={[
          'truncate pl-1 text-[11px] leading-4 font-semibold',
          ghost ? 'text-fg-tertiary' : card.kind === 'logged' ? 'text-fg-secondary' : 'text-fg',
        ].join(' ')}
      >
        {card.title}
      </p>
      {!compact ? (
        <p className="truncate pl-1 text-[10px] leading-4 font-medium text-fg-tertiary">
          {card.meta} · {fmtMins(card.mins)}
          {card.dueHere ? ' · due' : ''}
        </p>
      ) : (
        <p className="truncate pl-1 text-[10px] leading-4 font-medium text-fg-tertiary">
          {fmtMins(card.mins)}
        </p>
      )}
      {atRisk ? (
        <span className="mt-0.5 ml-1 inline-flex rounded-sm bg-bg-error px-1 py-px text-[9px] font-bold tracking-[0.3px] text-fg-error uppercase">
          At risk
        </span>
      ) : null}
    </article>
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

export type { PlanTask }
