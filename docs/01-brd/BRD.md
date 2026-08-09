# 📘 Business Requirements Document (BRD)

## MAYA — Manage All Your Assets (Family Transparency Hub)

**Document Owner:** Product (Maya / Ama)
**Version:** 2.0
**Status:** Draft
**Date:** 2026-08-09
**Classification:** Internal

---

## 1. Executive Summary

**MAYA** (Manage All Your Assets) is a family transparency platform that unifies **family finance, home inventory, shared goals, and coordinated reminders** into a single, transparent space — built enterprise-grade and B2B-SaaS-scalable. Its core belief: a family that *sees* each other's money and belongings *together* makes better decisions — with no secrets and no nagging.

The product targets a clear market gap: existing apps solve *one* slice (money OR inventory OR couples), but **no viral product combines money + stuff + multi-generational family sharing + reminders** in one transparent hub. It is engineered to scale from individual households to organizations (B2B SaaS), with agentic AI capabilities on par with (and beyond) Monarch.

**The single hook:** *"Everyone knows what the family wants, spends, buys, has, and leaks."*

---

## 2. Problem Statement

Families today face five disconnected problems:

1. **Money blindness** — spending is fragmented across bank apps, e-wallets, and cash; nobody sees the full picture.
2. **Subscription bleed ("leak")** — forgotten recurring charges drain budgets silently.
3. **Zero asset visibility** — families have no record of what they own, its value, or its warranties (under-insured, lost claims).
4. **Coordination friction** — bills, renewals, and due dates are remembered by one person and forgotten by others ("nagging").
5. **No financial literacy pipeline** — kids grow up learning nothing about real family money.

No single tool solves all five. MAYA does.

---

## 3. Product Vision

> **A family that sees everything together, manages everything together.**

MAYA is the **single source of truth** for a household's money and belongings, where every member (parents and kids) shares one transparent view, coordinates on goals, and never misses a bill or renewal.

---

## 4. Target Audience

**Primary:** Households with 2+ adult members (spouses) and optional children — the family unit living in one home.

**Secondary users:**
- Parents (owner/admin) — manage, invite, approve
- Children/teens — learning view, contribute goals
- Extended family (future) — grandparents, relatives

**Geographic start:** Indonesia (IDR-first, local subscriptions/bills catalog), designed global-ready.

---

## 5. Core Value Proposition ("The 5 Pillars")

Every member can see, in one transparent space:

| # | Pillar | Meaning | Example |
|---|--------|---------|---------|
| 1 | **Want** | Family goals & wishlists | Vacation fund, new fridge, education |
| 2 | **Spend** | All expenses, transparent | This month's spending by category |
| 3 | **Buy** | Purchases logged | What we bought, from groceries to appliances |
| 4 | **Have** | Home inventory & assets | What we own, value, warranty |
| 5 | **Leak** | Subscriptions & waste | Money bleeding out monthly |

**The killer feature:** when a member logs a purchase (**Buy**), it *automatically creates* the inventory record (**Have**) and deducts from budget (**Spend**). One action feeds three pillars. No double-entry.

---

## 6. Key Differentiators (vs. Market)

| Capability | Monarch Money | Sortly | **MAYA** |
|-----------|:---:|:---:|:---:|
| Family finance (budget, net worth) | ✅ | ❌ | ✅ |
| Home inventory ("Have") | ❌ | ✅ | ✅ |
| Purchase → inventory auto-link | ❌ | ❌ | ✅ |
| Subscriptions & bills ("Leak") | ✅ | ❌ | ✅ |
| Multi-generational family (kids) | ❌ (couples) | ❌ | ✅ |
| OTP email/phone family invites | ❌ | ❌ | ✅ |
| Transparent-by-default sharing | ❌ (private) | ❌ | ✅ |
| Upload → scan → all pillars | ❌ | ❌ | ✅ |
| Calendar of recurring due dates | Partial | ❌ | ✅ |
| **Agentic AI (custom providers)** | Partial | ❌ | ✅ |
| **B2B / enterprise scalability** | ❌ | ❌ | ✅ |

