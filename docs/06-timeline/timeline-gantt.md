# 📅 Timeline & Gantt — MAYA

**Version:** 2.0
**Status:** Draft
**Date:** 2026-08-09

**Planned schedule:** 5 phases over ~14 weeks (target public launch ~Week 14).

---

## 1. Phase Overview

| Phase | Milestone | Duration | Weeks |
|---|---|---|---|
| P1 — Foundation | M1 | 3 weeks | W1–W3 |
| P2 — Core Features | M2 | 4 weeks | W4–W7 |
| P3 — AI Features | M3 | 3 weeks | W8–W10 |
| P4 — Collaboration & Polish | M4 | 2 weeks | W11–W12 |
| P5 — Launch | M5 | 2 weeks | W13–W14 |

---

## 2. Gantt Chart (text-based)

Legend: `▓` = active, `░` = buffer/QA, `◆` = milestone

```
Deliverable                     W1  W2  W3  W4  W5  W6  W7  W8  W9  W10 W11 W12 W13 W14
──────────────────────────────────────────────────────────────────────────────────────
P1 FOUNDATION                      ◆ M1
 Monorepo scaffold               ▓▓
 DB schema + RLS                 ▓▓
 Auth + OTP                      ▓▓
 Family & member CRUD               ▓▓
 Docker + CI/CD                     ▓▓
 Design system                       ▓▓
──────────────────────────────────────────────────────────────────────────────────────
P2 CORE FEATURES                                         ◆ M2
 Web dashboard                                                ▓▓▓
 Transactions + AI categorize                                  ▓▓▓
 Goals (Want)                                                    ▓▓
 Inventory (Have)                                                ▓▓
 Recurring + catalog (Leak)                                        ▓▓
 Mobile app core                                                      ▓▓▓
──────────────────────────────────────────────────────────────────────────────────────
P3 AI FEATURES                                              ◆ M3
 Receipt/invoice scan flow                                            ▓▓▓
 Photo → inventory                                                        ▓▓
 Recurring detection                                                      ▓▓
 AI family summary                                                        ▓
 Buy→Have auto-link                                                       ▓▓
──────────────────────────────────────────────────────────────────────────────────────
P4 COLLAB & POLISH                                          ◆ M4
 Calendar view                                                              ▓▓
 Reminders/notifications                                                     ▓▓
 Realtime sync (WebSocket)                                                   ▓▓
 QA + bug-fix pass                                                               ▓▓
 Security/performance                                                            ▓▓
──────────────────────────────────────────────────────────────────────────────────────
P5 LAUNCH                                                               ◆ M5
 Landing page                                                                   ▓▓
 Beta program (10 families)                                                      ▓░
 Analytics/KPIs                                                                   ▓
 Public launch v1.0                                                                    ◆
```

---

## 3. Detailed Work Breakdown (by phase)

### Phase 1 — Foundation (W1–W3)
| Week | Work | Owner |
|---|---|---|
| W1 | Monorepo scaffold, tooling, eslint/prettier, CI skeleton | Nova, Terra |
| W2 | Postgres schema + RLS, migrations, seed catalog schema | Nova |
| W3 | Auth (JWT+OTP), family/member CRUD, Docker Compose, design system | Nova, Echo, Muse |

### Phase 2 — Core Features (W4–W7)
| Week | Work | Owner |
|---|---|---|
| W4 | Dashboard layout + net worth + recent transactions | Atlas |
| W5 | Transactions CRUD + AI categorization; Goals | Nova, Atlas, Pulse |
| W6 | Inventory CRUD; Recurring + catalog pick | Atlas, Nova, Ledger |
| W7 | Mobile app core screens (Expo) | Terra |

### Phase 3 — AI Features (W8–W10)
| Week | Work | Owner |
|---|---|---|
| W8 | Receipt upload + scan + preview + review + confirm | Pulse, Atlas |
| W9 | Photo→inventory, recurring detection | Pulse, Nova |
| W10 | AI summaries, Buy→Have cascade, eval golden-set | Pulse, Nova |

### Phase 4 — Collaboration & Polish (W11–W12)
| Week | Work | Owner |
|---|---|---|
| W11 | Calendar view, reminders/notifications, realtime sync | Relay, Atlas, Nova |
| W12 | QA pass, bug-fix, security & performance review | Scribe, Echo |

### Phase 5 — Launch (W13–W14)
| Week | Work | Owner |
|---|---|---|
| W13 | Landing page, beta program with 10 families, feedback loop | Muse, Atlas, Maya |
| W14 | Analytics/KPIs wired, fixes, public launch v1.0 | All |

---

## 4. Resource Loading

| AI Member | W1–3 | W4–7 | W8–10 | W11–12 | W13–14 |
|---|---|---|---|---|---|
| Atlas (Frontend) | 30% | 90% | 60% | 60% | 40% |
| Terra (Mobile) | 40% | 80% | 40% | 30% | 20% |
| Nova (Backend) | 100% | 80% | 70% | 50% | 30% |
| Pulse (AI/ML) | — | 30% | 100% | 40% | 20% |
| Echo (DevOps) | 70% | 20% | 20% | 40% | 30% |
| Scribe (QA) | 20% | 30% | 30% | 100% | 60% |
| Muse (Design) | 50% | 50% | 20% | 20% | 40% |
| Ledger (Data) | 20% | 40% | 20% | 10% | 20% |
| Relay (Notify) | — | — | 20% | 80% | 20% |

---

## 5. Critical Path & Dependencies

**Critical path:** DB schema → Transactions → Scan flow → Calendar/Reminders → Launch.

**Key dependencies:**
- Dashboard depends on Transactions + Goals APIs.
- Scan flow depends on Transactions + Inventory APIs.
- Calendar/Reminders depend on Recurring + Scan.
- Mobile depends on backend API completeness (W7 starts after core APIs).

**Bottleneck risk:** Pulse (AI) is 100% loaded W8–W10 — scan + detection + summaries overlap. Mitigation: parallelize with Codex agents, stagger summaries to W10.

---

## 6. Milestone Gates

| Milestone | Gate Criterion | Sign-off |
|---|---|---|
| M1 | Phase 1 all deliverables done, staging deploys | Maya + Scribe |
| M2 | Core features work end-to-end | Maya + Scribe |
| M3 | AI features accurate (eval passes golden-set) | Maya + Pulse |
| M4 | QA sign-off, security review passed | Scribe + Echo |
| M5 | v1.0 public launch | Maya |

---

## 7. Tracking & Review

- **Weekly:** Hermes compiles status from agent reports (via `weekly-review-planning`).
- **Per-milestone:** gate review against Definition of Done.
- **Risk review:** updated at each gate; schedule shifts flagged early.