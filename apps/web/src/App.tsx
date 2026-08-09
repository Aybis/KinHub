import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Scan from './pages/Scan';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/scan" element={<Scan />} />
      </Routes>
    </div>
  );
}