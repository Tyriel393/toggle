import { useState } from 'react'
import { fmtMins } from '@/lib/planEval'
import { Button } from './Button'
import { Icon } from './Icon'

export type WeekFix = 'defer' | 'overtime' | 'renegotiate'

type Detail = { id: string; label: string; sub: string; safe: boolean }

/*
 * Toggl already computes a weekly capacity figure — the "Xh free" on the
 * Timeline lane. It never acts on it. This is the Monday decision, and like the
 * Wednesday one it does not stop at naming the problem: each way out expands
 * into the specific choices behind it.
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
  const [open, setOpen] = useState<WeekFix | null>(null)
  const [picked, setPicked] = useState<string | null>(null)

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
              {resolved === 'overtime' &&
                `Week accepted at ${fmtMins(plannedMins)} — ${fmtMins(overMins)} of overtime, recorded.`}
              {resolved === 'renegotiate' &&
                'Northstar asked for a new date — the week is on hold, not silently late.'}
            </p>
            <p className="mt-1 text-[13px] leading-5 font-medium text-fg-secondary">
              {resolved === 'defer' &&
                'Nothing with a deadline moved, and the roadmap below updated. You made this call on Monday, not on Thursday when it would already be late.'}
              {resolved === 'overtime' &&
                'Toggl will hold you to it — if those hours do not appear, the week is short again and it will say so.'}
              {resolved === 'renegotiate' &&
                'Toggl does not send the message. It gives you the fact to send.'}
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

  const details: Record<WeekFix, { heading: string; options: Detail[] }> = {
    defer: {
      heading: `Where should ${deferrableName} go?`,
      options: [
        { id: 'next-week', label: 'Next week', sub: 'Monday is empty — nothing competes with it', safe: true },
        { id: 'friday', label: 'Friday', sub: 'Only 30m free — it would put Friday over', safe: false },
        { id: 'drop', label: "Don't do it at all", sub: 'It is your own work; nobody is waiting on it', safe: true },
      ],
    },
    overtime: {
      heading: `Where do the extra ${fmtMins(overMins)} come from?`,
      options: [
        { id: 'spread', label: 'An extra 30m across four days', sub: 'Least disruptive — no single long day', safe: true },
        { id: 'one-day', label: `${fmtMins(overMins)} on Thursday`, sub: 'One long day, rest of the week untouched', safe: true },
        { id: 'weekend', label: 'Saturday morning', sub: 'Outside your working hours — Toggl will not suggest this again', safe: false },
      ],
    },
    renegotiate: {
      heading: 'Which date do you want moved?',
      options: [
        { id: 'northstar', label: 'Northstar — due Tuesday', sub: 'The tightest one, and the client you quote lowest', safe: true },
        { id: 'meridian', label: 'Meridian — due Wednesday', sub: '9h of work, one day of slack behind it', safe: true },
        { id: 'atlas', label: 'Atlas — due Thursday', sub: 'Final handoff. Moving this one is expensive', safe: false },
      ],
    },
  }

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
              id="defer"
              title={`Move ${deferrableName}`}
              detail={`${fmtMins(deferrableMins)}, no deadline — the only thing here that can move without breaking a promise.`}
              tone="safe"
              open={open === 'defer'}
              onToggle={() => {
                setOpen(open === 'defer' ? null : 'defer')
                setPicked(null)
              }}
            />
            {open === 'defer' ? (
              <Choices
                data={details.defer}
                picked={picked}
                onPick={setPicked}
                onConfirm={() => onFix('defer')}
              />
            ) : null}

            <Option
              id="overtime"
              title={`Work ${fmtMins(overMins)} more this week`}
              detail="A valid choice, recorded rather than assumed. Toggl will not pretend the week fits."
              tone="neutral"
              open={open === 'overtime'}
              onToggle={() => {
                setOpen(open === 'overtime' ? null : 'overtime')
                setPicked(null)
              }}
            />
            {open === 'overtime' ? (
              <Choices
                data={details.overtime}
                picked={picked}
                onPick={setPicked}
                onConfirm={() => onFix('overtime')}
              />
            ) : null}

            <Option
              id="renegotiate"
              title="Ask a client to move a date"
              detail="Toggl drafts the fact, not the message — you have committed 42h against a 40h week."
              tone="neutral"
              open={open === 'renegotiate'}
              onToggle={() => {
                setOpen(open === 'renegotiate' ? null : 'renegotiate')
                setPicked(null)
              }}
            />
            {open === 'renegotiate' ? (
              <Choices
                data={details.renegotiate}
                picked={picked}
                onPick={setPicked}
                onConfirm={() => onFix('renegotiate')}
              />
            ) : null}
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
  open,
  onToggle,
}: {
  id: string
  title: string
  detail: string
  tone: 'safe' | 'neutral'
  open: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
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
      <span
        aria-hidden="true"
        className={['mt-0.5 shrink-0 text-fg-tertiary transition-transform', open ? 'rotate-90' : ''].join(' ')}
      >
        →
      </span>
    </button>
  )
}

function Choices({
  data,
  picked,
  onPick,
  onConfirm,
}: {
  data: { heading: string; options: Detail[] }
  picked: string | null
  onPick: (id: string) => void
  onConfirm: () => void
}) {
  return (
    <div className="rounded-lg border border-line bg-bg-secondary px-3.5 py-3">
      <p className="text-[12px] font-semibold text-fg">{data.heading}</p>
      <ul className="mt-2 space-y-1.5">
        {data.options.map((opt) => (
          <li key={opt.id}>
            <button
              type="button"
              onClick={() => onPick(opt.id)}
              aria-pressed={picked === opt.id}
              className={[
                'flex w-full cursor-pointer items-start gap-2.5 rounded-md border px-3 py-2 text-left transition-colors',
                picked === opt.id
                  ? 'border-line-accent bg-bg-muted'
                  : 'border-line bg-bg hover:bg-bg-hover',
              ].join(' ')}
            >
              <span
                className={[
                  'mt-1 size-2 shrink-0 rounded-full',
                  opt.safe ? 'bg-bg-affirmative' : 'bg-bg-destructive',
                ].join(' ')}
              />
              <span className="min-w-0">
                <span className="block text-[12.5px] font-medium text-fg">{opt.label}</span>
                <span className="block text-[11px] leading-4 font-medium text-fg-secondary">
                  {opt.sub}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Button
        variant="primary"
        size="md"
        className="mt-2.5"
        disabled={picked === null}
        onClick={onConfirm}
      >
        {picked === null ? 'Pick one' : 'Confirm'}
      </Button>
    </div>
  )
}
