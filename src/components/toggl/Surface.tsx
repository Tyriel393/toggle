import { useEffect, type ReactNode } from 'react'
import { Icon } from './Icon'
import { Button, IconButton } from './Button'

/* Card: r8, 1px border, padding 12px 24px, no shadow — measured. */
export function Card({
  title,
  action,
  children,
  className,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={['rounded-lg border border-line bg-bg', className].filter(Boolean).join(' ')}
    >
      {title || action ? (
        <header className="flex min-h-12 items-center justify-between px-6 py-3">
          {title ? <h2 className="text-[14px] font-semibold text-fg">{title}</h2> : <span />}
          {action}
        </header>
      ) : null}
      <div className="px-6 pb-3">{children}</div>
    </section>
  )
}

function useEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])
}

/* Modal: 480px, r8, 1px border, no shadow, Escape closes — measured. */
export function Modal({
  open,
  onClose,
  title,
  headerAction,
  footer,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  headerAction?: ReactNode
  footer?: ReactNode
  children: ReactNode
}) {
  useEscape(open, onClose)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/50"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-[480px] max-w-[calc(100vw-2rem)] rounded-lg border border-line bg-bg"
      >
        <header className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-[16px] font-semibold text-fg">{title}</h2>
          <div className="flex items-center gap-3">
            {headerAction}
            <IconButton icon="close" label="Close" onClick={onClose} className="size-7" />
          </div>
        </header>
        <div className="space-y-4 px-6 pb-5">{children}</div>
        {footer ? <div className="flex gap-3 px-6 pb-6">{footer}</div> : null}
      </div>
    </div>
  )
}

/* Drawer: 500px, right-anchored, 1px left border — measured from the task editor. */
export function Drawer({
  open,
  onClose,
  title,
  footer,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  footer?: ReactNode
  children: ReactNode
}) {
  useEscape(open, onClose)
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/50"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="absolute inset-y-0 right-0 flex w-[500px] max-w-full flex-col border-l border-line bg-bg"
      >
        <header className="flex items-center gap-3 border-b border-line px-5 py-3.5">
          <span className="size-4 rounded border border-line-tertiary" />
          <span className="flex items-center gap-1 text-[14px] font-semibold text-fg">
            {title}
            <Icon name="chevronDown" size={12} />
          </span>
          <IconButton icon="close" label="Close" onClick={onClose} className="ml-auto size-7" />
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer ? (
          <footer className="flex justify-end gap-3 border-t border-line px-5 py-3.5">
            {footer}
          </footer>
        ) : null}
      </aside>
    </div>
  )
}

/* Two-column field row from the task drawer: icon + label, then value or "Empty". */
export function FieldRow({
  icon,
  label,
  children,
}: {
  icon: Parameters<typeof Icon>[0]['name']
  label: string
  children?: ReactNode
}) {
  return (
    <div className="flex min-h-8 items-center gap-3 text-[14px]">
      <span className="flex w-32 shrink-0 items-center gap-2 text-fg-secondary">
        <Icon name={icon} size={14} />
        <span className="font-medium">{label}</span>
      </span>
      <span className="font-medium text-fg">
        {children ?? <span className="text-fg-tertiary">Empty</span>}
      </span>
    </div>
  )
}

export function Collapsible({
  label,
  children,
  open,
  onToggle,
}: {
  label: string
  children: ReactNode
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-t border-line py-3">
      <button
        type="button"
        onClick={onToggle}
        className="flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-fg"
      >
        <span className={['transition-transform', open ? 'rotate-0' : '-rotate-90'].join(' ')}>
          <Icon name="chevronDown" size={12} />
        </span>
        {label}
      </button>
      {open ? <div className="mt-2 text-[14px] text-fg-secondary">{children}</div> : null}
    </div>
  )
}

/* Banner — bg-muted, accent heading, action, dismiss. */
export function Banner({
  title,
  body,
  actionLabel,
  onDismiss,
}: {
  title: string
  body: string
  actionLabel?: string
  onDismiss?: () => void
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-bg-muted px-4 py-3">
      <Icon name="bell" className="text-fg-accent" />
      <div className="flex-1">
        <p className="text-[14px] font-semibold text-fg-accent">{title}</p>
        <p className="text-[14px] font-medium text-fg-secondary">{body}</p>
      </div>
      {actionLabel ? (
        <Button size="md" className="bg-bg-inverted text-fg-inverted hover:opacity-90">
          {actionLabel}
        </Button>
      ) : null}
      {onDismiss ? <IconButton icon="close" label="Dismiss" onClick={onDismiss} /> : null}
    </div>
  )
}
