import { Injectable } from '@nestjs/common';
import { AIExtraction, TransactionSchema, InventoryItemSchema } from '@maya/shared';
import { extractInvoice, DEFAULT_VISION_PROVIDER } from '@maya/ai';
import { ScanExtractDto, ScanConfirmDto } from './scan.dto';

@Injectable()
export class ScanService {
  /**
   * Upload → Scan → Preview.
   * AI extracts structured data from the receipt/invoice image.
   * The returned data is a PREVIEW — the user reviews & edits before confirm.
   */
  async extract(dto: ScanExtractDto): Promise<AIExtraction> {
    const extraction = await extractInvoice(
      DEFAULT_VISION_PROVIDER,
      dto.fileBase64,
      dto.mimeType,
      dto.defaultCurrency ?? 'IDR',
    );
    return extraction;
  }

  /**
   * Review → Confirm.
   * Cascade: creates a Transaction (Spend), and for physical line items
   * creates InventoryItems (Have). In production this persists to Supabase
   * and triggers recurring detection (Leak) + reminders.
   *
   * NOTE: This is a scaffold — persistence is wired in the next phase.
   */
  confirm(dto: ScanConfirmDto) {
    const transaction = TransactionSchema.parse({
      id: crypto.randomUUID(),
      familyId: 'FAMILY_ID_PENDING',
      memberId: 'MEMBER_ID_PENDING',
      type: dto.total && dto.total < 0 ? 'refund' : 'expense',
      amount: Math.abs(dto.total ?? 0),
      currency: 'IDR',
      date: dto.date ?? new Date().toISOString().slice(0, 10),
      category: dto.category ?? 'other',
      vendor: dto.vendor,
      merchantGroup: dto.merchantGroup,
      isRecurring: false,
      createdAt: new Date().toISOString(),
    });

    const inventory = (dto.lineItems ?? [])
      .filter((li) => li.type === 'expense')
      .map((li) =>
        InventoryItemSchema.parse({
          id: crypto.randomUUID(),
          familyId: 'FAMILY_ID_PENDING',
          name: li.description,
          category: dto.category ?? 'other',
          value: li.amount,
          status: 'active',
          createdAt: new Date().toISOString(),
        }),
      );

    return {
      transaction,
      inventory,
      cascade: {
        spend: true,
        have: inventory.length > 0,
        leak: false, // recurring detection wired in next phase
      },
    };
  }
}