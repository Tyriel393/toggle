import { useState } from 'react'
import { Button, IconButton, PlayButton } from '@/components/toggl/Button'
import { Field, Input, Select, Segmented, Toggle } from '@/components/toggl/Field'
import {
  Banner,
  Card,
  Collapsible,
  Drawer,
  FieldRow,
  Modal,
} from '@/components/toggl/Surface'
import {
  Avatar,
  Badge,
  ColorSwatchGrid,
  ProgressBar,
  Skeleton,
  Table,
  Tabs,
  Toast,
  Tooltip,
  type Column,
} from '@/components/toggl/Data'
import { EmptyLink, EmptyStateInline, EmptyStateView } from '@/components/toggl/EmptyState'
import { Icon, icons, type IconName } from '@/components/toggl/Icon'
import { clientById, members, projects, type Project } from '@/data/mock'

function Row({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-6 last:border-0">
      <div className="mb-3">
        <h3 className="text-[14px] font-semibold text-fg">{title}</h3>
        {note ? <p className="mt-0.5 text-[12px] font-medium text-fg-secondary">{note}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

const columns: readonly Column<Project>[] = [
  {
    key: 'project',
    header: 'Project',
    sortable: true,
    render: (p) => (
      <span className="flex items-center gap-2">
        <span className="size-3 rounded-sm" style={{ backgroundColor: p.color }} />
        <span style={{ color: p.color }}>{p.name}</span>
      </span>
    ),
  },
  { key: 'client', header: 'Client', sortable: true, render: (p) => clientById(p.clientId)?.name ?? '—' },
  {
    key: 'billable',
    header: 'Billable',
    sortable: true,
    render: (p) => (p.billable ? <Badge tone="success">Billable</Badge> : <Badge>Internal</Badge>),
  },
  { key: 'rate', header: 'Rate', render: (p) => (p.rate ? `$${p.rate}` : '—') },
  { key: 'dates', header: 'Dates', sortable: true, render: (p) => `${p.startDate} → ${p.endDate}` },
  {
    key: 'status',
    header: 'Time status',
    render: (p) =>
      p.stage === 'At risk' ? <Badge tone="error">Over estimate</Badge> : <Badge tone="neutral">{p.stage}</Badge>,
  },
  { key: 'tags', header: 'Tags', premium: true, render: (p) => p.tags.join(', ') },
]

export function KitPage() {
  const [modal, setModal] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [draft, setDraft] = useState(false)
  const [privacy, setPrivacy] = useState<'private' | 'shared'>('private')
  const [tab, setTab] = useState<'components' | 'tokens' | 'icons'>('components')
  const [color, setColor] = useState<string | null>('#5252d6')
  const [running, setRunning] = useState(false)
  const [allocation, setAllocation] = useState(true)

  return (
    <div className="h-full overflow-y-auto px-6 py-10">
      <header className="mb-6 max-w-5xl">
        <h1 className="text-[20px] leading-8 font-semibold text-fg">Component kit</h1>
        <p className="mt-1 text-[14px] font-medium text-fg-secondary">
          Built from tokens extracted out of the live Toggl 2.0 app. Open this beside the real
          product to check fidelity. Follows your OS light/dark setting, as Toggl does.
        </p>
      </header>

      <Tabs
        tabs={[
          { value: 'components', label: 'Components' },
          { value: 'tokens', label: 'Tokens' },
          { value: 'icons', label: 'Icons' },
        ]}
        value={tab}
        onChange={setTab}
      />

      {tab === 'components' ? (
        <>
          <Row title="Buttons — variants" note="Primary puts dark ink on the accent, not white.">
            <Button variant="primary" size="lg">Create project</Button>
            <Button variant="secondary" size="lg">More options</Button>
            <Button variant="ghost">Filters</Button>
            <Button variant="destructive" size="lg">Delete</Button>
            <Button variant="affirmative" size="lg">Approve</Button>
            <Button variant="stop" size="lg">Stop timer</Button>
            <Button variant="primary" size="lg" disabled>Disabled</Button>
          </Row>

          <Row title="Buttons — sizes" note="h26 compact · h32 toolbar (500) · h36 form (600).">
            <Button size="sm" variant="secondary">Small</Button>
            <Button size="md" variant="secondary">Toolbar</Button>
            <Button size="lg" variant="secondary">Form</Button>
            <Button size="md" variant="ghost" icon="filter">Filters</Button>
            <Button size="md" variant="ghost" icon="calendar" trailingIcon="chevronDown">This week • W34</Button>
            <IconButton icon="settings" label="Settings" />
            <PlayButton running={running} onClick={() => setRunning((v) => !v)} />
          </Row>

          <Row title="Form controls">
            <div className="w-64"><Field label="Name"><Input placeholder="Project name" /></Field></div>
            <div className="w-64"><Field label="Client"><Select defaultValue=""><option value="">Search</option>{projects.map((p) => (<option key={p.id}>{p.name}</option>))}</Select></Field></div>
            <div className="w-64"><Field label="Name" helper="Only visible to project members"><Input placeholder="Disabled" disabled /></Field></div>
          </Row>

          <Row title="Segmented + toggle">
            <div className="w-72">
              <Segmented
                options={[
                  { value: 'private', label: 'Private' },
                  { value: 'shared', label: 'Shared' },
                ] as const}
                value={privacy}
                onChange={setPrivacy}
              />
            </div>
            <span className="flex items-center gap-2 text-[14px] font-medium text-fg-secondary">
              Draft <Toggle checked={draft} onChange={setDraft} label="Draft" />
            </span>
            <Toggle checked={false} onChange={() => {}} label="Disabled" disabled />
          </Row>

          <Row title="Badges, avatars, tooltip">
            <Badge>Internal</Badge>
            <Badge tone="accent">Suggested</Badge>
            <Badge tone="success">Billable</Badge>
            <Badge tone="warning">At risk</Badge>
            <Badge tone="error">Over estimate</Badge>
            <div className="flex -space-x-1.5">
              {members.slice(0, 5).map((m) => (<Avatar key={m.id} name={m.name} color={m.color} size={28} />))}
            </div>
            <Tooltip label="Estimated vs actual"><span className="text-fg-secondary"><Icon name="help" /></span></Tooltip>
          </Row>

          <Row title="Progress / capacity">
            <div className="w-64"><ProgressBar value={32} max={40} label="Ana Kovačević" /></div>
            <div className="w-64"><ProgressBar value={46} max={40} tone="error" label="Marek Dvořák" /></div>
            <div className="w-64"><ProgressBar value={18} max={40} tone="success" label="Yusuf Demir" /></div>
          </Row>

          <Row title="Skeletons">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="size-8 rounded-full" />
          </Row>

          <Row title="Toasts">
            <Toast title="Project created" tone="success" onDismiss={() => {}} />
            <Toast title="Couldn't save changes" tone="error" onDismiss={() => {}} />
          </Row>

          <Row title="Colour picker" note="Toggl's 12 project colours, read from the live picker.">
            <ColorSwatchGrid value={color} onChange={setColor} />
          </Row>

          <Row title="Overlays">
            <Button variant="secondary" size="lg" onClick={() => setModal(true)}>Open modal</Button>
            <Button variant="secondary" size="lg" onClick={() => setDrawer(true)}>Open drawer</Button>
          </Row>

          <div className="border-b border-line py-6">
            <h3 className="mb-3 text-[14px] font-semibold text-fg">Banner</h3>
            <Banner
              title="Checking your numbers on the web?"
              body="See your tracked time from anywhere, right on your phone."
              actionLabel="Get the mobile app"
              onDismiss={() => {}}
            />
          </div>

          <div className="border-b border-line py-6">
            <h3 className="mb-3 text-[14px] font-semibold text-fg">Card + table</h3>
            <Card title="Projects" action={<Button size="md" variant="ghost" icon="more">Actions</Button>}>
              <Table columns={columns} rows={projects} getKey={(p) => p.id} />
            </Card>
          </div>

          <div className="border-b border-line py-6">
            <h3 className="mb-1 text-[14px] font-semibold text-fg">Empty state — inline</h3>
            <p className="mb-3 text-[12px] font-medium text-fg-secondary">For a section with no data. No illustration, no button.</p>
            <Card title="Logged time">
              <EmptyStateInline title="No logged time">
                <EmptyLink>Schedule</EmptyLink> or <EmptyLink>log time</EmptyLink>
              </EmptyStateInline>
            </Card>
          </div>

          <div className="py-6">
            <h3 className="mb-1 text-[14px] font-semibold text-fg">Empty state — full view</h3>
            <p className="mb-3 text-[12px] font-medium text-fg-secondary">For a whole view with no data. Illustration + primary action.</p>
            <div className="rounded-lg border border-line bg-bg">
              <EmptyStateView
                title="What do you plan to work on today?"
                body="Tasks are fundamental to keeping your time organised. Go ahead and create your first task to start planning your day!"
                action={<Button variant="primary" size="lg" icon="plus">Create a new task</Button>}
                secondary={
                  <button type="button" className="cursor-pointer text-[11px] font-semibold tracking-[0.275px] text-fg-accent uppercase">
                    Import tasks
                  </button>
                }
              />
            </div>
          </div>
        </>
      ) : null}

      {tab === 'tokens' ? <TokenSheet /> : null}
      {tab === 'icons' ? <IconSheet /> : null}

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="New Project"
        headerAction={
          <button type="button" className="cursor-pointer text-[11px] font-semibold tracking-[0.275px] text-fg-secondary uppercase">
            Start from template ›
          </button>
        }
        footer={
          <>
            <Button variant="secondary" size="lg" className="flex-1">More options</Button>
            <Button variant="primary" size="lg" className="flex-1" onClick={() => setModal(false)}>Create project ↵</Button>
          </>
        }
      >
        <Field label="Name"><Input placeholder="Project name" autoFocus /></Field>
        <Field label="Client"><Select defaultValue=""><option value="">Search</option><option>Northwind Bank</option></Select></Field>
        <Field label="Privacy" premium helper="Only visible to project members">
          <Segmented
            options={[
              { value: 'private', label: 'Private' },
              { value: 'shared', label: 'Shared' },
            ] as const}
            value={privacy}
            onChange={setPrivacy}
          />
        </Field>
      </Modal>

      <Drawer
        open={drawer}
        onClose={() => setDrawer(false)}
        title="New task"
        footer={
          <>
            <Button variant="ghost" size="lg" onClick={() => setDrawer(false)}>Cancel</Button>
            <Button variant="primary" size="lg" onClick={() => setDrawer(false)}>Create task</Button>
          </>
        }
      >
        <input className="w-full bg-transparent text-[20px] leading-8 font-semibold text-fg outline-none placeholder:text-fg-tertiary" placeholder="Task name" />
        <input className="mt-1 w-full bg-transparent text-[14px] font-medium text-fg outline-none placeholder:text-fg-tertiary" placeholder="Add task description" />
        <div className="mt-4 space-y-1">
          <FieldRow icon="folder" label="Project" />
          <FieldRow icon="calendar" label="Dates" />
          <FieldRow icon="clock" label="Estimate"><span>0h <span className="text-fg-secondary">total ⌄</span></span></FieldRow>
          <FieldRow icon="chartBar" label="Priority" />
          <FieldRow icon="filter" label="Tags" />
          <FieldRow icon="user" label="Assignee">
            <span className="flex items-center gap-2"><Avatar name="Ana Kovačević" size={20} color={members[0].color} />Ana Kovačević</span>
          </FieldRow>
          <FieldRow icon="checkCircle" label="Status"><span>🗒️ Todo</span></FieldRow>
        </div>
        <div className="mt-4">
          <Collapsible label="Allocation" open={allocation} onToggle={() => setAllocation((v) => !v)}>
            Add an estimate and assign members to allocate the task.
          </Collapsible>
        </div>
      </Drawer>
    </div>
  )
}

/* Class names must be literal — Tailwind scans source text, so `bg-${x}` produces nothing. */
const SWATCHES: readonly { label: string; items: readonly { name: string; cls: string }[] }[] = [
  {
    label: 'Background',
    items: [
      { name: 'bg', cls: 'bg-bg' },
      { name: 'bg-secondary', cls: 'bg-bg-secondary' },
      { name: 'bg-tertiary', cls: 'bg-bg-tertiary' },
      { name: 'bg-muted', cls: 'bg-bg-muted' },
      { name: 'bg-accent', cls: 'bg-bg-accent' },
      { name: 'bg-inverted', cls: 'bg-bg-inverted' },
      { name: 'bg-success', cls: 'bg-bg-success' },
      { name: 'bg-warning', cls: 'bg-bg-warning' },
      { name: 'bg-error', cls: 'bg-bg-error' },
      { name: 'bg-destructive', cls: 'bg-bg-destructive' },
      { name: 'bg-affirmative', cls: 'bg-bg-affirmative' },
      { name: 'bg-stop', cls: 'bg-bg-stop' },
    ],
  },
  {
    label: 'Foreground',
    items: [
      { name: 'fg', cls: 'bg-fg' },
      { name: 'fg-secondary', cls: 'bg-fg-secondary' },
      { name: 'fg-tertiary', cls: 'bg-fg-tertiary' },
      { name: 'fg-accent', cls: 'bg-fg-accent' },
      { name: 'fg-success', cls: 'bg-fg-success' },
      { name: 'fg-warning', cls: 'bg-fg-warning' },
      { name: 'fg-error', cls: 'bg-fg-error' },
    ],
  },
  {
    label: 'Stroke',
    items: [
      { name: 'line', cls: 'bg-line' },
      { name: 'line-secondary', cls: 'bg-line-secondary' },
      { name: 'line-tertiary', cls: 'bg-line-tertiary' },
      { name: 'line-muted', cls: 'bg-line-muted' },
      { name: 'line-accent', cls: 'bg-line-accent' },
    ],
  },
]

function TokenSheet() {
  return (
    <div className="py-6">
      {SWATCHES.map((g) => (
        <div key={g.label} className="mb-8">
          <p className="uppercase-label mb-3">{g.label}</p>
          <div className="flex flex-wrap gap-3">
            {g.items.map((t) => (
              <div key={t.name} className="w-40">
                <div className={['h-12 rounded-lg border border-line', t.cls].join(' ')} />
                <p className="mt-1 text-[11px] font-medium text-fg-secondary">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div>
        <p className="uppercase-label mb-3">Project palette</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="size-10 rounded-full" style={{ backgroundColor: `var(--color-data-${i + 1})` }} />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <p className="uppercase-label mb-3">Type scale</p>
        {[
          ['22px', 400, 'Calendar numeral'],
          ['20px', 600, 'Page title / KPI value'],
          ['16px', 400, 'Body large'],
          ['14px', 600, 'Emphasis'],
          ['14px', 500, 'Body — the workhorse'],
          ['12px', 500, 'Secondary label'],
          ['11px', 600, 'UPPERCASE SECTION HEADER'],
        ].map(([size, weight, label]) => (
          <p key={`${size}-${weight}`} style={{ fontSize: size as string, fontWeight: weight as number, lineHeight: 1.43 }} className="text-fg">
            {label as string} <span className="text-fg-tertiary">— {size}/{weight}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

function IconSheet() {
  return (
    <div className="py-6">
      <p className="mb-4 text-[14px] font-medium text-fg-secondary">
        Extracted from the live app: 16×16 viewBox, filled paths, <code>fill=&quot;currentColor&quot;</code>. Not Lucide.
      </p>
      <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
        {(Object.keys(icons) as IconName[]).map((name) => (
          <div key={name} className="flex flex-col items-center gap-2 rounded-lg border border-line bg-bg p-3">
            <Icon name={name} size={20} />
            <span className="text-center text-[11px] font-medium text-fg-secondary">{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
