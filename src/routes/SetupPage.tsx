import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageContainer, TopBar } from '@/components/toggl/Shell'
import { Button } from '@/components/toggl/Button'
import { Field, Input, Select } from '@/components/toggl/Field'
import { Icon } from '@/components/toggl/Icon'
import { CLIENT_COLOR } from '@/data/demo'
import { fmtMins, parseDuration, type Weekday } from '@/lib/planEval'
import { track } from '@/lib/track'

type DraftTask = {
  id: string
  name: string
  client: 'Northstar' | 'Atlas' | 'Internal'
  due: Weekday | 'none'
  estimateMins: number
}

const SEED: readonly DraftTask[] = [
  { id: 't1', name: 'Homepage revisions', client: 'Northstar', due: 'wed', estimateMins: 180 },
  { id: 't2', name: 'Final handoff', client: 'Atlas', due: 'thu', estimateMins: 420 },
]

const DAY_OPTIONS: readonly { value: Weekday | 'none'; label: string }[] = [
  { value: 'none', label: 'No deadline' },
  { value: 'mon', label: 'Monday' },
  { value: 'tue', label: 'Tuesday' },
  { value: 'wed', label: 'Wednesday' },
  { value: 'thu', label: 'Thursday' },
  { value: 'fri', label: 'Friday' },
]

function MetricRow({
  label,
  value,
  why,
  ok,
}: {
  label: string
  value: string
  why: string
  ok?: boolean
}) {
  return (
    <li className="flex gap-3 rounded-md border border-line bg-bg-secondary px-3 py-2">
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-semibold text-fg">{label}</span>
        <span className="block text-[11px] leading-4 font-medium text-fg-secondary">{why}</span>
      </span>
      <span
        className={[
          'shrink-0 self-start rounded-sm px-1.5 py-0.5 font-mono text-[11px] tabular-nums',
          ok === true ? 'bg-bg-success text-fg-success' : 'bg-bg-tertiary text-fg-secondary',
        ].join(' ')}
      >
        {value}
      </span>
    </li>
  )
}

const clientColor = (client: DraftTask['client']) =>
  client === 'Northstar' ? CLIENT_COLOR.northstar : client === 'Atlas' ? CLIENT_COLOR.atlas : CLIENT_COLOR.internal

/*
 * How work gets into Toggl, using the real field set from the New task drawer
 * (name · project/client · dates · estimate). Eligibility — does a week-one
 * user have dated, estimated work? — is the concept's biggest risk, so this
 * asks for exactly those two fields and says what they buy.
 */
