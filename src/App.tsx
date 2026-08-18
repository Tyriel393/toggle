import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/toggl/Shell'
import { KitPage } from '@/routes/KitPage'
import { StubPage } from '@/routes/StubPage'
import { TimerPage } from '@/routes/TimerPage'
import { SetupPage } from '@/routes/SetupPage'
import { OnboardingPage } from '@/routes/OnboardingPage'

/* Onboarding runs full-screen, outside the shell — as it does in the real app. */
function Shell({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/kit" element={<Shell><KitPage /></Shell>} />
        <Route path="/calendar" element={<Shell><TimerPage /></Shell>} />
        <Route path="/setup" element={<Shell><SetupPage /></Shell>} />
        <Route path="/reports" element={<Shell><StubPage title="Reports" /></Shell>} />
        <Route path="/projects" element={<Shell><StubPage title="Projects" /></Shell>} />
        <Route path="/tasks" element={<Shell><StubPage title="Tasks" /></Shell>} />
        <Route path="/timeline" element={<Shell><StubPage title="Timeline" /></Shell>} />
        <Route path="/members" element={<Shell><StubPage title="Members" /></Shell>} />
        <Route path="/approvals" element={<Shell><StubPage title="Approvals" /></Shell>} />
        <Route path="/time-off" element={<Shell><StubPage title="Time off" /></Shell>} />
        <Route path="*" element={<Shell><StubPage title="Not found" /></Shell>} />
      </Routes>
    </BrowserRouter>
  )
}
