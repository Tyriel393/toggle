import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/toggl/Button'
import { Input } from '@/components/toggl/Field'
import { Icon } from '@/components/toggl/Icon'
import { fmtMins } from '@/lib/planEval'
import { track } from '@/lib/track'

type Intent = 'track' | 'plan' | 'projects'

const INTENTS: readonly { value: Intent; label: string; sub: string }[] = [
  { value: 'track', label: 'See where time goes', sub: 'Log hours and spot where they really go' },
  { value: 'plan', label: 'Plan and assign work', sub: 'Map out tasks, then track against the plan' },
  {
    value: 'projects',
    label: 'Keep projects on track',
    sub: 'Watch progress, profitability, and capacity in one place',
  },
]

const PALETTE = [
  '#dd3919', '#e54c87', '#9447e1', '#5252d6', '#5aa4d8', '#79a02c',
  '#1da58c', '#c7a600', '#fa9200', '#1ab233', '#e024e0', '#6c6c7a',
]

type WeekItem = { id: string; label: string; estimateMins: number; due: string | null; on: boolean }

const WEEK_SEED: readonly WeekItem[] = [
  { id: 'homepage', label: 'Northstar — Homepage revisions', estimateMins: 180, due: 'Wednesday', on: true },
  { id: 'atlas', label: 'Atlas — Final handoff', estimateMins: 420, due: 'Thursday', on: true },
  { id: 'portfolio', label: 'Portfolio polish', estimateMins: 120, due: null, on: true },
]

const TOTAL_STEPS = 4

/*
 * Toggl's real onboarding — intent, project, calendar — reproduced from the
 * captured first-run (docs/w0-first-run.md §1), with one step added where the
 * product currently has a gap: the week that makes Make room possible.
 */
