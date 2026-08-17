import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { Icon } from './Icon'

/* Field labels are uppercase 11/600 with positive tracking — measured. */
export function FieldLabel({ children, premium }: { children: ReactNode; premium?: boolean }) {
  return (
    <span className="uppercase-label mb-1.5 flex items-center gap-1">
      {children}
      {premium ? <span className="text-[10px] text-fg-accent">★</span> : null}
    </span>
  )
}

export function HelperText({ children }: { children: ReactNode }) {
  return <p className="mt-1.5 text-[12px] font-medium text-fg-secondary italic">{children}</p>
}

export function Field({
  label,
  helper,
  premium,
  children,
}: {
  label?: string
  helper?: string
  premium?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      {label ? <FieldLabel premium={premium}>{label}</FieldLabel> : null}
      {children}
      {helper ? <HelperText>{helper}</HelperText> : null}
    </label>
  )
}

const control =
  'h-9 w-full rounded-lg border border-line bg-bg px-3 text-[14px] font-medium text-fg ' +
  'placeholder:text-fg-tertiary hover:border-line-hover focus:border-line-tertiary ' +
  'disabled:cursor-not-allowed disabled:opacity-40 outline-none transition-colors'

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={[control, className].filter(Boolean).join(' ')} {...rest} />
}

export function Select({
  className,
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={[control, 'cursor-pointer appearance-none pr-9', className]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-fg-secondary">
        <Icon name="chevronDown" size={12} />
      </span>
    </div>
  )
}

/* Track 32x20, thumb 16px — measured from the Draft toggle. */
export function Toggle({
  checked,
  onChange,
  label,
  disabled,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      data-state={checked ? 'checked' : 'unchecked'}
      className={[
        'inline-flex h-5 w-8 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-40',
        checked ? 'bg-bg-accent' : 'bg-bg-tertiary',
      ].join(' ')}
    >
      <span
        className={[
          'block size-4 rounded-full bg-white transition-transform',
          checked ? 'translate-x-3' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  )
}

/* Segmented control — r8 on outer corners only, active fill is bg-muted. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string; icon?: Parameters<typeof Icon>[0]['name'] }[]
  value: T
  onChange: (next: T) => void
}) {
  return (
    <div className="inline-flex w-full overflow-hidden rounded-lg border border-line">
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={[
              'inline-flex h-9 flex-1 cursor-pointer items-center justify-center gap-1.5 text-[14px] font-semibold transition-colors',
              'border-line not-last:border-r',
              active ? 'bg-bg-muted text-fg-accent' : 'bg-bg text-fg-secondary hover:bg-bg-hover',
            ].join(' ')}
          >
            {o.icon ? <Icon name={o.icon} size={14} /> : null}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
