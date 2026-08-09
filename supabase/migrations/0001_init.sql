-- ============================================================
-- MAYA — Schema + RLS Policies
-- Supabase / PostgreSQL
-- ============================================================

-- Enable required extensions
create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "citext";    -- case-insensitive email/phone

-- ============================================================
-- ENUMS
-- ============================================================
do $$ begin
  create type member_role    as enum ('parent','teen','child');
  exception when duplicate_object then null; end $$;
do $$ begin
  create type member_lens    as enum ('full','learning');
  exception when duplicate_object then null; end $$;
do $$ begin
  create type member_status  as enum ('invited','verified','active','removed');
  exception when duplicate_object then null; end $$;
do $$ begin
  create type tx_type        as enum ('expense','income','refund','transfer');
  exception when duplicate_object then null; end $$;
do $$ begin
  create type recurring_cat  as enum ('subscription','bill','insurance');
  exception when duplicate_object then null; end $$;
do $$ begin
  create type recurring_cycle as enum ('monthly','quarterly','yearly');
  exception when duplicate_object then null; end $$;
do $$ begin
  create type recurring_src  as enum ('catalog','scan','manual','detected');
  exception when duplicate_object then null; end $$;
do $$ begin
  create type inv_status     as enum ('active','sold','discarded');
  exception when duplicate_object then null; end $$;
do $$ begin
  create type reminder_channel as enum ('push','telegram','whatsapp');
  exception when duplicate_object then null; end $$;
do $$ begin
  create type receipt_status as enum ('pending','reviewed','confirmed');
  exception when duplicate_object then null; end $$;
end$$;

