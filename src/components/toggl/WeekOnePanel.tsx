import { useState } from 'react'
import { Icon } from './Icon'
import { fmtMins } from '@/lib/planEval'

export type WeekOneState = {
  day: 1 | 2 | 3 | 4 | 5
  weekPlanned: boolean
  trackedAgainstPlan: boolean
  collisionCaught: boolean
  planRepaired: boolean
  originalEstimateMins: number
  expectedTotalMins: number
  savedTask: string | null
}

const DAY_NAME = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const

const TOGGL_CHECKLIST = [
  'Create a project',
  'Start a time entry',
  'View your reports',
  'Plan a time slot',
] as const

/*
 * The week-shaped arc, with Toggl's own four-item checklist available for
 * comparison but collapsed by default — the contrast is the argument, not
 * something a first-time viewer needs competing for attention on arrival.
 */
export function WeekOnePanel({ state }: { state: WeekOneState }) {
  const [showChecklist, setShowChecklist] = useState(false)
  const pct = Math.round((state.expectedTotalMins / state.originalEstimateMins - 1) * 100)

  const rows = [
    { day: 1, label: 'Week planned', detail: '3 jobs, 2 with deadlines', done: state.weekPlanned },
    {
      day: 2,
      label: 'Tracked against the plan',
      detail: 'not just hours in a list',
      done: state.trackedAgainstPlan,
    },
    {
      day: 3,
      label: 'A collision caught',
      detail: state.collisionCaught
        ? `${state.savedTask ?? 'A deadline'} was going to slip`
        : 'while there is still time to act',
      done: state.collisionCaught,
    },
    {
      day: 4,
      label: 'Plan repaired',
      detail: state.planRepaired ? 'you chose what moved' : 'nothing moves without approval',
      done: state.planRepaired,
    },
    {
      day: 5,
      label: 'You learn something',
      detail: 'what your quoting is actually worth',
      done: state.day >= 5 && state.planRepaired,
    },
  ]

  return (
    <div className="flex flex-col gap-3">
      <section className="rounded-lg border border-line-accent bg-bg">
        <header className="flex items-center justify-between border-b border-line px-3.5 py-2.5">
          <h3 className="text-[13px] font-semibold text-fg">Your first week</h3>
          <span className="text-[12px] font-medium text-fg-accent">{DAY_NAME[state.day - 1]}</span>
        </header>
        <ol className="px-3.5 py-2.5">
          {rows.map((row) => {
            const current = row.day === state.day && !row.done
            return (
              <li key={row.day} className="flex gap-2.5 py-1.5">
                <span
                  className={[
                    'mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border text-[9px] font-bold',
                    row.done
                      ? 'border-transparent bg-bg-affirmative text-white'
                      : current
                        ? 'border-line-accent text-fg-accent'
                        : 'border-line-tertiary text-fg-tertiary',
                  ].join(' ')}
                >
                  {row.done ? '✓' : row.day}
                </span>
                <span className="min-w-0">
                  <span
                    className={[
                      'block text-[13px] leading-4 font-medium',
                      row.done || current ? 'text-fg' : 'text-fg-tertiary',
                    ].join(' ')}
                  >
                    {row.label}
                  </span>
                  <span className="block text-[11px] leading-4 font-medium text-fg-secondary">
                    {row.detail}
                  </span>
                </span>
              </li>
            )
          })}
        </ol>

        {state.day >= 5 && state.planRepaired ? (
          <div className="border-t border-line-accent bg-bg-muted px-3.5 py-3">
            <p className="text-[13px] leading-5 font-semibold text-fg">
              You quoted Homepage revisions at {fmtMins(state.originalEstimateMins)}. It took{' '}
              {fmtMins(state.expectedTotalMins)} — {pct}% over.
            </p>
            <p className="mt-1 text-[11px] leading-4 font-medium text-fg-secondary">
              {state.savedTask ?? 'Your deadline'} shipped on time because you moved something on
              Wednesday. Neither fact existed on Monday.
            </p>
          </div>
        ) : (
          <p className="border-t border-line px-3.5 py-2.5 text-[11px] leading-4 font-medium text-fg-secondary">
            None of this can be finished on day one. That is the point — a week-one measure has to
            take a week.
          </p>
        )}
      </section>

      <section className="rounded-lg border border-line bg-bg">
        <button
          type="button"
          onClick={() => setShowChecklist((v) => !v)}
          aria-expanded={showChecklist}
          className="flex w-full cursor-pointer items-center gap-2 px-3.5 py-2.5 text-left"
        >
          <span
            className={['transition-transform', showChecklist ? 'rotate-0' : '-rotate-90'].join(' ')}
          >
            <Icon name="chevronDown" size={11} className="text-fg-tertiary" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] font-semibold text-fg">
              Compare with Toggl today
            </span>
            <span className="block text-[11px] leading-4 font-medium text-fg-secondary">
              Its activation checklist, unchanged
            </span>
          </span>
          <span className="shrink-0 rounded-sm bg-bg-success px-1.5 py-0.5 text-[11px] font-semibold text-fg-success">
            4/4
          </span>
        </button>

        {showChecklist ? (
          <div className="border-t border-line px-3.5 py-2.5">
            <ul>
              {TOGGL_CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-2 py-1">
                  <Icon name="checkCircle" size={13} className="shrink-0 text-fg-success" />
                  <span className="text-[13px] font-medium text-fg-tertiary line-through">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] leading-4 font-medium text-fg-secondary">
              All four complete on one interaction each — <em>View your reports</em> ticks on page
              load. Finished in a single session, on day one, before there is any data to look at.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  )
}
