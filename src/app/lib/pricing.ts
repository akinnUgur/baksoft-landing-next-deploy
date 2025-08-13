import type { EstimatorConfig, TierId } from '@/lib/types';

export function recommendTier(c: EstimatorConfig): TierId {
  if (c.commerce) return 'commerce';
  if (c.pages <= 3 && !c.blog && !c.booking) return 'lite';
  if (c.pages <= 8) return 'core';
  if (c.pages <= 15) return 'plus';
  return 'enterprise';
}

export function estimatePrice(c: EstimatorConfig): { low: number; high: number; baseTier: TierId } {
  const t = recommendTier(c);
  const perPage: Record<TierId, number> = { lite: 3000, core: 5000, plus: 6000, commerce: 8000, enterprise: 9000 };
  const base: Record<TierId, number> = { lite: 12000, core: 25000, plus: 45000, commerce: 85000, enterprise: 140000 };
  let total = base[t] + perPage[t] * Math.max(1, c.pages);
  if (c.blog) total += 5000;
  if (c.booking) total += 7000;
  if (c.i18n) total += 10000;
  if (c.commerce) total += 35000;
  const low = Math.round(total * 0.9);
  const high = Math.round(total * 1.2);
  return { low, high, baseTier: t };
}

export const TL = (n: number) => `₺${n.toLocaleString('tr-TR')}`;
