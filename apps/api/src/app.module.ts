import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { SupabaseModule } from './supabase/supabase.module';
import { CatalogModule } from './catalog/catalog.module';
import { ScanModule } from './scan/scan.module';
import { AuthModule } from './auth/auth.module';
import { FamilyModule } from './family/family.module';
import { TransactionModule } from './transaction/transaction.module';
import { GoalModule } from './goal/goal.module';
import { InventoryModule } from './inventory/inventory.module';
import { RecurringModule } from './recurring/recurring.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    SupabaseModule,
    CatalogModule,
    ScanModule,
    AuthModule,
    FamilyModule,
    TransactionModule,
    GoalModule,
    InventoryModule,
    RecurringModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}