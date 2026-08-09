# 🛠️ Terms of Reference & Technical Requirements (ToR)

## MAYA (Manage All Your Assets) — Technical Specification

**Version:** 2.0
**Status:** Draft
**Date:** 2026-08-09

---

## 1. System Overview

MAYA is a multi-tenant, family-centric web + mobile application built enterprise-grade for B2B SaaS scalability. It provides a transparent household finance and inventory platform with AI-assisted receipt scanning (custom AI providers), a curated subscription/bill catalog, shared goals, and coordinated reminders (Firebase push).

This document defines the technical architecture, data model, API contracts, and detailed process flows.

---

## 2. Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Clients                               │
│   [Mobile App]  [Web App]  [PWA]  [Telegram/WhatsApp]   │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS / WebSocket
┌──────────────────────────▼──────────────────────────────┐
│                    API Gateway                           │
│              (REST + WebSocket, AuthN/AuthZ)             │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                    Application Layer                     │
│  ┌──────────┬──────────┬──────────┬──────────────────┐   │
│  │ Family   │ Inventory │ Finance  │ Reminder/Notify │   │
│  │ Service  │ Service  │ Service  │ Service         │   │
│  └──────────┴──────────┴──────────┴──────────────────┘   │
│  ┌────────────────────────────────────────────────┐      │
│  │        AI Service (custom provider aware)     │      │
│  └────────────────────────────────────────────────┘      │
└──────────┬──────────────────────────────┬────────────────┘
           │                              │
