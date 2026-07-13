import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, createAdminClient } from '@/lib/supabase-server'
import { generateCollection } from '@/lib/claude'
import { canAccess } from '@/lib/tier'
import { getGenerationLimit } from '@/lib/tier'
import type { Tier } from '@/types'

export async function POST(req: NextRequest) {
  try {
    // ── Auth check ──────────────────────────────────────────────────────────
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ── Profile + tier check ────────────────────────────────────────────────
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier, subscription_status, generations_used, generations_limit')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const tier = (profile.subscription_tier || 'free') as Tier
    const isActive = profile.subscription_status === 'active' || tier === 'free'

    // Tier gate — Bloom+ required for collection generation
    if (!canAccess(tier, 'bloom') && profile.generations_used >= profile.generations_limit) {
      return NextResponse.json({
        error: 'Generation limit reached. Upgrade to Bloom to continue.',
        code: 'LIMIT_REACHED',
      }, { status: 403 })
    }

    // ── Parse request ────────────────────────────────────────────────────────
    const { brief, save = true } = await req.json()

    if (!brief || typeof brief !== 'string' || brief.trim().length < 10) {
      return NextResponse.json({ error: 'Brief must be at least 10 characters' }, { status: 400 })
    }

    // ── Generate via Claude ──────────────────────────────────────────────────
    const collectionData = await generateCollection(brief.trim())
    collectionData.brief = brief.trim()
    collectionData.savedAt = new Date().toISOString()

    // ── Save to Supabase ─────────────────────────────────────────────────────
    let savedId: string | undefined

    if (save) {
      const admin = createAdminClient()

      const { data: saved, error: saveErr } = await admin
        .from('collections')
        .insert({
          user_id: user.id,
          name: collectionData.collectionName,
          brief: brief.trim(),
          atmosphere_archetype: collectionData.atmosphereArchetype,
          tagline: collectionData.tagline,
          data: collectionData,
        })
        .select('id')
        .single()

      if (!saveErr && saved) {
        savedId = saved.id
      }

      // Increment usage counter
      await admin
        .from('profiles')
        .update({ generations_used: profile.generations_used + 1 })
        .eq('id', user.id)
    }

    return NextResponse.json({ collection: collectionData, saved_id: savedId })

  } catch (err) {
    console.error('[/api/generate]', err)
    return NextResponse.json({ error: 'Generation failed. Please try again.' }, { status: 500 })
  }
}
