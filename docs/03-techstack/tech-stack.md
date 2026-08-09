# 🧱 Technical Stack

## MAYA (Manage All Your Assets) — Enterprise-Grade B2B SaaS

**Version:** 2.0
**Status:** Draft
**Date:** 2026-08-09

---

## 1. Stack Summary

MAYA is an **enterprise-grade, B2B-SaaS-scalable** family transparency platform. It's built for multi-tenant scale, top-tier security (OWASP-aligned), premium animation, and flexible AI with **custom provider support**.

| Layer | Primary | Why |
|---|---|---|
| **Frontend** | React + Vite + TypeScript | Fast, componentized, huge ecosystem |
| **Animation** | **Framer Motion** | Premium, smooth transitions (mobbin-caliber UX) |
| **Mobile** | React Native (Expo) | One codebase iOS/Android/web |
| **Backend** | Node.js + NestJS | TypeScript parity, modular, enterprise-grade |
| **Database** | **Supabase (PostgreSQL)** | Managed Postgres, RLS, Auth, Realtime, Storage |
| **ORM** | Prisma / Drizzle | Type-safe models, migrations |
| **AI/ML** | **Custom provider support** (OpenAI-compatible) + OCR | Extraction, categorization, summaries |
| **Cache/Queue** | Redis + BullMQ | Reminders, jobs, rate limiting |
| **Notifications** | **Firebase (FCM)** + Telegram/WhatsApp | Push + family messaging |
| **File Storage** | Supabase Storage (S3-compatible) | Receipts, photos |
| **Auth** | Supabase Auth (JWT) + OTP | Managed, secure, family invites |
| **Realtime** | Supabase Realtime / WebSocket | Live family sync |
| **Deploy** | Docker + CI/CD | Reproducible, scalable |

---

## 2. Frontend

**Web (PWA):**
- **Framework:** React 18 + Vite 6 + TypeScript
- **Animation:** **Framer Motion** — page transitions, micro-interactions, dashboard animations, list reorder, shared layouts. Premium feel matching mobbin.com.
- **Styling:** Tailwind CSS
- **State:** TanStack Query + Zustand
- **Routing:** React Router (with Framer Motion route transitions)
- **Charts:** Recharts / ECharts (Sankey)
- **Calendar:** FullCalendar / react-big-calendar
- **Forms:** React Hook Form + Zod
- **UI kit:** shadcn/ui (Radix primitives)

**Mobile (React Native / Expo):**
- **Expo** + Expo Router
- **Reanimated + Gesture Handler** (smooth, Framer-Motion-caliber feel)
- **Framer Motion for React Native** (motion) for shared design language
- **Offline-first:** expo-sqlite local cache + sync
- **Camera:** expo-camera (receipt/inventory)
- **Notifications:** **Firebase Cloud Messaging (FCM)** via expo-notifications
- **Deep links + share sheet**

**Shared:** monorepo `packages/shared` with Zod schemas + TS types.

---

## 3. Notifications — Firebase

**Primary push:** **Firebase Cloud Messaging (FCM)**
- Push notifications to iOS (APNs via FCM) + Android (FCM).
- Powered by **Supabase Edge Functions** or backend service sending via FCM HTTP v1 API.
- **Use cases:** bill due, subscription renewing, warranty expiry, goal reached, family NUDGE.

