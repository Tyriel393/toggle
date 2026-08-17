import type { ReactNode } from 'react'
import { Icon } from './Icon'

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'error'
}) {
  const tones = {
    neutral: 'bg-bg-tertiary text-fg-secondary',
    accent: 'bg-bg-muted text-fg-accent',
    success: 'bg-bg-success text-fg-success',
    warning: 'bg-bg-warning text-fg-warning',
    error: 'bg-bg-error text-fg-error',
  } as const
  return (
    <span
      className={[
        'inline-flex items-center rounded-sm px-1.5 py-0.5 text-[12px] font-medium tracking-[0.3px]',
        tones[tone],
      ].join(' ')}
    >
      {children}
    </span>
  )
}

/* Initials at 11/600 with 0.32px tracking — measured. */
export function Avatar({
  name,
  size = 32,
  color,
}: {
  name: string
  size?: number
  color?: string
}) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-[0.32px] text-white"
      style={{
        width: size,
        height: size,
        fontSize: Math.max(9, Math.round(size * 0.34)),
        backgroundColor: color ?? 'rgb(var(--background-inverted-secondary))',
      }}
      title={name}
    >
      {initials}
    </span>
  )
}

export function ProgressBar({
  value,
  max = 100,
  tone = 'accent',
  label,
}: {
  value: number
  max?: number
  tone?: 'accent' | 'success' | 'warning' | 'error'
  label?: string
}) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const tones = {
    accent: 'bg-bg-accent',
    success: 'bg-bg-affirmative',
    warning: 'bg-bg-warning',
    error: 'bg-bg-destructive',
  } as const
  return (
    <div className="w-full">
      {label ? (
        <div className="mb-1 flex justify-between text-[12px] font-medium text-fg-secondary">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      ) : null}
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-bg-tertiary"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className={['h-full rounded-full transition-all', tones[tone]].join(' ')} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export type Column<T> = {
  key: string
  header: string
  sortable?: boolean
  premium?: boolean
  render: (row: T) => ReactNode
}

/* Header row is uppercase 11/600 tertiary; sortable columns show a double chevron. */
export function Table<T>({
  columns,
  rows,
  getKey,
}: {
  columns: readonly Column<T>[]
  rows: readonly T[]
  getKey: (row: T) => string
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-[14px]">
        <thead>
          <tr className="border-b border-line">
            {columns.map((c) => (
              <th key={c.key} className="px-3 py-2.5 text-left first:pl-0">
                <span className="uppercase-label inline-flex items-center gap-1">
                  {c.header}
                  {c.sortable ? <SortGlyph /> : null}
                  {c.premium ? <span className="text-fg-accent">★</span> : null}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getKey(row)} className="border-b border-line-muted last:border-0 hover:bg-bg-hover">
              {columns.map((c) => (
                <td key={c.key} className="px-3 py-2.5 font-medium first:pl-0">
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SortGlyph() {
  return (
    <svg width="8" height="12" viewBox="0 0 8 12" aria-hidden="true" className="text-fg-tertiary">
      <path fill="currentColor" d="M4 0 7 4H1zM4 12 1 8h6z" />
    </svg>
  )
}

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
}: {
  tabs: readonly { value: T; label: string }[]
  value: T
  onChange: (next: T) => void
}) {
  return (
    <div role="tablist" className="flex gap-1 border-b border-line">
      {tabs.map((t) => {
        const active = t.value === value
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.value)}
            className={[
              'relative cursor-pointer px-3 py-2.5 text-[14px] font-medium transition-colors',
              active ? 'text-fg' : 'text-fg-secondary hover:text-fg',
            ].join(' ')}
          >
            {t.label}
            {active ? (
              <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-bg-accent" />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={['animate-pulse rounded-sm bg-bg-tertiary', className].filter(Boolean).join(' ')}
    />
  )
}

export function ColorSwatchGrid({
  value,
  onChange,
}: {
  value: string | null
  onChange: (next: string | null) => void
}) {
  const palette = [
    '#dd3919', '#e54c87', '#9447e1', '#5252d6', '#5aa4d8', '#79a02c',
    '#1da58c', '#c7a600', '#fa9200', '#1ab233', '#e024e0', '#6c6c7a',
  ]
  return (
    <div className="w-fit rounded-lg border border-line bg-bg p-3">
      <div className="grid grid-cols-6 gap-2">
        {palette.map((c) => (
          <button
            key={c}
            type="button"
            aria-label={`Colour ${c}`}
            onClick={() => onChange(c)}
            style={{ backgroundColor: c }}
            className={[
              'size-5 cursor-pointer rounded-full transition-transform hover:scale-110',
              value === c ? 'ring-2 ring-offset-2 ring-offset-[rgb(var(--background-primary))]' : '',
            ].join(' ')}
          />
        ))}
      </div>
      <button
        type="button"
        className="mt-3 block w-full cursor-pointer text-center text-[11px] font-semibold tracking-[0.275px] text-fg-accent uppercase"
      >
        Custom color
      </button>
      <button
        type="button"
        onClick={() => onChange(null)}
        className="mt-2 flex cursor-pointer items-center gap-2 text-[11px] font-semibold tracking-[0.275px] text-fg-secondary uppercase"
      >
        <span
          className={[
            'size-3 rounded-full border',
            value === null ? 'border-line-accent bg-bg-accent' : 'border-line-tertiary',
          ].join(' ')}
        />
        None
      </button>
    </div>
  )
}

export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-1.5 -translate-x-1/2 rounded-md bg-bg-inverted px-2 py-1 text-[12px] font-medium whitespace-nowrap text-fg-inverted opacity-0 transition-opacity group-hover:opacity-100"
      >
        {label}
      </span>
    </span>
  )
}

/*
 * Toggl's toasts carry no live region, so screen readers never hear them —
 * including the delete-undo toast, which is the only recovery affordance for a
 * destructive action that has no confirm dialog. docs/accessibility-audit.md §2.
 * role="status" + aria-live announces without stealing focus; errors use alert.
 */
export function Toast({
  title,
  tone = 'neutral',
  onDismiss,
}: {
  title: string
  tone?: 'neutral' | 'success' | 'error'
  onDismiss?: () => void
}) {
  const tones = {
    neutral: 'border-line bg-bg',
    success: 'border-line-success bg-bg-success',
    error: 'border-line-error bg-bg-error',
  } as const
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      aria-live={tone === 'error' ? 'assertive' : 'polite'}
      className={[
        'flex items-center gap-3 rounded-lg border px-4 py-3 text-[14px] font-medium',
        tones[tone],
      ].join(' ')}
    >
      <span className="text-fg">{title}</span>
      {onDismiss ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onDismiss}
          className="ml-auto cursor-pointer text-fg-secondary hover:text-fg"
        >
          <Icon name="close" size={12} />
        </button>
      ) : null}
    </div>
  )
}
