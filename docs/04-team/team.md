# 👥 Project Team — MAYA

**Version:** 2.0
**Status:** Draft
**Date:** 2026-08-09

---

## 1. Team Model

MAYA is built by a **hybrid team**: a human product owner (Maya/Ama) orchestrating **AI agent specialists**. Each AI member has a defined role, the coding agent it runs on, and the **skills** it loads for best output.

---

## 2. Human Team

| Role | Person | Responsibility |
|---|---|---|
| **Product Owner / Vision** | Maya (Ama) | Vision, priorities, final decisions, family UX instincts |
| **Technical Advisor** | Hermes (Horus) | Architecture, orchestration, QA, AI-agent management |

---

## 3. AI Agent Team

| # | AI Member | Role | Runs On | Primary Skills |
|---|---|---|---|---|
| 1 | **Atlas** | Frontend Engineer (Web PWA) | Claude Code / Codex / OpenCode | `frontend-design`, `popular-web-designs`, `claude-design`, `ai-chat-application-development`, `react-dashboard-development`, Framer Motion (animation) |
| 2 | **Terra** | Mobile Engineer (React Native/Expo) | Codex / Claude Code | `nodejs-setup`, `test-driven-development`, `ai-chat-application-development` |
| 3 | **Nova** | Backend Engineer (NestJS + **Supabase**/Postgres) | Claude Code / OpenCode | `hermes-agent`, `systematic-debugging`, `test-driven-development` |
| 4 | **Pulse** | AI/ML Engineer (OCR + LLM extraction) | Codex / Claude Code | `vision-document-extraction`, `ocr-and-documents`, `huggingface-hub`, `evaluating-llms-harness` |
| 5 | **Echo** | DevOps / Infra Engineer | Claude Code | `machine-access`, `github-repo-management`, `nodejs-setup` |
| 6 | **Scribe** | QA / Test Engineer | Hermes / Codex | `dogfood`, `test-driven-development`, `requesting-code-review`, `github-code-review` |
| 7 | **Muse** | Product Design / UX | Claude Code | `frontend-design`, `popular-web-designs`, `sketch`, `claude-design`, `design-md` |
| 8 | **Ledger** | Data / Catalog Engineer | Codex / Hermes | `xlsx`, `financial-news`, `vision-document-extraction` |
| 9 | **Relay** | Notifications / Reminders Engineer (**Firebase FCM**, Telegram) | Codex / Claude Code | `hermes-cli-integration`, `hermes-subprocess-gateway`, `machine-access` |

---

## 4. Skill-to-Phase Mapping

### Phase 1 — Foundation & Backend
| Task | Skill | AI Member |
|---|---|---|
| Project scaffold (monorepo, NestJS) | `nodejs-setup`, `test-driven-development` | Nova, Terra |
| Database schema + RLS | `test-driven-development` | Nova |
| Auth + OTP | `test-driven-development` | Nova |
| CI/CD + Docker | `github-pr-workflow`, `machine-access` | Echo |

### Phase 2 — Core Features
| Task | Skill | AI Member |
|---|---|---|
| Web dashboard | `dashboard-development`, `react-dashboard-development` | Atlas, Muse |
| Mobile app | `nodejs-setup`, `ai-chat-application-development` | Terra |
| API + services | `systematic-debugging`, `test-driven-development` | Nova |
| Subscription/bill catalog | `xlsx`, `vision-document-extraction` | Ledger |

### Phase 3 — AI Features
| Task | Skill | AI Member |
|---|---|---|
| Receipt/invoice scanning | `vision-document-extraction`, `ocr-and-documents` | Pulse |
| Photo → inventory | `vision-document-extraction` | Pulse |
| Smart categorization | `evaluating-llms-harness` | Pulse, Nova |
| Family summaries | `llm-chat-app-development` | Pulse |

