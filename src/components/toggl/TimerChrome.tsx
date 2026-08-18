import { Icon } from './Icon'
import { PlayButton } from './Button'

/*
 * The Timer page furniture, matched to the live app: capture bar with entity
 * chips, week navigator with view switcher, and the Logged / Planned meters.
 */
export function CaptureBar({
  running,
  clock,
  description,
  onToggle,
}: {
  running: boolean
  clock: string
  description: string | null
  onToggle: () => void
}) {
  return (
    <div className="flex items-center gap-3 px-6 py-3">
      <p
        className={[
          'min-w-0 flex-1 truncate text-[20px] leading-8 font-semibold',
          description ? 'text-fg' : 'text-fg-tertiary',
        ].join(' ')}
      >
        {description ?? 'What are you working on?'}
      </p>

      <div className="flex shrink-0 items-center gap-2">
        <Chip glyph="@" label="Task" />
        <Chip glyph="+" label="Project" />
        <Chip glyph="#" label="Tags" />
        <button
          type="button"
          aria-label="Billable"
          className="grid size-8 cursor-pointer place-items-center rounded-lg text-[13px] font-semibold text-fg-secondary hover:bg-bg-hover hover:text-fg"
        >
          $
        </button>
        <span className="ml-1 text-[20px] font-semibold text-fg tabular-nums">{clock}</span>
        <PlayButton running={running} onClick={onToggle} />
      </div>
    </div>
  )
}

function Chip({ glyph, label }: { glyph: string; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-line px-2.5 text-[13px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
    >
      <span className="text-fg-tertiary">{glyph}</span>
      {label}
    </button>
  )
}

export function WeekToolbar({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between gap-3 px-6 pb-2.5">
      <div className="inline-flex h-8 items-center rounded-lg border border-line">
        <button
          type="button"
          aria-label="Previous week"
          className="grid h-full w-7 cursor-pointer place-items-center text-fg-secondary hover:text-fg"
        >
          <Icon name="chevronLeft" size={12} />
        </button>
        <span className="inline-flex items-center gap-2 px-2 text-[13px] font-medium text-fg">
          <Icon name="calendar" size={13} className="text-fg-secondary" />
          {label}
        </span>
        <button
          type="button"
          aria-label="Next week"
          className="grid h-full w-7 cursor-pointer place-items-center text-fg-secondary hover:text-fg"
        >
          <Icon name="chevronRight" size={12} />
        </button>
      </div>

      <div className="flex items-center gap-1">
        {(['calendar', 'timeline', 'list', 'chartBar'] as const).map((icon, i) => (
          <button
            key={icon}
            type="button"
            aria-label={`View ${i + 1}`}
            aria-pressed={icon === 'list'}
            className={[
              'grid size-7 cursor-pointer place-items-center rounded-md',
              icon === 'list' ? 'bg-bg-muted text-fg-accent-on-muted' : 'text-fg-secondary hover:bg-bg-hover hover:text-fg',
            ].join(' ')}
          >
            <Icon name={icon} size={14} />
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-(--color-line)" />
        <button
          type="button"
          aria-label="Settings"
          className="grid size-7 cursor-pointer place-items-center rounded-md text-fg-secondary hover:bg-bg-hover hover:text-fg"
        >
          <Icon name="settings" size={14} />
        </button>
      </div>
    </div>
  )
}

export type MeterSegment = { mins: number; color: string; label: string }

export function DayMeters({
  logged,
  loggedTotal,
  plannedMins,
  capacityMins,
}: {
  logged: readonly MeterSegment[]
  loggedTotal: string
  plannedMins: number
  capacityMins: number
}) {
  const sum = logged.reduce((s, x) => s + x.mins, 0)
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-6 pb-3">
      <span className="text-[12px] font-medium text-fg-secondary">Logged</span>
      <div className="flex h-1.5 min-w-[180px] flex-1 gap-0.5 overflow-hidden rounded-full bg-bg-tertiary">
        {logged.map((seg) => (
          <span
            key={seg.label}
            title={`${seg.label} · ${seg.mins}m`}
            style={{ width: `${sum === 0 ? 0 : (seg.mins / capacityMins) * 100}%`, backgroundColor: seg.color }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>
      <span className="text-[13px] font-semibold text-fg tabular-nums">{loggedTotal}</span>

      <span className="ml-2 text-[12px] font-medium text-fg-secondary">Planned</span>
      <div className="flex h-1.5 min-w-[120px] flex-1 overflow-hidden rounded-full bg-bg-tertiary">
        <span
          style={{ width: `${Math.min((plannedMins / capacityMins) * 100, 100)}%` }}
          className="h-full rounded-full bg-[#c7a600]"
        />
      </div>
      <span className="text-[13px] font-semibold text-fg tabular-nums">
        {Math.floor(plannedMins / 60)}h {plannedMins % 60}m
      </span>

      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-0.5 text-[12px] font-medium text-fg-secondary hover:text-fg"
      >
        View reports
        <Icon name="chevronRight" size={11} />
      </button>
    </div>
  )
}