**Moat:** No competitor combines *money + stuff + family* with transparency-by-default, agentic AI, and enterprise-grade B2B scalability.

---

## 7. Feature Requirements

### 7.1 Family & Membership

**FR-1.1** Family space creation — owner (parent) creates family, sets name, currency, avatar.
**FR-1.2** Invite by email OR phone number → sends **OTP** (6-digit, 5–10 min expiry, resendable, ≤3 attempts).
**FR-1.3** Role assignment at invite: **Parent / Teen / Child**.
**FR-1.4** Member lens: **Full transparency** (default) or **Learning view** (child-level framing) — parent decides per child.
**FR-1.5** One family per member (extended family configurable later).
**FR-1.6** Owner can remove/re-invite members.

### 7.2 Pillar 1 — Want (Goals)

**FR-2.1** Create goal (name, target amount, target date, category). \
**FR-2.2** All members see & contribute to goals. \
**FR-2.3** Progress tracking (bar + %). \
**FR-2.4** Predictive insight: adjusts projection based on real spending (Monarch-style).

### 7.3 Pillar 2 & 3 — Spend & Buy (Transactions)

**FR-3.1** Log transaction: amount, date, category, vendor, member, attachment.
**FR-3.2** **AI auto-categorization** of transactions (learns from corrections).
**FR-3.3** Purchase items auto-link to Inventory (Buy → Have).
**FR-3.4** Smart rules: auto-reassign, split, flag unusual, ignore transfers.
**FR-3.5** Budget feedback: overspending alerts, category volatility, month-over-month.
**FR-3.6** Currency: IDR-first, multi-currency with conversion.

### 7.4 Pillar 4 — Have (Home Inventory)

**FR-4.1** Add inventory item: name, category, room/location, value, purchase date, warranty expiry, photo, serial number.
**FR-4.2** AI photo recognition: snap item → auto-identify + value estimate.
**FR-4.3** Warranty/expiry tracking with reminders.
**FR-4.4** Barcode scanning for quick entry.
**FR-4.5** Total household asset value (feeds net worth).

### 7.5 Pillar 5 — Leak (Subscriptions & Bills)

**FR-5.1** **Subscription catalog** — curated global + Indonesian services with logos & current local prices (editable).
**FR-5.2** **Bill catalog** — PLN, PDAM, internet, TV, mobile, insurance.
**FR-5.3** Three add methods: **Catalog pick / Upload-scan / Manual**.
**FR-5.4** Recurring detection from transaction history (Monarch-style).
**FR-5.5** All recurring items appear on a **Calendar** with due dates.
**FR-5.6** Reminders before due dates → recipients set per item.

### 7.6 Upload & Scan (The signature flow)

**FR-6.1** Upload invoice/bill: 📷 photo, 📁 PDF, 🖼️ image.
**FR-6.2** AI extracts: vendor, date, line items, subtotal, tax, total, category, currency.
**FR-6.3** Detects refunds/credits (negative line items).
**FR-6.4** Merchant grouping (GitHub + GitHub Copilot → "GitHub").
**FR-6.5** Currency conversion (USD → IDR).
**FR-6.6** **Flow:** Upload → Scan → Preview → Review (edit) → Confirm.
**FR-6.7** One upload feeds multiple pillars (Spend + Have + Recurring).
**FR-6.8** Original file auto-attached as proof.

### 7.7 Dashboard & Reporting

**FR-7.1** Shared household dashboard (all members see same core view).
**FR-7.2** Customizable widgets (net worth, recent transactions, budget, goals).
**FR-7.3** Sankey cash-flow diagram.
**FR-7.4** Monthly/weekly review summaries (AI-generated).
**FR-7.5** Net worth = cash + investments + **home inventory value** − liabilities.

### 7.8 Reminders & Coordination

**FR-8.1** Recurring & one-off reminders.
**FR-8.2** Recipient assignment per reminder (who gets notified).
**FR-8.3** Delivery: in-app push + Telegram/WhatsApp (family preference).
**FR-8.4** Calendar view of all due dates.

