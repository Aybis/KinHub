import { z } from 'zod';

/* ------------------------------------------------------------------ */
/*  Core enums & shared primitives                                     */
/* ------------------------------------------------------------------ */

export const MemberRoleSchema = z.enum(['parent', 'teen', 'child']);
export type MemberRole = z.infer<typeof MemberRoleSchema>;

export const MemberLensSchema = z.enum(['full', 'learning']);
export type MemberLens = z.infer<typeof MemberLensSchema>;

export const CurrencySchema = z.enum(['IDR', 'USD', 'SGD', 'MYR', 'EUR']);
export type Currency = z.infer<typeof CurrencySchema>;

export const TransactionTypeSchema = z.enum([
  'expense',
  'income',
  'refund',
  'transfer',
]);
export type TransactionType = z.infer<typeof TransactionTypeSchema>;

export const RecurringCategorySchema = z.enum([
  'subscription',
  'bill',
  'insurance',
]);
export type RecurringCategory = z.infer<typeof RecurringCategorySchema>;

export const RecurringCycleSchema = z.enum(['monthly', 'quarterly', 'yearly']);
export type RecurringCycle = z.infer<typeof RecurringCycleSchema>;

export const RecurringSourceSchema = z.enum([
  'catalog',
  'scan',
  'manual',
  'detected',
]);
export type RecurringSource = z.infer<typeof RecurringSourceSchema>;

export const InventoryStatusSchema = z.enum(['active', 'sold', 'discarded']);
export type InventoryStatus = z.infer<typeof InventoryStatusSchema>;

export const ReminderChannelSchema = z.enum(['push', 'telegram', 'whatsapp']);
export type ReminderChannel = z.infer<typeof ReminderChannelSchema>;

export const ReceiptStatusSchema = z.enum(['pending', 'reviewed', 'confirmed']);
export type ReceiptStatus = z.infer<typeof ReceiptStatusSchema>;

export const ScanSourceSchema = z.enum(['catalog', 'scan', 'manual', 'detected']);

/* ------------------------------------------------------------------ */
/*  Family                                                              */
/* ------------------------------------------------------------------ */

export const FamilySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(120),
  currency: CurrencySchema,
  avatarUrl: z.string().url().nullable().optional(),
  createdAt: z.string().datetime(),
  settings: z
    .object({
      defaultLens: MemberLensSchema.optional(),
      notificationPrefs: z.record(z.unknown()).optional(),
    })
    .optional(),
});
export type Family = z.infer<typeof FamilySchema>;

/* ------------------------------------------------------------------ */
/*  Member                                                              */
/* ------------------------------------------------------------------ */

export const MemberSchema = z.object({
  id: z.string().uuid(),
  familyId: z.string().uuid(),
  role: MemberRoleSchema,
  lens: MemberLensSchema,
  name: z.string().min(1).max(120),
  email: z.string().email().nullable().optional(),
  phone: z.string().nullable().optional(),
  isOwner: z.boolean().default(false),
  status: z.enum(['invited', 'verified', 'active', 'removed']),
  createdAt: z.string().datetime(),
});
export type Member = z.infer<typeof MemberSchema>;

/* ------------------------------------------------------------------ */
/*  Goal (Want)                                                         */
/* ------------------------------------------------------------------ */

export const GoalSchema = z.object({
  id: z.string().uuid(),
  familyId: z.string().uuid(),
  name: z.string().min(1).max(160),
  targetAmount: z.number().positive(),
  targetDate: z.string().date(),
  category: z.string().max(80).optional(),
  currentAmount: z.number().nonnegative().default(0),
  createdBy: z.string().uuid(),
  createdAt: z.string().datetime(),
});
export type Goal = z.infer<typeof GoalSchema>;

export const GoalContributionSchema = z.object({
  id: z.string().uuid(),
  goalId: z.string().uuid(),
  memberId: z.string().uuid(),
  amount: z.number().positive(),
  note: z.string().max(255).optional(),
  createdAt: z.string().datetime(),
});
export type GoalContribution = z.infer<typeof GoalContributionSchema>;

/* ------------------------------------------------------------------ */
/*  Transaction (Spend / Buy)                                           */
/* ------------------------------------------------------------------ */

export const TransactionSchema = z.object({
  id: z.string().uuid(),
  familyId: z.string().uuid(),
  memberId: z.string().uuid(),
  type: TransactionTypeSchema,
  amount: z.number(),
  currency: CurrencySchema,
  amountOriginal: z.number().optional(),
  currencyOriginal: CurrencySchema.optional(),
  date: z.string().date(),
  category: z.string().max(80),
  vendor: z.string().max(160),
  merchantGroup: z.string().max(160).optional(),
  isRecurring: z.boolean().default(false),
  linkedInventoryId: z.string().uuid().nullable().optional(),
  linkedRecurringId: z.string().uuid().nullable().optional(),
  note: z.string().max(500).optional(),
  createdAt: z.string().datetime(),
});
export type Transaction = z.infer<typeof TransactionSchema>;