┌──────────▼──────────┐       ┌───────────▼──────────────┐
│  Supabase           │       │  Firebase Cloud Messaging│
│  (Postgres RLU,     │       │  (push notifications)    │
│   Auth, Realtime,   │       └──────────────────────────┘
│   Storage, Edge Fn) │
└─────────────────────┘
```

### 2.2 Design Principles
- **Transparent-by-default** — shared data model; lens filtering at read time.
- **Tenant isolation** — every table keyed by `family_id`; strict row-level security.
- **One-entry-many-pillars** — purchase log cascades to inventory + budget.
- **Mobile-first** — API designed for low-latency mobile UX.
- **AI-augmented, human-reviewed** — AI proposes, user confirms (never silent writes to money data).

---

## 3. Core Data Model

### 3.1 Entity Relationship Overview

```
Family 1───* Member
Family 1───* Goal
Family 1───* Transaction
Family 1───* InventoryItem
Family 1───* RecurringItem
Family 1───* Reminder
Member 1───* Transaction
Member 1───* GoalContribution
Transaction 1───0..1 InventoryItem   (Buy→Have link)
Transaction 1───0..1 RecurringItem    (detected recurring)
Transaction 1───0..1 Receipt          (uploaded file)
```

### 3.2 Table Definitions

#### `families`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| name | text | |
| currency | text | default `IDR` |
| avatar_url | text | nullable |
| created_at | timestamptz | |
| settings | jsonb | lens defaults, notification prefs |

#### `members`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| family_id | UUID FK | tenant |
| role | enum | `parent` / `teen` / `child` |
| lens | enum | `full` / `learning` |
| name | text | |
| email | text | nullable (invite/OTP) |
| phone | text | nullable (invite/OTP) |
| is_owner | boolean | family creator/admin |
| status | enum | `invited` / `verified` / `active` / `removed` |
| created_at | timestamptz | |

#### `otp_codes`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| member_id | UUID FK | |
| code | text | hashed |
| channel | enum | `email` / `phone` |
| expires_at | timestamptz | 5–10 min |
| attempts | int | ≤3 |
| consumed | boolean | |

#### `goals` (Want)
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| family_id | UUID FK | |
| name | text | |
| target_amount | numeric | |
| target_date | date | |
| category | text | |
| current_amount | numeric | |
| created_by | UUID FK member | |
| created_at | timestamptz | |

#### `goal_contributions`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| goal_id | UUID FK | |
| member_id | UUID FK | |
| amount | numeric | |
| note | text | |
| created_at | timestamptz | |

#### `transactions` (Spend / Buy)
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| family_id | UUID FK | |
| member_id | UUID FK | who logged it |
| type | enum | `expense` / `income` / `refund` / `transfer` |
| amount | numeric | |
| currency | text | |
| amount_original | numeric | pre-conversion |
| currency_original | text | |
| date | date | |
| category | text | |
| vendor | text | |
| merchant_group | text | e.g. `GitHub` |
| is_recurring | boolean | |
| linked_inventory_id | UUID FK | nullable (Buy→Have) |
| linked_recurring_id | UUID FK | nullable |
| note | text | |
| created_at | timestamptz | |

#### `inventory_items` (Have)
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| family_id | UUID FK | |
| name | text | |
| category | text | |
| room | text | nullable |
| value | numeric | |
| purchase_date | date | |
| purchase_price | numeric | |
| warranty_expiry | date | nullable |
| serial_number | text | nullable |
| photo_url | text | nullable |
| source_transaction_id | UUID FK | nullable (auto-link) |
| status | enum | `active` / `sold` / `discarded` |
| created_at | timestamptz | |

#### `recurring_items` (Leak — subscriptions & bills)
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| family_id | UUID FK | |
| name | text | |
| provider_key | text | catalog key (e.g. `netflix`) |
| category | enum | `subscription` / `bill` / `insurance` |
| amount | numeric | (editable) |
| currency | text | |
| cycle | enum | `monthly` / `quarterly` / `yearly` |
| billing_day | int | day of cycle |
| next_due | date | |
| is_active | boolean | |
| logo_url | text | from catalog |
| source | enum | `catalog` / `scan` / `manual` / `detected` |
| created_at | timestamptz | |

#### `reminders`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| family_id | UUID FK | |
| entity_type | enum | `recurring` / `inventory` / `goal` / `custom` |
| entity_id | UUID FK | |
| due_at | timestamptz | |
| recipients | UUID[] | member ids to notify |
| channel | enum[] | `push` / `telegram` / `whatsapp` |
| repeat | jsonb | recurrence rule |
| sent_at | timestamptz | nullable |
| created_at | timestamptz | |

#### `receipts`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| family_id | UUID FK | |
| transaction_id | UUID FK | |
| file_url | text | object storage |
| file_type | enum | `pdf` / `image` |
| extracted_data | jsonb | raw AI extraction |
| status | enum | `pending` / `reviewed` / `confirmed` |
| created_at | timestamptz | |

#### `attachment_files`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| family_id | UUID FK | |
| owner_type | enum | `receipt` / `inventory` / `goal` |
| owner_id | UUID FK | |
| url | text | object storage |
| created_at | timestamptz | |

---

## 4. Process Flows (Detailed)

### 4.1 Family Onboarding & Invite (OTP)

```
[Owner]                          [System]                    [Invited Member]
   │  Create Family               │                             │
   │─────────────────────────────>│                             │
   │  Add Member (email/phone)    │                             │
   │─────────────────────────────>│  Generate OTP (hash)        │
   │                              │  Send OTP via channel        │
   │                              │─────────────────────────────>│
   │                              │                             │  Enter OTP
   │                              │<────────────────────────────│
   │                              │  Verify + set role/lens      │
   │<─────────────────────────────│  member → active             │
```

### 4.2 Upload → Scan → Preview → Review → Confirm (SIGNATURE FLOW)

```
[User]           [Upload/Scan Service]        [AI/LLM]        [DB]
   │  Upload file │                              │              │
   │─────────────>│  Store file → queue          │              │
   │              │─────────────────────────────>│ OCR + extract │
   │              │                                                     
   │              │  Extract: vendor, date, items, subtotal, tax,      │
   │              │  total, category, currency, negative items (refund)│
   │              │  Merchant grouping, currency conversion             │
   │              │<─────────────────────────────│              │
   │  Preview (editable form pre-filled)         │              │
   │<─────────────│                              │              │
   │  User edits → Confirm                       │              │
   │─────────────>│  Write Transaction            │─────────────>│
   │              │  Auto-link Buy→Inventory      │              │
   │              │  Detect recurring → RecurringItem             │
   │              │  Attach receipt file                           │
