import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import type { CatalogEntry } from '@maya/shared';

async function fetchCatalog(q: string): Promise<CatalogEntry[]> {
  const res = await fetch(`/api/v1/catalog?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error('Failed to load catalog');
  return res.json();
}

export default function Catalog() {
  const [query, setQuery] = useState('');
  const { data, isLoading, error } = useQuery({
    queryKey: ['catalog', query],
    queryFn: () => fetchCatalog(query),
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-slate-900">Add Subscription</h1>
        <p className="mt-1 text-sm text-slate-500">
          Search the catalog — edit prices to match your plan.
        </p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a subscription..."
          className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-blue-400"
        />
      </motion.div>

      <AnimatePresence>
        <motion.ul layout className="mt-6 divide-y divide-slate-100">
          {isLoading && <li className="py-4 text-slate-400">Loading…</li>}
          {error && <li className="py-4 text-rose-500">Failed to load.</li>}
          {data?.map((entry) => (
            <motion.li
              key={entry.key}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between py-3"
            >
              <div>
                <div className="font-medium text-slate-800">{entry.name}</div>
                <div className="text-xs text-slate-400">
                  {entry.category} · {entry.region}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-slate-900">
                  {entry.currency === 'USD' ? '$' : 'Rp '}
                  {entry.defaultPrice.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">/ {entry.cycle}</div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}