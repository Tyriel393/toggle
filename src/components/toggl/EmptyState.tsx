import type { ReactNode } from 'react'

/*
 * Toggl uses two distinct empty states — see docs/design-system.md §7.
 *   inline  — a section has no data: no illustration, no button, underlined inline links
 *   view    — a whole view has no data: illustration, headline, body, primary button
 * Using the wrong one is a tell.
 */

export function EmptyStateInline({
  title,
  children,
}: {
  title: string
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-[20px] leading-8 font-semibold text-fg">{title}</p>
      {children ? <p className="mt-0.5 text-[14px] font-medium text-fg-secondary">{children}</p> : null}
    </div>
  )
}

export function EmptyLink({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer text-fg-secondary underline underline-offset-2 hover:text-fg"
    >
      {children}
    </button>
  )
}

export function EmptyStateView({
  title,
  body,
  action,
  secondary,
  illustration,
}: {
  title: string
  body: string
  action?: ReactNode
  secondary?: ReactNode
  illustration?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      {illustration ?? <BlocksIllustration />}
      <p className="mt-8 text-[20px] leading-8 font-semibold text-fg">{title}</p>
      <p className="mt-2 max-w-md text-[14px] font-medium text-fg-secondary">{body}</p>
      {action ? <div className="mt-6">{action}</div> : null}
      {secondary ? (
        <>
          <p className="mt-4 text-[11px] font-semibold tracking-[0.275px] text-fg-tertiary uppercase">
            or
          </p>
          <div className="mt-2">{secondary}</div>
        </>
      ) : null}
    </div>
  )
}

/* Flat geometric shapes in accent + gold + neutral, matching Toggl's house style. */
function BlocksIllustration() {
  return (
    <svg width="216" height="140" viewBox="0 0 216 140" aria-hidden="true">
      <circle cx="108" cy="26" r="20" fill="var(--color-data-8)" />
      <path d="M0 60h72v80H0z" fill="rgb(var(--background-accent))" />
      <path d="M96 140 132 66l36 74z" fill="var(--color-data-8)" />
      <path d="M156 84h30v56h-30zm30 20h30v36h-30z" fill="rgb(var(--background-inverted-secondary))" />
      <rect
        x="96"
        y="34"
        width="52"
        height="20"
        rx="10"
        transform="rotate(-24 96 34)"
        fill="rgb(var(--background-accent))"
      />
    </svg>
  )
}