```

**Cascade rules on Confirm:**
1. Create `Transaction` (Spend).
2. If line items are physical goods → create `InventoryItem(s)` (Have) linked via `source_transaction_id`.
3. If vendor matches recurring pattern → create/update `RecurringItem` (Leak) or link.
4. Attach original file to `Receipt`.
5. Trigger budget update + optional reminder.

### 4.3 Add Subscription via Catalog

```
[User] → Search catalog → select service → pre-fill name/category/logo/default price
       → user edits amount + billing day + frequency → confirm
       → create RecurringItem → schedule calendar entry → set reminder recipients
```

### 4.4 Recurring Detection (from history)

```
[System] → scan past transactions per vendor
        → group by merchant_group + amount periodicity
        → propose RecurringItem
        → [User confirms] → create recurring + calendar + reminder
```

### 4.5 Reminder Dispatch

```
[Reminder Service] → cron (daily)
                  → find due reminders (due_at <= now+window)
                  → route to recipients' channels (push/Telegram/WhatsApp)
                  → mark sent_at
```

---

## 5. API Design (REST)

Base path: `/api/v1`

### Auth
| Method | Path | Description |
|---|---|---|
| POST | `/auth/otp/request` | Request OTP (email/phone) |
| POST | `/auth/otp/verify` | Verify OTP, issue JWT |
| POST | `/auth/refresh` | Refresh access token |

### Family
| Method | Path | Description |
|---|---|---|
| POST | `/families` | Create family |
| GET | `/families/{id}` | Get family |
| POST | `/families/{id}/members` | Invite member |
| GET | `/families/{id}/members` | List members |
| PATCH | `/members/{id}` | Update role/lens/status |
| DELETE | `/members/{id}` | Remove member |

### Goals (Want)
| Method | Path | Description |
|---|---|---|
| GET/POST | `/families/{id}/goals` | List/Create goals |
| GET/PATCH/DELETE | `/goals/{id}` | Read/Update/Delete |
| POST | `/goals/{id}/contributions` | Add contribution |

### Transactions (Spend/Buy)
| Method | Path | Description |
|---|---|---|
| GET/POST | `/families/{id}/transactions` | List/Create |
| PATCH/DELETE | `/transactions/{id}` | Update/Delete |
| POST | `/transactions/{id}/categorize` | AI re-categorize |
| GET | `/families/{id}/transactions/recurring-candidates` | Detection proposals |

### Inventory (Have)
| Method | Path | Description |
|---|---|---|
| GET/POST | `/families/{id}/inventory` | List/Create |
| PATCH/DELETE | `/inventory/{id}` | Update/Delete |
| POST | `/inventory/scan-photo` | AI photo → item suggestion |
| POST | `/inventory/scan-barcode` | Barcode lookup |

### Recurring (Leak)
| Method | Path | Description |
|---|---|---|
| GET/POST | `/families/{id}/recurring` | List/Create |
| PATCH/DELETE | `/recurring/{id}` | Update/Delete |
| GET | `/catalog/subscriptions` | Subscription catalog |
| GET | `/catalog/bills` | Bill catalog |

### Scan / Upload
| Method | Path | Description |
|---|---|---|
| POST | `/scan/upload` | Upload file |
| POST | `/scan/{id}/extract` | AI extract fields |
| POST | `/scan/{id}/confirm` | Confirm → cascade writes |

### Reminders
| Method | Path | Description |
|---|---|---|
| GET/POST | `/families/{id}/reminders` | List/Create |
| PATCH/DELETE | `/reminders/{id}` | Update/Delete |
| GET | `/families/{id}/calendar` | Calendar of due dates |

### Dashboard
| Method | Path | Description |
|---|---|---|
| GET | `/families/{id}/dashboard` | Net worth, budget, recent, goals |
| GET | `/families/{id}/reports/sankey` | Sankey cash-flow |

---

## 6. AI Service Contracts

### 6.0 AI Provider Abstraction (Custom Provider Support)
MAYA's AI layer is **provider-agnostic** — any OpenAI-compatible endpoint works. No vendor lock-in.

**Provider config (per task or global):**
```json
{
  "provider": "custom",
  "base_url": "https://api.example.com/v1",
  "api_key": "ENV_VAR_OR_SECRET",
  "model": "vision-model-name",
  "fallbacks": [
    {"provider": "shiteru", "base_url": "https://shiteru.id/v1", "model": "deepseek-v4-pro"},
    {"provider": "surplus", "base_url": "https://api.surplusintelligence.ai/v1/", "model": "deepseek-v4-flash"}
  ]
}
```

**Tasks each with own provider model:** vision/extraction, categorization, summaries, goal prediction, recurring detection. Providers + models tiered by cost and configurable per task.

### 6.1 Receipt/Invoice Extraction
Input: image PDF/file bytes.
Output JSON:
```json
{
  "vendor": "GitHub, Inc.",
  "merchant_group": "GitHub",
  "date": "2026-08-05",
  "currency": "USD",
  "line_items": [
    {"description": "GitHub Copilot Usage", "amount": 1.00, "type": "expense"},
    {"description": "GitHub Pro - month", "amount": 4.00, "type": "expense"},
    {"description": "GitHub Fixed Discount", "amount": -4.00, "type": "refund"}
  ],
  "subtotal": 5.00,
  "tax": 0.00,
  "total": 1.00,
  "total_idr": 89300,
  "category": "subscription"
}
```

### 6.2 Photo → Inventory Suggestion
Input: image.
Output: `{"name": "Espresso Machine", "category": "appliance", "estimated_value": 5000000, "confidence": 0.87}`

### 6.3 Smart Categorization
Input: vendor + amount + history.
Output: `{"category": "groceries", "confidence": 0.94, "is_recurring": false}`

---

## 7. Security & Compliance (OWASP Standard)

MAYA follows the **OWASP Top 10 (2021)** and secure-by-design principles.

- **AuthN:** Supabase Auth (JWT short-lived + refresh), OTP for family joins, optional MFA.
- **AuthZ:** role-based (parent/teen/child) + family-scoped **Postgres RLS** (enforced at DB, not just app).
- **Lens filtering:** child lens applied **server-side** — never trust client.
- **Broken access control:** RLS + object-level checks (A01).
- **Cryptographic failures:** AES-256 at rest, TLS 1.2+, argon2 hashing, secrets in env (A02).
- **Injection:** parameterized queries (Prisma), Zod validation, CSP, output encoding (A03).
- **Insecure design:** threat modeling, least-privilege, fail-closed, audit trail (A04).
- **Misconfiguration:** hardened defaults, secure headers, no default creds (A05).
- **Vulnerable components:** SAST/DAST in CI, Snyk/Dependabot, patch policy (A06).
- **Auth failures:** rate-limited OTP, secure session mgmt, MFA (A07).
- **Integrity:** signed releases, CI provenance, reject modified uploads (A08).
- **Logging/monitoring:** centralized logs, audit of money/inventory mutations, alerts (A09).
- **SSRF:** validate/allowlist outbound URLs in AI/scan services (A10).
- **File handling:** validated MIME, size caps, malware scan, private storage buckets.
- **Compliance:** Indonesia PDP Law (UU No. 27/2022), GDPR-aligned for minors.
- **Audit trail:** immutable log of all money/inventory mutations.
- **Pen testing:** scheduled OWASP-aligned security review.

---

## 8. Testing Strategy

- **Unit:** services, extraction models, cascade logic.
- **Integration:** API contracts, RLS, OTP flow.
- **E2E:** upload→scan→confirm→pillars cascade; catalog add; reminder dispatch.
- **AI accuracy:** golden-set of receipts; measure field extraction F1.
- **Load:** multi-tenant scaling, real-time sync.
- **Security:** OWASP, penetration test, PDP compliance review.

---

## 9. Future Extensions (Non-v1)

- Open-banking / bank account sync (Plaid/ID fintech).
- Investment portfolio module.
- Extended family / multiple households.
- Payments & transfers between members.
- Push notifications native (APNs/FCM), WhatsApp Business API integration.