### Phase 4 — Collaboration & Polish
| Task | Skill | AI Member |
|---|---|---|
| Reminders/notifications | `hermes-cli-integration`, `hermes-subprocess-gateway` | Relay |
| Realtime sync (WebSocket) | `react-dashboard-development` | Atlas, Nova |
| QA & bug fixing | `dogfood`, `systematic-debugging`, `github-code-review` | Scribe |
| Performance/security review | `requesting-code-review` | Scribe, Echo |

### Phase 5 — Launch & Iterate
| Task | Skill | AI Member |
|---|---|---|
| Landing page | `frontend-design`, `claude-design`, `sketch` | Muse, Atlas |
| Beta feedback loop | `dogfood` | Scribe |
| Analytics & KPIs | `xlsx`, `financial-news` | Ledger |

---

## 5. Recommended Coding Agent Configuration

**Why Claude Code / Codex / OpenCode?**
- **Claude Code** — best for complex frontend + backend reasoning, long multi-file changes.
- **Codex** — great for parallel tasks, fast iterations, test generation.
- **OpenCode** — user's daily driver (per memory: gpt-5.4), good for review & simple tasks.

**Per-role default:**
- Complex architecture (Nova, Atlas): **Claude Code**
- Fast parallel feature work (Terra, Pulse, Relay): **Codex**
- Review/QA (Scribe): **OpenCode**

---

## 6. Skills the Team Needs (must install)

The following skills are **required** for best AI output on MAYA. Marked ✅ if already installed, ⬜ to add:

| Skill | Used By | Status |
|---|---|---|
| `frontend-design` | Atlas, Muse | ✅ installed |
| `popular-web-designs` | Atlas, Muse | ✅ installed |
| `dashboard-development` | Atlas | ✅ installed |
| `react-dashboard-development` | Atlas | ✅ installed |
| `ai-chat-application-development` | Atlas, Terra | ✅ installed |
| `llm-chat-app-development` | Pulse | ✅ installed |
| `vision-document-extraction` | Pulse | ✅ installed |
| `ocr-and-documents` | Pulse | ✅ installed |
| `nodejs-setup` | Terra, Echo, Nova | ✅ installed |
| `test-driven-development` | Nova, Terra, Scribe | ✅ installed |
| `systematic-debugging` | Nova, Scribe | ✅ installed |
| `dogfood` | Scribe | ✅ installed |
| `requesting-code-review` | Scribe | ✅ installed |
| `github-code-review` | Scribe | ✅ installed |
| `machine-access` | Echo | ✅ installed |
| `github-pr-workflow` | Echo | ✅ installed |
| `xlsx` | Ledger | ✅ installed |
| `financial-news` | Ledger | ✅ installed |
| `sketch` | Muse | ✅ installed |
| `claude-design` | Muse, Atlas | ✅ installed |
| `hermes-cli-integration` | Relay | ✅ installed |
| `hermes-subprocess-gateway` | Relay | ✅ installed |
| `excalidraw` (diagrams) | Nova | ✅ installed |
| `architecture-diagram` | Nova, Echo | ✅ installed |

**All required skills are already installed.** No additional installs needed for v1.

---

## 7. Working Agreement

- **AI agents** produce code via PRs; **Scribe** reviews every PR before merge.
- **Maya** is the final approver on product decisions.
- **Hermes** orchestrates parallel agent runs via `delegate_task`.
- Each agent works from the **ToR** + **BRD** — no guessing.
- **TDD** enforced: tests before code for all core services.
- Weekly sync: AI members report progress; Hermes compiles into a status doc.

---

## 8. Communication Channels

| Purpose | Channel |
|---|---|
| Task delegation | Hermes `delegate_task` (parallel agents) |
| PR review | GitHub (Scribe via `github-code-review`) |
| Status updates | Telegram (Hermes delivers) |
| Docs | Local repo `docs/` (this folder) |
| Planning | `weekly-review-planning` skill by Hermes |