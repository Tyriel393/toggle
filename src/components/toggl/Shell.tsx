import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon, type IconName } from './Icon'
import { Avatar } from './Data'
import { ScopeProvider, useScope } from './ScopeToast'

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

/*
 * Measured from the live app: 24px brand-magenta disc, dark power glyph, and a
 * bordered "2.0" pill that overlaps the disc's lower edge and sits in front.
 */
function TogglMark() {
  return (
    <span className="flex shrink-0 flex-col items-center">
      <span className="-mb-2 p-1">
        <svg
          viewBox="0 0 24 24"
          className="size-6 rounded-full"
          style={{ backgroundColor: '#ec85fe', color: '#312537' }}
          aria-label="Toggl"
          role="img"
        >
          <path
            fill="currentColor"
            d="M5.5 12.3027C5.5 15.6957 8.60838 18.5 12 18.5C15.393 18.5 18.5007 15.695 18.5 12.302C18.5 9.47108 16.5 7 14 6.5V8.25C15.6532 8.89874 16.75 10.4191 16.75 12.3027C16.75 14.7594 14.5 16.75 12 16.75C9.5 16.75 7.25 14.7594 7.25 12.3027C7.25 10.4198 8.34478 8.89874 10 8.25V6.5C7.5 7 5.5 9.47108 5.5 12.3027Z"
          />
          <path fill="currentColor" d="M13 13V4H11V13H13Z" />
        </svg>
      </span>
      <span className="relative z-10 inline-flex h-4 items-center rounded-lg border border-line-accent-strong bg-bg-muted px-[3px] text-[11px] leading-none font-semibold tracking-[-0.22px] text-fg-accent">
        2.0
      </span>
    </span>
  )
}

export function Sidebar() {
  const notInScope = useScope()
  return (
    <aside className="flex w-[201px] shrink-0 flex-col bg-bg-tertiary">
      <button
        type="button"
        onClick={() => notInScope('Switching workspace')}
        className="flex h-16 w-full cursor-pointer items-center gap-2.5 py-2.5 pr-2 pl-4 hover:bg-bg-hover"
      >
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
          onClick={() => notInScope('The upgrade flow')}
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
          onClick={() => notInScope('Downloading the apps')}
          className="flex h-8 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 text-[14px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
        >
          <Icon name="download" />
          Download apps
        </button>
        <button
          type="button"
          onClick={() => notInScope('Admin settings')}
          className="flex h-8 w-full cursor-pointer items-center gap-2.5 rounded-lg px-2 text-[14px] font-medium text-fg-secondary hover:bg-bg-hover hover:text-fg"
        >
          <Icon name="settings" />
          Admin settings
        </button>
      </div>
    </aside>
  )
}

/* Rail order matches the live app: mark top, collapse mid, actions bottom. */
function Rail({ sidebarOpen, onToggleSidebar }: { sidebarOpen: boolean; onToggleSidebar: () => void }) {
  const notInScope = useScope()
  return (
    <div className="flex w-12 shrink-0 flex-col items-center justify-between bg-bg-tertiary py-4">
      <TogglMark />
      <button
        type="button"
        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        aria-expanded={sidebarOpen}
        onClick={onToggleSidebar}
        className="cursor-pointer text-fg-tertiary hover:text-fg"
      >
        <Icon name="sidebarToggle" />
      </button>
      <div className="flex flex-col items-center gap-4">
        <Avatar name="Josip Gajsak393" size={24} />
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => notInScope('The notification centre')}
          className="cursor-pointer text-fg-tertiary hover:text-fg"
        >
          <Icon name="bell" />
        </button>
        <button
          type="button"
          aria-label="Share feedback"
          onClick={() => notInScope('Sending feedback')}
          className="cursor-pointer text-fg-tertiary hover:text-fg"
        >
          <Icon name="send" />
        </button>
        <button
          type="button"
          aria-label="Help"
          onClick={() => notInScope('The help centre')}
          className="cursor-pointer text-fg-tertiary hover:text-fg"
        >
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

/*
 * Skip link. Toggl 2.0 has none, which costs keyboard users 26 tab stops
 * before reaching content on every page.
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
  const [sidebarOpen, setSidebarOpen] = useState(true)
  return (
    <ScopeProvider>
      <div className="flex h-full bg-bg-tertiary">
        <SkipLink />
        <Rail sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((o) => !o)} />
        {sidebarOpen ? <Sidebar /> : null}
        <main id="main-content" tabIndex={-1} className="flex min-w-0 flex-1 flex-col overflow-hidden bg-bg">
          {children}
        </main>
      </div>
    </ScopeProvider>
  )
}

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="flex-1 overflow-y-auto px-6 pb-6">{children}</div>
}
