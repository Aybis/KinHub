import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Scan from './pages/Scan';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/catalog', label: 'Catalog' },
  { to: '/scan', label: 'Scan' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
          <span className="text-lg font-bold text-slate-900">MAYA</span>
          <div className="flex gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/scan" element={<Scan />} />
      </Routes>
    </div>
  );
}