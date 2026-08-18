import { fmtMins } from '@/lib/planEval'
import { Button } from './Button'
import { Icon } from './Icon'

export type WeekFix = 'defer' | 'overtime' | 'renegotiate'

/*
 * Toggl already computes a weekly capacity figure — the "Xh free" on the
 * Timeline lane. It never acts on it. This is the Monday decision: the week is
 * already over before it starts, and there are only three honest ways out.
 */
export function WeekCapacityCard({
  plannedMins,
  capacityMins,
  overMins,
  deferrableName,
  deferrableMins,
  resolved,
  onFix,
  onUndo,
}: {
  plannedMins: number
  capacityMins: number
  overMins: number
  deferrableName: string
  deferrableMins: number
  resolved: WeekFix | null
  onFix: (fix: WeekFix) => void
  onUndo: () => void
}) {
  if (resolved !== null) {
    return (
      <section className="rounded-lg border border-line-success bg-bg-success px-4 py-3.5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-bg-affirmative">
            <Icon name="checkCircle" size={13} className="text-fg-inverted" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-fg-success">
              {resolved === 'defer' && `Your week fits — ${deferrableName} moved to next week.`}
              {resolved === 'overtime' && `Week accepted at ${fmtMins(plannedMins)} — ${fmtMins(overMins)} of overtime.`}
              {resolved === 'renegotiate' && 'Northstar asked for a new date — the week is on hold, not silently late.'}
            </p>
            <p className="mt-1 text-[13px] leading-5 font-medium text-fg-secondary">
              {resolved === 'defer' &&
                'Nothing with a deadline moved, and the roadmap below updated. You made this call on Monday, not on Thursday when it would already be late.'}
              {resolved === 'overtime' &&
                'A real answer, recorded rather than hidden. Toggl will hold you to it — if the hours do not appear, the week is short again.'}
              {resolved === 'renegotiate' &&
                'Toggl does not send the message. It gives you the fact to send: 46h of committed work against a 40h week.'}
            </p>
            <Button variant="secondary" size="sm" className="mt-2.5" onClick={onUndo}>
              Undo
            </Button>
          </div>
        </div>
      </section>
    )
  }

  const pct = Math.min((plannedMins / capacityMins) * 100, 100)
  const overPct = Math.min((overMins / capacityMins) * 100, 100)

  return (
    <section
      aria-label="Week over capacity"
      className="rounded-lg border border-line-error bg-bg px-4 py-3.5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-bg-error text-[12px] font-bold text-fg-error">
          !
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-fg">
            Your week is {fmtMins(overMins)} over before it starts.
          </p>
          <p className="mt-1 text-[13px] leading-5 font-medium text-fg-secondary">
            You have committed <strong className="text-fg">{fmtMins(plannedMins)}</strong> of work
            into a <strong className="text-fg">{fmtMins(capacityMins)}</strong> week. Today is
            Monday — this is the cheapest moment it will ever be to fix.
          </p>

          <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-bg-tertiary">
            <span className="h-full bg-bg-accent" style={{ width: `${pct - overPct}%` }} />
            <span className="h-full bg-bg-destructive" style={{ width: `${overPct}%` }} />
          </div>
          <div className="mt-1 flex justify-between text-[11px] font-medium text-fg-tertiary">
            <span>{fmtMins(capacityMins)} capacity</span>
            <span className="text-fg-error">+{fmtMins(overMins)} over</span>
          </div>

          <p className="uppercase-label mt-3.5 pb-1.5">Three honest ways out</p>
          <div className="space-y-2">
            <Option
              title={`Move ${deferrableName} to next week`}
              detail={`${fmtMins(deferrableMins)}, no deadline — the only thing here that can move without breaking a promise.`}
              tone="safe"
              onClick={() => onFix('defer')}
            />
            <Option
              title={`Work ${fmtMins(overMins)} more this week`}
              detail="A valid choice, recorded rather than assumed. Toggl will not pretend the week fits."
              tone="neutral"
              onClick={() => onFix('overtime')}
            />
            <Option
              title="Ask Northstar to move their date"
              detail="Toggl drafts the fact, not the message — you have committed 46h against a 40h week."
              tone="neutral"
              onClick={() => onFix('renegotiate')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Option({
  title,
  detail,
  tone,
  onClick,
}: {
  title: string
  detail: string
  tone: 'safe' | 'neutral'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex w-full cursor-pointer items-start gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors',
        tone === 'safe'
          ? 'border-line-accent bg-bg-muted hover:bg-bg-muted-hover'
          : 'border-line bg-bg hover:bg-bg-hover',
      ].join(' ')}
    >
      <span className="min-w-0 flex-1">
        <span
          className={[
            'block text-[13px] font-semibold',
            tone === 'safe' ? 'text-fg-accent-on-muted' : 'text-fg',
          ].join(' ')}
        >
          {title}
        </span>
        <span className="mt-0.5 block text-[12px] leading-4 font-medium text-fg-secondary">
          {detail}
        </span>
      </span>
      <span aria-hidden="true" className="mt-0.5 shrink-0 text-fg-tertiary">
        →
      </span>
    </button>
  )
}
