import type { CatalogEntry } from '@maya/shared';

/**
 * Curated subscription & bill catalog.
 *
 * Prices are reference defaults (Indonesian Rupiah unless noted) and are
 * ALWAYS editable by the family — actual plans vary. Maintained by the
 * data team (Ledger) and periodically updated.
 */

type CatalogSeed = {
  key: string;
  name: string;
  category: CatalogEntry['category'];
  defaultPrice: number;
  currency?: CatalogEntry['currency'];
  cycle?: CatalogEntry['cycle'];
  region?: CatalogEntry['region'];
  logoUrl?: string | null;
};

function entry(seed: CatalogSeed): CatalogEntry {
  return {
    cycle: 'monthly',
    currency: 'IDR',
    region: 'global',
    ...seed,
  };
}

export const catalog: CatalogEntry[] = [
  /* ------------------------- Streaming (global) ------------------------- */
  entry({ key: 'netflix', name: 'Netflix', category: 'subscription', defaultPrice: 120_000, region: 'global' }),
  entry({ key: 'spotify', name: 'Spotify', category: 'subscription', defaultPrice: 59_900, region: 'global' }),
  entry({ key: 'apple-music', name: 'Apple Music', category: 'subscription', defaultPrice: 55_000, region: 'global' }),
  entry({ key: 'apple-one', name: 'Apple One', category: 'subscription', defaultPrice: 149_000, region: 'global' }),
  entry({ key: 'apple-tv', name: 'Apple TV+', category: 'subscription', defaultPrice: 99_000, region: 'global' }),
  entry({ key: 'youtube-premium', name: 'YouTube Premium', category: 'subscription', defaultPrice: 69_000, region: 'global' }),
  entry({ key: 'youtube-music', name: 'YouTube Music', category: 'subscription', defaultPrice: 59_000, region: 'global' }),
  entry({ key: 'paramount-plus', name: 'Paramount+', category: 'subscription', defaultPrice: 143_000, region: 'global' }),
  entry({ key: 'crunchyroll', name: 'Crunchyroll', category: 'subscription', defaultPrice: 39_000, region: 'global' }),
  entry({ key: 'twitch', name: 'Twitch', category: 'subscription', defaultPrice: 161_000, region: 'global' }),
  entry({ key: 'deezer', name: 'Deezer', category: 'subscription', defaultPrice: 214_000, region: 'global' }),
  entry({ key: 'tidal', name: 'Tidal', category: 'subscription', defaultPrice: 196_000, region: 'global' }),
  entry({ key: 'soundcloud', name: 'SoundCloud', category: 'subscription', defaultPrice: 178_000, region: 'global' }),
  entry({ key: 'audible', name: 'Audible', category: 'subscription', defaultPrice: 267_000, region: 'global' }),
  entry({ key: 'notion', name: 'Notion', category: 'subscription', defaultPrice: 179_000, region: 'global' }),
  entry({ key: 'github-pro', name: 'GitHub Pro', category: 'subscription', defaultPrice: 4, currency: 'USD', region: 'global' }),
  entry({ key: 'github-copilot', name: 'GitHub Copilot', category: 'subscription', defaultPrice: 10, currency: 'USD', region: 'global' }),
  entry({ key: 'chatgpt-plus', name: 'ChatGPT Plus', category: 'subscription', defaultPrice: 20, currency: 'USD', region: 'global' }),
  entry({ key: 'icloud-plus', name: 'iCloud+', category: 'subscription', defaultPrice: 39_000, region: 'global' }),
  entry({ key: 'google-one', name: 'Google One', category: 'subscription', defaultPrice: 29_000, region: 'global' }),
  entry({ key: 'dropbox', name: 'Dropbox', category: 'subscription', defaultPrice: 108_000, region: 'global' }),
  entry({ key: 'adobe-cc', name: 'Adobe Creative Cloud', category: 'subscription', defaultPrice: 399_000, region: 'global' }),
  entry({ key: 'canva-pro', name: 'Canva Pro', category: 'subscription', defaultPrice: 89_000, region: 'global' }),
  entry({ key: 'duolingo-plus', name: 'Duolingo Plus', category: 'subscription', defaultPrice: 129_000, region: 'global' }),
  entry({ key: 'disney-plus', name: 'Disney+', category: 'subscription', defaultPrice: 119_000, region: 'global' }),
  entry({ key: 'hbo-max', name: 'HBO Max', category: 'subscription', defaultPrice: 109_000, region: 'global' }),
  entry({ key: 'prime-video', name: 'Prime Video', category: 'subscription', defaultPrice: 69_000, region: 'global' }),
  entry({ key: 'xbox-game-pass', name: 'Xbox Game Pass', category: 'subscription', defaultPrice: 149_000, region: 'global' }),
  entry({ key: 'playstation-plus', name: 'PlayStation Plus', category: 'subscription', defaultPrice: 169_000, region: 'global' }),
  entry({ key: 'nintendo-switch-online', name: 'Nintendo Switch Online', category: 'subscription', defaultPrice: 89_000, region: 'global' }),

  /* ------------------------- Streaming (Indonesia) ---------------------- */
  entry({ key: 'vidio', name: 'Vidio', category: 'subscription', defaultPrice: 45_000, region: 'indonesia' }),
  entry({ key: 'viu', name: 'VIU', category: 'subscription', defaultPrice: 30_000, region: 'indonesia' }),
  entry({ key: 'wetv', name: 'WeTV', category: 'subscription', defaultPrice: 44_000, region: 'indonesia' }),
  entry({ key: 'genflix', name: 'Genflix', category: 'subscription', defaultPrice: 15_000, region: 'indonesia' }),
  entry({ key: 'vision-plus', name: 'Vision+', category: 'subscription', defaultPrice: 25_000, region: 'indonesia' }),
  entry({ key: 'maxstream', name: 'MAXStream', category: 'subscription', defaultPrice: 15_000, region: 'indonesia' }),
  entry({ key: 'disney-hotstar-id', name: 'Disney+ Hotstar (ID)', category: 'subscription', defaultPrice: 65_000, region: 'indonesia' }),
  entry({ key: 'mola', name: 'Mola', category: 'subscription', defaultPrice: 30_000, region: 'indonesia' }),
  entry({ key: 'catchplay', name: 'Catchplay', category: 'subscription', defaultPrice: 49_000, region: 'indonesia' }),
  entry({ key: 'sushiroll', name: 'Sushiroll', category: 'subscription', defaultPrice: 20_000, region: 'indonesia' }),
  entry({ key: 'resso', name: 'Resso', category: 'subscription', defaultPrice: 39_000, region: 'indonesia' }),
  entry({ key: 'joox', name: 'JOOX', category: 'subscription', defaultPrice: 29_000, region: 'indonesia' }),
  entry({ key: 'moov', name: 'Moov', category: 'subscription', defaultPrice: 25_000, region: 'indonesia' }),
  entry({ key: 'langitmusik', name: 'LangitMusik', category: 'subscription', defaultPrice: 29_000, region: 'indonesia' }),

  /* ------------------------- Bills (Indonesia) ------------------------- */
  entry({ key: 'pln-pascabayar', name: 'PLN Listrik (Pascabayar)', category: 'bill', defaultPrice: 500_000, region: 'indonesia' }),
  entry({ key: 'pdam', name: 'PDAM Air', category: 'bill', defaultPrice: 150_000, region: 'indonesia' }),
  entry({ key: 'indihome', name: 'IndiHome', category: 'bill', defaultPrice: 350_000, region: 'indonesia' }),
  entry({ key: 'biznet', name: 'Biznet', category: 'bill', defaultPrice: 289_000, region: 'indonesia' }),
  entry({ key: 'firstmedia', name: 'Firstmedia', category: 'bill', defaultPrice: 350_000, region: 'indonesia' }),
  entry({ key: 'myrepublic', name: 'MyRepublic', category: 'bill', defaultPrice: 299_000, region: 'indonesia' }),
  entry({ key: 'telkomsel', name: 'Telkomsel', category: 'bill', defaultPrice: 100_000, region: 'indonesia' }),
  entry({ key: 'xl', name: 'XL Axiata', category: 'bill', defaultPrice: 100_000, region: 'indonesia' }),
  entry({ key: 'indosat', name: 'Indosat Ooredoo', category: 'bill', defaultPrice: 100_000, region: 'indonesia' }),
  entry({ key: 'tri', name: 'Tri (3)', category: 'bill', defaultPrice: 50_000, region: 'indonesia' }),
  entry({ key: 'transvision', name: 'Transvision TV', category: 'bill', defaultPrice: 150_000, region: 'indonesia' }),
  entry({ key: 'mnc-vision', name: 'MNC Vision', category: 'bill', defaultPrice: 150_000, region: 'indonesia' }),
  entry({ key: 'smartfren', name: 'Smartfren', category: 'bill', defaultPrice: 100_000, region: 'indonesia' }),
];

/* ------------------------- Helpers ------------------------- */

export function searchCatalog(query: string, region?: 'global' | 'indonesia'): CatalogEntry[] {
  const q = query.trim().toLowerCase();
  return catalog.filter((entry) => {
    const matchesRegion = region ? entry.region === region : true;
    const matchesQuery = q === '' || entry.name.toLowerCase().includes(q) || entry.key.includes(q);
    return matchesRegion && matchesQuery;
  });
}

export function getCatalogEntry(key: string): CatalogEntry | undefined {
  return catalog.find((entry) => entry.key === key);
}

export function getByCategory(category: CatalogEntry['category']): CatalogEntry[] {
  return catalog.filter((entry) => entry.category === category);
}

export function getByRegion(region: 'global' | 'indonesia'): CatalogEntry[] {
  return catalog.filter((entry) => entry.region === region);
}