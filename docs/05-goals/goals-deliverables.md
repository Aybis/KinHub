# 🎯 Goals & Deliverables — MAYA

**Version:** 2.0
**Status:** Draft
**Date:** 2026-08-09

---

## 1. Product Goals

### 1.1 North-Star Goal
> **Become the trusted "single source of truth" for family money + belongings, where every member sees everything and coordinates as one.**

### 1.2 SMART Goals (v1 launch)

| # | Goal | Measure | Target |
|---|------|---------|--------|
| G1 | Get families onboarded fast | % invited members joining in 48h | > 60% |
| G2 | Build the sharing habit | Avg. transactions+items logged per family/week | > 15 |
| G3 | Prove the leak-hunting value | Avg. IDR saved via cancellations | > Rp 100k/family/mo |
| G4 | Retain families | D30 retention | > 40% |
| G5 | Encourage family coordination | % goals achieved & bills on-time | > 70% |
| G6 | Grow by referral | Avg. family size (members/household) | > 3.5 |

### 1.3 Stretch Goals (post-launch)
- Reach 1,000 active families in 6 months.
- IDR-first → expand currency/language support.
- Open-banking account sync.

---

## 2. Deliverables

### 2.1 Phase 1 — Foundation (Milestone: M1)
| # | Deliverable | Owner | Done When |
|---|---|---|---|
| D1 | Monorepo scaffold (web/mobile/api/shared) | Nova, Terra | Runs locally |
| D2 | PostgreSQL schema + migrations + RLS | Nova | Migrations apply clean |
| D3 | Auth: JWT + OTP request/verify | Nova | OTP flow working |
| D4 | Family & member CRUD | Nova | API tested |
| D5 | Docker Compose + CI/CD pipeline | Echo | Deploys to staging |
| D6 | Design system + UI foundations | Muse, Atlas | Style guide in place |

### 2.2 Phase 2 — Core Features (M2)
| # | Deliverable | Owner | Done When |
|---|---|---|---|
| D7 | Web dashboard (net worth, budget, recent, goals) | Atlas | Dashboard live |
| D8 | Transactions CRUD + AI categorization | Nova, Pulse | Categorize works |
| D9 | Goals (Want) + contributions | Nova, Atlas | Goal flow works |
| D10 | Inventory (Have) CRUD | Atlas, Nova | Inventory works |
| D11 | Recurring (Leak) + catalog add | Atlas, Ledger | Catalog pick works |
| D12 | Mobile app (Expo) core screens | Terra | Mobile builds & runs |

### 2.3 Phase 3 — AI Features (M3)
| # | Deliverable | Owner | Done When |
|---|---|---|---|
| D13 | Receipt/invoice upload + scan flow | Pulse, Atlas | Upload→Scan→Preview→Review→Confirm |
| D14 | Photo → inventory suggestion | Pulse | Photo→item works |
| D15 | Recurring detection from history | Pulse, Nova | Detection proposes items |
| D16 | AI family weekly/monthly summary | Pulse | Summary generated |
| D17 | Buy→Have auto-link cascade | Nova | One upload feeds pillars |

### 2.4 Phase 4 — Collaboration & Polish (M4)
| # | Deliverable | Owner | Done When |
|---|---|---|---|
| D18 | Calendar view of due dates | Atlas | Calendar live |
| D19 | Reminders + notifications (push/Telegram) | Relay, Nova | Reminders sent |
| D20 | Realtime family sync (WebSocket) | Atlas, Nova | Live updates |
| D21 | QA + bug-fix pass | Scribe | QA sign-off |
| D22 | Security & performance hardening | Echo, Scribe | Review passed |

### 2.5 Phase 5 — Launch (M5)
| # | Deliverable | Owner | Done When |
|---|---|---|---|
| D23 | Landing page + marketing site | Muse, Atlas | Live |
| D24 | Beta program (10 families) | Maya, Scribe | Beta active |
| D25 | Analytics & KPI dashboard | Ledger | Metrics tracked |
| D26 | Public launch (v1.0) | All | Released |

---

## 3. Definition of Done (per deliverable)
- Code merged via PR, reviewed by Scribe.
- Tests pass (unit + integration + E2E where applicable).
- Works on target platforms (web + mobile).
- Matches ToR spec + BRD requirements.
- No critical/security bugs open.
- Documented (README/API where needed).

---

## 4. Success Milestones

| Milestone | Content | Gate |
|---|---|---|
| **M1** | Foundation | All Phase 1 done |
| **M2** | Core Features | All Phase 2 done |
| **M3** | AI Features | All Phase 3 done |
| **M4** | Collaboration & Polish | All Phase 4 done |
| **M5** | Launch | v1.0 public |

---

## 5. MVP Scope Decision

**In MVP (v1):** Family + OTP invites, 5 pillars (Want/Spend/Buy/Have/Leak), catalog pick, upload-scan, calendar, reminders, dashboard.

**Deliberately deferred:** bank auto-sync, payments, marketplace, public social, investments.

> Rationale: focus launch on the **transparency + coordination + leak-hunting** core that no competitor has — not on bank plumbing.