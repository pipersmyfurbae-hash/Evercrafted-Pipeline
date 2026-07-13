'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Tier } from '@/types'
import { TIER_RANK } from '@/types'

export function useTier() {
  const [tier, setTier] = useState<Tier>('free')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function fetchTier() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_tier, subscription_status')
        .eq('id', user.id)
        .single()

      if (profile?.subscription_status === 'active' && profile?.subscription_tier) {
        setTier(profile.subscription_tier as Tier)
      }
      setLoading(false)
    }

    fetchTier()
  }, [])

  const canAccess = (requiredTier: Tier) => TIER_RANK[tier] >= TIER_RANK[requiredTier]

  return { tier, loading, canAccess }
}
