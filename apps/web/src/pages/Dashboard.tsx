import { motion } from 'framer-motion';

const pillars = [
  { key: 'Want', color: 'bg-rose-100 text-rose-700', desc: 'Goals & wishlists' },
  { key: 'Spend', color: 'bg-blue-100 text-blue-700', desc: 'Expenses, transparent' },
  { key: 'Buy', color: 'bg-emerald-100 text-emerald-700', desc: 'Purchases logged' },
  { key: 'Have', color: 'bg-amber-100 text-amber-700', desc: 'Home inventory & assets' },
  { key: 'Leak', color: 'bg-purple-100 text-purple-700', desc: 'Subscriptions & waste' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-6xl px-6 py-10"
    >
      <motion.header variants={item} className="mb-8">
        <p className="text-sm font-medium uppercase tracking-widest text-slate-400">
          MAYA · Manage All Your Assets
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Family Transparency Hub
        </h1>
        <p className="mt-1 text-slate-500">
          Everyone knows what the family wants, spends, buys, has, and leaks.
        </p>
      </motion.header>

      <motion.div
        variants={item}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
      >
        {pillars.map((p) => (
          <motion.div
            key={p.key}
            whileHover={{ y: -4 }}
            className={`rounded-2xl p-5 ${p.color}`}
          >
            <div className="text-2xl font-bold">{p.key}</div>
            <div className="mt-1 text-sm opacity-80">{p.desc}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={item}
        className="mt-8 grid gap-4 lg:grid-cols-3"
      >
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-sm text-slate-500">Net Worth</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">
            Rp 0
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-sm text-slate-500">This Month Spend</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">
            Rp 0
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-sm text-slate-500">Recurring / Mo</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">
            Rp 0
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}