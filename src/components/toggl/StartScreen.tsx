import { Button } from './Button'

/*
 * A tester opened this cold and could not tell what they were looking at.
 * This states the feature, the problem, and what they are being asked to
 * judge, then gets out of the way. Hints are on by default and can be
 * turned off from the demo bar.
 */
export function StartScreen({
  onStart,
  mondayIntro = false,
}: {
  onStart: () => void
  mondayIntro?: boolean
}) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="About this prototype"
        className="w-full max-w-[560px] rounded-lg border border-line bg-bg p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="uppercase-label mb-2">Toggl 2.0 · prototype</p>
            <h1 className="text-[24px] leading-8 font-semibold text-fg">Make room</h1>
          </div>
          <button
            type="button"
            onClick={onStart}
            aria-label="Close and start"
            className="-mt-1 -mr-1 shrink-0 cursor-pointer rounded-lg px-2 py-1 text-[12px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
          >
            ✕
          </button>
        </div>
        <p className="mt-2 text-[14px] leading-6 font-medium text-fg-secondary">
          Toggl already tells a freelancer when a job ran past its estimate.{' '}
          <strong className="text-fg">
            It never tells them what that overrun just cost.
          </strong>{' '}
          Those hours come out of time already promised to another client — and today you only find
          out when you are already late.
        </p>

        {mondayIntro ? (
          <div className="mt-5 rounded-lg border border-line-error bg-bg-error px-4 py-3.5">
            <p className="text-[14px] font-semibold text-fg-error">
              You have just planned your week — and it does not fit.
            </p>
            <p className="mt-1 text-[13px] leading-5 font-medium text-fg-secondary">
              You committed <strong className="text-fg">42h</strong> of client work into a{' '}
              <strong className="text-fg">40h</strong> week. Toggl has always known that number — it
              is on the Timeline and in the Workload report — but it has never told you when you
              crossed it. That is the first thing you will see behind this box, on{' '}
              <strong className="text-fg">Monday</strong>, before a single timer has run.
            </p>
          </div>
        ) : null}

        <div className="mt-5 rounded-lg border border-line bg-bg-secondary px-4 py-3.5">
          <p className="text-[13px] font-semibold text-fg">Where you are</p>
          <p className="mt-1 text-[13px] leading-5 font-medium text-fg-secondary">
            You signed up on <strong className="text-fg">Monday</strong>, added your clients and
            projects, and planned the week — all of that is Toggl as it works today. This is your
            first week using it. The <strong className="text-fg">Day 1–5</strong> buttons at the
            bottom walk through it; the rest of the bar is demo scaffolding, not the product.
          </p>
          <p className="mt-2.5 text-[13px] font-semibold text-fg">What to judge</p>
          <ul className="mt-2.5 space-y-1 text-[13px] font-medium text-fg-secondary">
            <li className="flex gap-2">
              <span className="text-fg-accent" aria-hidden="true">
                ·
              </span>
              <span>
                <strong className="text-fg">The interactions</strong> — how the experience behaves
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-accent" aria-hidden="true">
                ·
              </span>
              <span>
                <strong className="text-fg">The design</strong> — how it looks and feels
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-fg-accent" aria-hidden="true">
                ·
              </span>
              <span>
                <strong className="text-fg">The value</strong> — whether it is clearly better
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-5">
          <Button size="lg" onClick={onStart} className="w-full">
            Start exploring
          </Button>
          <p className="mt-2 text-center text-[12px] leading-4 font-medium text-fg-secondary">
            Nothing is on rails. Click anything, and short hints appear as you go.
          </p>
        </div>

        <p className="mt-4 text-[12px] leading-4 font-medium text-fg-tertiary">
          Data is mock, as the brief allows. Press <strong className="text-fg-secondary">?</strong>{' '}
          in the demo bar to reopen this, or <strong className="text-fg-secondary">Guide</strong> to turn
          the hints off.
        </p>
      </div>
    </div>
  )
}

/* Always-available re-orientation for anyone who gets lost mid-session. */
export function HelpButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className="rounded-full px-2 text-fg-secondary"
      aria-label="What am I looking at?"
    >
      ?
    </Button>
  )
}