---

## 8. Non-Functional Requirements

**NFR-1 Security:** OTP verification, no plaintext secrets, role-based access.
**NFR-2 Privacy:** transparent-by-default, but sensitive fields tiered for child lens.
**NFR-3 Performance:** < 2s page loads, real-time sync for family members.
**NFR-4 Scalability:** designed for multi-tenant (many families), not just one.
**NFR-5 Mobile-first:** primary UX is mobile (family on phones), web secondary.
**NFR-6 Localization:** Indonesian first, then more languages/currencies.
**NFR-7 Compliance:** data privacy (Indonesia PDP Law), age-appropriate handling for minors.

---

## 9. Success Metrics (KPIs)

- **Activation:** % of invited members who join within 48h (target > 60%)
- **Retention:** D30 retention (target > 40%)
- **Engagement:** transactions/subscriptions logged per family per week
- **Leak savings:** avg IDR saved via subscription cancellation
- **Family health:** % of goals achieved, % of bills on-time
- **Virality:** avg family size (members per household), referral rate

---

## 10. Risks & Assumptions

**Assumptions:**
- Families are willing to share finances transparently (validated by user choice).
- Subscription catalog prices can be maintained/updated.
- AI extraction accuracy acceptable with user review step.

**Risks & Mitigations:**
- **Privacy concerns** → transparent-by-default + parent-controlled lens + clear consent.
- **Bank connectivity complexity** → start manual + scan entry; add open-banking (Plaid/ID fintech) later.
- **AI cost** → tiered models (cheap vision for scan, premium for summaries).
- **Adoption friction** → catalog pick + upload-scan minimize manual entry.

---

## 11. B2B SaaS & Enterprise Positioning

### 11.1 Scaling Model
MAYA scales from **individual households (B2C)** to **organizations (B2B SaaS)**:
- **B2C:** families (this product).
- **B2B:** organizations that need transparent asset/inventory + finance management for members/employees — e.g. companies managing home-office assets, asset-rental businesses, family offices, community/co-op management.
- **Tenant model:** `family` → `organization` with orgs + family groups + admin console.

### 11.2 Monetization (B2B SaaS)
- **Free tier:** 1 family, limited members/items.
- **Family plan:** full transparency, unlimited members, all AI features, calendar/reminders.
- **Enterprise plan:** org management, SSO (SAML/OIDC), audit logs, custom AI providers, custom branding, SLA, dedicated support.
- **Usage-based add-ons:** AI scan volume, storage.

### 11.3 Landing Page (mobbin-caliber, enterprise-grade)
A premium, animated marketing site promoting MAYA's **agentic AI capabilities**:
- **Hero:** crisp value prop — "Everyone knows what the family wants, spends, buys, has, and leaks."
- **Animated product demo** (Framer Motion) showing the Upload→Scan→Preview→Confirm flow + dashboard.
- **Pillars showcase:** Want / Spend / Buy / Have / Leak — interactive.
- **Agentic AI section:** demonstrate AI that *learns* the family — categorization, leak-hunting, summaries, goal prediction.
- **Testimonials / social proof**, **pricing**, **security/OWASP badge**, **enterprise section**.
- **CTAs:** "Start free" + "Book enterprise demo."

### 11.4 Why Agentic AI is a Differentiator (parity with Monarch)
- **AI auto-categorization** (Monarch-parity).
- **Upgrade beyond Monarch:** home inventory AI, purchase→asset auto-link, receipt scan feeding all pillars, recurring detection, family summaries, goal prediction.
- **Custom AI providers** — enterprises bring their own model endpoint; no vendor lock-in.

---

## 12. Scope Boundaries

**In scope (v1):** Family/membership, 5 pillars, upload-scan, catalog, calendar, reminders, dashboard, OTP invites.
**Out of scope (v1):** Bank account auto-sync, payments/transfers, third-party marketplace, public social features.
**Later:** Open-banking integration, extended family, multiple households, investment portfolio management.