export function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [intent, setIntent] = useState<Intent | null>(null)
  const [project, setProject] = useState('')
  const [color, setColor] = useState(PALETTE[8])
  const [week, setWeek] = useState<readonly WeekItem[]>(WEEK_SEED)

  const chosen = week.filter((w) => w.on)
  const datedCount = chosen.filter((w) => w.due !== null).length
  const totalMins = chosen.reduce((s, w) => s + w.estimateMins, 0)

  const finish = (skippedCalendar: boolean) => {
    track('onboarding_completed', {
      intent: intent ?? 'none',
      project_named: project.trim().length > 0,
      week_items: chosen.length,
      dated_items: datedCount,
      calendar_skipped: skippedCalendar,
    })
    navigate('/calendar')
  }

  return (
    <div className="flex h-full flex-col items-center justify-center bg-bg-secondary px-6 py-8">
      <div className="w-full max-w-[560px]">
        <StepHeader step={step} />

        <div className="rounded-lg border border-line bg-bg px-8 py-7">
          {step === 1 ? (
            <>
              <p className="uppercase-label mb-2">Welcome to Toggl 2.0</p>
              <h1 className="text-[22px] leading-7 font-semibold text-fg">
                What will you mainly use Toggl for?
              </h1>
              <p className="mt-1 text-[14px] font-medium text-fg-secondary">
                We&apos;ll tailor your first experience to help you get there.
              </p>
              <div className="mt-5 space-y-2">
                {INTENTS.map((option) => {
                  const active = intent === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => {
                        setIntent(option.value)
                        track('onboarding_intent_selected', { intent: option.value })
                      }}
                      className={[
                        'flex w-full cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors',
                        active
                          ? 'border-line-accent bg-bg-muted'
                          : 'border-line bg-bg hover:border-line-hover hover:bg-bg-hover',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'grid size-4 shrink-0 place-items-center rounded-full border-2 transition-colors',
                          active ? 'border-(--color-accent-ring)' : 'border-line-tertiary',
                        ].join(' ')}
                      >
                        {active ? <span className="size-2 rounded-full bg-bg-accent" /> : null}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={[
                            'block text-[14px] font-semibold',
                            active ? 'text-fg-accent-on-muted' : 'text-fg',
                          ].join(' ')}
                        >
                          {option.label}
                        </span>
                        <span className="block text-[13px] font-medium text-fg-secondary">
                          {option.sub}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
              <Footer
                onBack={null}
                onContinue={() => setStep(2)}
                disabled={intent === null}
                onSkipAll={() => finish(true)}
              />
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h1 className="text-[22px] leading-7 font-semibold text-fg">Create your first project</h1>
              <p className="mt-1 text-[14px] font-medium text-fg-secondary">
                Projects keep your work and time logs organized
              </p>
              <div className="mt-5">
                <span className="uppercase-label mb-1.5 block">Project</span>
                <div className="flex items-center gap-2">
                  <span
                    className="size-4 shrink-0 rounded-full"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                  <Input
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    placeholder="Project name"
                    autoFocus
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PALETTE.map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-label={`Colour ${c}`}
                      onClick={() => setColor(c)}
                      style={{ backgroundColor: c }}
                      className={[
                        'size-5 cursor-pointer rounded-full transition-transform hover:scale-110',
                        color === c
                          ? 'ring-2 ring-(--color-accent-ring) ring-offset-2 ring-offset-[rgb(var(--background-primary))]'
                          : '',
                      ].join(' ')}
                    />
                  ))}
                </div>
              </div>
              <Footer
                onBack={() => setStep(1)}
                onContinue={() => setStep(3)}
                disabled={project.trim().length === 0}
                onSkipAll={() => finish(true)}
              />
            </>
          ) : null}

          {step === 3 ? (
            <>
              <p className="uppercase-label mb-2 text-fg-accent">New · Make room</p>
              <h1 className="text-[22px] leading-7 font-semibold text-fg">
                What are you actually on the hook for this week?
              </h1>
              <p className="mt-1 text-[14px] leading-5 font-medium text-fg-secondary">
                Toggl already tells you when a job runs past its estimate. With a{' '}
                <strong className="text-fg">deadline</strong> and a{' '}
                <strong className="text-fg">rough estimate</strong>, it can also tell you what that
                overrun puts at risk — and help you replan before you break another client&apos;s
                promise.
              </p>

              <ul className="mt-5 space-y-2">
                {week.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      aria-pressed={item.on}
                      onClick={() =>
                        setWeek((prev) =>
                          prev.map((w) => (w.id === item.id ? { ...w, on: !w.on } : w)),
                        )
                      }
                      className={[
                        'flex w-full cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left transition-colors',
                        item.on
                          ? 'border-line-accent bg-bg-muted'
                          : 'border-line bg-bg hover:bg-bg-hover',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'grid size-4 shrink-0 place-items-center rounded-sm border transition-colors',
                          item.on ? 'border-transparent bg-bg-accent' : 'border-line-tertiary',
                        ].join(' ')}
                      >
                        {item.on ? <Icon name="checkCircle" size={11} className="text-fg-inverted" /> : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium text-fg">
                          {item.label}
                        </span>
                        <span className="block text-[12px] font-medium text-fg-secondary">
                          {fmtMins(item.estimateMins)} estimated ·{' '}
                          {item.due ? `due ${item.due}` : 'no deadline'}
                        </span>
                      </span>
                      <span
                        className={[
                          'shrink-0 rounded-sm px-1.5 py-0.5 text-[11px] font-semibold',
                          item.due
                            ? 'bg-bg-success text-fg-success'
                            : 'bg-bg-tertiary text-fg-secondary',
                        ].join(' ')}
                      >
                        {item.due ? 'Protected' : 'Movable'}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div
                className={[
                  'mt-4 rounded-lg border px-3.5 py-2.5 transition-colors',
                  datedCount >= 2
                    ? 'border-line-success bg-bg-success'
                    : 'border-line-warning bg-bg-warning',
                ].join(' ')}
              >
                <p
                  className={[
                    'text-[13px] font-semibold',
                    datedCount >= 2 ? 'text-fg-success' : 'text-fg-warning',
                  ].join(' ')}
                >
                  {datedCount >= 2
                    ? `Enough to work with — ${fmtMins(totalMins)} across ${chosen.length} jobs, ${datedCount} with deadlines.`
                    : 'Make room needs at least two dated commitments to spot a collision.'}
                </p>
                <p className="mt-0.5 text-[12px] leading-4 font-medium text-fg-secondary">
                  {datedCount >= 2
                    ? 'If one of these runs long, Toggl can now name which of the others stops fitting.'
                    : 'With fewer, Toggl can still track your time — it just cannot tell you what an overrun costs you.'}
                </p>
              </div>

              <Footer
                onBack={() => setStep(2)}
                onContinue={() => setStep(4)}
                disabled={false}
                onSkipAll={() => finish(true)}
              />
            </>
          ) : null}

          {step === 4 ? (
            <>
              <h1 className="text-[22px] leading-7 font-semibold text-fg">
                Log time from your meetings and events
              </h1>
              <p className="mt-1 text-[14px] font-medium text-fg-secondary">
                Connect your calendar and your meetings and events are ready to track
              </p>
              <div className="mt-5 space-y-2">
                <Button variant="secondary" size="lg" className="w-full justify-center">
                  Connect Google Calendar
                </Button>
                <Button variant="secondary" size="lg" className="w-full justify-center">
                  Connect Outlook Calendar
                </Button>
              </div>
              <p className="mt-3 rounded-lg border border-line bg-bg-secondary px-3.5 py-2.5 text-[12px] leading-4 font-medium text-fg-secondary">
                Meetings consume the same hours your client work does. Connected, they come out of
                your daily capacity automatically — so &ldquo;Wednesday is 2h over&rdquo; counts the
                call you already agreed to.
              </p>
              <Footer
                onBack={() => setStep(3)}
                onContinue={() => finish(false)}
                continueLabel="Finish setup"
                disabled={false}
                onSkipAll={() => finish(true)}
                skipLabel="Skip for now"
              />
            </>
          ) : null}
        </div>

        <p className="mt-4 text-center text-[12px] font-medium text-fg-tertiary">
          Steps 1, 2 and 4 reproduce Toggl 2.0&apos;s real onboarding verbatim
          (<code className="font-mono">docs/w0-first-run.md</code>). Step 3 is the proposal.
        </p>
      </div>
    </div>
  )
}

