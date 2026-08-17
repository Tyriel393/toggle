import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import { Avatar } from './Data'

/* Sidebar 248px + 1px border, header 64px — measured. */

type NavItem = { to: string; label: string; icon: IconName; premium?: boolean }

const NAV: readonly { group: string; items: readonly NavItem[] }[] = [
  { group: 'Track', items: [{ to: '/calendar', label: 'Timer', icon: 'clock' }] },
  { group: 'Analyze', items: [{ to: '/reports', label: 'Reports', icon: 'reports' }] },
  {
    group: 'Plan',
    items: [
      { to: '/projects', label: 'Projects', icon: 'folder' },
      { to: '/tasks', label: 'Tasks', icon: 'list' },
      { to: '/timeline', label: 'Timeline', icon: 'timeline', premium: true },
    ],
  },
  {
    group: 'Manage',
    items: [
      { to: '/members', label: 'Members', icon: 'user' },
      { to: '/approvals', label: 'Approvals', icon: 'checkCircle', premium: true },
      { to: '/time-off', label: 'Time off', icon: 'palm', premium: true },
    ],
  },
]

function TogglMark() {
  return (
    <span className="relative grid size-7 shrink-0 place-items-center rounded-full bg-bg-accent">
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
        <path
          fill="rgb(var(--foreground-inverted))"
          d="M8 1a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V2a1 1 0 0 1 1-1M4.2 3.3a1 1 0 0 1 .1 1.4A4.5 4.5 0 1 0 12.5 8a4.5 4.5 0 0 0-1.7-3.5 1 1 0 1 1 1.3-1.5A6.5 6.5 0 1 1 2.8 3.4a1 1 0 0 1 1.4-.1"
        />
      </svg>
      <span className="absolute -bottom-1 text-[8px] font-bold text-fg-accent">2.0</span>
    </span>
  )
}

export function Sidebar() {
  return (
    <aside className="flex w-[249px] shrink-0 flex-col border-r border-line bg-bg-secondary">
      <button
        type="button"
        className="flex h-16 w-full cursor-pointer items-center gap-2.5 py-2.5 pr-2 pl-4 hover:bg-bg-hover"
      >
        <TogglMark />
        <span className="truncate text-[14px] font-semibold text-fg">
          Josip Gajsak393&apos;s o…
        </span>
        <Icon name="chevronDown" size={12} className="ml-auto text-fg-secondary" />
      </button>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {NAV.map((section) => (
          <div key={section.group} className="mb-1">
            <p className="uppercase-label px-2 pt-4 pb-1.5">{section.group}</p>
            {section.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'flex h-8 items-center gap-2.5 rounded-lg px-2 text-[14px] font-medium transition-colors',
                    isActive
                      ? 'bg-bg-muted text-fg-accent-on-muted'
                      : 'text-fg-secondary hover:bg-bg-hover hover:text-fg',
                  ].join(' ')
                }
              >
                <Icon name={item.icon} />
                {item.label}
                {item.premium ? (
                  <span className="ml-auto text-[10px] text-fg-tertiary">★</span>
                ) : null}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className="px-3 pb-4">
        <button
          type="button"
          className="flex h-8 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 text-[14px] font-medium text-fg-accent hover:bg-bg-hover"
        >
          <span className="grid size-4 place-items-center rounded-full bg-bg-accent text-fg-inverted">
            <Icon name="arrowUp" size={9} />
          </span>
          Upgrade
          <span className="ml-auto rounded-sm bg-bg-muted px-1.5 py-0.5 text-[10px] font-semibold tracking-[0.3px] uppercase">
            31 days
          </span>
        </button>
        <button
          type="button"
          className="flex h-8 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 text-[14px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
        >
          <Icon name="download" />
          Download apps
        </button>
        <button
          type="button"
          className="flex h-8 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 text-[14px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
        >
          <Icon name="settings" />
          Admin settings
        </button>
      </div>
    </aside>
  )
}

export function Rail() {
  return (
    <div className="flex w-12 shrink-0 flex-col items-center gap-4 border-r border-line bg-bg-secondary py-4">
      <button type="button" aria-label="Toggle Sidebar" className="cursor-pointer text-fg-tertiary hover:text-fg">
        <Icon name="sidebarToggle" />
      </button>
      <div className="mt-auto flex flex-col items-center gap-4">
        <Avatar name="Josip Gajsak393" size={24} />
        <button type="button" aria-label="Notifications" className="cursor-pointer text-fg-tertiary hover:text-fg">
          <Icon name="bell" />
        </button>
        <button type="button" aria-label="Share feedback" className="cursor-pointer text-fg-tertiary hover:text-fg">
          <Icon name="send" />
        </button>
        <button type="button" aria-label="Help" className="cursor-pointer text-fg-tertiary hover:text-fg">
          <Icon name="help" />
        </button>
      </div>
    </div>
  )
}

export function TopBar({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between px-6">
      <h1 className="text-[20px] leading-8 font-semibold text-fg">{title}</h1>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>
  )
}

export function Toolbar({ left, right }: { left?: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-6 pb-3">
      <div className="flex items-center gap-2">{left}</div>
      <div className="flex items-center gap-2">{right}</div>
    </div>
  )
}

/*
 * Skip link. Toggl 2.0 has none, which costs keyboard users 26 tab stops
 * before reaching content on every page — see docs/accessibility-audit.md §2.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-100 focus:rounded-lg focus:bg-bg-accent focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:text-fg-inverted"
    >
      Skip to main content
    </a>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full bg-bg-secondary">
      <SkipLink />
      <Rail />
      <Sidebar />
      <main id="main-content" tabIndex={-1} className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
}