**Channels:**
| Channel | Tech | Use |
|---|---|---|
| **Push** | **Firebase FCM** | Mobile reminders (primary) |
| **In-app** | Realtime + toast | App notifications |
| **Telegram** | Telegram Bot API | Family messaging (user's preferred) |
| **WhatsApp** | WhatsApp Business API (later) | Global reach |

**Delivery:** Reminder service (BullMQ) → route per recipient → FCM SDK → dedupe + retry.

---

## 4. Database — Supabase

**Supabase = managed PostgreSQL** with built-in Auth, Realtime, Storage, and RLS — perfect for enterprise-grade multi-tenant scale.

**Why Supabase:**
- **Postgres RLS** — row-level security per family + role (enforced at DB, not just app).
- **Supabase Auth** — JWT, OTP, email/phone verification, third-party providers.
- **Supabase Realtime** — live family sync via WebSocket/Postgres changes.
- **Supabase Storage** — S3-compatible object storage for receipts/photos.
- **Edge Functions** — serverless for notifications, webhooks, light AI calls.
- **Backups + scaling** — managed, enterprise reliability.

**Schema:** as defined in ToR §3 (families, members, goals, transactions, inventory_items, recurring_items, reminders, receipts, attachments, otp_codes) — all keyed by `family_id` with RLS.

**Postgres features:** RLS, JSONB, citext, pgcrypto (UUID), extensions.

**ORM:** Prisma (or Drizzle) — schema-first, migrations in CI.

---

## 5. AI / ML — Custom Provider Support

**Key requirement:** AI layer must support **custom providers** (any OpenAI-compatible endpoint), not be locked to one vendor.

**Provider architecture:**
- **Provider abstraction** — a configurable AI client that accepts any OpenAI-compatible `base_url` + `api_key` + `model`.
- **Multi-provider fallback** — if one provider fails/rate-limits, fall to the next (via provided chain).
- **Per-task provider/model config** (vision, extraction, summary, categorization) — each can point to a different provider/model.
- **Tiered cost** — cheap model for OCR/vision, premium for complex summaries.

**Supported modes (all OpenAI-compatible):**
- Default managed provider (e.g. shiteru, surplus).
- **Custom provider** — user/tenant brings their own OpenAI-compatible endpoint + key.
- Provider + model configurable per task via env/config.

**AI capabilities:**
1. **Receipt/invoice extraction** — structured JSON from PDF/image (OCR + LLM).
2. **Photo → inventory suggestion** — identify + value estimate.
3. **Smart categorization** — learns from corrections.
4. **Recurring detection** — find subscriptions from history.
5. **Family weekly/monthly summaries** — plain-language insights.
6. **Goal prediction** — project progress from real spending.

**Safety:** extracted data is **always user-reviewed** before writing to money/inventory. Never silent AI writes.

**Eval:** golden-set of receipts; track field-extraction F1 + categorization accuracy.

---

## 6. Security — OWASP Standard

### 6.1 OWASP Top 10 (2021) Mitigations
| # | Risk | Mitigation in MAYA |
|---|---|---|
| A01 | Broken Access Control | **Postgres RLS** per family + role; server-enforced lens filtering; object-level checks |
| A02 | Cryptographic Failures | Secrets in env (never repo); TLS 1.2+; AES-256 at rest; argon2 password hashing; data encrypted in transit & storage |
| A03 | Injection (SQL/XSS) | Parameterized queries (Prisma); input validation (Zod); output encoding; CSP headers |
| A04 | Insecure Design | Threat modeling; least-privilege; fail-closed auth; audit trail |
| A05 | Security Misconfiguration | Hardened defaults; secure headers; no default creds; error handling that leaks nothing |
| A06 | Vulnerable Components | SAST/DAST in CI; dependency scanning (Dependabot/Snyk); patch policy |
| A07 | Auth Failures | MFA support; OTP for family join; rate-limited auth; secure session mgmt |
| A08 | Software/Data Integrity | Signed releases; checksums; CI provenance; reject modified uploads |
| A09 | Logging & Monitoring | Centralized logs (pino/Supabase); audit log of money/inventory mutations; alerts |
| A10 | SSRF | Validate/allowlist outbound URLs in AI/scan services; no user-controlled redirects |

### 6.2 Additional Security Controls
- **AuthN:** Supabase Auth (JWT short-lived + refresh), OTP (argon2-hashed), optional MFA.
- **AuthZ:** RBAC (parent/teen/child) + family-scoped RLS.
- **Lens filtering:** child lens applied **server-side** (never trust client).
- **Rate limiting:** Redis-based (OTP, login, uploads).
- **File security:** MIME/type validation, size caps, malware scan, private storage buckets.
- **API security:** JWT validation, rate limits, CORS allowlist, CSRF protection.
- **Compliance:** Indonesia PDP Law (UU 27/2022), GDPR-aligned for minors.
- **Audit trail:** immutable log of who/when/what for all money/inventory mutations.
- **Pen testing:** scheduled OWASP-aligned security review + pen test.

---

## 7. Backend

**Framework:** Node.js + TypeScript + **NestJS**
- Modular structure (DI, guards, interceptors) — enterprise-grade.
- **WebSocket / Supabase Realtime:** live family updates.
- **Validation:** Zod (shared with frontend).
- **Auth:** Supabase Auth (JWT) + custom guards + RBAC.
- **Queue & Jobs:** Redis + BullMQ (reminders, scan processing, recurring detection).
- **File Upload:** Supabase Storage (S3-compatible) via SDK.

---

## 8. Infrastructure & DevOps

**Containerization:** Docker (multi-stage builds).
**CI/CD:** GitHub Actions — lint, typecheck, test, build, deploy.
**Environments:** dev → staging → prod.
**Hosting:**
- **Supabase** (DB/Auth/Storage/Realtime/Edge Functions) — managed.
- **App hosting:** Vercel/Railway/Fly.io for web+API (or self-host via Docker + Tailscale first).
- **Firebase** (FCM) for notifications.
- **AI:** custom provider endpoints (managed + BYO-tenant).

**Monitoring:** structured logs (pino), Sentry, health checks, metrics.

---

## 9. Enterprise / B2B SaaS Scalability

- **Multi-tenant:** every table `family_id` scoped + RLS; tenant isolation guaranteed.
- **Tenant model:** per-household (B2C) → per-organization (B2B) with orgs + family groups.
- **Billing/plans:** usage-based tiers (free / family / enterprise) — Stripe-ready.
- **Admin console:** org management, member roles, policy controls.
- **Compliance:** SOC2-ready posture, PDP Law, audit logs.
- **API:** versioned REST (`/api/v1`) + webhooks for enterprise integrations.
- **SSO:** future SAML/OIDC for B2B orgs.

---

## 10. Monorepo Structure

```
maya-transparency-hub/
├── apps/
│   ├── web/          # React PWA (Framer Motion)
│   ├── mobile/       # React Native (Expo)
│   ├── api/          # NestJS backend
│   └── landing/      # Marketing site (mobbin-caliber)
├── packages/
│   ├── shared/       # Zod schemas, TS types
│   ├── catalog/      # subscription/bill catalog (JSON)
│   ├── ai/           # AI provider abstraction (custom providers)
│   └── ui/           # shared design system (Framer Motion components)
├── infra/
│   ├── docker-compose.yml
│   ├── supabase/     # migrations, RLS policies, edge functions
│   └── deploy/
├── security/         # OWASP checklist, threat model, pen-test reports
├── docs/
└── CI/ (GitHub Actions)
```

---

## 11. Key Libraries

| Concern | Library |
|---|---|
| Animation | **Framer Motion** |
| Web framework | React, Vite, React Router |
| Styling | Tailwind CSS, shadcn/ui |
| Forms | React Hook Form, Zod |
| Charts | Recharts, ECharts (Sankey) |
| Calendar | FullCalendar |
| Mobile | Expo, Expo Router, Reanimated, Framer Motion RN |
| Backend | NestJS |
| DB/Auth/Realtime | **Supabase** |
| Notifications | **Firebase FCM** |
| Cache/Queue | Redis, BullMQ |
| AI | OpenAI-compatible client (custom providers) |
| File upload | Supabase Storage |
| Test | Vitest, Playwright, Supertest |
| Security | OWASP ZAP (DAST), Snyk, eslint-security |