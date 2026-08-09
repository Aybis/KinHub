import { motion } from 'framer-motion';

/* ---------------- Nav ---------------- */
function Nav() {
  const links = ['Features', 'For Families', 'For Enterprise', 'Pricing'];
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <span className="text-lg font-extrabold tracking-wide">MAYA</span>
          <nav className="hidden gap-6 md:flex">
            {links.map((l) => (
              <button key={l} className="text-sm text-slate-400 transition hover:text-white">
                {l}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-sm text-slate-300 transition hover:text-white">Sign in</button>
          <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
            Sign up free
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-full border border-slate-800 px-4 py-1.5 text-xs font-medium text-slate-400"
      >
        Family money + belongings, <span className="text-white">fully transparent</span>
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mt-6 max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl"
      >
        Everyone knows what the family{' '}
        <span className="text-blue-400">wants, spends, buys, has, and leaks.</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300"
      >
        MAYA brings your family's money, home inventory, subscriptions, and goals into one
        transparent space. No more secrets, no more nagging — agentic AI does the heavy lifting.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-10 flex flex-col gap-4 sm:flex-row"
      >
        <button className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
          Start free
        </button>
        <button className="rounded-full border border-slate-700 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-slate-500">
          Book enterprise demo
        </button>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-xs text-slate-500"
      >
        Free for 1 family · No credit card required
      </motion.p>
    </section>
  );
}

/* ---------------- What is MAYA ---------------- */
function WhatIs() {
  return (
    <section className="border-t border-slate-800/60 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-slate-400">What is MAYA?</p>
        <h2 className="mt-3 text-4xl font-bold">Your family's home base for money clarity</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
          MAYA simplifies family finances by bringing money and belongings into one clear,
          shared view. Always know where family money is, what you own, and where it's going —
          achieve goals faster and coordinate with every member at no extra cost.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Feature tabs ---------------- */
const tabs = [
  { key: 'Want', title: 'Want', desc: 'Set family goals', color: 'text-rose-400' },
  { key: 'Spend', title: 'Spend', desc: 'Track every expense', color: 'text-blue-400' },
  { key: 'Buy', title: 'Buy', desc: 'Log every purchase', color: 'text-emerald-400' },
  { key: 'Have', title: 'Have', desc: 'Catalog home assets', color: 'text-amber-400' },
  { key: 'Leak', title: 'Leak', desc: 'Find & kill leaks', color: 'text-purple-400' },
];

function FeatureTabs() {
  return (
    <section className="border-t border-slate-800/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-slate-400">
          The 5 pillars
        </p>
        <h2 className="mt-3 text-center text-4xl font-bold">Everything you need, all in one app</h2>
        <p className="mx-auto mt-5 max-w-2xl text-center text-lg text-slate-300">
          Connect your family and MAYA does the heavy lifting — track, budget, collaborate, and
          plan as one unit.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tabs.map((t) => (
            <motion.div
              key={t.key}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center"
            >
              <div className={`text-2xl font-extrabold ${t.color}`}>{t.title}</div>
              <div className="mt-2 text-sm text-slate-400">{t.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Deep-dive features ---------------- */
const deepDives = [
  {
    tag: 'Know what you own',
    title: 'Home inventory & assets',
    desc: 'Catalog every item in your home — value, purchase date, warranty, room. Never lose track of what you have, and get insur&\u2019d for what matters.',
  },
  {
    tag: 'Every bill in one list',
    title: 'Subscriptions & bills, tamed',
    desc: "MAYA auto-detects your recurring subscriptions — streaming, apps, utilities — so you never lose track of what you're paying. Spot forgotten charges and take control.",
  },
  {
    tag: 'Take control of leaks',
    title: 'Stop the silent money bleed',
    desc: 'See every subscription and bill on a calendar. Cancel what you don\u2019t use, get reminders before due dates, and watch your leak stop.',
  },
  {
    tag: 'Visualize the flow',
    title: 'Reports as powerful as they are beautiful',
    desc: 'Sankey diagrams, spending by category, net worth over time. Turn raw family data into insights you act on.',
  },
  {
    tag: 'Agentic AI',
    title: 'AI that learns your family',
    desc: 'Scan a receipt → AI extracts vendor, items, refunds, and total. Auto-categorizes, detects subscriptions, tracks warranties, and writes your weekly family summary.',
  },
  {
    tag: 'On every device',
    title: 'Always in sync',
    desc: 'MAYA works across web, iOS, and Android — so the whole family can check in anytime, anywhere.',
  },
];

function DeepDive() {
  return (
    <section className="border-t border-slate-800/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deepDives.map((f) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-blue-400">{f.tag}</p>
              <h3 className="mt-3 text-2xl font-bold">{f.title}</h3>
              <p className="mt-3 text-slate-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
const testimonials = [
  {
    quote:
      'Finally a place where we all see the family finances and stuff in one view. No more surprises.',
    name: 'Aya & Rizky',
    detail: 'Family of 4 · Jakarta',
  },
  {
    quote: 'The subscription calendar caught 3 apps we forgot about. We saved real money in month one.',
    name: 'Dewi',
    detail: 'Family of 3 · Bandung',
  },
  {
    quote: 'The kids finally understand where money goes. It changed how we talk about spending.',
    name: 'Hendra',
    detail: 'Family of 5 · Surabaya',
  },
];

function Testimonials() {
  return (
    <section className="border-t border-slate-800/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold">What families say</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <p className="text-lg leading-relaxed text-slate-200">"{t.quote}"</p>
              <div className="mt-6">
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-sm text-slate-500">{t.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
const plans = [
  {
    name: 'Free',
    price: 'Rp 0',
    period: '/mo',
    features: ['1 family', 'Up to 4 members', 'Basic inventory', 'Catalog access'],
    highlight: false,
  },
  {
    name: 'Family',
    price: 'Rp 49k',
    period: '/mo',
    features: ['Unlimited members', 'All AI scanning', 'Subscriptions & calendar', 'Goals & reminders'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Org management', 'SSO & audit logs', 'Custom AI providers', 'Dedicated support'],
    highlight: false,
  },
];

function Pricing() {
  return (
    <section className="border-t border-slate-800/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-4xl font-bold">Simple, family-friendly pricing</h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
          Start free. Upgrade when your family grows.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border p-8 ${
                p.highlight
                  ? 'border-blue-500 bg-blue-950/40'
                  : 'border-slate-800 bg-slate-900'
              }`}
            >
              <div className="text-lg font-semibold text-white">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{p.price}</span>
                <span className="text-base text-slate-400">{p.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full rounded-full py-3 text-sm font-semibold transition ${
                  p.highlight
                    ? 'bg-white text-slate-900 hover:bg-slate-200'
                    : 'border border-slate-700 text-white hover:border-slate-500'
                }`}
              >
                {p.name === 'Enterprise' ? 'Contact sales' : `Start ${p.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA + footer ---------------- */
function FinalCTA() {
  return (
    <section className="border-t border-slate-800/60 py-24 text-center">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-4xl font-bold md:text-5xl">Your family deserves clarity</h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
          Track your money and belongings together, transparently. Start free today.
        </p>
        <button className="mt-8 rounded-full bg-white px-10 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
          Start free
        </button>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: 'Product', items: ['Features', 'Pricing', 'For Families', 'For Enterprise'] },
    { title: 'Resources', items: ['Blog', 'Help Center', 'Community', 'Changelog'] },
    { title: 'Company', items: ['About', 'Careers', 'Privacy', 'Terms'] },
  ];
  return (
    <footer className="border-t border-slate-800/60 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="text-lg font-extrabold">MAYA</div>
            <p className="mt-3 text-sm text-slate-400">
              Manage All Your Assets. The family transparency hub.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold text-white">{col.title}</div>
              <ul className="mt-3 space-y-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <button className="text-sm text-slate-400 transition hover:text-white">
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-800/60 pt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} MAYA · Manage All Your Assets
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Landing ---------------- */
export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <Nav />
      <Hero />
      <WhatIs />
      <FeatureTabs />
      <DeepDive />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}