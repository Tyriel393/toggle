import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageContainer, TopBar } from '@/components/toggl/Shell'
import { Button } from '@/components/toggl/Button'
import { Icon } from '@/components/toggl/Icon'
import { track } from '@/lib/track'

const CLIENT_WORK = [
  { id: 'homepage', client: 'Northstar', name: 'Homepage revisions', color: '#fa9200', estimate: '3h', due: 'Wed' },
  { id: 'atlas', client: 'Atlas', name: 'Final handoff', color: '#5252d6', estimate: '7h', due: 'Thu' },
  { id: 'portfolio', client: null, name: 'Portfolio polish', color: '#6c6c7a', estimate: '2h', due: null },
]

/*
 * The week-one setup step. Eligibility — does a new user have dated, estimated
 * work? — is the concept's primary business risk. Rather than assume it, ask
 * for it here, framed by what it buys them in their first week.
 */
export function SetupPage() {
  const navigate = useNavigate()
  const [added, setAdded] = useState<readonly string[]>([])
  const allAdded = added.length === CLIENT_WORK.length

  const add = (id: string) => {
    setAdded((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      track('setup_work_added', { task: id, count: next.length })
      return next
    })
  }

  return (
    <>
      <TopBar title="Set up your week" />
      <PageContainer>
        <div className="mx-auto max-w-2xl space-y-4 pt-1">
          <div className="rounded-lg border border-line-accent bg-bg-muted px-4 py-3.5">
            <p className="uppercase-label mb-1">New in Toggl 2.0</p>
            <p className="text-[15px] font-semibold text-fg">
              Toggl can tell you when a job running long puts another client&apos;s deadline at risk.
            </p>
            <p className="mt-1 text-[13px] leading-5 font-medium text-fg-secondary">
              It needs two things you already know: <strong>when work is due</strong> and{' '}
              <strong>roughly how long you think it takes</strong>. Add them now and Toggl will
              catch the collision this week — while there&apos;s still time to move something.
            </p>
          </div>

          <div className="rounded-lg border border-line bg-bg">
            <header className="flex min-h-12 items-center justify-between px-6 py-3">
              <h2 className="text-[14px] font-semibold text-fg">This week&apos;s client work</h2>
              <span className="text-[13px] font-medium text-fg-secondary">
                {added.length} of {CLIENT_WORK.length} added
              </span>
            </header>
            <ul className="divide-y divide-(--color-line-muted) px-6 pb-3">
              {CLIENT_WORK.map((task) => {
                const isAdded = added.includes(task.id)
                return (
                  <li key={task.id} className="flex min-h-14 items-center gap-3 py-2">
                    <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: task.color }} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium text-fg">
                        {task.client ? `${task.client} — ${task.name}` : task.name}
                      </span>
                      <span className="block text-[12px] font-medium text-fg-secondary">
                        {task.estimate} estimated
                        {task.due ? ` · due ${task.due}` : ' · no deadline'}
                      </span>
                    </span>
                    {isAdded ? (
                      <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-fg-success">
                        <Icon name="checkCircle" size={14} />
                        Added
                      </span>
                    ) : (
                      <Button variant="secondary" size="md" onClick={() => add(task.id)}>
                        Add to my week
                      </Button>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>

          <div
            className={[
              'rounded-lg border px-4 py-3.5 transition-colors',
              allAdded ? 'border-line-success bg-bg-success' : 'border-line bg-bg-secondary',
            ].join(' ')}
          >
            <p
              className={[
                'text-[14px] font-semibold',
                allAdded ? 'text-fg-success' : 'text-fg-secondary',
              ].join(' ')}
            >
              {allAdded
                ? "Your week is set up. Toggl can now spot a collision before it costs you a deadline."
                : 'What this buys you in week one'}
            </p>
            <p className="mt-1 text-[13px] leading-5 font-medium text-fg-secondary">
              {allAdded
                ? 'Track as normal. If a job runs past its estimate, Toggl will ask what’s left and show you what it changes.'
                : 'Without dates and estimates, Toggl can only tell you where time went. With them, it can tell you what’s about to go wrong — and that only pays off if it’s set up before the week gets away from you.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                track('setup_completed', { added: added.length, skipped: !allAdded })
                navigate('/calendar')
              }}
            >
              {allAdded ? 'Start tracking' : 'Continue anyway'}
            </Button>
            <Link
              to="/calendar"
              className="text-[13px] font-medium text-fg-secondary underline underline-offset-2 hover:text-fg"
              onClick={() => track('setup_skipped', { added: added.length })}
            >
              Skip for now
            </Link>
            <span className="ml-auto text-[12px] font-medium text-fg-tertiary">
              Prototype — this stands in for Toggl&apos;s existing task import
            </span>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