export function SetupPage() {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState<readonly DraftTask[]>(SEED)
  const [name, setName] = useState('Portfolio polish')
  const [client, setClient] = useState<DraftTask['client']>('Internal')
  const [due, setDue] = useState<Weekday | 'none'>('none')
  const [estimate, setEstimate] = useState('2h')
  const [error, setError] = useState<string | null>(null)

  const estimateMins = parseDuration(estimate)
  const readyCount = tasks.filter((t) => t.estimateMins > 0).length
  const datedCount = tasks.filter((t) => t.due !== 'none').length

  const addTask = () => {
    if (!name.trim()) {
      setError('Give the task a name.')
      return
    }
    if (estimateMins === null) {
      setError('Estimate needs a duration like “90m”, “2h” or “1h 30m”.')
      return
    }
    setError(null)
    const task: DraftTask = {
      id: `t${tasks.length + 1}-${name.slice(0, 4)}`,
      name: name.trim(),
      client,
      due,
      estimateMins,
    }
    setTasks((prev) => [...prev, task])
    track('task_created', {
      client,
      has_deadline: due !== 'none',
      estimate_mins: estimateMins,
    })
    setName('')
    setEstimate('')
  }

  return (
    <>
      <TopBar title="Set up your week" />
      <PageContainer>
        <div className="mx-auto max-w-3xl space-y-4 pt-1 pb-10">
          <div className="rounded-lg border border-line-accent bg-bg-muted px-4 py-3.5">
            <p className="uppercase-label mb-1">New in Toggl 2.0 · Make room</p>
            <p className="text-[15px] leading-6 font-semibold text-fg">
              Toggl already tells you when a job runs past its estimate. Now it can show you what
              that overrun puts at risk — and help you replan before you break another client&apos;s
              deadline.
            </p>
            <p className="mt-1.5 text-[13px] leading-5 font-medium text-fg-secondary">
              It needs two things you already know: <strong>when work is due</strong> and{' '}
              <strong>roughly how long you think it takes</strong>. Add them as you set up the week
              and Toggl can catch the collision while there is still time to move something.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_320px]">
            <section className="rounded-lg border border-line bg-bg">
              <header className="flex min-h-12 items-center justify-between border-b border-line px-4 py-3">
                <h2 className="text-[14px] font-semibold text-fg">This week&apos;s work</h2>
                <span className="text-[12px] font-medium text-fg-secondary">
                  {tasks.length} tasks · {datedCount} dated · {readyCount} estimated
                </span>
              </header>
              <ul className="divide-y divide-(--color-line-muted)">
                {tasks.map((task) => (
                  <li key={task.id} className="flex min-h-14 items-center gap-3 px-4 py-2.5">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: clientColor(task.client) }}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium text-fg">
                        {task.client === 'Internal' ? task.name : `${task.client} — ${task.name}`}
                      </span>
                      <span className="block text-[12px] font-medium text-fg-secondary">
                        {fmtMins(task.estimateMins)} estimated ·{' '}
                        {task.due === 'none'
                          ? 'no deadline'
                          : `due ${DAY_OPTIONS.find((d) => d.value === task.due)?.label}`}
                      </span>
                    </span>
                    <span
                      className={[
                        'inline-flex shrink-0 items-center gap-1 rounded-sm px-1.5 py-0.5 text-[11px] font-semibold',
                        task.due !== 'none'
                          ? 'bg-bg-success text-fg-success'
                          : 'bg-bg-tertiary text-fg-secondary',
                      ].join(' ')}
                    >
                      {task.due !== 'none' ? (
                        <>
                          <Icon name="checkCircle" size={11} />
                          Protected
                        </>
                      ) : (
                        'Movable'
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="border-t border-line px-4 py-2.5 text-[12px] leading-4 font-medium text-fg-secondary">
                <strong>Protected</strong> work has a deadline — Make room will never suggest moving
                it. <strong>Movable</strong> work has none, so it is what gets offered first when a
                day runs over.
              </p>
            </section>

            <section className="h-fit rounded-lg border border-line bg-bg p-4">
              <h2 className="mb-3 text-[14px] font-semibold text-fg">Add a task</h2>
              <div className="space-y-3">
                <Field label="Task name">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Portfolio polish"
                  />
                </Field>
                <Field label="Client">
                  <Select value={client} onChange={(e) => setClient(e.target.value as DraftTask['client'])}>
                    <option value="Northstar">Northstar</option>
                    <option value="Atlas">Atlas</option>
                    <option value="Internal">Internal</option>
                  </Select>
                </Field>
                <Field label="Due" helper="Work with a deadline is never auto-moved.">
                  <Select value={due} onChange={(e) => setDue(e.target.value as Weekday | 'none')}>
                    {DAY_OPTIONS.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field label="Estimate" helper="How long you think it takes — “2h”, “90m”, “1h 30m”.">
                  <Input
                    value={estimate}
                    onChange={(e) => {
                      setEstimate(e.target.value)
                      setError(null)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.nativeEvent.isComposing) addTask()
                    }}
                    placeholder="2h"
                    aria-invalid={error !== null}
                  />
                </Field>
                {error ? <p className="text-[12px] font-medium text-fg-error">{error}</p> : null}
                <Button variant="primary" size="lg" className="w-full" onClick={addTask}>
                  Add task
                </Button>
              </div>
            </section>
          </div>

          <section className="rounded-lg border border-line bg-bg px-4 py-3.5">
            <p className="uppercase-label mb-1">What this screen decides</p>
            <p className="text-[13px] leading-5 font-medium text-fg-secondary">
              Eligibility for Make room is settled here, not later. A task needs{' '}
              <strong className="text-fg">a deadline</strong> and{' '}
              <strong className="text-fg">an estimate</strong> before an overrun can mean anything —
              so the share of week-one users who fill both in is the concept&apos;s single biggest
              unknown, and the first thing I would measure.
            </p>
            <ul className="mt-2.5 space-y-1.5">
              <MetricRow
                label="Setup completion"
                value={`${datedCount}/${tasks.length} dated · ${readyCount}/${tasks.length} estimated`}
                why="The eligible denominator. Everything downstream is measured against this, not against all signups."
                ok={datedCount >= 2}
              />
              <MetricRow
                label="Time to first dated task"
                value="—"
                why="If this takes more than a minute, the step is friction and belongs behind import instead."
              />
              <MetricRow
                label="Estimates left at 0h"
                value={`${tasks.length - readyCount}`}
                why="A task with no estimate can never trigger the feature. High values mean the ask is mistimed."
                ok={tasks.length - readyCount === 0}
              />
            </ul>
          </section>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                track('setup_completed', { tasks: tasks.length, dated: datedCount })
                navigate('/calendar')
              }}
            >
              Start tracking →
            </Button>
            <Link
              to="/calendar"
              className="text-[13px] font-medium text-fg-secondary underline underline-offset-2 hover:text-fg"
              onClick={() => track('setup_skipped', { tasks: tasks.length })}
            >
              Skip for now
            </Link>
            <span className="ml-auto text-[12px] font-medium text-fg-tertiary">
              Prototype — stands in for Toggl&apos;s existing task import
            </span>
          </div>
        </div>
      </PageContainer>
    </>
  )
}
