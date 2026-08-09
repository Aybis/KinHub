# 🏠 MAYA — Manage All Your Assets

> **A family that sees everything together, manages everything together.**

MAYA is an **enterprise-grade, B2B-SaaS-scalable** family transparency platform that unifies **family finance, home inventory, shared goals, and coordinated reminders** into one transparent space. Every member (parents and kids) sees what the family **wants, spends, buys, has, and leaks** — and coordinates as one. Features agentic AI with **custom provider support** (no vendor lock-in), on par with Monarch.

---

## 🎯 The 5 Pillars

| Pillar | Meaning | Example |
|--------|---------|---------|
| **Want** | Goals & wishlists | Vacation fund, new fridge |
| **Spend** | Expenses, transparent | This month's spending |
| **Buy** | Purchases logged | From groceries to appliances |
| **Have** | Home inventory & assets | What we own, value, warranty |
| **Leak** | Subscriptions & waste | Money bleeding out monthly |

**Killer feature:** log a purchase (**Buy**) → it *automatically* creates the inventory record (**Have**) and updates the budget (**Spend**). One action feeds three pillars.

---

## 🏗️ Tech Stack (summary)

- **Web:** React + Vite + TypeScript + Tailwind + **Framer Motion** (premium animation)
- **Mobile:** React Native (Expo) + Firebase FCM
- **Backend:** Node.js + NestJS
- **Database:** **Supabase** (Postgres RLS, Auth, Realtime, Storage, Edge Functions)
- **AI:** Custom provider support (any OpenAI-compatible endpoint) + multi-provider fallback
- **Notifications:** **Firebase Cloud Messaging** + Telegram/WhatsApp
- **Security:** **OWASP Top 10** aligned
- **Deploy:** Docker + CI/CD, B2B SaaS scalable

*(Full details: `docs/03-techstack/tech-stack.md`)*

---

## 📚 Project Documents

| Doc | Path | Contents |
|---|---|---|
| **BRD** | `docs/01-brd/BRD.md` | Product vision, pillars, features (FR), non-functional reqs, B2B positioning, KPIs, risks |
| **ToR** | `docs/02-tor/ToR.md` | Architecture, data model, process flows, API design, AI (custom provider) contracts, OWASP security |
| **Tech Stack** | `docs/03-techstack/tech-stack.md` | Frontend, mobile, Supabase, Firebase, AI, security, infra, monorepo |
| **Team** | `docs/04-team/team.md` | Human + AI team, roles, skills mapping |
| **Goals & Deliverables** | `docs/05-goals/goals-deliverables.md` | SMART goals, deliverables by phase, definition of done |
| **Timeline & Gantt** | `docs/06-timeline/timeline-gantt.md` | 14-week schedule, Gantt, work breakdown, milestones |

---

## 👥 Team (summary)

Hybrid human + AI team:
- **Maya** — Product Owner
- **Hermes** — Technical Advisor / Orchestrator
- **9 AI agents** — Atlas (frontend), Terra (mobile), Nova (backend), Pulse (AI/ML), Echo (devops), Scribe (QA), Muse (design), Ledger (data), Relay (notifications)

*(Full details: `docs/04-team/team.md`)*

---

## 📅 Timeline (summary)

5 phases over ~14 weeks → public launch v1.0

| Phase | Weeks | Milestone |
|---|---|---|
| Foundation | W1–W3 | M1 |
| Core Features | W4–W7 | M2 |
| AI Features | W8–W10 | M3 |
| Collaboration & Polish | W11–W12 | M4 |
| Launch | W13–W14 | M5 |

*(Full details: `docs/06-timeline/timeline-gantt.md`)*

---

## 🚀 Quick Start

1. Read the **BRD** first (what we're building & why).
2. Read the **ToR** (how it's built technically).
3. Follow the **timeline** phase by phase.
4. Each phase: delegate to the **team** using the skills in `docs/04-team/team.md`.

---

## 📌 Status

- **Phase:** Planning/Documentation complete ✅
- **Next step:** Scaffold monorepo (Phase 1, W1)
- **Target launch:** ~Week 14