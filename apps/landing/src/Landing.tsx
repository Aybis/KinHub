import { motion } from 'framer-motion';

const pillars = [
  { key: 'Want', desc: 'Goals & wishlists', emoji: '🎯' },
  { key: 'Spend', desc: 'Expenses, transparent', emoji: '💸' },
  { key: 'Buy', desc: 'Purchases logged', emoji: '🛒' },
  { key: 'Have', desc: 'Home inventory & assets', emoji: '🏠' },
  { key: 'Leak', desc: 'Subscriptions & waste', emoji: '🕳️' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-6 text-center"
      >
        <motion.p variants={item} className="mb-4 text-sm font-medium uppercase tracking-widest text-slate-400">
          MAYA · Manage All Your Assets
        </motion.p>
        <motion.h1 variants={item} className="max-w-3xl text-5xl font-extrabold leading-tight md:text-6xl">
          Everyone knows what the family wants, spends, buys, has, and leaks.
        </motion.h1>
        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-slate-300">
          The family transparency hub — finance, home inventory, shared goals, and coordinated reminders in one place. Agentic AI learns your family.
        </motion.p>
        <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
            Start free
          </button>
          <button className="rounded-full border border-slate-700 px-8 py-3 text-sm font-semibold text-white transition hover:border-slate-500">
            Book enterprise demo
          </button>
        </motion.div>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto max-w-6xl px-6 py-20"
      >
        <motion.h2 variants={item} className="text-center text-3xl font-bold">The 5 Pillars</motion.h2>
        <motion.div variants={item} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p) => (
            <motion.div
              key={p.key}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="text-3xl">{p.emoji}</div>
              <div className="mt-4 text-xl font-bold">{p.key}</div>
              <div className="mt-1 text-sm text-slate-400">{p.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-4xl px-6 py-20 text-center"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-slate-400">Agentic AI</p>
        <h2 className="mt-2 text-3xl font-bold">AI that learns your family</h2>
        <p className="mt-4 text-slate-300">
          Upload a receipt → AI extracts vendor, line items, refunds, category, and total. Auto-categorizes spending, detects subscriptions (leaks), tracks warranties, and writes your family's weekly summary.
        </p>
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8 text-left">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Signature flow</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-5">
            {['Upload', 'Scan', 'Preview', 'Review', 'Confirm'].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-800 text-sm font-bold">
                  {i + 1}
                </div>
                <span className="text-sm text-slate-300">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <footer className="border-t border-slate-800 py-12 text-center text-sm text-slate-500">
        <p>MAYA · Manage All Your Assets · Family Transparency Hub</p>
      </footer>
    </div>
  );
}