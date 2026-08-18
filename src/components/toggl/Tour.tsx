import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button } from './Button'

export type TourStep = {
  target: string
  title: string
  body: string
}

type Rect = { top: number; left: number; width: number; height: number }

/*
 * Orientation for someone opening the deployed link cold. Anchors a card to a
 * target element, rings the target, and never blocks the product beneath it.
 */
export function Tour({
  steps,
  open,
  onClose,
}: {
  steps: readonly TourStep[]
  open: boolean
  onClose: () => void
}) {
  const [index, setIndex] = useState(0)
  const [rect, setRect] = useState<Rect | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const step = steps[index]

  useEffect(() => {
    if (open) setIndex(0)
  }, [open])

  /*
   * The product reflows underneath the tour (the prompt collapses, the drawer
   * opens), so a rect measured once goes stale and the ring lands on empty
   * space. Track it per frame while the tour is open instead.
   */
  useLayoutEffect(() => {
    if (!open || !step) return
    let frame = 0
    const tick = () => {
      const el = document.querySelector(step.target)
      if (!el) {
        setRect((prev) => (prev === null ? prev : null))
      } else {
        const r = el.getBoundingClientRect()
        setRect((prev) =>
          prev &&
          Math.abs(prev.top - r.top) < 0.5 &&
          Math.abs(prev.left - r.left) < 0.5 &&
          Math.abs(prev.width - r.width) < 0.5 &&
          Math.abs(prev.height - r.height) < 0.5
            ? prev
            : { top: r.top, left: r.left, width: r.width, height: r.height },
        )
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [open, step])

  useEffect(() => {
    if (!open) return
    cardRef.current?.focus()
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        setIndex((i) => (i + 1 < steps.length ? i + 1 : i))
        if (index + 1 >= steps.length) onClose()
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setIndex((i) => Math.max(0, i - 1))
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, index, steps.length, onClose])

  if (!open || !step) return null

  const last = index === steps.length - 1
  const cardTop = rect ? Math.min(rect.top + rect.height + 12, window.innerHeight - 190) : 120
  const cardLeft = rect
    ? Math.max(16, Math.min(rect.left, window.innerWidth - 396))
    : Math.max(16, window.innerWidth / 2 - 190)

  return (
    <>
      {rect ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[60] rounded-lg ring-2 ring-(--color-accent-ring) ring-offset-2 ring-offset-[rgb(var(--background-secondary))] transition-all duration-200"
          style={{ top: rect.top, left: rect.left, width: rect.width, height: rect.height }}
        />
      ) : null}
      <div
        ref={cardRef}
        role="dialog"
        aria-label={`Guided tour, step ${index + 1} of ${steps.length}`}
        tabIndex={-1}
        className="fixed z-[61] w-[380px] max-w-[calc(100vw-2rem)] rounded-lg border border-line-accent bg-bg p-4 outline-none transition-all duration-200"
        style={{ top: cardTop, left: cardLeft }}
      >
        <p className="uppercase-label mb-1">
          Guided tour · {index + 1} of {steps.length}
        </p>
        <p className="text-[14px] font-semibold text-fg">{step.title}</p>
        <p className="mt-1 text-[13px] leading-5 font-medium text-fg-secondary">{step.body}</p>
        <div className="mt-3 flex items-center gap-2">
          <Button variant="primary" size="md" onClick={() => (last ? onClose() : setIndex(index + 1))}>
            {last ? 'Start the demo' : 'Next'}
          </Button>
          {index > 0 ? (
            <Button variant="ghost" size="md" onClick={() => setIndex(index - 1)}>
              Back
            </Button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="ml-auto cursor-pointer text-[13px] font-medium text-fg-secondary underline underline-offset-2 hover:text-fg"
          >
            Skip
          </button>
        </div>
      </div>
    </>
  )
}
