import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/components/toggl/Shell'
import { KitPage } from '@/routes/KitPage'
import { StubPage } from '@/routes/StubPage'
import { TimerPage } from '@/routes/TimerPage'

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/calendar" replace />} />
          <Route path="/kit" element={<KitPage />} />
          <Route path="/calendar" element={<TimerPage />} />
          <Route path="/reports" element={<StubPage title="Reports" />} />
          <Route path="/projects" element={<StubPage title="Projects" />} />
          <Route path="/tasks" element={<StubPage title="Tasks" />} />
          <Route path="/timeline" element={<StubPage title="Timeline" />} />
          <Route path="/members" element={<StubPage title="Members" />} />
          <Route path="/approvals" element={<StubPage title="Approvals" />} />
          <Route path="/time-off" element={<StubPage title="Time off" />} />
          <Route path="*" element={<StubPage title="Not found" />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
