import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { KitPage } from '@/routes/KitPage'
import { HomePage } from '@/routes/HomePage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-full">
        <nav className="flex gap-4 border-b border-line-subtle px-6 py-3 text-sm">
          <Link to="/" className="text-ink-secondary hover:text-ink-primary">
            Home
          </Link>
          <Link to="/kit" className="text-ink-secondary hover:text-ink-primary">
            Kit
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kit" element={<KitPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
