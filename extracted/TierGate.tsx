'use client'

import { useTier } from '@/hooks/useTier'
import { TIER_LABELS, TIER_RANK } from '@/types'
import type { Tier } from '@/types'

interface TierGateProps {
  requiredTier: Tier
  children: React.ReactNode
  featureName?: string
}

export function TierGate({ requiredTier, children, featureName }: TierGateProps) {
  const { tier, loading, canAccess } = useTier()
  if (loading) return <div className="animate-pulse bg-ec-border rounded-md h-32" />

  if (canAccess(requiredTier)) return <>{children}</>

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="blur-sm pointer-events-none select-none opacity-60">{children}</div>
      <div className="absolute inset-0 flex items-center justify-center bg-ec-paper/80 backdrop-blur-sm">
        <div className="text-center p-6 max-w-sm">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ec-black text-white text-xs font-mono uppercase tracking-widest mb-3">
            🔒 {TIER_LABELS[requiredTier]}
          </div>
          <p className="font-serif text-lg font-semibold text-ec-black mb-1">
            {featureName || 'This feature'} requires {TIER_LABELS[requiredTier]}
          </p>
          <p className="text-sm text-ec-ink mb-4">
            Upgrade your plan to unlock this and all {TIER_LABELS[requiredTier]}-tier features.
          </p>
          <a
            href="/settings?tab=billing"
            className="inline-block px-5 py-2.5 bg-ec-black text-white text-sm font-medium rounded-md hover:bg-ec-charcoal transition-colors"
          >
            Upgrade to {TIER_LABELS[requiredTier]}
          </a>
        </div>
      </div>
    </div>
  )
}