-- ============================================================
-- FAMILIES
-- ============================================================
create table if not exists families (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  currency   text not null default 'IDR',
  avatar_url text,
  settings   jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- ============================================================
-- MEMBERS
-- ============================================================
create table if not exists members (
  id         uuid primary key default gen_random_uuid(),
  family_id  uuid not null references families(id) on delete cascade,
  auth_id    uuid references auth.users(id) on delete set null,
  role       member_role not null default 'child',
  lens       member_lens not null default 'full',
  name       text not null,
  email      citext,
  phone      text,
  is_owner   boolean not null default false,
  status     member_status not null default 'invited',
  created_at timestamptz not null default now()
);
create index if not exists idx_members_family on members(family_id);

-- ============================================================
-- OTP CODES
-- ============================================================
create table if not exists otp_codes (
  id         uuid primary key default gen_random_uuid(),
  member_id  uuid not null references members(id) on delete cascade,
  code_hash  text not null,
  channel    text not null default 'email',
  expires_at timestamptz not null,
  attempts   int  not null default 0,
  consumed   boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- GOALS (Want)
-- ============================================================
create table if not exists goals (
  id             uuid primary key default gen_random_uuid(),
  family_id      uuid not null references families(id) on delete cascade,
  name           text not null,
  target_amount  numeric not null check (target_amount > 0),
  target_date    date,
  category       text,
  current_amount numeric not null default 0,
  created_by     uuid references members(id) on delete set null,
  created_at     timestamptz not null default now()
);
create index if not exists idx_goals_family on goals(family_id);

create table if not exists goal_contributions (
  id         uuid primary key default gen_random_uuid(),
  goal_id    uuid not null references goals(id) on delete cascade,
  member_id  uuid references members(id) on delete set null,
  amount     numeric not null check (amount > 0),
  note       text,
  created_at timestamptz not null default now()
);
create index if not exists idx_goalc_goal on goal_contributions(goal_id);

-- ============================================================
-- TRANSACTIONS (Spend / Buy)
-- ============================================================
create table if not exists transactions (
  id                  uuid primary key default gen_random_uuid(),
  family_id           uuid not null references families(id) on delete cascade,
  member_id           uuid references members(id) on delete set null,
  type                tx_type not null default 'expense',
  amount              numeric not null,
  currency            text not null default 'IDR',
  amount_original     numeric,
  currency_original   text,
  date                date not null default current_date,
  category            text not null default 'other',
  vendor              text not null default '',
  merchant_group      text,
  is_recurring        boolean not null default false,
  linked_inventory_id uuid,
  linked_recurring_id uuid,
  note                text,
  created_at          timestamptz not null default now()
);
create index if not exists idx_tx_family on transactions(family_id);
create index if not exists idx_tx_date on transactions(date);

-- ============================================================
-- INVENTORY (Have)
-- ============================================================
create table if not exists inventory_items (
  id                   uuid primary key default gen_random_uuid(),
  family_id            uuid not null references families(id) on delete cascade,
  name                 text not null,
  category             text not null default 'other',
  room                 text,
  value                numeric not null default 0,
  purchase_date        date,
  purchase_price       numeric,
  warranty_expiry      date,
  serial_number        text,
  photo_url            text,
  source_transaction_id uuid references transactions(id) on delete set null,
  status               inv_status not null default 'active',
  created_at           timestamptz not null default now()
);
create index if not exists idx_inv_family on inventory_items(family_id);

-- ============================================================
-- RECURRING (Leak — subscriptions & bills)
-- ============================================================
create table if not exists recurring_items (
  id           uuid primary key default gen_random_uuid(),
  family_id    uuid not null references families(id) on delete cascade,
  name         text not null,
  provider_key text,
  category     recurring_cat not null default 'subscription',
  amount       numeric not null default 0,
  currency     text not null default 'IDR',
  cycle        recurring_cycle not null default 'monthly',
  billing_day  int not null default 1 check (billing_day between 1 and 31),
  next_due     date not null default current_date,
  is_active    boolean not null default true,
  logo_url     text,
  source       recurring_src not null default 'manual',
  created_at   timestamptz not null default now()
);
create index if not exists idx_rec_family on recurring_items(family_id);

-- ============================================================
-- REMINDERS
-- ============================================================
create table if not exists reminders (
  id         uuid primary key default gen_random_uuid(),
  family_id  uuid not null references families(id) on delete cascade,
  entity_type text not null default 'custom',
  entity_id  uuid,
  due_at     timestamptz not null,
  recipients uuid[] not null default '{}',
  channels   reminder_channel[] not null default '{push}',
  repeat     jsonb,
  sent_at    timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_rem_due on reminders(due_at);

-- ============================================================
-- RECEIPTS
-- ============================================================
create table if not exists receipts (
  id              uuid primary key default gen_random_uuid(),
  family_id       uuid not null references families(id) on delete cascade,
  transaction_id  uuid references transactions(id) on delete set null,
  file_url        text not null,
  file_type       text not null default 'image',
  extracted_data  jsonb,
  status          receipt_status not null default 'pending',
  created_at      timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (OWASP A01 — Broken Access Control)
-- ============================================================
alter table families          enable row level security;
alter table members           enable row level security;
alter table otp_codes         enable row level security;
alter table goals             enable row level security;
alter table goal_contributions enable row level security;
alter table transactions      enable row level security;
alter table inventory_items   enable row level security;
alter table recurring_items   enable row level security;
alter table reminders         enable row level security;
alter table receipts          enable row level security;

-- Helper: current member's family id (from JWT claims)
create or replace function current_family_id()
returns uuid language sql stable as $$
  select coalesce(
    (auth.jwt() ->> 'family_id')::uuid,
    (select family_id from members where auth_id = auth.uid() limit 1)
  );
$$;

-- Helper: current member role
create or replace function current_member_role()
returns member_role language sql stable as $$
  select role from members where auth_id = auth.uid() limit 1;
$$;

-- ============================================================
-- RLS POLICIES — families
-- Owner / verified members of the family can read; owner can update.
-- ============================================================
drop policy if exists family_select on families;
create policy family_select on families
  for select using (id = current_family_id());

drop policy if exists family_update on families;
create policy family_update on families
  for update using (
    exists (select 1 from members
            where family_id = families.id and auth_id = auth.uid() and is_owner)
  );

-- ============================================================
-- RLS POLICIES — members
-- ============================================================
drop policy if exists member_select on members;
create policy member_select on members
  for select using (family_id = current_family_id());

drop policy if exists member_insert on members;
create policy member_insert on members
  for insert with check (
    family_id = current_family_id()
    and exists (select 1 from members
                where family_id = members.family_id and auth_id = auth.uid() and is_owner)
  );

drop policy if exists member_update on members;
create policy member_update on members
  for update using (
    family_id = current_family_id()
    and (
      -- owner can update anyone in family
      exists (select 1 from members
              where family_id = members.family_id and auth_id = auth.uid() and is_owner)
      -- member can update themselves
      or auth_id = auth.uid()
    )
  );

-- ============================================================
-- RLS POLICIES — goals, transactions, inventory, recurring, reminders
-- Family-scoped read/write for all verified members.
-- ============================================================
drop policy if exists goals_select on goals;
create policy goals_select on goals for select using (family_id = current_family_id());
drop policy if exists goals_insert on goals;
create policy goals_insert on goals for insert with check (family_id = current_family_id());
drop policy if exists goals_update on goals;
create policy goals_update on goals for update using (family_id = current_family_id());
drop policy if exists goals_delete on goals;
create policy goals_delete on goals for delete using (family_id = current_family_id());

drop policy if exists goalc_select on goal_contributions;
create policy goalc_select on goal_contributions for select using (
  goal_id in (select id from goals where family_id = current_family_id())
);
drop policy if exists goalc_insert on goal_contributions;
create policy goalc_insert on goal_contributions for insert with check (
  goal_id in (select id from goals where family_id = current_family_id())
);

drop policy if exists tx_select on transactions;
create policy tx_select on transactions for select using (family_id = current_family_id());
drop policy if exists tx_insert on transactions;
create policy tx_insert on transactions for insert with check (family_id = current_family_id());
drop policy if exists tx_update on transactions;
create policy tx_update on transactions for update using (family_id = current_family_id());
drop policy if exists tx_delete on transactions;
create policy tx_delete on transactions for delete using (family_id = current_family_id());

drop policy if exists inv_select on inventory_items;
create policy inv_select on inventory_items for select using (family_id = current_family_id());
drop policy if exists inv_insert on inventory_items;
create policy inv_insert on inventory_items for insert with check (family_id = current_family_id());
drop policy if exists inv_update on inventory_items;
create policy inv_update on inventory_items for update using (family_id = current_family_id());
drop policy if exists inv_delete on inventory_items;
create policy inv_delete on inventory_items for delete using (family_id = current_family_id());

drop policy if exists rec_select on recurring_items;
create policy rec_select on recurring_items for select using (family_id = current_family_id());
drop policy if exists rec_insert on recurring_items;
create policy rec_insert on recurring_items for insert with check (family_id = current_family_id());
drop policy if exists rec_update on recurring_items;
create policy rec_update on recurring_items for update using (family_id = current_family_id());
drop policy if exists rec_delete on recurring_items;
create policy rec_delete on recurring_items for delete using (family_id = current_family_id());

drop policy if exists rem_select on reminders;
create policy rem_select on reminders for select using (family_id = current_family_id());
drop policy if exists rem_insert on reminders;
create policy rem_insert on reminders for insert with check (family_id = current_family_id());
drop policy if exists rem_update on reminders;
create policy rem_update on reminders for update using (family_id = current_family_id());
drop policy if exists rem_delete on reminders;
create policy rem_delete on reminders for delete using (family_id = current_family_id());

drop policy if exists recpt_select on receipts;
create policy recpt_select on receipts for select using (family_id = current_family_id());
drop policy if exists recpt_insert on receipts;
create policy recpt_insert on receipts for insert with check (family_id = current_family_id());

-- ============================================================
-- GRANTS (authenticated role)
-- ============================================================
grant usage on schema public to authenticated;
grant all on all tables in schema public to authenticated;
grant all on all sequences in schema public to authenticated;
grant execute on all functions in schema public to authenticated;