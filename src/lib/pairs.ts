import pairsData from '../../data/conversion-pairs.json';
import type { CategoryId } from './convert';

export interface ConversionPair {
  slug: string;
  category: CategoryId;
  from: string;
  to: string;
  defaultValue: number;
}

export const conversionPairs: ConversionPair[] = pairsData.pairs.map((p) => ({
  ...p,
  defaultValue: p.defaultValue ?? 1,
})) as ConversionPair[];

export function getPairBySlug(slug: string): ConversionPair | undefined {
  return conversionPairs.find((p) => p.slug === slug);
}

export function getPairsByCategory(category: CategoryId): ConversionPair[] {
  return conversionPairs.filter((p) => p.category === category);
}

export function getReversePair(pair: ConversionPair): ConversionPair | undefined {
  const reverseSlug = `${pair.to}-to-${pair.from}`;
  return conversionPairs.find((p) => p.slug === reverseSlug);
}

export function getRelatedPairs(pair: ConversionPair, limit = 6): ConversionPair[] {
  const reverse = getReversePair(pair);
  const others = conversionPairs.filter(
    (p) => p.category === pair.category && p.slug !== pair.slug && p.slug !== reverse?.slug,
  );
  const result = reverse ? [reverse, ...others] : others;
  return result.slice(0, limit);
}
