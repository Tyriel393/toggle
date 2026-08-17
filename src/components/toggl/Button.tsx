import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'destructive'
  | 'affirmative'
  | 'stop'
export type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: IconName
  trailingIcon?: IconName
  children?: ReactNode
}

/* h32 in toolbars at weight 500; h36 in forms at weight 600 — measured. */
const sizes: Record<ButtonSize, string> = {
  sm: 'h-[26px] px-2 text-[14px] font-medium gap-1.5',
  md: 'h-8 px-3.5 text-[14px] font-medium gap-2',
  lg: 'h-9 px-3.5 text-[14px] font-semibold gap-2',
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-bg-accent text-fg-inverted hover:bg-bg-accent-hover active:bg-bg-accent-active',
  secondary: 'bg-bg text-fg border border-line-secondary hover:bg-bg-hover',
  ghost: 'text-fg hover:bg-bg-hover',
  destructive: 'bg-bg-destructive text-white hover:bg-bg-destructive-hover',
  affirmative: 'bg-bg-affirmative text-white hover:brightness-110',
  stop: 'bg-bg-stop text-white hover:bg-bg-stop-hover',
}

export function Button({
  variant = 'ghost',
  size = 'md',
  icon,
  trailingIcon,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={[
        'inline-flex cursor-pointer items-center justify-center rounded-lg transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-40',
        sizes[size],
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon ? <Icon name={icon} /> : null}
      {children}
      {trailingIcon ? <Icon name={trailingIcon} /> : null}
    </button>
  )
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconName
  label: string
  variant?: ButtonVariant
}

export function IconButton({ icon, label, variant = 'ghost', className, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={[
        'inline-flex size-8 cursor-pointer items-center justify-center rounded-lg transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-40',
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <Icon name={icon} />
    </button>
  )
}

/* The round accent play control, 36px — Toggl's most distinctive button. */
export function PlayButton({
  running = false,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { running?: boolean }) {
  return (
    <button
      type="button"
      aria-label={running ? 'Stop timer' : 'Start timer'}
      className={[
        'inline-flex size-9 cursor-pointer items-center justify-center rounded-full transition-colors',
        running ? 'bg-bg-stop hover:bg-bg-stop-hover' : 'bg-bg-accent hover:bg-bg-accent-hover',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {running ? (
        <span className="block size-3 rounded-[2px] bg-white" />
      ) : (
        <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
          <path fill="rgb(var(--foreground-inverted))" d="M4 2.5v11l9-5.5z" />
        </svg>
      )}
    </button>
  )
}
