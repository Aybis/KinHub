import { Controller, Get, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogEntry } from '@maya/shared';

@Controller('api/v1/catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('subscriptions')
  subscriptions(
    @Query('q') q?: string,
    @Query('region') region?: 'global' | 'indonesia',
  ): CatalogEntry[] {
    return this.catalogService.search(q ?? '', 'subscription', region);
  }

  @Get('bills')
  bills(
    @Query('q') q?: string,
    @Query('region') region?: 'global' | 'indonesia',
  ): CatalogEntry[] {
    return this.catalogService.search(q ?? '', 'bill', region);
  }

  @Get()
  all(@Query('q') q?: string): CatalogEntry[] {
    return this.catalogService.search(q ?? '');
  }
}