import { type Tier, TIER_RANK } from '@/types'

export function canAccess(userTier: Tier, requiredTier: Tier): boolean {
  return TIER_RANK[userTier] >= TIER_RANK[requiredTier]
}

export function requiresTier(userTier: Tier, requiredTier: Tier): string | null {
  if (canAccess(userTier, requiredTier)) return null
  const tierLabel = requiredTier.charAt(0).toUpperCase() + requiredTier.slice(1)
  return `${tierLabel} tier required to access this feature`
}

export function getGenerationLimit(tier: Tier): number {
  const limits: Record<Tier, number> = {
    free: 2, bloom: 50, craft: 200, studio: 1000, atelier: 999999,
  }
  return limits[tier]
}

export function getStripePriceId(tier: Exclude<Tier, 'free'>): string {
  const ids: Record<string, string> = {
    bloom: process.env.STRIPE_PRICE_BLOOM!,
    craft: process.env.STRIPE_PRICE_CRAFT!,
    studio: process.env.STRIPE_PRICE_STUDIO!,
    atelier: process.env.STRIPE_PRICE_ATELIER!,
  }
  return ids[tier]
}
