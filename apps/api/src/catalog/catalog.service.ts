import { Injectable } from '@nestjs/common';
import { CatalogEntry } from '@maya/shared';
import { searchCatalog, getCatalogEntry } from '@maya/catalog';

type Category = 'subscription' | 'bill' | 'insurance';

@Injectable()
export class CatalogService {
  search(
    query: string,
    category?: Category,
    region?: 'global' | 'indonesia',
  ): CatalogEntry[] {
    return searchCatalog(query, region).filter(
      (entry) => !category || entry.category === category,
    );
  }

  get(key: string): CatalogEntry | undefined {
    return getCatalogEntry(key);
  }
}