function StepHeader({ step }: { step: number }) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="uppercase-label">
        Step {step} of {TOTAL_STEPS}
      </span>
      <div className="flex flex-1 gap-1.5">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <span
            key={i}
            className={[
              'h-1 flex-1 rounded-full transition-colors',
              i < step ? 'bg-bg-accent' : 'bg-bg-tertiary',
            ].join(' ')}
          />
        ))}
      </div>
    </div>
  )
}

function Footer({
  onBack,
  onContinue,
  disabled,
  onSkipAll,
  continueLabel = 'Continue →',
  skipLabel,
}: {
  onBack: (() => void) | null
  onContinue: () => void
  disabled: boolean
  onSkipAll: () => void
  continueLabel?: string
  skipLabel?: string
}) {
  return (
    <div className="mt-6 flex items-center gap-3">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="cursor-pointer text-[11px] font-semibold tracking-[0.275px] text-fg-secondary uppercase hover:text-fg"
        >
          ‹ Back
        </button>
      ) : null}
      {skipLabel ? (
        <button
          type="button"
          onClick={onSkipAll}
          className="cursor-pointer text-[11px] font-semibold tracking-[0.275px] text-fg-secondary uppercase hover:text-fg"
        >
          {skipLabel}
        </button>
      ) : null}
      <Button
        variant="primary"
        size="lg"
        className="ml-auto"
        disabled={disabled}
        onClick={onContinue}
      >
        {continueLabel}
      </Button>
    </div>
  )
}
