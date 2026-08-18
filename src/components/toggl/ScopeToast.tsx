import { useCallback, useEffect, useState } from 'react'

/*
 * Toggl's other surfaces are out of scope for this prototype. Silence reads as
 * broken, so every decorative control says so plainly instead of doing nothing.
 */
export function useScopeToast() {
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (message === null) return
    const id = window.setTimeout(() => setMessage(null), 3200)
    return () => window.clearTimeout(id)
  }, [message])

  const notInScope = useCallback((what: string) => {
    setMessage(`${what} is part of Toggl today — not rebuilt for this prototype.`)
  }, [])

  return { message, notInScope, dismiss: () => setMessage(null) }
}

export function ScopeToast({
  message,
  onDismiss,
}: {
  message: string | null
  onDismiss: () => void
}) {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[75] flex justify-center px-4"
    >
      {message ? (
        <div className="pointer-events-auto flex items-center gap-3 rounded-lg border border-line bg-bg px-4 py-2.5">
          <span className="text-[13px] font-medium text-fg">{message}</span>
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss"
            className="cursor-pointer text-[13px] font-semibold text-fg-secondary hover:text-fg"
          >
            ✕
          </button>
        </div>
      ) : null}
    </div>
  )
}
