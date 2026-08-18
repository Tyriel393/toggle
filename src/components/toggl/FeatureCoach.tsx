import { Icon } from './Icon'

export type CoachStep = {
  label: string
  state: 'done' | 'current' | 'todo'
}

export type CoachContent = {
  headline: string
  action: string
  why: string
  steps: readonly CoachStep[]
  tone: 'accent' | 'success'
}

/*
 * How Toggl would introduce Make room to an existing user: an announcement that
 * does not just say "new feature" but walks them to the first real payoff.
 * It doubles as orientation for anyone opening the prototype cold.
 */
export function FeatureCoach({ content }: { content: CoachContent }) {
  return (
    <section
      aria-label="Make room — getting started"
      className={[
        'rounded-lg border px-4 py-3.5',
        content.tone === 'success'
          ? 'border-line-success bg-bg-success'
          : 'border-line-accent bg-bg-muted',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            'mt-0.5 grid size-6 shrink-0 place-items-center rounded-full',
            content.tone === 'success' ? 'bg-bg-affirmative' : 'bg-bg-accent',
          ].join(' ')}
        >
          <Icon
            name={content.tone === 'success' ? 'checkCircle' : 'clock'}
            size={13}
            className="text-fg-inverted"
          />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-sm bg-bg-accent px-1.5 py-0.5 text-[10px] font-bold tracking-[0.3px] text-fg-inverted uppercase">
              New
            </span>
            <p className="text-[14px] font-semibold text-fg">{content.headline}</p>
          </div>

          <p className="mt-1 text-[13px] leading-5 font-medium text-fg-secondary">{content.why}</p>

          <p
            className={[
              'mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold',
              content.tone === 'success' ? 'text-fg-success' : 'text-fg-accent-on-muted',
            ].join(' ')}
          >
            <span aria-hidden="true">→</span>
            {content.action}
          </p>

          <ol className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
            {content.steps.map((step, i) => (
              <li key={step.label} className="flex items-center gap-1.5">
                <span
                  className={[
                    'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium transition-colors',
                    step.state === 'done'
                      ? 'bg-bg-affirmative text-white'
                      : step.state === 'current'
                        ? 'bg-bg-accent text-fg-inverted'
                        : 'bg-bg-secondary text-fg-tertiary',
                  ].join(' ')}
                >
                  {step.state === 'done' ? <span aria-hidden="true">✓</span> : null}
                  {step.label}
                </span>
                {i < content.steps.length - 1 ? (
                  <span aria-hidden="true" className="text-[11px] text-fg-tertiary">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