/* ------------------------------------------------------------------ */
/*  Inventory (Have)                                                    */
/* ------------------------------------------------------------------ */

export const InventoryItemSchema = z.object({
  id: z.string().uuid(),
  familyId: z.string().uuid(),
  name: z.string().min(1).max(160),
  category: z.string().max(80),
  room: z.string().max(80).nullable().optional(),
  value: z.number().nonnegative(),
  purchaseDate: z.string().date().nullable().optional(),
  purchasePrice: z.number().nonnegative().nullable().optional(),
  warrantyExpiry: z.string().date().nullable().optional(),
  serialNumber: z.string().max(120).nullable().optional(),
  photoUrl: z.string().url().nullable().optional(),
  sourceTransactionId: z.string().uuid().nullable().optional(),
  status: InventoryStatusSchema.default('active'),
  createdAt: z.string().datetime(),
});
export type InventoryItem = z.infer<typeof InventoryItemSchema>;

/* ------------------------------------------------------------------ */
/*  Recurring (Leak — subscriptions & bills)                            */
/* ------------------------------------------------------------------ */

export const RecurringItemSchema = z.object({
  id: z.string().uuid(),
  familyId: z.string().uuid(),
  name: z.string().min(1).max(160),
  providerKey: z.string().max(80).optional(),
  category: RecurringCategorySchema,
  amount: z.number().nonnegative(),
  currency: CurrencySchema,
  cycle: RecurringCycleSchema,
  billingDay: z.number().int().min(1).max(31),
  nextDue: z.string().date(),
  isActive: z.boolean().default(true),
  logoUrl: z.string().url().nullable().optional(),
  source: RecurringSourceSchema.default('manual'),
  createdAt: z.string().datetime(),
});
export type RecurringItem = z.infer<typeof RecurringItemSchema>;

/* ------------------------------------------------------------------ */
/*  Reminder                                                            */
/* ------------------------------------------------------------------ */

export const ReminderSchema = z.object({
  id: z.string().uuid(),
  familyId: z.string().uuid(),
  entityType: z.enum(['recurring', 'inventory', 'goal', 'custom']),
  entityId: z.string().uuid(),
  dueAt: z.string().datetime(),
  recipients: z.array(z.string().uuid()),
  channels: z.array(ReminderChannelSchema),
  repeat: z.record(z.unknown()).optional(),
  sentAt: z.string().datetime().nullable().optional(),
  createdAt: z.string().datetime(),
});
export type Reminder = z.infer<typeof ReminderSchema>;

/* ------------------------------------------------------------------ */
/*  Receipt & AI extraction                                             */
/* ------------------------------------------------------------------ */

export const AIExtractionSchema = z.object({
  vendor: z.string(),
  merchantGroup: z.string().optional(),
  date: z.string().date().optional(),
  currency: CurrencySchema.optional(),
  lineItems: z
    .array(
      z.object({
        description: z.string(),
        amount: z.number(),
        type: z.enum(['expense', 'refund']),
      }),
    )
    .default([]),
  subtotal: z.number().optional(),
  tax: z.number().optional(),
  total: z.number(),
  totalConverted: z.number().optional(),
  category: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
});
export type AIExtraction = z.infer<typeof AIExtractionSchema>;

export const ReceiptSchema = z.object({
  id: z.string().uuid(),
  familyId: z.string().uuid(),
  transactionId: z.string().uuid().nullable().optional(),
  fileUrl: z.string().url(),
  fileType: z.enum(['pdf', 'image']),
  extractedData: AIExtractionSchema.nullable().optional(),
  status: ReceiptStatusSchema.default('pending'),
  createdAt: z.string().datetime(),
});
export type Receipt = z.infer<typeof ReceiptSchema>;

/* ------------------------------------------------------------------ */
/*  Catalog entries                                                     */
/* ------------------------------------------------------------------ */

export const CatalogEntrySchema = z.object({
  key: z.string(),
  name: z.string(),
  category: RecurringCategorySchema,
  cycle: RecurringCycleSchema.default('monthly'),
  defaultPrice: z.number().nonnegative(),
  currency: CurrencySchema.default('IDR'),
  logoUrl: z.string().url().nullable().optional(),
  region: z.enum(['global', 'indonesia']).default('global'),
});
export type CatalogEntry = z.infer<typeof CatalogEntrySchema>;

/* ------------------------------------------------------------------ */
/*  Composite views                                                     */
/* ------------------------------------------------------------------ */

export const DashboardSummarySchema = z.object({
  netWorth: z.number(),
  assets: z.number(),
  liabilities: z.number(),
  monthSpend: z.number(),
  activeRecurring: z.number(),
  recurringMonthlyTotal: z.number(),
  goalsActive: z.number(),
  goalsCurrentTotal: z.number(),
  goalsTargetTotal: z.number(),
  recentTransactions: z.array(TransactionSchema),
});
export type DashboardSummary = z.infer<typeof DashboardSummarySchema>;